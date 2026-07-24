const mono = "IBM Plex Mono, monospace";
const gold = "#C9A84C";

// Bar widths place each witness on a shared axis from 250 BC to AD 650.
const AXIS_START = -250;
const AXIS_END = 650;

interface Row {
  label: string;
  date: string;
  year: number;
  highlight?: boolean;
}

const ROWS: Row[] = [
  { label: "Dead Sea Scrolls", date: "250 BC – AD 68", year: -250 },
  { label: "P52, Gospel of John", date: "c. AD 125", year: 125 },
  { label: "P46, Paul's letters", date: "c. AD 200", year: 200 },
  { label: "Codex Vaticanus", date: "c. AD 325", year: 325 },
  { label: "Codex Sinaiticus", date: "c. AD 350", year: 350 },
  { label: "Muhammad's ministry", date: "AD 610–632", year: 610, highlight: true },
];

function widthFor(year: number): string {
  const pct = ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
  return `${Math.max(pct, 6).toFixed(1)}%`;
}

export default function ManuscriptChart() {
  return (
    <figure
      aria-label="Timeline chart: biblical manuscripts predate Muhammad's ministry by centuries"
      style={{ margin: "32px 0", padding: 0 }}
    >
      <div style={{ display: "grid", gap: 12 }}>
        {ROWS.map((row) => (
          <div key={row.label} className="ms-row">
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: row.highlight ? gold : "rgba(255,255,255,0.75)",
              }}
            >
              {row.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  height: 22,
                  width: widthFor(row.year),
                  background: row.highlight ? "rgba(201,168,76,0.35)" : gold,
                  border: row.highlight ? `1px dashed ${gold}` : "none",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption
        style={{
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          marginTop: 16,
        }}
      >
        Each bar marks when the text was written. Complete Bibles existed centuries before Islam began.
      </figcaption>
      <style>{`
        .ms-row {
          display: grid;
          grid-template-columns: minmax(140px, 190px) 1fr;
          gap: 12px;
          align-items: center;
        }
        @media (max-width: 560px) {
          .ms-row { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>
    </figure>
  );
}
