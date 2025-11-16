# Fix: Use Explicit Gas Limit

## The Discovery

✅ **Gas estimation works!** (`0xdbb1` = 56,241 gas)

This means:
- The transaction is **valid**
- The contract **accepts** the approve call
- The RPC node **can process** it

## The Problem

The issue is likely that MetaMask/wagmi isn't setting the gas limit correctly, or there's a mismatch between the estimate and what's being sent.

## The Fix

I've updated the code to use an **explicit gas limit** based on the successful estimate:

```typescript
const gasLimit = BigInt(60000) // 56,241 + buffer
approve({
  gas: gasLimit,
  // ... rest of config
})
```

## Why This Should Work

1. Gas estimation succeeded → Transaction is valid
2. Explicit gas limit → MetaMask won't try to estimate again
3. Buffer added → Accounts for any variations

## Next Steps

1. **Try the transaction again** - It should now work with explicit gas
2. **If it still fails**, check:
   - Pending transactions in MetaMask (clear them)
   - Network connection (refresh page)
   - MetaMask cache (remove/re-add Arc Testnet)

## Alternative: Check Pending Transactions

If it still fails, you might have a pending transaction blocking this one:

```javascript
// In browser console
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
const txCount = await window.ethereum.request({
  method: 'eth_getTransactionCount',
  params: [accounts[0], 'pending']
})
console.log('Pending transaction count:', parseInt(txCount, 16))
```

If the count is higher than expected, you might need to wait for pending transactions to confirm.

