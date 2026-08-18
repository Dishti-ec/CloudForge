import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Cloud, Menu, X, Zap, Shield, BookOpen, Trophy, Brain, AlertTriangle, CheckCircle, Lock, TrendingUp } from 'lucide-react'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()
  const archRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleExplore = () => {
    archRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      {/* Atmospheric background */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlowBlue} aria-hidden="true" />
      <div className={styles.bgGlowOrange} aria-hidden="true" />

      {/* ===== NAVBAR ===== */}
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.navInner}>
          <div className={styles.navLeft}>
            <Cloud size={20} className={styles.navCloudIcon} />
            <span className={styles.navBrand}>CloudForge</span>
            <span className={styles.navDescriptor}>/ CLOUDLAB</span>
          </div>

          <div className={styles.navCenter}>
            <a href="#how-it-works" className={styles.navLink}>How It Works</a>
            <a href="#quests" className={styles.navLink}>Quests</a>
            <a href="#cloudlab" className={styles.navLink} onClick={(e) => { e.preventDefault(); handleExplore() }}>CloudLab</a>
            <a href="#about" className={styles.navLink}>About</a>
          </div>

          <div className={styles.navRight}>
            <button className={styles.navSignIn}>Sign In</button>
            <button className={styles.navCta} onClick={() => navigate('/dashboard')}>
              Start Learning <ArrowRight size={14} />
            </button>
          </div>

          <button
            className={styles.navHamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className={styles.mobileNav}>
            <a href="#how-it-works" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#quests" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>Quests</a>
            <a href="#cloudlab" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>CloudLab</a>
            <a href="#about" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>About</a>
            <button className={styles.navCta} onClick={() => { setMobileOpen(false); navigate('/dashboard') }}>
              Start Learning <ArrowRight size={14} />
            </button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowStar}>&#10022;</span> AI-POWERED CLOUD LEARNING LAB
        </span>

        <h1 className={styles.heroTitle}>
          Build. Break.<br />
          Debug. Master <span className={styles.heroAccent}>AWS.</span>
        </h1>

        <p className={styles.heroSub}>
          Stop memorizing cloud services. Start solving real cloud problems.
        </p>

        <p className={styles.heroDesc}>
          CloudForge is an AI-powered, gamified cloud learning lab where students learn AWS by building, breaking, debugging, and explaining real-world cloud architectures.
        </p>

        <div className={styles.heroCtas}>
          <button className={styles.ctaPrimary} onClick={() => navigate('/dashboard')}>
            Start Your First Quest <ArrowRight size={16} />
          </button>
          <button className={styles.ctaSecondary} onClick={handleExplore}>
            Explore CloudLab
          </button>
        </div>

        <p className={styles.heroTrust}>
          No AWS experience required &bull; Learn by doing &bull; AI-guided
        </p>
      </section>

      {/* ===== HERO VISUAL ===== */}
      <section className={styles.heroVisual} ref={archRef} id="cloudlab">
        <div className={styles.archCanvas}>
          {/* Live header */}
          <div className={styles.liveHeader}>
            <span className={styles.liveDot} />
            <span className={styles.liveText}>CLOUDLAB LIVE</span>
          </div>

          {/* Architecture nodes */}
          <div className={styles.archFlow}>
            <div className={styles.archNode}>
              <div className={styles.archNodeIcon} style={{ color: 'var(--accent-cool)' }}>&#9670;</div>
              <span className={styles.archNodeName}>API GATEWAY</span>
              <span className={styles.archNodeStatus}><span className={styles.statusDotGreen} /> LIVE</span>
            </div>
            <div className={styles.archConnector}>
              <div className={styles.archLine} />
              <div className={styles.archPacket} />
            </div>
            <div className={styles.archNode}>
              <div className={styles.archNodeIcon} style={{ color: 'var(--accent)' }}>&#955;</div>
              <span className={styles.archNodeName}>LAMBDA</span>
              <span className={styles.archNodeStatus}><span className={styles.statusDotGreen} /> LIVE</span>
            </div>
            <div className={styles.archConnector}>
              <div className={styles.archLine} />
              <div className={styles.archPacket} />
            </div>
            <div className={styles.archNode}>
              <div className={styles.archNodeIcon} style={{ color: 'var(--accent-cool)' }}>&#9707;</div>
              <span className={styles.archNodeName}>DYNAMODB</span>
              <span className={styles.archNodeStatus}><span className={styles.statusDotGreen} /> LIVE</span>
            </div>
          </div>

          {/* Floating cards */}
          <div className={styles.floatingCard + ' ' + styles.healthCard}>
            <span className={styles.floatingCardTitle}>SYSTEM HEALTH</span>
            <div className={styles.healthRow}><span>API Gateway</span><span className={styles.healthGreen}>99.9%</span></div>
            <div className={styles.healthRow}><span>Lambda</span><span className={styles.healthGreen}>100%</span></div>
            <div className={styles.healthRow}><span>DynamoDB</span><span className={styles.healthGreen}>98.7%</span></div>
          </div>

          <div className={styles.floatingCard + ' ' + styles.incidentCard}>
            <span className={styles.incidentBadge}>&#128680; INCIDENT DETECTED</span>
            <code className={styles.incidentCode}>AccessDeniedException</code>
            <button className={styles.incidentBtn} onClick={() => navigate('/quest/serverless-rescue/debug')}>
              INVESTIGATE <ArrowRight size={12} />
            </button>
          </div>

          <div className={styles.floatingCard + ' ' + styles.questIndicator}>
            <span className={styles.questLive}><span className={styles.statusDotOrange} /> LIVE QUEST</span>
            <span className={styles.questTitle}>SERVERLESS RESCUE</span>
            <div className={styles.questMeta}>
              <span>Difficulty <span className={styles.questStars}>&#9733;&#9733;&#9734;</span></span>
              <span>~7 min</span>
              <span className={styles.questXp}>+250 XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className={styles.trustStrip} id="how-it-works">
        <div className={styles.trustLoop}>
          {['LEARN', 'BUILD', 'BREAK', 'DEBUG', 'EXPLAIN', 'MASTER'].map((step, i) => (
            <div key={step} className={styles.trustStep}>
              <span className={styles.trustStepName}>{step}</span>
              {i < 5 && <span className={styles.trustArrow}>&#8594;</span>}
            </div>
          ))}
        </div>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>LEARN</span>
            <span className={styles.trustDesc}>Real AWS concepts</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>BUILD</span>
            <span className={styles.trustDesc}>Cloud architectures</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>BREAK</span>
            <span className={styles.trustDesc}>Simulated incidents</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>DEBUG</span>
            <span className={styles.trustDesc}>Reason from evidence</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>EXPLAIN</span>
            <span className={styles.trustDesc}>AI feedback</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustLabel}>MASTER</span>
            <span className={styles.trustDesc}>Earn XP &amp; badges</span>
          </div>
        </div>
      </section>

      {/* ===== WHY CLOUDFORGE ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>AWS shouldn't feel like a textbook.</h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <BookOpen size={28} className={styles.whyIcon} />
            <h3 className={styles.whyCardTitle}>Traditional Learning</h3>
            <p className={styles.whyCardDesc}>Watch tutorials. Read documentation. Memorize services.</p>
          </div>
          <div className={styles.whyCard + ' ' + styles.whyCardHighlight}>
            <Zap size={28} className={styles.whyIconAccent} />
            <h3 className={styles.whyCardTitle}>CloudForge</h3>
            <p className={styles.whyCardDesc}>Enter a scenario. Make decisions. See what breaks.</p>
          </div>
          <div className={styles.whyCard}>
            <Brain size={28} className={styles.whyIcon} />
            <h3 className={styles.whyCardTitle}>AI Mentor</h3>
            <p className={styles.whyCardDesc}>Get guidance that helps you reason instead of simply giving you answers.</p>
          </div>
          <div className={styles.whyCard}>
            <Trophy size={28} className={styles.whyIcon} />
            <h3 className={styles.whyCardTitle}>Progress</h3>
            <p className={styles.whyCardDesc}>Build real cloud intuition through quests, XP, badges, and challenges.</p>
          </div>
        </div>
      </section>

      {/* ===== LEARNING LOOP ===== */}
      <section className={styles.section} id="about">
        <h2 className={styles.sectionTitle}>
          Don't just learn cloud.<br />
          <span className={styles.titleAccent}>Experience it.</span>
        </h2>
        <div className={styles.loopGrid}>
          {[
            { num: '01', title: 'LEARN', desc: 'Understand the concept' },
            { num: '02', title: 'BUILD', desc: 'Design the architecture' },
            { num: '03', title: 'BREAK', desc: 'Face a realistic failure' },
            { num: '04', title: 'DEBUG', desc: 'Investigate the evidence' },
            { num: '05', title: 'EXPLAIN', desc: 'Defend your reasoning' },
            { num: '06', title: 'MASTER', desc: 'Earn XP and unlock skills' },
          ].map((step) => (
            <div key={step.num} className={styles.loopStep}>
              <span className={styles.loopNum}>{step.num}</span>
              <span className={styles.loopTitle}>{step.title}</span>
              <span className={styles.loopDesc}>{step.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BREAK THE CLOUD ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What happens when everything breaks?</h2>
        <div className={styles.breakGrid}>
          <div className={styles.breakCard}>
            <span className={styles.breakLabel}>BEFORE</span>
            <div className={styles.breakNodes}>
              <div className={styles.breakNode}><span className={styles.statusDotGreen} /> API Gateway</div>
              <div className={styles.breakArrow}>&#8595;</div>
              <div className={styles.breakNode}><span className={styles.statusDotGreen} /> Lambda</div>
              <div className={styles.breakArrow}>&#8595;</div>
              <div className={styles.breakNode}><span className={styles.statusDotGreen} /> DynamoDB</div>
            </div>
            <span className={styles.breakStatus}>All systems operational</span>
          </div>

          <div className={styles.breakTransition}>&#9889;</div>

          <div className={styles.breakCard + ' ' + styles.breakCardError}>
            <span className={styles.breakLabel + ' ' + styles.breakLabelError}>INCIDENT</span>
            <div className={styles.breakNodes}>
              <div className={styles.breakNode}><span className={styles.statusDotGreen} /> API Gateway</div>
              <div className={styles.breakArrow}>&#8595;</div>
              <div className={styles.breakNode}><span className={styles.statusDotGreen} /> Lambda</div>
              <div className={styles.breakArrow}>&#8595;</div>
              <div className={styles.breakNode + ' ' + styles.breakNodeError}><span className={styles.statusDotRed} /> DynamoDB</div>
            </div>
            <code className={styles.breakError}>403 AccessDeniedException</code>
          </div>
        </div>

        <p className={styles.breakPrompt}>Can you find the problem?</p>
        <button className={styles.ctaPrimary} onClick={() => navigate('/quest/serverless-rescue/debug')}>
          Enter the Lab <ArrowRight size={16} />
        </button>
      </section>

      {/* ===== AI MENTOR ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>An AI mentor that doesn't give away the answer.</h2>
        <div className={styles.chatDemo}>
          <div className={styles.chatMsg + ' ' + styles.chatUser}>
            <span className={styles.chatSender}>YOU</span>
            <p>Is Lambda the problem?</p>
          </div>
          <div className={styles.chatMsg + ' ' + styles.chatMentor}>
            <span className={styles.chatSender}>&#129302; CLOUDFORGE MENTOR</span>
            <p>What evidence makes you think Lambda itself is failing?</p>
          </div>
          <div className={styles.chatMsg + ' ' + styles.chatUser}>
            <span className={styles.chatSender}>YOU</span>
            <p>The logs say AccessDenied.</p>
          </div>
          <div className={styles.chatMsg + ' ' + styles.chatMentor}>
            <span className={styles.chatSender}>&#129302; CLOUDFORGE MENTOR</span>
            <p>Exactly. "AccessDenied" points us toward authorization rather than availability. Look at the Lambda execution role.</p>
          </div>
        </div>
        <p className={styles.mentorCaption}>Socratic guidance &bull; Personalized feedback &bull; Concept reinforcement</p>
      </section>

      {/* ===== GAMIFICATION ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Turn cloud skills into progress.</h2>
        <div className={styles.gamifCard}>
          <div className={styles.gamifHeader}>
            <span className={styles.gamifName}>CLOUD EXPLORER</span>
            <span className={styles.gamifLevel}>LEVEL 03</span>
          </div>
          <div className={styles.gamifXpBar}>
            <div className={styles.gamifXpFill} style={{ width: '84%' }} />
          </div>
          <span className={styles.gamifXpLabel}>840 / 1000 XP</span>
          <div className={styles.gamifBadges}>
            <span className={styles.gamifBadge}><Shield size={16} /> IAM Detective</span>
            <span className={styles.gamifBadge}><Zap size={16} /> Serverless Rookie</span>
            <span className={styles.gamifBadge}><Cloud size={16} /> S3 Explorer</span>
          </div>
          <span className={styles.gamifStreak}>&#128293; 4 Day Streak</span>
        </div>
      </section>

      {/* ===== QUEST PREVIEW ===== */}
      <section className={styles.section} id="quests">
        <h2 className={styles.sectionTitle}>Your next challenge awaits.</h2>
        <div className={styles.questGrid}>
          <div className={styles.questPreviewCard + ' ' + styles.questActive} onClick={() => navigate('/quest/serverless-rescue')}>
            <span className={styles.questEmoji}>&#128640;</span>
            <h3 className={styles.questPrevTitle}>Serverless Rescue</h3>
            <span className={styles.questTags}>IAM &bull; Lambda &bull; DynamoDB</span>
            <div className={styles.questBottom}>
              <span className={styles.questStars}>&#9733;&#9733;&#9734;</span>
              <span className={styles.questXp}>+250 XP</span>
            </div>
          </div>
          <div className={styles.questPreviewCard + ' ' + styles.questLocked}>
            <span className={styles.questEmoji}>&#128274;</span>
            <h3 className={styles.questPrevTitle}>Permission Denied</h3>
            <span className={styles.questTags}>IAM &bull; Security</span>
            <div className={styles.questBottom}>
              <span className={styles.questStars}>&#9733;&#9733;&#9733;</span>
              <span className={styles.questXp}>+400 XP</span>
            </div>
            <span className={styles.comingSoon}>COMING SOON</span>
          </div>
          <div className={styles.questPreviewCard + ' ' + styles.questLocked}>
            <span className={styles.questEmoji}>&#128200;</span>
            <h3 className={styles.questPrevTitle}>The Scaling Crisis</h3>
            <span className={styles.questTags}>EC2 &bull; Load Balancing</span>
            <div className={styles.questBottom}>
              <span className={styles.questStars}>&#9733;&#9733;&#9733;&#9733;</span>
              <span className={styles.questXp}>+600 XP</span>
            </div>
            <span className={styles.comingSoon}>COMING SOON</span>
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE SECTION ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Learn architecture by actually using it.</h2>
        <div className={styles.archLearnGrid}>
          <div className={styles.archLearnCanvas}>
            <div className={styles.archLearnFlow}>
              <div className={styles.archLearnNode}>USER</div>
              <div className={styles.archLearnArrow}>&#8595;</div>
              <div className={styles.archLearnNode}>API GATEWAY</div>
              <div className={styles.archLearnArrow}>&#8595;</div>
              <div className={styles.archLearnNode}>LAMBDA</div>
              <div className={styles.archLearnBranch}>
                <div className={styles.archLearnArrow}>&#8601;</div>
                <div className={styles.archLearnArrow}>&#8600;</div>
              </div>
              <div className={styles.archLearnRow}>
                <div className={styles.archLearnNode}>DYNAMODB</div>
                <div className={styles.archLearnNode}>S3</div>
              </div>
            </div>
          </div>
          <div className={styles.archLearnText}>
            <h3 className={styles.archLearnHeading}>Understand the "why."</h3>
            <ul className={styles.archLearnList}>
              <li>Why Lambda instead of EC2?</li>
              <li>When should you use DynamoDB?</li>
              <li>What happens when permissions fail?</li>
              <li>How does the architecture scale?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalTitle}>Your first cloud incident is waiting.</h2>
        <p className={styles.finalDesc}>
          You don't need to know AWS.<br />
          You just need to be willing to investigate.
        </p>
        <button className={styles.ctaPrimary} onClick={() => navigate('/dashboard')}>
          Enter CloudForge <ArrowRight size={16} />
        </button>
        <p className={styles.finalLoop}>Build &bull; Break &bull; Debug &bull; Master</p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Cloud size={18} className={styles.navCloudIcon} />
            <span className={styles.footerName}>CloudForge</span>
            <p className={styles.footerTagline}>Build. Break. Debug. Master AWS.</p>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Product</span>
            <a href="#how-it-works" className={styles.footerLink}>How It Works</a>
            <a href="#quests" className={styles.footerLink}>Quests</a>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Community</span>
            <a href="#" className={styles.footerLink}>GitHub</a>
            <a href="#about" className={styles.footerLink}>About</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          Built for AWS learners.
        </div>
      </footer>
    </div>
  )
}
