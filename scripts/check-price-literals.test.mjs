import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');

const JSON_FILES = ['messages/fa.json', 'messages/en.json'];
const TS_CONTENT_FILES = ['content/blog.fa.ts', 'content/blog.en.ts'];

const DATE_KEY_NAMES = new Set([
  'displayDate',
  'publishedIso',
  'modifiedIso',
  'date',
  'lastUpdatedDate',
  'copyright',
]);

const IDENTIFIER_KEY_NAMES = new Set([
  'phonePlaceholder',
  'phoneError',
  'codePlaceholder',
]);

const MOCKUP_DEMO_PATH_PREFIXES = ['sections.intro.tiles', 'sections.instagram'];

const LATIN_PRICE_SHAPED = /\d{1,3}(,\d{3})+|\d{4,}/;
const PERSIAN_PRICE_SHAPED = /[۰-۹]{4,}/;
const CURRENCY_ADJACENT_PRICE =
  /[0-9۰-۹][0-9۰-۹,٬]*\s*(هزار\s*تومان|تومان|تومن|Toman)/;

function isPriceShaped(text) {
  return (
    LATIN_PRICE_SHAPED.test(text) ||
    PERSIAN_PRICE_SHAPED.test(text) ||
    CURRENCY_ADJACENT_PRICE.test(text)
  );
}

function isAllowlistedJsonLeaf(path_, key) {
  if (DATE_KEY_NAMES.has(key) || IDENTIFIER_KEY_NAMES.has(key)) {
    return true;
  }

  return MOCKUP_DEMO_PATH_PREFIXES.some((prefix) => path_ === prefix || path_.startsWith(`${prefix}.`));
}

function walkJsonForPriceLiterals(value, path_, key, violations) {
  if (typeof value === 'string' || typeof value === 'number') {
    if (isAllowlistedJsonLeaf(path_, key)) {
      return;
    }

    const text = String(value);
    if (isPriceShaped(text)) {
      violations.push(`${path_}: "${text}"`);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => walkJsonForPriceLiterals(item, path_, key, violations));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [childKey, childValue] of Object.entries(value)) {
      const childPath = path_ ? `${path_}.${childKey}` : childKey;
      walkJsonForPriceLiterals(childValue, childPath, childKey, violations);
    }
  }
}

function stripBom(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function findPriceLiteralsInJsonFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const parsed = JSON.parse(stripBom(readFileSync(absolutePath, 'utf8')));
  const violations = [];

  walkJsonForPriceLiterals(parsed, '', '', violations);

  return violations;
}

function isDateFieldLine(line) {
  const trimmed = line.trim();
  return [...DATE_KEY_NAMES].some((key) => trimmed.startsWith(`${key}:`));
}

function findPriceLiteralsInTsFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  const lines = readFileSync(absolutePath, 'utf8').split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    if (isDateFieldLine(line)) {
      return;
    }

    if (isPriceShaped(line)) {
      violations.push(`${relativePath}:${index + 1}: ${line.trim()}`);
    }
  });

  return violations;
}

for (const relativePath of JSON_FILES) {
  test(`${relativePath} carries no live Toman price literal`, () => {
    const violations = findPriceLiteralsInJsonFile(relativePath);
    assert.deepEqual(violations, []);
  });
}

for (const relativePath of TS_CONTENT_FILES) {
  test(`${relativePath} carries no live Toman price literal`, () => {
    const violations = findPriceLiteralsInTsFile(relativePath);
    assert.deepEqual(violations, []);
  });
}
