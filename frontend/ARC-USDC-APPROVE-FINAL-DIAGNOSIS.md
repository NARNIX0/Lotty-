# Arc USDC Approve - Final Diagnosis

## The Problem

**Both wagmi AND direct MetaMask fail** with "Internal JSON-RPC error" (-32603)

This means:
- ❌ **NOT a wagmi issue** - Direct MetaMask also fails
- ❌ **NOT a transaction format issue** - Gas estimation works
- ✅ **Arc RPC is rejecting the transaction** at the node level

## What Works vs What Doesn't

| Operation | Status | Notes |
|-----------|--------|-------|
| Gas estimation (`eth_estimateGas`) | ✅ Works | Returns 56,241 gas |
| Transaction sending (`eth_sendTransaction`) | ❌ Fails | "Internal JSON-RPC error" |
| Direct MetaMask call | ❌ Fails | Same error |
| Wagmi call | ❌ Fails | Same error |

## Possible Causes

1. **Arc USDC Contract Restriction**
   - The USDC contract at `0x3600...0000` might have restrictions
   - Maybe `approve` is disabled or requires special permissions
   - Check Arc documentation for USDC contract limitations

2. **Blocklist Enforcement**
   - Arc enforces USDC blocklists
   - Your address or the lottery contract might be blocklisted
   - But gas estimation works, so this is unlikely

3. **Transaction Validation**
   - Arc's RPC might validate transactions differently than gas estimation
   - There might be a validation that fails for `approve` calls

4. **Known Arc Issue**
   - This might be a known issue with Arc's USDC ERC-20 interface
   - Check Arc Discord/GitHub for similar reports

## Next Steps

### 1. Check Current Allowance

Run `CHECK-ALLOWANCE.js` to see if you already have allowance. If you do, you might be able to skip approve and go straight to `enterLottery`.

### 2. Check Arc Documentation

- Look for USDC contract limitations
- Check if `approve` has special requirements
- See if there's a different method to use

### 3. Contact Arc Support

- Arc Discord
- Arc GitHub issues
- Ask if this is a known issue with USDC `approve`

### 4. Alternative Approach

If `approve` doesn't work, maybe:
- Use a different token approval method
- Check if Arc's USDC supports `increaseAllowance` or `safeApprove`
- See if there's a workaround in Arc's documentation

### 5. Check Block Explorer

Visit: https://testnet.arcscan.app/address/0x3600000000000000000000000000000000000000
- Check contract code
- See if there are any restrictions
- Check recent transactions to see if others are using `approve`

## Summary

This appears to be an **Arc RPC/contract issue**, not a code issue. The fact that gas estimation works but transaction sending fails suggests Arc's RPC node is rejecting `approve` transactions for some reason.

**Recommendation**: Check Arc's documentation and community for known issues with USDC `approve`, or contact Arc support directly.

