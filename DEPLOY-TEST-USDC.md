# Deploy Test USDC to Arc Testnet

## If Arc Testnet doesn't have official USDC, deploy your own!

### Step 1: Build Contract

```bash
cd contracts
forge build
```

### Step 2: Deploy MockUSDC

```bash
forge script script/DeployMockUSDC.s.sol:DeployMockUSDC \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --legacy
```

### Step 3: Copy the Address

You'll see output like:
```
MockUSDC deployed to: 0xABCDEF1234567890...
```

**Copy that address!**

### Step 4: Update .env.local

```env
NEXT_PUBLIC_USDC_ADDRESS=0xYourNewMockUSDCAddress
```

### Step 5: Mint USDC to Yourself

```bash
cast send 0xYourMockUSDCAddress \
  "faucet(uint256)" 1000000000 \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY
```

This gives you 1000 USDC!

### Step 6: Restart Frontend

```powershell
cd frontend
Remove-Item -Recurse -Force .next
npm run dev
```

### Step 7: Try Join Lottery Again!

Should work now! ✅

---

## Benefits of MockUSDC

- ✅ Has `faucet()` function - anyone can mint tokens
- ✅ 6 decimals (like real USDC)
- ✅ Owner can mint unlimited for testing
- ✅ Fully ERC20 compliant

