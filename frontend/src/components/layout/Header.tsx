'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWalletConnection } from '@/hooks/useWalletConnection'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
]

export function Header() {
  const pathname = usePathname()
  const { isConnected } = useWalletConnection()

  return (
    <header className="bg-gradient-to-b from-[#1a1a1a] to-black px-6 py-4 shadow-lg">
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

        {/* Navigation Links - Only show if wallet connected */}
        {isConnected && (
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

