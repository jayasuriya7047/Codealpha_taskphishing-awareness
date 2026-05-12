# Design Brief: Advanced Phishing Awareness Training System

## Purpose & Context
Professional cybersecurity training dashboard. Users: security-conscious professionals and trainees. Emotional context: vigilance, focus, mastery. Solve: make security training engaging and memorable.

## Tone & Aesthetic
Cyberpunk-inspired dark dashboard with glassmorphism and neon accents. Terminal-meets-premium aesthetic — high-security briefing room vibes. Bold, intentional, distinctive.

## Color Palette
| Token | OKLCH | RGB | Purpose |
|-------|-------|-----|----------|
| Background | 0.10 0 0 | #1a1a1a | Deep space, immersive |
| Card Surface | 0.15 0 0 | #262626 | Elevated glass substrate |
| Primary (Neon Cyan) | 0.65 0.18 195 | #00d4ff | Attention, interactive highlights, primary CTA |
| Secondary (Neon Green) | 0.70 0.15 155 | #39ff14 | Warnings, safe actions, progress |
| Warning (Amber) | 0.65 0.15 60 | #ffaa00 | Phishing indicators, caution alerts |
| Destructive (Red) | 0.60 0.20 25 | #ff3333 | Critical threats, failures |
| Foreground | 0.95 0 0 | #f2f2f2 | Primary text, high contrast |
| Muted | 0.55 0 0 | #8a8a8a | Secondary text, disabled states |
| Border | 0.25 0 0 | #404040 | Subtle dividers, card edges |

## Typography
| Use | Font | Role |
|-----|------|------|
| Display/Headings | JetBrainsMono | Terminal aesthetic, distinctive hierarchy |
| Body/UI | GeneralSans | Modern, clean, professional readability |
| Code/URLs/Data | GeistMono | Monospace for sensitive data representation |

## Shape Language
- **Radius**: 12px (moderate, balanced)
- **Glassmorphism**: 0.1–0.15 alpha backdrop-blur on cards + gradient overlay
- **Borders**: 1px subtle on cards with cyan accent gradient at top edge
- **Shadows**: Multi-layer glass shadow (inset + outer blur)

## Structural Zones
| Zone | Treatment | Notes |
|------|-----------|-------|
| Header/Nav | Dark glass card (0.15 0 0), 1px bottom cyan border, sticky | Sticky navigation bar with logo and section links |
| Main Content | Background (0.10 0 0), grid layout | Card-based content sections with smooth scroll |
| Cards | Glass effect (0.15 0 0 / 0.4 alpha), top cyan gradient border | Phishing modules, simulations, quiz, stats |
| Interactive Elements | Primary/Secondary/Warning/Destructive colors | Buttons, badges, indicators with glow on hover |
| Footer | Dark glass (0.15 0 0), 1px top cyan border | Copyright and links |

## Component Patterns
- **Cards**: Glass card with top border glow, hover shadow elevation
- **Buttons**: Primary cyan, secondary green; glow on hover; disabled gray
- **Badges**: Warning (amber bg), Destructive (red bg), Success (green bg)
- **Alerts**: Animated threat pulse on warning/destructive elements
- **Links**: Cyan text with underline, hover glow effect
- **Code/URLs**: GeistMono, light gray background, monospace styling

## Motion & Animation
- **Transitions**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive elements
- **Threat Pulse**: Subtle opacity pulse (1s → 0.6 → 1s) on warning/destructive badges
- **Glow Cyan**: Text shadow pulse on neon cyan text (optional accent animation)
- **Hover**: Glass card shadow elevation + slight scale (1.02x) + glow border intensify
- **Load/Scroll**: Fade-in on cards, smooth scroll to sections

## Signature Details
1. **Neon Cyan Glows**: Sparingly applied to primary interactive elements and accent text
2. **Glass Top Border Gradient**: Subtle cyan gradient on card top edge (depth cue)
3. **Monospace Data Representation**: URLs, email addresses, code snippets in GeistMono
4. **Terminal Aesthetic**: JetBrainsMono headings echo matrix/briefing room vibe
5. **Multi-Layer Shadows**: Inset + outer blur on cards for depth and glass effect

## Anti-Patterns (Avoid)
- Generic Bootstrap blue
- Excessive neon (glow only on interactive, not everywhere)
- Uniform rounded corners (vary for hierarchy)
- Flat design — emphasize depth via glass, shadows, layers
- Scattered animations — orchestrate motion for narrative flow
- Warm/fuzzy colors (this is cybersecurity, not e-commerce)

## Differentiation
**This dashboard is not generic dark mode.** It's a distinctive cybersecurity briefing room — neon accents meet professional polish, glassmorphism meets terminal typography, high-security visual language meets usable UI.

## Responsive & Dark Mode
- Mobile-first (`sm:`, `md:`, `lg:` breakpoints)
- Dark mode only (forced, no light toggle) — serves aesthetic and purpose
- Cards stack on mobile, grid on desktop (3 cols lg, 2 cols md, 1 col sm)

## Constraints
- No generic purple gradients
- No excessive animations (threat pulse only)
- No mixed color families (cyan + green + warm accents, not rainbow)
- No light mode variant
- Monospace fonts reserved for technical data, not body text
