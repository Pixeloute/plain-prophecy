import type { Metadata } from "next";
import GodheadViewsCompared from "@/components/studies/GodheadViewsCompared";

export const metadata: Metadata = {
  title: "Three Views of the Godhead - Compared | Plain Prophecy",
  description:
    "How the Catholic, Non-Trinitarian, and Heavenly Trio positions understand the origin, structure, and nature of the Godhead.",
};

export default function GodheadPage() {
  return (
    <main style={{ minHeight: "100dvh", background: "#010408" }}>
      <GodheadViewsCompared />
    </main>
  );
}
