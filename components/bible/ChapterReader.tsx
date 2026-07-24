"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchChapter, type ChapterResult } from "@/lib/bible/fetchChapter";
import {
  BIBLE_TRANSLATIONS,
  DEFAULT_TRANSLATION,
  getTranslation,
} from "@/lib/bible/translations";
import { BIBLE_BOOKS, type BibleBook } from "@/data/bible-books";
import BookChapterPicker from "./BookChapterPicker";

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

interface Props {
  book: BibleBook;
  chapter: number;
  highlightVerse?: number;
  translationId?: string;
}

function adjacentChapter(book: BibleBook, chapter: number, dir: -1 | 1) {
  const next = chapter + dir;
  if (next >= 1 && next <= book.chapterCount) {
    return { slug: book.slug, chapter: next };
  }
  const neighbour = BIBLE_BOOKS.find((b) => b.id === book.id + dir);
  if (!neighbour) return null;
  return {
    slug: neighbour.slug,
    chapter: dir === 1 ? 1 : neighbour.chapterCount,
  };
}

export default function ChapterReader({ book, chapter, highlightVerse, translationId }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ChapterResult | null>(null);
  const [error, setError] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  const translation = getTranslation(translationId);
  const safeChapter = Math.min(Math.max(1, chapter), book.chapterCount);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(false);

    fetchChapter(book.usfm, safeChapter, translation.id)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [book.usfm, safeChapter, translation.id]);

  useEffect(() => {
    if (data && highlightVerse && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [data, highlightVerse]);

  const prev = adjacentChapter(book, safeChapter, -1);
  const next = adjacentChapter(book, safeChapter, 1);

  const buildUrl = (slug: string, ch: number, t: string) => {
    const tParam = t !== DEFAULT_TRANSLATION ? `&t=${encodeURIComponent(t)}` : "";
    return `/bible?book=${encodeURIComponent(slug)}&chapter=${ch}${tParam}`;
  };

  const go = (target: { slug: string; chapter: number } | null) => {
    if (!target) return;
    router.push(buildUrl(target.slug, target.chapter, translation.id));
  };

  return (
    <section style={{ marginTop: "28px" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: "rgba(10,10,6,0.92)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          padding: "10px 0",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => go(prev)}
          disabled={!prev}
          aria-label="Previous chapter"
          style={{
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "8px",
            color: prev ? gold : "rgba(255,255,255,0.2)",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: prev ? "pointer" : "default",
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          style={{
            fontFamily: serif,
            fontSize: "clamp(16px, 4vw, 20px)",
            fontWeight: 700,
            color: "#fff",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            minHeight: "44px",
            padding: "0 12px",
          }}
        >
          {book.name} {safeChapter}
          <span
            style={{
              fontFamily: mono,
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: gold,
              display: "block",
              marginTop: "2px",
            }}
          >
            Change book
          </span>
        </button>

        <button
          type="button"
          onClick={() => go(next)}
          disabled={!next}
          aria-label="Next chapter"
          style={{
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "8px",
            color: next ? gold : "rgba(255,255,255,0.2)",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: next ? "pointer" : "default",
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: mono,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Version
          <select
            value={translation.id}
            onChange={(e) =>
              router.push(buildUrl(book.slug, safeChapter, e.target.value))
            }
            style={{
              fontFamily: mono,
              fontSize: "12px",
              color: gold,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "8px",
              padding: "10px 12px",
              minHeight: "44px",
              cursor: "pointer",
            }}
          >
            {BIBLE_TRANSLATIONS.map((t) => (
              <option key={t.id} value={t.id} style={{ color: "#000" }}>
                {t.shortName} · {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!data && !error && (
        <p
          style={{
            fontFamily: mono,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            padding: "40px 0",
          }}
        >
          Loading {book.name} {safeChapter}…
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
          The chapter could not be loaded. Check your connection and try again.
        </div>
      )}

      {data && (
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {data.items.map((item, i) =>
            item.type === "heading" ? (
              <h2
                key={`h-${i}`}
                style={{
                  fontFamily: serif,
                  fontSize: "17px",
                  fontWeight: 700,
                  color: gold,
                  margin: "26px 0 10px",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </h2>
            ) : (
              <span
                key={`v-${item.verse}-${i}`}
                ref={item.verse === highlightVerse ? highlightRef : undefined}
                id={`v${item.verse}`}
                style={{
                  fontSize: "16px",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.85)",
                  background:
                    item.verse === highlightVerse
                      ? "rgba(201,168,76,0.14)"
                      : "transparent",
                  borderRadius: "4px",
                }}
              >
                <sup
                  style={{
                    fontFamily: mono,
                    fontSize: "10px",
                    color: gold,
                    marginRight: "4px",
                  }}
                >
                  {item.verse}
                </sup>
                {item.text}{" "}
              </span>
            ),
          )}
          <p
            style={{
              fontFamily: mono,
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              textAlign: "center",
              marginTop: "28px",
            }}
          >
            {translation.name}
          </p>
        </div>
      )}

      {pickerOpen && (
        <BookChapterPicker
          currentBook={book}
          onClose={() => setPickerOpen(false)}
          onSelect={(slug, ch) => {
            setPickerOpen(false);
            go({ slug, chapter: ch });
          }}
        />
      )}
    </section>
  );
}
