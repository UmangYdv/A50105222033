export function createLogger() {
  let logs = JSON.parse(localStorage.getItem("logs") || "[]")

  const log = (event, payload = {}) => {
    const entry = {
      id: Date.now() + Math.random(),
      ts: new Date().toISOString(),
      event,
      payload,
    }
    logs.unshift(entry)
    localStorage.setItem("logs", JSON.stringify(logs))
  }

  const getLogs = () => logs

  return { log, getLogs }
}
