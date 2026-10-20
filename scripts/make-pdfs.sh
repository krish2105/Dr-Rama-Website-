#!/usr/bin/env bash
# Builds the printable First visit pages and the QR poster as PDFs in public/downloads (EN + HI).
# The QR code encodes SITE_URL, so run this with the address patients will really use:
#   SITE_URL=https://rajeshhomoeohome.in npm run pdfs
# Needs Google Chrome (macOS path below, or set CHROME=/path/to/chrome).
set -euo pipefail
cd "$(dirname "$0")/.."
SITE_URL="${SITE_URL:-https://dr-rama-website.vercel.app}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT=3217
mkdir -p public/downloads
NEXT_PUBLIC_SITE_URL="$SITE_URL" npm run build >/dev/null
NEXT_PUBLIC_SITE_URL="$SITE_URL" npx next start -p "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 40); do curl -sf "http://localhost:$PORT/en" >/dev/null && break; sleep 0.5; done
for loc in en hi; do
  for page in first-visit qr-poster; do
    "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
      --print-to-pdf="public/downloads/$page-$loc.pdf" "http://localhost:$PORT/$loc/$page" >/dev/null 2>&1
    echo "wrote public/downloads/$page-$loc.pdf"
  done
done
