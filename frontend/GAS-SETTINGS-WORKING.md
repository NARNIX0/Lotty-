# Working Gas Settings for Arc Testnet

## ✅ Confirmed Working Settings

When joining a lottery, use these MetaMask gas settings:

- **Gas Limit**: 100000 (or higher)
- **Max Base Fee**: 250 gwei (or higher)
- **Priority Fee**: 25 gwei (or lower, 20-50 range is fine)

## What Was Wrong

- ❌ Gas Limit: 60000 (too low)
- ❌ Max Base Fee: 165 gwei (too low for Arc Testnet)
- ❌ Priority Fee: 165 gwei (unnecessarily high)

## How to Set in MetaMask

1. Click "Join Now" button
2. When MetaMask popup appears, click **"Edit"**
3. Set:
   - Gas limit: `100000`
   - Max base fee: `250` gwei
   - Priority fee: `25` gwei
4. Click "Save" then "Confirm"

## Note

The transaction should now go through successfully! The issue was gas settings, not Arc RPC limitations.

