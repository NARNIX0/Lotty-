/**
 * Run this in browser console to get detailed error from gas estimation
 * Gas estimation often gives better error messages than sendTransaction
 */

(async () => {
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
  console.log('Spender (Lottery):', spenderAddress)
  console.log('Amount:', amount, '(1 USDC)')
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
    console.log('Gas estimate (decimal):', parseInt(gasEstimate, 16))
  } catch (error) {
    console.error('❌ Gas estimation error:')
    console.error('Error object:', error)
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
            // Convert hex to string
            let revertReason = ''
            for (let i = 0; i < hexString.length; i += 2) {
              const byte = parseInt(hexString.substr(i, 2), 16)
              if (byte === 0) break
              revertReason += String.fromCharCode(byte)
            }
            if (revertReason && revertReason.length > 0) {
              console.error('Decoded revert reason:', revertReason)
            }
          } catch (e) {
            console.error('Could not decode revert reason:', e)
          }
        }
      }
    }
    
    // Check for nested error
    if (error.error) {
      console.error('Nested error:', error.error)
    }
    
    // Try to stringify entire error
    try {
      console.error('Full error JSON:', JSON.stringify(error, (key, value) => {
        if (typeof value === 'bigint') return value.toString()
        return value
      }, 2))
    } catch (e) {
      console.error('Could not stringify error')
    }
  }
})()

