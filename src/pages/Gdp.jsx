import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const TOP_COUNTRIES = [
  { name: "United States", value: 28750956, rank: 1 },
  { name: "China", value: 18743803, rank: 2 },
  { name: "Germany", value: 4685593, rank: 3 },
  { name: "Japan", value: 4027598, rank: 4 },
  { name: "India", value: 3909892, rank: 5 },
  { name: "United Kingdom", value: 3686033, rank: 6 },
  { name: "France", value: 3160443, rank: 7 },
  { name: "Italy", value: 2380825, rank: 8 },
  { name: "Canada", value: 2243637, rank: 9 },
  { name: "Brazil", value: 2185822, rank: 10 },
  { name: "Russia", value: 2173836, rank: 11 },
  { name: "Korea, Rep.", value: 1875388, rank: 12 },
  { name: "Mexico", value: 1856366, rank: 13 },
  { name: "Australia", value: 1757022, rank: 14 },
  { name: "Spain", value: 1725672, rank: 15 },
  { name: "Indonesia", value: 1396300, rank: 16, highlight: true },
];

const COMPONENTS = [
  { label: "C — Konsumsi Rumah Tangga", pct: 58, color: "#f59e0b" },
  { label: "I — Investasi", pct: 20, color: "#3b82f6" },
  { label: "G — Pengeluaran Pemerintah", pct: 17, color: "#8b5cf6" },
  { label: "X−M — Ekspor Neto", pct: 5, color: "#10b981" },
];

const TIERS = [
  {
    label: "High Income",
    range: "> $13,845",
    flag: "🟢",
    examples: "AS, Jerman, Singapura",
  },
  {
    label: "Upper-Middle",
    range: "$4,466 – $13,845",
    flag: "🔵",
    examples: "Brasil, Tiongkok, Indonesia",
  },
  {
    label: "Lower-Middle",
    range: "$1,136 – $4,465",
    flag: "🟡",
    examples: "India, Vietnam, Filipina",
  },
  {
    label: "Low Income",
    range: "< $1,135",
    flag: "🔴",
    examples: "Ethiopia, Mali, Niger",
  },
];

const INSIGHTS = [
  {
    no: "01",
    title: "Konsentrasi Ekstrem",
    body: "Hanya 2 negara — AS dan Tiongkok — menguasai lebih dari 47% total GDP dunia, mencerminkan konsentrasi kekuatan ekonomi yang sangat asimetris.",
  },
  {
    no: "02",
    title: "Asia Timur Mendominasi",
    body: "Tiongkok, Jepang, Korea, dan India secara kolektif melampaui GDP seluruh Eropa Barat — pergeseran tektonis dari barat ke timur.",
  },
  {
    no: "03",
    title: "Posisi Indonesia",
    body: "Indonesia berada di peringkat 16 dengan GDP ~$1,4 triliun, menjadikannya ekonomi terbesar Asia Tenggara dan satu-satunya wakil ASEAN dalam top-20.",
  },
  {
    no: "04",
    title: "Gap yang Menganga",
    body: "Gap antara AS (#1) dan Indonesia (#16) adalah 20×. Kesenjangan ini memperlihatkan seberapa jauh jarak antara ujung teratas dan menengah tangga ekonomi global.",
  },
];

/* ─── HELPERS ───────────────────────────────────────────────────────────── */

function fmtM(v) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}T`;
  return `$${(v / 1_000).toFixed(0)}B`;
}

/* ─── SUB-COMPONENTS ────────────────────────────────────────────────────── */

function AnimBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div
      style={{
        height: 6,
        background: "#1e293b",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: color,
          borderRadius: 99,
          transition: "width 1s cubic-bezier(.22,.68,0,1.2)",
          boxShadow: `0 0 10px ${color}88`,
        }}
      />
    </div>
  );
}

function CountryBar({ country, max, index }) {
  const [w, setW] = useState(0);
  const pct = (country.value / max) * 100;
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 200 + index * 60);
    return () => clearTimeout(t);
  }, [pct, index]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "24px 140px 1fr 90px",
        alignItems: "center",
        gap: "12px",
        padding: "10px 0",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: country.highlight ? "#f59e0b" : "#475569",
          fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {String(country.rank).padStart(2, "0")}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: country.highlight ? 800 : 500,
          color: country.highlight ? "#f59e0b" : "#94a3b8",
          letterSpacing: country.highlight ? 0.5 : 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {country.name}
        {country.highlight && (
          <span
            style={{
              marginLeft: 6,
              fontSize: 10,
              background: "#f59e0b22",
              color: "#f59e0b",
              padding: "1px 6px",
              borderRadius: 4,
              border: "1px solid #f59e0b55",
            }}
          >
            ID
          </span>
        )}
      </span>
      <div
        style={{
          background: "#0f172a",
          borderRadius: 3,
          overflow: "hidden",
          height: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${w}%`,
            background: country.highlight
              ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
              : country.rank <= 2
                ? "linear-gradient(90deg,#1d4ed8,#3b82f6)"
                : "linear-gradient(90deg,#1e3a5f,#2563eb88)",
            transition: "width 0.9s cubic-bezier(.22,.68,0,1.2)",
            borderRadius: 3,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          color: country.highlight ? "#f59e0b" : "#64748b",
          fontFamily: "'DM Mono', monospace",
          textAlign: "right",
          fontWeight: country.highlight ? 800 : 500,
        }}
      >
        {fmtM(country.value)}
      </span>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────── */

const Gdp = () => {
  const navigate = useNavigate();
  const max = TOP_COUNTRIES[0].value;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.5); }
        }

        .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both; }

        .gdp-card {
          background: #0b1220;
          border: 1px solid #1e293b;
          border-radius: 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .gdp-card:hover {
          border-color: #2563eb44;
          transform: translateY(-2px);
        }

        .tier-item {
          padding: 14px 16px;
          border-radius: 12px;
          background: #0b1220;
          border: 1px solid #1e293b;
          transition: all 0.2s;
          cursor: default;
        }
        .tier-item:hover {
          background: #101e33;
          border-color: #2563eb55;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #040d18; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#040d18",
          fontFamily: "'DM Sans', sans-serif",
          color: "#e2e8f0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "linear-gradient(#1e293b22 1px, transparent 1px), linear-gradient(90deg, #1e293b22 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Glow top-left */}
        <div
          style={{
            position: "fixed",
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, #1d4ed822 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 960,
            margin: "0 auto",
            padding: "40px 24px 80px",
          }}
        >
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up"
            style={{
              background: "transparent",
              border: "1px solid #1e293b",
              borderRadius: 8,
              color: "#64748b",
              fontSize: 13,
              fontWeight: 600,
              padding: "8px 14px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 36,
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3b82f6";
              e.currentTarget.style.borderColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "#1e293b";
            }}
          >
            ← Kembali ke Portfolio
          </button>

          {/* ── HERO ── */}
          <div
            className="fade-up"
            style={{
              animationDelay: "0.05s",
              marginBottom: 40,
              paddingBottom: 40,
              borderBottom: "1px solid #1e293b",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: "#3b82f6",
                  fontFamily: "'DM Mono', monospace",
                  textTransform: "uppercase",
                }}
              >
                Tableau · Economics
              </span>
              <span style={{ color: "#1e293b" }}>──────</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "#10b981",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                    animation: "pulse-dot 1.5s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                LIVE DATA
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
                fontWeight: 400,
                color: "#f1f5f9",
                marginBottom: 16,
              }}
            >
              Distribusi GDP
              <br />
              <span style={{ color: "#3b82f6", fontStyle: "italic" }}>
                Global
              </span>{" "}
              & Kesenjangan
              <br />
              Ekonomi Dunia
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                lineHeight: 1.8,
                maxWidth: 560,
                fontWeight: 300,
              }}
            >
              Visualisasi interaktif distribusi Gross Domestic Product (GDP)
              antar negara berdasarkan data World Bank. Dari dominasi AS dan
              Tiongkok hingga posisi Indonesia di peta ekonomi global.
            </p>

            {/* Meta pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 20,
              }}
            >
              {[
                { icon: "📊", label: "GDP Absolut" },
                { icon: "🌍", label: "World Bank Data" },
                { icon: "🔢", label: "Top 20 Negara" },
                { icon: "🇮🇩", label: "Fokus Indonesia" },
              ].map((p) => (
                <span
                  key={p.label}
                  style={{
                    background: "#0b1220",
                    border: "1px solid #1e293b",
                    borderRadius: 99,
                    fontSize: 12,
                    color: "#94a3b8",
                    padding: "5px 12px",
                    fontWeight: 500,
                  }}
                >
                  {p.icon} {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── TABLEAU EMBED ── */}
          <div
            className="fade-up gdp-card"
            style={{
              animationDelay: "0.1s",
              marginBottom: 40,
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
            <div
              style={{
                background: "#070f1c",
                borderBottom: "1px solid #1e293b",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: c,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 11,
                  color: "#475569",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                public.tableau.com · dgpblury / Sheet2
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#10b981",
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                ● LIVE
              </span>
            </div>
            <div style={{ width: "100%", height: 580 }}>
              <iframe
                title="GDP Global Tableau"
                src="https://public.tableau.com/views/dgpblury/Sheet2?:embed=y&:display_count=yes&:showVizHome=no&:toolbar=no"
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                allowFullScreen
              />
            </div>
          </div>

          {/* ── MINI CHART REPLICA ── */}
          <div
            className="fade-up gdp-card"
            style={{
              animationDelay: "0.15s",
              marginBottom: 40,
              padding: "28px 28px 20px",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#3b82f6",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Chart Breakdown
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#f1f5f9",
                  fontWeight: 400,
                }}
              >
                Top 16 Ekonomi Terbesar Dunia
              </h2>
              <p style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                Nilai GDP absolut dalam miliar USD (World Bank)
              </p>
            </div>

            {TOP_COUNTRIES.map((c, i) => (
              <CountryBar key={c.name} country={c} max={max} index={i} />
            ))}

            <p
              style={{
                fontSize: 11,
                color: "#334155",
                marginTop: 16,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              * Nilai dalam juta USD. Indonesia disorot sebagai ekonomi terbesar
              ASEAN.
            </p>
          </div>

          {/* ── GDP EXPLAINED ── */}
          <div
            className="fade-up"
            style={{ animationDelay: "0.2s", marginBottom: 40 }}
          >
            <div
              style={{
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid #1e293b",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#8b5cf6",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Ekonomi 101
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#f1f5f9",
                  fontWeight: 400,
                }}
              >
                Apa itu GDP?
              </h2>
            </div>

            <div
              className="gdp-card"
              style={{ padding: "24px 28px", marginBottom: 20 }}
            >
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: "#94a3b8",
                  fontWeight: 300,
                }}
              >
                <strong style={{ color: "#f1f5f9", fontWeight: 700 }}>
                  Gross Domestic Product (GDP)
                </strong>{" "}
                adalah total nilai pasar semua barang dan jasa akhir yang
                diproduksi di dalam wilayah suatu negara dalam periode tertentu
                — biasanya satu tahun. GDP adalah{" "}
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                  barometer utama kesehatan ekonomi
                </span>{" "}
                yang digunakan oleh pemerintah, investor, dan lembaga
                internasional.
              </p>
            </div>

            {/* Formula */}
            <div
              className="gdp-card"
              style={{
                padding: "24px 28px",
                background: "linear-gradient(135deg, #0b1220 0%, #0d1a30 100%)",
                border: "1px solid #1e3a5f",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#3b82f6",
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 600,
                  marginBottom: 12,
                  letterSpacing: 1,
                }}
              >
                FORMULA PENGELUARAN
              </p>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                  color: "#f1f5f9",
                  padding: "16px 0",
                  letterSpacing: 2,
                  marginBottom: 24,
                  borderTop: "1px solid #1e3a5f",
                  borderBottom: "1px solid #1e3a5f",
                }}
              >
                <span style={{ color: "#f59e0b" }}>C</span>
                {" + "}
                <span style={{ color: "#3b82f6" }}>I</span>
                {" + "}
                <span style={{ color: "#8b5cf6" }}>G</span>
                {" + "}
                <span style={{ color: "#10b981" }}>(X − M)</span>
                {" = "}
                <span>GDP</span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {COMPONENTS.map((c, i) => (
                  <div key={c.label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                        fontSize: 13,
                      }}
                    >
                      <span style={{ color: "#94a3b8" }}>{c.label}</span>
                      <span
                        style={{
                          color: c.color,
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        {c.pct}%
                      </span>
                    </div>
                    <AnimBar
                      pct={c.pct}
                      color={c.color}
                      delay={600 + i * 120}
                    />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "#334155", marginTop: 16 }}>
                * Komposisi ilustratif berdasarkan rata-rata global. Setiap
                negara memiliki proporsi berbeda.
              </p>
            </div>

            {/* Konsep cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {[
                {
                  icon: "📦",
                  title: "GDP Nominal",
                  body: "Diukur dengan harga pasar berlaku dalam mata uang lokal, lalu dikonversi ke USD. Lebih mudah dibandingkan antar waktu dalam satu negara.",
                  accent: "#3b82f6",
                },
                {
                  icon: "⚖️",
                  title: "GDP PPP",
                  body: "Purchasing Power Parity menyesuaikan perbedaan harga antar negara. Lebih adil untuk membandingkan standar hidup lintas negara.",
                  accent: "#8b5cf6",
                },
                {
                  icon: "👤",
                  title: "GDP Per Kapita",
                  body: "GDP dibagi jumlah penduduk. Proxy paling umum untuk mengukur kemakmuran rata-rata per individu dalam suatu negara.",
                  accent: "#10b981",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="gdp-card"
                  style={{
                    padding: "20px 20px",
                    borderTop: `2px solid ${card.accent}`,
                  }}
                >
                  <span
                    style={{ fontSize: 24, display: "block", marginBottom: 10 }}
                  >
                    {card.icon}
                  </span>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: 8,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748b",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── WORLD BANK TIERS ── */}
          <div
            className="fade-up gdp-card"
            style={{
              animationDelay: "0.25s",
              padding: "28px",
              marginBottom: 40,
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#f59e0b",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Klasifikasi World Bank 2024
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#f1f5f9",
                  fontWeight: 400,
                }}
              >
                Tingkatan Pendapatan Negara
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              {TIERS.map((t) => (
                <div key={t.label} className="tier-item">
                  <div style={{ fontSize: 18, marginBottom: 8 }}>{t.flag}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: 4,
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontFamily: "'DM Mono', monospace",
                      color: "#f59e0b",
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    {t.range}
                  </div>
                  <div style={{ fontSize: 11, color: "#475569" }}>
                    {t.examples}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── INSIGHTS ── */}
          <div
            className="fade-up"
            style={{ animationDelay: "0.3s", marginBottom: 40 }}
          >
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#10b981",
                  fontFamily: "'DM Mono', monospace",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Key Findings
              </p>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 22,
                  color: "#f1f5f9",
                  fontWeight: 400,
                }}
              >
                Insight dari Data
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {INSIGHTS.map((ins) => (
                <div
                  key={ins.no}
                  className="gdp-card"
                  style={{
                    padding: "20px 24px",
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 28,
                      color: "#1e3a5f",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {ins.no}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: 6,
                      }}
                    >
                      {ins.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#64748b",
                        lineHeight: 1.7,
                        fontWeight: 300,
                      }}
                    >
                      {ins.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── FOOTER NAV ── */}
          <div
            className="fade-up"
            style={{
              animationDelay: "0.35s",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 24,
              borderTop: "1px solid #1e293b",
            }}
          >
            <button
              onClick={() => navigate(-1)}
              style={{
                background: "transparent",
                border: "1px solid #1e293b",
                borderRadius: 8,
                color: "#475569",
                fontSize: 13,
                fontWeight: 600,
                padding: "10px 18px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3b82f6";
                e.currentTarget.style.borderColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#475569";
                e.currentTarget.style.borderColor = "#1e293b";
              }}
            >
              ← Kembali
            </button>

            <a
              href="https://public.tableau.com/app/profile/sidqi.amanullah/viz/dgpblury/Sheet2"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                padding: "10px 20px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s",
                boxShadow: "0 4px 20px #2563eb44",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px #2563eb66";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px #2563eb44";
              }}
            >
              Buka di Tableau Public ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gdp;
