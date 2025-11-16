'use client'

import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CreateLotteryModal } from '@/components/lottery/CreateLotteryModal'
import { useCurrentRoundId } from '@/hooks/useActiveLotteries'

export default function Dashboard() {
  const { address, isConnected } = useWalletConnection()
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { currentRoundId, isLoading } = useCurrentRoundId()

  // Redirect to home if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null // Will redirect
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />
      
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Section 1: User Greeting */}
        <div className="mb-8">
          <h1 
            className="text-center text-4xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Hello, {address?.slice(0, 6)}...{address?.slice(-4)}
          </h1>
          <p 
            className="mt-2 text-center text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Here's how much you've lost to your "friends"
          </p>
        </div>

        {/* Section 2: Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Times You've Paid
            </p>
            <p className="mt-2 text-4xl text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}>
              0
            </p>
          </div>
          
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Total Won (LOL)
            </p>
            <p className="mt-2 text-4xl text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}>
              $0.00
            </p>
          </div>
          
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Win Rate (Optimistic)
            </p>
            <p className="mt-2 text-4xl text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}>
              0%
            </p>
          </div>
        </div>

        {/* Section 3: Active Lottery */}
        <div className="mb-8 rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-8 text-center">
          <h2 
            className="mb-6 text-xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Current Money Pit
          </h2>
          
          <p 
            className="text-5xl text-[#B8FF00]"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            $0.00
          </p>
          
          <p 
            className="mt-4 text-base text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Entry fee: $0.00
          </p>
          
          <p 
            className="mt-2 text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            0 people have thrown money away yet
          </p>
          
          <div className="mt-6 flex flex-col items-center gap-4">
            {/* Show current lottery info */}
            {!isLoading && currentRoundId > 0 && (
              <p
                className="text-sm text-gray-400"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                Latest Lottery: #{currentRoundId}
              </p>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
              >
                Create Money Trap
              </button>
              
              <button
                onClick={() => router.push('/join')}
                className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
              >
                Throw Money Away
              </button>
            </div>
          </div>
        </div>

        {/* Create Lottery Modal */}
        <CreateLotteryModal 
          isOpen={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
        />

        {/* Section 4: Navigation Links */}
        <div className="flex justify-center gap-8">
          <Link
            href="/leaderboard"
            className="text-white transition-colors hover:text-[#B8FF00] hover:underline"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            See Who's Winning (Not You)
          </Link>
          
          <Link
            href="/history"
            className="text-white transition-colors hover:text-[#B8FF00] hover:underline"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Review Your Losses
          </Link>
          
          <Link
            href="/settings"
            className="text-white transition-colors hover:text-[#B8FF00] hover:underline"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}

