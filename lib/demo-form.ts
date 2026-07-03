const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"

const INSTAGRAM_URL_PREFIX = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i
const INSTAGRAM_HANDLE_PATTERN = /^[a-z0-9._]{1,30}$/

export function toEnglishDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char)
    if (persianIndex > -1) return String(persianIndex)
    const arabicIndex = ARABIC_DIGITS.indexOf(char)
    return arabicIndex > -1 ? String(arabicIndex) : char
  })
}

export function toPersianDigits(value: string): string {
  return value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
}

export function normalizeIranMobile(value: string): string | null {
  const compact = toEnglishDigits(value).replace(/[\s\-().]/g, "")
  const candidate = compact
    .replace(/^\+98/, "0")
    .replace(/^0098/, "0")
    .replace(/^98(?=9\d{9}$)/, "0")
    .replace(/^(?=9\d{9}$)/, "0")
  return /^09\d{9}$/.test(candidate) ? candidate : null
}

export function groupIranMobile(value: string): string {
  const match = /^(09\d{2})(\d{3})(\d{4})$/.exec(value)
  return match ? `${match[1]} ${match[2]} ${match[3]}` : value
}

export function normalizeInstagramHandle(value: string): string | null {
  const withoutUrl = toEnglishDigits(value).trim().replace(INSTAGRAM_URL_PREFIX, "")
  const handle = withoutUrl.replace(/^@+/, "").split(/[/?#\s]/)[0].toLowerCase()
  if (!INSTAGRAM_HANDLE_PATTERN.test(handle)) return null
  if (handle.startsWith(".") || handle.endsWith(".") || handle.includes("..")) return null
  return handle
}
