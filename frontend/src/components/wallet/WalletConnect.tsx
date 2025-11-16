'use client'

import { useConnect, useDisconnect } from 'wagmi'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useState } from 'react'

export function WalletConnect() {
  const { address, isConnected, isConnecting } = useWalletConnection()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleConnect = () => {
    setLocalError(null)
    const connector = connectors[0] // MetaMask
    if (connector) {
      connect({ connector })
    } else {
      setLocalError('MetaMask not found. Please install MetaMask.')
    }
  }

  const handleDisconnect = () => {
    setLocalError(null)
    disconnect()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Show error if exists
  if (error || localError) {
    return (
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleConnect}
          className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Connect Wallet
        </button>
        <p className="text-xs text-red-500" style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}>
          {localError || error?.message || 'Connection failed'}
        </p>
      </div>
    )
  }

  // Loading state
  if (isConnecting) {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 opacity-75"
        style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
        Connecting...
      </button>
    )
  }

  // Connected state
  if (isConnected && address) {
    return (
      <button
        onClick={handleDisconnect}
        className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
        style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
      >
        {formatAddress(address)}
      </button>
    )
  }

  // Not connected state
  return (
    <button
      onClick={handleConnect}
      className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
    >
      Connect Wallet
    </button>
  )
}

