# 🐛 Debug: Join Button Not Working

## Quick Diagnostic Steps

### Step 1: Open Browser Console (F12)

Press `F12` and go to the Console tab.

---

### Step 2: Click "Join Now" Button

You should see console logs like:

```
Join button clicked!
isPending: false
isActive: true
hasEntered: false
entryFee: 10000000n  (or some bigint value)
Calling enterLottery with fee: 10000000n
useEnterLottery mutate called with: 10000000n
USDC_ADDRESS: 0xD95C5B45032e364392BE0A57b528b06203eb3060
LOTTERY_ADDRESS: 0x60B4E3e62A1E56FfC890d03742e158cf002e3047
Approve transaction initiated
```

---

### Step 3: Check for Errors

**If you see RED errors**, tell me what they say. Common errors:

#### Error 1: "USDC_ADDRESS is undefined"
**Problem**: `.env.local` not loaded

**Fix**:
```powershell
cd frontend
# Make sure .env.local exists and has:
# NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
# NEXT_PUBLIC_CONTRACT_ADDRESS=0x60B4E3e62A1E56FfC890d03742e158cf002e3047

# Restart server
npm run dev
```

---

#### Error 2: "Button disabled - conditions not met"
**Problem**: One of the conditions is false

**Check which one**:
- `isPending: true` → Wait for previous transaction
- `isActive: false` → Lottery ended
- `hasEntered: true` → Already entered

---

#### Error 3: No console logs at all
**Problem**: Button click not firing

**Fix**: Check if button is disabled in UI

---

#### Error 4: "User rejected the request"
**Problem**: MetaMask popup appeared but you rejected

**Fix**: Click the button again and approve

---

#### Error 5: "Chain mismatch" or "Wrong network"
**Problem**: MetaMask on wrong network

**Fix**: Switch MetaMask to Arc Testnet manually

---

### Step 4: Verify Environment Variables

```powershell
# Check if .env.local exists
cd frontend
cat .env.local
```

**Should contain**:
```env
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_CONTRACT_ADDRESS=0x60B4E3e62A1E56FfC890d03742e158cf002e3047
NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
```

---

### Step 5: Check MetaMask

**Open MetaMask and verify**:
1. Network: Should show "Arc Testnet" (top left)
2. Balance: Should have Arc Testnet ETH (for gas)
3. USDC: Import token with address `0xD95C5B45032e364392BE0A57b528b06203eb3060`

---

## Common Fixes

### Fix 1: Restart Everything

```powershell
# Stop server (Ctrl+C)
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

Then:
1. Clear browser cache (Ctrl+Shift+R)
2. Reconnect wallet
3. Try again

---

### Fix 2: Check Wallet Connection

```javascript
// In browser console (F12)
window.ethereum.request({ method: 'eth_accounts' })

// Should return: ['0xYourAddress...']
// If returns: [] → Wallet not connected
```

---

### Fix 3: Check Network

```javascript
// In browser console
window.ethereum.request({ method: 'eth_chainId' })

// Should return: "0x4cf452" (Arc Testnet)
// If returns: "0x1" → On Ethereum (WRONG!)
```

---

### Fix 4: Manually Switch Network

```javascript
// In browser console
window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x4cf452' }]
})
```

---

## What to Tell Me

After clicking the join button and checking console:

1. **What console logs do you see?** (copy/paste)
2. **Any red errors?** (copy/paste)
3. **MetaMask network showing?** (Arc Testnet or Ethereum?)
4. **Does MetaMask popup appear at all?** (Yes/No)
5. **What does the button say?** (Join Now, Approving, Already entered, etc.)

---

## Most Likely Issues

### Issue 1: .env.local not loaded
**Symptom**: `USDC_ADDRESS is undefined`  
**Fix**: Restart dev server

### Issue 2: Wrong network
**Symptom**: No MetaMask popup  
**Fix**: Switch to Arc Testnet in MetaMask

### Issue 3: Already entered
**Symptom**: Button says "You've entered"  
**Fix**: This is correct! You've already joined

### Issue 4: Lottery ended
**Symptom**: Button says "Lottery ended"  
**Fix**: This lottery is closed, try a different one

---

## Next Steps

1. Open browser console (F12)
2. Click "Join Now"
3. Copy all console output
4. Tell me what you see
5. I'll fix it based on the error!

🔍

