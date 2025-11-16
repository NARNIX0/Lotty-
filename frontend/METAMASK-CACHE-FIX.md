# MetaMask Cache Fix for "Internal JSON-RPC Error"

Based on [Stack Overflow solution](https://stackoverflow.com/questions/75347648/internal-json-rpc-error-when-calling-solidity-smart-contract-function):

## The Problem

MetaMask stores the last block number for each network and sends it with every transaction. If:
- You added Arc Testnet to MetaMask
- Did some transactions
- The RPC node had issues or was restarted
- MetaMask still has the old block number cached

This causes "Internal JSON-RPC error" because MetaMask is sending an invalid block number.

---

## Solution: Reset Arc Testnet in MetaMask

### Step 1: Remove Arc Testnet from MetaMask

1. Open MetaMask
2. Click the network dropdown (top of MetaMask)
3. Find "Arc Testnet" in the list
4. Click the **three dots** (⋮) next to it
5. Select **"Remove network"** or **"Delete"**

### Step 2: Re-add Arc Testnet

1. In MetaMask, click **"Add network"** or **"Add a network manually"**
2. Enter these details:
   - **Network Name**: `Arc Testnet`
   - **RPC URL**: `https://rpc.testnet.arc.network`
   - **Chain ID**: `5042002`
   - **Currency Symbol**: `USDC`
   - **Block Explorer URL**: `https://testnet.arcscan.app`
   - **Decimals**: `6` (for USDC)

3. Click **"Save"**

### Step 3: Verify Connection

1. Make sure you're connected to Arc Testnet
2. Check that your USDC balance shows correctly
3. Try the transaction again

---

## Alternative: Use the "Add Arc Testnet" Button

If you still have the "Add Arc Testnet to MetaMask" button on the landing page, you can use that instead - it will add the network with the correct settings.

---

## Why This Works

MetaMask caches network state (including block numbers) for performance. When the RPC node restarts or has issues, MetaMask might still be using stale cached data. Removing and re-adding the network forces MetaMask to:
- Clear all cached data for that network
- Re-fetch current network state
- Use fresh block numbers

---

## If This Doesn't Work

1. **Clear MetaMask cache completely**:
   - Settings → Advanced → Reset Account (this clears transaction history)
   - Or reinstall MetaMask extension

2. **Check RPC is working**:
   - Visit: https://rpc.testnet.arc.network
   - Should return JSON-RPC response

3. **Try a different RPC** (if Arc provides multiple):
   - Check Arc docs for alternative RPC URLs

---

## References

- [Stack Overflow Solution](https://stackoverflow.com/questions/75347648/internal-json-rpc-error-when-calling-solidity-smart-contract-function)
- [Arc Network Docs](https://docs.arc.network/arc/references/contract-addresses#usdc)

