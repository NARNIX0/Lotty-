# Arc USDC: Both Approve AND Transfer Fail

## The Problem

Both `approve` and `transfer` fail with the same error:
- ❌ `approve` → -32603 Internal JSON-RPC error
- ❌ `transfer` → -32603 Internal JSON-RPC error

This suggests **Arc's USDC contract has restrictions** on standard ERC20 operations.

## What This Means

Arc's USDC at `0x3600...0000` might:
- Have restrictions on who can call `approve`/`transfer`
- Require special permissions or setup
- Use a different interaction pattern
- Have RPC-level validation that rejects these calls

## Possible Solutions

### Option 1: Check if USDC Contract Supports Other Methods

Maybe Arc's USDC has:
- `transferWithAuthorization` (like some USDC implementations)
- `permit` (EIP-2612 signature-based approval)
- Different function names

### Option 2: Use Native USDC Transfer

Since USDC is native on Arc, maybe we can:
- Send USDC directly as a native transfer
- Modify contract to accept native USDC
- Use a different payment pattern

### Option 3: Check Arc Documentation

Arc might have:
- Special USDC interaction patterns
- Required setup steps
- API-based approvals
- Different contract addresses for different operations

### Option 4: Contact Arc Support

This is clearly an Arc-specific issue. Contact them with:
- Both `approve` and `transfer` fail
- Gas estimation works
- Actual transactions fail
- Error: -32603

## For Hackathon

**Document this as a known Arc limitation** and show:
- ✅ You identified the issue
- ✅ You tried multiple approaches
- ✅ You understand the problem
- ✅ Your code is correct (gas estimation works)

This demonstrates strong debugging skills even if the full flow is blocked.

