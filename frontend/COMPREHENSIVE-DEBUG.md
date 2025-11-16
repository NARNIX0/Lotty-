# Comprehensive USDC Debug

## Run ALL These Commands in Browser Console (F12)

Copy and paste each one, then tell me the results!

---

## Test 1: Check if Address Has Code

```javascript
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
  console.log('=== TEST 1: Contract Code ===')
  if (d.result === '0x' || d.result === '0x0') {
    console.log('❌ NO CODE - This is NOT a contract!')
  } else {
    console.log('✅ Has code, length:', d.result.length)
    console.log('First 100 chars:', d.result.substring(0, 100))
  }
})
```

---

## Test 2: Check Your USDC Balance

```javascript
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
  console.log('=== TEST 2: Your Balance ===')
  if (d.error) {
    console.log('❌ Error calling balanceOf:', d.error)
  } else {
    const balance = parseInt(d.result, 16) / 1000000
    console.log('Balance:', balance, 'USDC')
  }
})
```

---

## Test 3: Check Your ETH Balance (for gas)

```javascript
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: ['0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5', 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  console.log('=== TEST 3: ETH Balance ===')
  const balance = parseInt(d.result, 16) / 1e18
  console.log('ETH Balance:', balance)
  if (balance < 0.001) {
    console.log('⚠️ Low ETH for gas!')
  }
})
```

---

## Test 4: Try Calling Approve Directly (Simulation)

```javascript
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      from: '0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5',
      to: '0x3600000000000000000000000000000000000000',
      data: '0x095ea7b300000000000000000000000060b4e3e62a1e56ffc890d03742e158cf002e30470000000000000000000000000000000000000000000000000000000000000001'
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  console.log('=== TEST 4: Approve Simulation ===')
  if (d.error) {
    console.log('❌ Error:', d.error)
    console.log('Full error:', JSON.stringify(d.error, null, 2))
  } else {
    console.log('✅ Approve would succeed, result:', d.result)
  }
})
```

---

## Test 5: Search for Real USDC on Arc Testnet

**Go to**: https://testnet.arcscan.app

1. Search for "USDC" in the search bar
2. Look for ERC20 token contracts
3. Click on any USDC contracts you find
4. Check if they're verified
5. Copy the correct address

---

**Run tests 1-4 and paste ALL the console output here!**

This will tell us:
- If the address is actually a contract
- If you have USDC
- The real error message

Then we'll know if we need a different USDC address or if there's another issue.

