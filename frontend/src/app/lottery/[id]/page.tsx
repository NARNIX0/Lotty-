'use client'

import { CountdownTimer } from '@/components/lottery/CountdownTimer'
import { useParams } from 'next/navigation'

export default function LotteryPage() {
  const params = useParams()
  const id = params.id

  // MOCK DATA
  const entryFee = '10.00'
  const totalPool = '50.00'
  const endTime = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
  const participants = 5
  const isActive = true
  const hasEntered = false

  const odds = `1 in ${participants} chance`

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
            disabled={hasEntered || !isActive}
            className={`mt-8 w-full rounded-lg px-8 py-4 text-lg transition-all md:w-auto ${
              hasEntered
                ? 'cursor-not-allowed bg-gray-600 text-white opacity-50'
                : !isActive
                ? 'cursor-not-allowed bg-gray-600 text-white opacity-50'
                : 'bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] text-black shadow-md hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            {hasEntered
              ? "You've entered"
              : !isActive
              ? 'Lottery ended'
              : 'Join Now'}
          </button>

          {/* Lottery ID for reference */}
          <p
            className="mt-8 text-xs text-gray-500"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Lottery ID: {id}
          </p>
        </div>
      </div>
    </div>
  )
}

