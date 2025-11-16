/**
 * Direct approve using MetaMask (bypasses wagmi)
 * This might work if wagmi is causing issues
 */

import { useState } from 'react'
import { USDC_ADDRESS } from '@/lib/contracts/USDC'
import { FRIENDLY_LOTTERY_ADDRESS } from '@/lib/contracts/FriendlyLottery'
import { useAccount } from 'wagmi'

export function useDirectApprove() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { address } = useAccount()

  const approve = async (amount: bigint) => {
    if (!address || !window.ethereum) {
      setError(new Error('Wallet not connected'))
      return
    }

    setIsPending(true)
    setError(null)

    try {
      // Encode approve function call manually
      // approve(address spender, uint256 amount)
      // Function signature: 0x095ea7b3
      const spender = FRIENDLY_LOTTERY_ADDRESS.slice(2).padStart(64, '0')
      const amountHex = amount.toString(16).padStart(64, '0')
      const data = `0x095ea7b3${spender}${amountHex}`

      console.log('Direct approve - sending transaction via MetaMask')
      console.log('To:', USDC_ADDRESS)
      console.log('Data:', data)
      console.log('Amount:', amount.toString())

      // Send transaction directly via MetaMask
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: USDC_ADDRESS,
          data: data,
          gas: '0xea60', // 60,000 in hex (from our successful gas estimate)
        }],
      })

      console.log('✅ Transaction sent:', txHash)
      return txHash
    } catch (err: any) {
      console.error('❌ Direct approve error:', err)
      setError(err)
      throw err
    } finally {
      setIsPending(false)
    }
  }

  return {
    approve,
    isPending,
    error,
  }
}

