# Redeploy FriendlyLottery with Correct USDC Address

## Step-by-Step Guide

### Step 1: Redeploy Lottery Contract

```bash
cd contracts

# Build first
forge build

# Deploy with CORRECT USDC address
forge script script/DeployLottery.s.sol:DeployLottery \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $env:PRIVATE_KEY \
  --broadcast \
  --legacy
```

---

### Step 2: Copy New Lottery Address

You'll see output like:
```
FriendlyLottery deployed to: 0xNEW_ADDRESS_HERE
```

**Copy that address!**

---

### Step 3: Update Frontend .env.local

Update both addresses:

```env
# New lottery contract address
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourNewLotteryAddress

# Correct USDC address  
NEXT_PUBLIC_USDC_ADDRESS=0x3600000000000000000000000000000000000000
```

---

### Step 4: Restart Frontend

```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

---

### Step 5: Get USDC from Faucet

🚰 **https://faucet.circle.com**

1. Select "Arc Testnet"
2. Enter your wallet: `0xcAbD9A3FF3De3c19Fb4a45875Fb3c824d691feB5`
3. Request 10 USDC
4. Wait for confirmation

---

### Step 6: Create New Lottery Round

Since it's a fresh contract:

1. Go to dashboard
2. Click "Create Lottery"
3. Set entry fee (e.g., 2 USDC)
4. Set duration (e.g., 7 days)
5. Create!

---

### Step 7: Try Join Lottery

Now everything should work! ✅

1. Go to lottery page
2. Click "Join Now"
3. Approve USDC → Confirm
4. Enter lottery → Confirm
5. Success! 🎉

---

## Why This Works

**Before:**
```
Lottery expects USDC: 0xD95C... (your wallet - wrong!) ❌
Frontend using USDC: 0x3600... (real USDC) ❌
MISMATCH!
```

**After:**
```
Lottery expects USDC: 0x3600... (real USDC) ✅
Frontend using USDC: 0x3600... (real USDC) ✅
MATCH!
```

---

**Run the deploy command and tell me the new lottery address!** 🚀

