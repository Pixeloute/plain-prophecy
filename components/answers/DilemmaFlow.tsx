const mono = "IBM Plex Mono, monospace";
const serif = "Cinzel, serif";
const gold = "#C9A84C";
const line = "rgba(201,168,76,0.25)";

export default function DilemmaFlow() {
  return (
    <figure
      aria-label="The Islamic Dilemma mapped as a decision tree"
      style={{ margin: "32px 0", padding: 0 }}
    >
      <div
        style={{
          border: `1px solid ${gold}`,
          background: "#12110b",
          padding: "18px 20px",
          textAlign: "center",
          maxWidth: 480,
          margin: "0 auto",
          fontFamily: serif,
          fontSize: "clamp(15px, 4vw, 18px)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.4,
        }}
      >
        Was the Bible corrupted before the seventh century?
      </div>

      <div
        style={{
          textAlign: "center",
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(201,168,76,0.7)",
          padding: "12px 0",
        }}
      >
        ↓ follow each answer ↓
      </div>

      <div className="dilemma-split">
        <div style={{ border: `1px solid ${line}`, background: "#0f0e09", padding: "16px 18px", textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: 10,
            }}
          >
            If No
          </span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>
            The Bible read today is the one the Quran affirms. Its teaching about the cross and the deity of Christ stands, and it contradicts the Quran.
          </p>
        </div>
        <div style={{ border: `1px solid ${line}`, background: "#0f0e09", padding: "16px 18px", textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: gold,
              marginBottom: 10,
            }}
          >
            If Yes
          </span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>
            Then the Quran affirmed a corrupted book and commanded people to judge by it, against its own claim in Surah 6:115 no one changes Allah&apos;s words.
          </p>
        </div>
      </div>

      <div
        style={{
          border: `1px solid ${gold}`,
          background: "rgba(201,168,76,0.12)",
          padding: "16px 18px",
          textAlign: "center",
          marginTop: 14,
          maxWidth: 680,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: serif,
            fontSize: "clamp(14px, 3.5vw, 16px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.5,
          }}
        >
          Both paths lead away from the Quran&apos;s claims and back to the Bible&apos;s testimony about Jesus.
        </p>
      </div>

      <style>{`
        .dilemma-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          max-width: 680px;
          margin: 0 auto;
        }
        @media (max-width: 560px) {
          .dilemma-split { grid-template-columns: 1fr; }
        }
      `}</style>
    </figure>
  );
}
