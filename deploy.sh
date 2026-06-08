#!/bin/bash
# Tiger Tracks Redesign — Deploy to Vercel
# Run this from the tigertracks-site folder:
#   chmod +x deploy.sh && ./deploy.sh

set -e

echo "🐯 Deploying Tiger Tracks redesign..."

# Push to GitHub repo (elizabeth753/tigertracks-redesign)
if [ ! -d .git ]; then
  git init
  git branch -M main
  git remote add origin https://github.com/elizabeth753/tigertracks-redesign.git
fi

git add -A
git commit -m "Homepage redesign: cinematic hero, AG1 proof card, immersive backgrounds" || true
git push -u origin main --force

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "Now deploy to Vercel (creates a new site, no effect on existing production):"
echo ""

# Deploy as preview (not production) — gets its own URL
npx vercel deploy

echo ""
echo "🎉 Done! Your preview URL is shown above."
echo "To promote to production later: npx vercel deploy --prod"
