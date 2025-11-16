# 🚨 URGENT: Still Connecting to ETH Mainnet?

## Follow These Steps EXACTLY:

### Step 1: Stop Dev Server

**In your terminal**:
```bash
# Press Ctrl+C to stop the running dev server
# Make sure it's fully stopped
```

---

### Step 2: Clear Next.js Cache

**Run these commands**:
```bash
cd frontend
rm -rf .next
```

**Or on Windows**:
```powershell
cd frontend
rmdir /s /q .next
```

---

### Step 3: Restart Dev Server

```bash
npm run dev
```

**Wait for**: "Ready in X.Xms"

---

### Step 4: Clear Browser Cache

**In your browser**:
```
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
```

**Or**:
```
Ctrl+Shift+Delete → Clear cache → Clear
```

---

### Step 5: Disconnect Wallet

**In your app**:
```
1. If wallet is connected, disconnect it
2. Close the tab
3. Open a fresh tab
```

---

### Step 6: Switch MetaMask to Arc Testnet MANUALLY

**This is the key step!**

**In MetaMask**:
```
1. Click the network dropdown (top left)
2. Scroll to "Arc Testnet"
3. Click it to switch
```

**If Arc Testnet not in list**:
```
1. Click "Add Network" or "Add a network manually"
2. Enter these details:
   - Network Name: Arc Testnet
   - RPC URL: https://rpc.testnet.arc.network
   - Chain ID: 5042002
   - Currency Symbol: ETH
   - Block Explorer: https://testnet.arcscan.app
3. Save
4. Switch to Arc Testnet
```

---

### Step 7: Reconnect Wallet

**In your app**:
```
1. Go to freshly loaded app
2. Click "Connect Wallet"
3. Approve in MetaMask
4. Check MetaMask header - should say "Arc Testnet"
```

---

## ✅ Verification

After these steps:

**MetaMask should show**:
- Network: **Arc Testnet** (NOT Ethereum)
- Address: Your wallet address

**If it shows "Ethereum"**:
- You're still on wrong network in MetaMask
- Go back to Step 6 and manually switch

---

## 🐛 Still Not Working?

### Nuclear Option: Complete Reset

```bash
# Stop dev server (Ctrl+C)

# Delete cache and modules
cd frontend
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Fresh install
npm install

# Restart
npm run dev
```

Then repeat Steps 4-7.

---

## 🔍 How to Verify You're on Arc Testnet

### In MetaMask:
- Top left should say: **"Arc Testnet"**
- NOT "Ethereum Mainnet"
- NOT "Sepolia"
- NOT any other network

### In Browser Console (F12):
```javascript
// Run this in console:
window.ethereum.request({ method: 'eth_chainId' })
```

**Should return**: `"0x4cf452"` (which is 5042002 in hex)

**If it returns** `"0x1"` → That's Ethereum mainnet (wrong!)

---

## 🎯 The Real Issue

**The problem**: MetaMask remembers your last network per website.

**If you connected on Ethereum before**, MetaMask will default to Ethereum even though the app is configured for Arc Testnet.

**The fix**: Manually switch MetaMask to Arc Testnet FIRST, then connect.

---

## ✨ After Following All Steps

1. ✅ Dev server restarted
2. ✅ Cache cleared
3. ✅ MetaMask manually switched to Arc Testnet
4. ✅ Wallet reconnected
5. ✅ MetaMask header shows "Arc Testnet"
6. ✅ Transactions use Arc Testnet

---

## 🚀 Quick Test

Once connected, try this:

```
1. Go to any lottery
2. Click "Join Now"
3. MetaMask popup should show:
   - Network: Arc Testnet ✅
   - NOT Ethereum ✅
```

---

**This WILL work if you follow all steps!** 🎯

The configuration is correct - you just need to clear cache and manually switch MetaMask to Arc Testnet.

