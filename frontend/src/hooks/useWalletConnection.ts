'use client'

import { useAccount, useDisconnect } from 'wagmi'

export function useWalletConnection() {
  const { address, isConnected, isConnecting } = useAccount()
  const { disconnect } = useDisconnect()

  return {
    address,
    isConnected,
    isConnecting,
    disconnect,
  }
}

