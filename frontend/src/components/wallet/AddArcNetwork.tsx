'use client'

import { arcTestnet } from '@/lib/web3'

export function AddArcNetwork() {
  const addArcTestnet = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed')
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${arcTestnet.id.toString(16)}`, // Convert to hex
            chainName: arcTestnet.name,
            nativeCurrency: {
              name: 'USDC',
              symbol: 'USDC',
              decimals: 6,
            },
            rpcUrls: [arcTestnet.rpcUrls.default.http[0]],
            blockExplorerUrls: [arcTestnet.blockExplorers.default.url],
          },
        ],
      })
      alert('Arc Testnet added successfully!')
    } catch (error: any) {
      if (error.code === 4001) {
        alert('You rejected the request to add Arc Testnet')
      } else {
        console.error('Failed to add Arc Testnet:', error)
        alert('Failed to add Arc Testnet. Please add it manually.')
      }
    }
  }

  return (
    <button
      onClick={addArcTestnet}
      className="text-sm text-[#B8FF00] hover:underline"
      style={{ fontFamily: 'AEONIK, sans-serif', fontWeight: 400 }}
    >
      Add Arc Testnet to MetaMask
    </button>
  )
}

