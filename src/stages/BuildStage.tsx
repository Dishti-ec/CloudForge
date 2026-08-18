import type { QuestStage, BuildContent } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArchitectureVisualizer } from '../../components/features/ArchitectureVisualizer';

interface BuildStageProps {
  stage: QuestStage;
  onContinue: () => void;
}

export function BuildStage({ stage, onContinue }: BuildStageProps) {
  const content = stage.content as BuildContent;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">{content.title}</h1>
      <p className="text-sm text-accent-secondary mb-6">🏗️ Build Stage</p>

      {/* Scenario */}
      <Card className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
          Scenario
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {content.scenario}
        </p>
      </Card>

      {/* Architecture */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4 text-center">
          Architecture Design
        </h2>
        <ArchitectureVisualizer
          services={content.architecture.services}
          connections={content.architecture.connections}
        />
      </div>

      {/* Mission */}
      <Card className="mb-6 border-l-4 border-l-accent-primary">
        <h3 className="text-sm font-semibold text-accent-primary mb-2">Your Mission</h3>
        <p className="text-text-secondary text-sm">{content.missionInstructions}</p>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onContinue} variant="primary" className="px-8">
          Begin Investigation →
        </Button>
      </div>
    </div>
  );
}
