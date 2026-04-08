import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────── DATA ─────────────────────────── */

const kpiSales = [
  {
    label: "Total Sales",
    value: "$733K",
    change: "+20.4%",
    up: true,
    icon: "💰",
    color: "emerald",
    sub: "vs prior year",
  },
  {
    label: "Total Profit",
    value: "$93K",
    change: "+14.2%",
    up: true,
    icon: "📈",
    color: "blue",
    sub: "vs prior year",
  },
  {
    label: "Total Quantity",
    value: "12,476",
    change: "+26.8%",
    up: true,
    icon: "📦",
    color: "violet",
    sub: "units sold",
  },
];

const kpiCustomer = [
  {
    label: "Total Customers",
    value: "693",
    change: "+8.6%",
    up: true,
    icon: "👥",
    color: "sky",
    sub: "vs prior year",
  },
  {
    label: "Sales per Customer",
    value: "$1,058",
    change: "+10.5%",
    up: true,
    icon: "🧑‍💼",
    color: "indigo",
    sub: "avg revenue",
  },
  {
    label: "Orders per Customer",
    value: "3.4",
    change: "-0.2",
    up: false,
    icon: "🛒",
    color: "rose",
    sub: "avg orders",
  },
];

const monthlySales = [
  { month: "Jan", cur: 43, prev: 36 },
  { month: "Feb", cur: 39, prev: 31 },
  { month: "Mar", cur: 58, prev: 47 },
  { month: "Apr", cur: 51, prev: 44 },
  { month: "May", cur: 62, prev: 50 },
  { month: "Jun", cur: 55, prev: 48 },
  { month: "Jul", cur: 60, prev: 52 },
  { month: "Aug", cur: 67, prev: 54 },
  { month: "Sep", cur: 80, prev: 65 },
  { month: "Oct", cur: 74, prev: 60 },
  { month: "Nov", cur: 95, prev: 78 },
  { month: "Dec", cur: 89, prev: 72 },
];

const subcategories = [
  { name: "Phones", sales: 105, profit: 13, pct: 100 },
  { name: "Chairs", sales: 97, profit: 8, pct: 92 },
  { name: "Storage", sales: 78, profit: 7, pct: 74 },
  { name: "Tables", sales: 66, profit: -8, pct: 63 },
  { name: "Binders", sales: 62, profit: 8, pct: 59 },
  { name: "Machines", sales: 58, profit: -3, pct: 55 },
  { name: "Accessories", sales: 54, profit: 16, pct: 51 },
  { name: "Copiers", sales: 50, profit: 25, pct: 48 },
];

const topCustomers = [
  {
    rank: 1,
    name: "Sean Miller",
    sales: 25043,
    orders: 5,
    profit: -1981,
    segment: "Home Office",
  },
  {
    rank: 2,
    name: "Tamara Chand",
    sales: 19052,
    orders: 4,
    profit: 8981,
    segment: "Corporate",
  },
  {
    rank: 3,
    name: "Raymond Buch",
    sales: 15117,
    orders: 3,
    profit: 6976,
    segment: "Consumer",
  },
  {
    rank: 4,
    name: "Tom Ashbrook",
    sales: 14595,
    orders: 5,
    profit: -3749,
    segment: "Corporate",
  },
  {
    rank: 5,
    name: "Hunter Lopez",
    sales: 12873,
    orders: 4,
    profit: 5622,
    segment: "Consumer",
  },
  {
    rank: 6,
    name: "Adrian Barton",
    sales: 11628,
    orders: 4,
    profit: 5447,
    segment: "Consumer",
  },
  {
    rank: 7,
    name: "Ken Lonsdale",
    sales: 11192,
    orders: 6,
    profit: 3148,
    segment: "Corporate",
  },
  {
    rank: 8,
    name: "Sanjit Chand",
    sales: 11180,
    orders: 4,
    profit: 4221,
    segment: "Home Office",
  },
];

const segmentDist = [
  { name: "Consumer", pct: 51, color: "#3b82f6" },
  { name: "Corporate", pct: 30, color: "#8b5cf6" },
  { name: "Home Office", pct: 19, color: "#06b6d4" },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
  },
  sky: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
  },
};

/* ─────────────────────── MINI CHART ─────────────────────── */
const TrendChart = () => {
  const maxVal = Math.max(...monthlySales.map((d) => Math.max(d.cur, d.prev)));
  const W = 560,
    H = 120,
    PAD = 8;

  const points = (key) =>
    monthlySales
      .map((d, i) => {
        const x = PAD + (i / (monthlySales.length - 1)) * (W - PAD * 2);
        const y = H - PAD - (d[key] / maxVal) * (H - PAD * 2);
        return `${x},${y}`;
      })
      .join(" ");

  const area = (key) => {
    const pts = monthlySales.map((d, i) => {
      const x = PAD + (i / (monthlySales.length - 1)) * (W - PAD * 2);
      const y = H - PAD - (d[key] / maxVal) * (H - PAD * 2);
      return [x, y];
    });
    const pathD =
      `M ${pts[0][0]},${H - PAD} ` +
      pts.map(([x, y]) => `L ${x},${y}`).join(" ") +
      ` L ${pts[pts.length - 1][0]},${H - PAD} Z`;
    return pathD;
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ minWidth: 320 }}
      >
        <defs>
          <linearGradient id="curGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fills */}
        <path d={area("prev")} fill="url(#prevGrad)" />
        <path d={area("cur")} fill="url(#curGrad)" />
        {/* Lines */}
        <polyline
          points={points("prev")}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <polyline
          points={points("cur")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Month labels */}
        {monthlySales.map((d, i) => {
          const x = PAD + (i / (monthlySales.length - 1)) * (W - PAD * 2);
          return (
            <text
              key={i}
              x={x}
              y={H - 1}
              textAnchor="middle"
              fontSize="8"
              fill="#94a3b8"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              {d.month}
            </text>
          );
        })}
      </svg>
      <div className="flex items-center gap-5 mt-2 px-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 bg-blue-500 rounded" />
          <span className="text-xs text-slate-500 font-medium">
            Current Year
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5 border-t-2 border-dashed border-slate-300" />
          <span className="text-xs text-slate-500 font-medium">Prior Year</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────── DONUT ─────────────────────── */
const DonutChart = () => {
  const r = 42,
    cx = 60,
    cy = 60;
  let cumPct = 0;
  const slices = segmentDist.map((s) => {
    const startAngle = (cumPct / 100) * 2 * Math.PI - Math.PI / 2;
    cumPct += s.pct;
    const endAngle = (cumPct / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = s.pct > 50 ? 1 : 0;
    return {
      ...s,
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
    };
  });

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 120 120" width="120" height="120">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
        />
        {slices.map((s, i) => (
          <path key={i} d={s.d} fill={s.color} opacity="0.9" />
        ))}
        <circle cx={cx} cy={cy} r={r - 13} fill="white" />
        <text
          x={cx}
          y={cy - 5}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#1e293b"
          fontFamily="Plus Jakarta Sans"
        >
          693
        </text>
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fontSize="7"
          fill="#94a3b8"
          fontFamily="Plus Jakarta Sans"
        >
          customers
        </text>
      </svg>
      <div className="space-y-2">
        {segmentDist.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-xs font-semibold text-slate-600">
              {s.name}
            </span>
            <span className="text-xs font-bold text-slate-800 ml-auto">
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────── MAIN COMPONENT ─────────────────────── */
const Sales_dashboard1 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--w); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .bar-fill { animation: barGrow 1s cubic-bezier(.22,.68,0,1.2) 0.3s both; }
        .kpi-count { animation: countUp 0.5s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Dot-grid BG */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
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

          {/* ── HERO CARD ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            style={{ animationDelay: "0.05s" }}
          >
            {/* Header gradient */}
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #312e81 0%, #4f46e5 55%, #6366f1 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #fff, transparent)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-52 h-52 rounded-full opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #a5b4fc, transparent)",
                  transform: "translate(-20%, 30%)",
                }}
              />

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  📊 Tableau · Sales Analytics
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/70 text-xs font-medium">
                  Business Intelligence
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "Instrument Serif, Georgia, serif" }}
              >
                Sales & Customer
                <br />
                <span className="text-indigo-200 italic">
                  Performance Dashboard
                </span>
              </h1>
              <p className="text-indigo-100 text-sm leading-relaxed max-w-xl">
                Analisis performa penjualan dan perilaku pelanggan menggunakan
                dataset Superstore. Dashboard interaktif ini menampilkan tren
                YoY, distribusi subkategori, dan profil pelanggan top.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 2021–2024",
                  "🛍️ Superstore Dataset",
                  "🔬 Tableau Public",
                  "👥 Dua Perspektif",
                ].map((m) => (
                  <span
                    key={m}
                    className="bg-white/10 border border-white/20 text-white/85 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Overlap KPI row — ganti berdasarkan tab */}
            <div className="bg-white px-6 pb-6 -mt-6 relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 -translate-y-6">
                {(activeTab === "sales" ? kpiSales : kpiCustomer).map(
                  (k, i) => {
                    const c = colorMap[k.color];
                    return (
                      <div
                        key={i}
                        className={`${c.bg} ${c.border} border-2 rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xl">{k.icon}</span>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${k.up ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                          >
                            {k.up ? "▲" : "▼"} {k.change}
                          </span>
                        </div>
                        <div
                          className={`text-2xl font-extrabold ${c.text} kpi-count`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {k.value}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">
                          {k.label}
                        </div>
                        <div className="text-xs text-slate-400">{k.sub}</div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* ── TAB SWITCH ── */}
          <div
            className="fade-up flex gap-2 bg-white border border-slate-200 rounded-2xl p-1.5 w-fit shadow-sm"
            style={{ animationDelay: "0.08s" }}
          >
            {[
              { id: "sales", label: "Sales Dashboard", icon: "💹" },
              { id: "customer", label: "Customer Dashboard", icon: "👥" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200
                  ${
                    activeTab === t.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ── TABLEAU EMBED ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-semibold text-slate-400 tracking-wide">
                Tableau Public ·{" "}
                {activeTab === "sales"
                  ? "Sales Dashboard"
                  : "Customer Dashboard"}
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="w-full" style={{ height: 800 }}>
              <iframe
                key={activeTab}
                title={
                  activeTab === "sales"
                    ? "Sales Dashboard"
                    : "Customer Dashboard"
                }
                src={
                  activeTab === "sales"
                    ? "https://public.tableau.com/views/SalesCustomerDashboards_17695675734960/SalesDashboard?:embed=y&:display_count=yes&:showVizHome=no"
                    : "https://public.tableau.com/views/SalesCustomerDashboards_17695675734960/CustomerDashboard?:embed=y&:display_count=yes&:showVizHome=no"
                }
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* ── OVERVIEW TEXT ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 px-8 py-7"
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-slate-600 leading-relaxed text-base">
              Dashboard ini dirancang untuk memberikan{" "}
              <strong className="text-slate-800">visibilitas menyeluruh</strong>{" "}
              atas performa bisnis dari dua perspektif utama: penjualan dan
              pelanggan. Setiap metrik ditampilkan dengan perbandingan{" "}
              <strong className="text-indigo-600">year-over-year (YoY)</strong>{" "}
              sehingga tren pertumbuhan atau penurunan dapat langsung
              teridentifikasi.
            </p>
          </div>

          {/* ── CONDITIONAL CONTENT ── */}
          {activeTab === "sales" ? (
            <>
              {/* Trend Chart Section */}
              <div
                className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3 px-7 py-5 bg-indigo-50 border-b border-indigo-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                    📉
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-indigo-700">
                      Tren Penjualan Bulanan 2023
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium">
                      Current Year vs Prior Year
                    </p>
                  </div>
                </div>
                <div className="px-7 py-6">
                  <TrendChart />
                  <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                    Grafik di atas merepresentasikan pola penjualan sepanjang
                    tahun. Terlihat adanya{" "}
                    <strong className="text-slate-700">
                      lonjakan signifikan di Q4
                    </strong>{" "}
                    (Sep–Nov), yang berkorelasi dengan musim belanja akhir
                    tahun. Seluruh bulan mencatat pertumbuhan dibandingkan tahun
                    sebelumnya.
                  </p>
                </div>
              </div>

              {/* Subcategory Breakdown */}
              <div
                className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                style={{ animationDelay: "0.25s" }}
              >
                <div className="flex items-center gap-3 px-7 py-5 bg-slate-50 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-lg">
                    📊
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-700">
                      Sales by Subcategory 2023
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Current vs Prior Year · bar positif/negatif profit
                    </p>
                  </div>
                </div>
                <div className="px-7 py-6 space-y-4">
                  {subcategories.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-slate-700">
                          {s.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.profit >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                          >
                            {s.profit >= 0 ? "+" : ""}${s.profit}K profit
                          </span>
                          <span className="text-sm font-extrabold text-indigo-600">
                            ${s.sales}K
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bar-fill"
                          style={{
                            "--w": `${s.pct}%`,
                            background:
                              s.profit >= 0
                                ? "linear-gradient(90deg, #6366f1, #818cf8)"
                                : "linear-gradient(90deg, #f43f5e, #fb7185)",
                            animationDelay: `${0.3 + i * 0.07}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-400 pt-2 leading-relaxed">
                    ⚠️ <strong className="text-slate-500">Tables</strong>{" "}
                    mencatat profit negatif meski volume penjualannya cukup
                    besar — indikasi margin yang tergerus oleh diskon atau biaya
                    pengiriman tinggi.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Customer Segment Distribution */}
              <div
                className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3 px-7 py-5 bg-sky-50 border-b border-sky-100">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-lg shadow-sm shadow-sky-200">
                    🥧
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-sky-700">
                      Distribusi Segmen Pelanggan
                    </h3>
                    <p className="text-xs text-sky-400 font-medium">
                      Consumer · Corporate · Home Office
                    </p>
                  </div>
                </div>
                <div className="px-7 py-6">
                  <DonutChart />
                  <p className="text-sm text-slate-500 mt-5 leading-relaxed">
                    Segmen <strong className="text-blue-600">Consumer</strong>{" "}
                    mendominasi basis pelanggan dengan porsi lebih dari separuh
                    total. Segmen{" "}
                    <strong className="text-violet-600">Corporate</strong> walau
                    lebih kecil, umumnya memberikan order value yang lebih besar
                    per transaksi.
                  </p>
                </div>
              </div>

              {/* Top Customers Table */}
              <div
                className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                style={{ animationDelay: "0.25s" }}
              >
                <div className="flex items-center gap-3 px-7 py-5 bg-indigo-50 border-b border-indigo-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-indigo-700">
                      Top 8 Pelanggan berdasarkan Sales
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium">
                      Profitability per pelanggan ditampilkan
                    </p>
                  </div>
                </div>
                <div className="px-7 py-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {[
                          "#",
                          "Nama",
                          "Total Sales",
                          "Orders",
                          "Profit",
                          "Segment",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left pb-3 pr-4 text-xs font-bold text-slate-400 uppercase tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {topCustomers.map((c, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-3 pr-4">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold
                              ${i < 3 ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}
                            >
                              {c.rank}
                            </span>
                          </td>
                          <td className="py-3 pr-4 font-bold text-slate-700">
                            {c.name}
                          </td>
                          <td className="py-3 pr-4 font-extrabold text-indigo-600">
                            ${c.sales.toLocaleString()}
                          </td>
                          <td className="py-3 pr-4 text-slate-500 font-semibold">
                            {c.orders}
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.profit >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                            >
                              {c.profit >= 0 ? "+" : ""}$
                              {c.profit.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full
                              ${
                                c.segment === "Consumer"
                                  ? "bg-blue-100 text-blue-700"
                                  : c.segment === "Corporate"
                                    ? "bg-violet-100 text-violet-700"
                                    : "bg-cyan-100 text-cyan-700"
                              }`}
                            >
                              {c.segment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                    ⚠️ Pelanggan dengan sales tertinggi belum tentu paling
                    menguntungkan —{" "}
                    <strong className="text-slate-500">Sean Miller</strong> dan{" "}
                    <strong className="text-slate-500">Tom Ashbrook</strong>{" "}
                    tercatat merugi meskipun revenue-nya besar, kemungkinan
                    karena diskon besar atau return order.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ── FITUR DASHBOARD ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-indigo-100"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="px-7 py-5 border-b border-indigo-100"
              style={{
                background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                  ⚙️
                </div>
                <div>
                  <h3 className="text-base font-bold text-indigo-700">
                    Fitur Utama Dashboard
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">
                    Interaktivitas & komponen visualisasi
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "🔄",
                    title: "Year-over-Year Comparison",
                    desc: "Setiap KPI dibandingkan langsung dengan tahun sebelumnya, lengkap dengan indikator naik/turun dan delta persentase.",
                  },
                  {
                    icon: "🗓️",
                    title: "Filter Dinamis per Tahun",
                    desc: "Pengguna dapat memilih tahun tertentu dan dashboard secara otomatis memperbarui semua visualisasi yang terhubung.",
                  },
                  {
                    icon: "📊",
                    title: "Dual Dashboard View",
                    desc: "Dua perspektif terpisah: Sales Dashboard untuk metrik penjualan, dan Customer Dashboard untuk analisis perilaku pelanggan.",
                  },
                  {
                    icon: "📍",
                    title: "Subcategory Drill-down",
                    desc: "Bar chart per subkategori produk memungkinkan identifikasi produk paling menguntungkan vs. yang merugi secara visual.",
                  },
                  {
                    icon: "🏆",
                    title: "Top Customer Ranking",
                    desc: "Tabel ranking pelanggan terbaik berdasarkan total sales, disertai data profit, jumlah order, dan segmen pelanggan.",
                  },
                  {
                    icon: "🎨",
                    title: "Color-coded Profit/Loss",
                    desc: "Warna biru untuk profit positif dan oranye untuk negatif — konsisten di seluruh dashboard untuk memudahkan pembacaan cepat.",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="text-2xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-slate-700 mb-1">
                        {f.title}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── KESIMPULAN ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-indigo-100"
            style={{ animationDelay: "0.35s" }}
          >
            <div
              className="px-7 py-5 border-b border-indigo-100"
              style={{
                background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                  🔎
                </div>
                <div>
                  <h3 className="text-base font-bold text-indigo-700">
                    Kesimpulan & Insight
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">
                    Key takeaways dari analisis
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                Secara keseluruhan, performa bisnis menunjukkan pertumbuhan
                positif dengan kenaikan sales +20.4% YoY. Namun analisis lebih
                mendalam mengungkap adanya ketidakseimbangan profitabilitas di
                level subkategori dan pelanggan tertentu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  {
                    icon: "📦",
                    label: "Fokus Produk",
                    desc: "Phones & Chairs adalah subkategori terkuat — jadikan prioritas stok dan promosi",
                    color: "blue",
                  },
                  {
                    icon: "💸",
                    label: "Diskon Strategis",
                    desc: "Tinjau ulang kebijakan diskon di Tables yang menyebabkan kerugian konsisten",
                    color: "rose",
                  },
                  {
                    icon: "👤",
                    label: "Customer Retention",
                    desc: "Top customers bernilai tinggi perlu program loyalitas untuk mempertahankan revenue",
                    color: "indigo",
                  },
                ].map((k, i) => (
                  <div
                    key={i}
                    className={`bg-${k.color}-50 border border-${k.color}-100 rounded-2xl p-4 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <span className="text-2xl">{k.icon}</span>
                    <div
                      className={`text-sm font-bold text-${k.color}-700 mt-2 mb-1`}
                    >
                      {k.label}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {k.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM NAV ── */}
          <div
            className="fade-up flex items-center justify-between pt-2 pb-8"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
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
              href="https://public.tableau.com/app/profile/sidqi.amanullah/viz/SalesCustomerDashboards_17695675734960/SalesDashboard"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
            >
              Buka di Tableau Public
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

export default Sales_dashboard1;
