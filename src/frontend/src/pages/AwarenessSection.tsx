import {
  Key,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";

const TOPICS = [
  {
    icon: Mail,
    title: "Phishing",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
    desc: "Mass email campaigns impersonating trusted brands to steal credentials. Attackers cast a wide net hoping a percentage of recipients will click.",
    indicators: [
      "Generic greeting ('Dear Customer')",
      "Urgent call to action",
      "Mismatched reply-to address",
    ],
  },
  {
    icon: Users,
    title: "Spear Phishing",
    color: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/5",
    desc: "Targeted attacks using personal information gathered from LinkedIn, social media, or data breaches to craft convincing personalized messages.",
    indicators: [
      "Mentions your name/role",
      "References real colleagues",
      "Spoofs internal email domain",
    ],
  },
  {
    icon: MessageSquare,
    title: "Smishing",
    color: "text-chart-3",
    border: "border-chart-3/20",
    bg: "bg-chart-3/5",
    desc: "SMS-based phishing that exploits the trust people place in text messages. Often impersonates delivery services, banks, or government agencies.",
    indicators: [
      "Shortened URLs (bit.ly)",
      "Requests to reply with OTP",
      "Package delivery scams",
    ],
  },
  {
    icon: Phone,
    title: "Vishing",
    color: "text-destructive",
    border: "border-destructive/20",
    bg: "bg-destructive/5",
    desc: "Voice phishing using phone calls. Attackers pose as bank fraud departments, tech support, or IRS agents to pressure victims into revealing information.",
    indicators: [
      "Spoofed caller ID",
      "High-pressure tactics",
      "Requests remote access",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safe Browsing",
    color: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/5",
    desc: "Always verify HTTPS, check padlock icons, use browser extensions like uBlock Origin, and avoid clicking ads or pop-ups on unfamiliar sites.",
    indicators: [
      "Check URL before submitting forms",
      "Use bookmark for banking",
      "Enable Safe Browsing in Chrome",
    ],
  },
  {
    icon: Lock,
    title: "Social Engineering",
    color: "text-chart-3",
    border: "border-chart-3/20",
    bg: "bg-chart-3/5",
    desc: "Psychological manipulation exploiting trust, authority, and urgency. Attackers exploit human nature rather than technical vulnerabilities.",
    indicators: [
      "Impersonating authority",
      "Creating artificial urgency",
      "Quid pro quo offers",
    ],
  },
  {
    icon: Key,
    title: "Password Safety",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
    desc: "Use 16+ character unique passwords per site, managed by a password manager. Enable breach monitoring. Never reuse passwords across services.",
    indicators: [
      "Use a password manager",
      "Enable 2FA everywhere",
      "Check haveibeenpwned.com",
    ],
  },
  {
    icon: Wifi,
    title: "Two-Factor Auth",
    color: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/5",
    desc: "2FA adds a second layer that blocks 99%+ of automated attacks. Prefer authenticator apps (TOTP) over SMS codes which can be SIM-swapped.",
    indicators: [
      "Use TOTP apps (Authy, Google Auth)",
      "Hardware keys are strongest",
      "Never share OTP codes",
    ],
  },
];

export function AwarenessSection() {
  return (
    <section id="awareness" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            MODULE_01 — SECURITY AWARENESS
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Threat Landscape
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Understand the full spectrum of social engineering attacks targeting
            individuals and organizations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map(
            ({ icon: Icon, title, color, border, bg, desc, indicators }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card p-5 hover:scale-[1.02] transition-smooth"
                data-ocid={`awareness.topic.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${bg} border ${border} flex items-center justify-center mb-3`}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3
                  className={`font-display font-semibold text-sm mb-2 ${color}`}
                >
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {desc}
                </p>
                <ul className="space-y-1">
                  {indicators.map((ind) => (
                    <li
                      key={ind}
                      className="text-xs font-mono text-muted-foreground/70 flex items-start gap-1.5"
                    >
                      <span className={`${color} mt-0.5`}>›</span> {ind}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
