import { useState } from "react"
import { TextField, Grid, Button, Stack, Snackbar, Alert, Card, CardContent } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RefreshIcon from "@mui/icons-material/Refresh"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { createShort } from "../utils/storage"
import ShortRow from "../components/ShortRow"

export default function ShortenerPage({ logger }) {
  const [rows, setRows] = useState([{ url: "", minutes: 30, code: "" }])
  const [shorts, setShorts] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (i, field, val) => {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)))
  }

  const addRow = () => setRows([...rows, { url: "", minutes: 30, code: "" }])
  const removeRow = i => setRows(rows.filter((_, idx) => idx !== i))

  const handleSubmit = e => {
    e.preventDefault()
    try {
      const created = rows.map(r => createShort({ longUrl: r.url, minutes: r.minutes, preferredCode: r.code }, logger))
      setShorts([...created, ...shorts])
      setSuccess("Short links created successfully!")
      setRows([{ url: "", minutes: 30, code: "" }])
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {rows.map((r, i) => (
              <Grid container spacing={2} key={i} alignItems="center" sx={{ mb: 1 }}>
                <Grid item xs={5}>
                  <TextField label="Long URL" fullWidth value={r.url}
                    onChange={e => handleChange(i, "url", e.target.value)} required />
                </Grid>
                <Grid item xs={2}>
                  <TextField label="Minutes" type="number" fullWidth value={r.minutes}
                    onChange={e => handleChange(i, "minutes", e.target.value)} />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Custom Code (optional)" fullWidth value={r.code}
                    onChange={e => handleChange(i, "code", e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Remove">
                    <span>
                      <IconButton onClick={() => removeRow(i)} disabled={rows.length === 1}><DeleteIcon /></IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            ))}
            <Stack direction="row" spacing={2}>
              <Button startIcon={<AddIcon />} onClick={addRow}>Add Row</Button>
              <Button type="submit" variant="contained" startIcon={<RefreshIcon />}>Generate</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {shorts.map(rec => <ShortRow key={rec.code} rec={rec} />)}

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess("")}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </div>
  )
}
