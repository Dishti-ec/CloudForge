import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Cloud,
  Menu,
  X,
  Zap,
  Shield,
  BookOpen,
  Trophy,
  Brain,
} from "lucide-react"
import styles from "./Landing.module.css"

export default function Landing() {
  const navigate = useNavigate()
  const archRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleExplore = () => {
    archRef.current?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
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
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-0 cursor-pointer bg-transparent border-none p-0 group"
              aria-label="Home"
            >
              <span className="text-xl font-black text-[var(--accent)] transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-0.5" style={{ filter: 'drop-shadow(0 0 0px transparent)' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 8px rgba(255,153,0,0.6))' }} onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 0px transparent)' }}>{"{"}</span>
              <span className={styles.navBrand} style={{ margin: '0 2px' }}>CloudForge</span>
              <span className="text-xl font-black text-[var(--accent)] transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-0.5" style={{ filter: 'drop-shadow(0 0 0px transparent)' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 8px rgba(255,153,0,0.6))' }} onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'drop-shadow(0 0 0px transparent)' }}>{"}"}</span>
            </button>
          </div>

          <div className={styles.navCenter}>
            <button
              className={styles.navLink}
              onClick={() => scrollTo("how-it-works")}
            >
              How It Works
            </button>
            <button
              className={styles.navLink}
              onClick={() => scrollTo("quests")}
            >
              Quests
            </button>
            <button className={styles.navLink} onClick={handleExplore}>
              CloudLab
            </button>
            <button
              className={styles.navLink}
              onClick={() => scrollTo("about")}
            >
              About
            </button>
          </div>

          <div className={styles.navRight}>
            <button className={styles.navSignIn}>Sign In</button>
            <button
              className={styles.navCta}
              onClick={() => navigate("/dashboard")}
            >
              Start Learning <ArrowRight size={14} />
            </button>
          </div>

          <button
            className={styles.navHamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className={styles.mobileNav} role="dialog" aria-label="Mobile navigation">
            <button
              className={styles.mobileNavLink}
              onClick={() => scrollTo("how-it-works")}
            >
              How It Works
            </button>
            <button
              className={styles.mobileNavLink}
              onClick={() => scrollTo("quests")}
            >
              Quests
            </button>
            <button className={styles.mobileNavLink} onClick={handleExplore}>
              CloudLab
            </button>
            <button
              className={styles.mobileNavLink}
              onClick={() => scrollTo("about")}
            >
              About
            </button>
            <button
              className={styles.navCta}
              style={{ marginTop: 16 }}
              onClick={() => {
                setMobileOpen(false)
                navigate("/dashboard")
              }}
            >
              Start Learning <ArrowRight size={14} />
            </button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowStar}>&#10022;</span> AI-POWERED CLOUD
          LEARNING LAB
        </span>

        <h1 className={styles.heroTitle}>
          Build. Break.
          <br />
          Debug. Master <span className={styles.heroAccent}>AWS.</span>
        </h1>

        <p className={styles.heroSub}>
          Stop memorizing cloud services. Start solving real cloud problems.
        </p>

        <p className={styles.heroDesc}>
          CloudForge is an AI-powered, gamified cloud learning lab where students
          learn AWS by building, breaking, debugging, and explaining real-world
          cloud architectures.
        </p>

        <div className={styles.heroCtas}>
          <button
            className={styles.ctaPrimary}
            onClick={() => navigate("/dashboard")}
          >
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
      <section
        className={styles.heroVisual}
        ref={archRef}
        id="cloudlab"
        aria-label="CloudLab architecture preview"
      >
        <div className={styles.archCanvas}>
          {/* Live header */}
          <div className={styles.liveHeader}>
            <span className={styles.liveDot} />
            <span className={styles.liveText}>CLOUDLAB LIVE</span>
          </div>

          {/* Architecture nodes */}
          <div className={styles.archFlow}>
            <div className={styles.archNode}>
              <div
                className={styles.archNodeIcon}
                style={{ color: "var(--accent-cool)" }}
              >
                &#9670;
              </div>
              <span className={styles.archNodeName}>API GATEWAY</span>
              <span className={styles.archNodeStatus}>
                <span className={styles.statusDotGreen} /> LIVE
              </span>
            </div>
            <div className={styles.archConnector} aria-hidden="true">
              <div className={styles.archLine} />
              <div className={styles.archPacket} />
            </div>
            <div className={styles.archNode}>
              <div
                className={styles.archNodeIcon}
                style={{ color: "var(--accent)" }}
              >
                &#955;
              </div>
              <span className={styles.archNodeName}>LAMBDA</span>
              <span className={styles.archNodeStatus}>
                <span className={styles.statusDotGreen} /> LIVE
              </span>
            </div>
            <div className={styles.archConnector} aria-hidden="true">
              <div className={styles.archLine} />
              <div className={styles.archPacket} />
            </div>
            <div className={styles.archNode}>
              <div
                className={styles.archNodeIcon}
                style={{ color: "var(--accent-cool)" }}
              >
                &#9707;
              </div>
              <span className={styles.archNodeName}>DYNAMODB</span>
              <span className={styles.archNodeStatus}>
                <span className={styles.statusDotGreen} /> LIVE
              </span>
            </div>
          </div>

          {/* Floating cards */}
          <div className={`${styles.floatingCard} ${styles.healthCard}`}>
            <span className={styles.floatingCardTitle}>SYSTEM HEALTH</span>
            <div className={styles.healthRow}>
              <span>API Gateway</span>
              <span className={styles.healthGreen}>99.9%</span>
            </div>
            <div className={styles.healthRow}>
              <span>Lambda</span>
              <span className={styles.healthGreen}>100%</span>
            </div>
            <div className={styles.healthRow}>
              <span>DynamoDB</span>
              <span className={styles.healthGreen}>98.7%</span>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.incidentCard}`}>
            <span className={styles.incidentBadge}>
              &#128680; INCIDENT DETECTED
            </span>
            <code className={styles.incidentCode}>AccessDeniedException</code>
            <button
              className={styles.incidentBtn}
              onClick={() => navigate("/quest/serverless-rescue/debug")}
            >
              INVESTIGATE <ArrowRight size={12} />
            </button>
          </div>

          <div className={`${styles.floatingCard} ${styles.questIndicator}`}>
            <span className={styles.questLive}>
              <span className={styles.statusDotOrange} /> LIVE QUEST
            </span>
            <span className={styles.questTitle}>SERVERLESS RESCUE</span>
            <div className={styles.questMeta}>
              <span>
                Difficulty{" "}
                <span className={styles.questStars}>&#9733;&#9733;&#9734;</span>
              </span>
              <span>~7 min</span>
              <span className={styles.questXp}>+250 XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section
        className={styles.trustStrip}
        id="how-it-works"
        aria-label="Learning loop"
      >
        <div className={styles.trustLoop}>
          {["LEARN", "BUILD", "BREAK", "DEBUG", "EXPLAIN", "MASTER"].map(
            (step, i) => (
              <div key={step} className={styles.trustStep}>
                <span className={styles.trustStepName}>{step}</span>
                {i < 5 && (
                  <span className={styles.trustArrow} aria-hidden="true">
                    &#8594;
                  </span>
                )}
              </div>
            ),
          )}
        </div>
        <div className={styles.trustGrid}>
          {[
            { label: "LEARN", desc: "Real AWS concepts" },
            { label: "BUILD", desc: "Cloud architectures" },
            { label: "BREAK", desc: "Simulated incidents" },
            { label: "DEBUG", desc: "Reason from evidence" },
            { label: "EXPLAIN", desc: "AI feedback" },
            { label: "MASTER", desc: "Earn XP & badges" },
          ].map((item) => (
            <div key={item.label} className={styles.trustItem}>
              <span className={styles.trustLabel}>{item.label}</span>
              <span className={styles.trustDesc}>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== WHY CLOUDFORGE ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          AWS shouldn&apos;t feel like a textbook.
        </h2>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <BookOpen size={28} className={styles.whyIcon} aria-hidden="true" />
            <h3 className={styles.whyCardTitle}>Traditional Learning</h3>
            <p className={styles.whyCardDesc}>
              Watch tutorials. Read documentation. Memorize services.
            </p>
          </div>
          <div className={`${styles.whyCard} ${styles.whyCardHighlight}`}>
            <Zap size={28} className={styles.whyIconAccent} aria-hidden="true" />
            <h3 className={styles.whyCardTitle}>CloudForge</h3>
            <p className={styles.whyCardDesc}>
              Enter a scenario. Make decisions. See what breaks.
            </p>
          </div>
          <div className={styles.whyCard}>
            <Brain size={28} className={styles.whyIcon} aria-hidden="true" />
            <h3 className={styles.whyCardTitle}>AI Mentor</h3>
            <p className={styles.whyCardDesc}>
              Get guidance that helps you reason instead of simply giving you
              answers.
            </p>
          </div>
          <div className={styles.whyCard}>
            <Trophy size={28} className={styles.whyIcon} aria-hidden="true" />
            <h3 className={styles.whyCardTitle}>Progress</h3>
            <p className={styles.whyCardDesc}>
              Build real cloud intuition through quests, XP, badges, and
              challenges.
            </p>
          </div>
        </div>
      </section>

      {/* ===== LEARNING LOOP ===== */}
      <section className={styles.section} id="about">
        <h2 className={styles.sectionTitle}>
          Don&apos;t just learn cloud.
          <br />
          <span className={styles.titleAccent}>Experience it.</span>
        </h2>
        <div className={styles.loopGrid}>
          {[
            { num: "01", title: "LEARN", desc: "Understand the concept" },
            { num: "02", title: "BUILD", desc: "Design the architecture" },
            { num: "03", title: "BREAK", desc: "Face a realistic failure" },
            { num: "04", title: "DEBUG", desc: "Investigate the evidence" },
            { num: "05", title: "EXPLAIN", desc: "Defend your reasoning" },
            {
              num: "06",
              title: "MASTER",
              desc: "Earn XP and unlock skills",
            },
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
        <h2 className={styles.sectionTitle}>
          What happens when everything breaks?
        </h2>
        <div className={styles.breakGrid}>
          <div className={styles.breakCard}>
            <span className={styles.breakLabel}>BEFORE</span>
            <div className={styles.breakNodes}>
              <div className={styles.breakNode}>
                <span className={styles.statusDotGreen} aria-hidden="true" /> API
                Gateway
              </div>
              <div className={styles.breakArrow} aria-hidden="true">
                &#8595;
              </div>
              <div className={styles.breakNode}>
                <span className={styles.statusDotGreen} aria-hidden="true" />{" "}
                Lambda
              </div>
              <div className={styles.breakArrow} aria-hidden="true">
                &#8595;
              </div>
              <div className={styles.breakNode}>
                <span className={styles.statusDotGreen} aria-hidden="true" />{" "}
                DynamoDB
              </div>
            </div>
            <span className={styles.breakStatus}>All systems operational</span>
          </div>

          <div className={styles.breakTransition} aria-hidden="true">
            &#9889;
          </div>

          <div className={`${styles.breakCard} ${styles.breakCardError}`}>
            <span className={`${styles.breakLabel} ${styles.breakLabelError}`}>
              INCIDENT
            </span>
            <div className={styles.breakNodes}>
              <div className={styles.breakNode}>
                <span className={styles.statusDotGreen} aria-hidden="true" /> API
                Gateway
              </div>
              <div className={styles.breakArrow} aria-hidden="true">
                &#8595;
              </div>
              <div className={styles.breakNode}>
                <span className={styles.statusDotGreen} aria-hidden="true" />{" "}
                Lambda
              </div>
              <div className={styles.breakArrow} aria-hidden="true">
                &#8595;
              </div>
              <div
                className={`${styles.breakNode} ${styles.breakNodeError}`}
              >
                <span className={styles.statusDotRed} aria-hidden="true" />{" "}
                DynamoDB
              </div>
            </div>
            <code className={styles.breakError}>
              403 AccessDeniedException
            </code>
          </div>
        </div>

        <p className={styles.breakPrompt}>Can you find the problem?</p>
        <button
          className={styles.ctaPrimary}
          onClick={() => navigate("/quest/serverless-rescue/debug")}
        >
          Enter the Lab <ArrowRight size={16} />
        </button>
      </section>

      {/* ===== AI MENTOR ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          An AI mentor that doesn&apos;t give away the answer.
        </h2>
        <div
          className={styles.chatDemo}
          aria-label="Example mentor conversation"
        >
          <div className={`${styles.chatMsg} ${styles.chatUser}`}>
            <span className={styles.chatSender}>YOU</span>
            <p>Is Lambda the problem?</p>
          </div>
          <div className={`${styles.chatMsg} ${styles.chatMentor}`}>
            <span className={styles.chatSender}>
              &#129302; CLOUDFORGE MENTOR
            </span>
            <p>What evidence makes you think Lambda itself is failing?</p>
          </div>
          <div className={`${styles.chatMsg} ${styles.chatUser}`}>
            <span className={styles.chatSender}>YOU</span>
            <p>The logs say AccessDenied.</p>
          </div>
          <div className={`${styles.chatMsg} ${styles.chatMentor}`}>
            <span className={styles.chatSender}>
              &#129302; CLOUDFORGE MENTOR
            </span>
            <p>
              Exactly. &ldquo;AccessDenied&rdquo; points us toward
              authorization rather than availability. Look at the Lambda
              execution role.
            </p>
          </div>
        </div>
        <p className={styles.mentorCaption}>
          Socratic guidance &bull; Personalized feedback &bull; Concept
          reinforcement
        </p>
      </section>

      {/* ===== GAMIFICATION ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Turn cloud skills into progress.
        </h2>
        <div className={styles.gamifCard} aria-label="Player profile preview">
          <div className={styles.gamifHeader}>
            <span className={styles.gamifName}>CLOUD EXPLORER</span>
            <span className={styles.gamifLevel}>LEVEL 03</span>
          </div>
          <div className={styles.gamifXpBar}>
            <div className={styles.gamifXpFill} style={{ width: "84%" }} />
          </div>
          <span className={styles.gamifXpLabel}>840 / 1000 XP</span>
          <div className={styles.gamifBadges}>
            <span className={styles.gamifBadge}>
              <Shield size={16} aria-hidden="true" /> IAM Detective
            </span>
            <span className={styles.gamifBadge}>
              <Zap size={16} aria-hidden="true" /> Serverless Rookie
            </span>
            <span className={styles.gamifBadge}>
              <Cloud size={16} aria-hidden="true" /> S3 Explorer
            </span>
          </div>
          <span className={styles.gamifStreak}>&#128293; 4 Day Streak</span>
        </div>
      </section>

      {/* ===== QUEST PREVIEW ===== */}
      <section className={styles.section} id="quests">
        <h2 className={styles.sectionTitle}>Your next challenge awaits.</h2>
        <div className={styles.questGrid}>
          <button
            className={`${styles.questPreviewCard} ${styles.questActive}`}
            onClick={() => navigate("/quest/serverless-rescue")}
            aria-label="Start Serverless Rescue quest"
          >
            <span className={styles.questEmoji} aria-hidden="true">
              &#128640;
            </span>
            <h3 className={styles.questPrevTitle}>Serverless Rescue</h3>
            <span className={styles.questTags}>
              IAM &bull; Lambda &bull; DynamoDB
            </span>
            <div className={styles.questBottom}>
              <span
                className={styles.questStars}
                aria-label="Intermediate difficulty"
              >
                &#9733;&#9733;&#9734;
              </span>
              <span className={styles.questXp}>+250 XP</span>
            </div>
          </button>

          <div
            className={`${styles.questPreviewCard} ${styles.questLocked}`}
            aria-label="Permission Denied — coming soon"
          >
            <span className={styles.questEmoji} aria-hidden="true">
              &#128274;
            </span>
            <h3 className={styles.questPrevTitle}>Permission Denied</h3>
            <span className={styles.questTags}>IAM &bull; Security</span>
            <div className={styles.questBottom}>
              <span
                className={styles.questStars}
                aria-label="Advanced difficulty"
              >
                &#9733;&#9733;&#9733;
              </span>
              <span className={styles.questXp}>+400 XP</span>
            </div>
            <span className={styles.comingSoon}>COMING SOON</span>
          </div>

          <div
            className={`${styles.questPreviewCard} ${styles.questLocked}`}
            aria-label="The Scaling Crisis — coming soon"
          >
            <span className={styles.questEmoji} aria-hidden="true">
              &#128200;
            </span>
            <h3 className={styles.questPrevTitle}>The Scaling Crisis</h3>
            <span className={styles.questTags}>
              EC2 &bull; Load Balancing
            </span>
            <div className={styles.questBottom}>
              <span
                className={styles.questStars}
                aria-label="Expert difficulty"
              >
                &#9733;&#9733;&#9733;&#9733;
              </span>
              <span className={styles.questXp}>+600 XP</span>
            </div>
            <span className={styles.comingSoon}>COMING SOON</span>
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE LEARN ===== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Learn architecture by actually using it.
        </h2>
        <div className={styles.archLearnGrid}>
          <div
            className={styles.archLearnCanvas}
            aria-label="AWS architecture flow diagram"
          >
            <div className={styles.archLearnFlow}>
              <div className={styles.archLearnNode}>USER</div>
              <div className={styles.archLearnArrow} aria-hidden="true">
                &#8595;
              </div>
              <div className={styles.archLearnNode}>API GATEWAY</div>
              <div className={styles.archLearnArrow} aria-hidden="true">
                &#8595;
              </div>
              <div className={styles.archLearnNode}>LAMBDA</div>
              <div className={styles.archLearnBranch} aria-hidden="true">
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
            <h3 className={styles.archLearnHeading}>
              Understand the &ldquo;why.&rdquo;
            </h3>
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
        <h2 className={styles.finalTitle}>
          Your first cloud incident is waiting.
        </h2>
        <p className={styles.finalDesc}>
          You don&apos;t need to know AWS.
          <br />
          You just need to be willing to investigate.
        </p>
        <button
          className={styles.ctaPrimary}
          onClick={() => navigate("/dashboard")}
        >
          Enter CloudForge <ArrowRight size={16} />
        </button>
        <p className={styles.finalLoop}>
          Build &bull; Break &bull; Debug &bull; Master
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerBrandRow}>
              <Cloud size={18} className={styles.navCloudIcon} aria-hidden="true" />
              <span className={styles.footerName}>CloudForge</span>
            </div>
            <p className={styles.footerTagline}>
              Build. Break. Debug. Master AWS.
            </p>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Product</span>
            <button
              className={styles.footerLink}
              onClick={() => scrollTo("how-it-works")}
            >
              How It Works
            </button>
            <button
              className={styles.footerLink}
              onClick={() => scrollTo("quests")}
            >
              Quests
            </button>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Community</span>
            <a
              href="https://github.com"
              className={styles.footerLink}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <button
              className={styles.footerLink}
              onClick={() => scrollTo("about")}
            >
              About
            </button>
          </div>
        </div>
        <div className={styles.footerBottom}>Built for AWS learners.</div>
      </footer>
    </div>
  )
}
