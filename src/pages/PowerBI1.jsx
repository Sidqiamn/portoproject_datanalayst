import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import powerBI1 from "../../src/assets/powerBI1.png";
import data1 from "../../src/assets/gambarpowerbi1/data1.png";
import data2 from "../../src/assets/gambarpowerbi1/data2.png";
import data3 from "../../src/assets/gambarpowerbi1/data3.png";
import data4 from "../../src/assets/gambarpowerbi1/data4.png";
import data5 from "../../src/assets/gambarpowerbi1/data5.png";
import data6 from "../../src/assets/gambarpowerbi1/data6.png";
import data7 from "../../src/assets/gambarpowerbi1/data7.png";
import data8 from "../../src/assets/gambarpowerbi1/data8.png";
import visual1 from "../../src/assets/gambarpowerbi1/visual1.png";
import visual2 from "../../src/assets/gambarpowerbi1/visual2.png";
import visual3 from "../../src/assets/gambarpowerbi1/visual3.png";
import dashboard1 from "../../src/assets/gambarpowerbi1/dashboard1.png";
import dataset from "../../src/assets/gambarpowerbi1/dataset.png";

/* ─── DATA ─────────────────────────────────────────────────── */
const kpiCards = [
  {
    label: "Total Pendapatan",
    value: "29.356.250",
    icon: "💰",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    prefix: "Rp",
  },
  {
    label: "Total Pelanggan",
    value: "18.484",
    icon: "👥",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    prefix: "",
  },
  {
    label: "Harga Rata-rata",
    value: "486,04",
    icon: "🏷️",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    prefix: "Rp",
  },
  {
    label: "Total Pesanan",
    value: "27.659",
    icon: "📦",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    prefix: "",
  },
];

const genderData = [
  { label: "Male", value: 9128, pct: 49.42, color: "#3b82f6" },
  { label: "Female", value: 9341, pct: 50.58, color: "#1e3a8a" },
];

const countryData = [
  { name: "United States", value: 7482, pct: 100 },
  { name: "Australia", value: 3591, pct: 48 },
  { name: "United Kingdom", value: 1913, pct: 25.6 },
  { name: "France", value: 1810, pct: 24.2 },
  { name: "Germany", value: 1780, pct: 23.8 },
  { name: "Canada", value: 1571, pct: 21 },
];

const ageData = [
  { label: "Dewasa Paruh Baya", value: 11567, color: "#3b82f6" },
  { label: "Lansia Awal", value: 4419, color: "#60a5fa" },
  { label: "Lansia Tua", value: 2462, color: "#93c5fd" },
  { label: "Sentenarian", value: 19, color: "#bfdbfe" },
];

const categoryData = [
  { name: "Bikes", value: 28316, color: "#3b82f6" },
  { name: "Accessories", value: 700, color: "#60a5fa" },
  { name: "Clothing", value: 340, color: "#93c5fd" },
];

const topProducts = [
  { name: "Mountain-2 Black-46", value: 1373454 },
  { name: "Mountain-2 Black-42", value: 1363128 },
  { name: "Mountain-2 Silver-36", value: 1339394 },
  { name: "Mountain-2 Silver-46", value: 1301029 },
  { name: "Mountain-2 Black-38", value: 1294854 },
];

const yearlyRevenue = [
  { year: "2010", value: 0.5 },
  { year: "2011", value: 5.5 },
  { year: "2012", value: 7 },
  { year: "2013", value: 16 },
  { year: "2014", value: 3.5 },
];

const orderCustomer = [
  { year: "2010", orders: 0.2, customers: 0.3 },
  { year: "2011", orders: 1.5, customers: 2 },
  { year: "2012", orders: 3, customers: 3 },
  { year: "2013", orders: 27, customers: 17 },
  { year: "2014", orders: 1, customers: 2 },
];

const categoryInsights = [
  {
    name: "Accessories",
    sales: "36.092 unit",
    revenue: "700.262",
    avg: "13",
    color: "blue",
    icon: "🔩",
    insight:
      "Volume penjualan sangat tinggi dengan harga paling murah — pasar massal yang sensitif terhadap harga.",
    actions: [
      "Naikkan harga 5–10% untuk meningkatkan revenue",
      "Pertahankan di kisaran harga kompetitif",
      "Revenue meningkat tanpa mengurangi penjualan signifikan",
    ],
  },
  {
    name: "Bikes",
    sales: "15.205 unit",
    revenue: "28.316.272",
    avg: "949",
    color: "indigo",
    icon: "🚲",
    insight:
      "Harga jauh lebih tinggi namun tetap laku banyak — permintaan kuat dan daya beli solid.",
    actions: [
      "Berikan promo/diskon terbatas 5–10%",
      "Buat bundle: helm + bike → harga lebih menarik",
      "Penjualan bisa meningkat pesat dengan harga sedikit lebih rendah",
    ],
  },
  {
    name: "Clothing",
    sales: "9.101 unit",
    revenue: "339.716",
    avg: "24",
    color: "violet",
    icon: "👕",
    insight:
      "Harga terjangkau namun penjualan di bawah accessories — indikasi product-market fit atau pemasaran kurang optimal.",
    actions: [
      "Tingkatkan variasi produk",
      "Kampanye musiman: 'New Arrival Season'",
      "Rebranding atau peningkatan kualitas foto produk",
    ],
  },
  {
    name: "Components",
    sales: "—",
    revenue: "—",
    avg: "264",
    color: "slate",
    icon: "⚙️",
    insight:
      "Harga sedang, namun data penjualan tidak tersedia — bisa stok terbatas, kurang promosi, atau permintaan rendah.",
    actions: [
      "Evaluasi apakah produk layak dipertahankan",
      "Pertimbangkan penurunan harga",
      "Perlu riset lanjutan untuk validasi pasar",
    ],
  },
];

/* ─── CHART COMPONENTS ──────────────────────────────────────── */
const DonutChart = () => {
  const total = genderData.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const r = 60,
    cx = 80,
    cy = 80,
    circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36">
      {genderData.map((d, i) => {
        const dash = (d.pct / 100) * circ;
        const gap = circ - dash;
        const seg = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={22}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        );
        offset += dash;
        return seg;
      })}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="11"
        fill="#475569"
        fontWeight="700"
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fontSize="13"
        fill="#1e40af"
        fontWeight="800"
      >
        {total.toLocaleString("id-ID")}
      </text>
    </svg>
  );
};

const HBar = ({ data, color = "#3b82f6" }) => (
  <div className="space-y-2.5">
    {data.map((d, i) => (
      <div key={i} className="flex items-center gap-3">
        <span className="text-xs text-slate-500 w-28 text-right leading-tight flex-shrink-0">
          {d.name}
        </span>
        <div className="flex-1 h-5 bg-slate-100 rounded overflow-hidden">
          <div
            className="h-full rounded"
            style={{
              width: `${d.pct}%`,
              background: color,
              animation: "barGrow 1s cubic-bezier(.22,.68,0,1.2) both",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        </div>
        <span className="text-xs font-bold text-slate-700 w-10 text-right flex-shrink-0">
          {d.value.toLocaleString("id-ID")}
        </span>
      </div>
    ))}
  </div>
);

const VBar = ({ data, maxVal, color = "#3b82f6", height = 120 }) => (
  <div className="flex items-end gap-3 justify-center" style={{ height }}>
    {data.map((d, i) => {
      const pct = (d.value / maxVal) * 100;
      return (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <span className="text-[10px] font-bold text-slate-600">
            {d.value >= 1000000
              ? `${(d.value / 1000000).toFixed(1)}M`
              : d.value >= 1000
                ? `${(d.value / 1000).toFixed(0)}K`
                : d.value}
          </span>
          <div
            className="w-full rounded-t-sm"
            style={{
              height: `${(pct / 100) * (height - 30)}px`,
              background: color,
              minHeight: 4,
              animation: "barGrow2 0.9s cubic-bezier(.22,.68,0,1.2) both",
              animationDelay: `${i * 0.1}s`,
            }}
          />
          <span className="text-[9px] text-slate-400 text-center leading-tight">
            {d.label || d.name || d.year}
          </span>
        </div>
      );
    })}
  </div>
);

const LineChart = ({ data, w = 280, h = 100 }) => {
  const maxV = Math.max(...data.map((d) => d.value));
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * (w - 20) + 10,
    y: h - 10 - (d.value / maxV) * (h - 20),
  }));
  const pathD = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
      ))}
      {data.map((d, i) => (
        <text
          key={i}
          x={pts[i].x}
          y={h - 1}
          textAnchor="middle"
          fontSize="8"
          fill="#94a3b8"
        >
          {d.year}
        </text>
      ))}
    </svg>
  );
};

const DualLineChart = ({ data, w = 280, h = 110 }) => {
  const maxV = Math.max(...data.map((d) => Math.max(d.orders, d.customers)));
  const makePoints = (key) =>
    data.map((d, i) => ({
      x: (i / (data.length - 1)) * (w - 20) + 10,
      y: h - 20 - (d[key] / maxV) * (h - 30),
    }));
  const makePath = (pts) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const ordPts = makePoints("orders");
  const custPts = makePoints("customers");
  return (
    <div>
      <div className="flex gap-4 mb-2">
        <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-500">
          <span className="w-3 h-0.5 bg-blue-500 inline-block rounded" /> Total
          Pesanan
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-300">
          <span className="w-3 h-0.5 bg-blue-300 inline-block rounded" />{" "}
          Customer Aktif
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }}>
        <path
          d={makePath(ordPts)}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d={makePath(custPts)}
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {ordPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
        ))}
        {custPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#93c5fd" />
        ))}
        {data.map((d, i) => (
          <text
            key={i}
            x={ordPts[i].x}
            y={h - 2}
            textAnchor="middle"
            fontSize="8"
            fill="#94a3b8"
          >
            {d.year}
          </text>
        ))}
      </svg>
    </div>
  );
};

/* ─── SECTION HEADER ─────────────────────────────────────────── */
const SectionHeader = ({ number, icon, title, subtitle }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-200">
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
        Insight {number}
      </span>
      <h3 className="text-lg font-extrabold text-slate-800 leading-tight">
        {title}
      </h3>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
const PowerBI1 = () => {
  const navigate = useNavigate();
  const [imgZoomed, setImgZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const maxProduct = Math.max(...topProducts.map((p) => p.value));
  const maxCat = Math.max(...categoryData.map((c) => c.value));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow { from { width: 0%; } }
        @keyframes barGrow2 { from { height: 0px !important; } }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .card-hover { transition: box-shadow 0.2s, transform 0.2s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -4px rgba(59,130,246,0.12); }
        .grid-bg {
          background-image: linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .img-zoom-overlay { animation: zoomIn 0.25s cubic-bezier(.22,.68,0,1.2) both; }
        .tab-active { background: #2563eb; color: white; box-shadow: 0 4px 12px -2px rgba(37,99,235,0.35); }
        .tab-inactive { background: white; color: #64748b; border: 1px solid #e2e8f0; }
        .tab-inactive:hover { border-color: #bfdbfe; color: #3b82f6; }
        .dashboard-img { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: zoom-in; }
        .dashboard-img:hover { transform: scale(1.01); box-shadow: 0 20px 60px -10px rgba(37,99,235,0.2); }
        .eda-img { border-radius: 12px; box-shadow: 0 4px 16px -4px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; width: 100%; display: block; }
      `}</style>

      {/* ── LIGHTBOX ── */}
      {imgZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setImgZoomed(false)}
        >
          <div className="img-zoom-overlay relative max-w-6xl w-full">
            <img
              src={powerBI1}
              alt="Power BI Dashboard Full View"
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setImgZoomed(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
            >
              <svg
                className="w-4 h-4 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="text-center text-white/60 text-xs mt-3">
              Klik di mana saja untuk menutup
            </p>
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-slate-50 grid-bg"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
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
            Kembali ke Portfolio
          </button>

          {/* ── HERO ── */}
          <div
            className="fade-up rounded-2xl overflow-hidden shadow-lg border border-slate-100"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="relative px-8 pt-9 pb-14 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 70% 30%, #60a5fa 0%, transparent 60%)",
                }}
              />
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  📊 Power BI · Customer Analytics
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Business Intelligence
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Dashboard Analitik
                <br />
                <span className="text-blue-300">Pelanggan & Penjualan</span>
              </h1>
              <p className="text-blue-100/80 text-sm max-w-lg leading-relaxed">
                Visualisasi interaktif data pelanggan, distribusi demografi,
                tren pendapatan, dan performa produk berdasarkan data
                multi-negara periode 2010–2014.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 2010–2014",
                  "🌏 6 Negara",
                  "📁 Power BI",
                  "👥 18K Pelanggan",
                ].map((m) => (
                  <span
                    key={m}
                    className="bg-white/10 border border-white/20 text-white/85 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI CARDS */}
            <div className="bg-white px-5 pb-5 -mt-5 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -translate-y-5">
                {kpiCards.map((k, i) => (
                  <div
                    key={i}
                    className={`${k.bg} ${k.border} border-2 rounded-xl p-4 shadow-sm card-hover`}
                  >
                    <div className="text-xl mb-1">{k.icon}</div>
                    <div className={`text-xs font-semibold ${k.color} mb-0.5`}>
                      {k.label}
                    </div>
                    <div className="text-lg font-extrabold text-slate-800 leading-tight">
                      {k.prefix && (
                        <span className="text-xs font-bold mr-0.5 text-slate-400">
                          {k.prefix}
                        </span>
                      )}
                      {k.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TAB NAVIGATION ── */}
          {/* ── TAB NAVIGATION ── */}
          <div
            className="fade-up flex flex-col gap-2 w-fit"
            style={{ animationDelay: "0.08s" }}
          >
            <style>{`
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.5), 0 0 0 0 rgba(37,99,235,0.3); }
      50% { box-shadow: 0 0 0 6px rgba(37,99,235,0.15), 0 0 0 12px rgba(37,99,235,0.05); }
    }
    @keyframes shimmerText {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes badgePop {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.18); }
    }
    @keyframes arrowBounce {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(4px); }
    }
    @keyframes dotBlink1 { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
    @keyframes dotBlink2 { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
    @keyframes dotBlink3 { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
    .eda-pulse { animation: pulseGlow 2s ease-in-out infinite; }
    .eda-shimmer {
      background: linear-gradient(90deg, #1e40af 0%, #60a5fa 40%, #1e40af 60%, #3b82f6 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerText 2.5s linear infinite;
      font-weight: 800;
    }
    .eda-badge {
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: white;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      animation: badgePop 1.4s ease-in-out infinite;
      box-shadow: 0 2px 6px rgba(239,68,68,0.4);
    }
    .eda-arrow { display: inline-block; animation: arrowBounce 1s ease-in-out infinite; }
    .eda-dot1 { animation: dotBlink1 1.2s ease-in-out infinite 0s; }
    .eda-dot2 { animation: dotBlink2 1.2s ease-in-out infinite 0.4s; }
    .eda-dot3 { animation: dotBlink3 1.2s ease-in-out infinite 0.8s; }
  `}</style>

            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
              {/* Tab Dashboard (normal) */}
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === "dashboard" ? "tab-active" : "tab-inactive"
                }`}
              >
                📊 Dashboard
              </button>

              {/* Tab EDA (animated) */}
              <button
                onClick={() => setActiveTab("eda")}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === "eda"
                    ? "tab-active"
                    : "tab-inactive eda-pulse border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {activeTab !== "eda" && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 eda-dot1 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 eda-dot2 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300 eda-dot3 inline-block" />
                  </>
                )}
                {activeTab !== "eda" ? (
                  <span className="eda-shimmer">Analisis EDA</span>
                ) : (
                  <span>🔍 Analisis EDA</span>
                )}
                {activeTab !== "eda" && (
                  <>
                    <span className="eda-badge">NEW</span>
                    <span className="eda-arrow">→</span>
                  </>
                )}
              </button>
            </div>

            {/* Hint text */}
            {activeTab === "dashboard" && (
              <p className="text-xs text-blue-500 font-semibold flex items-center gap-1 pl-1">
                <span>↑</span> Klik tombol di atas untuk melihat analisis
                lengkap
              </p>
            )}
          </div>

          {/* ══════════════ TAB 1: DASHBOARD ══════════════ */}
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              {/* ROW 1: Gender + Negara + Usia */}
              <div
                className="fade-up grid grid-cols-1 md:grid-cols-3 gap-4"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Total Pelanggan berdasarkan Gender
                  </h3>
                  <div className="flex items-center gap-4">
                    <DonutChart />
                    <div className="space-y-3">
                      {genderData.map((g, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ background: g.color }}
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-700">
                              {g.label}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {g.value.toLocaleString("id-ID")} ({g.pct}%)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Jumlah Pelanggan berdasarkan Negara
                  </h3>
                  <HBar data={countryData} color="#3b82f6" />
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Distribusi Pelanggan Berdasarkan Kelompok Usia
                  </h3>
                  <VBar
                    data={ageData}
                    maxVal={Math.max(...ageData.map((a) => a.value))}
                    color="#3b82f6"
                    height={160}
                  />
                </div>
              </div>

              {/* ROW 2: Kategori + Top Produk */}
              <div
                className="fade-up grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.15s" }}
              >
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Pendapatan berdasarkan Kategori
                  </h3>
                  <VBar
                    data={categoryData}
                    maxVal={maxCat}
                    color="#3b82f6"
                    height={150}
                  />
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    5 Produk dengan Pendapatan Tertinggi
                  </h3>
                  <div className="space-y-3">
                    {topProducts.map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-slate-600 font-medium truncate max-w-[200px]">
                            {p.name}
                          </span>
                          <span className="text-xs font-bold text-blue-600 flex-shrink-0 ml-2">
                            {p.value.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="h-2 bg-blue-50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(p.value / maxProduct) * 100}%`,
                              background:
                                "linear-gradient(90deg, #2563eb, #60a5fa)",
                              animation:
                                "barGrow 1s cubic-bezier(.22,.68,0,1.2) both",
                              animationDelay: `${0.2 + i * 0.08}s`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROW 3: Line Charts */}
              <div
                className="fade-up grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-1">
                    Jumlah Pendapatan per Tahun
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-4">
                    dalam juta Rupiah
                  </p>
                  <LineChart data={yearlyRevenue} w={320} h={120} />
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-1">
                    Total Pesanan dan Pelanggan Aktif
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-4">
                    per tahun 2010–2014
                  </p>
                  <DualLineChart data={orderCustomer} w={320} h={120} />
                </div>
              </div>

              {/* DASHBOARD IMAGE PREVIEW */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                style={{ animationDelay: "0.22s" }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-600">
                        📊 Preview Dashboard Power BI
                      </span>
                      <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                        Tampilan asli hasil visualisasi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      Original
                    </span>
                    <button
                      onClick={() => setImgZoomed(true)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                      Perbesar
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-b from-slate-50 to-white">
                  <img
                    src={powerBI1}
                    alt="Power BI Dashboard — Analitik Pelanggan & Penjualan"
                    className="dashboard-img w-full rounded-xl border border-slate-200 shadow-md"
                    onClick={() => setImgZoomed(true)}
                  />
                </div>
                <div className="px-6 pb-5 flex items-center justify-between">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hasil akhir visualisasi menggunakan{" "}
                    <span className="font-semibold text-slate-600">
                      Microsoft Power BI
                    </span>
                    . Klik gambar untuk melihat tampilan penuh.
                  </p>
                  <button
                    onClick={() => setImgZoomed(true)}
                    className="flex-shrink-0 ml-4 text-[11px] font-semibold text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Lihat lebih besar →
                  </button>
                </div>
              </div>

              {/* INSIGHT CARDS */}
              <div
                className="fade-up rounded-2xl overflow-hidden shadow border border-blue-100"
                style={{ animationDelay: "0.28s" }}
              >
                <div
                  className="px-7 py-4 border-b border-blue-100 flex items-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-base shadow shadow-blue-200">
                    🔎
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-blue-700">
                      Insight Utama
                    </h3>
                    <p className="text-[11px] text-blue-400 font-medium">
                      Temuan berbasis data visualisasi
                    </p>
                  </div>
                </div>
                <div className="bg-white px-7 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "🌏",
                      title: "Dominasi AS",
                      desc: "United States menyumbang hampir 40% dari total pelanggan (7.482), jauh melampaui negara lain.",
                      color: "blue",
                    },
                    {
                      icon: "🚲",
                      title: "Bikes Mendominasi",
                      desc: "Kategori Bikes menghasilkan pendapatan Rp 28,3 Juta — lebih dari 40x lipat kategori Accessories.",
                      color: "indigo",
                    },
                    {
                      icon: "📈",
                      title: "Puncak 2013",
                      desc: "Tahun 2013 mencatat puncak penjualan dengan lonjakan pesanan hingga 27.000+ dan pendapatan tertinggi.",
                      color: "violet",
                    },
                  ].map((k, i) => (
                    <div
                      key={i}
                      className={`bg-${k.color}-50 border border-${k.color}-100 rounded-xl p-4 card-hover`}
                    >
                      <span className="text-2xl">{k.icon}</span>
                      <div
                        className={`text-sm font-bold text-${k.color}-700 mt-2 mb-1`}
                      >
                        {k.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {k.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════ TAB 2: EDA ══════════════ */}
          {activeTab === "eda" && (
            <div className="space-y-6">
              {/* EDA INTRO */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                style={{ animationDelay: "0.05s" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-lg shadow-md shadow-blue-200">
                    📊
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800">
                      Analisis Data Penjualan & Pelanggan
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Exploratory Data Analysis · Power BI · 2010–2014
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Analisis ini dilakukan menggunakan dua file CSV berisi
                  informasi pelanggan dan data penjualan. Berikut merupakan
                  cuplikan data awal yang digunakan dalam proses analisis:
                </p>

                {/* Data raw preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  <img src={data1} alt="Data Negara CSV" className="eda-img" />
                  <img
                    src={data2}
                    alt="Data Pelanggan CSV"
                    className="eda-img"
                  />
                  <img
                    src={dataset}
                    alt="Overview Dataset"
                    className="eda-img"
                  />
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Berikut adalah tampilan utama dashboard Power BI berdasarkan
                  proses <strong>data cleaning</strong>,{" "}
                  <strong>transformasi</strong>, dan{" "}
                  <strong>exploratory data analysis (EDA)</strong> — dirancang
                  untuk memberikan gambaran komprehensif performa penjualan,
                  profil pelanggan, serta dinamika kategori produk.
                </p>

                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-5">
                  <img
                    src={dashboard1}
                    alt="Dashboard Power BI"
                    className="w-full block"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "📌",
                      label: "Ringkasan KPI",
                      desc: "Total penjualan, pelanggan, pesanan, kuantitas, dan average price",
                    },
                    {
                      icon: "🌍",
                      label: "Distribusi Geografis",
                      desc: "Negara dengan kontribusi pelanggan terbesar",
                    },
                    {
                      icon: "👥",
                      label: "Segmentasi Usia",
                      desc: "Persebaran pelanggan berdasarkan kelompok umur",
                    },
                    {
                      icon: "📈",
                      label: "Tren Penjualan",
                      desc: "Perkembangan penjualan dari tahun ke tahun",
                    },
                    {
                      icon: "🏆",
                      label: "Analisis Produk",
                      desc: "Kategori dan produk terbaik berdasarkan total pendapatan",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100"
                    >
                      <span className="text-lg mt-0.5">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-700">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIVIDER */}
              <div
                className="fade-up flex items-center gap-3"
                style={{ animationDelay: "0.08s" }}
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow">
                  🔍 Hasil EDA
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              </div>

              {/* ── INSIGHT 1: GEOGRAFIS ── */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
                style={{ animationDelay: "0.1s" }}
              >
                <SectionHeader
                  number="1"
                  icon="🌏"
                  title="Sebaran Geografis Pelanggan"
                  subtitle="Distribusi berdasarkan negara asal"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <img src={data3} alt="Tabel Negara" className="eda-img" />
                  <img
                    src={visual1}
                    alt="Chart Geografis"
                    className="eda-img"
                  />
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 text-sm text-slate-600 leading-relaxed mb-4">
                  <p>
                    <strong className="text-slate-800">Amerika Serikat</strong>{" "}
                    menjadi pasar terbesar dengan total{" "}
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-lg text-xs">
                      7.482 pelanggan
                    </span>
                    . Di posisi kedua, <strong>Australia</strong> memiliki{" "}
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-lg text-xs">
                      3.591 pelanggan
                    </span>
                    .
                  </p>
                  <p>
                    Tiga negara Eropa membentuk kelompok pasar menengah yang
                    stabil: <strong>Inggris (1.913)</strong>,{" "}
                    <strong>Prancis (1.810)</strong>, dan{" "}
                    <strong>Jerman (1.780)</strong>.
                  </p>
                  <p>
                    <strong>Kanada</strong> berada di posisi keenam dengan{" "}
                    <strong>1.571 pelanggan</strong> — paling rendah di antara
                    keenam negara.
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {countryData.map((c, i) => (
                    <div
                      key={i}
                      className="text-center bg-blue-50 border border-blue-100 rounded-xl p-2"
                    >
                      <div className="text-sm font-extrabold text-blue-700">
                        {(c.value / 1000).toFixed(1)}K
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        {c.name.split(" ").pop()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── INSIGHT 2: USIA ── */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
                style={{ animationDelay: "0.12s" }}
              >
                <SectionHeader
                  number="2"
                  icon="👥"
                  title="Distribusi Pelanggan Berdasarkan Kelompok Usia"
                  subtitle="Segmentasi demografi 4 kelompok umur"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <img src={data4} alt="Tabel Usia" className="eda-img" />
                  <img src={visual2} alt="Chart Usia" className="eda-img" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {ageData.map((a, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: `${a.color}18`,
                        border: `1.5px solid ${a.color}40`,
                      }}
                    >
                      <div
                        className="text-lg font-extrabold"
                        style={{ color: a.color }}
                      >
                        {a.value >= 1000
                          ? `${(a.value / 1000).toFixed(1)}K`
                          : a.value}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-1">
                        {a.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p>
                    Mayoritas pelanggan dari kelompok{" "}
                    <strong>Dewasa Paruh Baya</strong> (&lt;59 tahun) dengan{" "}
                    <span className="font-bold text-blue-700">
                      11.567 pelanggan
                    </span>{" "}
                    — segmen pasar terbesar.
                  </p>
                  <p>
                    <strong>Lansia Awal</strong> (59–70 tahun):{" "}
                    <strong>4.419 pelanggan</strong>.{" "}
                    <strong>Lansia Tua</strong> (71–99 tahun):{" "}
                    <strong>2.462 pelanggan</strong>.
                  </p>
                  <p>
                    Kelompok <strong>Sentenarian</strong> (≥100 tahun) hanya
                    berjumlah <strong>19 pelanggan</strong>, namun menunjukkan
                    pelanggan berusia sangat lanjut yang tetap aktif.
                  </p>
                </div>
              </div>

              {/* ── INSIGHT 3: METRIK BISNIS ── */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
                style={{ animationDelay: "0.14s" }}
              >
                <SectionHeader
                  number="3"
                  icon="📊"
                  title="Analisis Deskriptif Metrik Kinerja Bisnis"
                  subtitle="Ringkasan KPI utama operasional"
                />

                <div className="flex justify-center mb-5">
                  <img
                    src={data5}
                    alt="Tabel KPI"
                    className="eda-img max-w-xs w-full"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {[
                    {
                      icon: "💰",
                      label: "Total Sales",
                      value: "$29.356.250",
                      color: "emerald",
                    },
                    {
                      icon: "👥",
                      label: "Total Customers",
                      value: "18.484",
                      color: "blue",
                    },
                    {
                      icon: "📦",
                      label: "Total Orders",
                      value: "27.659",
                      color: "orange",
                    },
                    {
                      icon: "📦",
                      label: "Total Quantity",
                      value: "60.423 unit",
                      color: "violet",
                    },
                    {
                      icon: "🏷️",
                      label: "Average Price",
                      value: "$486",
                      color: "rose",
                    },
                    {
                      icon: "🗂️",
                      label: "Total Products",
                      value: "295",
                      color: "slate",
                    },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className={`bg-${m.color}-50 border border-${m.color}-100 rounded-xl p-3`}
                    >
                      <div className="text-lg mb-1">{m.icon}</div>
                      <div
                        className={`text-xs font-semibold text-${m.color}-600 mb-0.5`}
                      >
                        {m.label}
                      </div>
                      <div className="text-base font-extrabold text-slate-800">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-slate-600 leading-relaxed">
                  <span className="font-bold text-blue-700">Kesimpulan: </span>
                  Bisnis memiliki performa finansial kuat, basis pelanggan
                  besar, dan rata-rata pesanan per pelanggan ±1.5 — menunjukkan
                  adanya pesanan berulang yang sehat. Dengan 295 variasi produk,
                  bisnis mendukung pasar yang beragam dan berpotensi
                  mempertahankan pertumbuhan.
                </div>
              </div>

              {/* ── INSIGHT 4: MAGNITUDO ── */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
                style={{ animationDelay: "0.16s" }}
              >
                <SectionHeader
                  number="4"
                  icon="🔬"
                  title="Analisis Magnitudo per Kategori"
                  subtitle="Perbandingan volume, revenue, dan harga rata-rata"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                  <img
                    src={data6}
                    alt="Penjualan per Kategori"
                    className="eda-img"
                  />
                  <img
                    src={data7}
                    alt="Avg Price Kategori"
                    className="eda-img"
                  />
                  <img src={visual3} alt="Chart Kategori" className="eda-img" />
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Terdapat perbedaan karakter antara kategori{" "}
                  <strong>Accessories</strong>, <strong>Bikes</strong>,{" "}
                  <strong>Clothing</strong>, dan <strong>Components</strong>.
                  Berikut ringkasan insight dan rekomendasi aksi per kategori:
                </p>

                <div className="space-y-3">
                  {categoryInsights.map((cat, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border bg-${cat.color}-50 border-${cat.color}-100 p-4 card-hover`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-2xl">{cat.icon}</span>
                        <div>
                          <div
                            className={`text-sm font-extrabold text-${cat.color}-700`}
                          >
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex flex-wrap gap-3 mt-0.5">
                            <span>
                              Penjualan:{" "}
                              <strong className="text-slate-600">
                                {cat.sales}
                              </strong>
                            </span>
                            {cat.revenue !== "—" && (
                              <span>
                                Revenue:{" "}
                                <strong className="text-slate-600">
                                  {cat.revenue}
                                </strong>
                              </span>
                            )}
                            <span>
                              Avg Price:{" "}
                              <strong className="text-slate-600">
                                ${cat.avg}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic mb-3">
                        💡 <strong>Insight:</strong> {cat.insight}
                      </p>
                      <div className="space-y-1">
                        {cat.actions.map((a, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2 text-xs text-slate-600"
                          >
                            <span
                              className={`mt-0.5 w-4 h-4 rounded-full bg-${cat.color}-200 text-${cat.color}-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]`}
                            >
                              {j + 1}
                            </span>
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── INSIGHT 5: TOP PRODUK ── */}
              <div
                className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover"
                style={{ animationDelay: "0.18s" }}
              >
                <SectionHeader
                  number="5"
                  icon="🏆"
                  title="Top 5 Produk Berdasarkan Total Pendapatan"
                  subtitle="Rangking produk Mountain-200 series"
                />

                <div className="flex justify-center mb-5">
                  <img
                    src={data8}
                    alt="Tabel Top 5 Produk"
                    className="eda-img max-w-lg w-full"
                  />
                </div>

                <div className="space-y-3 mb-5">
                  {topProducts.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-orange-300 text-orange-800" : "bg-blue-100 text-blue-700"}`}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-bold text-slate-700">
                            {p.name}
                          </span>
                          <span className="text-xs font-extrabold text-blue-600">
                            Rp {p.value.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="h-2 bg-blue-50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(p.value / maxProduct) * 100}%`,
                              background:
                                i === 0
                                  ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                                  : "linear-gradient(90deg, #2563eb, #60a5fa)",
                              animation:
                                "barGrow 1s cubic-bezier(.22,.68,0,1.2) both",
                              animationDelay: `${0.1 + i * 0.08}s`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-600 leading-relaxed space-y-2">
                  <p>
                    Semua produk berasal dari kategori <strong>Bikes</strong>,
                    khususnya varian{" "}
                    <strong className="text-blue-700">Mountain-200</strong> —
                    seri yang mendominasi pendapatan dan volume penjualan.
                  </p>
                  <p>
                    <strong>Mountain-200 Black-46</strong> adalah produk teratas
                    dengan <strong>620 unit</strong> dan pendapatan{" "}
                    <strong>~1.373.454</strong>. Varian <strong>Black</strong>{" "}
                    secara konsisten unggul dibanding <strong>Silver</strong>.
                  </p>
                  <p>
                    Selisih antar produk relatif kecil, menunjukkan distribusi
                    permintaan yang merata di seluruh varian Mountain-200.
                  </p>
                </div>
              </div>

              {/* ── EDA FOOTER ── */}
              <div
                className="fade-up rounded-2xl overflow-hidden border border-blue-100 shadow"
                style={{ animationDelay: "0.2s" }}
              >
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-xl backdrop-blur-sm">
                    ✅
                  </div>
                  <div>
                    <div className="text-white font-extrabold text-sm">
                      Kesimpulan Analisis
                    </div>
                    <div className="text-blue-200 text-xs">
                      Ringkasan temuan dari seluruh EDA
                    </div>
                  </div>
                </div>
                <div className="bg-white px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "💪",
                      label: "Kinerja Kuat",
                      text: "Revenue $29M+ dengan 18K+ pelanggan — skala bisnis yang sehat dan signifikan.",
                    },
                    {
                      icon: "🎯",
                      label: "Fokus Pasar",
                      text: "AS mendominasi 40% pelanggan. Bikes menyumbang 96% revenue. Alokasi sumber daya harus mengikuti ini.",
                    },
                    {
                      icon: "🚀",
                      label: "Peluang Tumbuh",
                      text: "Pasar Eropa stabil namun belum optimal. Clothing & Accessories berpotensi tingkatkan revenue dengan strategi harga yang tepat.",
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 border border-blue-100 rounded-xl p-4"
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div className="text-sm font-bold text-blue-800 mt-2 mb-1">
                        {c.label}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {c.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── BOTTOM NAV ── */}
          <div
            className="fade-up flex items-center justify-between pt-2 pb-10"
            style={{ animationDelay: "0.35s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
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
              Kembali
            </button>
            <a
              href="https://powerbi.microsoft.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
            >
              Buka di Power BI
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerBI1;
