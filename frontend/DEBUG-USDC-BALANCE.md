# Debug USDC Balance and Contract

## Check 1: Do You Have USDC?

**In browser console (F12), run:**

```javascript
// Check your USDC balance
const yourAddress = '0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5' // Your wallet

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
    const balance = parseInt(d.result, 16) / 1000000 // 6 decimals
    console.log('Your USDC Balance:', balance, 'USDC')
    console.log('Entry fee needed: 2 USDC')
    
    if (balance === 0) {
      console.log('❌ You have 0 USDC! Get some from faucet!')
    } else if (balance < 2) {
      console.log('⚠️ Not enough USDC! You have', balance, 'but need at least 2')
    } else {
      console.log('✅ You have enough USDC')
    }
  }
})
```

---

## Check 2: Get USDC from Faucet

If you have 0 USDC, get some from:

**🚰 https://faucet.circle.com**

Steps:
1. Go to faucet.circle.com
2. Select "Arc Testnet"
3. Enter your address: `0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5`
4. Request 10 USDC
5. Wait for confirmation (30-60 seconds)
6. Refresh page and try join lottery again

---

## Check 3: Verify Contract Code

Let's verify the USDC contract actually exists:

```javascript
// Check if USDC contract has code
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
    console.log('❌ NOT A CONTRACT!')
    console.log('This address has no code on Arc Testnet')
  } else {
    console.log('✅ IS A CONTRACT')
    console.log('Code length:', d.result.length, 'chars')
  }
})
```

---

## Check 4: Try Manual Approval

Try approving a smaller amount manually:

```javascript
// Try approving 1 USDC manually
window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: '0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5',
    to: '0x3600000000000000000000000000000000000000',
    data: '0x095ea7b300000000000000000000000060b4e3e62a1e56ffc890d03742e158cf002e30470000000000000000000000000000000000000000000000000000000000000001'
  }]
})
.then(txHash => console.log('✅ Success! TxHash:', txHash))
.catch(err => console.log('❌ Error:', err.message))
```

---

## Most Likely Issue: No USDC Balance

The "Internal JSON-RPC error" usually means:
- You're trying to approve more USDC than you have
- Or you have 0 USDC

**Solution**: Get USDC from faucet first!

---

**Run Check 1 first and tell me what your USDC balance is!** 🔍

