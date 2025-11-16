'use client'

import { CountdownTimer } from '@/components/lottery/CountdownTimer'
import { useParams } from 'next/navigation'
import { useGetLottery, useHasEntered, useEnterLottery } from '@/hooks/useSmartContract'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { formatUSDC } from '@/lib/contracts/FriendlyLottery'

export default function LotteryPage() {
  const params = useParams()
  const roundId = parseInt(params.id as string)
  
  const { address } = useWalletConnection()
  const { lottery, isLoading } = useGetLottery(roundId)
  const { hasEntered } = useHasEntered(roundId, address)
  const { mutate: enterLottery, isPending, stage } = useEnterLottery(roundId)

  if (isLoading || !lottery) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black" />
        <div className="relative z-10 mx-auto max-w-[1200px] flex items-center justify-center">
          <p className="text-white" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
            Loading lottery...
          </p>
        </div>
      </div>
    )
  }

  // Extract lottery data
  const entryFee = formatUSDC(lottery.entryFee)
  const totalPool = formatUSDC(lottery.totalPool)
  const endTime = Number(lottery.endTime)
  const participants = lottery.participants.length
  const isActive = !lottery.completed && endTime > Math.floor(Date.now() / 1000)
  
  const odds = participants > 0 ? `1 in ${participants} chance` : 'Be the first!'

  const handleJoin = () => {
    if (!isPending && isActive && !hasEntered) {
      enterLottery(lottery.entryFee)
    }
  }

  const getButtonText = () => {
    if (isPending) {
      if (stage === 'approving') return 'Approving USDC...'
      if (stage === 'entering') return 'Entering lottery...'
      return 'Processing...'
    }
    if (hasEntered) return "You've entered"
    if (!isActive) return 'Lottery ended'
    return 'Join Now'
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <div
            className={`mb-6 rounded-full px-4 py-2 text-sm ${
              isActive
                ? 'bg-[#B8FF00] text-black'
                : 'bg-gray-600 text-white'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            {isActive ? 'Active' : 'Closed'}
          </div>

          {/* Large Pool Amount */}
          <p
            className="text-5xl text-[#B8FF00]"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            ${totalPool}
          </p>

          {/* Label */}
          <p
            className="mt-2 text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Total Pool
          </p>

          {/* Entry Fee */}
          <p
            className="mt-6 text-xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Entry fee: ${entryFee}
          </p>

          {/* Countdown Timer */}
          <div className="mt-4">
            <CountdownTimer endTime={endTime} />
          </div>

          {/* Participants */}
          <p
            className="mt-6 text-base text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            {participants} people joined
          </p>

          {/* Your Odds */}
          <p
            className="mt-2 text-base text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Your odds: {odds}
          </p>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={hasEntered || !isActive || isPending}
            className={`mt-8 w-full rounded-lg px-8 py-4 text-lg transition-all md:w-auto ${
              hasEntered || !isActive || isPending
                ? 'cursor-not-allowed bg-gray-600 text-white opacity-50'
                : 'bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] text-black shadow-md hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            {getButtonText()}
          </button>

          {/* Lottery ID for reference */}
          <p
            className="mt-8 text-xs text-gray-500"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Lottery ID: {roundId}
          </p>
        </div>
      </div>
    </div>
  )
}

