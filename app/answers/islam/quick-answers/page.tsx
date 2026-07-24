import type { Metadata } from "next";
import Link from "next/link";
import { quickAnswers } from "@/data/answers-islam";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Quick Answers to Common Objections: Plain Prophecy",
  description:
    "Eight objections Muslims raise about Christianity, each answered in under a hundred words with the Scripture references to check for yourself.",
  alternates: {
    canonical: "https://plainprophecy.com/answers/islam/quick-answers",
  },
  openGraph: {
    title: "Quick Answers to Common Objections | Plain Prophecy",
    description:
      "Eight objections Muslims raise about Christianity, each answered in under a hundred words.",
    url: "https://plainprophecy.com/answers/islam/quick-answers",
    type: "article",
  },
};

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

export default function QuickAnswersPage() {
  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: quickAnswers.map((qa) => ({
            "@type": "Question",
            name: qa.objection,
            acceptedAnswer: {
              "@type": "Answer",
              text: qa.answer.join(" "),
            },
          })),
        }}
      />

      <header
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "64px 24px 40px",
          textAlign: "center",
        }}
      >
        <Link
          href="/answers/islam"
          style={{
            fontFamily: mono,
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.7)",
            textDecoration: "none",
          }}
        >
          ← Answers · Islam
        </Link>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(26px, 5.5vw, 42px)",
            fontWeight: 900,
            lineHeight: 1.12,
            color: "#fff",
            margin: "28px 0 14px",
          }}
        >
          Common Objections, Short Answers
        </h1>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Eight objections you will hear in any conversation. Tap one to open
          the answer, then check every reference for yourself.
        </p>
      </header>

      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
          {quickAnswers.map((qa, i) => (
            <details
              key={qa.id}
              className="qa-item"
              open={i === 0}
              style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  padding: "18px 4px",
                  minHeight: "44px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  fontFamily: serif,
                  fontSize: "clamp(15px, 4vw, 18px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.35,
                }}
              >
                {qa.objection}
                <span
                  className="qa-marker"
                  aria-hidden="true"
                  style={{
                    fontFamily: mono,
                    fontSize: "18px",
                    color: gold,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div style={{ padding: "0 4px 20px" }}>
                {qa.answer.map((para, j) => (
                  <p
                    key={j}
                    style={{
                      margin: "0 0 12px",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {para}
                  </p>
                ))}
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(201,168,76,0.7)",
                  }}
                >
                  {qa.refs}
                </div>
              </div>
            </details>
          ))}
        </div>

        <div
          style={{
            marginTop: "48px",
            textAlign: "center",
          }}
        >
          <Link
            href="/answers/islam/the-islamic-dilemma"
            style={{
              display: "inline-block",
              fontFamily: mono,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: gold,
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "14px 24px",
              textDecoration: "none",
            }}
          >
            Go deeper: The Islamic Dilemma →
          </Link>
        </div>
      </section>

      <style>{`
        .qa-item summary::-webkit-details-marker { display: none; }
        .qa-item[open] .qa-marker::before { content: ""; }
        .qa-item[open] .qa-marker { visibility: hidden; position: relative; }
        .qa-item[open] .qa-marker::after {
          content: "–";
          visibility: visible;
          position: absolute;
          left: 0;
        }
        .qa-item summary:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}
