import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'
import { injected } from 'wagmi/connectors'

// Define Arc Testnet
export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.arc.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arc Explorer',
      url: 'https://explorer.testnet.arc.network',
    },
  },
  testnet: true,
})

// Create wagmi config
export const config = createConfig({
  chains: [arcTestnet],
  connectors: [
    injected({ target: 'metaMask' }),
  ],
  transports: {
    [arcTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

