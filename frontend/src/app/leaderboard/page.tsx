'use client'

import { useState } from 'react'
import { useWalletConnection } from '@/hooks/useWalletConnection'

type FilterType = 'all' | 'month' | 'week'

interface LeaderboardEntry {
  rank: number
  address: string
  wins: number
  winnings: string
  winRate: string
}

// MOCK DATA
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: '0x1234...5678', wins: 42, winnings: '$4,200.00', winRate: '65%' },
  { rank: 2, address: '0x8765...4321', wins: 38, winnings: '$3,800.00', winRate: '62%' },
  { rank: 3, address: '0xabcd...ef12', wins: 35, winnings: '$3,500.00', winRate: '58%' },
  { rank: 4, address: '0x9876...1234', wins: 32, winnings: '$3,200.00', winRate: '61%' },
  { rank: 5, address: '0x5678...9abc', wins: 28, winnings: '$2,800.00', winRate: '56%' },
  { rank: 6, address: '0x2468...1357', wins: 25, winnings: '$2,500.00', winRate: '54%' },
  { rank: 7, address: '0x1357...2468', wins: 22, winnings: '$2,200.00', winRate: '52%' },
  { rank: 8, address: '0x3698...7412', wins: 20, winnings: '$2,000.00', winRate: '50%' },
  { rank: 9, address: '0x7531...9642', wins: 18, winnings: '$1,800.00', winRate: '49%' },
  { rank: 10, address: '0x8520...7413', wins: 15, winnings: '$1,500.00', winRate: '47%' },
  { rank: 11, address: '0x9630...8524', wins: 13, winnings: '$1,300.00', winRate: '45%' },
  { rank: 12, address: '0x7410...9630', wins: 11, winnings: '$1,100.00', winRate: '44%' },
  { rank: 13, address: '0x1593...7530', wins: 9, winnings: '$900.00', winRate: '42%' },
  { rank: 14, address: '0x3571...5930', wins: 7, winnings: '$700.00', winRate: '40%' },
  { rank: 15, address: '0x9517...5318', wins: 5, winnings: '$500.00', winRate: '38%' },
]

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const { address } = useWalletConnection()

  // Format user address to match mock data format
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isCurrentUser = (entryAddress: string) => {
    if (!address) return false
    return formatAddress(address) === entryAddress
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Heading */}
        <h1
          className="mb-2 text-center text-4xl text-white"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Winners Circle (You're Not Here)
        </h1>

        {/* Subtext */}
        <p
          className="mb-8 text-center text-sm text-gray-400"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          People who actually win (unlike you)
        </p>

        {/* Filter Buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'all'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            All Time
          </button>

          <button
            onClick={() => setFilter('month')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'month'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            This Month
          </button>

          <button
            onClick={() => setFilter('week')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'week'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            This Week
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-lg border border-[#333333] bg-[#1A1A1A] md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333333] bg-[#0a0a0a]">
                <th
                  className="px-6 py-4 text-center text-sm text-gray-400"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                >
                  Rank
                </th>
                <th
                  className="px-6 py-4 text-center text-sm text-gray-400"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                >
                  Player
                </th>
                <th
                  className="px-6 py-4 text-center text-sm text-gray-400"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                >
                  Wins
                </th>
                <th
                  className="px-6 py-4 text-center text-sm text-gray-400"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                >
                  Winnings
                </th>
                <th
                  className="px-6 py-4 text-center text-sm text-gray-400"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                >
                  Win Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-[#333333] transition-colors hover:bg-[#2a2a2a] ${
                    isCurrentUser(entry.address) ? 'bg-[#2a2a2a]' : ''
                  }`}
                >
                  <td
                    className="px-6 py-4 text-center text-white"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                  >
                    {entry.rank}
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${
                      isCurrentUser(entry.address) ? 'text-[#B8FF00]' : 'text-white'
                    }`}
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                  >
                    {entry.address}
                    {isCurrentUser(entry.address) && (
                      <span className="ml-2 text-xs text-[#B8FF00]">(You)</span>
                    )}
                  </td>
                  <td
                    className="px-6 py-4 text-center text-white"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                  >
                    {entry.wins}
                  </td>
                  <td
                    className="px-6 py-4 text-center text-[#B8FF00]"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                  >
                    {entry.winnings}
                  </td>
                  <td
                    className="px-6 py-4 text-center text-white"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                  >
                    {entry.winRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid */}
        <div className="space-y-4 md:hidden">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`rounded-lg border border-[#333333] bg-[#1A1A1A] p-4 ${
                isCurrentUser(entry.address) ? 'border-[#B8FF00]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="text-2xl text-white"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                  >
                    #{entry.rank}
                  </span>
                  <div>
                    <p
                      className={`text-base ${
                        isCurrentUser(entry.address) ? 'text-[#B8FF00]' : 'text-white'
                      }`}
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                    >
                      {entry.address}
                      {isCurrentUser(entry.address) && (
                        <span className="ml-2 text-xs text-[#B8FF00]">(You)</span>
                      )}
                    </p>
                    <p
                      className="text-sm text-gray-400"
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                    >
                      {entry.wins} wins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

