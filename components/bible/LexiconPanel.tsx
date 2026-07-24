"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import {
  fetchStrongs,
  fetchStrongsVerses,
  BibleApiError,
  type StrongsEntry,
  type SearchResponse,
} from "@/lib/bible/client";
import { BIBLE_BOOKS } from "@/data/bible-books";

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

/** Render plain lexicon text, turning G123 / H123 tokens into lexicon links. */
function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/\b([GH]\d{1,4})\b/g);
  return (
    <>
      {parts.map((part, i) =>
        /^[GH]\d{1,4}$/.test(part) ? (
          <Link
            key={i}
            href={`/bible?strongs=${part}`}
            style={{ color: gold, textDecoration: "underline" }}
          >
            {part}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function DefinitionSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details
      open
      className="bible-lex-section"
      style={{
        border: "1px solid rgba(201,168,76,0.15)",
        borderRadius: "8px",
        background: "linear-gradient(160deg, #111108 0%, #0a0a06 100%)",
      }}
    >
      <summary
        style={{
          fontFamily: mono,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: gold,
          padding: "14px 18px",
          cursor: "pointer",
          listStyle: "none",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </summary>
      <div
        style={{
          padding: "0 18px 18px",
          fontSize: "14px",
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </details>
  );
}

interface Props {
  number: string;
}

export default function LexiconPanel({ number }: Props) {
  const [entry, setEntry] = useState<StrongsEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState<SearchResponse | null>(null);
  const [versesLoading, setVersesLoading] = useState(false);
  const [versesError, setVersesError] = useState(false);

  const normalized = number.toUpperCase();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setEntry(null);
    setVerses(null);
    setVersesError(false);

    fetchStrongs(normalized)
      .then((res) => {
        if (!cancelled) setEntry(res);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof BibleApiError && err.status === 404) {
          setError(`No lexicon entry found for ${normalized}.`);
        } else if (err instanceof BibleApiError && err.status === 400) {
          setError("Strong's numbers look like G627 or H7225.");
        } else {
          setError("The lexicon is temporarily unavailable. Please check back soon.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [normalized]);

  const loadVerses = () => {
    if (verses || versesLoading) return;
    setVersesLoading(true);
    fetchStrongsVerses(normalized)
      .then(setVerses)
      .catch(() => setVersesError(true))
      .finally(() => setVersesLoading(false));
  };

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
          Opening the lexicon…
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

      {entry && (
        <>
          <header style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                fontFamily: serif,
                fontSize: "clamp(34px, 8vw, 56px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {entry.originalWord}
            </div>
            <div
              style={{
                display: "inline-block",
                fontFamily: mono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: gold,
                border: "1px solid rgba(201,168,76,0.35)",
                background: "rgba(201,168,76,0.08)",
                borderRadius: "999px",
                padding: "6px 14px",
                marginTop: "12px",
              }}
            >
              Strong&apos;s {entry.number} ·{" "}
              {entry.number.startsWith("G") ? "Greek" : "Hebrew"}
            </div>
          </header>

          <div className="bible-lex-grid" style={{ display: "grid", gap: "12px" }}>
            {entry.strongDefinition && (
              <DefinitionSection title="Strong's Definition">
                <LinkifiedText text={entry.strongDefinition} />
              </DefinitionSection>
            )}
            {entry.mounceDefinition && (
              <DefinitionSection title="Mounce's Dictionary">
                <LinkifiedText text={entry.mounceDefinition} />
              </DefinitionSection>
            )}
            {entry.bdbDefinition && (
              <DefinitionSection title="Brown-Driver-Briggs">
                <LinkifiedText text={entry.bdbDefinition} />
              </DefinitionSection>
            )}
            {entry.thayersDefinition && (
              <DefinitionSection title="Thayer's Greek Lexicon">
                <div
                  className="bible-lex-html"
                  dangerouslySetInnerHTML={{ __html: entry.thayersDefinition }}
                />
              </DefinitionSection>
            )}
            {entry.helpsWordStudies && (
              <DefinitionSection title="HELPS Word Studies">
                <div
                  className="bible-lex-html"
                  dangerouslySetInnerHTML={{ __html: entry.helpsWordStudies }}
                />
              </DefinitionSection>
            )}

            <details
              className="bible-lex-section"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) loadVerses();
              }}
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "8px",
                background: "linear-gradient(160deg, #111108 0%, #0a0a06 100%)",
              }}
            >
              <summary
                style={{
                  fontFamily: mono,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: gold,
                  padding: "14px 18px",
                  cursor: "pointer",
                  listStyle: "none",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Occurrences in the KJV
              </summary>
              <div style={{ padding: "0 18px 18px" }}>
                {versesLoading && (
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Loading…
                  </p>
                )}
                {versesError && (
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Occurrences are temporarily unavailable.
                  </p>
                )}
                {verses && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {verses.count} {verses.count === 1 ? "verse" : "verses"}
                    </div>
                    {verses.results.map((v) => {
                      const slug = BIBLE_BOOKS.find((b) => b.abbrev === v.abbrev)?.slug;
                      const row = (
                        <div style={{ padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <div
                            style={{
                              fontFamily: mono,
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: gold,
                              marginBottom: "6px",
                            }}
                          >
                            {v.book} {v.chapter}:{v.verse}
                          </div>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.8)",
                              lineHeight: 1.7,
                              margin: 0,
                            }}
                          >
                            {v.text}
                          </p>
                        </div>
                      );
                      return slug ? (
                        <Link
                          key={`${v.abbrev}-${v.chapter}-${v.verse}`}
                          href={`/bible?book=${encodeURIComponent(slug)}&chapter=${v.chapter}&v=${v.verse}`}
                          style={{ textDecoration: "none" }}
                        >
                          {row}
                        </Link>
                      ) : (
                        <div key={`${v.abbrev}-${v.chapter}-${v.verse}`}>{row}</div>
                      );
                    })}
                  </div>
                )}
              </div>
            </details>
          </div>

          <style>{`
            .bible-lex-section summary::-webkit-details-marker { display: none; }
            .bible-lex-html a { color: ${gold}; }
            .bible-lex-html div, .bible-lex-html span, .bible-lex-html p {
              font-size: 14px;
              line-height: 1.7;
            }
            @media (min-width: 768px) {
              .bible-lex-grid { grid-template-columns: 1fr; max-width: 720px; margin: 0 auto; }
            }
          `}</style>
        </>
      )}
    </section>
  );
}
