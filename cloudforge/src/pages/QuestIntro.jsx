import { useNavigate } from 'react-router-dom'
import { quests } from '../data/quests.js'
import QuestHeader from '../components/QuestHeader/QuestHeader.jsx'
import ArchitectureGraph from '../components/ArchitectureGraph/ArchitectureGraph.jsx'
import Card from '../components/Card/Card.jsx'
import Button from '../components/Button/Button.jsx'
import styles from './QuestIntro.module.css'

export default function QuestIntro() {
  const navigate = useNavigate()
  const quest = quests['serverless-rescue']

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <QuestHeader
            title={quest.title}
            difficulty={quest.difficulty}
            estimatedTime={quest.estimatedTime}
            concepts={quest.concepts}
          />

          <Card padding="24px">
            <h2 className={styles.sectionTitle}>Scenario</h2>
            <p className={styles.scenario}>{quest.scenario}</p>
          </Card>

          <Card padding="24px">
            <h2 className={styles.sectionTitle}>Mission</h2>
            <ul className={styles.mission}>
              {quest.mission.map((item, idx) => (
                <li key={idx} className={styles.missionItem}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className={styles.right}>
          <ArchitectureGraph nodes={quest.architecture} direction="vertical" />
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Button variant="primary" size="lg" onClick={() => navigate('/quest/serverless-rescue/debug')}>
          Begin Investigation
        </Button>
      </div>
    </div>
  )
}
