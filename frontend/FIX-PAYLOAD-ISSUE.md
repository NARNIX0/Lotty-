# Fix: Invalid Payload Issue (-32603)

## According to QuickNode Arc Docs

Error `-32603`: "Internal JSON-RPC error" - **"This error is typically due to a bad or invalid payload"**

Source: https://www.quicknode.com/docs/arc/error-references

## The Issue

Gas estimation works, but transaction fails. This suggests the **transaction payload is missing required fields** for Arc.

## What Might Be Missing

Arc might require:
1. **`value` field** - Even for token approvals, might need `value: "0x0"`
2. **`gasPrice` or `maxFeePerGas`** - Arc might require explicit gas pricing
3. **`maxPriorityFeePerGas`** - EIP-1559 gas fields
4. **`nonce`** - Explicit nonce (though usually auto-filled)

## Try Adding Missing Fields

### Option 1: Add `value: 0`

```typescript
approve({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'approve',
  args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
  gas: gasLimit,
  value: 0n, // Explicitly set value to 0
})
```

### Option 2: Add Gas Pricing (EIP-1559)

```typescript
// Get current gas prices first
const feeData = await publicClient.estimateFeesPerGas()

approve({
  address: USDC_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'approve',
  args: [FRIENDLY_LOTTERY_ADDRESS, entryFee],
  gas: gasLimit,
  maxFeePerGas: feeData.maxFeePerGas,
  maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
})
```

### Option 3: Direct MetaMask with All Fields

```javascript
await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: address,
    to: USDC_ADDRESS,
    data: data,
    gas: '0xea60',
    value: '0x0', // Explicitly set
    // Add gas pricing if needed
  }],
})
```

## Next Steps

1. **Try adding `value: 0n`** to the approve call
2. **Check if Arc requires gas pricing fields**
3. **Test with explicit nonce** if needed

The QuickNode docs suggest this is a payload issue, so adding missing fields might fix it!

