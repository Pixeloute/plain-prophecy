import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

const UPSTREAM_ROWS = [
  {
    book__name: "1 Peter",
    book__abbrev: "1Pe",
    chapter: "3",
    verse: "15",
    kjv: "But sanctify the Lord God in your hearts...",
  },
];

function makeRequest(qs: string) {
  return new NextRequest(`http://localhost/api/bible/search${qs}`);
}

describe("GET /api/bible/search", () => {
  beforeEach(() => {
    vi.stubEnv("RAPIDAPI_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns mapped results with immutable cache headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(UPSTREAM_ROWS), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await GET(makeRequest("?q=hope"));
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=31536000");

    const body = await res.json();
    expect(body.query).toBe("hope");
    expect(body.mode).toBe("words");
    expect(body.count).toBe(1);
    expect(body.results[0]).toEqual({
      book: "1 Peter",
      abbrev: "1Pe",
      chapter: 3,
      verse: 15,
      text: "But sanctify the Lord God in your hearts...",
    });

    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("/search/hope/");
  });

  it("uses the exact-phrase endpoint when mode=phrase", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(UPSTREAM_ROWS), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await GET(makeRequest("?q=in%20the%20beginning&mode=phrase"));
    expect(res.status).toBe(200);
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("/search-exact/in%20the%20beginning/");
  });

  it("rejects an empty query", async () => {
    const res = await GET(makeRequest("?q="));
    expect(res.status).toBe(400);
  });

  it("rejects an over-long query", async () => {
    const res = await GET(makeRequest(`?q=${"a".repeat(90)}`));
    expect(res.status).toBe(400);
  });

  it("rejects injection-style characters", async () => {
    const res = await GET(makeRequest("?q=faith%2F..%2Fetc"));
    expect(res.status).toBe(400);
  });

  it("rejects an unknown mode", async () => {
    const res = await GET(makeRequest("?q=faith&mode=fuzzy"));
    expect(res.status).toBe(400);
  });

  it("returns 503 when the API key is not configured", async () => {
    vi.stubEnv("RAPIDAPI_KEY", "");
    const res = await GET(makeRequest("?q=faith"));
    expect(res.status).toBe(503);
  });

  it("returns a generic 502 with no-store when upstream fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "quota exceeded, plan BASIC" }), {
        status: 429,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await GET(makeRequest("?q=faith"));
    expect(res.status).toBe(502);
    expect(res.headers.get("Cache-Control")).toBe("no-store");

    const body = await res.json();
    expect(JSON.stringify(body)).not.toContain("quota");
    expect(JSON.stringify(body)).not.toContain("BASIC");
  });
});
