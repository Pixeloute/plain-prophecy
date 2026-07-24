"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchBible, BibleApiError, type SearchResponse } from "@/lib/bible/client";
import { BIBLE_BOOKS } from "@/data/bible-books";

const mono = "IBM Plex Mono, monospace";
const gold = "#C9A84C";

function bookSlugFromAbbrev(abbrev: string): string | undefined {
  return BIBLE_BOOKS.find((b) => b.abbrev === abbrev)?.slug;
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  const words = query
    .replace(/"/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (words.length === 0) return <>{text}</>;

  const pattern = new RegExp(
    `(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "gi",
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        pattern.test(part) ? (
          <span key={i} style={{ color: gold, fontWeight: 600 }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

interface Props {
  query: string;
  mode: "words" | "phrase";
}

export default function SearchResultsList({ query, mode }: Props) {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    searchBible(query, mode)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof BibleApiError && err.status === 400) {
          setError("Use letters and numbers only, up to 80 characters.");
        } else {
          setError(
            "Search is temporarily unavailable. Try a reference like John 3:16 instead.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, mode]);

  return (
    <section style={{ marginTop: "36px" }}>
      {loading && (
        <p
          style={{
            fontFamily: mono,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          Searching…
        </p>
      )}

      {error && (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "8px",
            padding: "24px",
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          {error}
        </div>
      )}

      {data && (
        <>
          <div
            style={{
              fontFamily: mono,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: "16px",
            }}
          >
            {data.count} {data.count === 1 ? "verse" : "verses"}
            {mode === "phrase" ? " · exact phrase" : ""}
          </div>

          {data.count === 0 && (
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.7 }}>
              No verses found. Check the spelling, or try fewer words.
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {data.results.map((v) => {
              const slug = bookSlugFromAbbrev(v.abbrev);
              const card = (
                <article
                  className="bible-result-card"
                  style={{
                    background: "linear-gradient(160deg, #111108 0%, #0a0a06 100%)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "8px",
                    padding: "18px 20px",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: gold,
                      marginBottom: "8px",
                    }}
                  >
                    {v.book} {v.chapter}:{v.verse}
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    <HighlightedText text={v.text} query={query} />
                  </p>
                </article>
              );

              return slug ? (
                <Link
                  key={`${v.abbrev}-${v.chapter}-${v.verse}`}
                  href={`/bible?book=${encodeURIComponent(slug)}&chapter=${v.chapter}&v=${v.verse}`}
                  style={{ textDecoration: "none" }}
                >
                  {card}
                </Link>
              ) : (
                <div key={`${v.abbrev}-${v.chapter}-${v.verse}`}>{card}</div>
              );
            })}
          </div>
        </>
      )}

      <style>{`
        .bible-result-card:hover {
          border-color: rgba(201,168,76,0.4) !important;
        }
      `}</style>
    </section>
  );
}
