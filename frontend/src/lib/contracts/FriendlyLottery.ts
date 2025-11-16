export const FRIENDLY_LOTTERY_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export const FRIENDLY_LOTTERY_ABI = [
  {
    "type": "function",
    "name": "getRound",
    "inputs": [{"name": "_roundId", "type": "uint256"}],
    "outputs": [{
      "type": "tuple",
      "components": [
        {"name": "roundId", "type": "uint256"},
        {"name": "entryFee", "type": "uint256"},
        {"name": "startTime", "type": "uint256"},
        {"name": "endTime", "type": "uint256"},
        {"name": "participants", "type": "address[]"},
        {"name": "totalPool", "type": "uint256"},
        {"name": "winner", "type": "address"},
        {"name": "completed", "type": "bool"}
      ]
    }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasParticipantEntered",
    "inputs": [
      {"name": "_roundId", "type": "uint256"},
      {"name": "_participant", "type": "address"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "enterLottery",
    "inputs": [{"name": "_roundId", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "currentRoundId",
    "inputs": [],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const

/**
 * Format USDC amount from bigint to string with 2 decimals
 * USDC has 6 decimals
 */
export function formatUSDC(amount: bigint): string {
  const dollars = Number(amount) / 1_000_000
  return dollars.toFixed(2)
}

/**
 * Parse USDC string amount to bigint
 * "10.00" -> 10000000n
 */
export function parseUSDC(amount: string): bigint {
  const dollars = parseFloat(amount)
  return BigInt(Math.floor(dollars * 1_000_000))
}

