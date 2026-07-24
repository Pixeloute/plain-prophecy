import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { answerStudies, findAnswerStudy } from "@/data/answers-islam";
import DilemmaFlow from "@/components/answers/DilemmaFlow";
import ManuscriptChart from "@/components/answers/ManuscriptChart";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";

export function generateStaticParams() {
  return answerStudies
    .filter((s) => s.status === "live")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = findAnswerStudy(slug);
  if (!study) return { title: "Study Not Found" };

  const title = `${study.title}: Plain Prophecy`;
  const description = study.shortAnswer.slice(0, 155);

  return {
    title,
    description,
    alternates: {
      canonical: `https://plainprophecy.com/answers/islam/${slug}`,
    },
    openGraph: {
      title: `${study.title} | Plain Prophecy`,
      description,
      url: `https://plainprophecy.com/answers/islam/${slug}`,
      type: "article",
    },
  };
}

const VISUALS = {
  "dilemma-flow": DilemmaFlow,
  "manuscript-chart": ManuscriptChart,
} as const;

export default async function AnswerStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = findAnswerStudy(slug);
  if (!study) notFound();

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
          "@type": "Article",
          headline: study.title,
          description: study.shortAnswer,
          author: { "@type": "Organization", name: "Plain Prophecy" },
          publisher: { "@type": "Organization", name: "Plain Prophecy" },
          mainEntityOfPage: `https://plainprophecy.com/answers/islam/${study.slug}`,
        }}
      />

      {/* Header */}
      <header
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "64px 24px 36px",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
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
        <div
          style={{
            fontFamily: mono,
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: gold,
            margin: "28px 0 14px",
          }}
        >
          Study {study.number}
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(28px, 5.5vw, 44px)",
            fontWeight: 900,
            lineHeight: 1.12,
            color: "#fff",
            margin: "0 0 14px",
          }}
        >
          {study.title}
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            margin: "0 0 22px",
          }}
        >
          {study.intro}
        </p>
        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            fontFamily: mono,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <span>{study.readTime}</span>
          <span>Key text: {study.scriptureChip}</span>
          <span>Answers: &ldquo;{study.answersObjection}&rdquo;</span>
        </div>
      </header>

      {/* Body */}
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "36px 24px 80px" }}>
        {/* Short answer */}
        <div
          style={{
            background: "#14120a",
            border: `1px solid ${gold}`,
            padding: "22px 24px",
            marginBottom: "40px",
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
              marginBottom: "10px",
            }}
          >
            The Short Answer
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {study.shortAnswer}
          </p>
        </div>

        {study.sections.map((section) => {
          const Visual = section.visual ? VISUALS[section.visual] : null;
          return (
            <section key={section.id} id={section.id} style={{ marginBottom: "44px" }}>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(20px, 4.5vw, 26px)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.25,
                  margin: "0 0 6px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                {section.heading}
              </h2>

              {section.blocks.map((block, i) => (
                <div key={i} style={{ marginTop: "18px" }}>
                  {block.label ? (
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: gold,
                        marginBottom: "6px",
                      }}
                    >
                      {block.label}
                    </div>
                  ) : null}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {block.text}
                  </p>
                </div>
              ))}

              {Visual ? <Visual /> : null}

              {section.quotes?.map((quote, i) => (
                <blockquote
                  key={i}
                  style={{
                    borderLeft: `3px solid ${gold}`,
                    background: "#11100a",
                    padding: "16px 20px",
                    margin: "20px 0 0",
                    fontStyle: "italic",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                  <span
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontStyle: "normal",
                      fontFamily: mono,
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.7)",
                    }}
                  >
                    {quote.ref}
                  </span>
                </blockquote>
              ))}
            </section>
          );
        })}

        {/* Christ Pivot */}
        <div
          style={{
            border: `1px solid ${gold}`,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12), transparent 65%), #14120a",
            padding: "32px 26px",
            textAlign: "center",
            marginTop: "56px",
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
              marginBottom: "14px",
            }}
          >
            The Christ Pivot
          </div>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 540,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {study.christPivot}
          </p>
        </div>

        {/* Footer nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "48px",
          }}
        >
          <Link
            href="/answers/islam"
            style={{
              fontFamily: mono,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              padding: "12px 0",
            }}
          >
            ← All studies
          </Link>
          <Link
            href="/answers/islam/quick-answers"
            style={{
              fontFamily: mono,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: gold,
              textDecoration: "none",
              padding: "12px 0",
            }}
          >
            Quick answers →
          </Link>
        </div>
      </article>
    </main>
  );
}
