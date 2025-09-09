import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function LoggerPanel({ logs }) {
  return (
    <div>
      {logs.map(log => (
        <Accordion key={log.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{log.event} — {new Date(log.ts).toLocaleTimeString()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <Typography variant="body2" component="pre">
                  {JSON.stringify(log.payload, null, 2)}
                </Typography>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
