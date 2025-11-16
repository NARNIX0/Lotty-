/**
 * Check pending transactions and their status
 * Run this in browser console
 */

(async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' })
  const address = accounts[0]
  
  console.log('=== Checking Pending Transactions ===')
  console.log('Address:', address)
  
  // Get current nonce
  const nonce = await window.ethereum.request({
    method: 'eth_getTransactionCount',
    params: [address, 'pending']
  })
  console.log('Current nonce (pending):', parseInt(nonce, 16))
  
  const latestNonce = await window.ethereum.request({
    method: 'eth_getTransactionCount',
    params: [address, 'latest']
  })
  console.log('Latest confirmed nonce:', parseInt(latestNonce, 16))
  console.log('Pending transactions:', parseInt(nonce, 16) - parseInt(latestNonce, 16))
  
  // Check if we can see the pending transactions
  console.log('\n=== Options ===')
  console.log('1. Wait for pending transactions to confirm')
  console.log('2. Check MetaMask Activity tab for stuck transactions')
  console.log('3. Try to speed up or cancel stuck transactions in MetaMask')
  console.log('4. If transactions are stuck, you may need to reset MetaMask account')
})()
