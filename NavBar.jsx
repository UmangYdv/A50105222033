import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          React URL Shortener
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Shortener
        </Button>
        <Button color="inherit" component={RouterLink} to="/stats">
          Stats
        </Button>
        <Button color="inherit" component={RouterLink} to="/logs">
          Logs
        </Button>
      </Toolbar>
    </AppBar>
  )
}
