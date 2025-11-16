# Testing New USDC Address

## Step-by-Step Testing Guide

### Step 1: Restart Dev Server ⚠️ **REQUIRED**

Environment variables only load when server starts!

```powershell
# Stop server (Ctrl+C)
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

Wait for "Ready" message.

---

### Step 2: Clear MetaMask Pending Transactions

**Option A: Cancel Pending Transaction**
```
1. Open MetaMask
2. Click "Activity" tab
3. Find any "Pending" transactions
4. Click the transaction
5. Click "Cancel" or "Speed up" then cancel
6. Confirm
```

**Option B: Reset Activity (Nuclear Option)**
```
1. MetaMask → Settings
2. Advanced
3. Scroll down to "Clear activity tab data"
4. Click "Clear"
5. Refresh browser
```

---

### Step 3: Clear Browser Cache

```
1. Press Ctrl+Shift+R (hard reload)
Or
2. Press Ctrl+Shift+Delete
3. Clear "Cached images and files"
4. Clear
```

---

### Step 4: Verify New Address Loaded

**In browser console (F12), run:**

```javascript
// Check what address is loaded
console.log('USDC Address:', process.env.NEXT_PUBLIC_USDC_ADDRESS)
```

**Should show your NEW address** (not the old one!)

**If it still shows old address** → Server not restarted properly

---

### Step 5: Check If New Address Is A Contract

**In browser console, run:**

```javascript
// Check if it's a real contract
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: [process.env.NEXT_PUBLIC_USDC_ADDRESS, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.result === '0x' || d.result === '0x0') {
    console.log('❌ NOT A CONTRACT')
  } else {
    console.log('✅ IS A CONTRACT - Good to go!')
  }
})
```

**Should say: "IS A CONTRACT"** ✅

---

### Step 6: Check Your USDC Balance

**In browser console:**

```javascript
// Check your USDC balance
const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS
const yourAddress = 'YOUR_WALLET_ADDRESS_HERE' // Replace with your address

fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: usdcAddress,
      data: '0x70a08231000000000000000000000000' + yourAddress.slice(2)
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  const balance = parseInt(d.result, 16) / 1000000 // Convert from 6 decimals
  console.log('Your USDC Balance:', balance, 'USDC')
  if (balance === 0) {
    console.log('⚠️ You have 0 USDC - need to get some!')
  } else {
    console.log('✅ You have USDC!')
  }
})
```

---

### Step 7: Try Join Lottery

```
1. Go to lottery page
2. Click "Join Now"
3. MetaMask should popup
4. Check the transaction details:
   - Network: Arc Testnet ✅
   - To: USDC Contract (your new address) ✅
   - Function: approve ✅
5. Approve it
6. Wait for confirmation
7. Second transaction should appear (enterLottery)
8. Approve that too
```

---

## Expected Flow

### Transaction 1: Approve USDC
```
Network: Arc Testnet
To: 0xYourNewUSDCAddress
Function: approve
Spender: Lottery Contract
Amount: Entry fee
```

### Transaction 2: Enter Lottery
```
Network: Arc Testnet
To: Lottery Contract
Function: enterLottery
```

---

## Common Issues

### Issue 1: Shows Old USDC Address
**Cause**: Server not restarted

**Fix**: Stop server, delete .next folder, restart

---

### Issue 2: "Not a contract" error
**Cause**: Wrong USDC address for Arc Testnet

**Fix**: 
1. Check Arc Testnet docs for correct address
2. Or check block explorer
3. Update .env.local
4. Restart server

---

### Issue 3: 0 USDC Balance
**Cause**: No USDC tokens

**Fix**:
- Find Arc Testnet USDC faucet
- Or mint test tokens
- Or use different test token

---

### Issue 4: Transaction Stuck
**Cause**: Pending transaction from before

**Fix**: Clear MetaMask activity (see Step 2)

---

## Quick Checklist

- [ ] Updated .env.local with new USDC address
- [ ] Stopped dev server
- [ ] Deleted .next folder
- [ ] Restarted dev server
- [ ] Cleared MetaMask pending transactions
- [ ] Cleared browser cache
- [ ] Verified new address in console
- [ ] Checked if address is a contract
- [ ] Checked USDC balance
- [ ] Tried join button

---

## Success Indicators

✅ Server shows new address when you log it  
✅ Address check says "IS A CONTRACT"  
✅ You have USDC balance > 0  
✅ MetaMask popup appears  
✅ Transaction shows Arc Testnet  
✅ No "not a contract" error  
✅ Approval transaction succeeds  
✅ Enter lottery transaction succeeds  

---

**Start with Step 1 (restart server) - that's the most important!** 🚀

