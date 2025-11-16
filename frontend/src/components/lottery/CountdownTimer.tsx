'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endTime: number // Unix timestamp in seconds
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000)
      const difference = endTime - now

      if (difference <= 0) {
        setTimeLeft('Lottery ended')
        return
      }

      const days = Math.floor(difference / (60 * 60 * 24))
      const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60))
      const minutes = Math.floor((difference % (60 * 60)) / 60)
      const seconds = difference % 60

      const parts = []
      if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
      if (hours > 0 || days > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
      if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)
      parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`)

      setTimeLeft(parts.join(', '))
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  return (
    <p
      className="text-lg text-white"
      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 700 }}
    >
      {timeLeft}
    </p>
  )
}

