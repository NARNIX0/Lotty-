'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentRoundId } from '@/hooks/useActiveLotteries'

export default function JoinPage() {
  const [lotteryInput, setLotteryInput] = useState('')
  const router = useRouter()
  const { currentRoundId, isLoading } = useCurrentRoundId()

  const handleJoinLatest = () => {
    if (currentRoundId > 0) {
      router.push(`/lottery/${currentRoundId}`)
    } else {
      alert('No active lotteries found. Create one first!')
    }
  }

  const handleJoinById = () => {
    if (!lotteryInput.trim()) {
      alert('Please enter a lottery ID or link')
      return
    }

    // Extract lottery ID from input
    let lotteryId = lotteryInput.trim()

    // If it's a full URL, extract the ID
    if (lotteryId.includes('/lottery/')) {
      const match = lotteryId.match(/\/lottery\/(\d+)/)
      if (match) {
        lotteryId = match[1]
      }
    }

    // Check if it's a valid number
    const id = parseInt(lotteryId)
    if (isNaN(id) || id < 1) {
      alert('Invalid lottery ID. Please enter a valid number or link.')
      return
    }

    // Navigate to lottery
    router.push(`/lottery/${id}`)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setLotteryInput(text)
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />

      <div className="relative z-10 mx-auto max-w-[600px]">
        {/* Heading */}
        <h1
          className="mb-2 text-center text-4xl text-white"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Join Someone's Scheme
        </h1>

        <p
          className="mb-8 text-center text-sm text-gray-400"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          Enter a lottery ID or paste a link to someone else's money grab
        </p>

        {/* Join Latest Section */}
        <div className="mb-8 rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-6">
          <h2
            className="mb-4 text-xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Latest Opportunity to Lose
          </h2>

          {isLoading ? (
            <p
              className="mb-4 text-base text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              Loading...
            </p>
          ) : currentRoundId > 0 ? (
            <>
              <p
                className="mb-4 text-base text-white"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                Current Lottery: <span className="text-[#B8FF00]">#{currentRoundId}</span>
              </p>

              <button
                onClick={handleJoinLatest}
                className="w-full rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
              >
                Join Latest Money Pit
              </button>
            </>
          ) : (
            <p
              className="text-base text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              No active scams yet. Create one to fleece your friends!
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#333333]"></div>
          <span
            className="text-sm text-gray-500"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            OR
          </span>
          <div className="h-px flex-1 bg-[#333333]"></div>
        </div>

        {/* Enter Lottery ID Section */}
        <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-6">
          <h2
            className="mb-4 text-xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Enter Lottery ID or Share Link
          </h2>

          <div className="mb-4">
            <label
              htmlFor="lotteryInput"
              className="mb-2 block text-sm text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              Lottery ID or Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="lotteryInput"
                value={lotteryInput}
                onChange={(e) => setLotteryInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoinById()}
                placeholder="e.g., 1 or https://app.com/lottery/1"
                className="flex-1 rounded-md border border-[#333333] bg-black px-4 py-2 text-white focus:border-[#B8FF00] focus:outline-none"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              />
              <button
                onClick={handlePaste}
                className="rounded-md border border-[#333333] bg-black px-4 py-2 text-white transition-colors hover:bg-[#2a2a2a]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                title="Paste from clipboard"
              >
                📋
              </button>
            </div>
          </div>

          <button
            onClick={handleJoinById}
            disabled={!lotteryInput.trim()}
            className="w-full rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Go to Lottery
          </button>

          {/* Examples */}
          <div className="mt-4 rounded-md bg-black/50 px-4 py-3">
            <p
              className="mb-2 text-xs text-gray-500"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Examples:
            </p>
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              • Just the ID: <code className="text-[#B8FF00]">1</code>
            </p>
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              • Full link: <code className="text-[#B8FF00]">https://yourapp.com/lottery/1</code>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Don't have a lottery to lose money in?{' '}
            <button
              onClick={() => router.push('/dashboard')}
              className="text-[#B8FF00] hover:underline"
            >
              Start your own scam
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

