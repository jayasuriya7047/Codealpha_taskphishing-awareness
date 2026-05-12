import { AlertTriangle, Globe, Lock, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FAKE_SITES = [
  {
    id: "paypal",
    label: "Fake PayPal",
    displayUrl: "https://paypa1-secure.account-verify.me/signin",
    favicon: "🅿",
    siteName: "PayPal",
    hasHttps: true,
    isSecure: false,
    flags: [
      "Domain: paypa1-secure.account-verify.me (not paypal.com)",
      "'1' replaces 'l' in 'paypal' — typosquatting",
      "'account-verify.me' is a suspicious TLD combo",
      "HTTPS ≠ legitimate. Attackers get free SSL certificates",
    ],
  },
  {
    id: "bank",
    label: "Fake Bank Login",
    displayUrl: "http://bankofamerica-secure.alerts.net/login",
    favicon: "🏦",
    siteName: "Bank of America",
    hasHttps: false,
    isSecure: false,
    flags: [
      "Uses HTTP — all data transmitted in plaintext",
      "bankofamerica-secure.alerts.net is NOT bankofamerica.com",
      "Legitimate banks never ask for passwords via unsolicited links",
      "'secure' in URL is meaningless — anyone can add that word",
    ],
  },
  {
    id: "microsoft",
    label: "Fake Microsoft",
    displayUrl: "https://microsoft-account.login-verify.co/auth",
    favicon: "🪟",
    siteName: "Microsoft Account",
    hasHttps: true,
    isSecure: false,
    flags: [
      "login-verify.co is not microsoft.com",
      "microsoft is a subdomain prefix, not the domain itself",
      "'.co' TLD is commonly used in phishing disguised as '.com'",
      "Legitimate Microsoft logins are always on microsoft.com or live.com",
    ],
  },
];

export function WebsiteSimSection() {
  const [selected, setSelected] = useState(FAKE_SITES[0]);
  const [showWarning, setShowWarning] = useState(false);
  const [_submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSelect = (site: (typeof FAKE_SITES)[0]) => {
    setSelected(site);
    setShowWarning(false);
    setSubmitted(false);
    setEmail("");
    setPass("");
  };

  const handleSubmit = () => {
    setShowWarning(true);
    setSubmitted(true);
  };

  return (
    <section id="website-sim" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            <Globe className="w-3 h-3" /> MODULE_03 — FAKE WEBSITE SIMULATION
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Fake Website Detector
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Experience what phishing websites look like and learn to spot the
            red flags before entering credentials.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FAKE_SITES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s)}
              className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-smooth ${
                selected.id === s.id
                  ? "bg-primary/20 border-primary/50 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
              data-ocid={`website_sim.${s.id}_tab`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="max-w-md">
          {/* Browser chrome */}
          <div
            className="glass-card overflow-hidden"
            data-ocid="website_sim.browser_panel"
          >
            {/* Browser toolbar */}
            <div className="bg-card/60 border-b border-border px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-chart-3/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                </div>
                {/* Address bar */}
                <div className="flex-1 flex items-center gap-1.5 bg-background/50 border border-border rounded px-2 py-1">
                  {selected.hasHttps ? (
                    <Lock className="w-3 h-3 text-secondary shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
                  )}
                  <span className="text-xs font-mono text-muted-foreground truncate">
                    {selected.displayUrl}
                  </span>
                </div>
              </div>
            </div>

            {/* Fake login form */}
            <div className="p-6 bg-background/30">
              <div className="text-center mb-5">
                <div className="text-3xl mb-2">{selected.favicon}</div>
                <h3 className="font-display font-bold text-foreground">
                  {selected.siteName}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Sign in to your account
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                  data-ocid="website_sim.email_input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-smooth"
                  data-ocid="website_sim.password_input"
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-primary/30 border border-primary/50 text-primary font-mono text-sm py-2 rounded-md hover:bg-primary/40 transition-smooth"
                  data-ocid="website_sim.submit_button"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>

          {/* Warning popup */}
          <AnimatePresence>
            {showWarning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 glass-card border border-destructive/40 p-5 relative"
                data-ocid="website_sim.warning_panel"
              >
                <button
                  type="button"
                  onClick={() => setShowWarning(false)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                  aria-label="Close warning"
                  data-ocid="website_sim.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                  <h4 className="font-display font-bold text-destructive text-sm">
                    ⚠ PHISHING ATTEMPT DETECTED
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  You just submitted credentials to a{" "}
                  <span className="text-destructive font-semibold">
                    fake website
                  </span>
                  . In a real attack, your login and password would now be in an
                  attacker's database.
                </p>
                <ul className="space-y-1.5">
                  {selected.flags.map((flag) => (
                    <li
                      key={flag}
                      className="flex items-start gap-2 text-xs font-mono text-destructive/80"
                    >
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />{" "}
                      {flag}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-secondary">
                  <ShieldCheck className="w-3.5 h-3.5" /> Always verify the
                  domain before entering credentials.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
