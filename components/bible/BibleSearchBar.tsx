"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const mono = "IBM Plex Mono, monospace";
const gold = "#C9A84C";

const HINTS = [
  { label: "Word", example: "Melchizedek priest" },
  { label: "Phrase", example: '"son of man"' },
  { label: "Reference", example: "1 Peter 3:15" },
  { label: "Strong's", example: "G627" },
];

interface Props {
  onSubmit: (raw: string) => void;
  initialValue?: string;
  showHints?: boolean;
}

export default function BibleSearchBar({ onSubmit, initialValue = "", showHints = false }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = value.trim();
          if (trimmed) onSubmit(trimmed);
        }}
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "stretch",
        }}
      >
        <div style={{ position: "relative", flexGrow: 1 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.35)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Search words, "exact phrase", John 3:16, or G627'}
            aria-label="Search the Bible"
            autoCapitalize="off"
            autoCorrect="off"
            style={{
              width: "100%",
              minHeight: "48px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "8px",
              padding: "12px 14px 12px 40px",
              fontSize: "15px",
              color: "#fff",
              outline: "none",
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            fontFamily: mono,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#0a0a06",
            background: gold,
            border: "none",
            borderRadius: "8px",
            padding: "0 20px",
            minHeight: "48px",
            minWidth: "44px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {showHints && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            marginTop: "14px",
          }}
        >
          {HINTS.map((hint) => (
            <button
              key={hint.label}
              type="button"
              onClick={() => {
                setValue(hint.example);
                onSubmit(hint.example);
              }}
              style={{
                fontFamily: mono,
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "8px 12px",
                minHeight: "32px",
                cursor: "pointer",
              }}
            >
              {hint.label}: <span style={{ color: gold }}>{hint.example}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
