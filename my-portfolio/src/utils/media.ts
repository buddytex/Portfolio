/**
 * Universal Media URL Resolver
 * Resolves static media paths with base-path awareness and safe URI encoding.
 * Ensures compatibility with Vite dev, Astro static output, and GitHub Pages subpaths.
 */

export function resolveMediaUrl(rawPath: string | null | undefined): string {
  if (!rawPath) return '';
  if (rawPath.startsWith('http://') || rawPath.startsWith('https://') || rawPath.startsWith('data:')) {
    return rawPath;
  }

  // Ensure leading slash
  const cleanPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  
  // Split query or hash if any
  const [pathWithoutQuery, queryOrHash] = cleanPath.split(/(?=[?#])/);

  // Encode URI components while preserving forward slashes
  // Also encode parentheses for maximum server/proxy compatibility with media streaming
  const encodedPath = pathWithoutQuery
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');

  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const suffix = queryOrHash || '';

  return `${base}${encodedPath}${suffix}`;
}
