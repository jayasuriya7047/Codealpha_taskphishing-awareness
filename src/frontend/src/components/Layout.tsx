import { TipsModal } from "@/components/TipsModal";
import { Bell, Menu, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#awareness", label: "Awareness" },
  { href: "#email-analyzer", label: "Email Analyzer" },
  { href: "#website-sim", label: "Website Sim" },
  { href: "#url-checker", label: "URL Checker" },
  { href: "#phishing-examples", label: "Examples" },
  { href: "#quiz", label: "Quiz" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          scrolled
            ? "bg-card/90 backdrop-blur-md border-b border-border shadow-subtle"
            : "bg-transparent"
        }`}
        data-ocid="nav.header"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollTo("#hero")}
              aria-label="Go to top"
            >
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-sm text-primary tracking-widest uppercase hidden sm:inline">
                PhishGuard
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-xs font-mono text-muted-foreground hover:text-primary px-3 py-1.5 rounded transition-smooth hover:bg-primary/5"
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Tips + mobile toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTipsOpen(true)}
                className="flex items-center gap-1.5 text-xs font-mono bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-smooth"
                data-ocid="nav.tips_button"
              >
                <Bell className="w-3 h-3" /> Tips
              </button>
              <button
                type="button"
                className="md:hidden p-1.5 text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                data-ocid="nav.mobile_menu_button"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <nav className="md:hidden pb-3 border-t border-border/40 mt-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-sm font-mono text-muted-foreground hover:text-primary px-2 py-2 rounded transition-smooth"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card/50 border-t border-border mt-10"
        data-ocid="footer"
      >
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display text-sm text-primary">
              PhishGuard
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Advanced Phishing Awareness Training System
          </p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
}
