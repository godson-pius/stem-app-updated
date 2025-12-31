export function extractYouTubeId(url: any) {
  if (!url) return null;

  // 1. Embed URLs → youtube.com/embed/{id}
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];

  // 2. Watch URLs → youtube.com/watch?v={id}
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];

  // 3. Short URLs → youtu.be/{id}
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];

  // 4. Catch-all fallback (last segment)
  const fallback = url.split('/').pop().split('?')[0];
  if (fallback) return fallback;

  return null;
}