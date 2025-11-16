# MetaMask Gas Settings Guide

## Your Current Settings
- **Max base fee**: 165 gwei
- **Priority fee**: 165 gwei  
- **Gas limit**: 60000

## Are These Settings OK?

### ✅ Gas Limit (60000)
- **Status**: Should be sufficient
- **Reason**: ERC20 transfers typically use ~50,000-65,000 gas
- **Recommendation**: Try increasing to **100,000** for safety margin
  - In MetaMask: Click "Edit" on the transaction → Set gas limit to 100000

### ⚠️ Max Base Fee (165 gwei)
- **Status**: Might be too low
- **Reason**: Arc Testnet might have higher base fees
- **Recommendation**: Try **200-250 gwei** to ensure transaction goes through
  - In MetaMask: Click "Edit" → Increase max base fee

### ⚠️ Priority Fee (165 gwei)
- **Status**: Very high (might be unnecessary)
- **Reason**: Priority fee should be 10-20% of base fee, not equal
- **Recommendation**: Try **20-50 gwei** (lower is fine for testnet)
  - In MetaMask: Click "Edit" → Lower priority fee

## Recommended Settings to Try

1. **Gas Limit**: 100000 (safety margin)
2. **Max Base Fee**: 250 gwei (ensures it goes through)
3. **Priority Fee**: 25 gwei (reasonable for testnet)

## However...

**The real issue is likely NOT gas settings.**

The error "Internal JSON-RPC error" (-32603) suggests:
- ❌ Arc's RPC is **rejecting** the transaction entirely
- ❌ Not a gas limit issue (gas estimation works)
- ❌ Not a fee issue (MetaMask would show different error)

This is the same error we got with `approve`, and now with `transfer`. This suggests **Arc's USDC contract has restrictions** on standard ERC20 operations.

## What to Try

1. **First**: Try the higher gas settings above (just in case)
2. **If still fails**: The issue is Arc RPC, not your settings
3. **For hackathon**: Document this as a known Arc limitation

## Quick Test

Run this in browser console to check current network gas prices:

```javascript
(async () => {
  const feeData = await window.ethereum.request({
    method: 'eth_feeHistory',
    params: [1, 'latest', [25, 75]]
  })
  const baseFee = parseInt(feeData.baseFeePerGas[0], 16) / 1e9
  console.log('Current base fee:', baseFee.toFixed(2), 'gwei')
  console.log('Your max:', 165, 'gwei')
  console.log('Recommendation:', Math.ceil(baseFee * 1.5), 'gwei')
})()
```

If the recommended value is much higher than 165, that might be the issue!

