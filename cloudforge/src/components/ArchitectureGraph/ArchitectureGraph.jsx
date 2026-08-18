import { ArrowRight, ArrowDown } from 'lucide-react'
import ArchitectureNode from '../ArchitectureNode/ArchitectureNode.jsx'
import styles from './ArchitectureGraph.module.css'

export default function ArchitectureGraph({ nodes = [], direction = 'horizontal' }) {
  return (
    <div
      className={`${styles.graph} ${direction === 'vertical' ? styles.vertical : styles.horizontal}`}
      aria-label="Architecture diagram"
    >
      {nodes.map((node, idx) => (
        <div key={node.id} className={styles.segment}>
          <ArchitectureNode
            icon={node.icon}
            name={node.name}
            status={node.status}
            description={node.description}
          />
          {idx < nodes.length - 1 && (
            <div
              className={`${styles.connector} ${
                nodes[idx + 1]?.status === 'error' ? styles.connectorError : ''
              }`}
              aria-hidden="true"
            >
              {direction === 'vertical' ? (
                <ArrowDown size={20} />
              ) : (
                <ArrowRight size={20} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
