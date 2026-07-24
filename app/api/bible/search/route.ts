import { NextRequest, NextResponse } from "next/server";
import {
  fetchRapid,
  mapVerses,
  sanitizeSearchTerm,
  MissingKeyError,
  IMMUTABLE_CACHE,
  NO_STORE,
} from "@/lib/bible/rapidapi.server";

const MAX_RESULTS = 200;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawQ = params.get("q") ?? "";
  const mode = params.get("mode") ?? "words";

  if (mode !== "words" && mode !== "phrase") {
    return NextResponse.json(
      { error: "Invalid search mode" },
      { status: 400, headers: { "Cache-Control": NO_STORE } },
    );
  }

  const term = sanitizeSearchTerm(rawQ);
  if (!term) {
    return NextResponse.json(
      { error: "Invalid search term" },
      { status: 400, headers: { "Cache-Control": NO_STORE } },
    );
  }

  const endpoint = mode === "phrase" ? "search-exact" : "search";

  try {
    const raw = await fetchRapid<unknown>(`${endpoint}/${encodeURIComponent(term)}/`);
    const results = mapVerses(raw).slice(0, MAX_RESULTS);
    return NextResponse.json(
      { query: term, mode, count: results.length, results },
      { headers: { "Cache-Control": IMMUTABLE_CACHE } },
    );
  } catch (err) {
    if (err instanceof MissingKeyError) {
      return NextResponse.json(
        { error: "Lexicon not configured" },
        { status: 503, headers: { "Cache-Control": NO_STORE } },
      );
    }
    return NextResponse.json(
      { error: "Bible search is temporarily unavailable" },
      { status: 502, headers: { "Cache-Control": NO_STORE } },
    );
  }
}
