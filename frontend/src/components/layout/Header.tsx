'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWalletConnection } from '@/hooks/useWalletConnection'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/join', label: 'Join' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
]

export function Header() {
  const pathname = usePathname()
  const { isConnected } = useWalletConnection()
  const [mounted, setMounted] = useState(false)

  // Only render navigation after component mounts on client
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="px-6 py-4 shadow-lg" style={{ backgroundColor: '#2a2a2a' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <Image 
            src="/lotty-logo.png" 
            alt="Lotty" 
            width={180} 
            height={60}
            priority
            className="h-auto w-32 md:w-44 cursor-pointer"
          />
        </Link>

        {/* Navigation Links - Only show if wallet connected and mounted */}
        {mounted && isConnected && (
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mx-4 text-base transition-all hover:text-[#B8FF00] ${
                  pathname === link.href
                    ? 'text-[#B8FF00]'
                    : 'text-white opacity-70'
                }`}
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

