import type { QuestStage, IncidentContent } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusIndicator } from '../../components/ui/StatusIndicator';
import { ArchitectureVisualizer } from '../../components/features/ArchitectureVisualizer';

interface IncidentStageProps {
  stage: QuestStage;
  onContinue: () => void;
}

export function IncidentStage({ stage, onContinue }: IncidentStageProps) {
  const content = stage.content as IncidentContent;
  const { difficulty } = useSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-status-error mb-2">{content.title}</h1>
      <p className="text-sm text-text-muted mb-6">🚨 Incident Stage</p>

      {/* Narrative */}
      <Card className="mb-6 border-status-error/30">
        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {content.narrative}
        </p>
      </Card>

      {/* System Status */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
          System Status
        </h2>
        <div className="flex flex-wrap gap-6">
          {content.systemStatus.map((ss) => {
            const service = content.architecture.services.find((s) => s.id === ss.serviceId);
            return (
              <StatusIndicator
                key={ss.serviceId}
                status={ss.status}
                label={service?.name ?? ss.serviceId}
              />
            );
          })}
        </div>
      </Card>

      {/* Architecture with Status */}
      <div className="mb-6">
        <ArchitectureVisualizer
          services={content.architecture.services}
          connections={content.architecture.connections}
          showStatus={true}
        />
      </div>

      {/* Error */}
      <Card className="mb-6 border-l-4 border-l-status-error">
        <h2 className="text-sm font-semibold text-status-error uppercase tracking-wide mb-2">Error</h2>
        <p className="text-text-primary font-mono text-sm mb-4">{content.errorMessage}</p>

        {/* Difficulty-scaled log rendering */}
        {difficulty === 'junior' && content.logsJunior ? (
          <JuniorLogs logs={content.logsJunior} />
        ) : difficulty === 'principal' && content.logsPrincipal ? (
          <PrincipalLogs logs={content.logsPrincipal} />
        ) : difficulty === 'senior' && content.logsSenior ? (
          <SeniorLogs logs={content.logsSenior} />
        ) : (
          <DefaultLogs logs={content.logs} />
        )}
      </Card>

      <div className="flex justify-center">
        <Button onClick={onContinue} variant="primary" className="px-8">
          Diagnose the Problem →
        </Button>
      </div>
    </div>
  );
}

// --- Junior: Clean annotated logs with summary ---
function JuniorLogs({ logs }: { logs: { lines: string[]; annotations: string[]; summary: string } }) {
  return (
    <div>
      {/* Plain-English summary */}
      <div className="mb-4 p-3 bg-accent-secondary/5 border border-accent-secondary/20 rounded-lg">
        <p className="text-xs font-semibold text-accent-secondary uppercase tracking-wide mb-1">Summary</p>
        <p className="text-sm text-text-secondary">{logs.summary}</p>
      </div>

      <div className="bg-bg-primary rounded-lg p-4 border border-border-subtle">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
          Annotated Logs
        </h3>
        <div className="space-y-1">
          {logs.lines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <pre className={`text-xs font-mono flex-1 ${
                line.includes('ERROR') || line.includes('⚠️') ? 'text-status-error font-semibold' : 'text-text-secondary'
              }`}>
                {line}
              </pre>
              {logs.annotations[i] && (
                <span className="text-[10px] text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded whitespace-nowrap">
                  {logs.annotations[i]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Senior: Raw realistic logs with red herrings ---
function SeniorLogs({ logs }: { logs: { lines: string[]; redHerrings?: string[] } }) {
  return (
    <div className="bg-bg-primary rounded-lg p-4 overflow-x-auto border border-border-subtle">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
        CloudWatch Logs
      </h3>
      <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap leading-relaxed">
        {logs.lines.join('\n')}
      </pre>
    </div>
  );
}

// --- Principal: Multi-stream interleaved logs ---
function PrincipalLogs({ logs }: { logs: { streams: { source: string; lines: string[] }[] } }) {
  return (
    <div className="space-y-3">
      {logs.streams.map((stream, i) => (
        <div key={i} className="bg-bg-primary rounded-lg p-3 border border-border-subtle">
          <h4 className="text-[10px] font-bold text-accent-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
            {stream.source}
          </h4>
          <pre className="text-[11px] text-text-secondary font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {stream.lines.join('\n')}
          </pre>
        </div>
      ))}
    </div>
  );
}

// --- Default fallback ---
function DefaultLogs({ logs }: { logs: string[] }) {
  return (
    <div className="bg-bg-primary rounded-lg p-4 overflow-x-auto border border-border-subtle">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
        CloudWatch Logs
      </h3>
      <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap leading-relaxed">
        {logs.join('\n')}
      </pre>
    </div>
  );
}
