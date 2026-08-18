import { useNavigate } from "react-router-dom"
import { Globe, Zap, Database } from "lucide-react"
import { quests } from "./data/quests"

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Zap,
  Database,
}

export default function QuestPage() {
  const navigate = useNavigate()
  const quest = quests["serverless-rescue"]

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16 relative">
      <div className="mesh-bg" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* Quest Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 text-xs bg-accent-primary/15 text-accent-primary rounded-[var(--radius-badge)] font-semibold">
                {quest.difficulty}
              </span>
              <span className="text-xs text-text-muted">
                ⏱ {quest.estimatedTime}
              </span>
            </div>
            <h1 className="text-h1 text-text-primary mb-2">{quest.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {quest.concepts.map((concept) => (
                <span
                  key={concept}
                  className="px-2.5 py-1 text-xs bg-bg-elevated text-text-secondary rounded-md border border-border-subtle"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Scenario Card */}
          <div className="glass rounded-[var(--radius-card)] p-6">
            <h2 className="text-h3 text-text-primary mb-3">Scenario</h2>
            <p className="text-text-secondary text-[15px] leading-relaxed">
              {quest.scenario}
            </p>
          </div>

          {/* Mission Card */}
          <div className="glass rounded-[var(--radius-card)] p-6">
            <h2 className="text-h3 text-text-primary mb-3">Mission</h2>
            <ul className="flex flex-col gap-2.5">
              {quest.mission.map((item, idx) => (
                <li
                  key={idx}
                  className="text-text-secondary text-[15px] pl-5 relative"
                >
                  <span className="absolute left-0 text-accent-secondary">
                    ○
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column — Architecture Graph */}
        <div className="flex justify-center items-start pt-4">
          <div className="flex flex-col items-center gap-4 w-full max-w-[280px]">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              System Architecture
            </h3>
            {quest.architecture.map((node, idx) => {
              const Icon = iconMap[node.icon] ?? Globe
              return (
                <div key={node.id}>
                  <div className="glass rounded-[var(--radius-card)] p-5 w-full flex flex-col items-center gap-2 text-center gradient-border">
                    <Icon
                      size={28}
                      className="text-accent-secondary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-text-primary">
                      {node.name}
                    </span>
                    <span className="text-xs text-text-muted leading-snug">
                      {node.description}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-status-success mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                      Operational
                    </span>
                  </div>
                  {idx < quest.architecture.length - 1 && (
                    <div className="flex justify-center py-2" aria-hidden="true">
                      <div className="w-px h-6 bg-border-subtle" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 relative z-10">
        <button
          onClick={() => navigate("/quest/serverless-rescue/debug")}
          className="px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-base rounded-[var(--radius-button)] transition-colors cursor-pointer shadow-[var(--shadow-glow)]"
        >
          Begin Investigation
        </button>
      </div>
    </div>
  )
}
