# Deploy Notes

This portfolio uses local MP4 files for development, but several videos are larger than GitHub's 100MB file limit.

For a permanent public website:

1. Upload MP4 files in `public/media/` to object storage/CDN.
2. Replace local paths such as `/media/live-lpl.mp4` in `src/main.jsx` with the public video URLs.
3. Commit only code and small assets to GitHub.
4. Deploy the site to Vercel, Netlify, Cloudflare Pages, or another static host.

Do not commit `public/media/*.mp4` to GitHub.
