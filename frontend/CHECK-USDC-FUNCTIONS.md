# Check USDC Contract Functions

## The Issue

Arc's USDC has an "optional ERC-20 interface" - this means it might not fully support standard ERC20 approve.

---

## Check 1: Try Reading Contract Functions

```javascript
// Try to call approve and see what happens
// First, let's check if the function exists by trying to read it
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0x3600000000000000000000000000000000000000',
      data: '0x313ce567' // decimals() function
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  if (d.error) {
    console.log('❌ Error:', d.error)
  } else {
    const decimals = parseInt(d.result, 16)
    console.log('✅ USDC Decimals:', decimals)
  }
})
```

---

## Check 2: Try Transfer Instead of Approve

Since Arc's USDC might work differently, maybe we need to use `transfer` directly instead of `approve` + `transferFrom`.

But wait - your contract uses `transferFrom`, so we need approval...

---

## Check 3: Check Arc Block Explorer

Go to: **https://testnet.arcscan.app**

1. Search for: `0x3600000000000000000000000000000000000000`
2. Click on the contract
3. Go to "Contract" tab
4. Check "Read Contract" and "Write Contract"
5. See what functions are available
6. Check if `approve` is listed
7. If it is, try calling it from the explorer

---

## Alternative Solution: Modify Contract to Use Transfer

If approve doesn't work, we might need to modify the lottery contract to accept direct USDC transfers instead of using approve/transferFrom pattern.

But that would require redeploying the contract...

---

**First, check the block explorer and see what functions the USDC contract actually has!**

