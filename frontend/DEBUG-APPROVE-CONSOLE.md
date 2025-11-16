# Debug USDC Approve in Browser Console

## Enhanced Error Logging

I've updated the error logging to capture **all** error details. When you click "Join Now" and get the error, check the browser console (F12) - you should now see:

```
=== APPROVE ERROR FULL ===
Error object: ...
Error name: ...
Error message: ...
Error cause: ...
Error stack: ...
Cause details: ...
Error data: ...
Error code: ...
Short message: ...
Full error JSON: ...
=== END APPROVE ERROR ===
```

---

## Direct RPC Test (Bypass Wagmi)

If the error still doesn't show details, try this **direct RPC call** in the browser console:

### Step 1: Get Your Address

```javascript
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
console.log('Your address:', accounts[0])
```

### Step 2: Test Approve Directly

```javascript
// Your addresses
const fromAddress = accounts[0] // Your wallet address
const spenderAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB' // Lottery contract
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
const amount = BigInt(1000000) // 1 USDC (6 decimals)

// Encode approve(address spender, uint256 amount)
// Function signature: 0x095ea7b3
const spender = spenderAddress.slice(2).padStart(64, '0')
const amountHex = amount.toString(16).padStart(64, '0')
const data = `0x095ea7b3${spender}${amountHex}`

console.log('Testing approve with:')
console.log('From:', fromAddress)
console.log('To (USDC):', USDC_ADDRESS)
console.log('Spender (Lottery):', spenderAddress)
console.log('Amount:', amount.toString())
console.log('Data:', data)

// Try gas estimate
try {
  const gasEstimate = await window.ethereum.request({
    method: 'eth_estimateGas',
    params: [{
      from: fromAddress,
      to: USDC_ADDRESS,
      data: data,
    }],
  })
  console.log('✅ Gas estimate:', gasEstimate)
} catch (error) {
  console.error('❌ Gas estimate error:', error)
  console.error('Error code:', error.code)
  console.error('Error message:', error.message)
  console.error('Error data:', error.data)
}

// Try call (simulate)
try {
  const callResult = await window.ethereum.request({
    method: 'eth_call',
    params: [{
      from: fromAddress,
      to: USDC_ADDRESS,
      data: data,
    }, 'latest'],
  })
  console.log('✅ Call result:', callResult)
} catch (error) {
  console.error('❌ Call error:', error)
  console.error('Error code:', error.code)
  console.error('Error message:', error.message)
  console.error('Error data:', error.data)
  
  // Try to decode revert reason
  if (error.data && error.data.startsWith('0x')) {
    console.error('Revert data:', error.data)
    try {
      // Skip function selector (4 bytes) + offset (32 bytes) + length (32 bytes) = 68 bytes = 138 hex chars
      const revertReason = Buffer.from(error.data.slice(138), 'hex').toString('utf8').replace(/\0/g, '')
      if (revertReason) {
        console.error('Revert reason:', revertReason)
      }
    } catch (e) {
      console.error('Could not decode revert reason')
    }
  }
}
```

### Step 3: Try Actual Transaction

```javascript
// Try to send the actual transaction
try {
  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      from: fromAddress,
      to: USDC_ADDRESS,
      data: data,
      gas: '0x100000', // 1M gas (should be enough)
    }],
  })
  console.log('✅ Transaction sent:', txHash)
} catch (error) {
  console.error('❌ Transaction error:', error)
  console.error('Full error:', JSON.stringify(error, null, 2))
}
```

---

## What to Look For

1. **Error code**: Common codes:
   - `-32603`: Internal JSON-RPC error (generic)
   - `-32000`: Server error
   - `3`: Execution reverted

2. **Error data**: If present, this contains the revert reason

3. **Error message**: Should give clues about what went wrong

---

## Next Steps

1. **Run the enhanced error logging** - Click "Join Now" and check console
2. **If still no details**, run the direct RPC test above
3. **Share the console output** - Copy/paste the error details

This will help us identify the exact issue!

