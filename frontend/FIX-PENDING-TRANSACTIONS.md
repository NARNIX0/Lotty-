# Fix: 3 Pending Transactions Blocking New Transaction

## The Problem

You have **3 pending transactions** that are blocking your new approve transaction. MetaMask won't send a new transaction until the previous ones are confirmed or cancelled.

## Solutions

### Option 1: Wait for Transactions to Confirm (Recommended)

1. Open MetaMask
2. Go to **Activity** tab
3. Check the status of the 3 pending transactions
4. Wait for them to confirm (usually takes a few minutes on testnet)

### Option 2: Speed Up or Cancel in MetaMask

If transactions are stuck:

1. Open MetaMask
2. Go to **Activity** tab
3. Click on each pending transaction
4. Options:
   - **Speed Up**: Increase gas fee to prioritize
   - **Cancel**: Replace with a cancel transaction (costs gas)

### Option 3: Reset Account (Last Resort)

If transactions are truly stuck and you can't cancel them:

1. Open MetaMask
2. Go to **Settings** → **Advanced**
3. Scroll down to **Reset Account**
4. Click **Reset Account**
5. **Warning**: This will clear your transaction history, but won't affect your balance or keys

**Note**: Only do this if transactions are stuck for a long time (30+ minutes).

### Option 4: Use Higher Nonce (Advanced)

If you know the transactions are stuck, you can try sending with a higher nonce, but this is risky and not recommended unless you know what you're doing.

## Check Transaction Status

Run this in browser console to see transaction details:

```javascript
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
const address = accounts[0]

// Get transaction count
const pendingNonce = await window.ethereum.request({
  method: 'eth_getTransactionCount',
  params: [address, 'pending']
})
const latestNonce = await window.ethereum.request({
  method: 'eth_getTransactionCount',
  params: [address, 'latest']
})

console.log('Pending nonce:', parseInt(pendingNonce, 16))
console.log('Latest nonce:', parseInt(latestNonce, 16))
console.log('Pending transactions:', parseInt(pendingNonce, 16) - parseInt(latestNonce, 16))
```

## After Fixing

Once pending transactions are cleared:

1. Refresh the page
2. Try "Join Now" again
3. The transaction should work now!

## Prevention

To avoid this in the future:
- Don't click buttons multiple times
- Wait for transactions to confirm before trying again
- Check MetaMask Activity tab before retrying

