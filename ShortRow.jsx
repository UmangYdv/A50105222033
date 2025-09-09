import { Card, CardContent, Typography, Chip } from "@mui/material"
import { useState } from "react"

export default function ShortRow({ rec }) {
  const [copied, setCopied] = useState(false)
  const shortUrl = `${window.location.origin}/${rec.code}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1" noWrap sx={{ cursor: "pointer" }} onClick={handleCopy}>
          {shortUrl}
        </Typography>
        <Typography variant="body2">{rec.longUrl}</Typography>
        <Typography variant="caption">
          Expires: {new Date(rec.expiresAt).toLocaleString()} | Clicks: {rec.clickCount}
        </Typography>
        {copied && <Chip label="Copied!" color="success" size="small" sx={{ ml: 1 }} />}
      </CardContent>
    </Card>
  )
}
