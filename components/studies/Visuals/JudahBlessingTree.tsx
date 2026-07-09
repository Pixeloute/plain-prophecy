"use client";

import React from "react";

interface JudahBlessingTreeProps {
  activeSection: string;
  onSectionSelect: (sectionId: string) => void;
}

const GOLD = "#C9A84C";
const GOLD_BRIGHT = "#F0D080";
const DIM = "rgba(255,255,255,0.38)";
const LINE = "rgba(255,255,255,0.22)";
const NODE_FILL = "#0E0E14";

// Jacob's sons shown on the tree, in birth order (Joseph out of order visually
// so the double-portion branch sits on the right).
const SONS = [
  { id: "reuben", section: "reuben", name: "Reuben", x: 52, disqualified: true },
  { id: "simeon", section: "simeon-levi", name: "Simeon", x: 122, disqualified: true },
  { id: "levi", section: "simeon-levi", name: "Levi", x: 192, disqualified: true },
  { id: "judah", section: "judah", name: "Judah", x: 262, disqualified: false },
  { id: "joseph", section: "double-portion", name: "Joseph", x: 332, disqualified: false },
];

const GRANDSONS = [
  { id: "ephraim", name: "Ephraim", x: 300 },
  { id: "manasseh", name: "Manasseh", x: 352 },
];

const SONS_Y = 196;
const SON_R = 23;
const GRANDSON_Y = 286;
const GRANDSON_R = 16;
const LION_X = 190;
const LION_Y = 448;

export default function JudahBlessingTree({ activeSection, onSectionSelect }: JudahBlessingTreeProps) {
  const isActive = (section: string) => activeSection === section;

  const groupStyle = (section: string): React.CSSProperties => ({
    cursor: "pointer",
    opacity: isActive(section) ? 1 : 0.42,
    transition: "opacity 0.35s ease",
  });

  const nodeStroke = (section: string) => (isActive(section) ? GOLD_BRIGHT : LINE);
  const nodeStrokeWidth = (section: string) => (isActive(section) ? 2 : 1.2);
  const labelFill = (section: string) => (isActive(section) ? GOLD_BRIGHT : DIM);

  const select = (section: string) => () => onSectionSelect(section);
  const keySelect = (section: string) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSectionSelect(section);
    }
  };

  return (
    <div
      className="judah-tree"
      style={{
        width: "100%",
        maxWidth: "420px",
        margin: "0 auto",
        touchAction: "manipulation",
      }}
    >
      <svg
        viewBox="0 0 380 560"
        width="100%"
        role="group"
        aria-label="The firstborn blessing passing from Jacob to Judah, and from Judah to the Lion of Judah"
        style={{ display: "block" }}
      >
        <defs>
          <filter id="jt-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="jt-lion-fill" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#2A1F00" />
            <stop offset="100%" stopColor="#0F0C00" />
          </radialGradient>
        </defs>

        {/* Connector: Jacob to Reuben (leadership) and Jacob to Joseph (double portion) */}
        <g style={groupStyle("birthright")} onClick={select("birthright")} onKeyDown={keySelect("birthright")} tabIndex={0} aria-label="The firstborn blessing">
          <title>The Firstborn Blessing</title>
          <path d={`M 172 78 L 52 ${SONS_Y - SON_R - 6}`} stroke={nodeStroke("birthright")} strokeWidth={nodeStrokeWidth("birthright")} fill="none" />
          <path d={`M 208 78 L 332 ${SONS_Y - SON_R - 6}`} stroke={nodeStroke("birthright")} strokeWidth={nodeStrokeWidth("birthright")} fill="none" />

          {/* Jacob node */}
          <g filter={isActive("birthright") ? "url(#jt-glow)" : undefined}>
            <circle cx="190" cy="48" r="28" fill={NODE_FILL} stroke={nodeStroke("birthright")} strokeWidth={nodeStrokeWidth("birthright")} />
            <text x="190" y="45" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="11" fontWeight="700" fill={labelFill("birthright")}>
              JACOB
            </text>
            <text x="190" y="59" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="0.08em" fill={DIM}>
              ISRAEL
            </text>
          </g>

          {/* Stream labels */}
          <text x="92" y="118" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="0.12em" fill={labelFill("birthright")} style={{ textTransform: "uppercase" }}>
            LEADERSHIP
          </text>
          <text x="288" y="118" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="0.12em" fill={labelFill("birthright")} style={{ textTransform: "uppercase" }}>
            DOUBLE PORTION
          </text>
        </g>

        {/* Leadership relay: dashed arrows Reuben to Simeon to Levi to Judah */}
        <g style={{ opacity: isActive("birthright") || isActive("reuben") || isActive("simeon-levi") || isActive("judah") ? 0.9 : 0.3, transition: "opacity 0.35s ease" }} pointerEvents="none">
          {[0, 1, 2].map((i) => {
            const from = SONS[i].x + SON_R + 3;
            const to = SONS[i + 1].x - SON_R - 3;
            return (
              <g key={i}>
                <path d={`M ${from} ${SONS_Y} L ${to} ${SONS_Y}`} stroke={LINE} strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
                <path d={`M ${to} ${SONS_Y} l -6 -3.5 v 7 z`} fill={LINE} />
              </g>
            );
          })}
        </g>

        {/* Son nodes */}
        {SONS.map((son) => (
          <g
            key={son.id}
            style={groupStyle(son.section)}
            onClick={select(son.section)}
            onKeyDown={keySelect(son.section)}
            tabIndex={0}
            aria-label={son.name}
          >
            <title>{son.name}</title>
            {/* invisible tap pad to keep touch targets comfortable */}
            <circle cx={son.x} cy={SONS_Y} r={SON_R + 8} fill="transparent" />
            <g filter={isActive(son.section) ? "url(#jt-glow)" : undefined}>
              <circle cx={son.x} cy={SONS_Y} r={SON_R} fill={NODE_FILL} stroke={nodeStroke(son.section)} strokeWidth={nodeStrokeWidth(son.section)} />
              {son.disqualified && (
                <g stroke={isActive(son.section) ? "#B0725A" : "rgba(176,114,90,0.55)"} strokeWidth="1.6" strokeLinecap="round">
                  <path d={`M ${son.x - 8} ${SONS_Y - 8} L ${son.x + 8} ${SONS_Y + 8}`} />
                  <path d={`M ${son.x + 8} ${SONS_Y - 8} L ${son.x - 8} ${SONS_Y + 8}`} />
                </g>
              )}
              {son.id === "judah" && (
                /* crown above Judah */
                <path
                  d={`M ${son.x - 10} ${SONS_Y - SON_R - 8} l 4 -8 l 6 6 l 6 -6 l 4 8 z`}
                  fill={isActive("judah") || isActive("lion") ? GOLD : "rgba(201,168,76,0.45)"}
                  style={{ transition: "fill 0.35s ease" }}
                />
              )}
            </g>
            <text x={son.x} y={SONS_Y + SON_R + 16} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="10.5" fontWeight="700" fill={labelFill(son.section)}>
              {son.name}
            </text>
          </g>
        ))}

        {/* Joseph branch: Ephraim and Manasseh */}
        <g style={groupStyle("double-portion")} onClick={select("double-portion")} onKeyDown={keySelect("double-portion")} tabIndex={0} aria-label="Ephraim and Manasseh, adopted by Jacob">
          <title>Ephraim and Manasseh</title>
          {GRANDSONS.map((g) => (
            <path
              key={`line-${g.id}`}
              d={`M 332 ${SONS_Y + SON_R + 22} L ${g.x} ${GRANDSON_Y - GRANDSON_R - 4}`}
              stroke={nodeStroke("double-portion")}
              strokeWidth="1"
              fill="none"
            />
          ))}
          {GRANDSONS.map((g) => (
            <g key={g.id} filter={isActive("double-portion") ? "url(#jt-glow)" : undefined}>
              <circle cx={g.x} cy={GRANDSON_Y} r={GRANDSON_R} fill={NODE_FILL} stroke={nodeStroke("double-portion")} strokeWidth="1" />
              <text x={g.x} y={GRANDSON_Y + GRANDSON_R + 13} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8.5" fill={labelFill("double-portion")}>
                {g.name}
              </text>
            </g>
          ))}
          <text x="326" y={GRANDSON_Y + GRANDSON_R + 30} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="0.06em" fill={DIM}>
            ADOPTED · GEN 48:5
          </text>
        </g>

        {/* Judah down to the Lion */}
        <g style={groupStyle("lion")} onClick={select("lion")} onKeyDown={keySelect("lion")} tabIndex={0} aria-label="The Lion of the tribe of Judah">
          <title>The Lion of Judah</title>
          <path
            d={`M 262 ${SONS_Y + SON_R + 24} C 262 320, ${LION_X} 330, ${LION_X} ${LION_Y - 44}`}
            stroke={nodeStroke("lion")}
            strokeWidth={nodeStrokeWidth("lion")}
            fill="none"
          />
          <text x="214" y="332" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="0.08em" fill={DIM}>
            THROUGH DAVID
          </text>
          <text x="214" y="344" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" fill={DIM}>
            Ruth 4:18–22
          </text>

          <g filter={isActive("lion") ? "url(#jt-glow)" : undefined}>
            <circle cx={LION_X} cy={LION_Y} r="38" fill="url(#jt-lion-fill)" stroke={isActive("lion") ? GOLD_BRIGHT : "rgba(201,168,76,0.5)"} strokeWidth={isActive("lion") ? 2 : 1.2} />
            <text x={LION_X} y={LION_Y + 9} textAnchor="middle" fontSize="26" aria-hidden="true">
              🦁
            </text>
          </g>
          <text x={LION_X} y={LION_Y + 58} textAnchor="middle" fontFamily="Cinzel, serif" fontSize="12" fontWeight="700" fill={isActive("lion") ? GOLD_BRIGHT : GOLD}>
            THE LION OF JUDAH
          </text>
          <text x={LION_X} y={LION_Y + 74} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8.5" fill={DIM}>
            who conquers as a Lamb · Revelation 5:5–6
          </text>
        </g>
      </svg>
    </div>
  );
}
