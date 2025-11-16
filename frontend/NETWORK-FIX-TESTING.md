# Network Fix - Quick Testing Guide

## 🎯 What Was Fixed

Your app now **ONLY** connects to Arc Testnet (Chain ID: 5042002).

No more Ethereum mainnet confusion!

---

## ✅ Quick Test Checklist

### Test 1: Verify Arc Testnet Only

**Expected**: MetaMask should show "Arc Testnet" not "Ethereum"

**Steps**:
```
1. Open app
2. Click "Connect Wallet"
3. Approve in MetaMask
4. Check MetaMask header
```

**✅ Success**: Shows "Arc Testnet"  
**❌ Fail**: Shows "Ethereum" or other network

---

### Test 2: Wrong Network Warning

**Expected**: If on wrong network, app shows warning modal

**Steps**:
```
1. Open MetaMask
2. Switch to Ethereum Mainnet
3. Open app
4. Connect wallet
```

**✅ Success**: Red warning modal appears: "Wrong Network"  
**✅ Success**: Shows "Switch to Arc Testnet" button  
**❌ Fail**: No warning appears

---

### Test 3: Auto Network Switch

**Expected**: One-click switch to Arc Testnet

**Steps**:
```
1. On Ethereum Mainnet
2. Connect wallet (warning appears)
3. Click "Switch to Arc Testnet"
4. Approve in MetaMask
```

**✅ Success**: MetaMask switches to Arc Testnet  
**✅ Success**: Warning modal disappears  
**✅ Success**: App works normally  
**❌ Fail**: Switch doesn't work

---

### Test 4: Add Arc Testnet

**Expected**: Users can add network with one click

**Steps**:
```
1. Remove Arc Testnet from MetaMask (if present)
2. Open app
3. See "Add Arc Testnet to MetaMask" link
4. Click it
5. Approve in MetaMask
```

**✅ Success**: Network added with correct details:
- Name: Arc Testnet
- Chain ID: 5042002
- RPC: https://rpc.testnet.arc.network
- Block Explorer: https://testnet.arcscan.app

**❌ Fail**: Wrong details or error

---

### Test 5: Join Lottery on Arc Testnet

**Expected**: Transaction uses Arc Testnet, not Ethereum

**Steps**:
```
1. Make sure on Arc Testnet
2. Go to lottery page
3. Click "Join Now"
4. Check MetaMask transaction popup
```

**✅ Success**: 
- Network: Arc Testnet ✅
- Contract address: Your lottery contract ✅
- Gas: Estimated in ETH ✅

**❌ Fail**:
- Shows Ethereum mainnet
- Wrong contract address
- Transaction fails

---

## 🐛 Common Issues

### Issue 1: MetaMask Still Shows Ethereum

**Cause**: Cache or didn't switch network

**Fix**:
```
1. Disconnect wallet in app
2. Open MetaMask manually
3. Switch to Arc Testnet
4. Refresh app
5. Connect again
```

---

### Issue 2: Warning Modal Not Appearing

**This is correct!** Modal only shows when on WRONG network.

**To test warning**:
```
1. Switch MetaMask to Ethereum
2. Refresh app
3. Warning should appear
```

---

### Issue 3: Can't Add Network

**Cause**: Network with same Chain ID already exists

**Fix**:
```
1. MetaMask → Settings → Networks
2. Find any network with ID 5042002
3. Delete it
4. Try "Add Arc Testnet" again
```

---

### Issue 4: Transaction Fails

**Check**:
- [ ] On Arc Testnet? (Check MetaMask header)
- [ ] Have ETH for gas? (Arc Testnet ETH)
- [ ] Have USDC? (Arc Testnet USDC)
- [ ] Correct contract address in .env.local?

**Debug**:
```
1. Open browser console (F12)
2. Look for errors
3. Check network in MetaMask
4. Verify balances
```

---

## 📊 Correct Configuration

### What MetaMask Should Show

**After connecting**:
- Network: **Arc Testnet** (not Ethereum)
- Chain ID: **5042002**
- RPC: https://rpc.testnet.arc.network

### What Transactions Should Use

**When joining lottery**:
- Network: Arc Testnet
- Token: USDC (Arc Testnet USDC address)
- Gas: ETH (Arc Testnet ETH)

---

## 🎉 Success Indicators

Your fix is working if:

1. ✅ MetaMask shows "Arc Testnet" when connected
2. ✅ Warning appears when on wrong network
3. ✅ Can switch to Arc Testnet with one click
4. ✅ Can add Arc Testnet easily
5. ✅ Transactions use Arc Testnet
6. ✅ No Ethereum mainnet references
7. ✅ Join lottery works correctly

---

## 📞 Need Help?

### Check These Files

1. `frontend/src/lib/web3.ts` - Network configuration
2. `frontend/src/components/wallet/NetworkChecker.tsx` - Warning modal
3. `frontend/src/app/providers.tsx` - NetworkChecker integration
4. `frontend/.env.local` - Contract addresses

### Verify Environment Variables

```bash
# .env.local should have:
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...  # Your lottery contract
NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
```

---

## 🚀 You're All Set!

Your app now correctly connects ONLY to Arc Testnet.

**No more Ethereum confusion!** 🎯

Test it by connecting your wallet - you should see "Arc Testnet" in MetaMask!

