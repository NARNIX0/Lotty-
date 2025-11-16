import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'
import { injected } from 'wagmi/connectors'

// Define Arc Testnet - ONLY network we support
// IMPORTANT: USDC is the native gas token on Arc Testnet
export const arcTestnet = defineChain({
  id: 5042002,
  name: 'Arc Testnet',
  nativeCurrency: {
    decimals: 6, // USDC uses 6 decimals on Arc
    name: 'USDC',
    symbol: 'USDC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.arc.network'],
    },
    public: {
      http: ['https://rpc.testnet.arc.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arcscan',
      url: 'https://testnet.arcscan.app',
    },
  },
  testnet: true,
})

// Create wagmi config - Arc Testnet ONLY
export const config = createConfig({
  chains: [arcTestnet], // ONLY Arc Testnet
  connectors: [
    injected({ 
      target: 'metaMask',
      shimDisconnect: true,
    }),
  ],
  transports: {
    [arcTestnet.id]: http('https://rpc.testnet.arc.network'),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

