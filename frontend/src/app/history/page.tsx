'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FilterType = 'all' | 'won' | 'lost' | 'pending'
type StatusType = 'won' | 'lost' | 'pending'

interface HistoryEntry {
  id: number
  lotteryId: number
  date: string
  fee: string
  status: StatusType
}

// MOCK DATA
const mockHistory: HistoryEntry[] = [
  { id: 1, lotteryId: 5, date: 'Nov 16, 2025', fee: '$10.00', status: 'won' },
  { id: 2, lotteryId: 4, date: 'Nov 15, 2025', fee: '$10.00', status: 'lost' },
  { id: 3, lotteryId: 3, date: 'Nov 14, 2025', fee: '$15.00', status: 'lost' },
  { id: 4, lotteryId: 2, date: 'Nov 13, 2025', fee: '$10.00', status: 'won' },
  { id: 5, lotteryId: 1, date: 'Nov 12, 2025', fee: '$20.00', status: 'pending' },
  { id: 6, lotteryId: 7, date: 'Nov 11, 2025', fee: '$10.00', status: 'lost' },
  { id: 7, lotteryId: 6, date: 'Nov 10, 2025', fee: '$15.00', status: 'won' },
  { id: 8, lotteryId: 8, date: 'Nov 9, 2025', fee: '$10.00', status: 'lost' },
]

export default function HistoryPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const router = useRouter()

  // Filter entries based on selected filter
  const filteredEntries = mockHistory.filter((entry) => {
    if (filter === 'all') return true
    return entry.status === filter
  })

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'won':
        return 'text-[#B8FF00]'
      case 'lost':
        return 'text-gray-400'
      case 'pending':
        return 'text-orange-400'
      default:
        return 'text-white'
    }
  }

  const getStatusText = (status: StatusType) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handleCardClick = (lotteryId: number) => {
    router.push(`/lottery/${lotteryId}`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-8">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Heading */}
        <h1
          className="mb-8 text-center text-4xl text-white"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Your Loss History
        </h1>

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
            All
          </button>

          <button
            onClick={() => setFilter('won')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'won'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Won
          </button>

          <button
            onClick={() => setFilter('lost')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'lost'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Lost
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`rounded-lg px-6 py-3 text-sm transition-all ${
              filter === 'pending'
                ? 'bg-[#B8FF00] text-black shadow-md'
                : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
            }`}
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Pending
          </button>
        </div>

        {/* Entry Cards */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-8 text-center">
              <p
                className="text-gray-400"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                No losses recorded yet (give it time)
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => handleCardClick(entry.lotteryId)}
                className="cursor-pointer rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-4 transition-all hover:border-[#B8FF00] hover:bg-[#2a2a2a]"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  {/* Left side: Info */}
                  <div className="flex flex-col gap-1">
                    <p
                      className="text-sm text-gray-400"
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                    >
                      {entry.date}
                    </p>
                    <p
                      className="text-lg text-white"
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                    >
                      Lottery #{entry.lotteryId}
                    </p>
                    <p
                      className="text-base text-white"
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                    >
                      Entry fee: {entry.fee}
                    </p>
                  </div>

                  {/* Right side: Status */}
                  <div>
                    <p
                      className={`text-lg ${getStatusColor(entry.status)}`}
                      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                    >
                      {getStatusText(entry.status)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty state message if no data */}
        {mockHistory.length === 0 && (
          <div className="mt-12 text-center">
            <p
              className="text-gray-400"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
            >
              You haven't lost any money yet (what are you waiting for?)
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

