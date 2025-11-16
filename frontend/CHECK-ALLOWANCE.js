/**
 * Check current USDC allowance
 * Maybe we already have allowance and don't need to approve
 */

(async () => {
  const accounts = await window.ethereum.request({ method: 'eth_accounts' })
  const ownerAddress = accounts[0]
  const spenderAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB' // Lottery contract
  const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'

  console.log('=== Checking USDC Allowance ===')
  console.log('Owner:', ownerAddress)
  console.log('Spender (Lottery):', spenderAddress)
  console.log('USDC Contract:', USDC_ADDRESS)

  // Encode allowance(address owner, address spender)
  // Function signature: 0xdd62ed3e
  const owner = ownerAddress.slice(2).padStart(64, '0')
  const spender = spenderAddress.slice(2).padStart(64, '0')
  const data = `0xdd62ed3e${owner}${spender}`

  try {
    const result = await window.ethereum.request({
      method: 'eth_call',
      params: [{
        to: USDC_ADDRESS,
        data: data,
      }, 'latest'],
    })

    const allowance = BigInt(result)
    const allowanceUSDC = Number(allowance) / 1_000_000

    console.log('\n=== Allowance Result ===')
    console.log('Allowance (raw):', allowance.toString())
    console.log('Allowance (USDC):', allowanceUSDC.toFixed(2), 'USDC')
    
    if (allowance >= BigInt(1000000)) {
      console.log('\n✅ You already have sufficient allowance!')
      console.log('You might not need to approve - try entering the lottery directly')
    } else {
      console.log('\n⚠️ Insufficient allowance')
      console.log('Need: 1.00 USDC')
      console.log('Have:', allowanceUSDC.toFixed(2), 'USDC')
    }
  } catch (error) {
    console.error('❌ Error checking allowance:', error)
  }
})()

