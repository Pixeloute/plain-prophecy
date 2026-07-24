import type { Metadata } from "next";
import { Suspense } from "react";
import BibleClient from "./BibleClient";

export const metadata: Metadata = {
  title: "Bible Search and Strong's Lexicon: Plain Prophecy",
  description:
    "Search the Scriptures, look up Strong's numbers with full Greek and Hebrew lexicon entries, and read the Bible chapter by chapter.",
  alternates: {
    canonical: "https://plainprophecy.com/bible",
  },
  openGraph: {
    title: "Bible Search and Strong's Lexicon | Plain Prophecy",
    description:
      "Search the Scriptures, look up Strong's numbers with full Greek and Hebrew lexicons, and read chapter by chapter.",
    url: "https://plainprophecy.com/bible",
    type: "website",
  },
};

export default function BiblePage() {
  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      <Suspense fallback={<div style={{ minHeight: "60dvh" }} />}>
        <BibleClient />
      </Suspense>
    </main>
  );
}
