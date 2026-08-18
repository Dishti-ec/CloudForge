import type { QuestStage, LearnContent } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArchitectureVisualizer } from '../../components/features/ArchitectureVisualizer';

interface LearnStageProps {
  stage: QuestStage;
  onContinue: () => void;
}

export function LearnStage({ stage, onContinue }: LearnStageProps) {
  const content = stage.content as LearnContent;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">{content.title}</h1>
      <p className="text-sm text-accent-secondary mb-6">📚 Learn Stage</p>

      {/* Narrative */}
      <Card className="mb-6">
        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {content.narrative}
        </p>
      </Card>

      {/* Key Points */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
          Key Concepts
        </h2>
        <ul className="space-y-2">
          {content.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
              <span className="text-accent-primary mt-0.5 flex-shrink-0">▸</span>
              {point}
            </li>
          ))}
        </ul>
      </Card>

      {/* Architecture */}
      {content.services.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4 text-center">
            Service Architecture
          </h2>
          <ArchitectureVisualizer
            services={content.services}
            connections={content.connections}
          />
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={onContinue} variant="primary" className="px-8">
          I understand, continue →
        </Button>
      </div>
    </div>
  );
}
