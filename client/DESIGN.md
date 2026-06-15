# DESIGN.md

> Clean, fast, trustworthy — every pixel earns its place.

## 1. Visual Theme & Atmosphere

**Style**: Clean Dark SaaS ("Linear meets Short.io")
**Keywords**: precise, minimal, purposeful, dark-capable, violet accent, developer-friendly
**Tone**: Polished and confident — NOT playful, skeuomorphic, or loud
**Feel**: Like opening a tool you immediately trust

**Interaction Tier**: L2 — Fluid interactions
**Dependencies**: CSS only (keyframe animations + IntersectionObserver-friendly classes)

---

## 2. Color Palette & Roles

```css
/* Light mode */
:root {
  --bg: #F8F7FC;
  --surface: #FFFFFF;
  --surface-alt: #F2F1F8;
  --surface-hover: #ECEAF5;

  --border: #E4E2EF;
  --border-strong: #CCC9DC;

  --text: #0E0D14;
  --text-secondary: #5C5974;
  --text-tertiary: #9B9AB0;

  --accent: #7C3AED;
  --accent-hover: #6D28D9;
  --accent-light: #EDE9FE;
  --accent-border: rgba(124, 58, 237, 0.25);
  --accent-rgb: 124, 58, 237;

  --bg-rgb: 248, 247, 252;

  --success: #059669;
  --success-bg: #ECFDF5;
  --error: #DC2626;
  --error-bg: #FEF2F2;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05);
  --shadow-accent: 0 4px 16px rgba(124, 58, 237, 0.3);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0C0C12;
    --surface: #14141C;
    --surface-alt: #1A1A24;
    --surface-hover: #1E1E2A;

    --border: #26263A;
    --border-strong: #363650;

    --text: #F0EFF9;
    --text-secondary: #9B9AB0;
    --text-tertiary: #6B6A80;

    --accent: #9333EA;
    --accent-hover: #A855F7;
    --accent-light: rgba(147, 51, 234, 0.12);
    --accent-border: rgba(147, 51, 234, 0.3);
    --accent-rgb: 147, 51, 234;

    --bg-rgb: 12, 12, 18;

    --success: #10B981;
    --success-bg: rgba(16, 185, 129, 0.1);
    --error: #F87171;
    --error-bg: rgba(248, 113, 113, 0.1);

    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.5);
    --shadow-accent: 0 4px 16px rgba(147, 51, 234, 0.35);
  }
}
```

**Color Rules:**
- All colors referenced through CSS variables — zero hardcoded hex in components
- Same accent tone in light and dark; only saturation/lightness shifts slightly
- Semantic colors (success/error) used exclusively for feedback states

---

## 3. Typography Rules

**Font Stack:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Inter | 52–64px | 800 | 1.1 | -0.035em |
| Section H2 | Inter | 28px | 700 | 1.25 | -0.025em |
| H3 / Card title | Inter | 16px | 600 | 1.4 | -0.015em |
| Body | Inter | 15px | 400 | 1.65 | 0 |
| Label / Caption | Inter | 13px | 500 | 1.4 | 0.01em |
| Mono / Code | ui-monospace | 13px | 400 | 1.5 | 0 |

**Typography Rules:**
- Heading weight ≥ 600; display headings use 700–800
- Body text uses `--text-secondary` on descriptive copy, `--text` on primary content
- **NEVER use**: system-ui alone without Inter as first choice, decorative serifs

**Text Decoration:**
- Hero H1: gradient text (`gradient-text` class) on key phrase only — subtle violet→purple→indigo
- Section H2: plain `--text`, no decoration
- Labels/chips: plain, uppercase optional for micro labels only

---

## 4. Component Stylings

### Buttons
```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s, border-color 0.18s, transform 0.1s, opacity 0.18s;
  outline: none; border: 1px solid transparent; white-space: nowrap; line-height: 1; }
.btn:active:not(:disabled) { transform: scale(0.97); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
.btn:focus-visible { box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.25); }

/* Primary */
.btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); padding: 10px 20px; }
.btn-primary:hover { background: var(--accent-hover); box-shadow: var(--shadow-accent); }

/* Secondary */
.btn-secondary { background: var(--surface); color: var(--text); border-color: var(--border); padding: 10px 20px; }
.btn-secondary:hover { background: var(--surface-hover); border-color: var(--border-strong); }

/* Ghost */
.btn-ghost { background: transparent; color: var(--text-secondary); padding: 8px 14px; }
.btn-ghost:hover { background: var(--surface-alt); color: var(--text); }

/* Danger ghost */
.btn-danger { background: transparent; color: var(--error); padding: 6px 12px; font-size: 13px; }
.btn-danger:hover { background: var(--error-bg); }

/* Size variants */
.btn-sm { padding: 6px 12px; font-size: 13px; border-radius: 6px; }
.btn-lg { padding: 12px 28px; font-size: 15px; border-radius: 10px; }
```

### Cards
```css
.card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
.card-hover:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); }
.card-lift:hover { border-color: var(--border-strong); box-shadow: var(--shadow-lg); transform: translateY(-2px); }
```

### Navigation (Sticky App Header)
```css
.app-nav { display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 56px; border-bottom: 1px solid var(--border);
  background: rgba(var(--bg-rgb), 0.85); backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 10; flex-shrink: 0; }
```

### Inputs
```css
.input { width: 100%; border-radius: 8px; border: 1px solid var(--border);
  background: var(--surface); color: var(--text); padding: 10px 14px;
  font-size: 14px; line-height: 1.5; outline: none;
  transition: border-color 0.18s, box-shadow 0.18s; }
.input::placeholder { color: var(--text-tertiary); }
.input:hover { border-color: var(--border-strong); }
.input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.12); }
```

### Tags / Badges
```css
.badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px;
  border-radius: 999px; border: 1px solid var(--accent-border);
  background: var(--accent-light); color: var(--accent); font-size: 12px; font-weight: 500; }
.chip { display: inline-flex; align-items: center; padding: 3px 10px;
  border-radius: 999px; background: var(--surface-alt); color: var(--text-secondary);
  font-size: 12px; font-weight: 500; border: 1px solid var(--border); }
```

### Stat Card
```css
.stat-card-accent { background: linear-gradient(135deg, var(--accent) 0%, #A855F7 100%);
  border-radius: 12px; color: #fff; }
```

---

## 5. Layout Principles

**Container:**
- Full page: `min-height: 100svh; display: flex; flex-direction: column;` on `#root`
- Content max-width: `max-w-2xl` (672px) for forms/dashboard
- Analytics max-width: `max-w-3xl` (768px)
- Landing hero: unconstrained width with internal padding

**Spacing Scale (Tailwind):**
- Section padding: `py-20` (80px)
- Component gap: `gap-4` to `gap-8`
- Card internal padding: `p-5` to `p-6`
- Form element gap: `gap-4`

**Grid:**
- Feature cards: `grid-cols-1 sm:grid-cols-3`
- Stats: `grid-cols-1 md:grid-cols-2`

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow, border only | Default cards, inputs |
| Subtle | `--shadow-sm` | Resting card with context |
| Elevated | `--shadow-md` | Card hover, dropdowns |
| Floating | `--shadow-lg` | Card lift on hover |
| Glow | `--shadow-accent` | Primary button hover, stat card |

---

## 7. Animation & Interaction

**Motion Philosophy**: One direction, one speed — opacity + translateY only. No bouncing, no spinning content.
**Tier**: L2

### Dependencies
CSS only — no external animation libraries.

### Entrance Animation
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.scale-in { animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both; }
.delay-1 { animation-delay: 80ms; }
.delay-2 { animation-delay: 160ms; }
.delay-3 { animation-delay: 250ms; }
.delay-4 { animation-delay: 350ms; }
```

### Hover & Focus States
- Cards: `card-lift` → `translateY(-2px)` + enhanced shadow
- Buttons: `scale(0.97)` on active, shadow glow on primary hover
- Inputs: accent border + 3px ring on focus
- Links: opacity 70% → 100% on hover, no underline unless inline text

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .fade-in-up, .scale-in { animation: none; opacity: 1; transform: none; }
}
```

---

## 8. Do's and Don'ts

### Do
- Use CSS variables for every color reference
- Apply `fade-in-up` to all page-load content (staggered with `.delay-N`)
- Keep hover states subtle — 2px lift max
- Use `--text-secondary` for descriptive / helper text
- Maintain the sticky nav pattern on all authenticated pages

### Don't
- ❌ Hardcode hex colors in component files
- ❌ Use `gray-*` Tailwind colors — everything through CSS vars
- ❌ Add more than one gradient per section
- ❌ Use backdrop-filter blur above 14px (performance)
- ❌ Animate layout properties (width, height, top, left) — only opacity + transform
- ❌ Use Tailwind `dark:` variants — dark mode is handled entirely by CSS variables + media query
- ❌ Use drop shadows on text
- ❌ Mix multiple accent colors — violet only, no secondary brand color
- ❌ Use border-radius above 16px on cards (feels rounded, not precise)
- ❌ Render placeholder images as solid color divs

---

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 768px | 3-col feature grid, side-by-side stat cards |
| Tablet | 480–768px | 2-col grid collapses to 1 |
| Mobile | < 480px | Single column, reduced hero font size, full-width buttons |

**Touch Targets:** minimum 44×44px on all interactive elements
**Collapsing Strategy:** Hero headline shrinks from 56px → 40px; buttons go full-width; feature cards stack

```css
@media (max-width: 640px) {
  h1.hero-title { font-size: 40px; letter-spacing: -0.025em; }
  .hero-ctas { flex-direction: column; width: 100%; }
  .hero-ctas .btn { width: 100%; }
  .app-nav { padding: 0 16px; }
}
```
