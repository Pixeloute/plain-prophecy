"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { BIBLE_BOOKS, type BibleBook } from "@/data/bible-books";

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

interface Props {
  currentBook: BibleBook;
  onClose: () => void;
  onSelect: (slug: string, chapter: number) => void;
}

export default function BookChapterPicker({ currentBook, onClose, onSelect }: Props) {
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose a book and chapter"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        className="bible-picker-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "85dvh",
          background: "#0f0e08",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {selectedBook ? (
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: gold,
                fontFamily: mono,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              <ChevronLeft size={16} /> Books
            </button>
          ) : (
            <span
              style={{
                fontFamily: mono,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: gold,
              }}
            >
              Choose a book
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              minWidth: "44px",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "16px 18px 24px" }}>
          {!selectedBook ? (
            (["OT", "NT"] as const).map((testament) => (
              <div key={testament} style={{ marginBottom: "20px" }}>
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
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "8px",
                  }}
                >
                  {BIBLE_BOOKS.filter((b) => b.testament === testament).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBook(b)}
                      style={{
                        fontSize: "13px",
                        color:
                          b.id === currentBook.id ? gold : "rgba(255,255,255,0.75)",
                        background: "rgba(255,255,255,0.03)",
                        border:
                          b.id === currentBook.id
                            ? "1px solid rgba(201,168,76,0.5)"
                            : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        padding: "12px 10px",
                        minHeight: "44px",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "14px",
                }}
              >
                {selectedBook.name}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
                  gap: "8px",
                }}
              >
                {Array.from({ length: selectedBook.chapterCount }, (_, i) => i + 1).map(
                  (ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => onSelect(selectedBook.slug, ch)}
                      style={{
                        fontFamily: mono,
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.8)",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        minHeight: "44px",
                        cursor: "pointer",
                      }}
                    >
                      {ch}
                    </button>
                  ),
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .bible-picker-sheet {
            border-radius: 16px !important;
            margin-bottom: 8dvh;
          }
        }
      `}</style>
    </div>
  );
}
