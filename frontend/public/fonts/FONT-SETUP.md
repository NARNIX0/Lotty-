# AEONIK Font Setup

## Required Font Files

Place these AEONIK font files in this directory (`public/fonts/`):

1. **aeonik-bold.woff2** (Weight: 700)
   - Used for: Headings (h1, h2), buttons, emphasized text
   
2. **aeonik-regular.woff2** (Weight: 400)
   - Used for: Body text, subheadings, descriptions

## Font Usage in the App

### AEONIK Bold (700)
- Main heading: "Fair, transparent, automated friend lotteries"
- "Connect Wallet" button
- Dashboard headings ("Hello...", "November's Lotty")
- Dollar amounts and emphasis text

### AEONIK Regular (400)
- Subheadings: "Create or join a lottery pool..."
- Explanation text
- Body copy and descriptions

## How to Get AEONIK Fonts

1. If you have the AEONIK font family, convert to `.woff2` format
2. Name them exactly as shown above
3. Place in this `/public/fonts/` directory

## Fallback

If font files are not present, the app will use `sans-serif` as fallback.

## Current Status

✅ Logo graphic added to header
✅ Font weights properly assigned throughout the app
⚠️  Add actual AEONIK font files to `/public/fonts/`

## Testing

After adding fonts:
1. Restart dev server: `npm run dev`
2. Check browser DevTools → Network tab
3. Verify `aeonik-bold.woff2` and `aeonik-regular.woff2` are loaded
4. Check Elements tab to confirm font-family: 'AEONIK'

