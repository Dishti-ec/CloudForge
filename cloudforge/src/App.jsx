import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QuestProvider } from './context/QuestContext.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import QuestIntro from './pages/QuestIntro.jsx'
import QuestDebug from './pages/QuestDebug.jsx'
import QuestResult from './pages/QuestResult.jsx'
import NotFound from './pages/NotFound.jsx'
import PageTransition from './components/PageTransition/PageTransition.jsx'

function AppRoutes() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <>
      {!isLanding && <Navbar />}
      <PageTransition locationKey={location.key}>
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quest/serverless-rescue" element={<QuestIntro />} />
          <Route path="/quest/serverless-rescue/debug" element={<QuestDebug />} />
          <Route path="/quest/serverless-rescue/result" element={<QuestResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <QuestProvider>
        <ErrorBoundary>
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main>
        </ErrorBoundary>
      </QuestProvider>
    </BrowserRouter>
  )
}
