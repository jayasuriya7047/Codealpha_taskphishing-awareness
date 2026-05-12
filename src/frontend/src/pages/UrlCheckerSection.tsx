import {
  AlertTriangle,
  Globe,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type RiskLevel = "safe" | "suspicious" | "dangerous" | null;

interface AnalysisResult {
  score: number;
  level: RiskLevel;
  findings: { label: string; severity: "high" | "medium" | "low" }[];
}

const KNOWN_BAD = [
  "paypa1",
  "secure-verify",
  "account-login",
  "banking-portal",
  "verify-id",
  "login-secure",
  "update-account",
  "bit.ly",
  "tinyurl",
  "security-alert",
  "confirm-payment",
  "redeliver",
  "suspended",
  "unlock",
];

const KNOWN_GOOD = [
  "paypal.com",
  "chase.com",
  "google.com",
  "microsoft.com",
  "apple.com",
  "amazon.com",
];

function analyzeUrl(url: string): AnalysisResult {
  const lower = url.toLowerCase();
  const findings: AnalysisResult["findings"] = [];
  let score = 0;

  if (lower.startsWith("http://")) {
    findings.push({ label: "Uses HTTP — no encryption", severity: "high" });
    score += 35;
  }
  if (KNOWN_GOOD.some((d) => lower.includes(d) && lower.startsWith("https"))) {
    return {
      score: 2,
      level: "safe",
      findings: [
        { label: "Known trusted domain with valid HTTPS", severity: "low" },
      ],
    };
  }
  const matched = KNOWN_BAD.filter((kw) => lower.includes(kw));
  for (const kw of matched) {
    findings.push({
      label: `Suspicious keyword detected: "${kw}"`,
      severity: "high",
    });
    score += 20;
  }
  const hostPart = lower.replace(/https?:\/\//, "").split("/")[0];
  const dots = (hostPart.match(/\./g) || []).length;
  if (dots >= 3) {
    findings.push({
      label: `Excessive subdomains (${dots} levels) — common in phishing`,
      severity: "medium",
    });
    score += 15;
  }
  if (/[0-9]/.test(hostPart.split(".")[0])) {
    findings.push({
      label: "Digit substitution detected (e.g. '1' for 'l', '0' for 'o')",
      severity: "high",
    });
    score += 25;
  }
  if (/^\d{1,3}(\.\d{1,3}){3}/.test(hostPart)) {
    findings.push({
      label: "IP address used instead of domain",
      severity: "high",
    });
    score += 30;
  }
  if (url.length > 80) {
    findings.push({
      label: "Unusually long URL — may obfuscate destination",
      severity: "medium",
    });
    score += 10;
  }
  if (findings.length === 0) {
    findings.push({
      label: "No obvious phishing indicators detected — verify manually",
      severity: "low",
    });
    score = 5;
  }

  const capped = Math.min(score, 100);
  const level: RiskLevel =
    capped >= 65 ? "dangerous" : capped >= 30 ? "suspicious" : "safe";

  return { score: capped, level, findings };
}

const RISK_EXAMPLES = [
  "https://www.paypal.com/signin",
  "http://paypa1-secure.account-login.net/signin",
  "https://bit.ly/update-account-verify",
  "http://192.168.1.105/banking-portal/login",
];

function ScanIcon({ scanning }: { scanning: boolean }) {
  return scanning ? (
    <span className="flex items-center gap-2">
      <ShieldAlert className="w-4 h-4 animate-spin" /> SCANNING
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <Search className="w-4 h-4" /> ANALYZE
    </span>
  );
}

export function UrlCheckerSection() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [scanning, setScanning] = useState(false);

  const analyze = () => {
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeUrl(url.trim()));
      setScanning(false);
    }, 1200);
  };

  const riskColor =
    result?.level === "dangerous"
      ? "text-destructive"
      : result?.level === "suspicious"
        ? "text-chart-3"
        : "text-secondary";

  const riskBg =
    result?.level === "dangerous"
      ? "bg-destructive"
      : result?.level === "suspicious"
        ? "bg-chart-3"
        : "bg-secondary";

  return (
    <section id="url-checker" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            <Globe className="w-3 h-3" /> MODULE_04 — URL SAFETY CHECKER
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            URL Safety Checker
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Paste any URL and our analyzer will check for phishing indicators,
            suspicious patterns, and domain anomalies.
          </p>
        </motion.div>

        <div className="max-w-2xl">
          <div className="glass-card p-5 mb-4">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyze()}
                placeholder="https://example.com/page..."
                className="flex-1 bg-background/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                data-ocid="url_checker.input"
              />
              <button
                type="button"
                onClick={analyze}
                disabled={scanning || !url.trim()}
                className="px-4 py-2 bg-primary/20 border border-primary/50 text-primary font-mono text-sm rounded-md hover:bg-primary/30 transition-smooth disabled:opacity-50"
                data-ocid="url_checker.analyze_button"
              >
                <ScanIcon scanning={scanning} />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Quick examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {RISK_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setUrl(ex)}
                    className="text-xs font-mono border border-border/60 rounded px-2 py-1 text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth truncate max-w-[200px]"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {scanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-5 mb-4"
              data-ocid="url_checker.loading_state"
            >
              <div className="text-xs font-mono text-primary space-y-1">
                <p className="animate-threat-pulse">
                  [ SCANNING ] Checking DNS records...
                </p>
                <p className="opacity-60">
                  [ SCANNING ] Analyzing domain structure...
                </p>
                <p className="opacity-40">
                  [ SCANNING ] Cross-referencing threat database...
                </p>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-5"
                data-ocid="url_checker.result_panel"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {result.level === "safe" ? (
                      <ShieldCheck className="w-6 h-6 text-secondary" />
                    ) : (
                      <ShieldAlert
                        className={`w-6 h-6 animate-threat-pulse ${riskColor}`}
                      />
                    )}
                    <div>
                      <div
                        className={`text-lg font-display font-bold ${riskColor}`}
                      >
                        {result.level?.toUpperCase()} — {result.score}% Risk
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Phishing probability assessment
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
                    <span>SAFE</span>
                    <span>DANGEROUS</span>
                  </div>
                  <div className="w-full h-3 bg-muted/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${riskBg}`}
                    />
                  </div>
                  <div
                    className={`text-right text-xs font-mono mt-1 ${riskColor}`}
                  >
                    {result.score}% Risk Score
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-muted-foreground uppercase mb-2">
                    Analysis Findings
                  </h4>
                  <div className="space-y-2">
                    {result.findings.map((f) => (
                      <div
                        key={f.label}
                        className={[
                          "flex items-start gap-2 text-xs font-mono rounded-md px-3 py-2",
                          f.severity === "high"
                            ? "bg-destructive/10 border border-destructive/20 text-destructive"
                            : f.severity === "medium"
                              ? "bg-chart-3/10 border border-chart-3/20 text-chart-3"
                              : "bg-secondary/10 border border-secondary/20 text-secondary",
                        ].join(" ")}
                      >
                        <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
