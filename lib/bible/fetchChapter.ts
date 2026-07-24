import { DEFAULT_TRANSLATION } from "./translations"

export type ChapterItem =
  | { type: "heading"; text: string }
  | { type: "verse"; verse: number; text: string }

export interface ChapterResult {
  reference: string
  translation: string
  items: ChapterItem[]
}

// Module-level cache: persists for the session. Keyed by "translation|usfm|chapter".
const cache = new Map<string, ChapterResult>()

interface HelloaoContentPiece {
  text?: string
  noteId?: number
  lineBreak?: boolean
}

interface HelloaoChapterNode {
  type: string
  number?: number
  content?: (string | HelloaoContentPiece)[]
}

/** Flatten a HelloAO verse content array into plain text (footnotes skipped). */
function pieceText(pieces: (string | HelloaoContentPiece)[] | undefined): string {
  if (!Array.isArray(pieces)) return ""
  return pieces
    .map((p) => {
      if (typeof p === "string") return p
      if (p && typeof p.text === "string") return p.text
      return ""
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

/** Pure parser for a HelloAO chapter payload. Exported for tests. */
export function parseChapterContent(nodes: unknown): ChapterItem[] {
  if (!Array.isArray(nodes)) return []
  const items: ChapterItem[] = []
  for (const node of nodes as HelloaoChapterNode[]) {
    if (!node || typeof node !== "object") continue
    if (node.type === "heading") {
      const text = pieceText(node.content)
      if (text) items.push({ type: "heading", text })
    } else if (node.type === "verse" && typeof node.number === "number") {
      const text = pieceText(node.content)
      if (text) items.push({ type: "verse", verse: node.number, text })
    }
  }
  return items
}

/**
 * Fetch a full chapter from the HelloAO Free Bible API (no key required).
 * Results are cached in memory for the session.
 */
export async function fetchChapter(
  usfm: string,
  chapter: number,
  translationId: string = DEFAULT_TRANSLATION,
): Promise<ChapterResult> {
  const key = `${translationId}|${usfm}|${chapter}`
  if (cache.has(key)) return cache.get(key)!

  const res = await fetch(
    `https://bible.helloao.org/api/${encodeURIComponent(translationId)}/${encodeURIComponent(usfm)}/${chapter}.json`,
  )

  if (!res.ok) {
    throw new Error(`Chapter not found: ${usfm} ${chapter}`)
  }

  const data = await res.json()
  const bookName: string = data?.book?.commonName ?? usfm
  const result: ChapterResult = {
    reference: `${bookName} ${data?.chapter?.number ?? chapter}`,
    translation: data?.translation?.shortName ?? translationId,
    items: parseChapterContent(data?.chapter?.content),
  }

  cache.set(key, result)
  return result
}
