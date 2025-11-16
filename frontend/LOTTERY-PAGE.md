# Lottery Page Documentation

## Overview

Simple, clean lottery detail page with countdown timer and mock data.

## Files Created

### 1. Lottery Page
**Location**: `src/app/lottery/[id]/page.tsx`

Dynamic route that displays lottery details for any ID.

**URL Examples**:
- `/lottery/1` - Lottery #1
- `/lottery/abc123` - Lottery with ID "abc123"

### 2. Countdown Timer Component
**Location**: `src/components/lottery/CountdownTimer.tsx`

Updates every second with remaining time.

## Page Layout

```
┌────────────────────────────┐
│    [Active] Badge          │
│                            │
│      $50.00                │
│    (Total Pool)            │
│                            │
│  Entry fee: $10.00         │
│                            │
│  7 days, 5 hours, 30 mins  │
│                            │
│  5 people joined           │
│  Your odds: 1 in 5 chance  │
│                            │
│    [Join Now Button]       │
│                            │
│    Lottery ID: 1           │
└────────────────────────────┘
```

## Mock Data

Currently using hardcoded test data:

```typescript
const entryFee = '10.00'
const totalPool = '50.00'
const endTime = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
const participants = 5
const isActive = true
const hasEntered = false
```

## Components Breakdown

### Status Badge
- **Active**: Lime background (`#B8FF00`), black text
- **Closed**: Gray background, white text
- AEONIK Bold font

### Pool Amount
- **Size**: 48px (text-5xl)
- **Color**: Lime (`#B8FF00`)
- **Font**: AEONIK Bold

### Entry Fee
- **Size**: 20px (text-xl)
- **Color**: White
- **Font**: AEONIK Regular

### Countdown Timer
- **Size**: 18px (text-lg)
- **Color**: White
- **Font**: AEONIK Bold
- **Updates**: Every second
- **Format**: "X days, X hours, X minutes, X seconds"
- **Ended**: Shows "Lottery ended"

### Participants & Odds
- **Size**: 16px (text-base)
- **Color**: White
- **Font**: AEONIK Regular

### Join Button

**States**:

| State | Appearance | Disabled |
|-------|-----------|----------|
| **Active** | Lime gradient | No |
| **Entered** | Gray, "You've entered" | Yes |
| **Ended** | Gray, "Lottery ended" | Yes |

**Active Button**:
- Gradient: `from-[#D4FF5E] to-[#B8FF00]`
- Hover: `from-[#E8FFB7] to-[#D4FF5E]`
- Size: `px-8 py-4`
- Font: AEONIK Bold
- Full width on mobile, auto on desktop

## CountdownTimer Component

### Props

```typescript
interface CountdownTimerProps {
  endTime: number // Unix timestamp in seconds
}
```

### Usage

```tsx
import { CountdownTimer } from '@/components/lottery/CountdownTimer'

// Example: 1 hour from now
const endTime = Math.floor(Date.now() / 1000) + 3600

<CountdownTimer endTime={endTime} />
```

### Features

- ✅ Updates every second
- ✅ Shows days, hours, minutes, seconds
- ✅ Automatically formats (hides 0 days if < 1 day)
- ✅ Shows "Lottery ended" when time is up
- ✅ Cleans up interval on unmount

### Output Examples

```
"7 days, 5 hours, 30 minutes, 45 seconds"
"2 hours, 15 minutes, 30 seconds"
"45 minutes, 12 seconds"
"30 seconds"
"Lottery ended"
```

## Styling

### Layout
- **Max Width**: 1200px
- **Centered**: `mx-auto`
- **Padding**: `px-6 py-8`
- **Alignment**: Everything centered

### Colors
- **Lime**: `#B8FF00`
- **Light Gray**: `text-gray-400`
- **Gray**: `bg-gray-600`
- **Background**: Black with subtle gradient

### Typography
- **Headings**: AEONIK Bold (700)
- **Body**: AEONIK Regular (400)
- **Sizes**: 48px, 20px, 18px, 16px, 14px

## Responsive Design

### Mobile
- Button: Full width
- Stack vertically
- Adequate padding

### Desktop
- Button: Auto width
- Centered content
- Max width 1200px

## Button States Logic

```typescript
// Disabled if already entered
disabled={hasEntered}

// Disabled if lottery ended
disabled={!isActive}

// Text changes based on state
hasEntered ? "You've entered"
  : !isActive ? 'Lottery ended'
  : 'Join Now'
```

## Testing

### To Test Different States

**Active Lottery**:
```typescript
const isActive = true
const hasEntered = false
// Shows "Join Now" button (enabled)
```

**Already Entered**:
```typescript
const isActive = true
const hasEntered = true
// Shows "You've entered" button (disabled)
```

**Ended Lottery**:
```typescript
const isActive = false
const hasEntered = false
// Shows "Lottery ended" button (disabled)
```

### To Test Timer

**1 Hour**:
```typescript
const endTime = Math.floor(Date.now() / 1000) + 3600
```

**30 Minutes**:
```typescript
const endTime = Math.floor(Date.now() / 1000) + 1800
```

**10 Seconds** (for quick testing):
```typescript
const endTime = Math.floor(Date.now() / 1000) + 10
```

## URL Structure

```
/lottery/1       → Lottery with ID "1"
/lottery/abc     → Lottery with ID "abc"
/lottery/round-1 → Lottery with ID "round-1"
```

The `[id]` parameter is dynamic and can be accessed via:
```typescript
const params = useParams()
const id = params.id
```

## Next Steps

To connect real data:

1. **Fetch lottery data** based on `id` parameter
2. **Get user's entry status** from smart contract
3. **Wire up "Join Now" button** to smart contract call
4. **Update mock data** with real blockchain data

## Files Structure

```
frontend/
├── src/
│   ├── app/
│   │   └── lottery/
│   │       └── [id]/
│   │           └── page.tsx        ← Main lottery page
│   └── components/
│       └── lottery/
│           └── CountdownTimer.tsx  ← Timer component
```

Everything is clean, simple, and ready to use! 🎯

