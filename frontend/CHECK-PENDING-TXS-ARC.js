/**
 * Check pending transactions on Arc Testnet
 * Run this in browser console
 * 
 * Note: eth_getTransactionCount is the standard JSON-RPC method name
 * used by ALL EVM-compatible chains (Ethereum, Arc, Polygon, etc.)
 * The "eth" prefix is just a naming convention, not Ethereum-specific.
 * Since we're connected to Arc Testnet, this call goes to Arc's RPC.
 */

(async () => {
  // First, verify we're on Arc Testnet
  const chainId = await window.ethereum.request({ method: 'eth_chainId' })
  const arcTestnetChainId = '0x4cef52' // 5042002 in hex (correct value)
  
  console.log('=== Arc Testnet Transaction Check ===')
  console.log('Current Chain ID:', chainId, `(${parseInt(chainId, 16)})`)
  console.log('Arc Testnet Chain ID:', arcTestnetChainId, `(${parseInt(arcTestnetChainId, 16)})`)
  
  if (chainId !== arcTestnetChainId) {
    console.warn('⚠️ Not on Arc Testnet! Switch to Arc Testnet first.')
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
  
  // Get transaction count (this uses Arc's RPC since we're on Arc Testnet)
  // eth_getTransactionCount is the standard method name for ALL EVM chains
  const pendingNonce = await window.ethereum.request({
    method: 'eth_getTransactionCount', // Standard JSON-RPC method (works on Arc)
    params: [address, 'pending'] // 'pending' includes unconfirmed transactions
  })
  
  const latestNonce = await window.ethereum.request({
    method: 'eth_getTransactionCount', // Standard JSON-RPC method (works on Arc)
    params: [address, 'latest'] // 'latest' only includes confirmed transactions
  })
  
  const pendingCount = parseInt(pendingNonce, 16)
  const latestCount = parseInt(latestNonce, 16)
  const pendingTxCount = pendingCount - latestCount
  
  console.log('\n=== Transaction Status ===')
  console.log('Latest confirmed nonce:', latestCount)
  console.log('Pending nonce:', pendingCount)
  console.log('Pending transactions:', pendingTxCount)
  
  if (pendingTxCount > 0) {
    console.log('\n⚠️ You have', pendingTxCount, 'pending transaction(s)')
    console.log('These are blocking new transactions.')
    console.log('\nTo fix:')
    console.log('1. Open MetaMask → Activity tab')
    console.log('2. Check the pending transactions')
    console.log('3. Wait for them to confirm, or cancel/speed them up')
  } else {
    console.log('\n✅ No pending transactions - you can send new transactions!')
  }
  
  // Also check balance (using Arc's RPC)
  const balance = await window.ethereum.request({
    method: 'eth_getBalance', // Standard JSON-RPC method (works on Arc)
    params: [address, 'latest']
  })
  console.log('\n=== Balance ===')
  console.log('USDC Balance (wei):', balance)
  console.log('USDC Balance (6 decimals):', (parseInt(balance, 16) / 1_000_000).toFixed(2), 'USDC')
})()
