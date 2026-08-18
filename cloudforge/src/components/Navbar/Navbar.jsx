import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useQuest } from '../../context/QuestContext.jsx'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { profile } = useQuest()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoBracket}>{'{ '}</span>
          CloudForge
          <span className={styles.logoBracket}>{' }'}</span>
        </NavLink>

        <div className={styles.desktopNav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/quest/serverless-rescue"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Quests
          </NavLink>
          <button className={styles.navLink} onClick={() => {}}>
            Profile
          </button>
        </div>

        <div className={styles.levelPill}>
          LVL {profile.level}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel} role="dialog" aria-label="Navigation menu">
          <NavLink
            to="/dashboard"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/quest/serverless-rescue"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Quests
          </NavLink>
          <button
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            Profile
          </button>
        </div>
      )}
    </nav>
  )
}
