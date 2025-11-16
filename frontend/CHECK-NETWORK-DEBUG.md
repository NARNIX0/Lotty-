# Debug: Check Network in Browser

## Open Browser Console (F12) and run:

```javascript
// Check current chain ID
window.ethereum.request({ method: 'eth_chainId' }).then(console.log)

// Should show: "0x4cf452" (Arc Testnet = 5042002 in hex)
// If shows: "0x1" → Ethereum Mainnet (WRONG!)

// Check connected accounts
window.ethereum.request({ method: 'eth_accounts' }).then(console.log)

// Check network version
window.ethereum.request({ method: 'net_version' }).then(console.log)

// Should show: "5042002"
// If shows: "1" → Ethereum Mainnet (WRONG!)
```

---

## What to Screenshot for Me:

When you click "Create Lottery" and MetaMask opens:

**Take a screenshot showing:**
1. The network name (top left in MetaMask)
2. The "To" address (should be your lottery contract)
3. The function name (should show "createRound" or "Create Round")
4. The gas fee (in ETH - this is normal!)

That will help me see exactly what's happening!

---

## Expected Values:

| Field | Expected Value |
|-------|----------------|
| Network | Arc Testnet |
| Chain ID | 5042002 |
| To Address | 0x60B4E3e62A1E56FfC890d03742e158cf002e3047 |
| Function | createRound |
| Gas Token | ETH (CORRECT!) |

---

**Important**: ETH for gas is CORRECT! The lottery uses USDC, but gas is always paid in ETH.

