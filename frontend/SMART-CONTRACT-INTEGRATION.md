# Smart Contract Integration

## Overview

The lottery page is now connected to the **FriendlyLottery** smart contract deployed on **Arc Testnet**.

## Files Created

### 1. Contract Configuration
**Location**: `src/lib/contracts/FriendlyLottery.ts`

```typescript
export const FRIENDLY_LOTTERY_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
export const FRIENDLY_LOTTERY_ABI = [...]
export function formatUSDC(amount: bigint): string
export function parseUSDC(amount: string): bigint
```

**Features**:
- Exports contract address from env
- Exports minimal ABI (only functions we use)
- Helper functions to convert USDC amounts

**Functions**:
- `formatUSDC(10000000n)` → `"10.00"`
- `parseUSDC("10.00")` → `10000000n`

### 2. USDC Contract
**Location**: `src/lib/contracts/USDC.ts`

```typescript
export const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS
export const ERC20_ABI = [...]
```

**Features**:
- Exports USDC address from env
- Exports ERC20 ABI for `approve`, `allowance`, `balanceOf`

### 3. Smart Contract Hooks
**Location**: `src/hooks/useSmartContract.ts`

Three custom hooks for interacting with the contract:

#### `useGetLottery(roundId)`
Reads lottery data from the contract.

```typescript
const { lottery, isLoading, error } = useGetLottery(1)
```

**Returns**:
```typescript
{
  lottery: {
    roundId: bigint
    entryFee: bigint
    startTime: bigint
    endTime: bigint
    participants: address[]
    totalPool: bigint
    winner: address
    completed: boolean
  } | undefined
  isLoading: boolean
  error: Error | null
}
```

**Features**:
- Auto-refetches every 5 seconds
- Uses Wagmi's `useReadContract`

#### `useHasEntered(roundId, address)`
Checks if a user has entered a specific lottery.

```typescript
const { hasEntered, isLoading } = useHasEntered(1, userAddress)
```

**Returns**:
```typescript
{
  hasEntered: boolean
  isLoading: boolean
}
```

#### `useEnterLottery(roundId)`
Handles the full flow of entering a lottery:
1. Approves USDC spending
2. Calls `enterLottery()` on the contract

```typescript
const { mutate, isPending, error, txHash, stage } = useEnterLottery(1)

// To enter:
mutate(entryFeeInWei)
```

**Returns**:
```typescript
{
  mutate: (entryFee: bigint) => void
  isPending: boolean
  error: Error | null
  txHash: `0x${string}` | undefined
  stage: 'idle' | 'approving' | 'entering'
}
```

**Flow**:
1. User clicks "Join Now"
2. Button shows "Approving USDC..."
3. MetaMask pops up for USDC approval
4. User approves → Button shows "Entering lottery..."
5. MetaMask pops up for lottery entry
6. User confirms → Transaction submitted
7. Wait for confirmation
8. Page refetches lottery data (shows updated participant count)

## Updated Lottery Page

**Location**: `src/app/lottery/[id]/page.tsx`

### Before (Mock Data)
```typescript
const entryFee = '10.00'
const totalPool = '50.00'
const endTime = Math.floor(Date.now() / 1000) + 3600
const participants = 5
const isActive = true
const hasEntered = false
```

### After (Real Contract Data)
```typescript
const { lottery, isLoading } = useGetLottery(roundId)
const { hasEntered } = useHasEntered(roundId, address)
const { mutate: enterLottery, isPending, stage } = useEnterLottery(roundId)

const entryFee = formatUSDC(lottery.entryFee)
const totalPool = formatUSDC(lottery.totalPool)
const endTime = Number(lottery.endTime)
const participants = lottery.participants.length
const isActive = !lottery.completed && endTime > Math.floor(Date.now() / 1000)
```

### Button States

| State | Text | Disabled |
|-------|------|----------|
| **Ready** | "Join Now" | No |
| **Approving** | "Approving USDC..." | Yes |
| **Entering** | "Entering lottery..." | Yes |
| **Entered** | "You've entered" | Yes |
| **Ended** | "Lottery ended" | Yes |

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x60B4E3e62A1E56FfC890d03742e158cf002e3047
NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
```

## Testing the Integration

### 1. Create a Test Lottery
Use the contract owner to create a round:

```solidity
createRound(10_000_000, 7) // $10 entry, 7 days
```

### 2. Visit the Page
Navigate to `/lottery/1` (for round ID 1)

### 3. Check Data Loading
- Page should show "Loading lottery..." briefly
- Then displays real contract data:
  - Entry fee: `$10.00`
  - Total pool: `$0.00` (if no entries yet)
  - Countdown timer with real end time
  - Participant count: `0 people joined`

### 4. Enter the Lottery
1. Click "Join Now"
2. Button changes to "Approving USDC..."
3. MetaMask pops up → Approve USDC spending
4. Button changes to "Entering lottery..."
5. MetaMask pops up → Confirm lottery entry
6. Wait for confirmation
7. Page updates:
   - Total pool increases by entry fee
   - Participant count increases by 1
   - Button shows "You've entered"

### 5. Verify on Chain
- Check transaction on Arc Testnet explorer
- Verify participant added to contract
- Check USDC balance transferred

## Data Flow Diagram

```
User Action → Hook → Wagmi → Smart Contract → Blockchain
                ↓
           Component updates
                ↓
           UI reflects change
```

### Read Flow (useGetLottery)
```
Component
  → useGetLottery(1)
    → useReadContract (Wagmi)
      → contract.getRound(1)
        → Returns lottery data
  → Auto-refetch every 5 seconds
  → Component re-renders with new data
```

### Write Flow (useEnterLottery)
```
User clicks "Join Now"
  → mutate(entryFee)
    → approve(CONTRACT, entryFee)
      → MetaMask approval
      → Wait for confirmation
    → enterLottery(roundId)
      → MetaMask transaction
      → Wait for confirmation
  → useGetLottery refetches
  → Component shows updated data
```

## Error Handling

### Network Errors
```typescript
const { lottery, isLoading, error } = useGetLottery(1)

if (error) {
  // Display error message
  return <p>Error loading lottery: {error.message}</p>
}
```

### Transaction Errors
```typescript
const { mutate, error } = useEnterLottery(1)

if (error) {
  // User rejected or transaction failed
  alert(`Failed to enter: ${error.message}`)
}
```

### Loading States
```typescript
if (isLoading || !lottery) {
  return <p>Loading lottery...</p>
}
```

## Wagmi Hooks Used

### `useReadContract`
- Reads data from smart contract
- Caches results
- Auto-refetches on block changes

### `useWriteContract`
- Writes to smart contract (transactions)
- Returns transaction hash
- Handles pending/error states

### `useWaitForTransactionReceipt`
- Waits for transaction confirmation
- Returns success/failure
- Used for chaining transactions (approve → enter)

## Contract Functions Called

### Read Functions
1. **`getRound(uint256)`**
   - Returns full lottery round data
   - Called on page load
   - Refetched every 5 seconds

2. **`hasParticipantEntered(uint256, address)`**
   - Checks if user has entered
   - Used to disable "Join" button
   - Updates after entry

### Write Functions
1. **`approve(address, uint256)`** (USDC contract)
   - Approves contract to spend USDC
   - Required before entering

2. **`enterLottery(uint256)`**
   - Enters the lottery
   - Transfers USDC from user
   - Adds user to participants

## Gas Optimization

**Two-step process** (approve + enter):
- Total: ~150,000 gas
- Approve: ~45,000 gas
- Enter: ~100,000 gas

**Why not `permit`?**
- Not all USDC implementations support it
- `approve` is more compatible

## Security Considerations

1. **Contract Address**
   - Read from environment variable
   - Verified at deployment

2. **USDC Address**
   - Read from environment variable
   - Arc Testnet official USDC

3. **Amount Handling**
   - All amounts in wei (bigint)
   - Formatted only for display
   - No floating point math

4. **User Validation**
   - Wallet must be connected
   - User must approve USDC
   - Contract validates entry requirements

## Next Steps

To connect more pages:

1. **Dashboard**: Show user's lottery history
2. **Leaderboard**: Query past winners
3. **Create Page**: Call `createRound()`
4. **Admin Panel**: Complete rounds, set fees

## Useful Commands

**Create lottery** (from contract owner):
```bash
cast send $CONTRACT_ADDRESS "createRound(uint256,uint256)" 10000000 7 \
  --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

**Check round data**:
```bash
cast call $CONTRACT_ADDRESS "getRound(uint256)" 1 --rpc-url $RPC_URL
```

**Check if entered**:
```bash
cast call $CONTRACT_ADDRESS "hasParticipantEntered(uint256,address)" 1 $USER_ADDRESS \
  --rpc-url $RPC_URL
```

---

✅ **Smart contract integration complete!** The lottery page now reads real data from Arc Testnet and allows users to join lotteries with USDC.

