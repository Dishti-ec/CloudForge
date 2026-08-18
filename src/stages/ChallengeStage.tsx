import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuestStage, ChallengeStageContent, ConceptMastery } from '../../types';
import { useQuest } from '../../context/QuestContext';
import { useGamification } from '../../context/GamificationContext';
import { useSettings } from '../../context/SettingsContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DiagnosisPanel } from '../../components/features/DiagnosisPanel';
import { MentorPanel } from '../../components/features/MentorPanel';

interface ChallengeStageProps {
  stage: QuestStage;
  conceptMastery: ConceptMastery;
}

export function ChallengeStage({ stage, conceptMastery }: ChallengeStageProps) {
  const content = stage.content as ChallengeStageContent;
  const { state, selectOption, setExplanation, submitChallenge, requestHint, dismissMentor, markChallengeCorrect, advanceToNextChallenge } = useQuest();
  const { updateMastery } = useGamification();
  const { difficulty, xpMultiplier } = useSettings();
  const [localExplanation, setLocalExplanation] = useState('');

  const currentAttempt = state.challenges[state.currentChallengeIndex];
  const isExplainType = content.challengeType === 'explain';
  const mentorResponse = state.mentorResponse;
  const isMentorVisible = state.mentorVisible;

  // Determine response type
  const isCorrectResponse = mentorResponse?.mode === 'explain' || (mentorResponse?.mode === 'evaluate' && !mentorResponse.allowRetry);
  const isWrongResponse = mentorResponse?.mode === 'encourage';
  const showContinueOnMentor = isCorrectResponse;

  const handleSubmit = () => {
    if (isExplainType) {
      setExplanation(localExplanation);
      submitChallenge(conceptMastery, localExplanation, difficulty);
    } else {
      submitChallenge(conceptMastery, undefined, difficulty);
    }
  };

  const handleContinue = () => {
    if (mentorResponse?.masteryDeltas && mentorResponse.masteryDeltas.length > 0) {
      updateMastery(mentorResponse.masteryDeltas.map((d) => ({
        concept: d.concept,
        delta: d.delta,
        reason: `Challenge ${content.challengeNumber}`,
      })));
    }
    markChallengeCorrect(mentorResponse?.xpAwarded ?? 0);
    advanceToNextChallenge();
  };

  const handleHint = () => {
    requestHint(conceptMastery);
  };

  const handleDismiss = () => {
    if (mentorResponse?.mode === 'encourage' && mentorResponse.masteryDeltas) {
      updateMastery(mentorResponse.masteryDeltas.map((d) => ({
        concept: d.concept,
        delta: d.delta,
        reason: `Incorrect attempt on Challenge ${content.challengeNumber}`,
      })));
    }
    dismissMentor();
  };

  const challengeTypeIcons: Record<string, string> = {
    knowledge: '🧠',
    architecture: '🏗️',
    debugging: '🔍',
    explain: '💬',
  };

  const challengeTypeLabels: Record<string, string> = {
    knowledge: 'Knowledge Check',
    architecture: 'Architecture Decision',
    debugging: 'Debugging Challenge',
    explain: 'Explain Your Reasoning',
  };

  const canSubmit = isExplainType
    ? localExplanation.trim().length > 20
    : currentAttempt?.selectedOptionId !== null;

  // Calculate displayed XP with multiplier
  const displayXP = Math.round(content.xpValue * xpMultiplier);

  return (
    <div>
      {/* Challenge header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs text-text-muted uppercase tracking-wide">
            {challengeTypeIcons[content.challengeType]} {challengeTypeLabels[content.challengeType]}
          </span>
          <h1 className="text-xl font-bold text-text-primary mt-1">
            Challenge {content.challengeNumber} of {content.totalChallenges}
          </h1>
        </div>
        <div className="text-right">
          <span className="text-sm text-accent-primary font-bold">+{displayXP} XP</span>
          {xpMultiplier > 1 && (
            <span className="block text-[10px] text-text-muted">{xpMultiplier}x multiplier</span>
          )}
        </div>
      </div>

      {/* Ruled-out theories indicator */}
      {currentAttempt && currentAttempt.wrongAttempts > 0 && !isMentorVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-status-warning/5 border border-status-warning/20 rounded-[var(--radius-card)]"
        >
          <p className="text-xs text-status-warning">
            🔎 {currentAttempt.wrongAttempts} {currentAttempt.wrongAttempts === 1 ? 'theory' : 'theories'} ruled out — narrowing it down
          </p>
        </motion.div>
      )}

      {/* Context */}
      {content.context && (
        <Card className="mb-4 border-l-4 border-l-accent-secondary" hover={false}>
          <p className="text-text-secondary text-sm">{content.context}</p>
        </Card>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isWrongResponse && isMentorVisible ? 'wrong-state' : 'normal'}
          animate={isWrongResponse && isMentorVisible ? { x: [0, -3, 3, -2, 2, 0] } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Card className={`mb-6 ${isWrongResponse && isMentorVisible ? 'border-status-warning/30' : ''}`} hover={false}>
            <h2 className="text-text-primary font-semibold mb-4">{content.question}</h2>

            {/* MCQ Options */}
            {!isExplainType && content.options && (
              <DiagnosisPanel
                options={content.options}
                onSelect={selectOption}
                selectedId={currentAttempt?.selectedOptionId ?? null}
              />
            )}

            {/* Free-text input for explain type */}
            {isExplainType && (
              <textarea
                className="w-full bg-bg-primary border border-border-subtle rounded-lg p-4 text-text-primary text-sm placeholder-text-muted resize-none focus:outline-none focus:border-accent-primary/50 transition-colors min-h-[120px]"
                placeholder="Write your explanation here... A good answer covers what the mechanism is, why it exists, and what happens when it fails."
                value={localExplanation}
                onChange={(e) => setLocalExplanation(e.target.value)}
              />
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Evidence highlight nudge (shown after wrong attempt) */}
      {isWrongResponse && isMentorVisible && mentorResponse?.evidenceHighlight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 p-3 bg-bg-primary border border-accent-primary/20 rounded-[var(--radius-card)]"
        >
          <p className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Key Evidence</p>
          <code className="text-xs text-accent-primary font-mono">
            {mentorResponse.evidenceHighlight}
          </code>
        </motion.div>
      )}

      {/* Action buttons */}
      {!isMentorVisible && (
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleHint}
            disabled={currentAttempt ? currentAttempt.hintsUsed >= content.hints.length : false}
            className="text-sm"
          >
            💡 I'm Stuck {currentAttempt && currentAttempt.hintsUsed > 0 ? `(${currentAttempt.hintsUsed}/${content.hints.length})` : ''}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Submit Answer
          </Button>
        </div>
      )}

      {/* Mentor Panel — uses warning color for wrong state */}
      {isMentorVisible && mentorResponse && (
        <MentorPanel
          response={mentorResponse}
          onDismiss={handleDismiss}
          onContinue={handleContinue}
          showContinue={showContinueOnMentor}
        />
      )}
    </div>
  );
}
