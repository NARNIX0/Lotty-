# ✅ USDC Address Mismatch - FIXED!

## The Problem

Your lottery contract was deployed with:
```
USDC Address: 0xD95C5B45032e364392BE0A57b528b06203eb3060
```

But your frontend was using:
```
USDC Address: 0x3600000000000000000000000000000000000000
```

**These don't match!** When you try to join:
1. Frontend approves `0x3600...` ❌
2. Lottery expects `0xD95C...` ❌
3. Transaction fails!

---

## The Fix

Updated `.env.local` to match:

```env
NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
```

---

## Now Do This:

### Step 1: Restart Dev Server

```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

---

### Step 2: Get USDC at Correct Address

You need USDC at the address: `0xD95C5B45032e364392BE0A57b528b06203eb3060`

**Check if it's a contract:**

```javascript
// Browser console (F12)
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: ['0xD95C5B45032e364392BE0A57b528b06203eb3060', 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.result === '0x' || d.result === '0x0') {
    console.log('❌ NOT A CONTRACT - Need to deploy USDC!')
  } else {
    console.log('✅ IS A CONTRACT')
  }
})
```

---

### Step 3A: If It's NOT a Contract

**Deploy MockUSDC** (I created it for you):

```bash
cd contracts
forge build

forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $env:PRIVATE_KEY \
  --broadcast \
  --legacy
```

Then:
1. Copy the deployed address
2. Update `.env.local` with new address
3. Mint USDC to yourself:
   ```bash
   cast send NEW_ADDRESS "faucet(uint256)" 10000000 --rpc-url https://rpc.testnet.arc.network --private-key $env:PRIVATE_KEY
   ```

---

### Step 3B: If It IS a Contract

Check your balance:

```javascript
// Browser console
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0xD95C5B45032e364392BE0A57b528b06203eb3060',
      data: '0x70a08231000000000000000000000000cAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5'
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.error) {
    console.log('❌ Error:', d.error)
  } else {
    const balance = parseInt(d.result, 16) / 1000000
    console.log('💰 USDC Balance:', balance)
  }
})
```

If balance is 0, you need to get USDC at this address (or deploy MockUSDC).

---

### Step 4: Try Join Lottery Again

After restarting server and getting USDC:

1. Refresh browser
2. Go to lottery page
3. Click "Join Now"
4. Should work now! ✅

---

## Summary

- ✅ Fixed frontend to use correct USDC address
- 🔄 Need to restart server
- 💰 Need USDC at address `0xD95C5B45032e364392BE0A57b528b06203eb3060`
- 🎮 Then join lottery should work!

---

**Restart server first, then check if that address is a contract!** 🚀

