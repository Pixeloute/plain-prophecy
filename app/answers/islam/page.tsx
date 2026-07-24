import type { Metadata } from "next";
import Link from "next/link";
import { answerStudies } from "@/data/answers-islam";

export const metadata: Metadata = {
  title: "Answering Islam's Objections: Plain Prophecy",
  description:
    "Honest answers to the questions Muslims ask about the Bible, the cross, and who Jesus is. Every response traces back to Scripture, history, and Islam's own sources.",
  alternates: {
    canonical: "https://plainprophecy.com/answers/islam",
  },
  openGraph: {
    title: "Answering Islam's Objections | Plain Prophecy",
    description:
      "Honest answers to the questions Muslims ask about the Bible, the cross, and who Jesus is.",
    url: "https://plainprophecy.com/answers/islam",
    type: "website",
  },
};

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

export default function AnswersIslamPage() {
  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      {/* Hero */}
      <header
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "72px 24px 48px",
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
            marginBottom: "16px",
          }}
        >
          Answers · Islam
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(30px, 6vw, 52px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Honest Answers to Islam&apos;s Questions
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "540px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Muslims ask real questions about the Bible, the cross, and who Jesus
          is. They deserve real answers. Every response here traces back to
          Scripture, to history, and to Islam&apos;s own sources.
        </p>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "520px",
            margin: "28px auto 0",
            lineHeight: 1.7,
          }}
        >
          &ldquo;But in your hearts honor Christ the Lord as holy, always being
          prepared to make a defense to anyone who asks you for a reason for the
          hope that is in you; yet do it with gentleness and respect.&rdquo;
          <span
            style={{
              display: "block",
              fontStyle: "normal",
              fontFamily: mono,
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.7)",
              marginTop: "10px",
            }}
          >
            1 Peter 3:15
          </span>
        </p>
      </header>

      {/* Study grid */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 64px",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: gold,
            marginBottom: "20px",
          }}
        >
          The Studies
        </div>
        <div
          className="answers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {answerStudies.map((study) => {
            const card = (
              <article
                className={study.status === "live" ? "answers-card answers-card-live" : "answers-card"}
                style={{
                  background: "linear-gradient(160deg, #111108 0%, #0a0a06 100%)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "8px",
                  padding: "26px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  opacity: study.status === "live" ? 1 : 0.6,
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: gold,
                    opacity: 0.8,
                  }}
                >
                  Study {study.number}
                </div>
                <h2
                  style={{
                    fontFamily: serif,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {study.title}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {study.subtitle}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: gold,
                      border: "1px solid rgba(201,168,76,0.3)",
                      background: "rgba(201,168,76,0.1)",
                      padding: "4px 8px",
                    }}
                  >
                    {study.visualChip}
                  </span>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "4px 8px",
                    }}
                  >
                    {study.scriptureChip}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: "11px",
                    color: study.status === "live" ? gold : "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "8px",
                  }}
                >
                  {study.status === "live" ? "Read →" : "In progress"}
                </span>
              </article>
            );

            return study.status === "live" ? (
              <Link
                key={study.slug}
                href={`/answers/islam/${study.slug}`}
                style={{ textDecoration: "none" }}
              >
                {card}
              </Link>
            ) : (
              <div key={study.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* Quick answers callout */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <Link href="/answers/islam/quick-answers" style={{ textDecoration: "none" }}>
          <div
            className="answers-callout"
            style={{
              background: "linear-gradient(135deg, #14120a 0%, #0a0a06 100%)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "8px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              transition: "border-color 0.2s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: gold,
                  opacity: 0.8,
                }}
              >
                Quick Answers
              </div>
              <p
                style={{
                  fontFamily: serif,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Common objections, short answers
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 480,
                }}
              >
                Eight objections you will hear in any conversation, each
                answered in under a hundred words with the references to check.
              </p>
            </div>
            <span
              style={{
                fontFamily: mono,
                fontSize: "13px",
                color: gold,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              Read →
            </span>
          </div>
        </Link>
      </section>

      <style>{`
        .answers-card-live:hover {
          border-color: rgba(201,168,76,0.4) !important;
          transform: translateY(-2px);
        }
        .answers-callout:hover {
          border-color: rgba(201,168,76,0.45) !important;
        }
        @media (max-width: 640px) {
          .answers-grid { grid-template-columns: 1fr !important; }
          .answers-callout { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
