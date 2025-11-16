'use client'

import { Header } from './Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>{children}</main>
    </div>
  )
}

