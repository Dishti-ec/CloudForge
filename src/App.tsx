import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { QuestProvider } from "./context/QuestContext"
import { DifficultyProvider } from "./context/DifficultyContext"
import Navbar from "./components/Navbar"
import Landing from "./Landing"
import DashboardPage from "./DashboardPage"
import QuestPage from "./QuestPage"
import QuestDebugPage from "./QuestDebugPage"
import QuestResultPage from "./QuestResultPage"
import FirstDeployPage from "./FirstDeployPage"
import FirstDeployResultPage from "./FirstDeployResultPage"

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-bg-primary text-text-primary">
      <h1 className="text-h1">404 — Page Not Found</h1>
      <a href="/" className="text-accent-secondary underline">
        Back to home
      </a>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isLanding = location.pathname === "/"

  return (
    <>
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quest/serverless-rescue" element={<QuestPage />} />
        <Route
          path="/quest/serverless-rescue/debug"
          element={<QuestDebugPage />}
        />
        <Route
          path="/quest/serverless-rescue/result"
          element={<QuestResultPage />}
        />
        <Route path="/quest/first-deploy" element={<FirstDeployPage />} />
        <Route
          path="/quest/first-deploy/result"
          element={<FirstDeployResultPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <QuestProvider>
        <DifficultyProvider>
          <AppRoutes />
        </DifficultyProvider>
      </QuestProvider>
    </BrowserRouter>
  )
}
