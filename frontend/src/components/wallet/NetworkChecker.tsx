'use client'

import { useEffect, useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { arcTestnet } from '@/lib/web3'

export function NetworkChecker() {
  const { isConnected, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const [showWarning, setShowWarning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isConnected && chain && chain.id !== arcTestnet.id) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [mounted, isConnected, chain])

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: arcTestnet.id })
    }
  }

  if (!mounted || !showWarning) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="max-w-md rounded-lg border border-[#FF5555] bg-[#1A1A1A] px-6 py-8 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <div className="text-4xl">⚠️</div>
          <h2
            className="text-2xl text-white"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Wrong Network (You're on the Wrong Chain, Genius)
          </h2>
        </div>

        <p
          className="mb-6 text-base text-white"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          You're connected to <span className="text-[#FF5555]">{chain?.name || 'Unknown Network'}</span>.
          <br />
          <br />
          This app only works on <span className="text-[#B8FF00]">Arc Testnet</span> (where you'll lose test money, not real money... yet).
        </p>

        <div className="mb-4 rounded-md border border-[#333333] bg-black px-4 py-3">
          <p
            className="mb-2 text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            Required Network:
          </p>
          <p
            className="text-sm text-[#B8FF00]"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Arc Testnet (Chain ID: 5042002)
          </p>
        </div>

        <button
          onClick={handleSwitchNetwork}
          className="w-full rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-4 text-lg text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Switch to Arc Testnet
        </button>

        <p
          className="mt-4 text-center text-xs text-gray-500"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          MetaMask will prompt you to switch networks
        </p>
      </div>
    </div>
  )
}

