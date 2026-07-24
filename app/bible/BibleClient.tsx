"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BIBLE_BOOKS, getBookBySlug } from "@/data/bible-books";
import { detectQuery } from "@/lib/bible/detectQuery";
import BibleSearchBar from "@/components/bible/BibleSearchBar";
import SearchResultsList from "@/components/bible/SearchResultsList";
import LexiconPanel from "@/components/bible/LexiconPanel";
import ChapterReader from "@/components/bible/ChapterReader";

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

export default function BibleClient() {
  const router = useRouter();
  const params = useSearchParams();

  const strongs = params.get("strongs");
  const bookSlug = params.get("book");
  const q = params.get("q");
  const mode = params.get("mode") === "phrase" ? "phrase" : "words";
  const chapter = Number(params.get("chapter") ?? "1");
  const highlightVerse = Number(params.get("v") ?? "0");
  const translationId = params.get("t") ?? undefined;

  const book = bookSlug ? getBookBySlug(bookSlug) : undefined;

  const submitQuery = useCallback(
    (raw: string) => {
      const intent = detectQuery(raw);
      switch (intent.kind) {
        case "strongs":
          router.push(`/bible?strongs=${intent.number}`);
          break;
        case "reference":
          router.push(
            `/bible?book=${encodeURIComponent(intent.slug)}&chapter=${intent.chapter}&v=${intent.verse}`,
          );
          break;
        case "chapter":
          router.push(
            `/bible?book=${encodeURIComponent(intent.slug)}&chapter=${intent.chapter}`,
          );
          break;
        case "phrase":
          router.push(`/bible?q=${encodeURIComponent(intent.term)}&mode=phrase`);
          break;
        case "words":
          router.push(`/bible?q=${encodeURIComponent(intent.term)}`);
          break;
      }
    },
    [router],
  );

  const view = strongs ? "lexicon" : book ? "reader" : q ? "search" : "landing";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 96px" }}>
      <header
        style={{
          padding: view === "landing" ? "64px 0 28px" : "40px 0 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: gold,
            marginBottom: "14px",
          }}
        >
          Study · Bible
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: view === "landing" ? "clamp(30px, 6vw, 52px)" : "clamp(22px, 4vw, 34px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            margin: 0,
          }}
        >
          Search the Scriptures
        </h1>
        {view === "landing" && (
          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "520px",
              margin: "18px auto 0",
              lineHeight: 1.7,
            }}
          >
            Look up a verse, search a word or phrase, or open the Greek and
            Hebrew behind the English with a Strong&apos;s number.
          </p>
        )}
      </header>

      <BibleSearchBar
        onSubmit={submitQuery}
        initialValue={q ?? strongs ?? ""}
        showHints={view === "landing"}
      />

      {view === "search" && q && (
        <SearchResultsList query={q} mode={mode} />
      )}

      {view === "lexicon" && strongs && <LexiconPanel number={strongs} />}

      {view === "reader" && book && (
        <ChapterReader
          book={book}
          chapter={chapter}
          highlightVerse={highlightVerse || undefined}
          translationId={translationId}
        />
      )}

      {view === "landing" && (
        <section style={{ marginTop: "48px" }}>
          <div
            style={{
              fontFamily: mono,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: "16px",
            }}
          >
            Read by Book
          </div>
          {(["OT", "NT"] as const).map((testament) => (
            <div key={testament} style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "10px",
                }}
              >
                {testament === "OT" ? "Old Testament" : "New Testament"}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "8px",
                }}
              >
                {BIBLE_BOOKS.filter((b) => b.testament === testament).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className="bible-book-btn"
                    onClick={() =>
                      router.push(`/bible?book=${encodeURIComponent(b.slug)}&chapter=1`)
                    }
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.75)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      borderRadius: "6px",
                      padding: "12px 10px",
                      minHeight: "44px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease, color 0.2s ease",
                    }}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <style>{`
        .bible-book-btn:hover {
          border-color: rgba(201,168,76,0.45);
          color: #fff;
        }
      `}</style>
    </div>
  );
}
