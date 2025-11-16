/**
 * Check if gas settings are appropriate for Arc Testnet
 * Run this in browser console
 */

(async () => {
  console.log('=== Arc Testnet Gas Settings Check ===\n')
  
  // Check current chain
  const chainId = await window.ethereum.request({ method: 'eth_chainId' })
  const arcTestnetChainId = '0x4cef52' // 5042002
  
  if (chainId !== arcTestnetChainId) {
    console.warn('⚠️ Not on Arc Testnet! Switch first.')
    return
  }
  
  console.log('✅ Connected to Arc Testnet\n')
  
  // Get account
  const accounts = await window.ethereum.request({ method: 'eth_accounts' })
  const address = accounts[0]
  
  if (!address) {
    console.error('❌ No account connected')
    return
  }
  
  console.log('Address:', address)
  
  // Estimate gas for a USDC transfer
  const usdcAddress = '0x3600000000000000000000000000000000000000'
  const lotteryAddress = '0x639963644B6c0aE7c80DF3D4f1BB4503D6BD1A0c'
  const amount = '0x7a120' // 500000 (0.5 USDC with 6 decimals)
  
  try {
    // Estimate gas for transfer
    const gasEstimate = await window.ethereum.request({
      method: 'eth_estimateGas',
      params: [{
        from: address,
        to: usdcAddress,
        data: '0xa9059cbb' + // transfer(address,uint256) function selector
              lotteryAddress.slice(2).padStart(64, '0') + // to address
              amount.slice(2).padStart(64, '0') // amount
      }]
    })
    
    const gasLimit = parseInt(gasEstimate, 16)
    console.log('\n=== Gas Estimation ===')
    console.log('Estimated gas limit:', gasLimit)
    console.log('Your MetaMask gas limit: 60000')
    
    if (gasLimit > 60000) {
      console.warn('⚠️ Your gas limit (60000) is LOWER than estimated (' + gasLimit + ')')
      console.warn('   This could cause transaction failure!')
      console.log('\n💡 Recommendation: Set gas limit to at least', Math.ceil(gasLimit * 1.2))
    } else {
      console.log('✅ Your gas limit (60000) is sufficient')
      console.log('💡 Recommendation: Set to', Math.ceil(gasLimit * 1.2), 'for safety margin')
    }
    
    // Check current gas prices
    const feeData = await window.ethereum.request({
      method: 'eth_feeHistory',
      params: [1, 'latest', [25, 75]]
    })
    
    if (feeData && feeData.baseFeePerGas && feeData.baseFeePerGas.length > 0) {
      const baseFee = parseInt(feeData.baseFeePerGas[0], 16)
      const baseFeeGwei = baseFee / 1e9
      
      console.log('\n=== Current Network Gas Prices ===')
      console.log('Base fee:', baseFeeGwei.toFixed(2), 'gwei')
      console.log('Your max base fee: 165 gwei')
      console.log('Your priority fee: 165 gwei')
      
      if (baseFeeGwei > 165) {
        console.warn('⚠️ Network base fee (' + baseFeeGwei.toFixed(2) + ' gwei) is HIGHER than your max (165 gwei)')
        console.warn('   Your transaction will likely fail!')
        console.log('\n💡 Recommendation: Set max base fee to at least', Math.ceil(baseFeeGwei * 1.5), 'gwei')
      } else {
        console.log('✅ Your max base fee (165 gwei) is sufficient')
      }
      
      // Priority fee check
      if (165 < baseFeeGwei * 0.1) {
        console.warn('⚠️ Priority fee (165 gwei) might be too high relative to base fee')
        console.log('💡 Recommendation: Priority fee should be 10-20% of base fee')
      } else {
        console.log('✅ Priority fee (165 gwei) is reasonable')
      }
    }
    
    // Check balance
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    })
    const balanceUSDC = (parseInt(balance, 16) / 1_000_000).toFixed(2)
    
    console.log('\n=== Balance Check ===')
    console.log('USDC Balance:', balanceUSDC, 'USDC')
    
    // Calculate total cost
    const totalGasCost = (165 + 165) * 60000 / 1e9 * 1_000_000 // Convert to USDC (6 decimals)
    console.log('\n=== Transaction Cost Estimate ===')
    console.log('Max gas cost:', totalGasCost.toFixed(6), 'USDC')
    console.log('   (165 base + 165 priority) × 60000 gas limit')
    
    if (parseFloat(balanceUSDC) < totalGasCost) {
      console.warn('⚠️ Your balance might not cover gas fees!')
    } else {
      console.log('✅ Balance sufficient for gas fees')
    }
    
  } catch (error) {
    console.error('❌ Error estimating gas:', error)
    console.log('\nThis might indicate:')
    console.log('1. Arc RPC is rejecting the transaction (known issue)')
    console.log('2. Insufficient balance')
    console.log('3. Contract interaction issue')
  }
  
  console.log('\n=== Summary ===')
  console.log('If gas estimation fails, the issue is likely:')
  console.log('  → Arc RPC rejecting USDC transfers (known limitation)')
  console.log('  → Not a gas settings issue')
  console.log('\nIf gas estimation succeeds but transaction fails:')
  console.log('  → Try increasing gas limit to 100000')
  console.log('  → Try increasing max base fee to 200 gwei')
  console.log('  → Try setting priority fee to 20 gwei')
})()
