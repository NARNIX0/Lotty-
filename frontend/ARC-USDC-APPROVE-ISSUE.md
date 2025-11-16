# Arc USDC Approve Issue - Summary

## The Problem

- ✅ Gas estimation **works** (`0xdbb1` = 56,241 gas)
- ✅ No pending transactions blocking
- ✅ On correct network (Arc Testnet)
- ✅ Has USDC balance
- ❌ Actual transaction **fails** with "Internal JSON-RPC error"

## What We've Tried

1. ✅ Removed explicit `chainId` - let wagmi use connected chain
2. ✅ Added explicit gas limit (60,000)
3. ✅ Cleared pending transactions
4. ✅ Enhanced error logging
5. ✅ Verified network and balance

## Possible Causes

1. **Wagmi transaction formatting** - Wagmi might be adding something that Arc's RPC rejects
2. **Blocklist enforcement** - Arc might be blocking at RPC level (but gas estimate works?)
3. **Transaction value field** - Maybe need to explicitly set `value: 0`
4. **Nonce issue** - Even though pending count is 0, there might be a nonce mismatch

## Next Steps

### Option 1: Try Direct MetaMask (Bypass Wagmi)

I've added a fallback that tries direct MetaMask if wagmi fails. This will help us see if it's a wagmi issue.

### Option 2: Check Allowance First

Maybe we already have allowance and don't need to approve:

```typescript
// Check current allowance
const { data: allowance } = useReadContract({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'allowance',
  args: [address, FRIENDLY_LOTTERY_ADDRESS],
})

if (allowance && allowance >= entryFee) {
  // Skip approve, go straight to enter
} else {
  // Need to approve
}
```

### Option 3: Contact Arc Support

This might be a known issue with Arc's USDC contract. Check:
- Arc Discord
- Arc GitHub issues
- Arc documentation for known limitations

### Option 4: Try Different Amount

Maybe try a smaller amount first to see if it's amount-specific:

```typescript
// Try 0.1 USDC first
const testAmount = BigInt(100000) // 0.1 USDC
```

## Current Status

The fallback direct MetaMask call has been added. Try the transaction again and see if:
1. Wagmi still fails
2. Direct MetaMask call works (if it tries the fallback)

This will help us determine if it's a wagmi-specific issue or an Arc RPC issue.

