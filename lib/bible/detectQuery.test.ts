import { describe, it, expect } from "vitest";
import { detectQuery } from "./detectQuery";

describe("detectQuery", () => {
  it("classifies Strong's numbers case-insensitively", () => {
    expect(detectQuery("G627")).toEqual({ kind: "strongs", number: "G627" });
    expect(detectQuery("g627")).toEqual({ kind: "strongs", number: "G627" });
    expect(detectQuery("h7225")).toEqual({ kind: "strongs", number: "H7225" });
  });

  it("classifies quoted input as an exact phrase", () => {
    expect(detectQuery('"son of man"')).toEqual({ kind: "phrase", term: "son of man" });
  });

  it("classifies book chapter:verse as a reference", () => {
    expect(detectQuery("1 Peter 3:15")).toEqual({
      kind: "reference",
      ref: "1 Peter 3:15",
      slug: "1 peter",
      chapter: 3,
      verse: 15,
    });
    expect(detectQuery("Dan 7:25")).toEqual({
      kind: "reference",
      ref: "Dan 7:25",
      slug: "daniel",
      chapter: 7,
      verse: 25,
    });
    expect(detectQuery("john 3:16")).toEqual({
      kind: "reference",
      ref: "john 3:16",
      slug: "john",
      chapter: 3,
      verse: 16,
    });
  });

  it("classifies book plus bare chapter as a reader chapter", () => {
    expect(detectQuery("Daniel 7")).toEqual({ kind: "chapter", slug: "daniel", chapter: 7 });
    expect(detectQuery("1 Peter 3")).toEqual({ kind: "chapter", slug: "1 peter", chapter: 3 });
  });

  it("classifies a bare book name as chapter one", () => {
    expect(detectQuery("Revelation")).toEqual({ kind: "chapter", slug: "revelation", chapter: 1 });
  });

  it("falls back to a word search", () => {
    expect(detectQuery("Melchizedek priest")).toEqual({
      kind: "words",
      term: "Melchizedek priest",
    });
    expect(detectQuery("faith")).toEqual({ kind: "words", term: "faith" });
  });

  it("normalises extra whitespace", () => {
    expect(detectQuery("  Daniel   7  ")).toEqual({ kind: "chapter", slug: "daniel", chapter: 7 });
  });
});
