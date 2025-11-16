'use client'

import { CountdownTimer } from '@/components/lottery/CountdownTimer'
import { useParams } from 'next/navigation'
import { useGetLottery, useHasEntered, useEnterLottery } from '@/hooks/useSmartContract'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { formatUSDC } from '@/lib/contracts/FriendlyLottery'
import { useState } from 'react'

export default function LotteryPage() {
  const params = useParams()
  const roundId = parseInt(params.id as string)
  
  const { address } = useWalletConnection()
  const { lottery, isLoading } = useGetLottery(roundId)
  const { hasEntered } = useHasEntered(roundId, address)
  const { mutate: enterLottery, isPending, stage } = useEnterLottery(roundId)
  const [copied, setCopied] = useState(false)

  if (isLoading || !lottery) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
        <div className="money-background" />
        <div className="relative z-10 mx-auto max-w-[1200px] flex items-center justify-center">
          <p className="text-white" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
            Loading your impending loss...
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
    console.log('Join button clicked!')
    console.log('isPending:', isPending)
    console.log('isActive:', isActive)
    console.log('hasEntered:', hasEntered)
    console.log('entryFee:', lottery.entryFee)
    
    if (!isPending && isActive && !hasEntered) {
      console.log('Calling enterLottery with fee:', lottery.entryFee)
      enterLottery(lottery.entryFee)
    } else {
      console.log('Button disabled - conditions not met')
    }
  }

  const handleCopyLink = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy link. Please copy manually.')
    }
  }

        const getButtonText = () => {
          if (isPending) {
            if (stage === 'transferring') return 'Transferring USDC...'
            if (stage === 'entering') return 'Entering lottery...'
            return 'Processing...'
          }
          if (hasEntered) return "You've entered"
          if (!isActive) return 'Lottery ended'
          return 'Join Now'
        }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />

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
            {isActive ? 'Taking Your Money' : 'Closed (Someone Won)'}
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
            Money Pool (Not Yours)
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
            {participants} people have thrown money away
          </p>

          {/* Your Odds */}
          <p
            className="mt-2 text-base text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Your odds of winning: {odds} (statistically, you'll lose)
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
            {isPending 
              ? (stage === 'transferring' ? 'Sending Your Money...' : stage === 'entering' ? 'Entering the Void...' : 'Processing...')
              : hasEntered 
                ? "You've Already Lost"
                : !isActive 
                  ? 'Too Late, Someone Won'
                  : 'Pay to Lose'}
          </button>

          {/* Lottery ID and Share */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <p
              className="text-xs text-gray-500"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              Lottery ID: {roundId}
            </p>
            
            {/* Share Button */}
            <button
              onClick={handleCopyLink}
              className="rounded-lg border border-[#B8FF00] bg-black px-6 py-2 text-sm text-[#B8FF00] transition-all hover:bg-[#B8FF00] hover:text-black"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              {copied ? '✓ Copied!' : '📋 Copy Share Link'}
            </button>
            
            {copied && (
              <p
                className="text-xs text-[#B8FF00]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                Share this link to invite friends to lose money with you!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

