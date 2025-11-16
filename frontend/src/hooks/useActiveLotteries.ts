'use client'

import { useReadContract } from 'wagmi'
import { FRIENDLY_LOTTERY_ABI, FRIENDLY_LOTTERY_ADDRESS } from '@/lib/contracts/FriendlyLottery'

/**
 * Hook to get the current round ID
 */
export function useCurrentRoundId() {
  const { data, isLoading, error } = useReadContract({
    address: FRIENDLY_LOTTERY_ADDRESS,
    abi: FRIENDLY_LOTTERY_ABI,
    functionName: 'currentRoundId',
  })

  return {
    currentRoundId: data ? Number(data) : 0,
    isLoading,
    error,
  }
}

