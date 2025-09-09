import { getShorts } from "../utils/storage"
import { isExpired } from "../utils/validation"
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material"

export default function StatsPage() {
  const shorts = getShorts()

  return (
    <div>
      {shorts.map(s => (
        <Card key={s.code} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{window.location.origin}/{s.code}</Typography>
            <Typography variant="body2">Target: {s.longUrl}</Typography>
            <Typography variant="caption">
              Created: {new Date(s.createdAt).toLocaleString()} | Expires: {new Date(s.expiresAt).toLocaleString()} | Status: {isExpired(s) ? "Expired" : "Active"}
            </Typography>
            <Typography variant="body2">Total Clicks: {s.clickCount}</Typography>
            <List>
              {s.clicks.map((c, idx) => (
                <div key={idx}>
                  <ListItem>
                    <Typography variant="body2">
                      {c.ts} — {c.ref} — {c.tz}
                    </Typography>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
