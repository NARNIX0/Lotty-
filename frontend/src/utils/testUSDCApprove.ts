/**
 * Test USDC approve function directly via RPC
 * Use this in browser console to debug approve issues
 */

export async function testUSDCApprove(
  fromAddress: string,
  spenderAddress: string,
  amount: bigint
) {
  console.log('=== Testing USDC Approve ===')
  console.log('From:', fromAddress)
  console.log('Spender:', spenderAddress)
  console.log('Amount:', amount.toString())
  
  const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
  
  // Encode approve function call
  // approve(address spender, uint256 amount)
  // Function signature: 0x095ea7b3
  const spender = spenderAddress.slice(2).padStart(64, '0')
  const amountHex = amount.toString(16).padStart(64, '0')
  const data = `0x095ea7b3${spender}${amountHex}`
  
  console.log('Encoded data:', data)
  
  try {
    // Try to estimate gas first
    const gasEstimate = await window.ethereum?.request({
      method: 'eth_estimateGas',
      params: [{
        from: fromAddress,
        to: USDC_ADDRESS,
        data: data,
      }],
    })
    console.log('✅ Gas estimate:', gasEstimate)
    
    // Try to call (simulate)
    const callResult = await window.ethereum?.request({
      method: 'eth_call',
      params: [{
        from: fromAddress,
        to: USDC_ADDRESS,
        data: data,
      }, 'latest'],
    })
    console.log('✅ Call result:', callResult)
    
    return { success: true, gasEstimate, callResult }
  } catch (error: any) {
    console.error('❌ Error:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Error data:', error.data)
    
    // Try to decode revert reason if present
    if (error.data && error.data.startsWith('0x')) {
      console.error('Revert data:', error.data)
      // Try to decode as string
      try {
        const revertReason = Buffer.from(error.data.slice(138), 'hex').toString('utf8').replace(/\0/g, '')
        if (revertReason) {
          console.error('Revert reason:', revertReason)
        }
      } catch (e) {
        console.error('Could not decode revert reason')
      }
    }
    
    return { success: false, error }
  }
}

/**
 * Usage in browser console:
 * 
 * import { testUSDCApprove } from './utils/testUSDCApprove'
 * 
 * const accounts = await window.ethereum.request({ method: 'eth_accounts' })
 * const lotteryAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB'
 * const amount = BigInt(1000000) // 1 USDC (6 decimals)
 * 
 * await testUSDCApprove(accounts[0], lotteryAddress, amount)
 */

