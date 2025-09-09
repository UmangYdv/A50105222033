import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { recordClick } from "../utils/storage"
import { isExpired } from "../utils/validation"

export default function RedirectHandler({ logger }) {
  const { code } = useParams()

  useEffect(() => {
    const rec = recordClick(code, logger)
    if (!rec) {
      alert("Invalid short URL")
      window.location.href = "/"
      return
    }
    if (isExpired(rec)) {
      alert("This link has expired")
      window.location.href = "/"
      return
    }
    window.location.href = rec.longUrl
  }, [code])

  return null
}
