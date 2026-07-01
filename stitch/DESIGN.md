---
name: Run Probe Utility System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-utility performance and technical precision. It prioritizes clarity over decoration, catering to users who require rapid data density and clear status visibility. The brand personality is professional, systematic, and reliable, evoking the feel of a high-end local development tool or enterprise dashboard.

The aesthetic follows a **Modern Corporate** approach with a heavy emphasis on **Minimalism** and **Tactile** cues. It avoids visual clutter by using generous whitespace within high-density layouts, subtle borders, and a disciplined monochromatic foundation. The emotional response should be one of "controlled efficiency"—where the interface feels like an extension of the user's workflow rather than a distraction.

## Colors

The palette is rooted in a neutral grayscale spectrum to allow status indicators to stand out with maximum clarity. 

- **Primary**: A deep slate used for primary actions, navigation, and core text to ground the interface.
- **Secondary**: A muted blue-gray for secondary text and non-critical icons.
- **Neutral**: The foundation of the UI, utilizing whites and light grays for surface layering and container separation.
- **Semantic Accents**: High-saturation "Emerald" for active/ready states, "Amber" for paused/warning states, and "Crimson" for error/critical states. These colors should be used sparingly but boldly to direct user attention.

## Typography

This design system utilizes **Inter** for all UI elements to ensure maximum legibility and a crisp, technical feel. A secondary monospaced font, **JetBrains Mono**, is introduced for data outputs, logs, and technical identifiers.

Typography is scaled for high-density environments. Font weights are used strategically to create hierarchy without needing large size variations. Headlines are tight and slightly tracked-in for a modern look, while labels use uppercase styling for distinct categorization.

## Layout & Spacing

The design system employs a **Fluid Grid** for internal content panels and a **Fixed Sidebar** for navigation. The spacing rhythm is based on a **4px baseline**, ensuring tight alignment and high information density typical of local tools.

- **Desktop**: 12-column grid with 16px gutters.
- **Tablet**: 8-column grid with 12px gutters.
- **Mobile**: 4-column grid with 8px gutters.

Padding within components (like table cells and input fields) should favor the "Small" (8px) and "Medium" (12px) units to maintain a compact footprint. Use 1px borders as structural dividers rather than large gaps of whitespace.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**. 

The system avoids heavy shadows. Instead, it uses a 1px border (#E2E8F0) to define containers. When elevation is required (e.g., for dropdowns or modals), use a very tight, neutral ambient shadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`. 

Backgrounds use three distinct tiers:
1. **App Background**: #F8FAFC
2. **Surface/Container**: #FFFFFF
3. **Muted/Inset**: #F1F5F9 (used for code blocks or secondary panels)

## Shapes

The shape language is "Soft" (0.25rem radius). This provides enough curvature to feel modern and approachable while maintaining the structured, technical alignment of a professional tool. Smaller elements like checkboxes and small tags use the base radius, while larger containers like cards and modals may use `rounded-lg` (0.5rem) to soften the footprint.

## Components

### Buttons
Primary buttons use the Primary Color (Slate 900) with white text. Secondary buttons use a white background with a 1px slate border. Size variants should include a "Compact" mode for toolbar use.

### Status Chips
Chips are essential for the "Run Probe" identity. They consist of a subtle tinted background (10% opacity of the accent color) and a high-contrast label and "dot" icon of the same color to indicate Ready, Paused, or Error.

### Input Fields
Inputs are defined by a 1px border and a subtle inner shadow to feel "recessed." Focus states use a 1px border of the Primary Color and a 2px soft outer glow.

### Lists & Tables
High-density tables are the core of this system. Use 1px horizontal dividers and alternating row tints (Zebra striping) using the Muted background color. Row height should be minimized (32px - 40px).

### Cards
Cards are flat with a 1px border. No shadows should be used for static cards; depth is only applied when the card is interactive or floating.