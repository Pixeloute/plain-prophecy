# Writing Rules for Plain Prophecy

This is the governing source of truth for every word that appears on the site: study text, `christCentre` Christ Pivots, lessons, doctrine pages, cards, blog posts, MDX articles, UI microcopy, and any string in `/data/*.ts` or `/content/`.

## How to use this document

The rules are split into three layers. Read the layer that matches your task, and always respect the priority order.

- **Layer 1: Hard rules.** Mechanical and non-negotiable. Checked automatically by `npm run lint:content`. A piece that breaks these is not ready to ship.
- **Layer 2: Voice and tone.** Style guidance. Human-reviewed. This is how the writing should feel.
- **Layer 3: Theological framework.** The reason the site exists. Reviewed against the checklist at the end. This is where the differentiation lives.

**Priority order when rules conflict:**

1. Do not break the build (valid TypeScript, valid MDX, intact string escaping).
2. Preserve Scripture and meaning: references, verse text, dates, numeric ranges, proper nouns, and every doctrinal claim stay exact.
3. Layer 1 hard rules.
4. Layer 2 voice and tone.
5. Layer 3 theological depth.

A note on scope: this document is for **published content**. Drafting artifacts from a research or generation session (inline citation markers like `[1]`, delivery notes, pause markers, call-and-response staging) belong to the writing process and must never reach the rendered page.

---

## Layer 1: Hard rules (lint-enforced)

These are checked by `npm run lint:content`. Zero exceptions.

### Punctuation

- **Zero em dashes (—).** Replace every one with a comma, a colon, or a period. To connect two ideas, prefer a period and write two sentences. Never substitute another dash or a spaced hyphen (` - `) as a connector.
- **No semicolons in prose.** Use a period or a comma instead. This includes Scripture-reference lists inside a string: write `(Ezra 7, Daniel 9)`, not `(Ezra 7; Daniel 9)`. The only semicolons allowed in a content string are inside a verbatim Scripture quotation, where the words and punctuation of the verse stay exact.
- **En dashes (–) are allowed only in numeric or verse ranges.** Keep `605–539 BC`, `Daniel 2:41–43`, `1798–1844`. Never use an en dash to join clauses.

### Formatting

- **No markdown syntax inside plain prose content.** No asterisks, no hashtags, no backticks used for emphasis or headers inside a study, card, or microcopy string.
- **Exception:** blog and MDX bodies that are intentionally authored as markdown keep their rendered structure (headers, bold, lists). Even there, the em-dash, semicolon, and banned-word rules still apply to the words themselves.
- **No hashtags anywhere in content.**

### Banned words, Tier 1 (hard ban)

Marketing filler, AI-slop, and empty intensifiers. These are never needed in this content. Remove them and rephrase.

`just`, `very`, `really`, `literally`, `actually`, `certainly`, `probably`, `basically`, `maybe`, `delve`, `embark`, `enlightening`, `esteemed`, `shed light`, `craft`, `crafting`, `game-changer`, `unlock`, `skyrocket`, `skyrocketing`, `abyss`, `not alone`, `in a world where`, `revolutionize`, `disruptive`, `utilize`, `utilizing`, `dive deep`, `tapestry`, `illuminate`, `unveil`, `pivotal`, `intricate`, `elucidate`, `hence`, `furthermore`, `moreover`, `harness`, `exciting`, `groundbreaking`, `cutting-edge`, `remarkable`, `remains to be seen`, `glimpse into`, `navigating`, `landscape`, `stark`, `in summary`, `in conclusion`, `boost`, `opened up`, `powerful`, `inquiries`, `ever-evolving`, `realm`

The lint reports these as warnings rather than build failures, because a banned word can appear inside a quoted Bible verse. Review each hit: if it is your own prose, rewrite it; if it is verbatim Scripture, leave the verse exact.

### Non-negotiable content requirements

- Every piece cites Scripture.
- Every piece lands on a Christ Pivot (see Layer 3).
- Never present futurism or preterism as equivalent to the historicist reading. Never rely on date-setting.

---

## Layer 2: Voice and tone

- **Active voice. Short, direct sentences.** Address the reader as "you" and "your".
- **Hook immediately.** Open inside the scene. Skip introductions and setup language.
- **Wonder, not fear.** The tone is awe-based, never anxiety-driven. No end-time countdown pressure.
- **Conversational depth.** Clear English for 16 to 24 year olds without losing biblical rigour.
- **Avoid the "not just X, but also Y" construction.** Split it into direct statements.
- **Avoid clichés, decorative metaphors, and sweeping generalizations.**
- **Avoid setup and filler transitions** ("in conclusion", "to sum up", "as we can see").

### Banned words, Tier 2 (avoid where natural)

Structural or context-dependent words. Rephrase only when the sentence still reads cleanly and the meaning holds. Never break grammar or force awkward English to remove one.

`can`, `may`, `could`, `that`, `it`, `however`, `imagine`, `discover`

Do not touch `Old Testament` or `New Testament` (proper nouns), and do not touch the code key `testament` in data files.

### Mobile-first copy

Every string is read on a phone first. Keep paragraphs short. A sentence that wraps into a dense block at 390px is too long. Break it.

---

## Layer 3: Theological framework

This is the heart of the site. Every piece is written through this lens.

### Christ at the centre

- Jesus is the epicentre of every prophecy and symbol. Every prophetic period anchors to who Jesus is, not to geopolitics or speculation.
- Vindicate God's character. Frame every truth through his non-coercive, self-sacrificing love.
- Distinguish covenant sacrifice, where God takes responsibility for his creation, from appeasement, where humans try to calm an angry deity.
- Communicate the bias to save: the plan of salvation is weighted in the believer's favour.

### The verdict is in your favour

- When you write about the Second Coming, focus on the return of a Person, the Bridegroom, not on the cataclysmic end of the world. Fear of an event runs out of fuel. Love for a Person lasts.
- The judgment of Daniel 7 is not a threat. It is a public decision made in favour of the saints, giving them their lives back from the adversary.

### How to handle failure and shame

- Move the reader from shame to curiosity. Instead of "why did you do that", ask "what wound or unmet need triggered that".
- Treat every person as someone sinned against and someone who has sinned. The gospel turns wounded people into people who heal others.
- Never use spiritual language to bypass real trauma or relational brokenness.
- The Mirror principle: feeling your flaws is a sign of nearness to Jesus, not distance from him. The closer to the light, the more you see.

### How to handle doubt and knowledge

- True knowledge of God is relational intimacy, not a pile of data.
- A believer's ability to know God does not depend on their ability to prove God to a skeptic.
- "I don't know" is an honest and strong answer. Prefer the long game of love over winning an argument.

### The community

- Portray the church as a place where people with issues belong, a workshop for practising grace and forgiveness.
- Speak to the overlooked: those who feel invisible, and those who feel constantly judged.

### The three-part structure

Build each piece on this arc:

1. **Shadow.** The Old Testament type, the symbol, the historical setting, the prophecy in its own world.
2. **Substance.** How it finds its fulfilment and meaning in Christ.
3. **Invitation.** A direct, heart-centred call for the reader to respond to the beauty of Christ.

---

## Review checklist

Run this before marking any piece done. Layer 1 is verified by the lint; the rest is a human or agent read.

**Layer 1 (or run `npm run lint:content`):**

1. Zero em dashes.
2. No semicolons in prose (verse quotations excepted).
3. En dashes only in numeric or verse ranges.
4. No stray markdown, asterisks, or hashtags in plain prose.
5. No Tier 1 banned words in your own prose.
6. Scripture is cited.

**Layer 2:**

7. Active voice, short sentences, "you" address.
8. Opens inside the scene, no setup filler.
9. Tone is wonder, not fear.
10. Reads cleanly at 390px.

**Layer 3:**

11. Jesus is the centre, not geopolitics or speculation.
12. God's character is vindicated as self-giving love.
13. Any judgment or Second Coming content reads as a verdict in the reader's favour.
14. The piece lands on a genuine Christ Pivot (Invitation), not a "try harder" application.
15. If a section has no room for Christ, that is flagged, not shipped.

---

_Earlier notes in `docs/writing-guidelines.md` and `.cursor/rules/writing-guidelines.mdc` are superseded. This document wins wherever they overlap._
