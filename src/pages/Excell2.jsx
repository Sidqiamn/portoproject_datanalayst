import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../../src/assets/exell2.png";
import dashboard2 from "../../src/assets/dashboard2.png";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const kpis = [
  { label: "Total Revenue", value: "$307,1 M", icon: "💰", accent: "#3b82f6" },
  { label: "Total Profit", value: "$126,3 M", icon: "📈", accent: "#10b981" },
  { label: "Profit Margin", value: "41,1%", icon: "🎯", accent: "#f59e0b" },
  { label: "Transactions", value: "60,4 K", icon: "🛒", accent: "#8b5cf6" },
];

const topProducts = [
  { name: "Mountain-200 Black, 46", profit: 6.6, color: "#3b82f6" },
  { name: "Mountain-200 Black, 42", profit: 6.4, color: "#3b82f6" },
  { name: "Mountain-200 Silver, 46", profit: 6.1, color: "#60a5fa" },
  { name: "Mountain-200 Black, 38", profit: 6.1, color: "#60a5fa" },
  { name: "Mountain-200 Silver, 42", profit: 6.0, color: "#93c5fd" },
];

const quarterlyProfits = [
  { q: "Q1", value: 32.3, pct: 26, color: "#1e293b" },
  { q: "Q2", value: 39.0, pct: 31, color: "#f59e0b" },
  { q: "Q3", value: 24.2, pct: 19, color: "#cbd5e1" },
  { q: "Q4", value: 30.8, pct: 24, color: "#f97316" },
];

const ageGroups = [
  { range: "25-29", pct: 8 },
  { range: "30-34", pct: 12 },
  { range: "35-39", pct: 14 },
  { range: "40-44", pct: 16 },
  { range: "45-49", pct: 18 },
  { range: "50+", pct: 42, highlight: true },
];

const productColors = [
  { color: "Black", profit: 39.16, pct: 100 },
  { color: "Red", profit: 31.59, pct: 80.7 },
  { color: "Silver", profit: 23.92, pct: 61.1 },
  { color: "Yellow", profit: 19.04, pct: 48.6 },
  { color: "Blue", profit: 9.43, pct: 24.1 },
];

const techniques = [
  {
    title: "Power Query",
    desc: "Transformasi data berat & segmentasi harga otomatis via Conditional Column",
    icon: "⚡",
    tag: "ETL",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "M Code",
    desc: "Kalkulasi usia pelanggan akurat dari tanggal lahir ke hari ini",
    icon: "🧮",
    tag: "Scripting",
    color: "from-violet-600 to-purple-500",
  },
  {
    title: "VBA / Macro",
    desc: "Tombol Clear Filter otomatis membersihkan semua slicer dalam satu klik",
    icon: "🤖",
    tag: "Automation",
    color: "from-emerald-600 to-teal-500",
  },
  {
    title: "Overlay Chart",
    desc: "Dua grafik ditumpuk untuk visualisasi produk nama-dalam-bar yang modern",
    icon: "🎨",
    tag: "Design",
    color: "from-orange-500 to-red-500",
  },
];

const steps = [
  {
    num: "01",
    title: "Persiapan Struktur Dashboard",
    body: "Menduplikasi sheet dashboard sebelumnya untuk konsistensi desain, membersihkan objek lama, dan mengelola Pivot Table untuk analisis produk & pelanggan (PNC).",
    icon: "🏗️",
  },
  {
    num: "02",
    title: "Analisis Top 5 Produk",
    body: "Formula dinamis mengambil 5 produk teratas berdasarkan profit, membuat kategori 'Others' untuk sisa produk, dan visualisasi horizontal bar chart dengan teknik overlap.",
    icon: "🏆",
  },
  {
    num: "03",
    title: "Segmentasi Harga via Power Query",
    body: "Conditional Column memisahkan produk: ≤$150 = Less Expensive, >$150 = Expensive. Hasilnya divisualisasikan dengan Bubble Chart kustom.",
    icon: "💲",
  },
  {
    num: "04",
    title: "Analisis Pelanggan & M Code",
    body: "M Code menghitung usia akurat; Conditional Column mengelompokkan ke rentang 5 tahunan. KPI card menampilkan total pelanggan, rata-rata usia, dan distribusi gender.",
    icon: "👥",
  },
  {
    num: "05",
    title: "Peta Kustom (Scatter → Map)",
    body: "Scatter Plot dijadikan peta dunia dengan latar gambar vektor biru. Koordinat X/Y manual menempatkan titik negara; ukuran bubble proporsional terhadap profit.",
    icon: "🗺️",
  },
  {
    num: "06",
    title: "Interaktivitas & Navigasi",
    body: "Slicer tahun & negara terhubung ke semua pivot. Macro VBA untuk Clear Filter. Tombol navigasi 'Time Analysis' ↔ 'Detail Dashboard' sebagai hyperlink antar halaman.",
    icon: "🎛️",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const Detail2 = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);
  const [, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const maxProfit = Math.max(...topProducts.map((p) => p.profit));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --bg: #0f1117;
          --surface: #181c27;
          --surface2: #1e2335;
          --border: rgba(255,255,255,0.07);
          --accent: #4f8ef7;
          --accent2: #f59e0b;
          --text: #e2e8f0;
          --muted: #94a3b8;
          --font-display: 'Nunito', sans-serif;
          --font-body: 'Outfit', sans-serif;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barIn {
          from { width: 0; }
        }
        @keyframes pulse-dot {
          0%,100% { transform: scale(1); opacity:1; }
          50%      { transform: scale(1.5); opacity:.6; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .anim { animation: fadeSlideUp 0.65s cubic-bezier(.22,.68,0,1.2) both; }
        .bar-in { animation: barIn 1.2s cubic-bezier(.22,.68,0,1.2) both; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        .ticker-wrap { overflow: hidden; }
        .ticker-track { display: flex; animation: ticker 28s linear infinite; white-space: nowrap; }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: "var(--bg)",
          fontFamily: "var(--font-body)",
          color: "var(--text)",
        }}
      >
        {/* ── NOISE OVERLAY ── */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            zIndex: 0,
          }}
        />

        {/* ── TICKER BANNER ── */}
        <div
          className="ticker-wrap py-2 border-b"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <div
            className="ticker-track text-xs font-semibold"
            style={{ color: "var(--muted)" }}
          >
            {[...Array(2)].map((_, ri) => (
              <span key={ri} className="flex gap-12 mr-12">
                {[
                  "Adventure Works Analysis",
                  "Excel Dashboard",
                  "Power Query",
                  "M Code",
                  "VBA Macro",
                  "Overlay Chart",
                  "Scatter Map",
                  "Top 5 Products",
                ].map((t, i) => (
                  <span key={i} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block pulse-dot"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="anim flex items-center gap-2 text-sm font-semibold group"
            style={{ color: "var(--muted)", animationDelay: "0s" }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all group-hover:border-blue-500 group-hover:text-blue-400"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
              }}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
            </span>
            <span className="group-hover:text-blue-400 transition-colors">
              Kembali ke Portfolio
            </span>
          </button>

          {/* ── HERO ── */}
          <div className="anim" style={{ animationDelay: "0.05s" }}>
            <div
              className="rounded-3xl overflow-hidden border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
              }}
            >
              {/* Top stripe */}
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #8b5cf6, #f59e0b, #10b981)",
                }}
              />

              <div className="px-8 pt-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {[
                      "📊 Microsoft Excel",
                      "🔧 Power Query",
                      "🤖 VBA Macro",
                    ].map((t) => (
                      <span
                        key={t}
                        className="text-xs font-bold px-3 py-1.5 rounded-full border"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--muted)",
                          background: "var(--surface2)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h1
                    className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Adventure Works
                    <br />
                    <span style={{ color: "var(--accent)" }}>
                      Sales Dashboard
                    </span>
                  </h1>

                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "var(--muted)" }}
                  >
                    Dashboard Excel interaktif dua halaman yang menganalisis
                    penjualan Adventure Works — mulai dari profitabilitas
                    produk, segmentasi harga, demografi pelanggan, hingga
                    distribusi geografis, semuanya ditenagai Power Query, M
                    Code, dan VBA.
                  </p>
                </div>

                {/* Right — KPI grid */}
                <div className="grid grid-cols-2 gap-3">
                  {kpis.map((k, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5 border hover:-translate-y-1 transition-transform"
                      style={{
                        background: "var(--surface2)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="text-2xl mb-2">{k.icon}</div>
                      <div
                        className="text-2xl font-extrabold mb-0.5"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: k.accent,
                        }}
                      >
                        {k.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "var(--muted)" }}
                      >
                        {k.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── DASHBOARD PREVIEWS ── */}
          <div
            className="anim grid grid-cols-1 lg:grid-cols-2 gap-4"
            style={{ animationDelay: "0.1s" }}
          >
            {[
              { label: "Time Analysis", img: dashboard1, tag: "Halaman 1" },
              { label: "Detail Dashboard", img: dashboard2, tag: "Halaman 2" },
            ].map((d, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border group"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b text-xs font-semibold"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <span>{d.label}</span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--surface2)",
                      color: "var(--accent)",
                    }}
                  >
                    {d.tag}
                  </span>
                </div>
                <div
                  className="relative overflow-hidden"
                  style={{ height: 220 }}
                >
                  <img
                    src={d.img}
                    alt={d.label}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,17,23,0.85) 0%, transparent 60%)",
                    }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      🔍 Preview Dashboard
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── TEKNIK UTAMA ── */}
          <div className="anim" style={{ animationDelay: "0.15s" }}>
            <h2
              className="text-xl font-extrabold mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Teknik Utama yang Digunakan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {techniques.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 border hover:-translate-y-1 transition-all duration-200 relative overflow-hidden group"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${t.color.includes("blue") ? "#3b82f6" : t.color.includes("violet") ? "#8b5cf6" : t.color.includes("emerald") ? "#10b981" : "#f97316"}, transparent)`,
                    }}
                  />

                  <span className="text-2xl">{t.icon}</span>
                  <span
                    className={`ml-auto float-right text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${t.color} text-white`}
                  >
                    {t.tag}
                  </span>

                  <h3
                    className="text-sm font-extrabold mt-3 mb-1.5 clear-both"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── WORKFLOW STEPS ── */}
          <div className="anim" style={{ animationDelay: "0.2s" }}>
            <h2
              className="text-xl font-extrabold mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alur Pengerjaan
            </h2>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200"
                  style={{
                    borderColor:
                      activeStep === i ? "var(--accent)" : "var(--border)",
                    background:
                      activeStep === i ? "var(--surface2)" : "var(--surface)",
                  }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  <div className="flex items-center gap-4 px-6 py-4">
                    <span
                      className="text-xs font-extrabold px-2.5 py-1 rounded-lg"
                      style={{
                        fontFamily: "var(--font-display)",
                        background:
                          activeStep === i
                            ? "var(--accent)"
                            : "var(--surface2)",
                        color: activeStep === i ? "#fff" : "var(--muted)",
                      }}
                    >
                      {s.num}
                    </span>
                    <span className="text-lg">{s.icon}</span>
                    <span
                      className="text-sm font-bold flex-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.title}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform"
                      style={{
                        color: "var(--muted)",
                        transform:
                          activeStep === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {activeStep === i && (
                    <div
                      className="px-6 pb-5 pt-1 border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--muted)" }}
                      >
                        {s.body}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── CHARTS ROW ── */}
          <div
            className="anim grid grid-cols-1 lg:grid-cols-2 gap-5"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Top 5 Products */}
            <div
              className="rounded-3xl border p-6"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-sm font-extrabold mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Top 5 Produk by Profit
              </h3>
              <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>
                Top-5 menyumbang{" "}
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  24,8%
                </span>{" "}
                dari total profit
              </p>
              <div className="space-y-4">
                {topProducts.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "var(--muted)" }}>{p.name}</span>
                      <span
                        className="font-bold"
                        style={{ color: "var(--accent)" }}
                      >
                        ${p.profit}M
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--surface2)" }}
                    >
                      <div
                        className="h-full rounded-full bar-in"
                        style={{
                          width: `${(p.profit / maxProfit) * 100}%`,
                          background: `linear-gradient(90deg, var(--accent), #93c5fd)`,
                          animationDelay: `${0.3 + i * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini donut text */}
              <div
                className="mt-6 flex items-center gap-3 text-xs p-3 rounded-xl"
                style={{ background: "var(--surface2)" }}
              >
                <span className="text-2xl">🥧</span>
                <div>
                  <span
                    className="font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    Top-5 = 24,8%
                  </span>
                  <span style={{ color: "var(--muted)" }}>
                    {" "}
                    &nbsp;·&nbsp; Others = 75,2%
                  </span>
                </div>
              </div>
            </div>

            {/* Quarterly + Age */}
            <div className="space-y-4">
              {/* Quarterly */}
              <div
                className="rounded-3xl border p-6"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-extrabold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Quarterly View by Profit
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {quarterlyProfits.map((q, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="rounded-xl py-4 mb-2 text-sm font-extrabold transition-transform hover:-translate-y-1"
                        style={{
                          background: q.color,
                          color: q.color === "#cbd5e1" ? "#1e293b" : "#fff",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ${q.value}M
                      </div>
                      <div
                        className="text-xs font-bold"
                        style={{ color: "var(--muted)" }}
                      >
                        {q.q}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--accent)" }}
                      >
                        {q.pct}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age groups */}
              <div
                className="rounded-3xl border p-6"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h3
                  className="text-sm font-extrabold mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Distribusi Usia Pelanggan
                </h3>
                <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
                  50+ berkontribusi{" "}
                  <span className="font-bold" style={{ color: "#f59e0b" }}>
                    42,22%
                  </span>{" "}
                  profit
                </p>
                <div className="flex items-end gap-2 h-20">
                  {ageGroups.map((a, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t-md transition-all hover:opacity-80"
                        style={{
                          height: `${a.pct * 1.5}px`,
                          background: a.highlight
                            ? "#f59e0b"
                            : "var(--surface2)",
                          border: `1px solid ${a.highlight ? "#f59e0b" : "var(--border)"}`,
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--muted)", fontSize: 9 }}
                      >
                        {a.range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── PRODUCT COLOR PROFIT ── */}
          <div
            className="anim rounded-3xl border p-6"
            style={{
              animationDelay: "0.3s",
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3
                  className="text-sm font-extrabold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Profit by Product Color
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  Harga &gt;$150 (Expensive) menyumbang{" "}
                  <span className="font-bold" style={{ color: "#10b981" }}>
                    95,43%
                  </span>{" "}
                  profit
                </p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: "var(--accent)" }}
                  />
                  <span style={{ color: "var(--muted)" }}>Profit ($M)</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {productColors.map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span
                    className="text-sm font-bold w-16"
                    style={{ color: "var(--muted)" }}
                  >
                    {c.color}
                  </span>
                  <div
                    className="flex-1 h-3 rounded-full overflow-hidden"
                    style={{ background: "var(--surface2)" }}
                  >
                    <div
                      className="h-full rounded-full bar-in"
                      style={{
                        width: `${c.pct}%`,
                        background: `linear-gradient(90deg, var(--accent), #6366f1)`,
                        animationDelay: `${0.4 + i * 0.1}s`,
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-extrabold w-16 text-right"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    ${c.profit}M
                  </span>
                </div>
              ))}
            </div>

            {/* Price segment summary */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                {
                  label: "Price Above $150",
                  pct: "95,43%",
                  profit: "$120,52 M",
                  tag: "Expensive",
                  color: "#3b82f6",
                },
                {
                  label: "Price Below $150",
                  pct: "4,57%",
                  profit: "$5,77 M",
                  tag: "Less Expensive",
                  color: "var(--muted)",
                },
              ].map((seg, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 border text-center"
                  style={{
                    background: "var(--surface2)",
                    borderColor: seg.color,
                    borderWidth: 1,
                  }}
                >
                  <div
                    className="text-xs font-bold mb-1"
                    style={{ color: "var(--muted)" }}
                  >
                    {seg.label}
                  </div>
                  <div
                    className="text-2xl font-extrabold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: seg.color,
                    }}
                  >
                    {seg.pct}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {seg.profit} Profit
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── INTERACTIVITY FEATURES ── */}
          <div className="anim" style={{ animationDelay: "0.35s" }}>
            <h2
              className="text-xl font-extrabold mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Fitur Interaktivitas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎛️",
                  title: "Slicer Multi-Dimensi",
                  desc: "Filter berdasarkan Tahun (2005–2008) dan Negara (AU, CA, FR, DE, UK, US) — terhubung ke semua Pivot Table sekaligus.",
                  color: "var(--accent)",
                },
                {
                  icon: "🤖",
                  title: "Clear Filter (VBA)",
                  desc: "Satu klik tombol 'Clear Filter' menjalankan Macro VBA yang mereset semua slicer secara bersamaan tanpa manual.",
                  color: "#10b981",
                },
                {
                  icon: "🔀",
                  title: "Navigasi Dua Halaman",
                  desc: "Tombol 'Time Analysis' & 'Detail Dashboard' bekerja sebagai hyperlink internal, memudahkan perpindahan antar halaman dashboard.",
                  color: "#f59e0b",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-200"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3
                    className="text-sm font-extrabold mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: f.color,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── KESIMPULAN ── */}
          <div
            className="anim rounded-3xl overflow-hidden border"
            style={{
              animationDelay: "0.4s",
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="px-7 py-5 border-b"
              style={{
                borderColor: "var(--border)",
                background:
                  "linear-gradient(135deg, rgba(79,142,247,0.1), transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🔎</span>
                <h3
                  className="text-base font-extrabold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kesimpulan & Insight Utama
                </h3>
              </div>
            </div>
            <div className="px-7 py-6">
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--muted)" }}
              >
                Dashboard Adventure Works berhasil mengintegrasikan{" "}
                <strong style={{ color: "var(--text)" }}>Power Query</strong>,{" "}
                <strong style={{ color: "var(--text)" }}>M Code</strong>, dan{" "}
                <strong style={{ color: "var(--text)" }}>VBA</strong> untuk
                menciptakan laporan penjualan yang fully interactive — dari
                analisis profitabilitas produk Mountain-200 hingga segmentasi
                demografis pelanggan berusia 50+.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Mountain-200 mendominasi",
                    desc: "5 varian teratas menyumbang 24,8% total profit",
                  },
                  {
                    label: "Produk mahal = 95,43% profit",
                    desc: "Segmen harga >$150 jauh mendominasi margin",
                  },
                  {
                    label: "50+ paling menguntungkan",
                    desc: "Kelompok usia ini berkontribusi 42,22% profit",
                  },
                  {
                    label: "US & Australia = 62,74%",
                    desc: "Dua negara ini mendominasi distribusi profit global",
                  },
                ].map((ins, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 rounded-xl border"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface2)",
                    }}
                  >
                    <span className="text-blue-400 mt-0.5">✦</span>
                    <div>
                      <div className="text-sm font-bold mb-0.5">
                        {ins.label}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        {ins.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM NAV ── */}
          <div
            className="anim flex items-center justify-between pb-10"
            style={{ animationDelay: "0.45s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold group"
              style={{ color: "var(--muted)" }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all group-hover:border-blue-500"
                style={{
                  background: "var(--surface2)",
                  borderColor: "var(--border)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M19 12H5M5 12l7-7M5 12l7 7" />
                </svg>
              </span>
              <span className="group-hover:text-blue-400 transition-colors">
                Kembali
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail2;
