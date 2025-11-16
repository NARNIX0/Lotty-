# Entry History Page

## Overview

Simple, clean page showing user's lottery entry history with filtering and mock data.

## Location

**File**: `src/app/history/page.tsx`

**URL**: `/history`

## Layout

```
┌────────────────────────────┐
│  Your Entry History        │
│                            │
│ [All] [Won] [Lost] [Pending]│
│                            │
│  ┌────────────────────┐   │
│  │ Nov 16, 2025       │   │
│  │ Lottery #5         │   │
│  │ Entry fee: $10.00  │Won│
│  └────────────────────┘   │
│  ┌────────────────────┐   │
│  │ Nov 15, 2025       │   │
│  │ Lottery #4         │   │
│  │ Entry fee: $10.00  │Lost│
│  └────────────────────┘   │
│  ...                       │
└────────────────────────────┘
```

## Features

### 1. Heading
- **Text**: "Your Entry History"
- **Size**: 36px (text-4xl)
- **Font**: AEONIK Bold
- **Color**: White
- **Alignment**: Centered

### 2. Filter Buttons
Four filter options:
- **All** (default) - Shows all entries
- **Won** - Shows only won entries
- **Lost** - Shows only lost entries  
- **Pending** - Shows only pending entries

**Active Button**:
- Lime background (`#B8FF00`)
- Black text
- Shadow

**Inactive Button**:
- Dark gray background (`#2a2a2a`)
- White text
- Hover: Lighter gray (`#3a3a3a`)

### 3. Entry Cards
Each card displays:
- **Date**: Small gray text (e.g., "Nov 16, 2025")
- **Lottery ID**: Large bold text (e.g., "Lottery #5")
- **Entry Fee**: Regular text (e.g., "Entry fee: $10.00")
- **Status**: Bold, color-coded (right side)

**Card Styling**:
- Background: `#1A1A1A`
- Border: `#333333`
- Padding: `px-6 py-4`
- Rounded corners
- Hover: Border turns lime, background lightens
- Cursor: Pointer

**Card States**:
- Default: Dark background, gray border
- Hover: Lighter background, lime border
- Click: Navigate to lottery page

### 4. Status Colors

| Status | Color | Hex |
|--------|-------|-----|
| **Won** | Lime | `#B8FF00` |
| **Lost** | Gray | `text-gray-400` |
| **Pending** | Orange | `text-orange-400` |

### 5. Empty States

**No entries matching filter**:
```
┌────────────────────┐
│  No entries found  │
└────────────────────┘
```

**No entries at all**:
```
You haven't entered any lotteries yet
```

## Mock Data

8 sample entries:

```typescript
[
  { id: 1, lotteryId: 5, date: 'Nov 16, 2025', fee: '$10.00', status: 'won' },
  { id: 2, lotteryId: 4, date: 'Nov 15, 2025', fee: '$10.00', status: 'lost' },
  { id: 3, lotteryId: 3, date: 'Nov 14, 2025', fee: '$15.00', status: 'lost' },
  { id: 4, lotteryId: 2, date: 'Nov 13, 2025', fee: '$10.00', status: 'won' },
  { id: 5, lotteryId: 1, date: 'Nov 12, 2025', fee: '$20.00', status: 'pending' },
  { id: 6, lotteryId: 7, date: 'Nov 11, 2025', fee: '$10.00', status: 'lost' },
  { id: 7, lotteryId: 6, date: 'Nov 10, 2025', fee: '$15.00', status: 'won' },
  { id: 8, lotteryId: 8, date: 'Nov 9, 2025', fee: '$10.00', status: 'lost' },
]
```

### Data Structure

```typescript
interface HistoryEntry {
  id: number          // Unique entry ID
  lotteryId: number   // Lottery round ID
  date: string        // Formatted date
  fee: string         // Entry fee with currency
  status: 'won' | 'lost' | 'pending'
}
```

## Filtering Logic

**Active filtering**:
```typescript
const filteredEntries = mockHistory.filter((entry) => {
  if (filter === 'all') return true
  return entry.status === filter
})
```

**Filter counts** (from mock data):
- All: 8 entries
- Won: 3 entries
- Lost: 4 entries
- Pending: 1 entry

## Navigation

**Click behavior**:
```typescript
const handleCardClick = (lotteryId: number) => {
  router.push(`/lottery/${lotteryId}`)
}
```

**Example**:
- Click "Lottery #5" → Navigate to `/lottery/5`

## Responsive Design

**Desktop & Mobile**:
- Same layout (cards work well on all sizes)
- On mobile: Status moves below info
- Flexible layout using `flex-col md:flex-row`

### Mobile (<768px)
```
┌─────────────────┐
│ Nov 16, 2025    │
│ Lottery #5      │
│ Entry fee: $10  │
│ Won             │
└─────────────────┘
```

### Desktop (≥768px)
```
┌──────────────────────────────┐
│ Nov 16, 2025  | Lottery #5 | Won │
│ Entry fee: $10.00            │
└──────────────────────────────┘
```

## Styling Details

### Colors
- **Background**: Black with gradient
- **Card background**: `#1A1A1A`
- **Card border**: `#333333`
- **Hover border**: `#B8FF00`
- **Text**: White
- **Muted text**: `text-gray-400`

### Typography
- **Heading**: 36px, AEONIK Bold
- **Lottery ID**: 18px (text-lg), AEONIK Bold
- **Date**: 14px (text-sm), AEONIK Regular, gray
- **Fee**: 16px (text-base), AEONIK Regular
- **Status**: 18px (text-lg), AEONIK Bold, color-coded

### Spacing
- **Container**: Max width 1200px, centered
- **Padding**: `px-6 py-8`
- **Button gap**: `gap-4`
- **Card gap**: `space-y-4`
- **Card padding**: `px-6 py-4`

## Usage

### Navigate to History
```typescript
import Link from 'next/link'

<Link href="/history">View History</Link>
```

### Already Linked
From dashboard:
```typescript
<Link href="/history">View History</Link>
```

## Future Enhancements

### 1. Real Data Integration

**Fetch user entries**:
```typescript
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

function useUserHistory(userAddress: string, filter: FilterType) {
  return useQuery({
    queryKey: ['history', userAddress, filter],
    queryFn: async () => {
      let query = supabase
        .from('lottery_entries')
        .select('*')
        .eq('user_address', userAddress)
        .order('created_at', { ascending: false })
      
      if (filter !== 'all') {
        query = query.eq('status', filter)
      }
      
      const { data, error } = await query
      if (error) throw error
      return data
    }
  })
}
```

### 2. Pagination
- Load more button
- Infinite scroll
- Show 10-20 entries at a time

### 3. Date Formatting
- Relative dates: "2 days ago"
- Grouped by month
- Date range filter

### 4. Additional Info
- Winnings amount (for won entries)
- Total participants
- Winner address
- Transaction hash link

### 5. Export Feature
- Export to CSV
- Download history
- Print view

### 6. Search & Sort
- Search by lottery ID
- Sort by date, fee, status
- Filter by date range

### 7. Statistics
- Show summary at top:
  - Total entries: 8
  - Total won: 3
  - Total winnings: $450.00
  - Win rate: 37.5%

## Testing Checklist

### Layout
- [ ] Heading centered and correct size
- [ ] Max width applied (1200px)
- [ ] Padding consistent

### Filter Buttons
- [ ] Four buttons displayed
- [ ] "All" active by default
- [ ] Clicking switches active state
- [ ] Active button has lime background
- [ ] Inactive buttons have gray background
- [ ] Hover effect works

### Entry Cards
- [ ] 8 cards displayed (All filter)
- [ ] Correct number for each filter:
  - Won: 3 cards
  - Lost: 4 cards
  - Pending: 1 card
- [ ] Each card shows: date, lottery ID, fee, status
- [ ] Status colors correct (lime/gray/orange)
- [ ] Cards clickable
- [ ] Hover effect (border turns lime)
- [ ] Cursor changes to pointer

### Navigation
- [ ] Clicking card navigates to lottery page
- [ ] Correct lottery ID in URL
- [ ] Back button returns to history

### Empty States
- [ ] Shows "No entries found" when filter has no results
- [ ] Shows message if no entries at all

### Responsive
- [ ] Desktop: Info and status side-by-side
- [ ] Mobile: Info and status stacked
- [ ] No horizontal scroll
- [ ] Cards readable at all sizes

## Accessibility

- [ ] Semantic HTML
- [ ] Keyboard navigation (cards focusable)
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text for any icons

## Performance

- Static mock data (instant load)
- No API calls yet
- Efficient filtering (client-side)
- Minimal re-renders

## Example: Real Data Integration

```typescript
'use client'

import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useUserHistory } from '@/hooks/useUserHistory'

export default function HistoryPage() {
  const { address } = useWalletConnection()
  const [filter, setFilter] = useState<FilterType>('all')
  
  const { data: entries, isLoading } = useUserHistory(address, filter)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    // ... render with real data
  )
}
```

## Database Schema (Future)

```sql
CREATE TABLE lottery_entries (
  id SERIAL PRIMARY KEY,
  user_address VARCHAR(42) NOT NULL,
  lottery_id INTEGER NOT NULL,
  entry_fee NUMERIC(18, 6) NOT NULL,
  status VARCHAR(20) NOT NULL, -- 'won', 'lost', 'pending'
  winnings NUMERIC(18, 6) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_entries_user ON lottery_entries(user_address);
CREATE INDEX idx_entries_status ON lottery_entries(status);
```

---

✅ **Entry history page complete!** Shows user's lottery entries with filtering, status colors, and clickable navigation.

