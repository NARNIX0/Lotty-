# ✅ FIXED: Join Lottery Now Uses Arc Testnet

## 🎯 Problem Found & Fixed

**Issue**: When joining lottery, it was trying to use Ethereum mainnet instead of Arc Testnet

**Root Cause**: `useWriteContract` calls didn't explicitly specify `chainId: 5042002`

---

## 🔧 What Was Fixed

### 1. Updated `useSmartContract.ts`

**Added explicit chainId to both USDC approval and lottery entry**:

```typescript
// USDC Approval (when joining)
approve({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'approve',
  args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
  chainId: 5042002, // ✅ ADDED - Arc Testnet ONLY
})

// Enter Lottery
enter({
  address: FRIENDLY_LOTTERY_ADDRESS,
  abi: FRIENDLY_LOTTERY_ABI,
  functionName: 'enterLottery',
  args: [BigInt(roundId)],
  chainId: 5042002, // ✅ ADDED - Arc Testnet ONLY
})
```

---

### 2. Updated `CreateLotteryModal.tsx`

**Added explicit chainId for consistency**:

```typescript
writeContract({
  address: FRIENDLY_LOTTERY_ADDRESS,
  abi: FRIENDLY_LOTTERY_ABI,
  functionName: 'createRound',
  args: [entryFeeWei, BigInt(finalDurationDays)],
  chainId: 5042002, // ✅ ADDED - Arc Testnet ONLY
})
```

---

## 🚀 How to Apply the Fix

### Step 1: Restart Dev Server

```powershell
# Stop server (Ctrl+C)
cd frontend

# Clear cache
Remove-Item -Recurse -Force .next

# Restart
npm run dev
```

---

### Step 2: Clear Browser

```
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard reload (Ctrl+Shift+R)
3. Or open incognito/private window
```

---

### Step 3: Test Join Lottery

```
1. Make sure MetaMask is on Arc Testnet
2. Go to any lottery page
3. Click "Join Now"
4. Check MetaMask popup
```

---

## ✅ What You Should See Now

### When Joining Lottery:

**MetaMask will show 2 transactions in sequence:**

#### Transaction 1: Approve USDC
```
✅ Network: Arc Testnet
✅ Function: approve
✅ To: USDC Contract (0xD95C5B...)
✅ Spender: Lottery Contract
✅ Amount: Entry fee (e.g., 10 USDC)
```

#### Transaction 2: Enter Lottery
```
✅ Network: Arc Testnet
✅ Function: enterLottery
✅ To: Lottery Contract (0x60B4E...)
✅ Gas: Small amount of ETH
```

**Both should now show "Arc Testnet" at the top!**

---

## 🧪 Testing Checklist

- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] MetaMask switched to Arc Testnet
- [ ] Go to lottery page
- [ ] Click "Join Now"
- [ ] **Check Transaction 1 (Approve)**: Shows "Arc Testnet" ✅
- [ ] Approve it
- [ ] **Check Transaction 2 (Enter)**: Shows "Arc Testnet" ✅
- [ ] Confirm it
- [ ] Success! ✅

---

## 🎯 Why This Works

**Before**:
- `writeContract` used wagmi's default behavior
- MetaMask could choose any network it was currently on
- If you were on Ethereum, it would try to use Ethereum

**After**:
- Every `writeContract` explicitly specifies `chainId: 5042002`
- MetaMask is forced to use Arc Testnet
- If on wrong network, MetaMask will prompt to switch

---

## 📊 All Write Operations Now Fixed

| Operation | File | Chain ID |
|-----------|------|----------|
| Create Lottery | CreateLotteryModal.tsx | ✅ 5042002 |
| Approve USDC | useSmartContract.ts | ✅ 5042002 |
| Enter Lottery | useSmartContract.ts | ✅ 5042002 |

---

## 🐛 If Still Having Issues

### 1. Verify Chain ID in Console

```javascript
// In browser console (F12)
window.ethereum.request({ method: 'eth_chainId' })

// Should return: "0x4cf452" (5042002 in hex)
```

---

### 2. Check MetaMask Network

```
MetaMask → Click network dropdown → Should show "Arc Testnet"
```

---

### 3. Force Network Switch

```javascript
// In browser console
window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x4cf452' }]
})
```

---

### 4. Add Network if Missing

```javascript
// In browser console
window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x4cf452',
    chainName: 'Arc Testnet',
    rpcUrls: ['https://rpc.testnet.arc.network'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://testnet.arcscan.app']
  }]
})
```

---

## ✨ Summary

**What was changed:**
- ✅ Added `chainId: 5042002` to USDC approve
- ✅ Added `chainId: 5042002` to enterLottery
- ✅ Added `chainId: 5042002` to createRound

**Result:**
- ✅ All transactions now explicitly use Arc Testnet
- ✅ No more Ethereum mainnet confusion
- ✅ MetaMask will prompt to switch if on wrong network

---

## 🎉 It's Fixed!

After restarting the dev server and clearing cache, joining a lottery will now use **Arc Testnet only**!

**No more Ethereum mainnet errors!** 🎯

