"use client";

import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Crimson+Pro:wght@300;400;500;600&family=Cinzel:wght@400;600;700&display=swap');

  .ghv-root {
    --navy: #010408;
    --navy-mid: #0a0f18;
    --navy-light: #111d30;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --gold-pale: #f5e9c4;
    --cream: #eee6d3;
    --cream-dim: #bbb5a6;
    --blue: #5b8fc9;
    --blue-bg: rgba(91,143,201,0.06);
    --blue-bdr: rgba(91,143,201,0.25);
    --amber: #d4a843;
    --amber-bg: rgba(212,168,67,0.06);
    --amber-bdr: rgba(212,168,67,0.25);
    --green: #5ba87a;
    --green-bg: rgba(91,168,122,0.06);
    --green-bdr: rgba(91,168,122,0.25);
    --red: #c25555;
    --dim: #6b7f96;
    --border: rgba(201,168,76,0.15);
    --row-bg: #080c14;
    color: var(--cream);
    font-family: 'Crimson Pro', Georgia, serif;
    overflow-x: hidden;
  }

  .ghv-page {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 36px 20px 80px;
  }

  .ghv-header {
    text-align: center;
    margin-bottom: 36px;
  }

  .ghv-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: .35em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 12px;
    animation: ghv-fu .7s ease forwards .2s;
    opacity: 0;
  }

  .ghv-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 10px;
    animation: ghv-fu .7s ease forwards .35s;
    opacity: 0;
  }

  .ghv-h1 em { color: var(--gold-light); font-style: italic; }

  .ghv-sub {
    font-size: .95rem;
    color: var(--dim);
    font-weight: 300;
    max-width: 580px;
    margin: 0 auto;
    animation: ghv-fu .7s ease forwards .5s;
    opacity: 0;
  }

  .ghv-divider {
    width: 50px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 16px auto;
    animation: ghv-fu .5s ease forwards .55s;
    opacity: 0;
  }

  @keyframes ghv-fu {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* === GRID === */
  .ghv-grid {
    display: grid;
    grid-template-columns: 100px 1fr 1fr 1fr;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    animation: ghv-fu .8s ease forwards .65s;
    opacity: 0;
  }

  @media (max-width: 700px) {
    .ghv-grid { grid-template-columns: 1fr; border-radius: 8px; }
    .ghv-row-label { border-right: none !important; border-bottom: 1px solid var(--border); }
    .ghv-col-head.corner { display: none; }
  }

  .ghv-col-head {
    padding: 16px 10px;
    text-align: center;
    border-bottom: 1px solid var(--border);
    background: var(--navy-mid);
  }
  .ghv-col-head.corner { background: var(--navy); }
  .ghv-ch-label {
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: .25em;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
  .ghv-ch-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; }
  .cl-blue  { color: var(--blue); }
  .ct-blue  { color: var(--blue); }
  .cl-amber { color: var(--amber); }
  .ct-amber { color: var(--amber); }
  .cl-green { color: var(--green); }
  .ct-green { color: var(--green); }

  .ghv-row-label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--gold);
    background: var(--navy);
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center;
    line-height: 1.3;
  }

  .ghv-cell {
    border-bottom: 1px solid var(--border);
    border-right: 1px solid var(--border);
    padding: 0;
    background: var(--row-bg);
    cursor: pointer;
    transition: background .3s ease;
    position: relative;
  }
  .ghv-cell:hover { background: rgba(201,168,76,0.03); }

  .ghv-cell-inner {
    padding: 14px 10px;
    text-align: center;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ghv-cell-inner svg { width: 100%; max-width: 220px; margin: 0 auto 4px; }

  .ghv-cell-summary { font-size: .8rem; color: var(--cream-dim); line-height: 1.4; margin-top: 2px; }
  .ghv-cell-summary strong { color: var(--cream); font-weight: 500; }

  .ghv-cell-detail {
    display: none;
    padding: 12px 14px;
    border-top: 1px solid var(--border);
    background: rgba(201,168,76,0.02);
    font-size: .82rem;
    color: var(--dim);
    line-height: 1.5;
    text-align: left;
  }
  .ghv-cell-detail.open { display: block; }

  .ghv-src {
    font-style: italic;
    margin-top: 6px;
    font-size: .78rem;
    color: var(--gold);
    opacity: .7;
  }

  .ghv-verdict {
    display: inline-block;
    margin-top: 8px;
    font-family: 'Cinzel', serif;
    font-size: 8px;
    letter-spacing: .12em;
    padding: 3px 8px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .v-prob { background: rgba(194,85,85,0.1); color: var(--red); border: 1px solid rgba(194,85,85,0.25); }
  .v-warn { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-bdr); }
  .v-good { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-bdr); }

  .ghv-god-text {
    font-family: 'Playfair Display', serif;
    font-size: .92rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--cream);
  }

  .ghv-foot {
    text-align: center;
    margin-top: 28px;
    padding: 16px 20px;
    background: rgba(201,168,76,0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: .85rem;
    color: var(--dim);
    line-height: 1.5;
  }
  .ghv-foot em { color: var(--gold-pale); }

  .ghv-grid > :nth-last-child(-n+4) { border-bottom: none; }
`;

type CellId = string;

export default function GodheadViewsCompared() {
  const [openCell, setOpenCell] = useState<CellId | null>(null);

  function toggle(id: CellId) {
    setOpenCell((prev) => (prev === id ? null : id));
  }

  function detailClass(id: CellId) {
    return `ghv-cell-detail${openCell === id ? " open" : ""}`;
  }

  return (
    <div className="ghv-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="ghv-page">

        <header className="ghv-header">
          <p className="ghv-eyebrow">Theology of the Godhead</p>
          <h1 className="ghv-h1">Three Views <em>Compared</em></h1>
          <p className="ghv-sub">
            How the Catholic, Non-Trinitarian, and Heavenly Trio positions understand the origin,
            structure, and nature of the Godhead. Tap any cell for deeper detail.
          </p>
          <div className="ghv-divider" />
        </header>

        <div className="ghv-grid">

          {/* HEADER ROW */}
          <div className="ghv-col-head corner" />
          <div className="ghv-col-head">
            <p className="ghv-ch-label cl-blue">View One</p>
            <p className="ghv-ch-title ct-blue">Catholic</p>
          </div>
          <div className="ghv-col-head">
            <p className="ghv-ch-label cl-amber">View Two</p>
            <p className="ghv-ch-title ct-amber">Non-Trinitarian</p>
          </div>
          <div className="ghv-col-head">
            <p className="ghv-ch-label cl-green">View Three</p>
            <p className="ghv-ch-title ct-green">Heavenly Trio</p>
          </div>

          {/* ROW 1: ORIGIN */}
          <div className="ghv-row-label">Origin</div>

          {/* Origin - Catholic */}
          <div className="ghv-cell" onClick={() => toggle("origin-catholic")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 135" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="a1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="var(--blue)" strokeWidth="1" />
                  </marker>
                </defs>
                <line x1="70" y1="12" x2="70" y2="55" stroke="var(--blue)" strokeWidth="1.5" markerEnd="url(#a1)" />
                <text x="70" y="8" textAnchor="middle" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="7">Eternally</text>
                <text x="70" y="0" textAnchor="middle" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="7">Self-Existent</text>
                <path d="M70,45 C52,72 60,88 95,95" fill="none" stroke="var(--blue)" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#a1)">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="38" y="75" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Eternal</text>
                <text x="33" y="83" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Generation</text>
                <path d="M75,45 C95,65 125,70 148,92" fill="none" stroke="var(--blue)" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#a1)">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.3s" repeatCount="indefinite" />
                </path>
                <text x="138" y="68" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Shared</text>
                <text x="138" y="76" fill="var(--blue)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Breath</text>
                <text x="70" y="68" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">F</text>
                <text x="110" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">S</text>
                <text x="158" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">HS</text>
              </svg>
            </div>
            <div className={detailClass("origin-catholic")}>
              Only the Father is eternally self-existent. The Son is &ldquo;eternally generated&rdquo; from the
              Father&rsquo;s substance (not created, but continuously proceeding). The Holy Spirit
              &ldquo;proceeds&rdquo; (spirates) from Father and Son together, as from a single principle.
              <div className="ghv-src">&ldquo;The Son proceeds from the Father by generation... the act of Generation is a continuous act.&rdquo; - Catholic Faith and Practice</div>
              <span className="ghv-verdict v-prob">Subordination by nature</span>
            </div>
          </div>

          {/* Origin - Non-Trinitarian */}
          <div className="ghv-cell" onClick={() => toggle("origin-nontrin")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 135" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="a2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="var(--amber)" strokeWidth="1" />
                  </marker>
                </defs>
                <line x1="70" y1="12" x2="70" y2="55" stroke="var(--amber)" strokeWidth="1.5" markerEnd="url(#a2)" />
                <text x="70" y="8" textAnchor="middle" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="7">Eternally</text>
                <text x="70" y="0" textAnchor="middle" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="7">Self-Existent</text>
                <path d="M70,45 C52,72 60,88 95,95" fill="none" stroke="var(--amber)" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#a2)">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="35" y="75" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Once-off</text>
                <text x="33" y="83" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Generation</text>
                <path d="M75,45 C95,65 125,70 148,92" fill="none" stroke="var(--amber)" strokeWidth="1.2" strokeDasharray="4 2" markerEnd="url(#a2)">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="2.3s" repeatCount="indefinite" />
                </path>
                <text x="138" y="68" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Shared</text>
                <text x="138" y="76" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="6.5" fontStyle="italic">Breath</text>
                <text x="70" y="68" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">F</text>
                <text x="110" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">S</text>
                <text x="158" y="112" textAnchor="middle" fill="var(--dim)" fontFamily="Cinzel,serif" fontSize="14">HS</text>
              </svg>
            </div>
            <div className={detailClass("origin-nontrin")}>
              Only the Father is eternally self-existent. The Son was &ldquo;begotten&rdquo; (brought forth) from
              the Father at some point in ages past. The Holy Spirit is not a separate being but the shared
              spirit, influence, or power of the Father and Son.
              <div className="ghv-src">Ironically mirrors the Catholic view: both hold that apart from the Father there is no eternal Christ and no Holy Spirit with a separate existence.</div>
              <span className="ghv-verdict v-warn">Son has a beginning</span>
            </div>
          </div>

          {/* Origin - Heavenly Trio */}
          <div className="ghv-cell" onClick={() => toggle("origin-trio")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 135" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="a3" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="var(--green)" strokeWidth="1" />
                  </marker>
                </defs>
                <line x1="55" y1="12" x2="55" y2="95" stroke="var(--green)" strokeWidth="1.5" markerEnd="url(#a3)" />
                <line x1="110" y1="12" x2="110" y2="95" stroke="var(--green)" strokeWidth="1.5" markerEnd="url(#a3)" />
                <line x1="165" y1="12" x2="165" y2="95" stroke="var(--green)" strokeWidth="1.5" markerEnd="url(#a3)" />
                <text x="55" y="8" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Eternally</text>
                <text x="55" y="0" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Self-Existent</text>
                <text x="110" y="8" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Eternally</text>
                <text x="110" y="0" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Self-Existent</text>
                <text x="165" y="8" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Eternally</text>
                <text x="165" y="0" textAnchor="middle" fill="var(--green)" fontFamily="Crimson Pro,serif" fontSize="6.5">Self-Existent</text>
                <text x="55" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">F</text>
                <text x="110" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">S</text>
                <text x="165" y="112" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="14" fontWeight="700">HS</text>
              </svg>
            </div>
            <div className={detailClass("origin-trio")}>
              No member derives existence from another. John 1:1-2 declares the Word was both distinct
              from God (&ldquo;was with God&rdquo;) and fully God (&ldquo;was God&rdquo;) - with no beginning implied.
              John 8:58 places Christ before Abraham with the divine &ldquo;I AM.&rdquo; Micah 5:2 describes
              Christ&rsquo;s &ldquo;origins from of old, from ancient times&rdquo; - the Hebrew <em>olam</em>, eternity.
              Each member is self-existent.
              <div className="ghv-src">John 1:1-2; John 8:58; Micah 5:2</div>
              <span className="ghv-verdict v-good">Co-eternal equality</span>
            </div>
          </div>

          {/* ROW 2: PERSONS */}
          <div className="ghv-row-label">Persons /<br />Alities</div>

          {/* Persons - Catholic */}
          <div className="ghv-cell" onClick={() => toggle("persons-catholic")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
                <text x="55" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">F</text>
                <text x="110" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">S</text>
                <text x="165" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">HS</text>
              </svg>
            </div>
            <div className={detailClass("persons-catholic")}>
              Three &ldquo;persons&rdquo; acknowledged, but in Catholic theology these are subsistent relations
              within a single divine essence (ousia), not three distinct beings. The language comes from
              Greek philosophy.
              <span className="ghv-verdict v-prob">Persons = relations, not beings</span>
            </div>
          </div>

          {/* Persons - Non-Trinitarian */}
          <div className="ghv-cell" onClick={() => toggle("persons-nontrin")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
                <text x="55" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">F</text>
                <text x="110" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">S</text>
                <text x="165" y="28" textAnchor="middle" fill="var(--dim)" fontFamily="Cinzel,serif" fontSize="20">HS</text>
              </svg>
            </div>
            <div className={detailClass("persons-nontrin")}>
              Three personalities named, but only two are actual beings. The Holy Spirit is variously
              described as a shared influence, power, or the ministry of angels. Webster&rsquo;s 1828:
              &ldquo;person&rdquo; = &ldquo;a thinking intelligent being.&rdquo; &ldquo;being&rdquo; = &ldquo;a person existing.&rdquo; The two
              words are synonymous.
              <span className="ghv-verdict v-warn">Spirit denied personhood</span>
            </div>
          </div>

          {/* Persons - Heavenly Trio */}
          <div className="ghv-cell" onClick={() => toggle("persons-trio")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 40" xmlns="http://www.w3.org/2000/svg">
                <text x="55" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">F</text>
                <text x="110" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">S</text>
                <text x="165" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700">HS</text>
              </svg>
            </div>
            <div className={detailClass("persons-trio")}>
              1 Cor 2:10-11: &ldquo;The Spirit searches all things, even the deep things of God... no one
              knows the thoughts of God except the Spirit of God.&rdquo; Only a personal, divine being can
              search the mind of another. John 16:13 uses the masculine pronoun <em>ekeinos</em> for the
              Spirit, not the neuter <em>pneuma</em> - a grammatical signal of personhood. Acts 5:3-4
              equates lying to the Spirit with lying to God directly.
              <div className="ghv-src">1 Cor 2:10-11; John 16:13; Acts 5:3-4</div>
              <span className="ghv-verdict v-good">Full personhood affirmed</span>
            </div>
          </div>

          {/* ROW 3: STRUCTURE */}
          <div className="ghv-row-label">Structure</div>

          {/* Structure - Catholic */}
          <div className="ghv-cell" onClick={() => toggle("structure-catholic")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 85" xmlns="http://www.w3.org/2000/svg">
                <line x1="55" y1="8" x2="110" y2="70" stroke="var(--blue)" strokeWidth="2" />
                <line x1="110" y1="8" x2="110" y2="70" stroke="var(--blue)" strokeWidth="2" />
                <line x1="165" y1="8" x2="110" y2="70" stroke="var(--blue)" strokeWidth="2" />
                <circle cx="110" cy="72" r="3" fill="var(--blue)" />
              </svg>
              <p className="ghv-cell-summary"><strong>3 merge into 1</strong></p>
            </div>
            <div className={detailClass("structure-catholic")}>
              All three converge into a single divine being. Distinguished only by internal relations
              (paternity, filiation, spiration).
              <span className="ghv-verdict v-prob">Identity merged</span>
            </div>
          </div>

          {/* Structure - Non-Trinitarian */}
          <div className="ghv-cell" onClick={() => toggle("structure-nontrin")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 85" xmlns="http://www.w3.org/2000/svg">
                <line x1="55" y1="8" x2="135" y2="70" stroke="var(--amber)" strokeWidth="1.8" />
                <line x1="110" y1="8" x2="80" y2="70" stroke="var(--amber)" strokeWidth="1.8" />
                <line x1="165" y1="8" x2="155" y2="70" stroke="var(--amber)" strokeWidth="1" strokeDasharray="4 3" />
                <line x1="165" y1="8" x2="80" y2="70" stroke="var(--amber)" strokeWidth=".7" strokeDasharray="3 3" opacity=".35" />
              </svg>
              <p className="ghv-cell-summary"><strong>Crossed / confused</strong></p>
            </div>
            <div className={detailClass("structure-nontrin")}>
              Three persons named but only two beings. The Holy Spirit has no structural anchor.
              Lines cross because the model is internally inconsistent.
              <span className="ghv-verdict v-warn">Structurally incoherent</span>
            </div>
          </div>

          {/* Structure - Heavenly Trio */}
          <div className="ghv-cell" onClick={() => toggle("structure-trio")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 85" xmlns="http://www.w3.org/2000/svg">
                <line x1="55" y1="8" x2="55" y2="75" stroke="var(--green)" strokeWidth="2" />
                <line x1="110" y1="8" x2="110" y2="75" stroke="var(--green)" strokeWidth="2" />
                <line x1="165" y1="8" x2="165" y2="75" stroke="var(--green)" strokeWidth="2" />
              </svg>
              <p className="ghv-cell-summary"><strong>3 parallel, distinct</strong></p>
            </div>
            <div className={detailClass("structure-trio")}>
              Matt 28:19 places all three in a single co-ordinate baptismal formula with equal syntactic
              weight. 2 Cor 13:14 gives each a distinct role - grace (Son), love (Father), fellowship
              (Spirit) - with no hierarchy implied. 1 Pet 1:2 traces salvation to all three acting in
              parallel: foreknowledge of the Father, sanctifying work of the Spirit, obedience to Christ.
              <div className="ghv-src">Matt 28:19; 2 Cor 13:14; 1 Pet 1:2</div>
              <span className="ghv-verdict v-good">Structurally consistent</span>
            </div>
          </div>

          {/* ROW 4: BEINGS */}
          <div className="ghv-row-label">Beings</div>

          {/* Beings - Catholic */}
          <div className="ghv-cell" onClick={() => toggle("beings-catholic")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 70" xmlns="http://www.w3.org/2000/svg">
                <text x="75" y="38" textAnchor="middle" fill="var(--cream)" fontFamily="Playfair Display,serif" fontSize="30" fontWeight="700">1</text>
                <text x="145" y="28" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="9">3 persons in</text>
                <text x="145" y="40" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="9">1 being</text>
              </svg>
            </div>
            <div className={detailClass("beings-catholic")}>
              Numerically one God, one being, one substance. The persons are internal relations within
              that single being.
              <span className="ghv-verdict v-prob">One being only</span>
            </div>
          </div>

          {/* Beings - Non-Trinitarian */}
          <div className="ghv-cell" onClick={() => toggle("beings-nontrin")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 95" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="18" fontWeight="700">F</text>
                <text x="95" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="18" fontWeight="700">S</text>
                <text x="160" y="22" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="8.5">3 persons in</text>
                <text x="160" y="33" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="8.5">2 beings</text>
                <line x1="50" y1="38" x2="50" y2="60" stroke="var(--amber)" strokeWidth="1.5" />
                <line x1="95" y1="38" x2="95" y2="72" stroke="var(--amber)" strokeWidth="1.5" />
                <text x="95" y="86" textAnchor="middle" fill="var(--amber)" fontFamily="Crimson Pro,serif" fontSize="9">Son of God</text>
              </svg>
            </div>
            <div className={detailClass("beings-nontrin")}>
              Father and Son are genuine beings. The Son is derived, lesser. The Holy Spirit has no
              separate existence. Phil 2:6-7: Christ &ldquo;being in very nature God, did not consider
              equality with God something to be grasped, but made himself nothing.&rdquo; This is
              voluntary condescension, not inherent inferiority - Christ set aside the exercise of
              divine prerogatives, not divine nature itself. A lesser God has nothing to set aside.
              <div className="ghv-src">Phil 2:6-7; Heb 1:3</div>
              <span className="ghv-verdict v-warn">Lesser God problem</span>
            </div>
          </div>

          {/* Beings - Heavenly Trio */}
          <div className="ghv-cell" onClick={() => toggle("beings-trio")}>
            <div className="ghv-cell-inner">
              <svg viewBox="0 0 220 85" xmlns="http://www.w3.org/2000/svg">
                <text x="40" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="18" fontWeight="700">F</text>
                <text x="100" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="18" fontWeight="700">S</text>
                <text x="160" y="28" textAnchor="middle" fill="var(--cream)" fontFamily="Cinzel,serif" fontSize="18" fontWeight="700">HS</text>
                <text x="200" y="22" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="8">3 persons</text>
                <text x="200" y="32" fill="var(--dim)" fontFamily="Crimson Pro,serif" fontSize="8">= 3 beings</text>
                <line x1="40" y1="42" x2="100" y2="72" stroke="var(--green)" strokeWidth="1.8" />
                <line x1="160" y1="42" x2="100" y2="72" stroke="var(--green)" strokeWidth="1.8" />
              </svg>
            </div>
            <div className={detailClass("beings-trio")}>
              John 17:21: &ldquo;that all of them may be one, Father, just as you are in me and I am in you.&rdquo;
              The unity is relational and moral - not ontological merger. Col 2:9: &ldquo;in Him all the
              fullness of the Deity lives in bodily form&rdquo; - the Son is not a partial or delegated God
              but the complete Godhead in person. Three beings, each fully God, united in nature and purpose.
              <div className="ghv-src">John 17:21; Col 2:9; John 10:30</div>
              <span className="ghv-verdict v-good">Full equality, full unity</span>
            </div>
          </div>

          {/* ROW 5: GOD */}
          <div className="ghv-row-label">God</div>

          {/* God - Catholic */}
          <div className="ghv-cell" onClick={() => toggle("god-catholic")}>
            <div className="ghv-cell-inner">
              <p className="ghv-god-text" style={{ color: "var(--blue)" }}>The one being<br />is God</p>
            </div>
            <div className={detailClass("god-catholic")}>
              God = a single divine substance (ousia) expressed in three internal relations. Codified at
              Nicaea (AD 325) using Greek philosophical categories (homoousios, hypostasis) that no
              biblical author employed.
              <div className="ghv-src">&ldquo;261 The mystery of the Most Holy Trinity is the central mystery of the Christian faith...&rdquo; - Catechism of the Catholic Church</div>
              <span className="ghv-verdict v-prob">Philosophical construct</span>
            </div>
          </div>

          {/* God - Non-Trinitarian */}
          <div className="ghv-cell" onClick={() => toggle("god-nontrin")}>
            <div className="ghv-cell-inner">
              <p className="ghv-god-text" style={{ color: "var(--amber)" }}>The Father is God,<br />The Son is not God.</p>
            </div>
            <div className={detailClass("god-nontrin")}>
              Only the Father possesses original deity. The Son has delegated or conferred deity.
              Incompatible with Col 2:9 (&ldquo;in Him dwelleth all the fulness of the Godhead bodily&rdquo;),
              Isa 44:6 (&ldquo;I am the first and I am the last; apart from me there is no God&rdquo; - spoken
              also by Christ in Rev 1:17), and John 1:1 (&ldquo;the Word was God&rdquo;).
              <div className="ghv-src">Col 2:9; Isa 44:6; Rev 1:17; John 1:1</div>
              <span className="ghv-verdict v-warn">Denies Christ&rsquo;s full deity</span>
            </div>
          </div>

          {/* God - Heavenly Trio */}
          <div className="ghv-cell" onClick={() => toggle("god-trio")}>
            <div className="ghv-cell-inner">
              <p className="ghv-god-text" style={{ color: "var(--green)", fontSize: ".82rem" }}>
                Each of the three is fully God,<br />yet united so closely as to be<br />one God, not three separate Gods.
              </p>
            </div>
            <div className={detailClass("god-trio")}>
              <em>Echad</em> unity (Gen 2:24; Deut 6:4). Not one substance, not one person, but one in
              nature, character, and purpose. The Hebrew <em>yachid</em> (absolute singularity) is never
              used of God in Scripture - it is always <em>echad</em> (composite unity). John 10:30:
              &ldquo;I and the Father are one&rdquo; - one in will, not one in person (cf. John 17:21 where
              disciples are also called to the same &ldquo;one&rdquo;).
              <div className="ghv-src">Deut 6:4; John 10:30; John 17:21-22</div>
              <span className="ghv-verdict v-good">Biblical echad unity</span>
            </div>
          </div>

        </div>

        <div className="ghv-foot">
          <em>
            &ldquo;In the beginning was the Word, and the Word was with God, and the Word was God.
            He was with God in the beginning.&rdquo;
          </em>{" "}
          - John 1:1-2
        </div>

      </div>
    </div>
  );
}
