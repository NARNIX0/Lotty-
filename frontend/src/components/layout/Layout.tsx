'use client'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <main>{children}</main>
    </div>
  )
}

