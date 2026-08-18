import { motion } from 'framer-motion';
import type { QuestStage, CompletionContent } from '../../types';
import { useQuest } from '../../context/QuestContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge as BadgeComponent } from '../../components/ui/Badge';

interface CompletionStageProps {
  stage: QuestStage;
  onComplete: () => void;
}

export function CompletionStage({ stage, onComplete }: CompletionStageProps) {
  const content = stage.content as CompletionContent;
  const { quest, state } = useQuest();

  const correctCount = state.challenges.filter((c) => c.isCorrect === true).length;
  const score = state.totalChallenges > 0
    ? Math.round((correctCount / state.totalChallenges) * 100)
    : 0;
  const totalXP = state.challenges.reduce((sum, c) => sum + c.xpEarned, 0);

  return (
    <div className="text-center">
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-6xl mb-4"
      >
        🎉
      </motion.div>

      <h1 className="text-3xl font-bold text-text-primary mb-2">Quest Complete!</h1>
      <p className="text-text-secondary mb-8">{content.summary}</p>

      {/* Score Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-3xl font-bold text-accent-primary">+{totalXP || quest.xpReward}</p>
            <p className="text-xs text-text-muted">XP Earned</p>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-3xl font-bold text-status-success">{score}%</p>
            <p className="text-xs text-text-muted">Score</p>
          </motion.div>
        </Card>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-3xl font-bold text-accent-secondary">{correctCount}/{state.totalChallenges}</p>
            <p className="text-xs text-text-muted">Correct</p>
          </motion.div>
        </Card>
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring' }}
        className="flex justify-center mb-8"
      >
        <Card className="inline-block">
          <div className="flex flex-col items-center gap-2 px-6">
            <p className="text-xs text-text-muted uppercase tracking-wide">Badge Unlocked</p>
            <BadgeComponent name={quest.badge.name} icon={quest.badge.icon} earned={true} />
          </div>
        </Card>
      </motion.div>

      {/* Skills */}
      <Card className="mb-8 text-left">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-3">
          Skills Unlocked
        </h2>
        <div className="flex flex-wrap gap-2">
          {content.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-accent-secondary/10 text-accent-secondary rounded-full border border-accent-secondary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Next */}
      <Button onClick={onComplete} variant="primary" className="text-lg px-8">
        Continue Learning →
      </Button>
    </div>
  );
}
