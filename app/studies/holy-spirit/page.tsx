import type { Metadata } from "next";
import HolySpiritStudy from "@/components/studies/HolySpiritStudy";

export const metadata: Metadata = {
  title: "Another Helper: A Study on the Holy Spirit | Plain Prophecy",
  description:
    "A six-session study on the Holy Spirit, built from John 14 to 16 and traced from Genesis to the epistles.",
};

export default function HolySpiritPage() {
  return (
    <main style={{ minHeight: "100dvh", background: "#0E1A2B" }}>
      <HolySpiritStudy />
    </main>
  );
}
