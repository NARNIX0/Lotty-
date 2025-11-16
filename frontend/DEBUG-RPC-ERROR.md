# Debug RPC Error -32603

## The Error

Error code `-32603` = "Internal JSON-RPC error" - This means the RPC node is rejecting the transaction **before** it reaches the contract.

## What This Means

The Arc RPC node is saying "no" to the transaction. Possible reasons:
1. **Blocklist enforcement** - Your address or the lottery contract might be blocklisted
2. **Gas estimation failure** - The RPC can't estimate gas (might reveal the real error)
3. **Transaction format** - Arc's USDC might require special transaction format
4. **Contract state** - The USDC contract might be in a special state

## Next Steps - Get More Details

Try this in the browser console to get the actual error from gas estimation:

```javascript
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
const fromAddress = accounts[0]
const spenderAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB'
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
const amount = '0x0f4240' // 1000000 in hex (1 USDC)

const spender = spenderAddress.slice(2).padStart(64, '0')
const amountHex = amount.slice(2).padStart(64, '0')
const data = `0x095ea7b3${spender}${amountHex}`

console.log('=== Testing Gas Estimation ===')
console.log('From:', fromAddress)
console.log('To (USDC):', USDC_ADDRESS)
console.log('Data:', data)

// Try gas estimation - this often gives better error messages
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
  console.error('❌ Gas estimation error:', error)
  console.error('Error code:', error.code)
  console.error('Error message:', error.message)
  
  // Check if there's a data field with revert reason
  if (error.data) {
    console.error('Error data:', error.data)
    
    // Try to decode revert reason
    if (error.data.startsWith('0x')) {
      console.error('Revert data (hex):', error.data)
      
      // Try to decode as string (skip function selector + offset + length = 138 chars)
      if (error.data.length > 138) {
        try {
          const hexString = error.data.slice(138)
          const revertReason = Buffer.from(hexString, 'hex').toString('utf8').replace(/\0/g, '')
          if (revertReason && revertReason.length > 0) {
            console.error('Decoded revert reason:', revertReason)
          }
        } catch (e) {
          console.error('Could not decode revert reason')
        }
      }
    }
  }
  
  // Check for nested error
  if (error.error) {
    console.error('Nested error:', error.error)
  }
}
```

## Possible Solutions

### 1. Check if Address is Blocklisted

Arc enforces USDC blocklists. Check:
- Your address: `0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5`
- Lottery contract: `0xf04201f711173b7e167EfAD94b551661b11A4CdB`

Visit the block explorer and check if there are any restrictions.

### 2. Try Different Approach

Maybe we need to check if the contract supports `approve` first, or use a different method.

### 3. Contact Arc Support

If this is a known issue with Arc's USDC contract, they might have documentation or a workaround.

### 4. Check Arc Discord/Community

Other developers might have encountered this issue and have a solution.

