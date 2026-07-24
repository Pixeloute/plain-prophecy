export interface BibleBook {
  /** Canonical order, 1 to 66. Matches the Complete Study Bible API book ids. */
  id: number;
  /** USFM book code used by the HelloAO Bible API (e.g. GEN, JHN). */
  usfm: string;
  name: string;
  /** Three-character abbreviation matching the API's book__abbrev field. */
  abbrev: string;
  /** Lowercase name in the format bible-api.com expects (spaces kept; convert to + in URLs). */
  slug: string;
  testament: "OT" | "NT";
  chapterCount: number;
}

export const BIBLE_BOOKS: BibleBook[] = [
  { id: 1, usfm: "GEN", name: "Genesis", abbrev: "Gen", slug: "genesis", testament: "OT", chapterCount: 50 },
  { id: 2, usfm: "EXO", name: "Exodus", abbrev: "Exo", slug: "exodus", testament: "OT", chapterCount: 40 },
  { id: 3, usfm: "LEV", name: "Leviticus", abbrev: "Lev", slug: "leviticus", testament: "OT", chapterCount: 27 },
  { id: 4, usfm: "NUM", name: "Numbers", abbrev: "Num", slug: "numbers", testament: "OT", chapterCount: 36 },
  { id: 5, usfm: "DEU", name: "Deuteronomy", abbrev: "Deu", slug: "deuteronomy", testament: "OT", chapterCount: 34 },
  { id: 6, usfm: "JOS", name: "Joshua", abbrev: "Jos", slug: "joshua", testament: "OT", chapterCount: 24 },
  { id: 7, usfm: "JDG", name: "Judges", abbrev: "Jdg", slug: "judges", testament: "OT", chapterCount: 21 },
  { id: 8, usfm: "RUT", name: "Ruth", abbrev: "Rut", slug: "ruth", testament: "OT", chapterCount: 4 },
  { id: 9, usfm: "1SA", name: "1 Samuel", abbrev: "1Sa", slug: "1 samuel", testament: "OT", chapterCount: 31 },
  { id: 10, usfm: "2SA", name: "2 Samuel", abbrev: "2Sa", slug: "2 samuel", testament: "OT", chapterCount: 24 },
  { id: 11, usfm: "1KI", name: "1 Kings", abbrev: "1Ki", slug: "1 kings", testament: "OT", chapterCount: 22 },
  { id: 12, usfm: "2KI", name: "2 Kings", abbrev: "2Ki", slug: "2 kings", testament: "OT", chapterCount: 25 },
  { id: 13, usfm: "1CH", name: "1 Chronicles", abbrev: "1Ch", slug: "1 chronicles", testament: "OT", chapterCount: 29 },
  { id: 14, usfm: "2CH", name: "2 Chronicles", abbrev: "2Ch", slug: "2 chronicles", testament: "OT", chapterCount: 36 },
  { id: 15, usfm: "EZR", name: "Ezra", abbrev: "Ezr", slug: "ezra", testament: "OT", chapterCount: 10 },
  { id: 16, usfm: "NEH", name: "Nehemiah", abbrev: "Neh", slug: "nehemiah", testament: "OT", chapterCount: 13 },
  { id: 17, usfm: "EST", name: "Esther", abbrev: "Est", slug: "esther", testament: "OT", chapterCount: 10 },
  { id: 18, usfm: "JOB", name: "Job", abbrev: "Job", slug: "job", testament: "OT", chapterCount: 42 },
  { id: 19, usfm: "PSA", name: "Psalms", abbrev: "Psa", slug: "psalms", testament: "OT", chapterCount: 150 },
  { id: 20, usfm: "PRO", name: "Proverbs", abbrev: "Pro", slug: "proverbs", testament: "OT", chapterCount: 31 },
  { id: 21, usfm: "ECC", name: "Ecclesiastes", abbrev: "Ecc", slug: "ecclesiastes", testament: "OT", chapterCount: 12 },
  { id: 22, usfm: "SNG", name: "Song of Solomon", abbrev: "Son", slug: "song of solomon", testament: "OT", chapterCount: 8 },
  { id: 23, usfm: "ISA", name: "Isaiah", abbrev: "Isa", slug: "isaiah", testament: "OT", chapterCount: 66 },
  { id: 24, usfm: "JER", name: "Jeremiah", abbrev: "Jer", slug: "jeremiah", testament: "OT", chapterCount: 52 },
  { id: 25, usfm: "LAM", name: "Lamentations", abbrev: "Lam", slug: "lamentations", testament: "OT", chapterCount: 5 },
  { id: 26, usfm: "EZK", name: "Ezekiel", abbrev: "Eze", slug: "ezekiel", testament: "OT", chapterCount: 48 },
  { id: 27, usfm: "DAN", name: "Daniel", abbrev: "Dan", slug: "daniel", testament: "OT", chapterCount: 12 },
  { id: 28, usfm: "HOS", name: "Hosea", abbrev: "Hos", slug: "hosea", testament: "OT", chapterCount: 14 },
  { id: 29, usfm: "JOL", name: "Joel", abbrev: "Joe", slug: "joel", testament: "OT", chapterCount: 3 },
  { id: 30, usfm: "AMO", name: "Amos", abbrev: "Amo", slug: "amos", testament: "OT", chapterCount: 9 },
  { id: 31, usfm: "OBA", name: "Obadiah", abbrev: "Oba", slug: "obadiah", testament: "OT", chapterCount: 1 },
  { id: 32, usfm: "JON", name: "Jonah", abbrev: "Jon", slug: "jonah", testament: "OT", chapterCount: 4 },
  { id: 33, usfm: "MIC", name: "Micah", abbrev: "Mic", slug: "micah", testament: "OT", chapterCount: 7 },
  { id: 34, usfm: "NAM", name: "Nahum", abbrev: "Nah", slug: "nahum", testament: "OT", chapterCount: 3 },
  { id: 35, usfm: "HAB", name: "Habakkuk", abbrev: "Hab", slug: "habakkuk", testament: "OT", chapterCount: 3 },
  { id: 36, usfm: "ZEP", name: "Zephaniah", abbrev: "Zep", slug: "zephaniah", testament: "OT", chapterCount: 3 },
  { id: 37, usfm: "HAG", name: "Haggai", abbrev: "Hag", slug: "haggai", testament: "OT", chapterCount: 2 },
  { id: 38, usfm: "ZEC", name: "Zechariah", abbrev: "Zec", slug: "zechariah", testament: "OT", chapterCount: 14 },
  { id: 39, usfm: "MAL", name: "Malachi", abbrev: "Mal", slug: "malachi", testament: "OT", chapterCount: 4 },
  { id: 40, usfm: "MAT", name: "Matthew", abbrev: "Mat", slug: "matthew", testament: "NT", chapterCount: 28 },
  { id: 41, usfm: "MRK", name: "Mark", abbrev: "Mar", slug: "mark", testament: "NT", chapterCount: 16 },
  { id: 42, usfm: "LUK", name: "Luke", abbrev: "Luk", slug: "luke", testament: "NT", chapterCount: 24 },
  { id: 43, usfm: "JHN", name: "John", abbrev: "Joh", slug: "john", testament: "NT", chapterCount: 21 },
  { id: 44, usfm: "ACT", name: "Acts", abbrev: "Act", slug: "acts", testament: "NT", chapterCount: 28 },
  { id: 45, usfm: "ROM", name: "Romans", abbrev: "Rom", slug: "romans", testament: "NT", chapterCount: 16 },
  { id: 46, usfm: "1CO", name: "1 Corinthians", abbrev: "1Co", slug: "1 corinthians", testament: "NT", chapterCount: 16 },
  { id: 47, usfm: "2CO", name: "2 Corinthians", abbrev: "2Co", slug: "2 corinthians", testament: "NT", chapterCount: 13 },
  { id: 48, usfm: "GAL", name: "Galatians", abbrev: "Gal", slug: "galatians", testament: "NT", chapterCount: 6 },
  { id: 49, usfm: "EPH", name: "Ephesians", abbrev: "Eph", slug: "ephesians", testament: "NT", chapterCount: 6 },
  { id: 50, usfm: "PHP", name: "Philippians", abbrev: "Php", slug: "philippians", testament: "NT", chapterCount: 4 },
  { id: 51, usfm: "COL", name: "Colossians", abbrev: "Col", slug: "colossians", testament: "NT", chapterCount: 4 },
  { id: 52, usfm: "1TH", name: "1 Thessalonians", abbrev: "1Th", slug: "1 thessalonians", testament: "NT", chapterCount: 5 },
  { id: 53, usfm: "2TH", name: "2 Thessalonians", abbrev: "2Th", slug: "2 thessalonians", testament: "NT", chapterCount: 3 },
  { id: 54, usfm: "1TI", name: "1 Timothy", abbrev: "1Ti", slug: "1 timothy", testament: "NT", chapterCount: 6 },
  { id: 55, usfm: "2TI", name: "2 Timothy", abbrev: "2Ti", slug: "2 timothy", testament: "NT", chapterCount: 4 },
  { id: 56, usfm: "TIT", name: "Titus", abbrev: "Tit", slug: "titus", testament: "NT", chapterCount: 3 },
  { id: 57, usfm: "PHM", name: "Philemon", abbrev: "Phm", slug: "philemon", testament: "NT", chapterCount: 1 },
  { id: 58, usfm: "HEB", name: "Hebrews", abbrev: "Heb", slug: "hebrews", testament: "NT", chapterCount: 13 },
  { id: 59, usfm: "JAS", name: "James", abbrev: "Jas", slug: "james", testament: "NT", chapterCount: 5 },
  { id: 60, usfm: "1PE", name: "1 Peter", abbrev: "1Pe", slug: "1 peter", testament: "NT", chapterCount: 5 },
  { id: 61, usfm: "2PE", name: "2 Peter", abbrev: "2Pe", slug: "2 peter", testament: "NT", chapterCount: 3 },
  { id: 62, usfm: "1JN", name: "1 John", abbrev: "1Jo", slug: "1 john", testament: "NT", chapterCount: 5 },
  { id: 63, usfm: "2JN", name: "2 John", abbrev: "2Jo", slug: "2 john", testament: "NT", chapterCount: 1 },
  { id: 64, usfm: "3JN", name: "3 John", abbrev: "3Jo", slug: "3 john", testament: "NT", chapterCount: 1 },
  { id: 65, usfm: "JUD", name: "Jude", abbrev: "Jud", slug: "jude", testament: "NT", chapterCount: 1 },
  { id: 66, usfm: "REV", name: "Revelation", abbrev: "Rev", slug: "revelation", testament: "NT", chapterCount: 22 },
];

export function getBookBySlug(slug: string): BibleBook | undefined {
  const key = slug.trim().toLowerCase().replace(/\+/g, " ");
  return BIBLE_BOOKS.find((b) => b.slug === key);
}

export function getBookById(id: number): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id);
}
