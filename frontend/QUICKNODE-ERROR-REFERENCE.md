# QuickNode Arc Error Reference

## Key Finding

According to [QuickNode's Arc Error Reference](https://www.quicknode.com/docs/arc/error-references):

**Error `-32603`: "Internal JSON-RPC error"**
- **Cause**: "This error is typically due to a bad or invalid payload"

## What This Means

Since gas estimation works but transaction sending fails, the issue is likely:
- **Missing required fields** in the transaction payload
- **Invalid field values** in the transaction
- **Incorrect payload format** for Arc

## What We've Added

I've added `value: BigInt(0)` to the approve call, as Arc might require:
- Explicit `value` field (even if 0)
- All standard transaction fields to be present

## Other Possible Missing Fields

If `value` doesn't fix it, Arc might also require:
- `gasPrice` or `maxFeePerGas` / `maxPriorityFeePerGas` (EIP-1559)
- Explicit `nonce` (though usually auto-filled)
- Other Arc-specific fields

## Next Steps

1. **Try the transaction again** with `value: BigInt(0)` added
2. **If it still fails**, try adding gas pricing fields
3. **Check Arc docs** for required transaction fields

## Reference

- QuickNode Arc Error Reference: https://www.quicknode.com/docs/arc/error-references
- Error -32603: "Internal JSON-RPC error" - typically due to bad/invalid payload

