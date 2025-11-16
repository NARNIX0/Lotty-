'use client'

import { useState, useEffect } from 'react'
import { useWalletConnection } from '@/hooks/useWalletConnection'

export default function SettingsPage() {
  const { address, isConnected, disconnect } = useWalletConnection()
  const [username, setUsername] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [saved, setSaved] = useState(false)

  // Load username from localStorage on mount
  useEffect(() => {
    if (address) {
      const storedUsername = localStorage.getItem(`username_${address}`)
      if (storedUsername) {
        setUsername(storedUsername)
      }
    }
  }, [address])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleChangeWallet = () => {
    // This will open MetaMask to switch accounts
    if (window.ethereum) {
      window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSaveProfile = () => {
    if (address) {
      // Save to localStorage (keyed by wallet address)
      localStorage.setItem(`username_${address}`, username)
      setSaved(true)
      
      // Hide success message after 2 seconds
      setTimeout(() => setSaved(false), 2000)
    }
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
          Settings (Where Dreams Go to Die)
        </h1>

        {/* Sections Container */}
        <div className="flex flex-col gap-6">
          {/* Section 1: Wallet */}
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-6">
            <h2
              className="mb-4 text-xl text-white"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Wallet
            </h2>

            {isConnected ? (
              <>
                <p
                  className="mb-4 text-base text-white"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                >
                  Connected: <span className="text-[#B8FF00]">{formatAddress(address!)}</span>
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleChangeWallet}
                    className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                  >
                    Change Wallet
                  </button>

                  <button
                    onClick={handleDisconnect}
                    className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                    style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
                  >
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <p
                className="text-base text-gray-400"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                No wallet connected
              </p>
            )}
          </div>

          {/* Section 2: Profile */}
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-6">
            <h2
              className="mb-4 text-xl text-white"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Profile
            </h2>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="mb-2 block text-sm text-gray-400"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-md border border-[#333333] bg-black px-4 py-2 text-white focus:border-[#B8FF00] focus:outline-none md:w-auto md:min-w-[300px]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveProfile}
                className="rounded-lg bg-gradient-to-r from-[#D4FF5E] to-[#B8FF00] px-6 py-3 text-black shadow-md transition-all hover:shadow-lg hover:from-[#E8FFB7] hover:to-[#D4FF5E]"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
              >
                Save
              </button>
              {saved && (
                <span
                  className="text-sm text-[#B8FF00]"
                  style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
                >
                  ✓ Saved!
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Preferences */}
          <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] px-6 py-6">
            <h2
              className="mb-4 text-xl text-white"
              style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
            >
              Preferences
            </h2>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="h-5 w-5 cursor-pointer rounded border-[#333333] bg-black text-[#B8FF00] focus:ring-[#B8FF00] focus:ring-offset-0"
              />
              <label
                htmlFor="darkMode"
                className="cursor-pointer text-base text-white"
                style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
              >
                Dark Mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

