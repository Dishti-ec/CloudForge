import { useEffect, useState, useRef } from 'react'
import styles from './PageTransition.module.css'

export default function PageTransition({ children, locationKey }) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('entered')
  const prevKey = useRef(locationKey)

  useEffect(() => {
    if (locationKey !== prevKey.current) {
      setTransitionStage('entering')
      setDisplayChildren(children)
      prevKey.current = locationKey

      // Focus the main content heading after transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          setTransitionStage('entered')
          const heading = document.querySelector('main h1, main h2, main [role="alert"]')
          if (heading) heading.focus?.()
        }, 200)
      })
    } else {
      setDisplayChildren(children)
    }
  }, [children, locationKey])

  return (
    <div className={`${styles.wrapper} ${styles[transitionStage]}`}>
      {displayChildren}
    </div>
  )
}
