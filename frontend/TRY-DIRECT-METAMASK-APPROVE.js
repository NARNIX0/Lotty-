/**
 * Try direct MetaMask approve (bypass wagmi)
 * Run this in browser console to test if direct MetaMask works
 */

(async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' })
  const fromAddress = accounts[0]
  const spenderAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB' // Lottery contract
  const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
  const amount = BigInt(1000000) // 1 USDC (6 decimals)

  console.log('=== Direct MetaMask Approve Test ===')
  console.log('From:', fromAddress)
  console.log('To (USDC):', USDC_ADDRESS)
  console.log('Spender (Lottery):', spenderAddress)
  console.log('Amount:', amount.toString(), '(1 USDC)')

  // Encode approve(address spender, uint256 amount)
  // Function signature: 0x095ea7b3
  const spender = spenderAddress.slice(2).padStart(64, '0')
  const amountHex = amount.toString(16).padStart(64, '0')
  const data = `0x095ea7b3${spender}${amountHex}`

  console.log('Encoded data:', data)
  console.log('\n⚠️ This will open MetaMask to confirm the transaction')
  console.log('Click "Confirm" in MetaMask to test if direct call works\n')

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: fromAddress,
        to: USDC_ADDRESS,
        data: data,
        gas: '0xea60', // 60,000 in hex (from successful gas estimate)
      }],
    })
    
    console.log('✅ SUCCESS! Transaction sent:', txHash)
    console.log('This means direct MetaMask works - the issue is with wagmi')
    console.log('Check transaction on:', `https://testnet.arcscan.app/tx/${txHash}`)
  } catch (error) {
    console.error('❌ FAILED:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.code === 4001) {
      console.error('User rejected the transaction')
    } else {
      console.error('This means the issue is with Arc RPC, not wagmi')
    }
  }
})()

