# Verify Lottery Contract Deployment

## Important: Check if Lottery Contract Uses Correct USDC

Your lottery contract was deployed earlier. We need to verify it was deployed with the correct USDC address.

---

## Check Lottery Contract's USDC Address

**In browser console (F12), run:**

```javascript
// Check what USDC address your lottery contract is using
fetch('https://rpc.testnet.arc.network/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: '0x60B4E3e62A1E56FfC890d03742e158cf002e3047', // Your lottery contract
      data: '0x09cabdf9' // usdc() function selector
    }, 'latest'],
    id: 1
  })
})
.then(r => r.json())
.then(d => {
  const usdcAddress = '0x' + d.result.slice(-40)
  console.log('Lottery contract is using USDC:', usdcAddress)
  console.log('Should be:', '0x3600000000000000000000000000000000000000')
  
  if (usdcAddress.toLowerCase() === '0x3600000000000000000000000000000000000000') {
    console.log('✅ CORRECT USDC ADDRESS')
  } else {
    console.log('❌ WRONG USDC ADDRESS - Need to redeploy lottery!')
    console.log('Your lottery was deployed with wrong USDC address')
  }
})
```

---

## If USDC Address is Wrong

Your lottery contract was deployed with a different USDC address. You need to:

### Option 1: Redeploy Lottery Contract

```bash
cd contracts

# Update the USDC address in your .env
# Make sure it's: 0x3600000000000000000000000000000000000000

# Redeploy
forge script script/DeployLottery.s.sol:DeployLottery \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $env:PRIVATE_KEY \
  --broadcast \
  --legacy
```

Then update frontend `.env.local` with new lottery contract address.

### Option 2: Deploy New Lottery Round

If your contract has `createRound` function and you're the owner, you might not need to redeploy - just create a new round.

---

## After Verification

1. If addresses match ✅ → Continue with testing
2. If addresses don't match ❌ → Redeploy lottery with correct USDC

---

**Run that console command first and tell me what it says!** 🔍

