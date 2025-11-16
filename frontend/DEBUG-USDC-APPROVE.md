# Debug USDC Approve Error

## The Problem

"Internal JSON-RPC error" when approving USDC usually means:
1. You don't have USDC balance
2. The USDC address isn't a real contract
3. The USDC contract doesn't have standard ERC20 approve function

---

## Quick Checks

### Check 1: Do You Have USDC?

**In browser console (F12), run:**

```javascript
// Check your USDC balance
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0x3600000000000000000000000000000000000000',
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
    console.log('💰 Your USDC Balance:', balance, 'USDC')
    console.log('📝 Entry fee needed: 1 USDC')
    if (balance === 0) {
      console.log('❌ You have 0 USDC!')
    } else if (balance < 1) {
      console.log('⚠️ Not enough USDC!')
    } else {
      console.log('✅ You have enough USDC')
    }
  }
})
```

---

### Check 2: Is USDC Address a Contract?

```javascript
// Check if it's a real contract
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: ['0x3600000000000000000000000000000000000000', 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.result === '0x' || d.result === '0x0') {
    console.log('❌ NOT A CONTRACT - This address has no code!')
    console.log('This means the USDC address is wrong or not deployed')
  } else {
    console.log('✅ IS A CONTRACT - Code length:', d.result.length)
  }
})
```

---

### Check 3: Try Simulating Approve

```javascript
// Simulate approve call
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      from: '0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5',
      to: '0x3600000000000000000000000000000000000000',
      data: '0x095ea7b3000000000000000000000000f04201f711173b7e167efad94b551661b11a4cdb00000000000000000000000000000000000000000000000000000000000f4240'
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.error) {
    console.log('❌ Would fail:', d.error)
    console.log('Full error:', JSON.stringify(d.error, null, 2))
  } else {
    console.log('✅ Would succeed:', d.result)
  }
})
```

---

## Most Likely Issues

### Issue 1: No USDC Balance

**Symptom**: Balance check shows 0

**Fix**: Get USDC from faucet:
- https://faucet.circle.com
- Select Arc Testnet
- Enter your address: `0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5`
- Request 10 USDC

---

### Issue 2: USDC Address Not a Contract

**Symptom**: Check 2 shows "NOT A CONTRACT"

**Fix**: The address `0x3600...0000` might not be the real USDC on Arc Testnet. We need to:
1. Find the real USDC address
2. Or deploy MockUSDC
3. Or redeploy lottery with correct USDC

---

### Issue 3: USDC Contract Doesn't Support Approve

**Symptom**: Contract exists but approve fails

**Fix**: The USDC might be native (not ERC20). Need different approach.

---

**Run all 3 checks and tell me the results!** 🔍

