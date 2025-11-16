'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { FRIENDLY_LOTTERY_ABI, FRIENDLY_LOTTERY_ADDRESS } from '@/lib/contracts/FriendlyLottery'
import { parseUSDC } from '@/lib/contracts/FriendlyLottery'

interface CreateLotteryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateLotteryModal({ isOpen, onClose }: CreateLotteryModalProps) {
  const [entryFee, setEntryFee] = useState('10')
  const [duration, setDuration] = useState('7')
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours' | 'days'>('days')
  const [isCreating, setIsCreating] = useState(false)

  const { data: hash, writeContract, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  })

  const handleCreate = async () => {
    if (!entryFee || !duration) return
    
    try {
      setIsCreating(true)
      const entryFeeWei = parseUSDC(entryFee)
      
      // Convert to days based on time unit
      let durationInDays: number
      const durationNum = parseFloat(duration)
      
      if (timeUnit === 'minutes') {
        durationInDays = durationNum / (60 * 24) // minutes to days
      } else if (timeUnit === 'hours') {
        durationInDays = durationNum / 24 // hours to days
      } else {
        durationInDays = durationNum // already in days
      }
      
      // Contract expects days as integer, so we'll use minimum of 1 day
      // For sub-day durations, we'll round up to ensure it's at least 1
      const finalDurationDays = Math.max(1, Math.ceil(durationInDays))
      
      writeContract({
        address: FRIENDLY_LOTTERY_ADDRESS,
        abi: FRIENDLY_LOTTERY_ABI,
        functionName: 'createRound',
        args: [entryFeeWei, BigInt(finalDurationDays)],
        // Don't specify chainId - let wagmi use the connected chain
      })
    } catch (err) {
      console.error('Error creating lottery:', err)
      setIsCreating(false)
    }
  }

  // Close modal on success
  if (hash && !isConfirming && !isPending) {
    setTimeout(() => {
      onClose()
      setIsCreating(false)
      // Refresh page to show new lottery
      window.location.reload()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-lg border border-[#333333] bg-[#1A1A1A] p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-2xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Create Money Trap
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Entry Fee */}
          <div>
            <label
              htmlFor="entryFee"
              className="mb-2 block text-sm text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              Entry Fee (How Much to Charge Your Friends)
            </label>
            <input
              type="number"
              id="entryFee"
              value={entryFee}
              onChange={(e) => setEntryFee(e.target.value)}
              placeholder="10.00"
              min="0"
              step="0.01"
              className="w-full rounded-md border border-[#333333] bg-black px-4 py-2 text-white focus:border-[#B8FF00] focus:outline-none"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              Duration
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="7"
                min="1"
                step="1"
                className="flex-1 rounded-md border border-[#333333] bg-black px-4 py-2 text-white focus:border-[#B8FF00] focus:outline-none"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'minutes' | 'hours' | 'days')}
                className="rounded-md border border-[#333333] bg-black px-4 py-2 text-white focus:border-[#B8FF00] focus:outline-none"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
            {timeUnit !== 'days' && (
              <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
                Will be rounded to minimum 1 day for contract
              </p>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <p className="text-sm text-red-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Error: {error.message.split('\n')[0]}
            </p>
          )}

          {isPending && (
            <p className="text-sm text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Check your wallet to confirm you're about to lose money...
            </p>
          )}

          {isConfirming && (
            <p className="text-sm text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Creating your money trap... Please wait while we fleece your friends.
            </p>
          )}

          {hash && !isConfirming && !isPending && (
            <p className="text-sm text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              ✓ Money trap created! Time to invite your "friends"
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              disabled={isPending || isConfirming}
              className="flex-1 rounded-lg border border-[#333333] bg-transparent px-6 py-3 text-white transition-all hover:bg-[#2a2a2a] disabled:opacity-50"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={!entryFee || !duration || isPending || isConfirming || isCreating}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              {isPending || isConfirming ? 'Creating...' : 'Create'}
            </button>
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
            Note: You must be the contract owner to fleece people. If you're not, this won't work and you'll look silly.
          </p>
        </div>
      </div>
    </div>
  )
}

