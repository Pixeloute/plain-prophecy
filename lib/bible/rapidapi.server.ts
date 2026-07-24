// Server-only helper for the Complete Study Bible RapidAPI.
// Never import this module from client code: it reads RAPIDAPI_KEY.

const BASE = "https://complete-study-bible.p.rapidapi.com";
const HOST = "complete-study-bible.p.rapidapi.com";

export class MissingKeyError extends Error {
  constructor() {
    super("RAPIDAPI_KEY is not configured");
  }
}

export class UpstreamError extends Error {
  status: number;
  constructor(status: number) {
    super(`Upstream responded with ${status}`);
    this.status = status;
  }
}

/**
 * Fetch a path from the Complete Study Bible API. Uses Next's persistent
 * Data Cache (force-cache) so each unique upstream URL is requested at most
 * once per deployment. Bible data is immutable, so this never needs to
 * revalidate.
 */
export async function fetchRapid<T>(path: string): Promise<T> {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new MissingKeyError();

  const res = await fetch(`${BASE}/${path}`, {
    headers: {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": key,
    },
    cache: "force-cache",
  });

  if (!res.ok) throw new UpstreamError(res.status);
  return (await res.json()) as T;
}

/** Raw verse row shape returned by the upstream search endpoints. */
export interface RapidVerseRow {
  book__name: string;
  book__abbrev: string;
  chapter: string | number;
  verse: string | number;
  kjv: string;
}

export interface SearchVerse {
  book: string;
  abbrev: string;
  chapter: number;
  verse: number;
  text: string;
}

export function mapVerses(raw: unknown): SearchVerse[] {
  if (!Array.isArray(raw)) return [];
  return (raw as RapidVerseRow[])
    .filter((r) => r && typeof r.kjv === "string")
    .map((r) => ({
      book: r.book__name,
      abbrev: r.book__abbrev,
      chapter: Number(r.chapter),
      verse: Number(r.verse),
      text: r.kjv,
    }));
}

/** Strong's numbers: G1-G5624, H1-H8674. Validate after uppercasing. */
export const STRONGS_RE = /^[GH]\d{1,4}$/;

/**
 * Validate and normalise a free-text search term.
 * Returns null when the term is unusable.
 */
export function sanitizeSearchTerm(raw: string): string | null {
  const term = raw.trim().replace(/\s+/g, " ");
  if (term.length < 2 || term.length > 80) return null;
  if (!/^[a-zA-Z0-9' -]+$/.test(term)) return null;
  return term;
}

/**
 * Minimal HTML sanitizer for lexicon definition fields (e.g. Thayer's).
 * Strips script/style/iframe blocks, event handler attributes, and
 * javascript: URLs. Keeps basic formatting tags.
 */
export function sanitizeLexiconHtml(html: string): string {
  if (!html) return "";
  let out = html;
  out = out.replace(/<\s*(script|style|iframe)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");
  out = out.replace(/<\s*(script|style|iframe)[^>]*\/?\s*>/gi, "");
  out = out.replace(/\son\w+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\son\w+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
  out = out.replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'\s>]*\2/gi, "");
  return out;
}

/** Cache headers: Bible data never changes, cache success hard at the edge. */
export const IMMUTABLE_CACHE = "public, s-maxage=31536000, stale-while-revalidate=86400";
export const NO_STORE = "no-store";
