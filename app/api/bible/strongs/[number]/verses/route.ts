import { NextRequest, NextResponse } from "next/server";
import {
  fetchRapid,
  mapVerses,
  MissingKeyError,
  STRONGS_RE,
  IMMUTABLE_CACHE,
  NO_STORE,
} from "@/lib/bible/rapidapi.server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number: rawNumber } = await params;
  const number = rawNumber.toUpperCase();
  const lxx = request.nextUrl.searchParams.get("lxx") ?? "false";

  if (!STRONGS_RE.test(number)) {
    return NextResponse.json(
      { error: "Invalid Strong's number" },
      { status: 400, headers: { "Cache-Control": NO_STORE } },
    );
  }

  if (lxx !== "true" && lxx !== "false") {
    return NextResponse.json(
      { error: "Invalid lxx flag" },
      { status: 400, headers: { "Cache-Control": NO_STORE } },
    );
  }

  try {
    const raw = await fetchRapid<unknown>(`search-strongs/${number}/${lxx}/`);
    const results = mapVerses(raw);
    return NextResponse.json(
      { number, count: results.length, results },
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
      { error: "Concordance is temporarily unavailable" },
      { status: 502, headers: { "Cache-Control": NO_STORE } },
    );
  }
}
