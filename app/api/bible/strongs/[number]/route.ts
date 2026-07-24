import { NextRequest, NextResponse } from "next/server";
import {
  fetchRapid,
  sanitizeLexiconHtml,
  MissingKeyError,
  STRONGS_RE,
  IMMUTABLE_CACHE,
  NO_STORE,
} from "@/lib/bible/rapidapi.server";

interface RapidStrongsRow {
  id: number;
  original_word: string;
  number: string;
  strong_definition: string;
  mounce_definition: string;
  bdb_definition: string;
  helps_word_studies: string;
  thayers_definition: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ number: string }> },
) {
  const { number: rawNumber } = await params;
  const number = rawNumber.toUpperCase();

  if (!STRONGS_RE.test(number)) {
    return NextResponse.json(
      { error: "Invalid Strong's number" },
      { status: 400, headers: { "Cache-Control": NO_STORE } },
    );
  }

  try {
    const raw = await fetchRapid<RapidStrongsRow[]>(`strongs-detail/${number}/`);
    const entry = Array.isArray(raw) ? raw[0] : undefined;
    if (!entry) {
      return NextResponse.json(
        { error: "Strong's number not found" },
        { status: 404, headers: { "Cache-Control": NO_STORE } },
      );
    }
    return NextResponse.json(
      {
        number,
        originalWord: entry.original_word ?? "",
        strongDefinition: entry.strong_definition ?? "",
        mounceDefinition: entry.mounce_definition ?? "",
        bdbDefinition: entry.bdb_definition ?? "",
        thayersDefinition: sanitizeLexiconHtml(entry.thayers_definition ?? ""),
        helpsWordStudies: sanitizeLexiconHtml(entry.helps_word_studies ?? ""),
      },
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
      { error: "Lexicon is temporarily unavailable" },
      { status: 502, headers: { "Cache-Control": NO_STORE } },
    );
  }
}
