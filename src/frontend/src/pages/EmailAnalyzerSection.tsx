import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SAMPLE_EMAILS = [
  {
    id: "bank",
    label: "Fake Bank Alert",
    from: "security@bankofamerica-secure.alerts.net",
    subject: "URGENT: Your account has been compromised!",
    date: "Mon, 12 May 2026 03:14:22 +0000",
    body: `Dear Valued Customer,

We have detected unusual login activity from IP address 91.234.55.102 (Russia).
Your account has been TEMPORARY SUSPENDED for security reasons.

Please verify your identity IMMEDIATELY by clicking the link below:

https://bankofamerica-account-verify.secure-login.net/auth?token=a8f3k2

Failure to verify within 24 hours will result in permanent account closure.

Regards,
Bank of America Security Team`,
    flags: [
      {
        text: "Domain: bankofamerica-secure.alerts.net — NOT bankofamerica.com",
        severity: "high" as const,
      },
      {
        text: 'URGENT in subject + "TEMPORARY SUSPENDED" — urgency tactic',
        severity: "high" as const,
      },
      {
        text: "Threat of account closure within 24 hours — pressure tactic",
        severity: "high" as const,
      },
      {
        text: "Generic greeting 'Dear Valued Customer' instead of your name",
        severity: "medium" as const,
      },
      {
        text: "URL does not belong to bankofamerica.com",
        severity: "high" as const,
      },
      {
        text: "Sent at 3 AM from international IP",
        severity: "medium" as const,
      },
    ],
  },
  {
    id: "paypal",
    label: "Fake PayPal Email",
    from: "service@paypa1-notifications.com",
    subject: "Your PayPal account is limited — action required",
    date: "Tue, 13 May 2026 09:44:11 +0000",
    body: `Hello,

We've limited your account due to suspicious transactions.
To remove limitations, please confirm your personal information:

[ Confirm Your Account ]
https://paypa1-secure.account-verify.me/login

If you don't confirm within 48 hours, your account will be permanently closed.

PayPal Support Team`,
    flags: [
      {
        text: "paypa1 with digit '1' — typosquatting PayPal",
        severity: "high" as const,
      },
      {
        text: "'account-verify.me' — not paypal.com",
        severity: "high" as const,
      },
      {
        text: "Generic 'Hello,' without name — mass phishing template",
        severity: "medium" as const,
      },
      {
        text: "48-hour deadline is a classic pressure tactic",
        severity: "high" as const,
      },
    ],
  },
  {
    id: "it",
    label: "Fake IT Helpdesk",
    from: "helpdesk@companylT-support.com",
    subject: "[IMPORTANT] Your password expires in 2 hours",
    date: "Wed, 14 May 2026 07:30:00 +0000",
    body: `Hi Employee,

Your corporate password will expire TODAY at 5:00 PM.
To avoid losing access, reset your password now:

https://company-passwordreset.sharepoint-secure.net/reset

If you do not reset, IT will lock your account automatically.

IT Security Team`,
    flags: [
      {
        text: "'companylT' uses lowercase 'l' instead of uppercase 'I'",
        severity: "high" as const,
      },
      {
        text: "Domain 'sharepoint-secure.net' is not Microsoft's domain",
        severity: "high" as const,
      },
      {
        text: "2-hour deadline creates panic — social engineering",
        severity: "high" as const,
      },
      {
        text: "Generic 'Hi Employee' — no personalization",
        severity: "medium" as const,
      },
    ],
  },
];

export function EmailAnalyzerSection() {
  const [selected, setSelected] = useState(SAMPLE_EMAILS[0]);
  const [expanded, setExpanded] = useState(false);
  const [showFlags, setShowFlags] = useState(false);

  const handleSelect = (email: (typeof SAMPLE_EMAILS)[0]) => {
    setSelected(email);
    setExpanded(false);
    setShowFlags(false);
  };

  return (
    <section id="email-analyzer" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            <Mail className="w-3 h-3" /> MODULE_02 — FAKE EMAIL ANALYZER
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Email Threat Analyzer
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Examine real phishing emails with annotated red flags. Learn to
            identify deceptive patterns at a glance.
          </p>
        </motion.div>

        {/* Selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {SAMPLE_EMAILS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => handleSelect(e)}
              className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-smooth ${
                selected.id === e.id
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
              data-ocid={`email_analyzer.${e.id}_tab`}
            >
              {e.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl">
          {/* Email viewer */}
          <div
            className="glass-card overflow-hidden"
            data-ocid="email_analyzer.email_panel"
          >
            {/* Header bar */}
            <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-xs font-mono text-destructive">
                ⚠ PHISHING EMAIL SIMULATION — DO NOT INTERACT WITH REAL EMAILS
                LIKE THIS
              </span>
            </div>

            {/* Email metadata */}
            <div className="px-5 py-4 border-b border-border/40 space-y-1">
              <div className="flex gap-2 text-xs font-mono">
                <span className="text-muted-foreground w-14 shrink-0">
                  FROM:
                </span>
                <span className="text-destructive break-all">
                  {selected.from}
                </span>
              </div>
              <div className="flex gap-2 text-xs font-mono">
                <span className="text-muted-foreground w-14 shrink-0">
                  SUBJECT:
                </span>
                <span className="text-chart-3 font-semibold">
                  {selected.subject}
                </span>
              </div>
              <div className="flex gap-2 text-xs font-mono">
                <span className="text-muted-foreground w-14 shrink-0">
                  DATE:
                </span>
                <span className="text-foreground/70">{selected.date}</span>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <pre
                className={`text-xs text-foreground/80 font-mono whitespace-pre-wrap leading-relaxed ${
                  !expanded ? "max-h-32 overflow-hidden" : ""
                }`}
              >
                {selected.body}
              </pre>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-smooth"
                data-ocid="email_analyzer.expand_button"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" /> Show full email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analyze button */}
          <button
            type="button"
            onClick={() => setShowFlags(!showFlags)}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-destructive/10 border border-destructive/30 text-destructive font-mono text-sm py-3 rounded-lg hover:bg-destructive/20 transition-smooth"
            data-ocid="email_analyzer.analyze_button"
          >
            <AlertTriangle className="w-4 h-4" />
            {showFlags ? "Hide Analysis" : "Reveal Red Flags"}
          </button>

          {/* Flags */}
          <AnimatePresence>
            {showFlags && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 overflow-hidden"
                data-ocid="email_analyzer.flags_panel"
              >
                {selected.flags.map((flag, i) => (
                  <motion.div
                    key={flag.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex items-start gap-2 text-xs font-mono px-4 py-2.5 rounded-lg ${
                      flag.severity === "high"
                        ? "bg-destructive/10 border border-destructive/20 text-destructive"
                        : "bg-chart-3/10 border border-chart-3/20 text-chart-3"
                    }`}
                    data-ocid={`email_analyzer.flag.${i + 1}`}
                  >
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>
                      <span className="font-semibold uppercase text-[10px] mr-1.5">
                        [{flag.severity}]
                      </span>
                      {flag.text}
                    </span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20 px-4 py-2.5 rounded-lg">
                  <CheckCircle className="w-3 h-3 shrink-0" />
                  Analysis complete — {selected.flags.length} red flags detected
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
