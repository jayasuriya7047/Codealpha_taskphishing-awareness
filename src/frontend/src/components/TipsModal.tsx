import { AlertTriangle, Eye, Key, Lock, Shield, Wifi, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const TIPS = [
  {
    icon: Shield,
    title: "Verify the Sender",
    tip: "Always check the full email address — not just the display name. Attackers spoof display names easily.",
  },
  {
    icon: Eye,
    title: "Inspect URLs",
    tip: "Hover over links before clicking. Look for misspellings, extra subdomains, or HTTP instead of HTTPS.",
  },
  {
    icon: AlertTriangle,
    title: "Resist Urgency",
    tip: '"Act immediately or your account will be suspended" — this is a classic pressure tactic. Pause and verify independently.',
  },
  {
    icon: Lock,
    title: "Use 2FA",
    tip: "Two-factor authentication blocks 99% of automated phishing attacks even if your password is stolen.",
  },
  {
    icon: Key,
    title: "Unique Passwords",
    tip: "Use a password manager. Reusing passwords means one breach compromises every account.",
  },
  {
    icon: Wifi,
    title: "Avoid Public Wi-Fi",
    tip: "Public networks can be monitored. Use a VPN or wait until you're on a trusted network for sensitive tasks.",
  },
];

interface TipsModalProps {
  open: boolean;
  onClose: () => void;
}

export function TipsModal({ open, onClose }: TipsModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-ocid="tips.dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="relative glass-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg neon-glow-cyan">
                Security Tips
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-smooth p-1"
                aria-label="Close"
                data-ocid="tips.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {TIPS.map(({ icon: Icon, title, tip }) => (
                <div key={title} className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-display font-semibold text-foreground">
                      {title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
