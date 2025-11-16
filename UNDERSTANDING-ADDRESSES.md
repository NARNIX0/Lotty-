# Understanding Smart Contract Addresses

## Two Different Addresses - Don't Confuse Them!

### 1. **USDC Token Address** (Existing Contract)
- **What**: An ERC20 token contract that ALREADY EXISTS on Arc Testnet
- **Purpose**: The token people use to pay entry fees
- **Address**: `0x3600000000000000000000000000000000000000`
- **Who created it**: Circle/Arc Network (not you!)
- **When**: Already deployed before you started
- **Does it change?**: NO - it's a fixed address on Arc Testnet

**Think of it like**: The address of a bank (USDC) that everyone uses

---

### 2. **Lottery Contract Address** (Your Contract)
- **What**: Your FriendlyLottery contract that YOU deploy
- **Purpose**: The lottery logic (create rounds, enter, pick winners)
- **Address**: Generated when YOU deploy it (e.g., `0x60B4E3e62A1E56FfC890d03742e158cf002e3047`)
- **Who created it**: YOU (when you run `forge script`)
- **When**: Generated fresh each time you deploy
- **Does it change?**: YES - new address every time you redeploy

**Think of it like**: Your lottery shop address (changes if you move)

---

## How They Work Together

```
┌─────────────────────────────────────┐
│   Your Lottery Contract             │
│   Address: 0x60B4E... (generated)  │
│                                     │
│   Constructor receives:             │
│   usdc = 0x3600... (existing)      │
│                                     │
│   When someone joins:              │
│   1. User approves USDC (0x3600)   │
│   2. User calls enterLottery()      │
│   3. Lottery transfers USDC from   │
│      user to lottery contract       │
└─────────────────────────────────────┘
```

---

## In Your Code

### FriendlyLottery.sol Constructor:

```solidity
constructor(address _usdc) Ownable(msg.sender) {
    usdc = IERC20(_usdc);  // ← Stores the USDC address
}
```

**What this does:**
- Takes the USDC address as input
- Stores it in the contract
- Now your lottery knows which token to accept

---

## Deploy Script

```solidity
address usdcAddress = 0x3600000000000000000000000000000000000000;
// ↑ This is the EXISTING USDC contract on Arc Testnet

FriendlyLottery lottery = new FriendlyLottery(usdcAddress);
// ↑ This creates YOUR lottery contract with a NEW address
// ↑ And tells it to use the USDC at 0x3600...
```

**When you deploy:**
1. `new FriendlyLottery(...)` creates a NEW contract
2. Gets a NEW unique address (e.g., `0x60B4E...`)
3. But it's configured to use the EXISTING USDC at `0x3600...`

---

## What Goes in .env.local

```env
# Your lottery contract (generated when you deploy)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x60B4E3e62A1E56FfC890d03742e158cf002e3047

# USDC token (existing on Arc Testnet - never changes)
NEXT_PUBLIC_USDC_ADDRESS=0x3600000000000000000000000000000000000000
```

---

## Summary

| Address | Type | Who Created | When | Changes? |
|---------|------|-------------|------|----------|
| `0x3600...` | USDC Token | Circle/Arc | Before you | ❌ NO |
| `0x60B4E...` | Lottery | YOU | When you deploy | ✅ YES |

---

## Why This Matters

**If you redeploy lottery:**
- ✅ Lottery address changes (new deployment = new address)
- ❌ USDC address stays the same (it's a fixed token)

**So when you redeploy:**
1. Update `NEXT_PUBLIC_CONTRACT_ADDRESS` with new lottery address
2. Keep `NEXT_PUBLIC_USDC_ADDRESS` the same (always `0x3600...`)

---

**The lottery contract generates its own address, but it needs to know which USDC token to use!** 🎯

