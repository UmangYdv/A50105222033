import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import { createLogger } from "./utils/logger"

import NavBar from "./components/NavBar"
import LoggerPanel from "./components/LoggerPanel"

import ShortenerPage from "./pages/ShortenerPage"
import StatsPage from "./pages/StatsPage"
import RedirectHandler from "./pages/RedirectHandler"

const logger = createLogger()

export default function App() {
  return (
    <Router>
      <NavBar />
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage logger={logger} />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/logs" element={<LoggerPanel logs={logger.getLogs()} />} />
          <Route path="/:code" element={<RedirectHandler logger={logger} />} />
        </Routes>
      </Container>
    </Router>
  )
}
