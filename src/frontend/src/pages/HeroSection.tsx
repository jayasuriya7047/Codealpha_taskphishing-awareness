import {
  Activity,
  AlertOctagon,
  ChevronDown,
  Shield,
  Terminal,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  {
    icon: AlertOctagon,
    label: "Phishing Attacks Daily",
    value: "3.4 Billion",
    sub: "malicious emails sent",
  },
  {
    icon: Activity,
    label: "Attacks Prevented",
    value: "94%",
    sub: "with user awareness",
  },
  {
    icon: Users,
    label: "Users Affected",
    value: "1 in 99",
    sub: "emails is phishing",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated grid bg */}
      <div
        className="absolute inset-0 scan-line-overlay pointer-events-none"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(oklch(var(--primary) / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary) / 0.04) 1px, transparent 1px)",
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-4 py-1.5 mb-6 bg-primary/5 threat-pulse"
          data-ocid="hero.badge"
        >
          <Terminal className="w-3 h-3" /> CYBERSECURITY AWARENESS TRAINING v2.6
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight"
        >
          <span className="neon-glow-cyan">Advanced Phishing</span>
          <br />
          <span className="text-foreground">Awareness Training</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
        >
          Recognize, analyze, and neutralize phishing attacks before they
          compromise your organization. Interactive simulations, real-world
          examples, and a certification quiz.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <button
            type="button"
            onClick={() => scrollToSection("awareness")}
            className="flex items-center gap-2 bg-primary/20 border border-primary/50 text-primary font-mono text-sm px-6 py-3 rounded-lg hover:bg-primary/30 transition-smooth"
            data-ocid="hero.start_training_button"
          >
            <Shield className="w-4 h-4" /> Start Training
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("quiz")}
            className="flex items-center gap-2 bg-muted/30 border border-border text-foreground font-mono text-sm px-6 py-3 rounded-lg hover:bg-muted/50 transition-smooth"
            data-ocid="hero.take_quiz_button"
          >
            Take the Quiz
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {STATS.map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.1 }}
              className="glass-card p-4"
              data-ocid={`hero.stat.${i + 1}`}
            >
              <Icon className="w-5 h-5 text-primary mb-2 mx-auto" />
              <div className="text-2xl font-display font-bold neon-glow-cyan">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
