# Lotty Design System 🎨

## Color Palette

### Primary Colors
- **Lime Bright**: `#B8FF00` - Main brand color
- **Lime Soft**: `#D4FF5E` - Lighter, softer variation
- **Lime Light**: `#E8FFB7` - Very light, subtle accent
- **Lime Dark**: `#95CC00` - Darker variation for depth

### Neutrals
- **Black**: `#000000` - Primary background
- **Gray Soft**: `#1a1a1a` - Subtle backgrounds
- **Gray Medium**: `#2a2a2a` - Card backgrounds
- **White**: `#FFFFFF` - Primary text

## Gradients

### Lime Gradients (Buttons, Cards)
```css
/* Standard lime gradient */
linear-gradient(135deg, #D4FF5E 0%, #B8FF00 100%)

/* Soft lime gradient (hover states) */
linear-gradient(135deg, #E8FFB7 0%, #D4FF5E 50%, #B8FF00 100%)

/* Multi-stop gradient (borders) */
linear-gradient(to-br, #E8FFB7, #D4FF5E, #B8FF00)
```

### Dark Gradients (Backgrounds)
```css
/* Subtle dark gradient */
linear-gradient(180deg, #000000 0%, #1a1a1a 100%)

/* Radial dark gradient */
radial-gradient(circle at top center, #2a2a2a 0%, #000000 100%)

/* Ambient background */
linear-gradient(to-br, #0a0a0a, #000000, #0a0a0a)
```

## Typography

### Font Family
- **Primary**: AEONIK
- **Fallback**: sans-serif

### Font Weights
- **Bold (700)**: Headings, buttons, emphasized text
- **Regular (400)**: Body text, descriptions, labels

### Usage
| Element | Weight | Size |
|---------|--------|------|
| H1 (Main heading) | 700 | 36-48px |
| H2 (Section heading) | 700 | 24-32px |
| Body text | 400 | 16-18px |
| Small text | 400 | 14px |
| Buttons | 700 | 16-18px |

## Components

### Header
- Background: Dark gradient (`from-[#1a1a1a] to-black`)
- Logo: Lotty graphic
- Button: Lime gradient with hover effect
- Shadow: Subtle drop shadow

### Buttons
- **Primary**: Lime gradient (`from-[#D4FF5E] to-[#B8FF00]`)
- **Hover**: Softer lime (`from-[#E8FFB7] to-[#D4FF5E]`)
- **Shadow**: Medium shadow with increased shadow on hover
- **Border Radius**: `rounded-lg` (8px)
- **Padding**: `px-6 py-2` (small), `px-8 py-4` (large)

### Cards
- **Background**: Dark gradient (`from-[#1a1a1a] to-[#0a0a0a]`)
- **Border**: Optional gradient border (2px)
- **Border Radius**: `rounded-xl` or `rounded-2xl`
- **Shadow**: `shadow-lg` with `shadow-xl` on hover

### Lottery Pool Card (Main)
- **Background**: Lime gradient (`from-[#D4FF5E] to-[#B8FF00]`)
- **Border**: Gradient border (softer lime tones)
- **Glow**: Subtle inner white glow
- **Hover**: Enhanced shadow

### Stat Cards
- **Background**: Dark gradient
- **Text Color**: Gray for labels, Lime soft for values
- **Shadow**: Subtle shadow

## Visual Effects

### Ambient Glows
- Low opacity (`opacity-3` to `opacity-5`)
- Large blur radius (`blur-3xl`)
- Positioned absolutely behind content
- Colors: Lime variations

### Shadows
- **Small**: `shadow-md` - Buttons, small cards
- **Medium**: `shadow-lg` - Regular cards
- **Large**: `shadow-xl` - Large cards, hover states
- **Extra Large**: `shadow-2xl` - Special emphasis

### Transitions
- **Duration**: Fast (`transition-all`)
- **Properties**: Transform, opacity, shadow
- **Hover States**: Subtle color shifts, shadow enhancement

## Layout

### Spacing
- **Padding**: Generous (`p-6`, `p-8`)
- **Gaps**: Consistent (`gap-4`, `gap-6`)
- **Margins**: Spacious (`mb-6`, `mb-8`)

### Container
- **Max Width**: `max-w-7xl` (main content)
- **Centering**: `mx-auto`
- **Padding**: `px-4` (mobile), `px-6` (tablet+)

## Responsive Design

### Breakpoints
- **Mobile**: Default
- **Tablet**: `md:` (768px+)
- **Desktop**: Automatic scaling

### Adaptations
- Logo size: Smaller on mobile
- Button width: Full width on mobile, auto on desktop
- Grid layouts: Stack on mobile, multi-column on tablet+

## Best Practices

### ✅ Do
- Use soft gradients over harsh colors
- Apply subtle glow effects for depth
- Maintain consistent spacing
- Use shadows to create hierarchy
- Apply smooth transitions

### ❌ Don't
- Use pure bright colors without gradients
- Overcomplicate with too many effects
- Ignore contrast for accessibility
- Mix different gradient directions randomly
- Use jarring color transitions

## Color Accessibility

### Text Contrast
- Black text on lime gradients: ✅ High contrast
- White text on black backgrounds: ✅ High contrast
- Gray text for labels: ✅ Sufficient contrast

### Focus States
All interactive elements have visible focus states for keyboard navigation.

## Implementation

All gradients and colors are defined in:
- `frontend/src/app/globals.css` (CSS custom properties)
- Tailwind classes for rapid development
- Inline styles for AEONIK font family and weights

---

**Design Philosophy**: Simple, clean, modern with subtle depth through gradients and glow effects. Pleasant to look at, easy to use.

