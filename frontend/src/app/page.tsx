'use client'

import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import Image from 'next/image'

export default function Home() {
  const { isConnected } = useWalletConnection()
  const router = useRouter()

  // Redirect to dashboard if connected
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, router])

  if (isConnected) {
    return null // Will redirect
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
      {/* Extended linear gradient background - more subtle and larger radius */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3a] via-[#2a2a2a] via-30% to-[#1a1a1a] to-60% to-black" />
      
      {/* Subtle wide glow effect */}
      <div className="absolute left-1/2 top-1/3 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[#B8FF00] opacity-5 blur-[120px]" />
      
      <div className="relative z-10 flex max-w-3xl flex-col items-center justify-center text-center">
        {/* Big centered logo */}
        <Image 
          src="/lotty-logo.png" 
          alt="Lotty" 
          width={700} 
          height={233}
          priority
          className="mb-12 h-auto w-80 md:w-[500px]"
        />
        
        <h1 
          className="mb-6 text-4xl leading-tight text-white md:text-5xl"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Fair, transparent, automated friend lotteries
        </h1>
        
        <p 
          className="mb-8 text-base text-white/90 md:text-lg"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          Create or join a lottery pool and let smart contracts manage everything
        </p>
        
        <WalletConnect />
        
        <p 
          className="mt-6 max-w-md text-sm text-gray-400"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          Connect your wallet to create lottery pools with friends. Each entry is recorded on-chain, 
          and winners are selected automatically using verifiable randomness.
        </p>
      </div>
    </div>
  )
}
