// Client-safe fetchers for the /api/bible routes.
// Module-level caches persist for the session so repeated lookups make no
// network request (same pattern as fetchVerse.ts).

export interface SearchVerse {
  book: string
  abbrev: string
  chapter: number
  verse: number
  text: string
}

export interface SearchResponse {
  query?: string
  mode?: "words" | "phrase"
  number?: string
  count: number
  results: SearchVerse[]
}

export interface StrongsEntry {
  number: string
  originalWord: string
  strongDefinition: string
  mounceDefinition: string
  bdbDefinition: string
  thayersDefinition: string
  helpsWordStudies: string
}

export class BibleApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const cache = new Map<string, unknown>()

async function fetchJson<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T

  const res = await fetch(url)
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const message =
      data && typeof data.error === "string" ? data.error : "Request failed"
    throw new BibleApiError(res.status, message)
  }

  cache.set(url, data)
  return data as T
}

export function searchBible(q: string, mode: "words" | "phrase"): Promise<SearchResponse> {
  return fetchJson<SearchResponse>(
    `/api/bible/search?q=${encodeURIComponent(q)}&mode=${mode}`,
  )
}

export function fetchStrongs(num: string): Promise<StrongsEntry> {
  return fetchJson<StrongsEntry>(`/api/bible/strongs/${encodeURIComponent(num)}`)
}

export function fetchStrongsVerses(num: string): Promise<SearchResponse> {
  return fetchJson<SearchResponse>(
    `/api/bible/strongs/${encodeURIComponent(num)}/verses?lxx=false`,
  )
}
