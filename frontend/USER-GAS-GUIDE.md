# Gas Settings Guide for Users

## ⚠️ Important: Adjust Gas Settings in MetaMask

When joining a lottery, you may need to adjust your gas settings in MetaMask for the transaction to succeed.

## Recommended Settings

When MetaMask shows the transaction popup:

1. Click **"Edit"** button
2. Set these values:
   - **Gas Limit**: `100000` (or higher)
   - **Max Base Fee**: `250` gwei (or higher)
   - **Priority Fee**: `25` gwei (or lower, 20-50 range is fine)
3. Click **"Save"** then **"Confirm"**

## Why?

Arc Testnet requires higher gas limits and base fees than some other networks. These settings ensure your transaction goes through successfully.

## What Happens If Settings Are Too Low?

- ❌ Gas limit too low (e.g., 60000): Transaction will fail
- ❌ Max base fee too low (e.g., 165 gwei): Transaction will be rejected
- ⚠️ Priority fee too high (e.g., 165 gwei): Unnecessary, but won't cause failure

## Quick Reference

| Setting | Too Low | Recommended | Too High |
|---------|---------|-------------|----------|
| Gas Limit | 60000 | **100000** | N/A (higher is fine) |
| Max Base Fee | 165 gwei | **250 gwei** | N/A (higher is fine) |
| Priority Fee | 1 gwei | **25 gwei** | 165 gwei (unnecessary) |

## Need Help?

If you're still having issues:
1. Make sure you're on Arc Testnet (not Ethereum mainnet)
2. Ensure you have enough USDC for gas fees
3. Try the recommended settings above

