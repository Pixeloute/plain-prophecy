// Curated translations served by the HelloAO Free Bible API
// (https://bible.helloao.org). KJV is the default because the concordance
// search and Strong's occurrence lists on /bible are KJV based.

export interface BibleTranslation {
  /** HelloAO translation id, e.g. "eng_kjv" */
  id: string
  shortName: string
  name: string
}

export const BIBLE_TRANSLATIONS: BibleTranslation[] = [
  { id: "eng_kjv", shortName: "KJV", name: "King James Version" },
  { id: "BSB", shortName: "BSB", name: "Berean Standard Bible" },
  { id: "ENGWEBP", shortName: "WEB", name: "World English Bible" },
  { id: "eng_asv", shortName: "ASV", name: "American Standard Version" },
  { id: "eng_bbe", shortName: "BBE", name: "Bible in Basic English" },
  { id: "eng_gnv", shortName: "GNV", name: "Geneva Bible 1599" },
]

export const DEFAULT_TRANSLATION = "eng_kjv"

export function getTranslation(id: string | null | undefined): BibleTranslation {
  return (
    BIBLE_TRANSLATIONS.find((t) => t.id === id) ??
    BIBLE_TRANSLATIONS[0]
  )
}
