"use client";

import { useState } from "react";
import Image from "next/image";
import { HOLY_SPIRIT_SESSIONS } from "@/data/holySpiritSessions";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Karla:wght@400;500;600;700&display=swap');

.hs-root{
  --hs-ink:#0E1A2B; --hs-ink2:#122135; --hs-card:#16273D; --hs-line:#2A3F5A;
  --hs-gold:#C9A24B; --hs-gold-soft:#D9BC7A; --hs-cream:#F4EFE4; --hs-muted:#9FB0C4;
  --hs-blood:#9B2D2A; --hs-blood-soft:#C4534F;
  --hs-display:'Fraunces', Georgia, serif;
  --hs-body:'Karla', -apple-system, 'Segoe UI', sans-serif;
  background:radial-gradient(1100px 650px at 75% -8%, #16283f 0%, var(--hs-ink) 55%) fixed, var(--hs-ink);
  color:var(--hs-cream); font-family:var(--hs-body); line-height:1.6; -webkit-font-smoothing:antialiased;
}
.hs-wrap{max-width:920px; margin:0 auto; padding:0 22px}

.hs-header{padding:56px 0 30px; text-align:center; border-bottom:1px solid var(--hs-line)}
.hs-kicker{font-size:12px; letter-spacing:3.5px; text-transform:uppercase; color:var(--hs-gold-soft); font-weight:700; margin-bottom:14px}
.hs-h1{font-family:var(--hs-display); font-weight:600; font-size:clamp(36px,7vw,64px); line-height:1.05; color:var(--hs-cream)}
.hs-h1 em{font-style:italic; color:var(--hs-gold)}
.hs-lede{max-width:640px; margin:18px auto 0; color:var(--hs-muted); font-size:16px}
.hs-anchor-list{margin-top:22px; font-size:12.5px; color:var(--hs-muted); letter-spacing:.3px}

.hs-nav{position:sticky; top:0; z-index:50; background:rgba(14,26,43,.96); backdrop-filter:blur(6px);
  border-bottom:1px solid var(--hs-line); padding:12px 0}
.hs-row{display:flex; gap:8px; overflow-x:auto; padding:0 4px; scrollbar-width:none}
.hs-row::-webkit-scrollbar{display:none}
.hs-stab{flex:0 0 auto; background:transparent; border:1px solid var(--hs-line); color:var(--hs-muted);
  font-family:var(--hs-body); font-size:12.5px; font-weight:600; padding:9px 15px; border-radius:999px;
  cursor:pointer; white-space:nowrap; transition:.18s}
.hs-stab:hover{color:var(--hs-cream); border-color:var(--hs-gold-soft)}
.hs-stab.active{background:var(--hs-gold); border-color:var(--hs-gold); color:var(--hs-ink)}
.hs-progress-track{height:3px; background:var(--hs-line); margin-top:10px; border-radius:3px; overflow:hidden}
.hs-progress-fill{height:100%; background:var(--hs-gold); transition:width .3s}

.hs-main{padding:0 0 80px}
.hs-panel{display:none}
.hs-panel.active{display:block; animation:hs-fade .4s ease}
@keyframes hs-fade{from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:none}}

.hs-hero-wrap{border-bottom:1px solid var(--hs-line); position:relative; width:100%; aspect-ratio:16/9}
.hs-hero-img{object-fit:cover}
.hs-panel-body{padding:36px 22px 0}

.hs-snum{font-size:12px; letter-spacing:3px; text-transform:uppercase; color:var(--hs-gold-soft); font-weight:700}
.hs-stitle{font-family:var(--hs-display); font-size:clamp(28px,5vw,42px); font-weight:600; margin:10px 0 6px; line-height:1.1; color:var(--hs-cream)}
.hs-ssub{color:var(--hs-muted); font-size:15.5px; margin-bottom:8px}
.hs-sanchor{display:inline-block; background:rgba(201,162,75,.1); border:1px solid rgba(201,162,75,.3);
  color:var(--hs-gold-soft); font-size:12.5px; font-weight:600; padding:5px 12px; border-radius:7px; margin-top:6px}

.hs-timing{display:flex; flex-wrap:wrap; gap:8px; margin:22px 0}
.hs-timing span{font-size:11.5px; font-weight:700; letter-spacing:.5px; color:var(--hs-ink); background:var(--hs-gold-soft);
  padding:6px 12px; border-radius:999px}

.hs-point-banner{background:linear-gradient(135deg, rgba(201,162,75,.14), rgba(201,162,75,.04)); border:1px solid var(--hs-gold);
  border-radius:12px; padding:20px 22px; margin:24px 0}
.hs-point-banner .hs-lbl{color:var(--hs-gold)}
.hs-point-banner p{font-family:var(--hs-display); font-size:19px; font-weight:500; color:var(--hs-cream); line-height:1.4}

.hs-scripture-index{margin:22px 0}
.hs-scripture-index .hs-lbl{color:var(--hs-muted); letter-spacing:1.5px}
.hs-pills{display:flex; flex-wrap:wrap; gap:8px}
.hs-scripture-index a{font-size:12.5px; font-weight:600; color:var(--hs-gold-soft); background:rgba(201,162,75,.08);
  border:1px solid rgba(201,162,75,.3); padding:6px 12px; border-radius:999px; text-decoration:none; transition:.15s; display:inline-flex; align-items:center; gap:5px}
.hs-scripture-index a:hover{background:var(--hs-gold); color:var(--hs-ink); border-color:var(--hs-gold)}
.hs-arrow{font-size:11px}

.hs-table{width:100%; border-collapse:collapse; margin:16px 0 8px; font-size:13.5px}
.hs-table th{background:var(--hs-gold); color:var(--hs-ink); font-weight:700; text-align:left; padding:9px 12px; font-size:11.5px; letter-spacing:.3px; text-transform:uppercase}
.hs-block-img-wrap{width:100%; border-radius:10px; border:1px solid var(--hs-line); margin:16px 0; position:relative; aspect-ratio:16/9; overflow:hidden}
.hs-block-img{object-fit:cover}
.hs-table td{padding:10px 12px; border-bottom:1px solid var(--hs-line); color:#DCE3EC; vertical-align:top}
.hs-table tr:last-child td{border-bottom:none; background:rgba(155,45,42,.1)}
.hs-table tr:last-child td:first-child{color:var(--hs-blood-soft); font-weight:700}
.hs-table td:first-child{font-weight:700; color:var(--hs-gold-soft); white-space:nowrap}
.hs-table td:nth-child(2){white-space:nowrap; color:var(--hs-muted); font-size:12.5px}
@media (max-width:640px){
  .hs-table{font-size:12.5px}
  .hs-table th, .hs-table td{padding:7px 8px}
}

.hs-hook{background:rgba(155,45,42,.08); border:1px solid rgba(155,45,42,.3); border-radius:10px; padding:16px 20px; margin:22px 0}
.hs-hook .hs-lbl{color:#E8918E; letter-spacing:1.5px}
.hs-hook p{font-size:15.5px; color:#F1E4E3}

.hs-keyword-card{margin:26px 0; background:var(--hs-card); border:1px solid var(--hs-line); border-left:3px solid var(--hs-gold);
  border-radius:10px; padding:18px 22px; display:flex; gap:28px; flex-wrap:wrap}
.hs-kw-block{flex:1; min-width:200px}
.hs-kw{font-family:var(--hs-display); font-style:italic; font-size:22px; color:var(--hs-gold)}
.hs-kwmeaning{font-size:14.5px; color:var(--hs-cream); margin-top:4px}

.hs-block{margin:22px 0}
.hs-block h3{font-family:var(--hs-display); font-size:19px; font-weight:600; color:var(--hs-gold-soft); margin-bottom:8px}
.hs-block p{font-size:15.5px; color:#DCE3EC}
.hs-verse-ref{color:var(--hs-gold-soft); font-weight:600}

.hs-facts{background:var(--hs-card); border:1px solid var(--hs-line); border-radius:12px; padding:20px 22px; margin:30px 0}
.hs-facts h3{font-family:var(--hs-display); font-size:15px; text-transform:uppercase; letter-spacing:1.5px; color:var(--hs-gold); margin-bottom:12px}
.hs-facts ul{list-style:none}
.hs-facts li{font-size:14.5px; color:#DCE3EC; margin-bottom:10px; padding-left:20px; position:relative; line-height:1.55}
.hs-facts li::before{content:"\\25C6"; color:var(--hs-gold-soft); position:absolute; left:0; font-size:10px; top:5px}

.hs-activity{background:rgba(201,162,75,.08); border:1px dashed rgba(201,162,75,.4); border-radius:10px; padding:18px 22px; margin:26px 0}
.hs-activity .hs-lbl{color:var(--hs-gold); letter-spacing:1.5px}
.hs-activity p{font-size:15px; color:#EFE6D0}

.hs-jesus-box{background:linear-gradient(180deg, rgba(155,45,42,.14), rgba(155,45,42,.04)); border:1px solid var(--hs-blood);
  border-left:4px solid var(--hs-blood); border-radius:12px; padding:26px 26px 22px; margin:34px 0}
.hs-jesus-box .hs-lbl{font-size:12px; letter-spacing:2px; color:var(--hs-blood-soft)}
.hs-jesus-box p{font-size:16px; color:#F3E6E5; line-height:1.65}
.hs-jesus-box .hs-punch{font-family:var(--hs-display); font-size:20px; font-style:italic; color:var(--hs-cream);
  margin-top:16px; padding-top:16px; border-top:1px solid rgba(155,45,42,.35); text-align:left}

.hs-questions{background:var(--hs-card); border:1px solid var(--hs-line); border-radius:12px; padding:22px 24px; margin-top:30px}
.hs-questions h3{font-family:var(--hs-display); font-size:16px; text-transform:uppercase; letter-spacing:1.5px; color:var(--hs-gold); margin-bottom:14px}
.hs-questions ol{padding-left:20px}
.hs-questions li{font-size:15.5px; color:#DCE3EC; margin-bottom:12px; line-height:1.55}
.hs-questions li::marker{color:var(--hs-gold-soft); font-weight:700}

.hs-lbl{font-size:11px; text-transform:uppercase; font-weight:700; margin-bottom:8px}

.hs-navbtns{display:flex; justify-content:space-between; margin-top:36px; gap:12px; padding-bottom:44px}
.hs-navbtn{flex:1; background:var(--hs-card); border:1px solid var(--hs-line); color:var(--hs-cream); font-family:var(--hs-body);
  font-weight:600; font-size:14px; padding:14px 18px; border-radius:10px; cursor:pointer; transition:.18s; text-align:left}
.hs-navbtn:hover{border-color:var(--hs-gold-soft)}
.hs-navbtn.hs-next{text-align:right}
.hs-navbtn span{display:block; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:var(--hs-muted); margin-bottom:3px}
.hs-navbtn:disabled{opacity:.3; cursor:default}

.hs-footer{border-top:1px solid var(--hs-line); padding:30px 0 50px; text-align:center; color:var(--hs-muted); font-size:12.5px}

@media (max-width:640px){
  .hs-header{padding:40px 0 24px}
  .hs-panel-body{padding:28px 18px 0}
  .hs-navbtns{flex-direction:column}
}
`;

export default function HolySpiritStudy() {
  const [active, setActive] = useState(0);
  const total = HOLY_SPIRIT_SESSIONS.length;
  const session = HOLY_SPIRIT_SESSIONS[active];

  const goTo = (i: number) => {
    setActive(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hs-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <header className="hs-header">
        <div className="hs-wrap">
          <div className="hs-kicker">Plain Prophecy &middot; Bible Study Series &middot; Six 1-hour sessions</div>
          <h1 className="hs-h1">
            Another <em>Helper</em>
          </h1>
          <p className="hs-lede">
            A six-session study on the Holy Spirit, built from John 14&ndash;16 and traced from Genesis to the
            epistles. Every session tells one story, makes one point, and closes on Jesus.
          </p>
          <div className="hs-anchor-list">
            John 14&ndash;16 &middot; Judges &amp; 1 Samuel &middot; Isaiah 11 &middot; Joel 2 &middot; Acts 1&ndash;2
            &middot; Romans 8 &middot; Galatians 5
          </div>
        </div>
      </header>

      <nav className="hs-nav">
        <div className="hs-wrap">
          <div className="hs-row">
            {HOLY_SPIRIT_SESSIONS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`hs-stab${i === active ? " active" : ""}`}
                onClick={() => goTo(i)}
              >
                Session {i + 1}
              </button>
            ))}
          </div>
          <div className="hs-progress-track">
            <div className="hs-progress-fill" style={{ width: `${((active + 1) / total) * 100}%` }} />
          </div>
        </div>
      </nav>

      <main className="hs-main">
        <div className="hs-panel active">
          <div className="hs-hero-wrap">
            <Image
              src={session.img}
              alt={session.title}
              fill
              sizes="(max-width: 920px) 100vw, 920px"
              className="hs-hero-img"
              priority={active === 0}
            />
          </div>
          <div className="hs-wrap hs-panel-body">
            <div className="hs-snum">
              Session {active + 1} of {total}
            </div>
            <h2 className="hs-stitle">{session.title}</h2>
            <p className="hs-ssub">{session.sub}</p>
            <span className="hs-sanchor" dangerouslySetInnerHTML={{ __html: session.anchor }} />

            <div className="hs-timing">
              {session.timing.map((t, i) => (
                <span key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </div>

            <div className="hs-point-banner">
              <div className="hs-lbl">The Point Of This Session</div>
              <p dangerouslySetInnerHTML={{ __html: session.point }} />
            </div>

            <div className="hs-scripture-index">
              <div className="hs-lbl">Every text in this session &middot; tap to read in NKJV</div>
              <div className="hs-pills">
                {session.texts.map((t) => (
                  <a
                    key={t}
                    href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(t)}&version=NKJV`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t} <span className="hs-arrow">&#8599;</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hs-hook">
              <div className="hs-lbl">Opening hook</div>
              <p dangerouslySetInnerHTML={{ __html: session.hook }} />
            </div>

            <div className="hs-keyword-card">
              <div className="hs-kw-block">
                <div className="hs-kw">{session.keyword.term}</div>
                <div className="hs-kwmeaning" dangerouslySetInnerHTML={{ __html: session.keyword.meaning }} />
              </div>
              <div className="hs-kw-block">
                <div className="hs-kw">{session.keyword2.term}</div>
                <div className="hs-kwmeaning" dangerouslySetInnerHTML={{ __html: session.keyword2.meaning }} />
              </div>
            </div>

            {session.blocks.map((b, i) => (
              <div className="hs-block" key={i}>
                <h3 dangerouslySetInnerHTML={{ __html: b.h }} />
                <p dangerouslySetInnerHTML={{ __html: b.p }} />
                {b.img && (
                  <div className="hs-block-img-wrap">
                    <Image
                      src={b.img}
                      alt={b.h}
                      fill
                      sizes="(max-width: 920px) 100vw, 920px"
                      className="hs-block-img"
                    />
                  </div>
                )}
                {b.table && (
                  <table className="hs-table">
                    <thead>
                      <tr>
                        {b.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.table.rows.map((r, ri) => (
                        <tr key={ri}>
                          {r.map((c, ci) => (
                            <td key={ci} dangerouslySetInnerHTML={{ __html: c }} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}

            <div className="hs-facts">
              <h3>Interesting to know</h3>
              <ul>
                {session.facts.map((f, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: f }} />
                ))}
              </ul>
            </div>

            <div className="hs-activity">
              <div className="hs-lbl">Group activity</div>
              <p dangerouslySetInnerHTML={{ __html: session.activity }} />
            </div>

            <div className="hs-jesus-box">
              <div className="hs-lbl">{session.jesus_title}</div>
              <p dangerouslySetInnerHTML={{ __html: session.jesus }} />
              <div className="hs-punch" dangerouslySetInnerHTML={{ __html: session.punch }} />
            </div>

            <div className="hs-questions">
              <h3>Talk it through</h3>
              <ol>
                {session.questions.map((q, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: q }} />
                ))}
              </ol>
            </div>

            <div className="hs-navbtns">
              <button
                type="button"
                className="hs-navbtn hs-prev"
                disabled={active === 0}
                onClick={() => goTo(Math.max(0, active - 1))}
              >
                <span>Previous</span>
                {active > 0 ? HOLY_SPIRIT_SESSIONS[active - 1].title : ""}
              </button>
              <button
                type="button"
                className="hs-navbtn hs-next"
                disabled={active === total - 1}
                onClick={() => goTo(Math.min(total - 1, active + 1))}
              >
                <span>Next</span>
                {active < total - 1 ? HOLY_SPIRIT_SESSIONS[active + 1].title : ""}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="hs-footer">
        <div className="hs-wrap">
          Another Helper &middot; Plain Prophecy &middot; built for reading start to finish or session by session
        </div>
      </footer>
    </div>
  );
}
