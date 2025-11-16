# Settings Page

## Overview

Simple settings page with three sections: Wallet, Profile, and Preferences.

## Location

**File**: `src/app/settings/page.tsx`

**URL**: `/settings`

## Layout

```
┌────────────────────────────┐
│        Settings            │
│                            │
│  ┌──────────────────────┐ │
│  │ Wallet               │ │
│  │ Connected: 0x123...  │ │
│  │ [Change] [Disconnect]│ │
│  └──────────────────────┘ │
│                            │
│  ┌──────────────────────┐ │
│  │ Profile              │ │
│  │ Username: [____]     │ │
│  │ [Save]               │ │
│  └──────────────────────┘ │
│                            │
│  ┌──────────────────────┐ │
│  │ Preferences          │ │
│  │ ☑ Dark Mode          │ │
│  └──────────────────────┘ │
└────────────────────────────┘
```

## Features

### Heading
- **Text**: "Settings"
- **Size**: 36px (text-4xl)
- **Font**: AEONIK Bold
- **Alignment**: Centered

### Section Cards

All sections share:
- Background: `#1A1A1A`
- Border: 1px `#333333`
- Padding: `px-6 py-6`
- Rounded corners: `rounded-lg`
- Gap between sections: `gap-6`

## Section 1: Wallet

### Content
**Heading**: "Wallet" (20px, AEONIK Bold)

**If connected**:
- Display: "Connected: 0x123...abc" (lime color for address)
- Two buttons side-by-side:
  - "Change Wallet"
  - "Disconnect"

**If not connected**:
- Display: "No wallet connected" (gray text)

### Functionality

**Change Wallet**:
```typescript
const handleChangeWallet = () => {
  window.ethereum.request({ 
    method: 'wallet_requestPermissions', 
    params: [{ eth_accounts: {} }] 
  })
}
```
- Opens MetaMask permission modal
- Allows user to switch accounts
- Page updates automatically when account changes

**Disconnect**:
```typescript
const handleDisconnect = () => {
  disconnect()
}
```
- Calls Wagmi `disconnect()`
- Clears wallet connection
- User redirected to home (if protected)

## Section 2: Profile

### Content
**Heading**: "Profile" (20px, AEONIK Bold)

**Username Input**:
- Label: "Username" (small, gray)
- Input field:
  - Background: Black
  - Border: `#333333`
  - Focus border: Lime (`#B8FF00`)
  - Padding: `px-4 py-2`
  - Rounded: `rounded-md`
  - Placeholder: "Enter your username"
- Full width on mobile, min 300px on desktop

**Save Button**:
- Lime gradient background
- Text: "Save"
- Currently shows alert (mock functionality)

### Functionality

**Current (Mock)**:
```typescript
const handleSaveProfile = () => {
  alert('Profile saved! (Mock functionality)')
}
```

**Future (Real)**:
```typescript
const handleSaveProfile = async () => {
  await supabase
    .from('user_profiles')
    .upsert({ 
      address: address,
      username: username 
    })
  
  toast.success('Profile saved!')
}
```

## Section 3: Preferences

### Content
**Heading**: "Preferences" (20px, AEONIK Bold)

**Dark Mode Toggle**:
- Checkbox input (styled)
- Label: "Dark Mode"
- Default: Checked (true)
- Currently just UI (doesn't change theme)

### Styling

**Checkbox**:
- Size: `h-5 w-5`
- Border: `#333333`
- Background: Black
- Checked color: Lime (`#B8FF00`)
- Cursor: Pointer

**Label**:
- Clickable (toggles checkbox)
- White text
- AEONIK Regular

### Functionality

**Current (Mock)**:
```typescript
const [darkMode, setDarkMode] = useState(true)
```
- Just updates local state
- Doesn't apply theme changes

**Future (Real)**:
```typescript
const handleDarkModeToggle = (checked: boolean) => {
  setDarkMode(checked)
  
  // Save to localStorage
  localStorage.setItem('darkMode', checked.toString())
  
  // Apply theme
  if (checked) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
```

## Styling Details

### Colors
- **Background**: Black with gradient
- **Section background**: `#1A1A1A`
- **Borders**: `#333333`
- **Text**: White
- **Accent**: Lime (`#B8FF00`)
- **Muted**: Gray (`text-gray-400`)

### Typography
- **Page heading**: 36px, AEONIK Bold
- **Section headings**: 20px (text-xl), AEONIK Bold
- **Body text**: 16px (text-base), AEONIK Regular
- **Labels**: 14px (text-sm), AEONIK Regular
- **Buttons**: AEONIK Bold

### Buttons
All buttons use lime gradient:
- Background: `from-[#D4FF5E] to-[#B8FF00]`
- Hover: `from-[#E8FFB7] to-[#D4FF5E]`
- Text: Black
- Padding: `px-6 py-3`
- Font: AEONIK Bold
- Shadow on hover

### Inputs
- Background: Black
- Border: `#333333`
- Focus border: Lime (`#B8FF00`)
- Text: White
- Font: AEONIK Regular
- Padding: `px-4 py-2`

## Responsive Design

### Desktop (≥768px)
- Username input: Min width 300px
- Buttons: Side-by-side with gap

### Mobile (<768px)
- Username input: Full width
- Buttons: May wrap to new line
- All elements stacked

## State Management

### Current State
```typescript
const { address, isConnected, disconnect } = useWalletConnection()
const [username, setUsername] = useState('')
const [darkMode, setDarkMode] = useState(true)
```

### Future: Persist User Data
```typescript
// Fetch user profile on load
useEffect(() => {
  if (address) {
    fetchUserProfile(address).then(profile => {
      setUsername(profile.username || '')
      setDarkMode(profile.darkMode ?? true)
    })
  }
}, [address])
```

## Usage

### Navigate to Settings
```typescript
import Link from 'next/link'

<Link href="/settings">Settings</Link>
```

### Already Linked
From dashboard:
```typescript
<Link href="/settings">Settings</Link>
```

## Future Enhancements

### 1. User Profile Integration
- Save username to database (Supabase)
- Display avatar upload
- Email notifications toggle
- Bio/description field

### 2. Additional Preferences
- **Notifications**:
  - Email notifications
  - Browser notifications
  - Push notifications
- **Language**:
  - Select preferred language
  - i18n support
- **Currency Display**:
  - USD, EUR, etc.
  - Crypto vs fiat preference

### 3. Security Settings
- **Two-Factor Authentication**:
  - Enable/disable 2FA
  - QR code setup
- **Session Management**:
  - View active sessions
  - Revoke sessions
- **Transaction Limits**:
  - Set max entry fee
  - Spending limits

### 4. Privacy Settings
- **Data Sharing**:
  - Show/hide on leaderboard
  - Public/private profile
  - Analytics opt-out
- **Wallet Visibility**:
  - Display ENS name instead of address
  - Hide address from public

### 5. Theme Customization
- **Accent Color**:
  - Choose from preset colors
  - Custom color picker
- **Font Size**:
  - Small, Medium, Large
  - Accessibility options
- **Animation**:
  - Enable/disable animations
  - Reduced motion

### 6. Account Management
- **Connected Apps**:
  - View authorized dApps
  - Revoke permissions
- **Data Export**:
  - Download all data
  - GDPR compliance
- **Delete Account**:
  - Permanent deletion
  - Confirmation modal

## Example: Database Integration

### Supabase Schema
```sql
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  address VARCHAR(42) UNIQUE NOT NULL,
  username VARCHAR(50),
  dark_mode BOOLEAN DEFAULT true,
  email VARCHAR(255),
  notifications_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_address ON user_profiles(address);
```

### Hooks
```typescript
// hooks/useUserProfile.ts
export function useUserProfile(address?: string) {
  return useQuery({
    queryKey: ['profile', address],
    queryFn: async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('address', address)
        .single()
      
      return data
    },
    enabled: !!address
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ address, updates }) => {
      const { data } = await supabase
        .from('user_profiles')
        .upsert({ address, ...updates })
        .select()
        .single()
      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    }
  })
}
```

## Testing Checklist

### Layout
- [ ] Heading centered
- [ ] Max width 1200px applied
- [ ] Three sections displayed
- [ ] Gap between sections (gap-6)
- [ ] All sections have correct styling

### Wallet Section
- [ ] Shows "Connected" with address if wallet connected
- [ ] Address shortened correctly (0x123...abc)
- [ ] Address in lime color
- [ ] "Change Wallet" button visible
- [ ] "Disconnect" button visible
- [ ] Buttons have lime gradient
- [ ] Shows "No wallet connected" if disconnected

### Profile Section
- [ ] "Profile" heading displayed
- [ ] Username input field visible
- [ ] Input has correct styling (black bg, border)
- [ ] Focus border turns lime
- [ ] "Save" button visible
- [ ] Button shows alert on click (mock)

### Preferences Section
- [ ] "Preferences" heading displayed
- [ ] Dark Mode checkbox visible
- [ ] Checkbox checked by default
- [ ] Clicking checkbox toggles state
- [ ] Label clickable

### Functionality
- [ ] Change Wallet opens MetaMask
- [ ] Disconnect works (clears connection)
- [ ] Username input updates state
- [ ] Save button shows alert
- [ ] Dark Mode checkbox toggles

### Responsive
- [ ] Desktop: Username input min 300px
- [ ] Mobile: Username input full width
- [ ] Buttons wrap on small screens
- [ ] No horizontal scroll

### Styling
- [ ] All sections have consistent styling
- [ ] Buttons have hover effect
- [ ] Input has focus effect
- [ ] Colors match design system

## Accessibility

- [ ] Semantic HTML (labels for inputs)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Labels associated with inputs
- [ ] Buttons have descriptive text

## Performance

- Minimal state (3 pieces)
- No API calls (mock data)
- Fast rendering
- No unnecessary re-renders

---

✅ **Settings page complete!** Three sections for Wallet, Profile, and Preferences with clean styling and mock functionality.

