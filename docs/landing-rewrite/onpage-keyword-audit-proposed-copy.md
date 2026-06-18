# On-page keyword audit — exact proposed Persian copy

Target keyword: «آنلاین شاپ» / «مدیریت آنلاین شاپ» (colloquial). Currently 0 occurrences in messages/fa.json.
Strategy: CONVERT existing «فروشگاه آنلاین» (9x) to «آنلاین شاپ» on high-value surfaces; ~5-7 exact mentions; do not stack.

## 1. metadata.title (fa.json line 3) — CRITICAL
Current: «پرومال — فروشگاه‌ساز اینستاگرام و پاسخ خودکار دایرکت با هوش مصنوعی»
Proposed: «پرومال | مدیریت آنلاین شاپ و فروشگاه‌ساز اینستاگرام با هوش مصنوعی»
Alt (AI-hook-first): «آنلاین شاپ اینستاگرامتو با هوش مصنوعی مدیریت کن | پرومال»

## 2. metadata.description (fa.json line 4) — HIGH (front-load keyword in first 100 chars)
Current opens: «پرومال؛ محصول و سفارش و پرداخت و انبارتو تو یه پنل جمع کن، فروشگاه آنلاینتو بساز...»
Proposed: «پرومال؛ آنلاین شاپ اینستاگرامتو یه‌جا مدیریت کن — محصول و سفارش و پرداخت و انبار تو یه پنل، فروشگاه آنلاینتو بساز و دایرکتتو بسپار به هوش مصنوعی که با قیمت و موجودی واقعی جواب می‌ده و سفارشو می‌بنده، حتی نصفه‌شب. ساخت آنلاین شاپ و مزون اینستاگرام، تمیز و حرفه‌ای.»
(2 exact mentions, keep under ~160 visible chars)

## 3. hero.kicker (fa.json line 25) — HIGH (sub-headline next to H1)
Current: «فروشگاه‌ساز اینستاگرام واسه نسل جدید کاسبای ایرانی»
Proposed: «مدیریت آنلاین شاپ اینستاگرام، واسه نسل جدید کاسبای ایرانی»

## 4. H1 (fa.json hero.titleLine2 line 20) — HIGH (optional; kicker is the safer slot)
Current line 20: «تو دایرکت اینستاگرامت»
Optional: «تو دایرکت آنلاین شاپت»  (loses «اینستاگرام» signal — prefer the kicker change instead)

## 5. bento.title (fa.json line 94) — HIGH (puts exact keyword in an H2)
Current: «هر چی یه فروشگاه آنلاین لازم داره، همینجاست»
Proposed: «هر چی یه آنلاین شاپ لازم داره، همینجاست»

## 6. bento.subtitle (fa.json line 95) — surfaces exact «مدیریت آنلاین شاپ»
Current: «...همه‌چی تو یه پنل مدیریت فروشگاه آنلاین، همون‌جور که یه کاسب ایرانی لازم داره.»
Proposed: «...همه‌چی تو یه پنل مدیریت آنلاین شاپ، همون‌جور که یه کاسب ایرانی لازم داره.»

## 7. footer.description (fa.json line 304) — MEDIUM
Current: «فروشگاه‌ساز اینستاگرام و پنل مدیریت فروشگاه آنلاین با هوش مصنوعی؛ ساخته‌شده واسه کاسبای ایرانی.»
Proposed: «فروشگاه‌ساز اینستاگرام و پنل مدیریت آنلاین شاپ با هوش مصنوعی؛ ساخته‌شده واسه کاسبای ایرانی.»

## 8. manifest.ts description (line 8) — MEDIUM
Current: «فروشگاه‌ساز اینستاگرام با دستیار هوش مصنوعی؛ مدیریت محصول، سفارش، پرداخت و انبار در یک پنل.»
Proposed: «فروشگاه‌ساز و پنل مدیریت آنلاین شاپ اینستاگرام با دستیار هوش مصنوعی؛ مدیریت محصول، سفارش، پرداخت و انبار در یک پنل.»

## 9. marquee.items (fa.json lines 332-345) — MEDIUM (lowest stuffing risk)
Add: «مدیریت آنلاین شاپ اینستاگرام», «ساخت آنلاین شاپ», «پنل مدیریت آنلاین شاپ»
(may replace «ساخت فروشگاه اینترنتی روی promall.io» or keep both)

## 10. FAQ (fa.json lines 261-293) — LOW (also feeds JSON-LD FAQPage)
Add item, e.g. key «manageShop»:
Q: «با پرومال میشه آنلاین شاپ اینستاگرامو کامل مدیریت کرد؟»
A: «آره؛ از ساخت آنلاین شاپ و گذاشتن محصول تا سفارش و انبار و پرداخت و گزارش فروش، همه‌چی تو یه پنل مدیریت آنلاین شاپ جمعه — با دست بفروش یا دایرکتو بسپر به هوش مصنوعی.»
Also add its key to FAQ_KEYS in components/structured-data.tsx (lines 5-14).

## 11. hero.altBackground (fa.json line 31) — LOW (only if it truly describes the image)
Current: «نمای داخلی یه بوتیک مدرن و روشن»
Optional: «داشبورد مدیریت آنلاین شاپ پرومال روی نمای یه بوتیک مدرن»
Keep dm.productAlt (line 36) accurate: «مانتو کتان کرم» — do not change.

## 12. JSON-LD featureList (components/structured-data.tsx lines 53-61) — MEDIUM
Currently hardcoded English on BOTH locales. Make locale-aware; fa list led by:
«مدیریت آنلاین شاپ اینستاگرام», then «فروشگاه‌ساز و ویترین آنلاین», «دایرکت هوشمند با هوش مصنوعی»,
«مدیریت سفارش و انبار آنلاین», «درگاه پرداخت ایرانی و کارت‌به‌کارت», «چاپ خودکار فاکتور», «گزارش فروش و سود لحظه‌ای».

## Stuffing guardrail
CONVERT, don't ADD: replace «فروشگاه آنلاین» in each edited string. Target ~5-7 exact «آنلاین شاپ»
on high-value surfaces plus a few formal/cluster variants for breadth. Never the exact phrase in two adjacent sentences.
