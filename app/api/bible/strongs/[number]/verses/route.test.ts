import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

const UPSTREAM_ROWS = [
  {
    book__name: "Acts",
    book__abbrev: "Act",
    chapter: "22",
    verse: "1",
    kjv: "Men, brethren, and fathers, hear ye my defence...",
  },
];

function call(number: string, qs = "") {
  const request = new NextRequest(
    `http://localhost/api/bible/strongs/${number}/verses${qs}`,
  );
  return GET(request, { params: Promise.resolve({ number }) });
}

describe("GET /api/bible/strongs/[number]/verses", () => {
  beforeEach(() => {
    vi.stubEnv("RAPIDAPI_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns occurrence verses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(UPSTREAM_ROWS), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await call("G627");
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.number).toBe("G627");
    expect(body.count).toBe(1);
    expect(body.results[0].abbrev).toBe("Act");

    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("/search-strongs/G627/false/");
  });

  it("passes lxx=true through to upstream", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("[]", { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const res = await call("H7225", "?lxx=true");
    expect(res.status).toBe(200);
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("/search-strongs/H7225/true/");
  });

  it("rejects a bad lxx flag", async () => {
    const res = await call("G627", "?lxx=maybe");
    expect(res.status).toBe(400);
  });

  it("rejects a malformed number", async () => {
    const res = await call("Q1");
    expect(res.status).toBe(400);
  });
});
