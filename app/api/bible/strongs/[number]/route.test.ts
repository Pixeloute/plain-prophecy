import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

const UPSTREAM_ROW = {
  id: 9325,
  original_word: "ἀπολογία",
  number: "G627",
  strong_definition: " a plea (\"apology\")",
  mounce_definition: "a verbal defence, Acts 22:1; 25:16",
  bdb_definition: "",
  helps_word_studies: "",
  thayers_definition:
    '<div id="thayersText"><script>alert(1)</script><span onclick="steal()">defence</span><a href="javascript:evil()">link</a></div>',
};

function call(number: string) {
  const request = new NextRequest(`http://localhost/api/bible/strongs/${number}`);
  return GET(request, { params: Promise.resolve({ number }) });
}

describe("GET /api/bible/strongs/[number]", () => {
  beforeEach(() => {
    vi.stubEnv("RAPIDAPI_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns the lexicon entry with sanitized HTML", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify([UPSTREAM_ROW]), { status: 200 }),
      ),
    );

    const res = await call("g627");
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.number).toBe("G627");
    expect(body.originalWord).toBe("ἀπολογία");
    expect(body.strongDefinition).toContain("plea");
    expect(body.thayersDefinition).not.toContain("<script>");
    expect(body.thayersDefinition).not.toContain("onclick");
    expect(body.thayersDefinition).not.toContain("javascript:");
    expect(body.thayersDefinition).toContain("defence");
  });

  it("rejects a malformed number", async () => {
    for (const bad of ["X123", "627", "G99999", "G12a"]) {
      const res = await call(bad);
      expect(res.status).toBe(400);
    }
  });

  it("returns 404 when upstream has no entry", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("[]", { status: 200 })),
    );
    const res = await call("G9999");
    expect(res.status).toBe(404);
  });

  it("returns 503 when the API key is not configured", async () => {
    vi.stubEnv("RAPIDAPI_KEY", "");
    const res = await call("G627");
    expect(res.status).toBe(503);
  });

  it("returns 502 on upstream failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("error", { status: 500 })),
    );
    const res = await call("G627");
    expect(res.status).toBe(502);
  });
});
