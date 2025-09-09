export function getShorts() {
  return JSON.parse(localStorage.getItem("shorts") || "[]")
}

export function saveShorts(list) {
  localStorage.setItem("shorts", JSON.stringify(list))
}

export function createShort({ longUrl, minutes, preferredCode }, logger) {
  const shorts = getShorts()

  if (!longUrl.startsWith("http")) throw new Error("Invalid URL format")
  const code = preferredCode
    ? validateCustomCode(preferredCode, shorts)
    : generateCode(shorts)

  const now = Date.now()
  const rec = {
    code,
    longUrl,
    createdAt: now,
    expiresAt: now + (minutes || 30) * 60 * 1000,
    clickCount: 0,
    clicks: [],
  }

  shorts.unshift(rec)
  saveShorts(shorts)
  logger.log("short.create", { code, longUrl })
  return rec
}

export function recordClick(code, logger) {
  const shorts = getShorts()
  const idx = shorts.findIndex(s => s.code === code)
  if (idx === -1) return null

  const rec = shorts[idx]
  const now = new Date().toISOString()
  const click = {
    ts: now,
    ref: document.referrer || "direct",
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ua: navigator.userAgent,
  }

  rec.clicks.unshift(click)
  rec.clickCount++
  shorts[idx] = rec
  saveShorts(shorts)
  logger.log("redirect.hit", { code, click })
  return rec
}

function generateCode(shorts) {
  let code
  do {
    code = Math.random().toString(36).substring(2, 7)
  } while (shorts.some(s => s.code === code))
  return code
}

function validateCustomCode(code, shorts) {
  if (!/^[a-zA-Z0-9_-]{3,10}$/.test(code)) {
    throw new Error("Custom code must be 3-10 chars (alphanumeric, -, _)")
  }
  if (shorts.some(s => s.code === code)) {
    throw new Error("Custom code already exists")
  }
  return code
}
