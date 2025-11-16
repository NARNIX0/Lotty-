'use client'

import Image from 'next/image'

export function Header() {
  return (
    <header className="bg-gradient-to-b from-[#1a1a1a] to-black px-6 py-4 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Image 
          src="/lotty-logo.png" 
          alt="Lotty" 
          width={180} 
          height={60}
          priority
          className="h-auto w-32 md:w-44"
        />
      </div>
    </header>
  )
}

