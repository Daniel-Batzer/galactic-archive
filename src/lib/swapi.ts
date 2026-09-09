export function getResourceId(url: string): string | undefined {
  return url.split('/').filter(Boolean).at(-1)
}
