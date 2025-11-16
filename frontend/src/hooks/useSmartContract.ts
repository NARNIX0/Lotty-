'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { FRIENDLY_LOTTERY_ABI, FRIENDLY_LOTTERY_ADDRESS } from '@/lib/contracts/FriendlyLottery'
import { ERC20_ABI, USDC_ADDRESS } from '@/lib/contracts/USDC'
import { useEffect, useState } from 'react'

/**
 * Hook to get lottery round data
 * Refetches every 5 seconds
 */
export function useGetLottery(roundId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: FRIENDLY_LOTTERY_ADDRESS,
    abi: FRIENDLY_LOTTERY_ABI,
    functionName: 'getRound',
    args: [BigInt(roundId)],
  })

  // Refetch every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 5000)

    return () => clearInterval(interval)
  }, [refetch])

  return {
    lottery: data,
    isLoading,
    error,
  }
}

/**
 * Hook to check if user has entered a lottery
 */
export function useHasEntered(roundId: number, address?: `0x${string}`) {
  const { data, isLoading } = useReadContract({
    address: FRIENDLY_LOTTERY_ADDRESS,
    abi: FRIENDLY_LOTTERY_ABI,
    functionName: 'hasParticipantEntered',
    args: address ? [BigInt(roundId), address] : undefined,
  })

  return {
    hasEntered: data || false,
    isLoading,
  }
}

/**
 * Hook to enter a lottery
 * WORKAROUND: Uses direct transfer instead of approve+transferFrom to bypass Arc USDC approve issue
 */
export function useEnterLottery(roundId: number) {
  const [stage, setStage] = useState<'idle' | 'transferring' | 'entering'>('idle')
  
  const { 
    data: transferHash, 
    writeContract: transfer, 
    isPending: isTransferPending,
    error: transferError 
  } = useWriteContract()
  
  const { 
    data: enterHash, 
    writeContract: enter, 
    isPending: isEnterPending,
    error: enterError 
  } = useWriteContract()

  const { isLoading: isTransferConfirming } = useWaitForTransactionReceipt({
    hash: transferHash,
  })

  const { isLoading: isEnterConfirming } = useWaitForTransactionReceipt({
    hash: enterHash,
  })

  // When transfer confirms, automatically call enterLottery
  useEffect(() => {
    if (transferHash && !isTransferConfirming && stage === 'transferring') {
      setStage('entering')
      enter({
        address: FRIENDLY_LOTTERY_ADDRESS,
        abi: FRIENDLY_LOTTERY_ABI,
        functionName: 'enterLottery',
        args: [BigInt(roundId)],
        // Don't specify chainId - let wagmi use the connected chain
      })
    }
  }, [transferHash, isTransferConfirming, stage, enter, roundId])

  // Log errors with full details
  useEffect(() => {
    if (transferError) {
      console.error('=== TRANSFER ERROR FULL ===')
      console.error('Error object:', transferError)
      console.error('Error name:', transferError.name)
      console.error('Error message:', transferError.message)
      console.error('Error cause:', transferError.cause)
      console.error('Error stack:', transferError.stack)
      
      // Try to extract from any nested error
      if (transferError.cause) {
        console.error('Cause details:', transferError.cause)
        if (typeof transferError.cause === 'object') {
          console.error('Cause keys:', Object.keys(transferError.cause))
          console.error('Cause stringified:', JSON.stringify(transferError.cause, null, 2))
        }
      }
      
      // Try to get RPC error details
      if ((transferError as any).data) {
        console.error('Error data:', (transferError as any).data)
      }
      if ((transferError as any).raw) {
        console.error('Error raw:', (transferError as any).raw)
        try {
          console.error('Error raw stringified:', JSON.stringify((transferError as any).raw, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value, 2))
        } catch (e) {
          console.error('Could not stringify raw error')
        }
      }
      if ((transferError as any).code) {
        console.error('Error code:', (transferError as any).code)
      }
      if ((transferError as any).shortMessage) {
        console.error('Short message:', (transferError as any).shortMessage)
      }
      if ((transferError as any).details) {
        console.error('Error details:', (transferError as any).details)
      }
      
      // Stringify entire error (handle BigInt)
      try {
        const errorString = JSON.stringify(transferError, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value, 2)
        console.error('Full error JSON:', errorString)
      } catch (e) {
        console.error('Could not stringify error:', e)
      }
      
      console.error('=== END TRANSFER ERROR ===')
      
      // Try to extract revert reason
      const errorMsg = transferError.message || JSON.stringify(transferError)
      alert('Error transferring USDC:\n\n' + errorMsg + '\n\nCheck console (F12) for full details')
      setStage('idle')
    }
  }, [transferError])

  useEffect(() => {
    if (enterError) {
      console.error('=== ENTER LOTTERY ERROR FULL ===')
      console.error('Error object:', enterError)
      console.error('Error name:', enterError.name)
      console.error('Error message:', enterError.message)
      console.error('Error cause:', enterError.cause)
      console.error('Error stack:', enterError.stack)
      
      // Try to extract from any nested error
      if (enterError.cause) {
        console.error('Cause details:', enterError.cause)
        if (typeof enterError.cause === 'object') {
          console.error('Cause keys:', Object.keys(enterError.cause))
          console.error('Cause stringified:', JSON.stringify(enterError.cause, null, 2))
        }
      }
      
      // Try to get RPC error details
      if ((enterError as any).data) {
        console.error('Error data:', (enterError as any).data)
      }
      if ((enterError as any).code) {
        console.error('Error code:', (enterError as any).code)
      }
      if ((enterError as any).shortMessage) {
        console.error('Short message:', (enterError as any).shortMessage)
      }
      
      // Stringify entire error
      try {
        const errorString = JSON.stringify(enterError, Object.getOwnPropertyNames(enterError), 2)
        console.error('Full error JSON:', errorString)
      } catch (e) {
        console.error('Could not stringify error:', e)
      }
      
      console.error('=== END ENTER LOTTERY ERROR ===')
      
      const errorMsg = enterError.message || JSON.stringify(enterError)
      alert('Error entering lottery:\n\n' + errorMsg + '\n\nCheck console (F12) for full details')
      setStage('idle')
    }
  }, [enterError])

  const { address } = useAccount()
  
  const mutate = async (entryFee: bigint) => {
    console.log('useEnterLottery mutate called with:', entryFee)
    console.log('USDC_ADDRESS:', USDC_ADDRESS)
    console.log('LOTTERY_ADDRESS:', FRIENDLY_LOTTERY_ADDRESS)
    console.log('transfer function:', typeof transfer)
    console.log('User address:', address)
    
    if (!transfer) {
      console.error('transfer function is undefined!')
      alert('Wallet not properly connected. Please disconnect and reconnect.')
      return
    }
    
    if (!address) {
      console.error('No address found!')
      alert('Please connect your wallet first.')
      return
    }
    
    try {
      setStage('transferring')
      console.log('WORKAROUND: Using direct transfer instead of approve')
      console.log('Step 1: Transferring USDC to contract...')
      console.log('Calling transfer with:', {
        address: USDC_ADDRESS,
        functionName: 'transfer',
        args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
        from: address,
      })
      
      // WORKAROUND: Use direct transfer instead of approve
      // This bypasses the Arc USDC approve issue
      transfer({
        address: USDC_ADDRESS,
        abi: ERC20_ABI as any,
        functionName: 'transfer',
        args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
        // Note: Users should set MetaMask gas settings to:
        // - Gas limit: 100000 (or higher)
        // - Max base fee: 250 gwei (or higher)
        // - Priority fee: 25 gwei (or lower, 20-50 range is fine)
        // Don't specify chainId - let wagmi use the connected chain
      })
      console.log('Transfer transaction initiated - will auto-call enterLottery after confirmation')
    } catch (error) {
      console.error('Error in mutate:', error)
      setStage('idle')
    }
  }

  const isPending = isTransferPending || isEnterPending || isTransferConfirming || isEnterConfirming
  const txHash = enterHash || transferHash

  return {
    mutate,
    isPending,
    error: transferError || enterError,
    txHash,
    stage,
  }
}

