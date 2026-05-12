import { AlertTriangle, Mail, Search, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const RED_FLAGS = [
  {
    pattern: /dear (customer|user|valued|account holder)/i,
    label: "Generic greeting — not personalized",
    severity: "medium" as const,
  },
  {
    pattern: /click here|click the link|click below/i,
    label: "Vague 'click here' call-to-action",
    severity: "medium" as const,
  },
  {
    pattern: /urgent|immediately|action required|act now|expires in/i,
    label: "Urgency tactic detected",
    severity: "high" as const,
  },
  {
    pattern: /verify your (account|identity|email|password|details)/i,
    label: "Credential verification request",
    severity: "high" as const,
  },
  {
    pattern: /suspended|compromised|unauthorized|restricted|locked/i,
    label: "Account threat language detected",
    severity: "high" as const,
  },
  {
    pattern: /http:\/\//i,
    label: "Non-HTTPS link in email body",
    severity: "high" as const,
  },
  {
    pattern: /bit\.ly|tinyurl|ow\.ly|t\.co/i,
    label: "Shortened/obfuscated URL",
    severity: "high" as const,
  },
  {
    pattern: /update your (password|billing|payment|information)/i,
    label: "Request to update sensitive info",
    severity: "high" as const,
  },
  {
    pattern: /your account will be (closed|deleted|terminated)/i,
    label: "Threat of account termination",
    severity: "high" as const,
  },
  {
    pattern: /reply with your|send us your/i,
    label: "Request to reply with sensitive data",
    severity: "high" as const,
  },
  {
    pattern: /\$[0-9,]+ (prize|award|gift|reward|lottery)/i,
    label: "Prize/lottery lure — common in scams",
    severity: "medium" as const,
  },
  {
    pattern: /dear sir|dear madam|to whom it may concern/i,
    label: "Mass mailing indicator",
    severity: "low" as const,
  },
];

const SAMPLE_TEXT = `From: security@paypa1-notifications.com
Subject: Urgent: Your account is suspended!

Dear Valued Customer,

We have detected suspicious activity on your PayPal account.
Your account has been suspended and will be permanently closed in 24 hours.

To verify your identity and restore access, click here:
http://paypa1-account-verify.secure.net/auth

Please update your password and billing information immediately.

PayPal Security Team`;

export function EmailScannerSection() {
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<
    { label: string; severity: "high" | "medium" | "low" }[] | null
  >(null);

  const scan = () => {
    if (!text.trim()) return;
    setScanning(true);
    setResults(null);
    setTimeout(() => {
      const found = RED_FLAGS.filter((f) => f.pattern.test(text)).map(
        ({ label, severity }) => ({ label, severity }),
      );
      setResults(
        found.length > 0
          ? found
          : [
              {
                label:
                  "No obvious phishing patterns detected — exercise caution anyway",
                severity: "low",
              },
            ],
      );
      setScanning(false);
    }, 1000);
  };

  const highCount = results?.filter((r) => r.severity === "high").length ?? 0;
  const riskLevel = highCount >= 3 ? "HIGH" : highCount >= 1 ? "MEDIUM" : "LOW";
  const riskColor =
    highCount >= 3
      ? "text-destructive"
      : highCount >= 1
        ? "text-chart-3"
        : "text-secondary";

  return (
    <section id="email-scanner" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            <Mail className="w-3 h-3" /> MODULE_05 — EMAIL SCANNER
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Email Content Scanner
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Paste any email content to scan for phishing patterns, urgency
            tactics, and suspicious keywords.
          </p>
        </motion.div>

        <div className="max-w-2xl">
          <div className="glass-card p-5 mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste email content here..."
              rows={8}
              className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth resize-y"
              data-ocid="email_scanner.textarea"
            />
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={() => setText(SAMPLE_TEXT)}
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-smooth"
                data-ocid="email_scanner.load_sample_button"
              >
                Load sample phishing email
              </button>
              <button
                type="button"
                onClick={scan}
                disabled={scanning || !text.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 text-primary font-mono text-sm rounded-md hover:bg-primary/30 transition-smooth disabled:opacity-50"
                data-ocid="email_scanner.scan_button"
              >
                {scanning ? (
                  <>
                    <Search className="w-4 h-4 animate-spin" /> Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Scan Email
                  </>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-5"
                data-ocid="email_scanner.results_panel"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {highCount >= 1 ? (
                      <AlertTriangle className={`w-5 h-5 ${riskColor}`} />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-secondary" />
                    )}
                    <span className={`font-display font-bold ${riskColor}`}>
                      RISK: {riskLevel}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {results.length} pattern{results.length !== 1 ? "s" : ""}{" "}
                    found
                  </span>
                </div>
                <div className="space-y-2">
                  {results.map((r, i) => (
                    <div
                      key={r.label}
                      className={`flex items-start gap-2 text-xs font-mono px-3 py-2 rounded-md ${
                        r.severity === "high"
                          ? "bg-destructive/10 border border-destructive/20 text-destructive"
                          : r.severity === "medium"
                            ? "bg-chart-3/10 border border-chart-3/20 text-chart-3"
                            : "bg-secondary/10 border border-secondary/20 text-secondary"
                      }`}
                      data-ocid={`email_scanner.result.${i + 1}`}
                    >
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>
                        [{r.severity.toUpperCase()}] {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
