import { AlertTriangle, Globe, Mail, MessageSquare, Phone } from "lucide-react";
import { motion } from "motion/react";

const EXAMPLES = [
  {
    type: "email" as const,
    icon: Mail,
    category: "Banking Email",
    color: "text-destructive",
    border: "border-destructive/20",
    bg: "bg-destructive/5",
    content: `From: alerts@chasebank-secure.net
To: you@email.com
Subject: Your Chase account has been LOCKED

Dear Account Holder,
Unusual sign-in activity detected. Click the link to unlock:
http://chasebank-accountunlock.net/verify

This link expires in 2 hours.`,
    flags: [
      "chasebank-secure.net ≠ chase.com",
      "HTTP not HTTPS",
      "2-hour deadline",
      "Generic greeting",
    ],
  },
  {
    type: "sms" as const,
    icon: MessageSquare,
    category: "SMS Phishing",
    color: "text-chart-3",
    border: "border-chart-3/20",
    bg: "bg-chart-3/5",
    content: `[USPS] Your package is on hold due to incomplete address information. Update delivery details within 24hrs:
https://bit.ly/usps-update-delivery

Ignoring this message will result in package return.`,
    flags: [
      "bit.ly shortened URL hides real destination",
      "Impersonating USPS",
      "24-hour urgency",
      "Unsolicited — you didn't request this",
    ],
  },
  {
    type: "url" as const,
    icon: Globe,
    category: "Suspicious URLs",
    color: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
    content: `⚠ DANGEROUS:
http://paypa1-secure.account-verify.me/signin
http://192.168.1.1/banking-login
https://amazon-account-verify.secure-login.net
https://microsoft-account.login-verify.co/auth

✓ LEGITIMATE:
https://www.paypal.com/signin
https://account.microsoft.com`,
    flags: [
      "Digit substitution: paypa1",
      "IP address as domain",
      "Fake subdomains with real brand names",
      "Suspicious TLDs (.me, .co vs .com)",
    ],
  },
  {
    type: "phone" as const,
    icon: Phone,
    category: "Vishing Script",
    color: "text-secondary",
    border: "border-secondary/20",
    bg: "bg-secondary/5",
    content: `Caller: "This is Microsoft Technical Support. We've detected a serious virus on your computer that is sending data to hackers. I need remote access to fix it immediately. Please install AnyDesk and give me the access code."

Then: Asks for credit card "for security verification"`,
    flags: [
      "Microsoft never cold-calls users",
      "Urgency + fear tactic",
      "Requests remote access",
      "No legitimate tech support asks for payment over cold call",
    ],
  },
];

export function PhishingExamplesSection() {
  return (
    <section id="phishing-examples" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            MODULE_06 — REAL-WORLD EXAMPLES
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Phishing Examples
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Real-world phishing scenarios across email, SMS, URL manipulation,
            and voice phishing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EXAMPLES.map(
            (
              { icon: Icon, category, color, border, bg, content, flags },
              i,
            ) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
                data-ocid={`phishing_examples.example.${i + 1}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-md ${bg} border ${border} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <h3 className={`font-display font-semibold text-sm ${color}`}>
                    {category}
                  </h3>
                </div>

                {/* Content box */}
                <pre className="text-xs font-mono text-foreground/70 bg-background/40 border border-border/40 rounded-md p-3 whitespace-pre-wrap leading-relaxed mb-4">
                  {content}
                </pre>

                {/* Red flags */}
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase mb-2">
                    Red Flags
                  </p>
                  <ul className="space-y-1.5">
                    {flags.map((flag) => (
                      <li
                        key={flag}
                        className="flex items-start gap-2 text-xs font-mono text-destructive/80"
                      >
                        <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0 text-destructive" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
