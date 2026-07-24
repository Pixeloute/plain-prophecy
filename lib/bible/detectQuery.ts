import { BOOK_ABBREVIATIONS } from "./expandRef"
import { getBookBySlug } from "@/data/bible-books"

export type QueryIntent =
  | { kind: "strongs"; number: string }
  | { kind: "reference"; ref: string; slug: string; chapter: number; verse: number }
  | { kind: "chapter"; slug: string; chapter: number }
  | { kind: "phrase"; term: string }
  | { kind: "words"; term: string }

function resolveBookSlug(bookPart: string): string | null {
  const key = bookPart.trim().toLowerCase()
  const fromAbbrev = BOOK_ABBREVIATIONS[key]
  if (fromAbbrev) return fromAbbrev
  const fromName = getBookBySlug(key)
  if (fromName) return fromName.slug
  return null
}

/**
 * Classify a raw search input into the action it should trigger.
 *
 * "G627" / "h7225"     -> strongs lookup
 * '"son of man"'       -> exact phrase search
 * "1 Peter 3:15"       -> verse reference (bible-api.com)
 * "Daniel 7"           -> open the chapter reader
 * "Melchizedek priest" -> word search
 */
export function detectQuery(raw: string): QueryIntent {
  const input = raw.trim().replace(/\s+/g, " ")

  const strongsMatch = input.match(/^([GHgh])(\d{1,4})$/)
  if (strongsMatch) {
    return { kind: "strongs", number: `${strongsMatch[1].toUpperCase()}${strongsMatch[2]}` }
  }

  const quoted = input.match(/^["“](.+)["”]$/)
  if (quoted) {
    return { kind: "phrase", term: quoted[1].trim() }
  }

  const refMatch = input.match(/^(.*?)\s+(\d+)(?::(\d+).*)?$/)
  if (refMatch) {
    const slug = resolveBookSlug(refMatch[1])
    if (slug) {
      if (refMatch[3] !== undefined) {
        return {
          kind: "reference",
          ref: input,
          slug,
          chapter: Number(refMatch[2]),
          verse: Number(refMatch[3]),
        }
      }
      return { kind: "chapter", slug, chapter: Number(refMatch[2]) }
    }
  }

  // A bare book name ("Daniel", "1 Peter") opens chapter one of the book.
  const bareBook = resolveBookSlug(input)
  if (bareBook) {
    return { kind: "chapter", slug: bareBook, chapter: 1 }
  }

  return { kind: "words", term: input }
}
