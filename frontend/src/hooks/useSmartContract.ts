'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
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
 * Handles USDC approval and entry
 */
export function useEnterLottery(roundId: number) {
  const [stage, setStage] = useState<'idle' | 'approving' | 'entering'>('idle')
  
  const { 
    data: approveHash, 
    writeContract: approve, 
    isPending: isApprovePending 
  } = useWriteContract()
  
  const { 
    data: enterHash, 
    writeContract: enter, 
    isPending: isEnterPending,
    error: enterError 
  } = useWriteContract()

  const { isLoading: isApproveConfirming } = useWaitForTransactionReceipt({
    hash: approveHash,
  })

  const { isLoading: isEnterConfirming } = useWaitForTransactionReceipt({
    hash: enterHash,
  })

  // When approve confirms, automatically call enter
  useEffect(() => {
    if (approveHash && !isApproveConfirming && stage === 'approving') {
      setStage('entering')
      enter({
        address: FRIENDLY_LOTTERY_ADDRESS,
        abi: FRIENDLY_LOTTERY_ABI,
        functionName: 'enterLottery',
        args: [BigInt(roundId)],
      })
    }
  }, [approveHash, isApproveConfirming, stage, enter, roundId])

  const mutate = (entryFee: bigint) => {
    setStage('approving')
    approve({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
    })
  }

  const isPending = isApprovePending || isEnterPending || isApproveConfirming || isEnterConfirming
  const txHash = enterHash || approveHash

  return {
    mutate,
    isPending,
    error: enterError,
    txHash,
    stage,
  }
}

