export function getResourceId(url: string): string | undefined {
  return url.split('/').filter(Boolean).at(-1)
}

export function getResourceIds(urls: string[]): string[] {
  return urls.map(getResourceId).filter((id): id is string => Boolean(id))
}
