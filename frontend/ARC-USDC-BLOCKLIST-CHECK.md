# Check Arc USDC Blocklist

## From Arc Docs

Arc enforces USDC blocklists:
- **Pre-mempool check**: If sender is blocklisted, transaction rejected (no fees)
- **Post-mempool check**: If address becomes blocklisted, transaction reverts (consumes gas)
- **Runtime transfer check**: Only the operation reverts, fees still collected

---

## Check if Address is Blocklisted

```javascript
// Try to check if your address is blocklisted
// Note: There's no direct function, but we can try a simple transfer to see
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      from: '0xcabd9a3ff3de3c19fb4a45875fb3c824d691feb5',
      to: '0x3600000000000000000000000000000000000000',
      data: '0xa9059cbb000000000000000000000000f04201f711173b7e167efad94b551661b11a4cdb00000000000000000000000000000000000000000000000000000000000f4240' // transfer(address,uint256)
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.error) {
    console.log('❌ Transfer would fail:', d.error)
    if (d.error.message?.includes('blocklist')) {
      console.log('⚠️ Address might be blocklisted!')
    }
  } else {
    console.log('✅ Transfer would succeed')
  }
})
```

---

## Alternative: Try Different Approach

Since the ERC-20 interface is "optional", maybe we need to ensure we're calling it correctly. Let's verify the contract actually implements approve:

```javascript
// Check if approve function exists by trying to read it
// (This won't work directly, but we can check the contract on explorer)
```

---

**Check the block explorer first to see if there are any restrictions or special requirements!**

