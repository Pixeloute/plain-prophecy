import { describe, it, expect } from "vitest";
import { parseChapterContent } from "./fetchChapter";

describe("parseChapterContent", () => {
  it("parses verses with plain string content", () => {
    const items = parseChapterContent([
      { type: "verse", number: 1, content: ["In the beginning God created the heaven and the earth."] },
    ]);
    expect(items).toEqual([
      { type: "verse", verse: 1, text: "In the beginning God created the heaven and the earth." },
    ]);
  });

  it("keeps headings and skips footnotes and line breaks", () => {
    const items = parseChapterContent([
      { type: "heading", content: ["The Creation"] },
      {
        type: "verse",
        number: 2,
        content: [
          "And the earth was without form",
          { noteId: 4 },
          { text: "and void", poem: 1 },
          { lineBreak: true },
        ],
      },
      { type: "line_break" },
    ]);
    expect(items).toEqual([
      { type: "heading", text: "The Creation" },
      { type: "verse", verse: 2, text: "And the earth was without form and void" },
    ]);
  });

  it("returns an empty list for malformed payloads", () => {
    expect(parseChapterContent(null)).toEqual([]);
    expect(parseChapterContent("nope")).toEqual([]);
    expect(parseChapterContent([{ type: "verse" }, null])).toEqual([]);
  });
});
