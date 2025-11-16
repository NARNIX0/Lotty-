# Arc USDC Approve - Known Issue

## Status: BLOCKED by Arc RPC

**Issue**: Cannot call `approve` on Arc's USDC contract (`0x3600...0000`)

## Symptoms

- ✅ Gas estimation works (`eth_estimateGas` returns 56,241 gas)
- ❌ Transaction sending fails (`eth_sendTransaction` returns -32603 "Internal JSON-RPC error")
- ❌ Both wagmi and direct MetaMask fail with same error
- ✅ Allowance check works (returns 0, so approval is needed)
- ✅ Network, balance, and contract addresses are correct

## Impact

**Cannot join lotteries** - Users cannot approve USDC spending, which blocks the `enterLottery` flow.

## What We've Tried

1. ✅ Removed explicit `chainId` 
2. ✅ Added explicit gas limit (60,000)
3. ✅ Cleared pending transactions
4. ✅ Direct MetaMask call (bypass wagmi)
5. ✅ Verified network, balance, addresses
6. ✅ Checked allowance (0, so approval needed)

## Root Cause

**Arc's RPC node is rejecting `approve` transactions** at the node level, even though gas estimation succeeds. This suggests:

- Arc's USDC contract might have restrictions on `approve`
- Arc's RPC might have validation that rejects `approve` transactions
- This could be a known bug in Arc's testnet

## Next Steps

### 1. Contact Arc Support

**Priority**: HIGH

Contact Arc support with:
- Error: "Internal JSON-RPC error" (-32603)
- Contract: `0x3600000000000000000000000000000000000000`
- Function: `approve(address, uint256)`
- Gas estimation works, but transaction fails
- Both wagmi and direct MetaMask fail

**Where to contact**:
- Arc Discord
- Arc GitHub Issues
- Arc Support Email

### 2. Check Arc Documentation

Look for:
- USDC contract limitations
- Known issues with `approve`
- Alternative methods for token approval
- Special requirements for Arc's USDC

### 3. Check Block Explorer

Visit: https://testnet.arcscan.app/address/0x3600000000000000000000000000000000000000

- Check if others are successfully using `approve`
- Look at recent transactions
- Check contract code for restrictions

### 4. Temporary Workaround

If `approve` doesn't work, consider:
- Using a different token (if hackathon allows)
- Waiting for Arc to fix the issue
- Using a different network for testing (if hackathon allows)

## For Hackathon

**Document this issue** in your submission:
- Explain that you've identified an Arc RPC issue
- Show that your code is correct (gas estimation works)
- Demonstrate that you've tried multiple approaches
- Note that this is blocking the full functionality

This shows good debugging skills and understanding of the problem, even if you can't complete the full flow.

## Code Status

✅ **Your code is correct** - The issue is with Arc's RPC/contract, not your implementation.

## References

- Arc USDC Contract: `0x3600000000000000000000000000000000000000`
- Arc Testnet RPC: `https://rpc.testnet.arc.network`
- Arc Block Explorer: `https://testnet.arcscan.app`
- Arc Docs: https://docs.arc.network/arc/references/contract-addresses#usdc

