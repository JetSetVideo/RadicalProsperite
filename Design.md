# Radical Prosperité — Design System (2026)

---

## 0. Project Structure & Architecture

### 0.1 Assets

| Path | Purpose |
|------|---------|
| `assets/css/variables.css` | Design tokens only (colors, spacing, radius, shadows, breakpoint refs). Single source of truth. |
| `assets/css/main.css` | Base styles: imports variables, body/html, `.page-content`, global typography (h2/h3/p), `.section-spacing`, `.responsive-padding`, `prefers-reduced-motion`. |
| `assets/fonts/` | Local fonts (e.g. Ethnocentric Rg.otf, Ethnocentric Rg It.otf). Google fonts (Orbitron, Montserrat) loaded in `app.vue`. |

### 0.2 Components

| Component | Role | Location |
|-----------|------|----------|
| **Navbar** | Fixed top nav: brand, sub-nav links, adhesion CTA, settings. Hide on scroll, show at top. | `components/Navbar.vue` |
| **Footer** | Fixed bottom: brand, social icons, copyright. Visible at top and bottom of scroll. | `components/Footer.vue` |
| **Settings** | Theme toggle (dark/light), dropdown. | `components/Settings.vue` |
| **Carte** | Interactive map (e.g. events). | `components/Carte.vue` |
| **Calendrier** | Events calendar. | `components/Calendrier.vue` |

Future: group under `components/layout/` (Navbar, Footer) and `components/ui/` (Settings, Carte, Calendrier) if the tree grows.

### 0.3 Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | `pages/index.vue` | Home: hero, quote, meet-up, mission, values, CTA/donations |
| `/adhesion` | `pages/adhesion.vue` | Membership tiers, register/login toggle, form |
| `/informations` | `pages/informations.vue` | Info hub: events, news |
| `/communaute` | `pages/communaute.vue` | Community |
| `/forum` | `pages/forum.vue` | Forum |
| `/magasin` | `pages/magasin.vue` | Shop |
| `/aides` | `pages/aides.vue` | Support / aids |

All pages use the same layout: `<main class="main-content …">` + content container; section spacing `mx-6 md:mx-10 lg:mx-16` and `mb-8` (or equivalent).

### 0.4 Styles Architecture

- **Global**: Tokens and base layout/typography in `assets/css/` (loaded via `nuxt.config.ts` `css: ['~/assets/css/main.css']`). App shell (#background, #bands, font-face) in `app.vue`.
- **Scoped**: Per-component and per-page `<style scoped>` in Vue files. Use design tokens (e.g. `var(--surface-card)`, `var(--radius-lg)`) and shared spacing (e.g. `var(--page-content-top-padding)`) for consistency.
- **Tailwind**: Used for utilities; prefer tokens for colors and radius when they exist in the design system.

---

## 1. Visual Direction

| Attribute       | Value                                                              |
|-----------------|--------------------------------------------------------------------|
| **Style**       | Cyber-civic, dark command-center, premium and calm                 |
| **Metaphor**    | Circuit board / motherboard - electronic paths, IC pads, data flow |
| **Background**  | Near-black layered gradients with circuit traces in cyan/green     |
| **Motion**      | Slow, continuous, low-amplitude (no aggressive flashing)           |
| **Readability** | Every screen must maintain strong contrast over animated BG        |

---

## 1.5 Harmonization Updates (Feb 2026)

### 1.5.1 CSS Variable-Driven Layout
- **`--page-content-top-padding: 6rem`**: Controls page content offset below navbar
- **`--heading-h2-margin-left: 1.5rem`**: Global h2 left indentation
- **`--heading-h3-margin-y: 0.35rem`**: h3 vertical spacing
- **`--heading-h3-margin-x: 0.75rem`**: h3 horizontal spacing
- **`--text-in-container-margin-left: 0.75rem`**: Inner left margin for p tags in containers

### 1.5.2 Spacing Rules
- **Section margins**: `mb-8` + `mx-6 md:mx-10 lg:mx-16` across all pages
- **Page headers**: `padding-top: 0` (delegated to global `--page-content-top-padding`)
- **Page backgrounds**: `padding-top: 0`, `margin-top: 0` (flush with page content)

### 1.5.3 Navbar Refactor
- **Simplified DOM**: Removed redundant wrapper divs (`brand-container`, `brand-wrapper`, `action-group`, `btn-content`)
- **BEM naming**: `.action-btn`, `.action-btn--connected`, `.action-btn__icon`, `.action-btn__label`
- **Brand title**: Changed from `<span>` to `<div>` elements, font size `1.6rem`
- **Flat grid**: `.navbar-brand` | `.navbar-spacer` | `.navbar-actions`
- **Button style**: Direct gradient background (not pseudo-element), consistent inner light + dark outer shadows

### 1.5.4 Codebase Cleanup
- **variables.css**: Single `:root` block for layout, surfaces, text, accents, tricolor, circuit, spacing, radius, shadows; legacy aliases for compatibility
- **main.css**: Base, `.page-content`, global h2/h3/p rules, `.section-spacing`, `.responsive-padding`; reduced motion in `main.css`
- **app.vue**: App shell only (#background, #bands, font-face); no duplicate tokens or typography
- **All buttons**: Harmonized shadow pattern (inner light + outer dark) across all pages

---

## 2. Color System

### 2.1 Core Surface Tokens

| Token                   | Value (CSS)                    | Usage                          |
|-------------------------|--------------------------------|--------------------------------|
| `--surface-deepest`    | `#02050b`                      | App background, base layer     |
| `--surface-deep`       | `#010712`                      | Card backgrounds, overlays     |
| `--surface-elevated`   | `#0f172a`                      | Elevated panels, modals        |
| `--surface-input`      | `rgba(15, 23, 42, 0.86)`      | Form inputs, text fields       |
| `--surface-glass`      | `rgba(2, 10, 22, 0.9)`        | Glass-morphism containers      |
| `--surface-card`       | `rgba(10, 18, 34, 0.88)`      | Membership/info cards          |

### 2.2 Text Tokens

| Token                   | Value         | Usage                                   |
|-------------------------|---------------|-----------------------------------------|
| `--text-primary`       | `#f1f5f9`     | Headlines, primary content              |
| `--text-secondary`     | `#cbd5e1`     | Labels, descriptions, muted text        |
| `--text-muted`         | `#94a3b8`     | Placeholders, disabled text             |
| `--text-inverse`       | `#1a1a2e`     | Text on light surfaces                  |
| `--text-link`          | `#38bdf8`     | Hyperlinks, interactive text            |

### 2.3 Accent & Status Tokens

| Token                        | Value                          | Usage                        |
|------------------------------|--------------------------------|------------------------------|
| `--accent-cyan`             | `#38bdf8`                      | Primary accent, borders      |
| `--accent-cyan-glow`        | `rgba(56, 189, 248, 0.22)`    | Border glow, subtle borders  |
| `--accent-cyan-strong`      | `rgba(56, 189, 248, 0.45)`    | Active borders, hover        |
| `--accent-green`            | `#22c55e`                      | Secondary accent, CTAs       |
| `--accent-green-glow`       | `rgba(74, 222, 128, 0.65)`    | Success halo, connected glow |
| `--success`                 | `#10b981`                      | Connected, confirmed states  |
| `--success-bg`              | `rgba(6, 58, 39, 0.35)`       | Success panel background     |
| `--success-border`          | `rgba(74, 222, 128, 0.35)`    | Success panel border         |
| `--error`                   | `#fb7185`                      | Error text, badges           |
| `--error-bg`                | `rgba(127, 29, 29, 0.25)`     | Error panel background       |
| `--error-border`            | `rgba(251, 113, 133, 0.35)`   | Error panel border           |
| `--warning`                 | `#fbbf24`                      | Caution states               |

### 2.4 French Tricolor System

| Mode    | Blue           | White/Center              | Red            |
|---------|----------------|---------------------------|----------------|
| Light   | `#003399`      | `#ffffff`                 | `#c8102e`      |
| Dark    | `#4d7fbf`      | `rgba(30, 30, 40, 0.95)` | `#ff4d6d`      |

**Gradient usage:**
- **Navbar** (light): `linear-gradient(135deg, rgba(0,51,153,0.95) 0%, rgba(255,255,255,0.95) 50%, rgba(200,16,46,0.95) 100%)` with `background-size: 300% 300%` and `tricolorFlow 20s` animation
- **Navbar** (dark): Same structure with `rgba(0,30,100,0.95)` / `rgba(30,30,40,0.95)` / `rgba(140,10,30,0.95)`
- **Title text gradient**: `linear-gradient(90deg, #003399 0%, #ffffff 50%, #c8102e 100%)` clipped to text
- **Footer**: Same tricolor gradient as navbar

### 2.5 Circuit Board / Background Tokens

| Token                    | Value                          | Usage                         |
|--------------------------|--------------------------------|-------------------------------|
| `--circuit-trace`       | `rgba(56, 189, 248, 0.12)`    | Main circuit line color       |
| `--circuit-trace-sub`   | `rgba(99, 102, 241, 0.08)`    | Sub-trace, thinner paths      |
| `--circuit-pad`         | `rgba(56, 189, 248, 0.18)`    | IC pads, junction points      |
| `--circuit-via`         | `rgba(74, 222, 128, 0.15)`    | Via holes, crossover points   |
| `--signal-blue`         | `rgba(56, 189, 248, 0.45)`    | Blue data flow beam           |
| `--signal-red`          | `rgba(200, 16, 46, 0.35)`     | Red data flow beam            |
| `--signal-green`        | `rgba(16, 185, 129, 0.55)`    | Green data flow beam          |
| `--signal-cyan`         | `rgba(125, 211, 252, 0.35)`   | Cyan secondary pulse          |

---

## 3. Typography

### 3.1 Font Stack

| Role        | Font Family                            | Weight Range   |
|-------------|----------------------------------------|----------------|
| Headlines   | `'Orbitron', 'Ethnocentric', sans-serif` | 600-900      |
| Body/UI     | `'Montserrat', sans-serif`             | 300-700        |
| Decorative  | `'Ethnocentric'` (loaded from assets)  | 400 (regular), 700 (italic) |

### 3.2 Type Scale

| Element      | Size                              | Weight    | Line Height | Letter Spacing |
|--------------|-----------------------------------|-----------|-------------|----------------|
| **H1**       | `clamp(2rem, 4vw, 3.2rem)`       | 700-800   | 1.15        | `0.02em`       |
| **H2**       | `clamp(1.4rem, 2.6vw, 2.1rem)`   | 600-700   | 1.2         | `0.015em`      |
| **H3**       | `clamp(1.1rem, 2vw, 1.5rem)`     | 600       | 1.3         | `0.01em`       |
| **Body**     | `0.95rem` to `1.05rem`           | 400       | 1.6         | normal         |
| **Small**    | `0.85rem` to `0.9rem`            | 400-500   | 1.5         | normal         |
| **Caption**  | `0.75rem` to `0.8rem`            | 500       | 1.4         | `0.02em`       |
| **Label**    | `0.88rem`                         | 500       | 1.4         | normal         |
| **Badge**    | `0.7rem`                          | 700       | 1.2         | `0.04em`       |

### 3.3 Headline Gradient

Headlines use clipped gradient text:
```css
background: linear-gradient(135deg, #67e8f9 0%, #86efac 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 4. Layout & Spacing

### 4.1 Grid System

| Property              | Value                           |
|-----------------------|---------------------------------|
| Max content width     | `1200px` - `1240px`            |
| Container padding (mobile)  | `16px` (1rem)            |
| Container padding (tablet)  | `32px` (2rem)            |
| Container padding (desktop) | `80px` (5rem)            |

### 4.2 Spacing Scale

| Token / Step | Value    | Usage                                    |
|--------------|----------|------------------------------------------|
| `xs`         | `4px`    | Inline gaps, icon margins                |
| `sm`         | `8px`    | Tight element spacing                    |
| `md`         | `16px`   | Card padding, field gaps                 |
| `lg`         | `24px`   | Section inner padding                    |
| `xl`         | `32px`   | Between sections                         |
| `2xl`        | `48px`   | Major section breaks                     |
| `3xl`        | `64px`   | Page-level vertical rhythm               |

### 4.3 Border Radius Scale

| Token        | Value      | Usage                                   |
|--------------|------------|-----------------------------------------|
| `radius-sm`  | `8px`     | Small elements, tags                    |
| `radius-md`  | `12px`    | Inputs, buttons                         |
| `radius-lg`  | `16px`    | Cards, panels                           |
| `radius-xl`  | `20px`    | Major sections, modals                  |
| `radius-2xl` | `24px`    | Hero containers                         |
| `radius-full`| `9999px`  | Pills, avatars, toggle wrappers         |

---

## 5. Component Specifications

### 5.1 Navbar

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Position              | `fixed top-0`, full width with enhanced margins |
| Margins               | External: `mx-6 md:mx-10 lg:mx-16 xl:mx-24`, Internal grid: `margin: 0 4rem`, `padding: 0.5rem 3rem` |
| Height                | Main: `96px` mobile / `112px` desktop, Sub: `64px` |
| Border radius         | `16px` (rounded-2xl)                           |
| Background            | Left dark blue (#003399) to right dark red (#c8102e) gradient (90deg, 0.9 opacity) |
| Backdrop filter       | `blur(8px)`                                    |
| Border                | `1px solid rgba(255, 255, 255, 0.1)`          |
| Title font            | Larger size, responsive scaling                 |
| Hide behavior         | Disappears on scroll, reappears only at top    |
| Sub-navbar            | Centered links with enhanced padding (`0.5rem 1rem`) and glass-morphism |
| Scroll behavior       | Opacity fade + scale transform on hide         |
| Element sizing        | All elements larger with proper margins        |

**Adhesion button states:**
- Default: `linear-gradient(135deg, #003399 0%, #c8102e 100%)` + white border
- Connected: `linear-gradient(135deg, #059669 0%, #22c55e 100%)` + green halo `0 0 18px rgba(74, 222, 128, 0.7)`

### 5.2 Cards (Membership / Info)

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Min width             | `min(82vw, 280px)` (scroll-snap on mobile)    |
| Max width             | `280px`                                        |
| Background            | `rgba(10, 18, 34, 0.88)`                      |
| Border                | `1px solid rgba(56, 189, 248, 0.22)`          |
| Border radius         | `16px`                                         |
| Padding               | `16px`                                         |
| Scroll behavior       | `scroll-snap-type: x mandatory` on container  |
| Hover                 | `translateY(-4px)`                             |
| Selected              | Border `rgba(74, 222, 128, 0.8)` + green shadow |
| Recommended badge     | Gradient pill `#0284c7` to `#10b981`           |

### 5.3 Form Elements

| Element               | Specs                                           |
|-----------------------|-------------------------------------------------|
| Input background      | `rgba(15, 23, 42, 0.86)`                       |
| Input border          | `1px solid rgba(56, 189, 248, 0.24)`           |
| Input focus           | Border `rgba(34, 211, 238, 0.8)` + ring `0 0 0 3px rgba(8, 145, 178, 0.22)` |
| Input radius          | `12px`                                          |
| Input padding         | `0.7rem 0.85rem`                                |
| Input text color      | `#f1f5f9`                                       |
| Label size            | `0.88rem`, color `#cbd5e1`                      |
| Submit button         | Gradient `#0284c7` to `#16a34a`, radius `12px` |
| Disabled state        | `opacity: 0.5`, `cursor: not-allowed`           |

### 5.4 Cookie Banner

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Position              | `fixed bottom-4 left-4 right-4`, `z-index: 70`|
| Max width             | `768px` (max-w-3xl), centered                 |
| Background            | `rgba(5, 10, 20, 0.92)`                       |
| Border                | `1px solid rgba(56, 189, 248, 0.25)`          |
| Backdrop filter       | `blur(14px)`                                   |
| Animation             | Slide up from +16px with 300ms ease            |
| Storage               | Cookie `rp_cookie_choice` + localStorage, 6mo  |

### 5.6 Toggle (S'inscrire / Se connecter)

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Position              | `sticky top-6.4rem`, `z-index: 30`             |
| Wrapper               | `border: 1px solid rgba(56, 189, 248, 0.3)`   |
| Wrapper BG            | `rgba(2, 12, 28, 0.9)` + `blur(8px)`          |
| Wrapper radius        | `9999px` (full)                                |
| Active tab            | Gradient `rgba(14, 165, 233, 0.75)` to `rgba(16, 185, 129, 0.72)` |
| Inactive tab          | `color: #cbd5e1`, transparent bg               |

### 5.7 Footer

| Property              | Value                                          |
|-----------------------|------------------------------------------------|
| Position              | `fixed bottom-0`, full width                   |
| Background            | French tricolor gradient (matches navbar)      |
| Visibility            | Visible at page top (initial) and bottom       |
| Hide animation        | `opacity-0 translate-y-full` with 500ms        |
| Social icons          | Horizontal row with margins, always single-line |
| Icon hover            | `scale(1.2) translateY(-3px)`                  |

---

## 6. Page Layout & Spacing System

### 6.1 Comprehensive Spacing Hierarchy

| Element Type          | Margins/Padding | Notes |
|----------------------|-----------------|-------|
| Page content         | `padding-top: var(--page-content-top-padding)` (6rem) | Applied via `.page-content` in `main.css` |
| Section containers   | `mb-8` + `mx-6 md:mx-10 lg:mx-16` | Harmonized across all pages |
| h2 titles            | `margin-left: var(--heading-h2-margin-left)` (1.5rem) | Global rule in `main.css` |
| h3 titles            | `margin: var(--heading-h3-margin-y) var(--heading-h3-margin-x)` | Global rule in `main.css` |
| p in containers      | `margin-left: var(--text-in-container-margin-left)` (0.75rem) | Global rule in `main.css` for `.page-content` / `.content-container` / cards |
| Card elements        | `padding-left: 1.25rem` | All card types across all pages |
| Buttons              | Inner light + dark outer shadows | Harmonized shadow treatment |
| Page headers         | `padding-top: 0` | Offset delegated to `--page-content-top-padding` |

### 6.2 Element Positioning

| Component            | Positioning | Spacing Notes |
|---------------------|-------------|---------------|
| Navbar content grid | Enhanced margins | `margin: 0 4rem`, `padding: 0.5rem 3rem`, `gap: 2rem` |
| Action buttons      | Larger size + margins | `mx-sm` between elements |
| Sub-navigation      | Enhanced shadows + padding | `mx-sm` item spacing |
| Hero elements       | Combined badge/subtitle | Vertical centering |
| Quote author        | Right-aligned | `ml-auto mr-4` |
| Value cards         | Parent container + padding | `pb-4` bottom spacing |
| CTA elements        | All children with margins | `ml-4` left margins |
| Crypto cards        | Horizontal alignment | `mx-2` margins + dark text |

### 6.3 Visual Enhancements

| Feature              | Implementation | Effect |
|---------------------|----------------|---------|
| French flag banner  | Waving animation | Dynamic background movement |
| Element shadows     | Multiple shadow layers | Depth and visual hierarchy |
| Text styling        | Enhanced gradients | Better readability |
| Card interactions   | Hover effects | User feedback |
| Spacing consistency | Design system variables | Uniform appearance |

### 6.4 Responsive Behavior

| Breakpoint          | Adjustments | Notes |
|--------------------|-------------|--------|
| Mobile (< 768px)   | Reduced margins, compact layout | Touch-friendly spacing |
| Tablet (768px+)    | Medium spacing, balanced layout | Optimal readability |
| Desktop (1024px+)  | Generous margins, full layout | Maximum visual impact |

---

## 7. Advanced Animation System

### 7.1 Background Animations

| Animation           | Duration | Complexity | Effect |
|--------------------|----------|------------|---------|
| French flag wave   | 8s       | Complex sine curves | Dynamic banner movement |
| Circuit traces     | 180s     | Multi-scale fractal | Sophisticated patterns |
| Signal flows       | 32-45s   | Tricolor beams | Layered light effects |
| Micro pulses       | 8s       | Radial gradients | Subtle accent lighting |

### 7.2 Interactive Elements

| Element            | Animation Type | Duration | Trigger |
|-------------------|----------------|----------|---------|
| Navbar appearance | Slide + fade   | 300ms    | Scroll to top |
| Card hovers       | Elevation + glow | 300ms   | Mouse enter |
| Button presses    | Scale + shadow | 150ms   | Click/tap |
| Text gradients    | Color shift    | 500ms   | Page load |

### 7.3 Performance Considerations

- **Hardware acceleration**: Transform and opacity properties
- **Reduced motion**: Respects `prefers-reduced-motion` (see `main.css`)
- **Optimized timing**: Cubic-bezier easing functions
- **Layer management**: Proper z-index stacking

---

## 8. Circuit Board Background System

### 8.1 Layer Stack (bottom to top)

| Layer           | z-index | Content                                       |
|-----------------|---------|-----------------------------------------------|
| `#background`   | 0       | Deep gradient base with subtle radial glows   |
| `#circuit-layer` | 0      | SVG circuit traces at 45/90-degree angles     |
| `#signal-layer` | 0      | Animated light beams flowing through traces   |
| Page content    | 10      | All interactive content                       |
| Navbar          | 50      | Fixed navigation                              |
| Footer          | 40      | Fixed footer                                  |
| Cookie banner   | 70      | Overlay consent dialog                        |

### 8.2 Circuit Trace Design Rules

- All paths must follow **90-degree** or **45-degree** angles only
- Line widths: `1px` for sub-traces, `2px` for main traces
- Junction pads: `6px` to `10px` circles at path intersections
- Via holes: `4px` circles with `2px` inner gap (donut shape)
- IC chip pads: rectangular `8px x 12px` at trace endpoints
- Spacing between parallel traces: minimum `8px`
- Mask with `radial-gradient` to fade edges toward screen borders

### 8.3 Signal Animation Rules

- Blue beam: flows left-to-right and top-to-bottom, `20-30s` cycle
- Red beam: flows diagonally, `25-35s` cycle
- Green pulse: intermittent glow at junction pads, `4-8s` cycle
- All signals use `mix-blend-mode: screen`
- Maximum opacity: `0.55` for blue, `0.35` for red, `0.45` for green
- Motion must be continuous and smooth (linear timing)

---

## 9. Motion & Animation Rules (Consolidated)

### 9.1 Background Animations

| Animation           | Duration     | Timing    | Effect                      |
|---------------------|--------------|-----------|-----------------------------|
| French flag wave    | 8s           | —         | Dynamic banner movement     |
| Circuit glow drift  | `100-140s`   | linear    | Subtle shift of glow points |
| Signal flow blue    | `20-30s`     | linear    | Blue light along traces     |
| Signal flow red     | `25-35s`     | linear    | Red light along traces      |
| Pad pulse           | `4-8s`       | ease      | Green glow at IC pads       |
| Tricolor flow      | `20s`        | ease-in-out | Navbar/footer gradient move |

### 9.2 Interaction Animations

| Trigger             | Duration  | Easing    | Effect                       |
|---------------------|-----------|-----------|------------------------------|
| Navbar appearance   | 300ms     | —         | Slide + fade at scroll top   |
| Card hover          | `250ms`   | ease      | `translateY(-4px)`           |
| Button hover        | `250ms`   | ease      | `translateY(-1px)` + brightness |
| Nav link hover      | `300ms`   | ease      | `translateY(-2px)` + bg shift|
| Social icon hover   | `300ms`   | ease      | `scale(1.2) translateY(-3px)`|
| Focus ring          | `150ms`   | ease-out  | `box-shadow` ring appear     |
| Toggle switch       | `250ms`   | ease      | Background gradient swap     |
| Cookie banner enter | `300ms`   | ease      | `translateY(16px)` to `0`    |
| Footer show/hide    | `500ms`   | ease      | Opacity + translateY         |

### 9.3 Prohibited

- No `transform: scale()` above `1.2` on any element
- No brightness pulses above `1.15`
- No strobe or rapid flashing effects
- No parallax scrolling on background layers
- No `animation-duration` below `2s` on background elements

---

## 10. Responsive Breakpoints

| Breakpoint   | Width       | Grid Cols | Container Padding | Navbar Margins          |
|-------------|-------------|-----------|-------------------|-------------------------|
| `xs`        | `< 480px`   | 1         | `12px`            | `mx-3 mt-2`            |
| `sm`        | `480-639px` | 1         | `16px`            | `mx-6 mt-4`            |
| `md`        | `640-767px` | 2         | `16px`            | `mx-6 mt-4`            |
| `lg`        | `768-1023px`| 2         | `32px`            | `mx-10 mt-4`           |
| `xl`        | `1024-1279px`| 3        | `32px`            | `mx-16 mt-4`           |
| `2xl`       | `1280-1535px`| 3-4      | `32px`            | `mx-24 mt-4`           |
| `3xl`       | `>= 1536px` | 4         | `32px`            | `mx-24 mt-4`           |

### 10.1 Responsive Component Rules

- **Membership cards**: Horizontal scroll rail (`overflow-x: auto`, `scroll-snap-type: x mandatory`) on all widths; cards flex horizontally
- **Form grids**: `grid-cols-1` on mobile, `grid-cols-2` from `md`, `grid-cols-3` for postal/city/region
- **Navbar title**: Truncate with `text-overflow: ellipsis` below `480px`, max-width `40vw`
- **Sub-navbar**: `overflow-x: auto` for horizontal scroll on mobile
- **Footer**: Icons only on mobile (brand/copyright hidden below `sm`)
- **Sticky toggle**: Must stay visible during scroll on all screen sizes

---

## 11. Accessibility & Compliance

### 11.1 Contrast Requirements

| Pair                        | Minimum Ratio | Standard     |
|-----------------------------|---------------|--------------|
| Text primary on surface     | 7:1           | WCAG AAA     |
| Text secondary on surface   | 4.5:1         | WCAG AA      |
| Interactive elements        | 3:1           | WCAG AA      |
| Focus ring visibility       | 3:1           | WCAG AA      |

### 11.2 Focus States

- All focusable elements must show `box-shadow` ring on `:focus-visible`
- Ring color: `rgba(34, 211, 238, 0.8)` with `3px` spread
- Never remove focus outlines without providing alternative

### 11.3 Keyboard Navigation

- Tab order follows visual layout (top-to-bottom, left-to-right)
- Dropdown menus accessible via Enter/Space and Escape to close
- Form submission via Enter key
- Toggle components switchable via Space key

### 11.4 GDPR / Cookie Compliance

- Cookie banner required for EU visitors
- Store choice client-side only: `rp_cookie_choice` cookie + localStorage
- Duration: 6 months
- No tracking before consent
- Legal texts (terms/privacy) mandatory checkboxes for registration
- Consent purpose communicated in plain French

---

## 12. Data & Security UX Rules

- Authentication status reflected in navbar button (gradient shift + green halo)
- Connected panel shows user name and email clearly
- Internal errors never exposed: return user-safe messages in French
- Password requirements visible near input: minimum 8 characters
- Session cookie: `httpOnly`, `sameSite: lax`, `secure` in production, 30-day expiry
- Google OAuth state parameter validated on callback
- All form inputs sanitized and trimmed server-side

---

## 13. Shadow System

### 13.1 Elevation Levels

| Level     | Box Shadow                                                        | Usage                    |
|-----------|-------------------------------------------------------------------|--------------------------|
| `flat`    | none                                                              | Inline elements          |
| `low`     | `0 2px 6px rgba(0,0,0,0.15)`                                    | Subtle cards, icons      |
| `medium`  | `0 8px 32px rgba(0,0,0,0.25)`                                   | Navbar, floating panels  |
| `high`    | `0 22px 40px rgba(2,6,23,0.65)`                                 | Form containers, modals  |
| `glow`    | `0 0 18px rgba(74,222,128,0.7)`                                 | Connected/success states |

### 13.2 Inset Shadows

Used on buttons and interactive elements for depth:
```css
inset 0 1px 2px rgba(255, 255, 255, 0.2),
inset 0 -1px 2px rgba(0, 0, 0, 0.1)
```

---

## 14. Icon System

| Library      | Package                          | Usage                        |
|-------------|----------------------------------|------------------------------|
| Solid icons | `@fortawesome/free-solid-svg-icons` | UI actions, nav, forms     |
| Brand icons | `@fortawesome/free-brands-svg-icons` | Social media, Google, etc |

### Common Icons Used

| Icon                       | Context                    |
|----------------------------|----------------------------|
| `fa-satellite-dish`        | Membership page header     |
| `fa-user-plus`             | Adhesion/register button   |
| `fa-circle-info`           | Informations nav link      |
| `fa-users`                 | Communaute nav link        |
| `fa-comments`              | Forum nav link             |
| `fa-store`                 | Magasin nav link           |
| `fa-handshake-angle`       | Aides nav link             |
| `fa-brands fa-google`      | Google OAuth button        |
| `fa-brands fa-x-twitter`   | Twitter/X social link      |
| `fa-gear` / `fa-cog`       | Settings                   |

---

## 15. State Management Pattern

| State         | Storage           | Sync Method                   |
|---------------|-------------------|-------------------------------|
| Auth session  | Server cookie     | `useAuthState()` composable   |
| Cookie consent| Cookie + localStorage | `useCookie()` + `localStorage` |
| Theme mode    | Nuxt UI colorMode | `useColorMode()` from Nuxt UI |
| Form data     | Vue `ref()`       | Local component state         |
| Route state   | Vue Router        | `useRoute()` query params     |

---

## 16. Governance

- Any new page **must** reuse these tokens, components, and spacing scale
- New colors require explicit extension of the token table above
- New animations must fit the cyber-civic palette and calm tempo (no rapid motion)
- All interactive elements must have hover + focus + disabled states
- French language is primary; all UI text in French unless explicitly internationalized
- Dark mode is the default and primary design target; light mode is secondary
