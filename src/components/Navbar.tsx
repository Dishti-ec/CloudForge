import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { useQuest } from "../context/QuestContext"

function CloudForgeLogo() {
  return (
    <span className="group flex items-center gap-0.5 select-none">
      <span className="text-xl font-black text-accent-primary transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:drop-shadow-[0_0_8px_rgba(255,153,0,0.6)]">
        {"{"}
      </span>
      <span className="text-base font-bold text-text-primary tracking-tight mx-0.5">
        CloudForge
      </span>
      <span className="text-xl font-black text-accent-primary transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:drop-shadow-[0_0_8px_rgba(255,153,0,0.6)]">
        {"}"}
      </span>
    </span>
  )
}

// Map of page paths to readable labels for breadcrumb-style nav
function getPageLabel(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard"
  if (pathname === "/quest/serverless-rescue/result") return "Results"
  if (pathname === "/quest/serverless-rescue/debug") return "Debug"
  if (pathname === "/quest/serverless-rescue") return "Quest Intro"
  if (pathname === "/quest/first-deploy") return "First Deploy"
  if (pathname === "/quest/first-deploy/result") return "Results"
  return ""
}

function getBackPath(pathname: string): string | null {
  if (pathname === "/quest/serverless-rescue") return "/dashboard"
  if (pathname === "/quest/serverless-rescue/debug")
    return "/quest/serverless-rescue"
  if (pathname === "/quest/serverless-rescue/result")
    return "/quest/serverless-rescue/debug"
  if (pathname === "/quest/first-deploy") return "/dashboard"
  if (pathname === "/quest/first-deploy/result") return "/quest/first-deploy"
  return null
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useQuest()

  const isDashboard = location.pathname === "/dashboard"
  const backPath = getBackPath(location.pathname)
  const pageLabel = getPageLabel(location.pathname)

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-16 z-50 bg-bg-primary/85 backdrop-blur-xl border-b border-border-subtle/50"
      aria-label="Main navigation"
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center px-6">
        {/* Left: Back + Logo */}
        <div className="flex items-center gap-3">
          {backPath && (
            <button
              onClick={() => navigate(backPath)}
              className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer mr-1 p-1 -ml-1 rounded-md hover:bg-bg-elevated/50"
              aria-label="Go back"
            >
              <ChevronLeft size={18} />
              <span className="text-xs font-medium hidden sm:inline">
                Back
              </span>
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            aria-label="Go to home"
          >
            <CloudForgeLogo />
          </button>
        </div>

        {/* Center: Nav Links + Current page */}
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className={`text-sm border-none bg-transparent cursor-pointer transition-colors ${
              isDashboard
                ? "text-accent-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/quest/serverless-rescue")}
            className={`text-sm border-none bg-transparent cursor-pointer transition-colors ${
              location.pathname.startsWith("/quest")
                ? "text-accent-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Quests
          </button>
          {pageLabel && !isDashboard && (
            <span className="text-xs text-text-muted font-mono">
              / {pageLabel}
            </span>
          )}
        </div>

        {/* Right: Level + Avatar */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-accent-primary font-semibold">
            Lv {profile.level}
          </span>
          <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center hover:border-accent-primary/40 transition-colors">
            <span className="text-sm" aria-hidden="true">
              ☁️
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
