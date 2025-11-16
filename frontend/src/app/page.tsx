'use client'

import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { WalletConnect } from '@/components/wallet/WalletConnect'
import Image from 'next/image'

export default function Home() {
  const { isConnected } = useWalletConnection()
  const router = useRouter()

  // Show connected variant instead of redirecting
  if (isConnected) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
        {/* Money background with dark fade gradient */}
        <div className="money-background" />
        
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
            Welcome back, sucker!
          </h1>
          
          <p 
            className="mb-8 text-base text-white/90 md:text-lg"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Your wallet is connected and your money is ready to be redistributed
          </p>
          
          {/* Go to Dashboard Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="group relative w-full overflow-hidden rounded-lg px-8 py-4 text-lg text-black shadow-lg transition-all hover:shadow-xl md:w-auto"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] transition-all group-hover:from-[#E8FFB7] group-hover:to-[#D4FF5E]" />
            <span className="relative z-10">Go to Dashboard</span>
          </button>
          
          <p 
            className="mt-6 max-w-md text-sm text-gray-400"
            style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
          >
            Check how much you've lost, create new ways to lose money, or join someone else's scheme
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
      {/* Money background with dark fade gradient */}
      <div className="money-background" />
      
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
        
        <p 
          className="mb-8 text-base text-white/90 md:text-lg"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          where someone always wins, just not you... yet
        </p>
        
        <h1 
          className="mb-6 text-4xl leading-tight text-white md:text-5xl"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
        >
          Turn your friend group into a casino
        </h1>
        
        <p 
          className="mb-8 text-base text-white/90 md:text-lg"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          Because nothing says "I love you" like taking their money with blockchain
        </p>
        
        <WalletConnect />
        
        <p 
          className="mt-6 max-w-md text-sm text-gray-400"
          style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
        >
          Connect your wallet to monetize your relationships. Each entry is permanently etched on-chain, 
          so your family can see exactly how much you lost. Winners chosen by algorithms that definitely don't favor anyone. Probably.
        </p>
      </div>
    </div>
  )
}
