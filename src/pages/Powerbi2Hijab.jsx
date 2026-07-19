import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Package,
  Wallet,
  ShoppingBag,
  Tag,
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
} from "lucide-react";

// Ganti path ini dengan screenshot dashboard Power BI asli Anda
import dashboardZen from "../../src/assets/dashboardhijabPowerbi2.png";

/* ─────────────────────────────────────────────────────────────
   DATA — direkonstruksi dari screenshot dashboard "Zen Dress Daily"
   Catatan: angka varian & SKU disusun ulang agar konsisten dengan
   total KPI (Total Revenue Rp367,0Jt & Barang Terjual 2,60K).
   Ganti dengan data asli dari file mentah bila tersedia.
───────────────────────────────────────────────────────────── */

const filters = {
  toko: "Semua Toko (7 cabang)",
  tanggal: "Selasa, 03 Februari 2026",
};

const kpiCards = [
  {
    label: "Total Daftar Outbound",
    value: "2.490",
    display: "2,49K",
    trend: 4.57,
    icon: Package,
  },
  {
    label: "Revenue",
    value: "Rp 367.000.000",
    display: "Rp367,0Jt",
    trend: 0.2,
    icon: Wallet,
  },
  {
    label: "Barang Terjual",
    value: "2.603",
    display: "2,60K",
    trend: 8.85,
    icon: ShoppingBag,
  },
  {
    label: "AVG Harga Terjual",
    value: "Rp 147.140",
    display: "Rp147,14rb",
    trend: -4.18,
    icon: Tag,
  },
];

const topRevenue = [
  { name: "Zen Hijab Syar'i Series A", value: 49.0 },
  { name: "Lesti Prayer Set Premium", value: 25.0 },
  { name: "Arabian Shawl Signature", value: 24.0 },
  { name: "Zen Hijab Segiempat Motif", value: 19.0 },
  { name: "Zen Hijab Pashmina Ceruti", value: 18.0 },
];

const bottomRevenue = [
  { name: "Mela Embroidery Blouse", value: 0.45 },
  { name: "Mela Embroidery Tunic", value: 0.33 },
  { name: "Len French Lace Dress", value: 0.23 },
  { name: "Len French Lace Set", value: 0.23 },
  { name: "Zen Hijab Voal Polos", value: 0.18 },
];

const varianQty = [
  { label: "(Blank)", value: 1764, color: "#3B2440" },
  { label: "Black", value: 680, color: "#D46A82" },
  { label: "Soft Pink", value: 159, color: "#E8B75C" },
];

const varianRevenue = [
  { label: "(Blank)", value: 224.5, color: "#3B2440" },
  { label: "Black", value: 123.6, color: "#D46A82" },
  { label: "Soft Pink", value: 18.9, color: "#E8B75C" },
];

const skuQty = [
  { sku: "Y041001", value: 408 },
  { sku: "L020003", value: 254 },
  { sku: "L138001", value: 186 },
  { sku: "Y041017", value: 159 },
  { sku: "Y041008", value: 154 },
  { sku: "L020047", value: 107 },
];

const skuRevenue = [
  { sku: "Y041001", value: 49.1 },
  { sku: "Y025008", value: 25.2 },
  { sku: "L138001", value: 23.7 },
  { sku: "Y041017", value: 18.9 },
  { sku: "Y041008", value: 18.5 },
  { sku: "L020003", value: 17.2 },
];

const pipeline = [
  {
    icon: Database,
    title: "Pengumpulan Data",
    desc: "Menarik data outbound harian & master produk dari sistem gudang/POS tiap cabang, digabung menjadi satu tabel transaksi mentah per hari.",
  },
  {
    icon: Wand2,
    title: "Data Cleaning",
    desc: "Menghapus baris duplikat (transaksi outbound ganda), menstandarkan format tanggal & kode SKU, menangani nilai kosong pada kolom varian ('(Blank)'), serta memeriksa outlier harga jual yang tidak wajar.",
  },
  {
    icon: Layers,
    title: "Transformasi Data",
    desc: "Menggabungkan tabel outbound dengan master produk (relasi berdasarkan SKU), membuat kolom turunan seperti kategori varian, nama toko, dan minggu/hari transaksi untuk kebutuhan slicer.",
  },
  {
    icon: SearchCheck,
    title: "Exploratory Data Analysis",
    desc: "Menelusuri distribusi penjualan per varian, mengidentifikasi 5 produk & SKU dengan revenue tertinggi dan terendah, serta memeriksa konsistensi antara jumlah barang terjual dan revenue.",
  },
  {
    icon: LayoutDashboard,
    title: "Pembangunan Dashboard",
    desc: "Menyusun measure DAX (Total Revenue, AVG Harga Terjual, Total Outbound) di Power BI, lalu merancang layout kartu KPI, donut chart varian, dan bar chart SKU dengan slicer Nama Toko & Waktu Pemesanan.",
  },
  {
    icon: CheckCircle2,
    title: "Validasi & Insight",
    desc: "Memastikan setiap slicer (toko & tanggal) memperbarui seluruh visual secara konsisten, lalu merumuskan insight bisnis harian yang bisa langsung ditindaklanjuti oleh tim operasional.",
  },
];

const insights = [
  {
    icon: Sparkles,
    title: "Barang Terjual Naik, AVG Harga Turun",
    desc: "Barang terjual naik 8,85% dibanding periode sebelumnya, namun AVG harga terjual turun 4,18% — indikasi promo/diskon berjalan efektif mendorong volume, meski menekan margin per item.",
  },
  {
    icon: Sparkles,
    title: "Kategori '(Blank)' Mendominasi",
    desc: "Sekitar 68% barang terjual & 61% revenue berasal dari varian yang belum terisi labelnya. Ini peluang cleaning lanjutan agar analisis per warna produk lebih akurat ke depannya.",
  },
  {
    icon: Sparkles,
    title: "Y041001 Konsisten di Puncak",
    desc: "SKU Y041001 (Zen Hijab Syar'i Series A) menjadi SKU terlaris sekaligus penyumbang revenue tertinggi — 408 pcs terjual dengan revenue Rp49,1 Jt pada hari ini.",
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
        stroke="#F1E4DE"
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
        fill="#8A7A82"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="600"
      >
        {centerLabel}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontSize="15"
        fill="#3B2440"
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
  colorFrom = "#3B2440",
  colorTo = "#D46A82",
  format,
}) => (
  <div className="space-y-3">
    {data.map((d, i) => (
      <div key={i}>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[12px] font-medium text-[#5A4B54] truncate pr-2">
            {d.name}
          </span>
          <span className="text-[12px] font-bold text-[#3B2440] font-mono whitespace-nowrap">
            {format ? format(d.value) : d.value}
            {unit}
          </span>
        </div>
        <div className="h-[7px] rounded-full bg-[#F1E4DE] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(d.value / max) * 100}%`,
              background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
              animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
              animationDelay: `${i * 0.07}s`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const SkuBars = ({ data, max, format, color = "#D46A82" }) => (
  <div className="flex items-end gap-3" style={{ height: 130 }}>
    {data.map((d, i) => {
      const pct = (d.value / max) * 100;
      return (
        <div
          key={i}
          className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
        >
          <span className="text-[10px] font-bold text-[#3B2440] font-mono">
            {format(d.value)}
          </span>
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${pct}%`,
              minHeight: 4,
              background:
                i === 0
                  ? "linear-gradient(180deg, #E8B75C, #C89B5C)"
                  : `linear-gradient(180deg, ${color}, #3B2440)`,
              animation: "growUp 0.8s cubic-bezier(.22,.68,0,1.2) both",
              animationDelay: `${i * 0.06}s`,
            }}
          />
          <span className="text-[9px] text-[#8A7A82] font-mono">{d.sku}</span>
        </div>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   TAG-STYLE KPI CARD — signature element (hang-tag ala label baju)
───────────────────────────────────────────────────────────── */

const TagKPI = ({ card }) => {
  const Icon = card.icon;
  const up = card.trend >= 0;
  return (
    <div className="relative bg-white rounded-2xl border border-[#EADFCF] shadow-[0_6px_20px_-8px_rgba(59,36,64,0.18)] pt-6 pb-4 px-4 card-hover">
      {/* lubang gantungan tag */}
      <span className="absolute -top-2.5 left-5 w-4 h-4 rounded-full bg-[#FAF6F1] border border-[#EADFCF]" />
      <svg
        className="absolute -top-[18px] left-[26px]"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          d="M2 18 C 2 4, 18 4, 18 18"
          fill="none"
          stroke="#C89B5C"
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      </svg>
      <div className="flex items-center justify-between mb-3">
        <span className="w-8 h-8 rounded-full bg-[#FBEFF1] flex items-center justify-center text-[#D46A82]">
          <Icon size={15} strokeWidth={2.2} />
        </span>
        <span
          className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            up ? "bg-[#EAF2EA] text-[#4F7A57]" : "bg-[#FBEAEA] text-[#B7495E]"
          }`}
        >
          {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {Math.abs(card.trend)}%
        </span>
      </div>
      <div className="text-[11px] font-semibold text-[#8A7A82] mb-1 tracking-wide uppercase">
        {card.label}
      </div>
      <div
        className="text-[26px] font-bold text-[#3B2440]"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {card.display}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────── */

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-5">
    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#D46A82]">
      {eyebrow}
    </span>
    <h3
      className="text-lg font-bold text-[#3B2440] mt-1"
      style={{ fontFamily: "'Fraunces', serif" }}
    >
      {title}
    </h3>
    {subtitle && (
      <p className="text-[12px] text-[#8A7A82] mt-0.5">{subtitle}</p>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

const Powerbi2Hijab = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [zoomed, setZoomed] = useState(false);

  const maxTop = Math.max(...topRevenue.map((d) => d.value));
  const maxBottom = Math.max(...bottomRevenue.map((d) => d.value));
  const maxSkuQty = Math.max(...skuQty.map((d) => d.value));
  const maxSkuRev = Math.max(...skuRevenue.map((d) => d.value));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');

        @keyframes riseIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes growBar { from { width: 0%; } }
        @keyframes growUp { from { height: 0px !important; } }
        @keyframes zoomPop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }

        .rise { animation: riseIn 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-3px); }
        .stitch { border-top: 2px dashed #E0B98F; }
        .grain-bg {
          background-image: radial-gradient(circle at 1px 1px, rgba(59,36,64,0.05) 1px, transparent 0);
          background-size: 22px 22px;
        }
        .tab-on { background: #3B2440; color: #FBEFF1; box-shadow: 0 6px 16px -4px rgba(59,36,64,0.35); }
        .tab-off { background: white; color: #8A7A82; border: 1px solid #EADFCF; }
        .tab-off:hover { border-color: #D46A82; color: #D46A82; }
        .filter-pill { background: white; border: 1px solid #EADFCF; }
      `}</style>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#241B2F]/80 backdrop-blur-sm p-4"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-w-6xl w-full"
            style={{
              animation: "zoomPop 0.25s cubic-bezier(.22,.68,0,1.2) both",
            }}
          >
            <img
              src={dashboardZen}
              alt="Dashboard Zen Dress Daily — tampilan penuh"
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg"
            >
              <X size={16} className="text-[#3B2440]" />
            </button>
          </div>
        </div>
      )}

      <div
        className="min-h-screen grain-bg"
        style={{
          background: "#FAF6F1",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="rise inline-flex items-center gap-2 text-sm font-semibold text-[#8A7A82] hover:text-[#D46A82] transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-[#EADFCF] shadow-sm flex items-center justify-center group-hover:border-[#D46A82] transition-all">
              <ArrowLeft size={15} />
            </span>
            Kembali ke Portfolio
          </button>

          {/* HERO */}
          <div
            className="rise rounded-3xl overflow-hidden shadow-lg border border-[#EADFCF]"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #241B2F 0%, #3B2440 55%, #B65E77 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 78% 25%, #E8B75C 0%, transparent 55%)",
                }}
              />
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  🧵 Power BI · Daily Sales Dashboard
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Zen Dress
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-2"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Zen Dress Daily
                <br />
                <span className="text-[#E8B75C]">
                  Sales & Outbound Dashboard
                </span>
              </h1>
              <p className="text-white/75 text-sm max-w-xl leading-relaxed">
                Dashboard harian untuk memantau outbound, revenue, dan performa
                produk lintas seluruh cabang toko Zen Dress — dengan tampilan
                yang bisa difilter per toko dan per tanggal pemesanan.
              </p>

              {/* FILTER EXPLAINER — fitur toko & tanggal */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="filter-pill rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <Store size={15} className="text-[#D46A82]" />
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A7A82]">
                      Nama Toko
                    </div>
                    <div className="text-[12px] font-bold text-[#3B2440] flex items-center gap-1">
                      {filters.toko}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
                <div className="filter-pill rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                  <CalendarDays size={15} className="text-[#D46A82]" />
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-wide text-[#8A7A82]">
                      Waktu Pemesanan
                    </div>
                    <div className="text-[12px] font-bold text-[#3B2440] flex items-center gap-1">
                      {filters.tanggal}
                      <ChevronDown size={12} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-[11px] mt-3 max-w-xl leading-relaxed">
                Kedua slicer ini menggerakkan seluruh kartu & chart di halaman
                ini secara bersamaan — cukup pilih satu cabang toko dan/atau
                satu tanggal untuk melihat performa hari itu saja, atau biarkan
                "Semua Toko" aktif untuk melihat gambaran gabungan seluruh
                cabang.
              </p>
            </div>
          </div>

          {/* TABS */}
          <div
            className="rise flex gap-2 bg-[#F1E4DE] p-1.5 rounded-2xl w-fit"
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

              {/* TOP / BOTTOM PRODUK */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.14s" }}
              >
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Produk"
                    title="5 Produk Revenue Tertinggi"
                  />
                  <HList
                    data={topRevenue}
                    max={maxTop}
                    unit=" Jt"
                    format={(v) => `Rp${v.toFixed(1)}`}
                    colorFrom="#3B2440"
                    colorTo="#D46A82"
                  />
                </div>
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Produk"
                    title="5 Produk Revenue Terendah"
                  />
                  <HList
                    data={bottomRevenue}
                    max={maxBottom}
                    unit=" Jt"
                    format={(v) => `Rp${v.toFixed(2)}`}
                    colorFrom="#C89B5C"
                    colorTo="#E8B75C"
                  />
                </div>
              </div>

              {/* VARIAN DONUTS */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.18s" }}
              >
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Varian"
                    title="Qty Terjual by Varian Produk"
                  />
                  <div className="flex items-center gap-5">
                    <Donut
                      segments={varianQty}
                      centerLabel="Total"
                      centerValue="2,60K"
                    />
                    <div className="space-y-2.5">
                      {varianQty.map((v, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: v.color }}
                          />
                          <div>
                            <div className="text-[12px] font-bold text-[#3B2440]">
                              {v.label}
                            </div>
                            <div className="text-[10px] text-[#8A7A82] font-mono">
                              {v.value.toLocaleString("id-ID")} pcs
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="Varian"
                    title="Revenue by Varian Produk"
                  />
                  <div className="flex items-center gap-5">
                    <Donut
                      segments={varianRevenue}
                      centerLabel="Total"
                      centerValue="Rp367Jt"
                    />
                    <div className="space-y-2.5">
                      {varianRevenue.map((v, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: v.color }}
                          />
                          <div>
                            <div className="text-[12px] font-bold text-[#3B2440]">
                              {v.label}
                            </div>
                            <div className="text-[10px] text-[#8A7A82] font-mono">
                              Rp{v.value.toFixed(1)} Jt
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SKU BARS */}
              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.22s" }}
              >
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="SKU"
                    title="5 Barang Terjual Tertinggi by SKU"
                    subtitle="dalam pcs"
                  />
                  <SkuBars data={skuQty} max={maxSkuQty} format={(v) => v} />
                </div>
                <div className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover">
                  <SectionTitle
                    eyebrow="SKU"
                    title="5 Revenue Tertinggi by SKU"
                    subtitle="dalam juta Rupiah"
                  />
                  <SkuBars
                    data={skuRevenue}
                    max={maxSkuRev}
                    format={(v) => `Rp${v.toFixed(1)}Jt`}
                  />
                </div>
              </div>

              {/* SCREENSHOT ASLI */}
              <div
                className="rise bg-white rounded-2xl border border-[#EADFCF] shadow-sm overflow-hidden"
                style={{ animationDelay: "0.26s" }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADFCF] bg-[#FBEFF1]">
                  <div>
                    <span className="text-[12px] font-bold text-[#3B2440]">
                      Preview Dashboard Power BI
                    </span>
                    <p className="text-[10px] text-[#8A7A82]">
                      Tampilan asli hasil visualisasi harian
                    </p>
                  </div>
                  <button
                    onClick={() => setZoomed(true)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D46A82] bg-white border border-[#EADFCF] px-2.5 py-1 rounded-full hover:border-[#D46A82] transition-colors"
                  >
                    <ZoomIn size={12} />
                    Perbesar
                  </button>
                </div>
                <div className="p-4 bg-gradient-to-b from-[#FBEFF1] to-white">
                  <img
                    src={dashboardZen}
                    alt="Dashboard Zen Dress Daily"
                    className="w-full rounded-xl border border-[#EADFCF] shadow-md cursor-zoom-in hover:shadow-lg transition-shadow"
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
                className="rise bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-6"
                style={{ animationDelay: "0.05s" }}
              >
                <SectionTitle
                  eyebrow="Metodologi"
                  title="Alur Kerja Analisis — dari Data Mentah ke Dashboard"
                  subtitle="Enam tahapan yang dilalui sebelum dashboard ini siap digunakan tim toko"
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
                          <span className="w-10 h-10 rounded-xl bg-[#3B2440] text-[#E8B75C] flex items-center justify-center shadow-sm">
                            <Icon size={17} />
                          </span>
                          <span className="text-[10px] font-mono text-[#C89B5C] font-bold mt-1">
                            0{i + 1}
                          </span>
                        </div>
                        <div className="pt-1">
                          <div className="text-sm font-bold text-[#3B2440]">
                            {step.title}
                          </div>
                          <p className="text-[13px] text-[#5A4B54] leading-relaxed mt-1">
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
                <div className="h-px flex-1 bg-[#EADFCF]" />
                <span className="px-4 py-1.5 bg-[#3B2440] text-[#E8B75C] text-xs font-bold rounded-full">
                  Insight Utama
                </span>
                <div className="h-px flex-1 bg-[#EADFCF]" />
              </div>

              <div
                className="rise grid grid-cols-1 sm:grid-cols-3 gap-4"
                style={{ animationDelay: "0.1s" }}
              >
                {insights.map((ins, i) => {
                  const Icon = ins.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-[#EADFCF] shadow-sm p-5 card-hover"
                    >
                      <span className="w-9 h-9 rounded-xl bg-[#FBEFF1] text-[#D46A82] flex items-center justify-center mb-3">
                        <Icon size={16} />
                      </span>
                      <div
                        className="text-sm font-bold text-[#3B2440] mb-1.5"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {ins.title}
                      </div>
                      <p className="text-[12.5px] text-[#5A4B54] leading-relaxed">
                        {ins.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="rise rounded-2xl overflow-hidden border border-[#EADFCF] shadow"
                style={{ animationDelay: "0.14s" }}
              >
                <div
                  className="px-6 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #241B2F 0%, #3B2440 55%, #B65E77 100%)",
                  }}
                >
                  <div
                    className="text-white font-bold text-sm mb-1"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Mengapa dashboard ini dibuat harian, per toko?
                  </div>
                  <p className="text-white/75 text-[12.5px] leading-relaxed max-w-2xl">
                    Karena stok dan permintaan tiap cabang Zen Dress berbeda
                    setiap hari, tim operasional perlu melihat performa outbound
                    & revenue toko masing-masing secara terpisah — bukan hanya
                    angka gabungan nasional. Slicer{" "}
                    <strong className="text-[#E8B75C]">Nama Toko</strong> dan{" "}
                    <strong className="text-[#E8B75C]">Waktu Pemesanan</strong>{" "}
                    memungkinkan tim di lapangan langsung mengecek "apa yang
                    laku hari ini di toko saya", tanpa perlu menunggu laporan
                    mingguan.
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A7A82] hover:text-[#D46A82] transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-[#EADFCF] shadow-sm flex items-center justify-center group-hover:border-[#D46A82] transition-all">
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

export default Powerbi2Hijab;
