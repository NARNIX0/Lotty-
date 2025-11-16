# Vercel Deployment Guide

## Quick Deploy

### 1. Push to GitHub

```bash
# From project root
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

**Option A: Vercel CLI**
```bash
cd frontend
vercel --prod
```

**Option B: Vercel Dashboard**
1. Visit https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repo
4. Set Root Directory: `frontend`
5. Click "Deploy"

### 3. Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0x60B4E3e62A1E56FfC890d03742e158cf002e3047
NEXT_PUBLIC_USDC_ADDRESS=0xD95C5B45032e364392BE0A57b528b06203eb3060
NEXT_PUBLIC_ARC_RPC_URL=https://rpc.testnet.arc.network
NEXT_PUBLIC_ARC_CHAIN_ID=5042002
NEXT_PUBLIC_SUPABASE_URL=https://wwmzzmipruenyxelzbwa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_hzcT9yhSMaT3i_nTxYxOCw_Ly4mr8ph
SUPABASE_SERVICE_KEY=sb_secret_JjW_l3752Di5sBCEDwsGOQ_XHBqga4b
```

### 4. Redeploy

After adding environment variables:
- Click "Redeploy" in Vercel dashboard
- Or push a new commit

### 5. Test

Visit your URL: `https://your-app.vercel.app`

## Two-User Testing on Vercel

### Quick Test

**User 1** (Your device):
1. Visit `https://your-app.vercel.app`
2. Connect wallet
3. Create lottery (Dashboard → Create Lottery)
4. Note lottery ID (e.g., #1)
5. Share link: `https://your-app.vercel.app/lottery/1`

**User 2** (Friend's device):
1. Open shared link
2. Connect their wallet
3. Click "Join Now"
4. See both participants in lottery

## Configuration

### vercel.json

Already configured in `frontend/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_CONTRACT_ADDRESS": "@contract-address",
    "NEXT_PUBLIC_USDC_ADDRESS": "@usdc-address",
    "NEXT_PUBLIC_ARC_RPC_URL": "@arc-rpc",
    "NEXT_PUBLIC_ARC_CHAIN_ID": "@arc-chain-id"
  }
}
```

## Troubleshooting

### Build Fails

**Check**:
1. Environment variables set correctly
2. No TypeScript errors: `npm run build` locally
3. Dependencies installed: `npm install`

### App Loads But Wallet Won't Connect

**Check**:
1. MetaMask installed on user's browser
2. Arc Testnet added to MetaMask
3. Environment variables deployed

### Contract Calls Fail

**Check**:
1. Contract address correct
2. User on correct network (Arc Testnet)
3. User has gas (Arc ETH)
4. RPC URL working

## Custom Domain (Optional)

1. Go to Vercel → Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Share: `https://yourdomain.com/lottery/1`

## Success!

Your app is live when:
- ✅ Deploys without errors
- ✅ Opens in browser
- ✅ Wallet connects
- ✅ Can create lottery
- ✅ Can share link
- ✅ Second user can join

Share your link with friends! 🎉

