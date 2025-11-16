# Leaderboard Page

## Overview

Simple, clean leaderboard page showing top players with mock data.

## Location

**File**: `src/app/leaderboard/page.tsx`

**URL**: `/leaderboard`

## Layout

```
┌────────────────────────────┐
│      Leaderboard           │
│      (Top players)         │
│                            │
│  [All Time] [Month] [Week] │
│                            │
│  ┌────────────────────┐   │
│  │ Rank | Player | ...│   │
│  │  1   | 0x123..│ 42 │   │
│  │  2   | 0x456..│ 38 │   │
│  │  ... | ...    │ ...│   │
│  └────────────────────┘   │
└────────────────────────────┘
```

## Features

### 1. Heading & Subtext
- **Heading**: "Leaderboard" (36px, AEONIK Bold, white)
- **Subtext**: "Top players" (14px, gray)
- Both centered

### 2. Filter Buttons
Three filter options:
- **All Time** (default)
- **This Month**
- **This Week**

**Active Button**:
- Lime background (`#B8FF00`)
- Black text
- Shadow

**Inactive Button**:
- Dark gray background (`#2a2a2a`)
- White text
- Hover: Lighter gray (`#3a3a3a`)

### 3. Desktop Table
Full table with 5 columns:

| Column | Description | Style |
|--------|-------------|-------|
| **Rank** | Position (1-15) | White, bold |
| **Player** | Wallet address | White (lime if current user) |
| **Wins** | Number of wins | White |
| **Winnings** | Total winnings | Lime, bold |
| **Win Rate** | Win percentage | White |

**Features**:
- Rounded corners with border
- Dark background (`#1A1A1A`)
- Header row with darker background
- Hover effect on rows
- Current user row highlighted

### 4. Mobile Grid
Simplified cards showing:
- **Rank** (large, left)
- **Player** (address)
- **Wins** (below address)

**Current user card**:
- Lime border
- "(You)" label

## Mock Data

15 entries with:
- Rank: 1-15
- Address: Shortened format (`0x1234...5678`)
- Wins: 5-42
- Winnings: $500-$4,200
- Win Rate: 38%-65%

### Data Structure

```typescript
interface LeaderboardEntry {
  rank: number
  address: string
  wins: number
  winnings: string
  winRate: string
}
```

## Current User Highlighting

**Detection**:
- Compares connected wallet address with leaderboard entries
- Formats both to `0x1234...5678` format
- Matches on shortened address

**Highlighting**:
- Desktop: Background color + lime text + "(You)" label
- Mobile: Lime border + "(You)" label

## Responsive Design

### Desktop (≥768px)
- Full table with all columns
- Hover effects on rows
- Generous padding

### Mobile (<768px)
- Card-based layout
- Shows: Rank, Player, Wins
- Hides: Winnings, Win Rate
- Stacked vertically with gap

## Filter Logic (Currently Mock)

All three filters currently show the same data. When implementing real data:

```typescript
const [filter, setFilter] = useState<FilterType>('all')

// Fetch data based on filter
useEffect(() => {
  if (filter === 'all') fetchAllTimeLeaderboard()
  if (filter === 'month') fetchMonthlyLeaderboard()
  if (filter === 'week') fetchWeeklyLeaderboard()
}, [filter])
```

## Styling Details

### Colors
- **Background**: Black with gradient
- **Card background**: `#1A1A1A`
- **Borders**: `#333333`
- **Text**: White
- **Accent**: Lime (`#B8FF00`)
- **Muted text**: `text-gray-400`

### Typography
- **Heading**: 36px (text-4xl), AEONIK Bold
- **Subtext**: 14px (text-sm), AEONIK Regular
- **Buttons**: Small, AEONIK Bold
- **Table header**: Small, AEONIK Bold
- **Table data**: Base, AEONIK Regular
- **Rank**: Bold

### Spacing
- **Container**: Max width 1200px, centered
- **Padding**: `px-6 py-8`
- **Button gap**: `gap-4`
- **Card gap**: `space-y-4`

## Usage

### Navigate to Leaderboard
```typescript
import Link from 'next/link'

<Link href="/leaderboard">View Leaderboard</Link>
```

### Current Implementation
```typescript
// Already linked from dashboard
<Link href="/leaderboard">View Leaderboard</Link>
```

## Future Enhancements

### 1. Real Data Integration
Replace mock data with:
- Supabase queries
- Smart contract events
- Aggregated statistics

### 2. Filtering Logic
Implement actual time-based filtering:
- Query by date range
- Cache results
- Optimize queries

### 3. Pagination
For larger datasets:
- Load more button
- Infinite scroll
- Virtual scrolling

### 4. Additional Columns
Add more stats:
- Total entries
- Biggest win
- Recent activity
- Streak

### 5. Sorting
Allow sorting by:
- Rank
- Wins
- Winnings
- Win rate

### 6. Search
- Search by address
- Filter by criteria
- Quick jump to user

### 7. Animations
- Fade in rows
- Smooth transitions
- Loading skeletons

## Example: Real Data Integration

```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

function useLeaderboard(filter: FilterType) {
  return useQuery({
    queryKey: ['leaderboard', filter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .order('total_winnings', { ascending: false })
        .limit(15)
      
      if (error) throw error
      return data
    }
  })
}

// In component:
const { data: leaderboard, isLoading } = useLeaderboard(filter)
```

## Testing Checklist

### Layout
- [ ] Heading centered and correct size
- [ ] Subtext visible and styled
- [ ] Max width applied (1200px)
- [ ] Padding consistent

### Filter Buttons
- [ ] Three buttons displayed
- [ ] "All Time" active by default
- [ ] Clicking switches active state
- [ ] Active button has lime background
- [ ] Inactive buttons have gray background
- [ ] Hover effect works

### Desktop Table
- [ ] All 5 columns visible
- [ ] Header row styled correctly
- [ ] 15 rows displayed
- [ ] Current user row highlighted
- [ ] Hover effect on rows
- [ ] Borders and background correct

### Mobile View
- [ ] Table hidden on mobile
- [ ] Cards displayed instead
- [ ] Shows rank, player, wins
- [ ] Current user card has lime border
- [ ] Cards stacked vertically

### Current User Detection
- [ ] Detects connected wallet
- [ ] Matches with leaderboard entry
- [ ] Highlights correct row/card
- [ ] Shows "(You)" label
- [ ] Works when wallet disconnected

### Responsive
- [ ] Desktop layout ≥768px
- [ ] Mobile layout <768px
- [ ] No horizontal scroll
- [ ] Text readable at all sizes

## Accessibility

- [ ] Semantic HTML (table, thead, tbody)
- [ ] Alt text for icons (if added)
- [ ] Keyboard navigation
- [ ] Focus states on buttons
- [ ] Color contrast meets WCAG AA

## Performance

- Static mock data (instant load)
- No API calls yet
- Minimal re-renders
- Efficient filtering

---

✅ **Leaderboard page complete!** Shows top 15 players with mock data, filter buttons, and responsive design.

