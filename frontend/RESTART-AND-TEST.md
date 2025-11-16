# Quick Restart and Test Guide

## You have the correct USDC address: 0x3600000000000000000000000000000000000000

Now let's test with better error logging!

---

## Step 1: Restart Dev Server

```powershell
# Stop server (Ctrl+C)
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

---

## Step 2: Clear Browser

```
Hard reload: Ctrl+Shift+R
```

---

## Step 3: Clear MetaMask

**Option A: Cancel pending**
```
MetaMask → Activity → Cancel any pending transactions
```

**Option B: Reset**
```
MetaMask → Settings → Advanced → Clear activity tab data
```

---

## Step 4: Get USDC from Faucet

According to Arc docs, get testnet USDC from:

**https://faucet.circle.com**
(10 USDC per hour)

Make sure you:
1. Select "Arc Testnet"
2. Enter your wallet address
3. Request 10 USDC
4. Wait for confirmation

---

## Step 5: Verify USDC Balance

**In browser console:**

```javascript
// Check your USDC balance
const yourAddress = 'YOUR_WALLET_ADDRESS' // Replace with your address

fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0x3600000000000000000000000000000000000000',
      data: '0x70a08231000000000000000000000000' + yourAddress.slice(2)
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  const balance = parseInt(d.result, 16) / 1000000
  console.log('Your USDC Balance:', balance, 'USDC')
})
```

**Should show > 0 USDC**

---

## Step 6: Try Join Lottery

```
1. Go to lottery page
2. Click "Join Now"
3. MetaMask popup appears
4. Click "Confirm"
```

**Now with enhanced error logging:**
- If it fails, check browser console (F12)
- Look for red "Approve error FULL:" message
- Copy the full error and send it to me
- The error will tell us exactly what's wrong

---

## Expected Success Flow

```
✅ Transaction 1: Approve USDC
   Network: Arc Testnet
   To: 0x3600000000000000000000000000000000000000
   Function: approve
   Status: Success

✅ Transaction 2: Enter Lottery
   Network: Arc Testnet  
   To: 0x60B4E3e62A1E56FfC890d03742e158cf002e3047
   Function: enterLottery
   Status: Success

✅ You've entered the lottery!
```

---

## If Error Occurs

The new error logging will show:
- Full error object
- Error name, message, cause
- Revert reason (if any)

**Copy the console output and send it to me!**

---

**Start with Step 1 (restart server), then try join lottery and tell me what happens!** 🚀

