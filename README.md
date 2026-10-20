# Hotel Sherpa Soul - Official Website

> ### ⚠️ META PIXEL PROTECTION
> **The Meta Pixel code in index.html must NEVER be removed or modified during upgrades/redesigns. It loads from `VITE_META_PIXEL_ID`. The build fails automatically if pixel code is missing.**
> 
> - **Primary Script**: Located permanently in `index.html` `<head>`.
> - **Environment Variable**: `VITE_META_PIXEL_ID` (configured in Vercel for Production, Preview, and Development).
> - **Automated Pre-Deploy Guard**: `scripts/verify-pixel.cjs` runs on every `npm run build`. If the pixel base script, initialization, or PageView event is absent in the `dist/` output, the build terminates with error code 1, automatically aborting the deployment.

---

## Technical Overview
- **Framework**: React 19 + Vite (with SSG Pre-rendering for 17 static routes)
- **Styling**: Tailwind CSS
- **Analytics & Tracking**:
  - **Meta Pixel**: Permanent setup in `index.html` + SPA route tracker `MetaPixel.jsx`
  - **Google Tag Manager**: `GTM-PFRV7ZTV` in `<head>` and `<noscript>`
  - **Google Analytics 4**: `G-E7Z3QDR3KD` with Google Consent Mode v2
- **Conversion Events**:
  - `PageView`: Automatic across all pages and SPA transitions
  - `ViewContent`: Room details (`/room/*`) with room details & USD value
  - `Contact`: Contact form submissions (`/contact`)
  - `Lead`: Booking inquiry start (`/book-now`, `/book/*`) and booking clicks
  - `booking_completed`: Successful booking confirmations

---

## Local Development & Build
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Production build with SSG pre-render and Meta Pixel verification
npm run build

# Preview production build
npm run preview
```
