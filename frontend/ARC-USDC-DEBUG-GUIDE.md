# Arc USDC ERC-20 Interface Debugging Guide

Based on [Arc Documentation](https://docs.arc.network/arc/references/contract-addresses#usdc):

## Key Facts from Arc Docs

1. **USDC Contract Address**: `0x3600000000000000000000000000000000000000` ✅ (We're using this)

2. **Decimals**:
   - **Native USDC balance**: 18 decimals (for gas)
   - **ERC-20 interface**: 6 decimals (for transfers) ✅ (We're using this)

3. **ERC-20 Interface**: 
   - Provides `approve`, `transferFrom`, and allowance management
   - "The ERC-20 function call directly affects native USDC balance movements"
   - It's "optional" but should work for standard ERC-20 operations

4. **Blocklist Enforcement**:
   - Pre-mempool: Transaction rejected (no fees)
   - Post-mempool: Transaction reverts (consumes gas)
   - Runtime: Only the operation reverts

---

## What We Changed

1. **Removed explicit `chainId`** from `writeContract` calls
   - Let wagmi automatically use the connected chain
   - This ensures proper transaction formatting for Arc

2. **Verified we're using 6 decimals** for ERC-20 operations ✅

---

## Testing Steps

1. **Verify Network**: Ensure MetaMask is on Arc Testnet (Chain ID: 5042002)

2. **Check USDC Balance**: 
   - Should have USDC (not ETH) for gas
   - Get from [Circle Faucet](https://faucet.circle.com/)

3. **Try Approve Again**: 
   - The transaction should now work without explicit chainId
   - Wagmi will automatically format it for Arc Testnet

4. **If Still Failing**:
   - Check browser console for detailed error
   - Verify address is not blocklisted
   - Ensure you have sufficient USDC for gas + entry fee

---

## Expected Behavior

- ✅ Gas estimation should work (we confirmed this: 56,241 gas)
- ✅ Simulation should work (we confirmed this)
- ✅ Transaction should now work (after removing explicit chainId)

---

## If Still Getting "Internal JSON-RPC Error"

1. **Check Block Explorer**: 
   - Visit: https://testnet.arcscan.app/address/0x3600000000000000000000000000000000000000
   - Verify the contract exists and is active

2. **Try Direct RPC Call**:
   ```javascript
   // In browser console
   const result = await window.ethereum.request({
     method: 'eth_sendTransaction',
     params: [{
       from: 'YOUR_ADDRESS',
       to: '0x3600000000000000000000000000000000000000',
       data: '0x095ea7b3...' // approve function call
     }]
   })
   ```

3. **Check MetaMask Transaction History**:
   - See if transaction appears but fails
   - Check the error message in MetaMask

---

## References

- [Arc Contract Addresses](https://docs.arc.network/arc/references/contract-addresses#usdc)
- [Arc EVM Compatibility](https://docs.arc.network/arc/references/evm-compatibility#erc20-interface)
- [Circle Faucet](https://faucet.circle.com/)

