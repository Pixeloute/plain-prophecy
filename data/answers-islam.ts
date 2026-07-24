// Answering Objections: Islam. Content follows docs/WRITING-RULES.md.
// Quotations from the Quran (Clear Quran translation) and Scripture stay verbatim.

export interface AnswerBlock {
  label?: string;
  text: string;
}

export interface AnswerQuote {
  text: string;
  ref: string;
}

export interface AnswerSection {
  id: string;
  heading: string;
  blocks: AnswerBlock[];
  quotes?: AnswerQuote[];
  visual?: "dilemma-flow" | "manuscript-chart";
}

export interface AnswerStudy {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  answersObjection: string;
  readTime: string;
  visualChip: string;
  scriptureChip: string;
  intro: string;
  shortAnswer: string;
  sections: AnswerSection[];
  christPivot: string;
  status: "live" | "soon";
}

export interface QuickAnswer {
  id: string;
  objection: string;
  answer: string[];
  refs: string;
}

export function findAnswerStudy(slug: string): AnswerStudy | undefined {
  return answerStudies.find((s) => s.slug === slug && s.status === "live");
}

export const answerStudies: AnswerStudy[] = [
  {
    slug: "the-islamic-dilemma",
    number: "01",
    title: "The Islamic Dilemma",
    subtitle:
      "The Quran affirms the Torah and the Gospel. One claim, two paths, and both lead back to the Bible.",
    answersObjection: "The Bible has been corrupted",
    readTime: "12 min read",
    visualChip: "Logic Map",
    scriptureChip: "Surah 3:3",
    intro:
      "Your Muslim friend says the Bible was changed. Before you reach for a single manuscript, open the Quran. Its own pages answer the objection.",
    shortAnswer:
      "The Quran tells Christians to judge by the Gospel they hold (Surah 5:47). If the Gospel is God's preserved word, Islam's core claims fall. If the Gospel was corrupted, the Quran told people to judge by a corrupted book. Both paths lead away from the Quran and back to the Bible's testimony about Jesus.",
    sections: [
      {
        id: "what-the-quran-claims",
        heading: "What the Quran Claims",
        blocks: [
          {
            text: "Open Surah 3:3 and read it slowly. The Quran presents itself as confirming the Torah and the Gospel, the books already in the hands of Jews and Christians in the seventh century.",
          },
          {
            text: "Surah 5:68 goes further. The command sits in the present tense. Nobody tells you to stand on a book that no longer exists. In AD 632, on the Quran's own testimony, the Torah and the Gospel were reliable enough to judge by, available to read, and carried Allah's authority.",
          },
        ],
        quotes: [
          {
            text: "He has revealed to you the Book in truth, confirming what came before it, as He revealed the Torah and the Gospel previously, as a guide for people.",
            ref: "Surah 3:3, Clear Quran",
          },
          {
            text: "So let the people of the Gospel judge by what Allah has revealed in it.",
            ref: "Surah 5:47, Clear Quran",
          },
          {
            text: "O People of the Book! You have nothing to stand on unless you observe the Torah, the Gospel, and what has been revealed to you from your Lord.",
            ref: "Surah 5:68, Clear Quran",
          },
        ],
      },
      {
        id: "the-dilemma-mapped",
        heading: "The Dilemma, Mapped",
        visual: "dilemma-flow",
        blocks: [
          {
            text: "Trace both paths. Each one ends at the same place.",
          },
          {
            text: "If the Bible was intact in Muhammad's time, its witness stands today, because the manuscripts from before Islam match the Bible you hold. If the Bible was already corrupted, the Quran affirmed a corrupted book and commanded people to judge by it. Surah 6:115 adds the final pressure: none can change the words of your Lord. No third option exists.",
          },
        ],
      },
      {
        id: "manuscripts-settle-the-timing",
        heading: "The Manuscripts Settle the Timing",
        visual: "manuscript-chart",
        blocks: [
          {
            label: "Older than Islam by centuries",
            text: "Complete Bibles predate Islam and sit in museums today. Codex Vaticanus was copied around AD 325. Codex Sinaiticus around AD 350. Muhammad began preaching in AD 610. The Bible said to have been changed exists, complete, from centuries before Islam, and it reads like yours.",
          },
          {
            label: "The Dead Sea Scrolls",
            text: "Found at Qumran from 1947, the scrolls carry portions of nearly every Old Testament book, copied between 250 BC and AD 68. The complete Isaiah scroll, copied around 125 BC, matches the medieval Hebrew text behind your Bible. A thousand years of copying changed almost nothing.",
          },
          {
            label: "The numbers",
            text: "Over 5,800 Greek New Testament manuscripts survive, alongside thousands of early copies in Latin, Syriac, Coptic, and other languages. The earliest fragment, P52, carries John 18 and dates to about AD 125, within decades of the original. No other ancient text comes close.",
          },
          {
            label: "The church fathers",
            text: "Writers like Irenaeus, Tertullian, and Origen quoted the New Testament so often, centuries before Muhammad, the whole text minus a few verses could be rebuilt from their quotations alone.",
          },
        ],
      },
      {
        id: "an-impossible-conspiracy",
        heading: "Corruption Would Need an Impossible Conspiracy",
        blocks: [
          {
            text: "By AD 600 the Bible existed across three continents, from Ireland to Ethiopia to India, in Greek, Latin, Syriac, Coptic, Armenian, Gothic, and Ethiopic. These translation families grew up independently, in regions divided by hostile empires.",
          },
          {
            text: "To corrupt the Bible, someone would need to find every copy across those continents, change each one identically in every language, silence every church leader who had memorised it, and leave no trace. Compare the surviving manuscripts today and they agree, not on the changes, but on the original.",
          },
          {
            label: "What corruption would look like",
            text: "Changed texts leave fingerprints. Early manuscripts would differ from later ones on the biggest claims. They do not. The deity of Christ sits in P46 around AD 200, more than a century before Nicaea. The variations scholars find are spelling and word order, not theology.",
          },
        ],
      },
      {
        id: "the-preservation-paradox",
        heading: "The Preservation Paradox",
        blocks: [
          {
            text: "Surah 15:9 promises Allah guards his message. Yet the Quran itself names revelations no one on earth possesses. The scrolls of Abraham and Moses (Surah 87:18–19). Messengers sent to every nation (Surah 16:36). Islamic tradition counts over one hundred revealed books. None survive.",
          },
          {
            text: "Hold the two claims together. If Allah preserves revelation, the Torah and the Gospel should be intact, and they are, in thousands of manuscripts. If Allah does not preserve revelation, the Quran's own guarantee fails. The dilemma does not soften with time. It sharpens.",
          },
        ],
        quotes: [
          {
            text: "Indeed, it is We who sent down the Reminder, and it is certainly We who will preserve it.",
            ref: "Surah 15:9, Clear Quran",
          },
        ],
      },
    ],
    christPivot:
      "The dilemma is not a weapon for winning arguments. It clears the ground so one question remains. The Gospel the Quran points to says God himself came near, died for your sins, and rose again on the third day (1 Corinthians 15:3–4). Muhammad was told to ask the People of the Book when in doubt (Surah 10:94). Take the step he was pointed to. Open the Gospel and judge for yourself. It was preserved so you could.",
    status: "live",
  },
  {
    slug: "did-jesus-die-on-the-cross",
    number: "02",
    title: "Did Jesus Die on the Cross?",
    subtitle:
      "Surah 4:157 says the crucifixion only appeared to happen. Roman, Jewish, and Christian sources say otherwise.",
    answersObjection: "Jesus was never crucified",
    readTime: "In progress",
    visualChip: "Evidence Timeline",
    scriptureChip: "1 Corinthians 15",
    intro: "",
    shortAnswer: "",
    sections: [],
    christPivot: "",
    status: "soon",
  },
  {
    slug: "has-the-bible-been-corrupted",
    number: "03",
    title: "Has the Bible Been Corrupted?",
    subtitle:
      "The manuscript evidence in full: the scrolls, the codices, and the copyists who counted every letter.",
    answersObjection: "The text was changed over time",
    readTime: "In progress",
    visualChip: "Manuscript Chart",
    scriptureChip: "Isaiah 40:8",
    intro: "",
    shortAnswer: "",
    sections: [],
    christPivot: "",
    status: "soon",
  },
  {
    slug: "is-muhammad-in-the-bible",
    number: "04",
    title: "Is Muhammad in the Bible?",
    subtitle:
      "The Song of Solomon and Paraclete claims, examined against the Hebrew and Greek texts.",
    answersObjection: "The Bible predicts Muhammad",
    readTime: "In progress",
    visualChip: "Text Comparison",
    scriptureChip: "John 14:16",
    intro: "",
    shortAnswer: "",
    sections: [],
    christPivot: "",
    status: "soon",
  },
  {
    slug: "can-you-know-you-are-saved",
    number: "05",
    title: "Can You Know You Are Saved?",
    subtitle:
      "Muhammad did not know his own fate. Jesus offers assurance in the present tense.",
    answersObjection: "No one is certain of salvation",
    readTime: "In progress",
    visualChip: "Side by Side",
    scriptureChip: "1 John 5:13",
    intro: "",
    shortAnswer: "",
    sections: [],
    christPivot: "",
    status: "soon",
  },
  {
    slug: "who-does-islam-say-jesus-is",
    number: "06",
    title: "Who Does Islam Say Jesus Is?",
    subtitle:
      "Even the Quran gives Jesus titles it gives no one else. Follow where those titles lead.",
    answersObjection: "Jesus was only a prophet",
    readTime: "In progress",
    visualChip: "Titles Diagram",
    scriptureChip: "Revelation 1:17",
    intro: "",
    shortAnswer: "",
    sections: [],
    christPivot: "",
    status: "soon",
  },
];

export const quickAnswers: QuickAnswer[] = [
  {
    id: "bible-corrupted",
    objection: "The Bible has been corrupted",
    answer: [
      "Ask one question first: when? Before Muhammad is ruled out by the Quran, which commands the Christians of his day to judge by the Gospel (Surah 5:47). After Muhammad is ruled out by the manuscripts. Complete Bibles copied around AD 325–350 sit in museums today and match the Bible you hold.",
      "The full case, with the evidence mapped, is in Study 01, The Islamic Dilemma.",
    ],
    refs: "Surah 5:47 · Isaiah 40:8",
  },
  {
    id: "jesus-never-claimed-deity",
    objection: "Jesus never claimed to be God",
    answer: [
      "Jesus took the divine name in front of hostile witnesses. 'Before Abraham was, I am' (John 8:58). His hearers picked up stones because they understood the claim. He forgave sins, an act the scribes said belongs to God alone (Mark 2:5–7). Thomas called him 'My Lord and my God' and Jesus received the worship (John 20:28), while apostles and angels refused worship every time (Acts 10:25–26). The claim runs through everything he did.",
    ],
    refs: "John 8:58 · John 20:28 · Mark 14:61–64",
  },
  {
    id: "nicaea-invented-divinity",
    objection: "The Council of Nicaea invented Jesus' divinity",
    answer: [
      "Nicaea met in AD 325. Ignatius wrote of God come in the flesh around AD 107. Paul called Jesus 'God over all' (Romans 9:5) within three decades of the cross. Around AD 112 the pagan governor Pliny reported Christians singing to Christ as to a god.",
      "Nicaea defended an old faith against a new idea, Arius' claim Jesus was a created being. The council changed no text. Manuscripts copied before Nicaea match manuscripts copied after.",
    ],
    refs: "Romans 9:5 · Colossians 2:9 · Philippians 2:6",
  },
  {
    id: "three-gods",
    objection: "Christians worship three gods",
    answer: [
      "Christians confess the Shema: 'The LORD our God, the LORD is one' (Deuteronomy 6:4). Father, Son, and Spirit are one God, not three. Jesus commanded baptism in the one name, singular, of the Father, the Son, and the Holy Spirit (Matthew 28:19).",
      "The trinity described in Surah 5:116, Allah, Jesus, and Mary, appears in no Christian creed in history. The objection answers a belief Christians have never held.",
    ],
    refs: "Deuteronomy 6:4 · Matthew 28:19",
  },
  {
    id: "paraclete-is-muhammad",
    objection: "The Paraclete in John 14 is Muhammad",
    answer: [
      "The claim needs the Greek word parakletos, meaning helper, to have once read periklutos, meaning praised one. Over 5,800 Greek manuscripts survive, some copied within a century of John's writing. Not one reads periklutos.",
      "Jesus also describes the Helper as one who lives with the disciples already, is sent in Jesus' name, and the world cannot see (John 14:16–17, 26). None of this fits a man born six centuries later. It fits the Holy Spirit, who arrived at Pentecost.",
    ],
    refs: "John 14:16–17, 26 · Acts 2:1–4",
  },
  {
    id: "resurrection-contradictions",
    objection: "The resurrection accounts contradict each other",
    answer: [
      "Four witnesses to the same morning name different women at the tomb. Matthew names two, Mark three, Luke four or more, John follows Mary Magdalene alone. Every account agrees on her, on the empty tomb, and on the risen Jesus.",
      "Word-for-word identical stories would suggest collusion. Independent testimony varies in the details and agrees on the event. The accounts read like what they claim to be, eyewitness memory.",
    ],
    refs: "Matthew 28:1 · Luke 24:10 · John 20:1",
  },
  {
    id: "sent-only-to-israel",
    objection: "Jesus was sent only to Israel, not to you",
    answer: [
      "His earthly ministry began with Israel (Matthew 15:24). His finished work reaches everyone. He promised other sheep not of this fold (John 10:16) and said, lifted up, he would draw all people to himself (John 12:32). After the resurrection he sent his followers to all nations (Matthew 28:19). Isaiah saw it coming: the Servant would be a light for the Gentiles, salvation to the ends of the earth (Isaiah 49:6). The invitation includes you.",
    ],
    refs: "John 10:16 · Matthew 28:19 · Isaiah 49:6",
  },
  {
    id: "only-god-is-good",
    objection: "'Only God is good.' Jesus denied being God",
    answer: [
      "Read Mark 10:18 again. Jesus never says 'so I am not good.' He asks the rich ruler to weigh his own words. If only God is good, and you call me good, who do you say I am?",
      "In the same Gospel Jesus forgives sins, an act the scribes reserve for God alone (Mark 2:5–7), and tells the high priest the Son of Man will sit at the right hand of Power (Mark 14:62). The question is an invitation, not a denial.",
    ],
    refs: "Mark 10:18 · Mark 2:5–7 · Mark 14:62",
  },
];
