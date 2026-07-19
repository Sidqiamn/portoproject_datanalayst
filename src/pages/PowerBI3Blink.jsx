import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  MapPin,
  Boxes,
  Star,
  Wallet,
  ShoppingCart,
  Percent,
  Sparkles,
  Database,
  Wand2,
  Layers,
  SearchCheck,
  LayoutDashboard,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  ZoomIn,
  X,
  AlertTriangle,
} from "lucide-react";

// Ganti path ini dengan screenshot dashboard Power BI asli Anda
// (letakkan file di src/assets/, misalnya hasil export dari try_project2.pbix)
import powerbidashboard3blink from "../../src/assets/powerbidashboard3blink.png";

/* ─────────────────────────────────────────────────────────────
   DATA — diambil & dibaca ulang langsung dari screenshot dashboard
   "BLINKIT Indo Sales Oldest" (try_project2.pbix), dicocokkan dengan
   nama tabel & kolom asli pada model data: BlinkIT_Grocery_Data
   (Item Fat Content, Outlet Location Type, Outlet Type, Item Type,
   Outlet Size, Outlet Establishment Year, Sales, Item Visibility).
   Nilai numerik = pembacaan langsung dari kartu/chart pada screenshot;
   titik-titik line chart per tahun adalah rekonstruksi visual karena
   label tidak menampilkan semua titik — sesuaikan dengan data mentah
   bila ingin presisi penuh.
───────────────────────────────────────────────────────────── */

const filters = {
  outletLocation: "All (Tier 1 / Tier 2 / Tier 3)",
  outletType: "All (Grocery Store & Supermarket Type 1–3)",
  itemType: "All (16 kategori produk)",
};

const kpiCards = [
  { label: "Total Revenue", display: "$1.20M", icon: Wallet },
  { label: "AVG Sales / Outlet", display: "$141", icon: ShoppingCart },
  { label: "No. Item", display: "8,523", icon: Boxes },
  { label: "AVG Rating", display: "3.9", icon: Star },
];

// Donut: kontribusi revenue berdasarkan Item Fat Content
const fatContentRevenue = [
  { label: "Regular", value: 776.32, color: "#8A8F80" },
  { label: "Low Fat", value: 425.36, color: "#3C8B3F" },
];

// Clustered bar: revenue per Outlet Location Type, dipecah per Fat Content
const fatByOutlet = [
  { tier: "Tier 3", regular: 0.31, lowFat: 0.17 },
  { tier: "Tier 2", regular: 0.25, lowFat: 0.14 },
  { tier: "Tier 1", regular: 0.22, lowFat: 0.12 },
];

// Total revenue per Item Type (Jt USD), diurut dari tertinggi
const itemTypeRevenue = [
  { name: "Fruits & Vegetables", value: 0.18 },
  { name: "Snack Foods", value: 0.18 },
  { name: "Household", value: 0.14 },
  { name: "Frozen Foods", value: 0.12 },
  { name: "Dairy", value: 0.1 },
  { name: "Canned", value: 0.09 },
  { name: "Baking Goods", value: 0.08 },
  { name: "Health & Hygiene", value: 0.07 },
  { name: "Meat", value: 0.06 },
  { name: "Soft Drinks", value: 0.06 },
  { name: "Breads", value: 0.04 },
  { name: "Hard Drinks", value: 0.03 },
  { name: "Others", value: 0.02 },
  { name: "Starchy Foods", value: 0.02 },
  { name: "Breakfast", value: 0.02 },
  { name: "Seafood", value: 0.01 },
];

// Line chart: sales berdasarkan Outlet Establishment Year (rekonstruksi visual)
const establishmentYearSales = [
  { year: 2012, value: 130 },
  { year: 2013, value: 78 },
  { year: 2014, value: 131 },
  { year: 2016, value: 132 },
  { year: 2017, value: 132 },
  { year: 2018, value: 205 },
  { year: 2020, value: 129 },
  { year: 2022, value: 131 },
];

// Donut: sum of sales by Outlet Size
const salesByOutletSize = [
  { label: "High", value: 508, color: "#E2725B" },
  { label: "Small", value: 445, color: "#1F2A22" },
  { label: "Medium", value: 249, color: "#F6C445" },
];

// Funnel: sales by Outlet Location Type
const outletLocationSales = [
  { label: "Tier 3", value: 472, color: "#F6C445", pct: 100 },
  { label: "Tier 2", value: 393, color: "#E2725B", pct: 83.3 },
  { label: "Tier 1", value: 336, color: "#8A8F80", pct: 71.3 },
];

// Pivot table: performa per Outlet Type
const outletPivot = [
  {
    type: "Grocery Store",
    rating: 3.9,
    avgSales: 140,
    revenue: 151939.15,
    noItem: 1083,
    visibility: 113.57,
  },
  {
    type: "Supermarket Type1",
    rating: 3.9,
    avgSales: 141,
    revenue: 787549.89,
    noItem: 5577,
    visibility: 338.65,
  },
  {
    type: "Supermarket Type2",
    rating: 3.9,
    avgSales: 142,
    revenue: 131477.78,
    noItem: 928,
    visibility: 56.62,
  },
  {
    type: "Supermarket Type3",
    rating: 3.9,
    avgSales: 140,
    revenue: 130714.67,
    noItem: 935,
    visibility: 54.8,
  },
];

const pipeline = [
  {
    icon: Database,
    title: "Pengumpulan Data",
    desc: "Mengimpor dataset BlinkIT_Grocery_Data (transaksi penjualan ritel grocery lintas outlet) ke Power BI melalui Power Query, mencakup atribut item (fat content, tipe, visibility) dan atribut outlet (lokasi, tipe, ukuran, tahun berdiri).",
  },
  {
    icon: Wand2,
    title: "Data Cleaning",
    desc: "Menstandarkan label Item Fat Content yang tidak konsisten ('LF', 'low fat', 'Low Fat' → Low Fat; 'reg', 'Regular' → Regular), menangani missing value pada Outlet Size & Item Weight, serta memeriksa nilai Item Visibility yang bernilai 0 (anomali) agar tidak mendistorsi rata-rata.",
  },
  {
    icon: Layers,
    title: "Transformasi Data",
    desc: "Membuat measure DAX (Total Revenue, AVG Sales, AVG Rating, No Item) dan kolom turunan seperti Outlet Age dari Outlet Establishment Year, agar bisa dianalisis tren penjualan berdasarkan usia outlet.",
  },
  {
    icon: SearchCheck,
    title: "Exploratory Data Analysis",
    desc: "Menelusuri distribusi revenue per Item Type, Fat Content, Outlet Size, dan Outlet Location Type; membandingkan performa antar Outlet Type untuk melihat outlet mana yang paling produktif per item.",
  },
  {
    icon: LayoutDashboard,
    title: "Pembangunan Dashboard",
    desc: "Menyusun kartu KPI, donut chart (Fat Content & Outlet Size), clustered bar (Fat by Outlet), line chart (Establishment Year Sales), funnel (Outlet Location Sales), dan pivot table performa Outlet Type — dilengkapi slicer Outlet Location Type, Outlet Type, dan Item Type.",
  },
  {
    icon: CheckCircle2,
    title: "Validasi & Insight",
    desc: "Memastikan ketiga slicer saling memperbarui seluruh visual secara konsisten (cross-filtering), memverifikasi total antar visual saling cocok (mis. total pivot table = KPI Total Revenue), lalu merumuskan insight & rekomendasi bisnis.",
  },
];

const insights = [
  {
    icon: Sparkles,
    title: "Supermarket Type1 = Mesin Pertumbuhan Utama",
    desc: "Dari total revenue $1,20 Jt, Supermarket Type1 menyumbang $787,5 rb (±65,5%) dengan 5.577 item — jauh di atas 3 tipe outlet lain digabung. Ekspansi format ini kemungkinan besar memberi ROI tercepat.",
  },
  {
    icon: Sparkles,
    title: "Outlet 'Small' Justru Ungguli 'Medium'",
    desc: "Outlet berukuran Small mencatat sales $445 rb, hampir menyamai outlet High ($508 rb) dan jauh melampaui Medium ($249 rb). Ini sinyal efisiensi ruang: outlet kecil bisa sangat produktif bila lokasi & tata letak tepat.",
  },
  {
    icon: Sparkles,
    title: "Preferensi Konsumen ke Produk 'Regular'",
    desc: "Item Regular menyumbang $776,3 rb (64,6%) revenue vs Low Fat $425,4 rb — pola ini konsisten di ketiga tier lokasi, jadi bukan bias satu wilayah saja.",
  },
  {
    icon: Sparkles,
    title: "Tier 3 Memimpin Revenue Lokasi",
    desc: "Meski biasanya identik dengan kota kecil, Outlet Location Tier 3 justru memimpin dengan $472 rb (39% dari total tiga tier), mengindikasikan permintaan yang belum sepenuhnya tergarap di luar kota besar.",
  },
  {
    icon: Sparkles,
    title: "Lonjakan Outlet yang Berdiri Tahun 2018",
    desc: "Sales pada kelompok outlet yang berdiri tahun 2018 mencapai $205 rb, jauh di atas tahun-tahun lain yang stabil di kisaran $129–132 rb — layak ditelusuri faktor apa (lokasi, promo pembukaan, mix produk) yang membuat kohort ini unggul.",
  },
  {
    icon: AlertTriangle,
    title: "Catatan Kualitas Data: AVG Rating Datar di 3.9",
    desc: "AVG Rating bernilai 3.9 identik di keempat Outlet Type — pola yang tidak realistis untuk data rating asli. Sebaiknya dikonfirmasi ke sumber data, karena bila rating ini kurang variatif maka nilainya tidak terlalu berguna untuk pengambilan keputusan.",
  },
];

/* ─────────────────────────────────────────────────────────────
   CHART PRIMITIVES
───────────────────────────────────────────────────────────── */

const Donut = ({
  segments,
  size = 148,
  thickness = 20,
  centerLabel,
  centerValue,
}) => {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#EFEAD9"
        strokeWidth={thickness}
      />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ;
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        );
        offset += dash;
        return el;
      })}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="10"
        fill="#7A8074"
        fontFamily="'Manrope', sans-serif"
        fontWeight="600"
      >
        {centerLabel}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="15"
        fill="#14251C"
        fontFamily="'Fraunces', serif"
        fontWeight="700"
      >
        {centerValue}
      </text>
    </svg>
  );
};

const HList = ({
  data,
  max,
  unit,
  colorFrom = "#14251C",
  colorTo = "#3C8B3F",
  format,
}) => (
  <div className="space-y-3">
    {data.map((d, i) => (
      <div key={i}>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[12px] font-medium text-[#5A5F52] truncate pr-2">
            {d.name}
          </span>
          <span className="text-[12px] font-bold text-[#14251C] font-mono whitespace-nowrap">
            {format ? format(d.value) : d.value}
            {unit}
          </span>
        </div>
        <div className="h-[7px] rounded-full bg-[#EFEAD9] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(d.value / max) * 100}%`,
              background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
              animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
              animationDelay: `${i * 0.05}s`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const ClusteredBars = ({ data }) => {
  const max = Math.max(...data.map((d) => Math.max(d.regular, d.lowFat)));
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={i}>
          <div className="text-[12px] font-bold text-[#14251C] mb-1.5">
            {d.tier}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-14 text-[10px] text-[#7A8074] font-semibold">
                Regular
              </span>
              <div className="flex-1 h-[10px] rounded-full bg-[#EFEAD9] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(d.regular / max) * 100}%`,
                    background: "linear-gradient(90deg,#8A8F80,#5A5F52)",
                    animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
              <span className="w-12 text-right text-[10px] font-mono font-bold text-[#14251C]">
                ${d.regular.toFixed(2)}M
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-14 text-[10px] text-[#7A8074] font-semibold">
                Low Fat
              </span>
              <div className="flex-1 h-[10px] rounded-full bg-[#EFEAD9] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(d.lowFat / max) * 100}%`,
                    background: "linear-gradient(90deg,#3C8B3F,#8FC93A)",
                    animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
                    animationDelay: `${i * 0.08 + 0.04}s`,
                  }}
                />
              </div>
              <span className="w-12 text-right text-[10px] font-mono font-bold text-[#14251C]">
                ${d.lowFat.toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const LineTrend = ({ data, width = 460, height = 160 }) => {
  const pad = 28;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((d.value - min) / range) * (height - pad * 2);
    return { x, y, ...d };
  });
  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${height - pad} L${pts[0].x},${height - pad} Z`;
  const peak = pts.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height }}>
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6C445" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F6C445" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineFill)" />
      <path
        d={linePath}
        fill="none"
        stroke="#14251C"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={p.value === peak.value ? 4.5 : 3}
            fill={p.value === peak.value ? "#E2725B" : "#14251C"}
          />
          <text
            x={p.x}
            y={p.y - 10}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#14251C"
            fontFamily="'IBM Plex Mono', monospace"
          >
            ${p.value}K
          </text>
          <text
            x={p.x}
            y={height - 8}
            textAnchor="middle"
            fontSize="9"
            fill="#8A8F80"
            fontFamily="'IBM Plex Mono', monospace"
          >
            {p.year}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Funnel = ({ data }) => (
  <div className="space-y-2.5">
    {data.map((d, i) => (
      <div key={i} className="flex items-center gap-3">
        <div
          className="h-9 rounded-lg flex items-center justify-center text-[12px] font-bold text-[#14251C] shadow-sm"
          style={{
            width: `${d.pct}%`,
            minWidth: "40%",
            background: d.color,
            animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
            animationDelay: `${i * 0.08}s`,
          }}
        >
          {d.label} · ${d.value}K
        </div>
        <span className="text-[10px] text-[#8A8F80] font-mono">{d.pct}%</span>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   TAG-STYLE KPI CARD
───────────────────────────────────────────────────────────── */

const TagKPI = ({ card }) => {
  const Icon = card.icon;
  return (
    <div className="relative bg-white rounded-2xl border border-[#E7E1CC] shadow-[0_6px_20px_-8px_rgba(20,37,28,0.15)] pt-6 pb-4 px-4 card-hover">
      <span className="absolute -top-2.5 left-5 w-4 h-4 rounded-full bg-[#FAF9F4] border border-[#E7E1CC]" />
      <svg
        className="absolute -top-[18px] left-[26px]"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          d="M2 18 C 2 4, 18 4, 18 18"
          fill="none"
          stroke="#F6C445"
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      </svg>
      <div className="flex items-center justify-between mb-3">
        <span className="w-8 h-8 rounded-full bg-[#EAF4E5] flex items-center justify-center text-[#3C8B3F]">
          <Icon size={15} strokeWidth={2.2} />
        </span>
      </div>
      <div className="text-[11px] font-semibold text-[#8A8F80] mb-1 tracking-wide uppercase">
        {card.label}
      </div>
      <div
        className="text-[26px] font-bold text-[#14251C]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {card.display}
      </div>
    </div>
  );
};

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-5">
    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#3C8B3F]">
      {eyebrow}
    </span>
    <h3
      className="text-lg font-bold text-[#14251C] mt-1"
      style={{ fontFamily: "'Fraunces', serif" }}
    >
      {title}
    </h3>
    {subtitle && (
      <p className="text-[12px] text-[#8A8F80] mt-0.5">{subtitle}</p>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

const PowerBI3Blink = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [zoomed, setZoomed] = useState(false);

  const maxItemType = Math.max(...itemTypeRevenue.map((d) => d.value));
  const totalRevenueAllOutlets = outletPivot.reduce((s, d) => s + d.revenue, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');

        @keyframes riseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes growBar { from { width: 0%; } }
        @keyframes zoomPop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }

        .rise { animation: riseIn 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-3px); }
        .stitch { border-top: 2px dashed #D8CFA8; }
        .grain-bg {
          background-image: radial-gradient(circle at 1px 1px, rgba(20,37,28,0.05) 1px, transparent 0);
          background-size: 22px 22px;
        }
        .tab-on { background: #14251C; color: #F6C445; box-shadow: 0 6px 16px -4px rgba(20,37,28,0.35); }
        .tab-off { background: white; color: #8A8F80; border: 1px solid #E7E1CC; }
        .tab-off:hover { border-color: #3C8B3F; color: #3C8B3F; }
        .filter-pill { background: white; border: 1px solid #E7E1CC; }
      `}</style>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C1510]/85 backdrop-blur-sm p-4"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-w-6xl w-full"
            style={{
              animation: "zoomPop 0.25s cubic-bezier(.22,.68,0,1.2) both",
            }}
          >
            <img
              src={powerbidashboard3blink}
              alt="Dashboard BlinkIt Indo Sales — tampilan penuh"
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
            >
              <X size={16} className="text-[#14251C]" />
            </button>
          </div>
        </div>
      )}

      <div
        className="min-h-screen grain-bg"
        style={{ background: "#FAF9F4", fontFamily: "'Manrope', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="rise inline-flex items-center gap-2 text-sm font-semibold text-[#8A8F80] hover:text-[#3C8B3F] transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-[#E7E1CC] shadow-sm flex items-center justify-center group-hover:border-[#3C8B3F] transition-all">
              <ArrowLeft size={15} />
            </span>
            Kembali ke Portfolio
          </button>

          {/* HERO */}
          <div
            className="rise rounded-3xl overflow-hidden shadow-lg border border-[#E7E1CC]"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0C1510 0%, #14251C 55%, #3C8B3F 130%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 78% 25%, #F6C445 0%, transparent 55%)",
                }}
              />
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  🛒 Power BI · Retail Sales Dashboard
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  BlinkIT Grocery Data
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                BlinkIt Indo Sales
                <br />
                <span className="text-[#F6C445]">
                  Oldest Outlet Performance Dashboard
                </span>
              </h1>
              <p className="text-white/75 text-sm max-w-xl leading-relaxed">
                Dashboard untuk memantau revenue, sales, dan performa produk
                grocery lintas ribuan outlet — dengan tampilan yang bisa
                difilter per lokasi outlet, tipe outlet, dan tipe item.
              </p>

              {/* FILTER EXPLAINER */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="filter-pill rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <MapPin size={15} className="text-[#3C8B3F]" />
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A8F80]">
                      Outlet Location Type
                    </div>
                    <div className="text-[12px] font-bold text-[#14251C] flex items-center gap-1">
                      {filters.outletLocation}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
                <div className="filter-pill rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <Store size={15} className="text-[#3C8B3F]" />
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A8F80]">
                      Outlet Type
                    </div>
                    <div className="text-[12px] font-bold text-[#14251C] flex items-center gap-1">
                      {filters.outletType}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
                <div className="filter-pill rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <Percent size={15} className="text-[#3C8B3F]" />
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A8F80]">
                      Item Type
                    </div>
                    <div className="text-[12px] font-bold text-[#14251C] flex items-center gap-1">
                      {filters.itemType}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-[11px] mt-3 max-w-xl leading-relaxed">
                Ketiga slicer ini saling terhubung dan menggerakkan seluruh
                kartu & chart di halaman ini secara bersamaan (cross-filtering)
                — pilih satu tier lokasi, satu tipe outlet, dan/atau satu
                kategori item untuk langsung melihat performanya, atau biarkan
                "All" aktif untuk melihat gambaran gabungan seluruh outlet.
              </p>
            </div>
          </div>

          {/* TABS */}
          <div
            className="rise flex gap-2 bg-[#F1EAD3] p-1.5 rounded-2xl w-fit"
            style={{ animationDelay: "0.08s" }}
          >
            <button
              onClick={() => setTab("dashboard")}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${tab === "dashboard" ? "tab-on" : "tab-off"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setTab("proses")}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${tab === "proses" ? "tab-on" : "tab-off"}`}
            >
              Proses & Insight
            </button>
          </div>

          {/* ══════════ TAB: DASHBOARD ══════════ */}
          {tab === "dashboard" && (
            <div className="space-y-5">
              {/* KPI */}
              <div
                className="rise grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2"
                style={{ animationDelay: "0.1s" }}
              >
                {kpiCards.map((c, i) => (
                  <TagKPI key={i} card={c} />
                ))}
              </div>

              {/* FAT CONTENT DONUT + FAT BY OUTLET */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.14s" }}
              >
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Fat Content"
                    title="Revenue by Item Fat Content"
                  />
                  <div className="flex items-center gap-5">
                    <Donut
                      segments={fatContentRevenue}
                      centerLabel="Total"
                      centerValue="$1.20M"
                    />
                    <div className="space-y-2.5">
                      {fatContentRevenue.map((v, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: v.color }}
                          />
                          <div>
                            <div className="text-[12px] font-bold text-[#14251C]">
                              {v.label}
                            </div>
                            <div className="text-[10px] text-[#8A8F80] font-mono">
                              ${v.value.toFixed(2)}K
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Fat Content"
                    title="Fat by Outlet Location"
                    subtitle="dalam juta USD, per tier lokasi"
                  />
                  <ClusteredBars data={fatByOutlet} />
                </div>
              </div>

              {/* ITEM TYPE + ESTABLISHMENT YEAR */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.18s" }}
              >
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Item Type"
                    title="Total Revenue by Item Type"
                    subtitle="dalam juta USD"
                  />
                  <HList
                    data={itemTypeRevenue}
                    max={maxItemType}
                    unit="M"
                    format={(v) => `$${v.toFixed(2)}`}
                  />
                </div>
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Tren"
                    title="Establishment Year Sales"
                    subtitle="sales per kelompok tahun outlet berdiri"
                  />
                  <LineTrend data={establishmentYearSales} />
                </div>
              </div>

              {/* OUTLET SIZE DONUT + LOCATION FUNNEL */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.22s" }}
              >
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Outlet Size"
                    title="Sum of Sales by Outlet Size"
                  />
                  <div className="flex items-center gap-5">
                    <Donut
                      segments={salesByOutletSize}
                      centerLabel="Total"
                      centerValue="$1.20M"
                    />
                    <div className="space-y-2.5">
                      {salesByOutletSize.map((v, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: v.color }}
                          />
                          <div>
                            <div className="text-[12px] font-bold text-[#14251C]">
                              {v.label}
                            </div>
                            <div className="text-[10px] text-[#8A8F80] font-mono">
                              ${v.value}K
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Lokasi"
                    title="Outlet Location Sales"
                    subtitle="funnel, % relatif terhadap Tier 3"
                  />
                  <Funnel data={outletLocationSales} />
                </div>
              </div>

              {/* PIVOT TABLE */}
              <div
                className="rise bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover"
                style={{ animationDelay: "0.24s" }}
              >
                <SectionTitle
                  eyebrow="Outlet Type"
                  title="Ringkasan Performa per Outlet Type"
                />
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="text-left text-[#8A8F80] uppercase text-[10px] tracking-wide border-b border-[#E7E1CC]">
                        <th className="py-2 pr-3 font-bold">Outlet Type</th>
                        <th className="py-2 px-3 font-bold">AVG Rating</th>
                        <th className="py-2 px-3 font-bold">AVG Sales</th>
                        <th className="py-2 px-3 font-bold">Total Revenue</th>
                        <th className="py-2 px-3 font-bold">No Item</th>
                        <th className="py-2 pl-3 font-bold">Item Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outletPivot.map((r, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#F1EAD3] last:border-0"
                        >
                          <td className="py-2.5 pr-3 font-bold text-[#14251C]">
                            {r.type}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[#FBEAE4] text-[#E2725B] font-mono font-bold">
                              {r.rating}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[#E7F0FA] text-[#3568A6] font-mono font-bold">
                              ${r.avgSales}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#14251C]">
                            $
                            {r.revenue.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="py-2.5 px-3 font-mono">
                            {r.noItem.toLocaleString("en-US")}
                          </td>
                          <td className="py-2.5 pl-3 font-mono">
                            {r.visibility.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-[#8A8F80] mt-3 font-mono">
                  Total revenue keempat outlet type = $
                  {totalRevenueAllOutlets.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  — konsisten dengan KPI Total Revenue $1.20M.
                </p>
              </div>

              {/* SCREENSHOT ASLI */}
              <div
                className="rise bg-white rounded-2xl border border-[#E7E1CC] shadow-sm overflow-hidden"
                style={{ animationDelay: "0.28s" }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E1CC] bg-[#EAF4E5]">
                  <div>
                    <span className="text-[12px] font-bold text-[#14251C]">
                      Preview Dashboard Power BI
                    </span>
                    <p className="text-[10px] text-[#8A8F80]">
                      Tampilan asli hasil visualisasi (try_project2.pbix)
                    </p>
                  </div>
                  <button
                    onClick={() => setZoomed(true)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3C8B3F] bg-white border border-[#E7E1CC] px-2.5 py-1 rounded-full hover:border-[#3C8B3F] transition-colors"
                  >
                    <ZoomIn size={12} />
                    Perbesar
                  </button>
                </div>
                <div className="p-4 bg-gradient-to-b from-[#EAF4E5] to-white">
                  <img
                    src={powerbidashboard3blink}
                    alt="Dashboard BlinkIt Indo Sales"
                    className="w-full rounded-xl border border-[#E7E1CC] shadow-md cursor-zoom-in hover:shadow-lg transition-shadow"
                    onClick={() => setZoomed(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB: PROSES & INSIGHT ══════════ */}
          {tab === "proses" && (
            <div className="space-y-6">
              <div
                className="rise bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-6"
                style={{ animationDelay: "0.05s" }}
              >
                <SectionTitle
                  eyebrow="Metodologi"
                  title="Alur Kerja Analisis — dari Data Mentah ke Dashboard"
                  subtitle="Enam tahapan yang dilalui sebelum dashboard ini siap digunakan tim bisnis"
                />
                <div className="space-y-0">
                  {pipeline.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={i}
                        className={`flex gap-4 py-4 ${i !== 0 ? "stitch" : ""}`}
                      >
                        <div className="flex-shrink-0 flex flex-col items-center">
                          <span className="w-10 h-10 rounded-xl bg-[#14251C] text-[#F6C445] flex items-center justify-center shadow-sm">
                            <Icon size={17} />
                          </span>
                          <span className="text-[10px] font-mono text-[#3C8B3F] font-bold mt-1">
                            0{i + 1}
                          </span>
                        </div>
                        <div className="pt-1">
                          <div className="text-sm font-bold text-[#14251C]">
                            {step.title}
                          </div>
                          <p className="text-[13px] text-[#5A5F52] leading-relaxed mt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="rise flex items-center gap-3"
                style={{ animationDelay: "0.08s" }}
              >
                <div className="h-px flex-1 bg-[#E7E1CC]" />
                <span className="px-4 py-1.5 bg-[#14251C] text-[#F6C445] text-xs font-bold rounded-full">
                  Insight & Rekomendasi
                </span>
                <div className="h-px flex-1 bg-[#E7E1CC]" />
              </div>

              <div
                className="rise grid grid-cols-1 sm:grid-cols-2 gap-4"
                style={{ animationDelay: "0.1s" }}
              >
                {insights.map((ins, i) => {
                  const Icon = ins.icon;
                  const isWarning = ins.icon === AlertTriangle;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-[#E7E1CC] shadow-sm p-5 card-hover"
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                          isWarning
                            ? "bg-[#FBEAE4] text-[#E2725B]"
                            : "bg-[#EAF4E5] text-[#3C8B3F]"
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <div
                        className="text-sm font-bold text-[#14251C] mb-1.5"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {ins.title}
                      </div>
                      <p className="text-[12.5px] text-[#5A5F52] leading-relaxed">
                        {ins.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="rise rounded-2xl overflow-hidden border border-[#E7E1CC] shadow"
                style={{ animationDelay: "0.14s" }}
              >
                <div
                  className="px-6 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #0C1510 0%, #14251C 55%, #3C8B3F 130%)",
                  }}
                >
                  <div
                    className="text-white font-bold text-sm mb-1"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Mengapa dashboard ini perlu slicer Outlet Location, Outlet
                    Type, dan Item Type?
                  </div>
                  <p className="text-white/75 text-[12.5px] leading-relaxed max-w-2xl">
                    Karena kontribusi revenue sangat timpang antar Outlet Type
                    (Supermarket Type1 menyumbang ±65,5%) dan antar tier lokasi
                    (Tier 3 memimpin dengan 39%), tim bisnis perlu bisa memecah
                    performa per segmen — bukan hanya melihat angka gabungan
                    nasional. Slicer{" "}
                    <strong className="text-[#F6C445]">
                      Outlet Location Type
                    </strong>
                    , <strong className="text-[#F6C445]">Outlet Type</strong>,
                    dan <strong className="text-[#F6C445]">Item Type</strong>{" "}
                    memungkinkan tim langsung menjawab pertanyaan seperti
                    "kategori apa yang paling laku di Supermarket Type1 Tier 3"
                    tanpa perlu laporan terpisah.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM NAV */}
          <div
            className="rise flex items-center justify-between pt-2 pb-10"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A8F80] hover:text-[#3C8B3F] transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-[#E7E1CC] shadow-sm flex items-center justify-center group-hover:border-[#3C8B3F] transition-all">
                <ArrowLeft size={15} />
              </span>
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerBI3Blink;
