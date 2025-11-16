# Testing Guide - Lottery Smart Contract Integration

## Prerequisites

Before testing, ensure:

1. ✅ Contract deployed to Arc Testnet: `0x60B4E3e62A1E56FfC890d03742e158cf002e3047`
2. ✅ `.env.local` configured with correct addresses
3. ✅ MetaMask installed and configured for Arc Testnet
4. ✅ Test wallet has Arc ETH for gas
5. ✅ Test wallet has USDC for entry fees

## Setup Arc Testnet in MetaMask

**Network Details**:
- **Network Name**: Arc Testnet
- **RPC URL**: `https://rpc.testnet.arc.network`
- **Chain ID**: `5042002`
- **Currency Symbol**: ETH
- **Block Explorer**: `https://testnet.arcscan.io`

## Step-by-Step Testing

### 1. Create a Test Lottery

**Using Cast (from contract owner)**:

```bash
# Navigate to contracts directory
cd contracts

# Create a lottery: $10 entry, 7 days duration
cast send $CONTRACT_ADDRESS \
  "createRound(uint256,uint256)" \
  10000000 7 \
  --rpc-url $ARC_TESTNET_RPC_URL \
  --private-key $PRIVATE_KEY

# Note the roundId from the transaction logs (likely 1 for first round)
```

**Or use Foundry script**:

```bash
forge script script/CreateTestRound.s.sol --rpc-url $ARC_TESTNET_RPC_URL --private-key $PRIVATE_KEY --broadcast
```

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

### 3. Test Lottery Page

**Navigate to**: `http://localhost:3000/lottery/1`

**Expected Behavior**:

#### Initial Load
- [ ] Shows "Loading lottery..." briefly
- [ ] Displays lottery data from contract:
  - Status badge: "Active" (lime background)
  - Total Pool: `$0.00`
  - Entry fee: `$10.00`
  - Countdown timer showing correct time remaining
  - `0 people joined`
  - Your odds: "Be the first!"
  - Button: "Join Now" (enabled, lime gradient)

#### Connect Wallet
- [ ] Click "Connect Wallet" on home page
- [ ] MetaMask opens
- [ ] Select account with USDC
- [ ] Wallet connects successfully
- [ ] Redirects to `/lottery/1` if you paste URL

#### Join Lottery Flow

**Step 1: Click "Join Now"**
- [ ] Button changes to "Approving USDC..."
- [ ] Button becomes disabled
- [ ] MetaMask opens with approval request

**Step 2: Approve USDC**
- [ ] MetaMask shows:
  - Function: `approve`
  - Spender: Lottery contract
  - Amount: Entry fee (10 USDC)
- [ ] Click "Confirm"
- [ ] Wait for transaction confirmation
- [ ] Button changes to "Entering lottery..."

**Step 3: Enter Lottery**
- [ ] MetaMask opens again with transaction request
- [ ] MetaMask shows:
  - Function: `enterLottery`
  - Gas estimate
- [ ] Click "Confirm"
- [ ] Wait for transaction confirmation

**Step 4: Verify Entry**
- [ ] Button changes to "You've entered"
- [ ] Button becomes disabled (gray)
- [ ] Page refetches data (within 5 seconds):
  - Total Pool updates to `$10.00`
  - Participant count updates to `1 people joined`
  - Your odds updates to `1 in 1 chance`

### 4. Test Multiple Entries

**Switch to another wallet**:
1. In MetaMask, switch to a different account
2. Ensure it has USDC and ETH
3. Refresh the page
4. Click "Join Now"
5. Complete the flow

**Expected**:
- [ ] Second wallet can also join
- [ ] Total pool increases to `$20.00`
- [ ] Participant count: `2 people joined`
- [ ] Odds: `1 in 2 chance`

### 5. Test Already Entered

**With first wallet**:
1. Switch back to first wallet in MetaMask
2. Refresh the page

**Expected**:
- [ ] Button shows "You've entered"
- [ ] Button is disabled (gray)
- [ ] Cannot join again

### 6. Test Auto-Refresh

**Leave page open**:
1. Wait 5 seconds
2. Check network tab (F12 → Network)

**Expected**:
- [ ] Contract call to `getRound` every 5 seconds
- [ ] Data updates automatically if someone else joins

### 7. Test Countdown Timer

**Check timer updates**:
1. Watch the countdown timer
2. Should update every second
3. Format: "X days, X hours, X minutes, X seconds"

**Expected**:
- [ ] Timer updates every second
- [ ] Shows accurate time remaining
- [ ] Format changes based on time left:
  - If < 1 day: "X hours, X minutes, X seconds"
  - If < 1 hour: "X minutes, X seconds"
  - If < 1 minute: "X seconds"
  - If ended: "Lottery ended"

### 8. Test Ended Lottery

**Wait for lottery to end or complete it manually**:

```bash
cast send $CONTRACT_ADDRESS "completeRound(uint256)" 1 \
  --rpc-url $ARC_TESTNET_RPC_URL \
  --private-key $PRIVATE_KEY
```

**Expected**:
- [ ] Status badge: "Closed" (gray background)
- [ ] Button: "Lottery ended" (disabled, gray)
- [ ] Countdown: "Lottery ended"
- [ ] Winner address populated (if completed)

### 9. Test Invalid Lottery ID

**Navigate to**: `http://localhost:3000/lottery/999`

**Expected**:
- [ ] Shows "Loading lottery..."
- [ ] Either loads data if round 999 exists
- [ ] Or shows error if round doesn't exist

### 10. Test Without Wallet

**Disconnect wallet**:
1. Disconnect MetaMask
2. Refresh lottery page

**Expected**:
- [ ] Page loads lottery data
- [ ] Button shows "Join Now" but clicking does nothing
- [ ] Or implement: Redirect to home page

## Verification Checklist

### Data Accuracy
- [ ] Entry fee matches contract
- [ ] Total pool matches contract
- [ ] Participant count matches contract
- [ ] End time matches contract
- [ ] Countdown accurate
- [ ] "Has entered" status correct

### User Flow
- [ ] Can connect wallet
- [ ] Can approve USDC
- [ ] Can enter lottery
- [ ] Can see transaction hashes
- [ ] Page updates after entry
- [ ] Cannot enter twice
- [ ] Button states correct

### Error Handling
- [ ] Shows loading state
- [ ] Handles rejected transactions
- [ ] Handles network errors
- [ ] Displays error messages
- [ ] Recovers from errors

### Performance
- [ ] Loads quickly
- [ ] Auto-refreshes smoothly
- [ ] No memory leaks
- [ ] Countdown doesn't lag

## Common Issues & Solutions

### Issue: "Loading lottery..." indefinitely
**Cause**: Contract call failing or wrong network

**Solution**:
1. Check MetaMask is on Arc Testnet
2. Check contract address in `.env.local`
3. Verify RPC URL is correct
4. Check browser console for errors

### Issue: MetaMask doesn't open
**Cause**: Wallet not connected or wrong chain

**Solution**:
1. Connect wallet first
2. Switch to Arc Testnet in MetaMask
3. Refresh page

### Issue: "Insufficient funds" error
**Cause**: Not enough USDC or ETH

**Solution**:
1. Get USDC from faucet or owner
2. Get Arc ETH for gas
3. Check balances in MetaMask

### Issue: Transaction fails
**Cause**: Various reasons

**Solution**:
1. Check gas limit
2. Verify USDC balance
3. Ensure not already entered
4. Check lottery is still active
5. View transaction on Arc Testnet explorer

### Issue: Data doesn't update
**Cause**: Auto-refresh not working

**Solution**:
1. Refresh page manually
2. Check browser console
3. Verify contract address
4. Check RPC endpoint

## Testing on Production

When deploying to production:

1. **Update `.env.local`** with mainnet addresses
2. **Test with small amounts** first
3. **Verify contract** on block explorer
4. **Monitor gas prices**
5. **Test all flows** again on mainnet

## Automated Testing

For automated tests, see:
- `frontend/tests/lottery.spec.ts` (if created)
- Use Hardhat or Foundry for contract tests
- Use Playwright for E2E frontend tests

## Performance Benchmarks

Expected times:
- **Page load**: < 2 seconds
- **Contract call**: < 1 second
- **Approval transaction**: ~10-30 seconds
- **Enter transaction**: ~10-30 seconds
- **Auto-refresh**: Every 5 seconds
- **Countdown update**: Every 1 second

## Security Checklist

Before production:
- [ ] Contract audited
- [ ] Frontend reviewed
- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] Error messages don't leak info
- [ ] Input validation in place

---

✅ **Testing complete!** If all checks pass, the smart contract integration is working correctly.

