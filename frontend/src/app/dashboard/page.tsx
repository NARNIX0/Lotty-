'use client'

import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const { address, isConnected } = useWalletConnection()
  const router = useRouter()

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
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black" />
      
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Section 1: User Greeting */}
        <div className="mb-8">
          <h1 
            className="text-2xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Hello, {address?.slice(0, 6)}...{address?.slice(-4)}
          </h1>
          <p 
            className="mt-1 text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Your lottery stats
          </p>
        </div>

        {/* Section 2: Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Total Entries
            </p>
            <p className="mt-2 text-4xl text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}>
              0
            </p>
          </div>
          
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Total Won
            </p>
            <p className="mt-2 text-4xl text-[#B8FF00]" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}>
              $0.00
            </p>
          </div>
          
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
              Win Rate
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
            Active Lottery
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
            0 people joined
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Create Lottery
            </button>
            
            <button
              className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Join Lottery
            </button>
          </div>
        </div>

        {/* Section 4: Navigation Links */}
        <div className="flex justify-center gap-8">
          <Link
            href="/leaderboard"
            className="text-white transition-colors hover:text-[#B8FF00] hover:underline"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            View Leaderboard
          </Link>
          
          <Link
            href="/history"
            className="text-white transition-colors hover:text-[#B8FF00] hover:underline"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            View History
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

