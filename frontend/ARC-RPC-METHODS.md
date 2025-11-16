# Arc Testnet RPC Methods

## Standard JSON-RPC Methods

Arc Testnet is **EVM-compatible**, which means it uses the **same JSON-RPC methods** as Ethereum. The method names with "eth" prefix are just **naming conventions** - they work on **all EVM chains**, including:

- Ethereum
- Arc Testnet
- Polygon
- BSC
- Arbitrum
- etc.

## Common Methods (All Work on Arc)

| Method | Description | Works on Arc? |
|--------|-------------|---------------|
| `eth_getTransactionCount` | Get nonce (pending/confirmed) | ✅ Yes |
| `eth_getBalance` | Get balance | ✅ Yes |
| `eth_sendTransaction` | Send transaction | ✅ Yes |
| `eth_estimateGas` | Estimate gas | ✅ Yes |
| `eth_call` | Call contract (read) | ✅ Yes |
| `eth_chainId` | Get chain ID | ✅ Yes |
| `eth_accounts` | Get accounts | ✅ Yes |

## How It Works

1. **You're connected to Arc Testnet** (Chain ID: 5042002)
2. **MetaMask sends RPC calls** to Arc's RPC: `https://rpc.testnet.arc.network`
3. **Arc's RPC responds** using standard JSON-RPC methods
4. **The "eth" prefix** is just a convention - it doesn't mean "Ethereum only"

## Example

```javascript
// This call goes to Arc's RPC (because you're on Arc Testnet)
const nonce = await window.ethereum.request({
  method: 'eth_getTransactionCount', // Standard method name
  params: [address, 'pending']
})
// ↑ This uses Arc's RPC, not Ethereum's!
```

## Verification

You can verify which RPC you're using:

```javascript
// Check chain ID
const chainId = await window.ethereum.request({ method: 'eth_chainId' })
console.log('Chain ID:', parseInt(chainId, 16))
// Should be 5042002 for Arc Testnet
```

## Summary

- ✅ `eth_getTransactionCount` works on Arc Testnet
- ✅ All standard JSON-RPC methods work on Arc
- ✅ The "eth" prefix is just a naming convention
- ✅ Your calls go to Arc's RPC when connected to Arc Testnet

