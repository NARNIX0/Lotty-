# Two-User Testing Guide

## Overview

Guide for testing two users interacting with the lottery system, both locally and on Vercel.

## 🧪 Testing Locally

### Method 1: Two Different Browsers

**Easiest method - No setup required**

1. **User 1**: Open Chrome
   - Navigate to `http://localhost:3000`
   - Connect MetaMask with Wallet A
   
2. **User 2**: Open Firefox (or Safari, Edge, etc.)
   - Navigate to `http://localhost:3000`
   - Connect MetaMask with Wallet B

**Pros**:
- ✅ Simple setup
- ✅ Each browser has separate MetaMask state

**Cons**:
- ❌ Need multiple browsers installed

---

### Method 2: Two MetaMask Accounts (Same Browser)

**Most convenient method**

1. **Setup Multiple Accounts in MetaMask**:
   ```
   MetaMask → Click account icon → Create Account
   or
   MetaMask → Click account icon → Import Account
   ```

2. **User 1 Flow**:
   - Open tab 1: `http://localhost:3000`
   - Connect with Account 1
   - Create or join lottery

3. **User 2 Flow**:
   - Open tab 2 (Incognito/Private): `http://localhost:3000`
   - Switch MetaMask to Account 2
   - Connect with Account 2
   - Join the same lottery

**Pros**:
- ✅ Same browser
- ✅ Easy account switching

**Cons**:
- ⚠️ Need to use incognito for separate session
- ⚠️ May need to refresh after switching accounts

---

### Method 3: Two Different Wallets

**For advanced testing**

1. **User 1**: MetaMask (Chrome)
   - Install MetaMask extension
   - Connect to Arc Testnet
   
2. **User 2**: Coinbase Wallet (Firefox) or MetaMask (different browser)
   - Install different wallet extension
   - Connect to Arc Testnet

**Pros**:
- ✅ Tests different wallet providers
- ✅ More realistic user scenario

**Cons**:
- ❌ More setup required

---

### Method 4: Same Browser, Clear State

**Quick testing method**

1. **User 1**:
   - Connect wallet A
   - Create/join lottery
   - Disconnect wallet

2. **User 2**:
   - Switch to wallet B in MetaMask
   - Refresh page
   - Connect wallet B
   - Join lottery

**Pros**:
- ✅ Simple
- ✅ Same browser/tab

**Cons**:
- ⚠️ Sequential testing only (not simultaneous)

---

## 🌐 Testing on Vercel (Deployed)

### Best Method: Two Separate Devices

**Most realistic scenario**

**Device 1 (Your Computer)**:
1. Visit `https://your-app.vercel.app`
2. Connect wallet
3. Create lottery
4. Share lottery link with User 2

**Device 2 (Friend's Phone/Computer)**:
1. Open shared link: `https://your-app.vercel.app/lottery/1`
2. Connect their wallet
3. Join lottery
4. Both users can see updates in real-time

**Pros**:
- ✅ Most realistic user experience
- ✅ Tests across networks/devices
- ✅ Tests mobile experience

---

### Alternative: Two Browsers on Same Computer

Same as local testing but use your Vercel URL:
- `https://your-app.vercel.app`

---

## 🔗 Sharing Lotteries Between Users

### Method 1: Direct Link

**User 1 creates lottery**:
1. Click "Create Lottery"
2. Set entry fee: $10, Duration: 7 days
3. Confirm transaction
4. Note the lottery ID (e.g., #1)
5. Share link: `https://your-app.vercel.app/lottery/1`

**User 2 joins**:
1. Open link
2. Click "Join Now"
3. Approve USDC
4. Confirm entry

---

### Method 2: Lottery Code (Future Enhancement)

Currently shows lottery ID in URL. Could add:
- Copy lottery link button
- Share via social media
- QR code generation
- Lottery code (e.g., "ABC123")

---

## 📋 Complete Testing Scenario

### Setup (One-time)

1. **Both Users**:
   - Install MetaMask
   - Add Arc Testnet:
     - Network Name: Arc Testnet
     - RPC URL: https://rpc.testnet.arc.network
     - Chain ID: 5042002
     - Currency: ETH
   
2. **Get Test Tokens**:
   - Arc ETH (for gas)
   - USDC (for entries)
   - Get from faucet or contract owner

---

### Test Flow

**User 1 (Creator)**:
```
1. Visit app (localhost or Vercel)
2. Connect wallet
3. Go to Dashboard
4. Click "Create Lottery"
5. Enter:
   - Entry Fee: $10
   - Duration: 7 days
6. Click "Create"
7. Confirm in MetaMask
8. Wait for confirmation
9. Copy lottery link: /lottery/1
10. Send to User 2
```

**User 2 (Participant)**:
```
1. Receive link from User 1
2. Open link
3. Connect wallet (different address)
4. See lottery details:
   - Entry fee: $10
   - Your odds: "Be the first!"
5. Click "Join Now"
6. Approve USDC (MetaMask)
7. Confirm entry (MetaMask)
8. Wait for confirmation
9. See updated participant count: "1 people joined"
```

**User 1 (Also Joining)**:
```
1. Navigate to /lottery/1
2. See User 2 has joined ("1 people joined")
3. Click "Join Now"
4. Approve & confirm
5. See updated count: "2 people joined"
6. Both see "Your odds: 1 in 2 chance"
```

---

## 🐛 Common Issues & Solutions

### Issue: "Lottery closed"

**Cause**: Lottery ID doesn't exist or has ended

**Solution**:
- Create a new lottery first
- Check the current round ID on dashboard
- Use correct lottery ID in URL

---

### Issue: "No lotteries found"

**Cause**: No lotteries created yet

**Solution**:
- Click "Create Lottery" on dashboard
- Or ask contract owner to create one

---

### Issue: Wallet won't connect

**Cause**: Wrong network or MetaMask not installed

**Solution**:
1. Install MetaMask
2. Switch to Arc Testnet
3. Refresh page
4. Try connecting again

---

### Issue: Can't switch between accounts

**Cause**: Browser caching wallet state

**Solution**:
1. Disconnect current wallet
2. Switch account in MetaMask
3. Refresh page
4. Connect new account

---

### Issue: Transaction fails

**Cause**: Insufficient gas or USDC

**Solution**:
1. Check Arc ETH balance (for gas)
2. Check USDC balance (for entry)
3. Get more from faucet if needed

---

## 🎯 What to Test

### Basic Functionality
- [ ] User 1 can create lottery
- [ ] User 2 can see lottery via link
- [ ] User 2 can join lottery
- [ ] User 1 can join own lottery
- [ ] Participant count updates for both users
- [ ] Odds calculate correctly
- [ ] Can't join twice with same wallet

### Real-time Updates
- [ ] Countdown timer syncs across users
- [ ] Pool amount updates when someone joins
- [ ] Participant count updates automatically (every 5s)
- [ ] Status updates (Active → Closed)

### Multi-User Scenarios
- [ ] 3+ users can join same lottery
- [ ] Each user sees correct "You've entered" state
- [ ] Each user sees updated odds
- [ ] All users see same pool amount

### Error Handling
- [ ] Can't join without USDC
- [ ] Can't join without gas
- [ ] Can't join twice
- [ ] Can't join closed lottery
- [ ] Proper error messages displayed

---

## 📊 Testing Checklist

### Pre-Test Setup
- [ ] App running (local or Vercel)
- [ ] Two wallets with Arc ETH
- [ ] Two wallets with USDC
- [ ] Both wallets on Arc Testnet
- [ ] MetaMask installed on both browsers/devices

### Create Lottery Flow
- [ ] User 1 can create lottery
- [ ] Form validation works
- [ ] Transaction confirms
- [ ] Lottery appears on dashboard
- [ ] Can copy/share link

### Join Lottery Flow
- [ ] User 2 receives link
- [ ] Link opens correct lottery
- [ ] Shows correct details
- [ ] Can approve USDC
- [ ] Can enter lottery
- [ ] Confirmation visible

### Verification
- [ ] Both users see same data
- [ ] Participant count matches
- [ ] Pool amount matches
- [ ] Countdown syncs
- [ ] Real-time updates work

---

## 🚀 Quick Start Commands

### Local Testing

**Terminal 1 (Run App)**:
```bash
cd frontend
npm run dev
```

**Browser 1 (User 1)**:
```
http://localhost:3000
→ Connect Wallet A
→ Create Lottery
```

**Browser 2 (User 2)**:
```
http://localhost:3000/lottery/1
→ Connect Wallet B
→ Join Lottery
```

---

### Vercel Testing

**After Deployment**:
```bash
# Deploy
vercel --prod

# Share URL with User 2
https://your-app.vercel.app/lottery/1
```

**Both Users**:
1. Visit URL
2. Connect different wallets
3. Interact with lottery
4. See real-time updates

---

## 💡 Tips

1. **Use Different Wallet Addresses**: 
   - Each user needs unique wallet address
   - Can't test with same address

2. **Check Network**:
   - Both must be on Arc Testnet
   - Wrong network = can't interact

3. **Refresh for Updates**:
   - Auto-refresh every 5 seconds
   - Manual refresh if needed

4. **Monitor Console**:
   - Open DevTools (F12)
   - Check for errors
   - Watch contract calls

5. **Use Block Explorer**:
   - View transactions: https://testnet.arcscan.io
   - Verify contract calls
   - Check wallet balances

---

## ✅ Success Criteria

**Testing is successful when**:
- ✅ User 1 creates lottery
- ✅ User 2 receives and opens link
- ✅ User 2 joins successfully
- ✅ Both see updated participant count
- ✅ Both see correct pool amount
- ✅ Both see accurate odds
- ✅ Real-time updates work
- ✅ No duplicate entries
- ✅ Countdown syncs across users

**Ready for production when all checkboxes pass!** 🎉

