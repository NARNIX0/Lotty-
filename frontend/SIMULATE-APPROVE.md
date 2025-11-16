# Simulate USDC Approve to Get Real Error

## Run This in Console to See Actual Revert Reason

```javascript
// Simulate approve call to see real error
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      from: '0xcabd9a3ff3de3c19fb4a45875fb3c824d691feb5',
      to: '0x3600000000000000000000000000000000000000',
      data: '0x095ea7b3000000000000000000000000f04201f711173b7e167efad94b551661b11a4cdb00000000000000000000000000000000000000000000000000000000000f4240'
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  console.log('=== Approve Simulation Result ===')
  if (d.error) {
    console.log('❌ Error Code:', d.error.code)
    console.log('❌ Error Message:', d.error.message)
    console.log('Full Error:', JSON.stringify(d.error, null, 2))
    
    // Try to decode revert reason
    if (d.error.data) {
      console.log('Revert Data:', d.error.data)
    }
  } else {
    console.log('✅ Would succeed:', d.result)
  }
})
```

This will show us the ACTUAL revert reason instead of "Internal JSON-RPC error".

---

## Alternative: Check USDC Contract Interface

```javascript
// Check if USDC has standard approve function
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0x3600000000000000000000000000000000000000',
      data: '0x95d89b41' // symbol() function selector
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  console.log('USDC Symbol:', d.result)
})
```

---

**Run the first check (simulate approve) and tell me what error message you get!**

This will tell us WHY approve is failing.

