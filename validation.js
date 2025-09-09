export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isExpired(rec) {
  return Date.now() > rec.expiresAt
}
