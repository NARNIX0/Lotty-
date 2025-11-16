# How to Get AEONIK Fonts on Your Site

## The Problem

The app is looking for:
- `/fonts/aeonik-bold.woff2`
- `/fonts/aeonik-regular.woff2`

But these files don't exist, causing 404 errors.

## Solution Options

### Option 1: Use Your Existing AEONIK Font Files

If you have AEONIK font files:

1. **Convert to `.woff2` format** (if needed):
   - Use online converter: https://cloudconvert.com/ttf-to-woff2
   - Or use `woff2_compress` tool

2. **Name them exactly**:
   - `aeonik-bold.woff2` (for weight 700)
   - `aeonik-regular.woff2` (for weight 400)

3. **Place in**:
   ```
   frontend/public/fonts/
   ```

4. **Restart dev server**

### Option 2: Use System Fonts (Temporary)

If you don't have AEONIK fonts, the app will fall back to system fonts. The styling will still work, just with different fonts.

### Option 3: Use Google Fonts Alternative

If you want a similar modern sans-serif font, you could use:
- **Inter** (similar to AEONIK)
- **Poppins**
- **Space Grotesk**

To use Google Fonts:

1. **Add to `layout.tsx`**:
   ```tsx
   import { Inter } from 'next/font/google'
   
   const inter = Inter({ subsets: ['latin'] })
   ```

2. **Update CSS** to use the Google Font

## Current Status

- ✅ Font references are set up correctly
- ✅ Fallback to `sans-serif` if fonts missing
- ⚠️ Need to add actual font files

## Quick Fix: Use System Fonts

The app will work fine with system fonts. The 404 errors are harmless - the browser will just use the fallback `sans-serif` font.

If you want to remove the 404 errors:
1. Add the font files, OR
2. Comment out the `@font-face` declarations in `globals.css`

## For Hackathon

**System fonts are fine!** The app will work perfectly with fallback fonts. The 404 errors don't break anything - they're just warnings that the custom fonts aren't found.

