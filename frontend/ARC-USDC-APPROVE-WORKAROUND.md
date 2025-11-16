# Arc USDC Approve Workaround

## The Problem

"Internal JSON-RPC error" when calling `approve` on Arc's USDC contract. This suggests the RPC node is rejecting the transaction before it reaches the contract.

## Possible Causes

1. **Blocklist enforcement** - Arc enforces USDC blocklists at the RPC level
2. **Gas estimation failure** - The RPC can't estimate gas for the transaction
3. **Transaction format** - Arc's USDC might require special transaction format
4. **Contract state** - The USDC contract might be in a special state

## Workarounds to Try

### 1. Check Allowance First

Maybe we already have sufficient allowance. Add this check before approving:

```typescript
// Check current allowance
const { data: currentAllowance } = useReadContract({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'allowance',
  args: [address, FRIENDLY_LOTTERY_ADDRESS],
})

if (currentAllowance && currentAllowance >= entryFee) {
  // Skip approve, go straight to enter
  enter({ ... })
} else {
  // Need to approve
  approve({ ... })
}
```

### 2. Try Using `increaseAllowance` Instead

Some USDC implementations prefer `increaseAllowance` over `approve`:

```typescript
// Check if contract supports increaseAllowance
// If yes, use that instead
```

### 3. Try Setting Allowance to 0 First, Then to Amount

Some tokens require resetting allowance first:

```typescript
// First approve 0
approve({ args: [FRIENDLY_LOTTERY_ADDRESS, 0n] })
// Then approve the amount
approve({ args: [FRIENDLY_LOTTERY_ADDRESS, entryFee] })
```

### 4. Direct RPC Call (Bypass Wagmi)

Try calling the RPC directly to see the actual error:

```javascript
// In browser console
const accounts = await window.ethereum.request({ method: 'eth_accounts' })
const fromAddress = accounts[0]
const spenderAddress = '0xf04201f711173b7e167EfAD94b551661b11A4CdB'
const USDC_ADDRESS = '0x3600000000000000000000000000000000000000'
const amount = '0x0f4240' // 1000000 in hex

const data = `0x095ea7b3${spenderAddress.slice(2).padStart(64, '0')}${amount.padStart(64, '0')}`

await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: fromAddress,
    to: USDC_ADDRESS,
    data: data,
  }]
})
```

### 5. Check if Address is Blocklisted

Arc enforces USDC blocklists. Check if your address or the lottery contract is blocklisted:

- Visit: https://testnet.arcscan.app/address/0x3600000000000000000000000000000000000000
- Check contract interactions
- See if there are any restrictions

### 6. Try Different Amount

Maybe try a smaller amount first to see if it's an amount-specific issue:

```typescript
// Try 0.1 USDC first
const testAmount = BigInt(100000) // 0.1 USDC
approve({ args: [FRIENDLY_LOTTERY_ADDRESS, testAmount] })
```

## Next Steps

1. **Check the raw error** - The enhanced logging should now show `error.raw` which contains the actual RPC response
2. **Try the direct RPC call** - This will bypass wagmi and show the real error
3. **Check blocklist** - Verify addresses aren't blocklisted
4. **Contact Arc support** - If it's a known issue with their USDC contract

## Reference

- [Arc USDC Contract](https://docs.arc.network/arc/references/contract-addresses#usdc)
- [Arc Blocklist Enforcement](https://docs.arc.network/arc/references/evm-compatibility#erc20-interface)

