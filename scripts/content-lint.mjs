#!/usr/bin/env node
// Content linter for Plain Prophecy.
// Enforces Layer 1 of docs/WRITING-RULES.md.
//
// Exit code:
//   0  no errors (warnings may still be printed)
//   1  one or more ERRORS found (em dashes), or --strict and any warning
//
// Usage:
//   node scripts/content-lint.mjs            report errors + warnings
//   node scripts/content-lint.mjs --strict   treat banned-word warnings as errors too
//   node scripts/content-lint.mjs --quiet     print summary only

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const args = new Set(process.argv.slice(2));
const STRICT = args.has('--strict');
const QUIET = args.has('--quiet');

// Directories scanned for em dashes and formatting (all rendered content).
const EMDASH_DIRS = ['data', 'content', 'app', 'components', 'lib'];
// Directories scanned for banned words (the content layer; broader scan is too noisy).
const PROSE_DIRS = ['data', 'content'];
const EXTS = new Set(['.ts', '.tsx', '.md', '.mdx']);

// Tier 1 banned words from WRITING-RULES.md. Whole-word, case-insensitive.
// Reported as warnings (they can appear inside verbatim Scripture quotations).
const BANNED_TIER1 = [
  'just', 'very', 'really', 'literally', 'actually', 'certainly', 'probably',
  'basically', 'maybe', 'delve', 'embark', 'enlightening', 'esteemed',
  'shed light', 'craft', 'crafting', 'game-changer', 'unlock', 'skyrocket',
  'skyrocketing', 'abyss', 'not alone', 'in a world where', 'revolutionize',
  'disruptive', 'utilize', 'utilizing', 'dive deep', 'tapestry', 'illuminate',
  'unveil', 'pivotal', 'intricate', 'elucidate', 'hence', 'furthermore',
  'moreover', 'harness', 'exciting', 'groundbreaking', 'cutting-edge',
  'remarkable', 'remains to be seen', 'glimpse into', 'navigating', 'landscape',
  'stark', 'in summary', 'in conclusion', 'boost', 'opened up', 'powerful',
  'inquiries', 'ever-evolving', 'realm',
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const bannedRe = new RegExp(`(?<![\\w-])(${BANNED_TIER1.map(escapeRe).join('|')})(?![\\w-])`, 'gi');
const constructionRe = /\bnot (just|only)\b[^.!?]*\bbut\b/i;

function walk(dir, out) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const entry of readdirSync(abs)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(abs, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(relative(ROOT, full), out);
    else if (EXTS.has(extname(entry))) out.push(relative(ROOT, full));
  }
  return out;
}

function collect(dirs) {
  const files = [];
  for (const d of dirs) walk(d, files);
  return [...new Set(files)];
}

const emdashFiles = collect(EMDASH_DIRS);
const proseFiles = new Set(collect(PROSE_DIRS));

const errors = [];   // { file, line, col, msg }
const warnings = []; // { file, line, msg }

for (const file of emdashFiles) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  const lines = text.split('\n');
  const isProse = proseFiles.has(file);

  lines.forEach((line, i) => {
    const ln = i + 1;

    // Escape hatch for genuine code (e.g. a regex that matches a dash as data).
    if (line.includes('content-lint-disable-line')) return;

    // ERROR: em dash anywhere in scanned content and UI copy.
    let idx = line.indexOf('—');
    while (idx !== -1) {
      errors.push({ file, line: ln, col: idx + 1, msg: 'em dash (—) not allowed' });
      idx = line.indexOf('—', idx + 1);
    }

    if (!isProse) return; // banned words + constructions only on the content layer

    // WARN: Tier 1 banned words.
    for (const m of line.matchAll(bannedRe)) {
      warnings.push({ file, line: ln, msg: `banned word "${m[1]}" (check: rewrite unless verbatim Scripture)` });
    }

    // WARN: "not just/only ... but ..." construction.
    if (constructionRe.test(line)) {
      warnings.push({ file, line: ln, msg: 'avoid "not just/only X, but Y" construction' });
    }
  });
}

function print(list, label) {
  if (!list.length) return;
  console.log(`\n${label}:`);
  for (const e of list) {
    const loc = e.col ? `${e.file}:${e.line}:${e.col}` : `${e.file}:${e.line}`;
    console.log(`  ${loc}  ${e.msg}`);
  }
}

if (!QUIET) {
  print(errors, 'ERRORS');
  print(warnings, 'WARNINGS');
}

console.log(
  `\ncontent-lint: ${emdashFiles.length} files scanned, ` +
  `${errors.length} error(s), ${warnings.length} warning(s).`
);

const failed = errors.length > 0 || (STRICT && warnings.length > 0);
if (failed) {
  console.log(STRICT ? 'FAILED (strict mode).' : 'FAILED. Fix errors above before shipping.');
  process.exit(1);
}
console.log('PASSED.');
process.exit(0);
