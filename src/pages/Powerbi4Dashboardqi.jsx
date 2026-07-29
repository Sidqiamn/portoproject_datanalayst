import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Package,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  Ruler,
  Layers,
  Truck,
  Warehouse,
  ClipboardList,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle2,
  Database,
  Wand2,
  SearchCheck,
  LayoutDashboard,
  HardHat,
  Hammer,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   PUBLIC POWER BI REPORT
───────────────────────────────────────────────────────────── */
const POWERBI_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiMWE2OWEyM2EtNDk2Yy00MDEwLWI4M2EtNjEwOGY1MWMwOWE4IiwidCI6IjdkZGFiOTE3LTUzN2YtNGI0Zi1hNjE5LTE4N2UxNjc3MzNiYSJ9";

/* ─────────────────────────────────────────────────────────────
   DATA — dihitung langsung dari building_supply_store_sales_2020-2024.csv
   (30.000 baris transaksi, 2020-01-01 s/d 2024-12-31)
───────────────────────────────────────────────────────────── */

const kpis = [
  {
    label: "Total Revenue 2020–2024",
    value: "Rp 99,25 M",
    sub: "Rp99.254.706.000",
    yoy: -4.7,
    measure: "% YOY Revenue",
    icon: Wallet,
  },
  {
    label: "Total Transaksi",
    value: "30.000",
    sub: "order tercatat, 5 tahun",
    yoy: 2.1,
    measure: "% YOY Orders",
    icon: Receipt,
  },
  {
    label: "Unit Terjual",
    value: "761.448",
    sub: "pcs / sak / meter / dsb.",
    yoy: 1.1,
    measure: "% YOY Transaksi",
    icon: Package,
  },
  {
    label: "Rata-rata Nilai Order",
    value: "Rp 3,31 Jt",
    sub: "Rp3.308.490 / transaksi",
    yoy: -6.7,
    measure: "% YOY AVG Sales",
    icon: Ruler,
  },
];

const yearly = [
  { year: 2020, rev: 19.5, yoy: null },
  { year: 2021, rev: 20.08, yoy: 2.9 },
  { year: 2022, rev: 19.32, yoy: -3.8 },
  { year: 2023, rev: 20.67, yoy: 7.0 },
  { year: 2024, rev: 19.69, yoy: -4.7 },
];

const stores = [
  { name: "Medan", type: "Cabang", rev: 14.74, orders: 4263 },
  { name: "Bandung", type: "Cabang", rev: 14.6, orders: 4398 },
  { name: "Jayapura", type: "Cabang", rev: 14.51, orders: 4343 },
  { name: "Tasikmalaya", type: "Head Office", rev: 14.29, orders: 4281 },
  { name: "Denpasar", type: "Cabang", rev: 14.15, orders: 4261 },
  { name: "Surabaya", type: "Cabang", rev: 13.55, orders: 4238 },
  { name: "Jakarta", type: "Cabang", rev: 13.41, orders: 4216 },
];

// Material take-off: kontribusi revenue vs kontribusi unit per kategori
const takeoff = [
  { name: "Sanitary", revShare: 24.7, qtyShare: 8.2, avgPrice: 393459 },
  { name: "Door", revShare: 15.9, qtyShare: 4.0, avgPrice: 513843 },
  { name: "Plumbing", revShare: 14.9, qtyShare: 4.1, avgPrice: 473338 },
  { name: "Tool", revShare: 9.4, qtyShare: 15.0, avgPrice: 81570 },
  { name: "Stone", revShare: 7.1, qtyShare: 2.7, avgPrice: 340685 },
  { name: "Sand", revShare: 5.7, qtyShare: 2.7, avgPrice: 275617 },
  { name: "Cement", revShare: 4.2, qtyShare: 8.3, avgPrice: 65470 },
  { name: "Tile", revShare: 2.3, qtyShare: 2.7, avgPrice: 109472 },
];

const topProducts = [
  { name: "Water Tank", value: 14.48 },
  { name: "Sitting Toilet", value: 11.47 },
  { name: "Steel Door", value: 7.1 },
  { name: "Wash Basin (Sink)", value: 6.32 },
  { name: "Wooden Door", value: 4.94 },
];

const bottomProducts = [
  { name: "Red Brick", value: 8.4 },
  { name: "Clay Roof Tile", value: 21.3 },
  { name: "Concrete Roof Tile", value: 35.35 },
  { name: "Sandpaper", value: 49.2 },
  { name: "Electrical Cable", value: 53.3 },
];

const topBrands = [
  { name: "Unbranded", value: 21.92 },
  { name: "TOTO", value: 17.79 },
  { name: "Penguin", value: 14.48 },
  { name: "WINA", value: 7.1 },
  { name: "Artco", value: 4.16 },
];

const deliverySplit = [
  { label: "Delivery", pct: 50.8, color: "var(--bp-cyan)" },
  { label: "Pickup", pct: 49.2, color: "var(--bp-orange)" },
];

const insights = [
  {
    icon: TrendingDown,
    tag: "TEMUAN 01",
    title: "Revenue plateau lima tahun beruntun",
    body: "Revenue tahunan bergerak sempit di kisaran Rp19,3–20,7 Miliar sejak 2020, dengan jumlah order yang juga nyaris datar (±6.000/tahun). Tahun 2023 sempat naik +7,0%, tapi 2024 kembali turun -4,7% — pertumbuhan berhenti mengandalkan penambahan pelanggan baru.",
  },
  {
    icon: Target,
    tag: "TEMUAN 02",
    title: "Sanitary & Door: sedikit unit, revenue besar",
    body: "Kategori Sanitary menyumbang 24,7% revenue dari hanya 8,2% unit terjual (rata-rata Rp393.459/unit). Door bahkan lebih tinggi, Rp513.843/unit. Sebaliknya, Tool menyumbang 15,0% dari seluruh unit tapi hanya 9,4% revenue (rata-rata Rp81.570/unit).",
  },
  {
    icon: MapPin,
    tag: "TEMUAN 03",
    title: "Jaringan toko merata, Jakarta paling lemah",
    body: "Selisih revenue toko tertinggi (Medan, Rp14,74 M) dan terendah (Jakarta, Rp13,41 M) hanya ±9% — jaringan cukup seimbang. Namun Jakarta, pasar dengan potensi terbesar, justru berada di posisi terakhir dari 7 cabang.",
  },
  {
    icon: Truck,
    tag: "TEMUAN 04",
    title: "Delivery vs Pickup nyaris 50/50",
    body: "50,8% transaksi dikirim (Delivery) dan 49,2% diambil sendiri (Pickup). Beban logistik terbagi rata antar dua jalur — belum ada insentif yang mendorong salah satu jalur secara jelas.",
  },
];

const recommendations = [
  {
    title: "Bundling kamar mandi & pintu",
    body: "Paketkan Sitting Toilet, Wash Basin, dan Steel/Wooden Door sebagai satu paket renovasi. Kategori ini punya nilai per unit tertinggi — menaikkan AOV lebih efisien daripada menambah jumlah pelanggan.",
  },
  {
    title: "Jadikan Tool sebagai pintu masuk cross-sell",
    body: "Tool adalah kategori dengan unit terjual tertinggi (114.255 pcs) tapi margin per unit terendah. Latih kasir untuk menawarkan Sanitary/Plumbing terkait saat pelanggan membeli perkakas.",
  },
  {
    title: "Audit khusus toko Jakarta",
    body: "Selisih ke toko terbaik relatif kecil, tapi posisi Jakarta di dasar klasemen — di pasar dengan potensi terbesar — layak ditelusuri: luas gerai, kelengkapan stok, atau tekanan kompetitor.",
  },
  {
    title: "Pantau AOV bulanan, bukan hanya revenue",
    body: "Rata-rata nilai order turun -6,7% YoY di 2024, lebih tajam dari penurunan revenue itu sendiri (-4,7%). Sinyal ini muncul lebih awal di data transaksi dibanding di angka revenue total.",
  },
];

const pipeline = [
  {
    icon: Database,
    title: "Pengumpulan Data",
    desc: "30.000 transaksi outbound 2020–2024 dari 7 lokasi toko (6 cabang + 1 kantor pusat di Tasikmalaya yang juga melayani transaksi langsung) digabung menjadi satu tabel fakta penjualan.",
  },
  {
    icon: Wand2,
    title: "Data Cleaning",
    desc: "Standardisasi format tanggal & satuan (Piece, Sack, Meter, Cubic Meter, dll — 10 jenis unit), verifikasi total_price = unit_purchase × price_per_unit, dan pengecekan duplikasi baris transaksi.",
  },
  {
    icon: Layers,
    title: "Transformasi & DAX Modeling",
    desc: "Membangun measure DAX seperti Revenue, Orders, AVG Price, dan varian % YOY (% YOY Revenue, % YOY Orders, % YOY Transaksi, % YOY AVG Sales) berbasis tabel tanggal terpisah untuk perbandingan tahun-ke-tahun.",
  },
  {
    icon: SearchCheck,
    title: "Exploratory Data Analysis",
    desc: "Menelusuri kontribusi revenue vs unit per kategori produk (pola Pareto Sanitary/Door vs Tool), performa 7 toko, komposisi brand, dan rasio Delivery/Pickup.",
  },
  {
    icon: LayoutDashboard,
    title: "Pembangunan Dashboard",
    desc: "3 halaman Power BI — Analytics (ringkasan KPI & tren), Detail, dan Detail 2 — dengan slicer toko, kasir, dan tahun/bulan transaksi, dipublikasikan sebagai laporan publik.",
  },
  {
    icon: CheckCircle2,
    title: "Validasi & Insight",
    desc: "Memastikan setiap slicer memperbarui seluruh visual secara konsisten, lalu merumuskan temuan yang bisa langsung ditindaklanjuti oleh tim merchandising & operasional toko.",
  },
];

const meta = {
  periode: "2020 — 2024",
  cabang: "7 Toko",
  transaksi: "30.000 Order",
};

/* ─────────────────────────────────────────────────────────────
   PRIMITIVES — bahasa visual "gambar teknik / blueprint"
───────────────────────────────────────────────────────────── */

// Garis dimensi ala gambar arsitektur: ←──── label ────→
const DimLine = ({ label }) => (
  <div className="flex items-center gap-2 w-full" aria-hidden="true">
    <svg width="14" height="10" viewBox="0 0 14 10">
      <path
        d="M13 1 L1 5 L13 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
    <div className="flex-1 h-px bg-current opacity-40" />
    <span className="text-[10px] font-mono tracking-[0.15em] uppercase px-2 whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-current opacity-40" />
    <svg width="14" height="10" viewBox="0 0 14 10">
      <path
        d="M1 1 L13 5 L1 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  </div>
);

// Stempel berputar ala cap gambar kerja
const Stamp = ({ text }) => (
  <div
    className="inline-flex items-center justify-center border-[2.5px] rounded-full px-3 py-1 select-none"
    style={{
      borderColor: "var(--bp-orange)",
      color: "var(--bp-orange)",
      transform: "rotate(-6deg)",
      fontFamily: "'Oswald', sans-serif",
    }}
  >
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
      {text}
    </span>
  </div>
);

const SectionEyebrow = ({ index, title, subtitle }) => (
  <div className="mb-5 flex items-start gap-3">
    {index && (
      <span
        className="font-mono text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5"
        style={{ background: "var(--bp-navy-dark)", color: "var(--bp-cyan)" }}
      >
        {index}
      </span>
    )}
    <div>
      <h3
        className="text-lg sm:text-xl font-bold uppercase tracking-wide"
        style={{ fontFamily: "'Oswald', sans-serif", color: "var(--ink)" }}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="text-[12.5px] mt-1" style={{ color: "var(--ink-soft)" }}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

const YoyChip = ({ value }) => {
  const up = value >= 0;
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded"
      style={{
        background: up ? "rgba(76,139,91,0.12)" : "rgba(242,113,31,0.12)",
        color: up ? "#3D7249" : "var(--bp-orange)",
      }}
    >
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {up ? "+" : ""}
      {value}%
    </span>
  );
};

/* KPI card — "plat spesifikasi" dengan baut di sudut */
const SpecPlate = ({ item }) => {
  const Icon = item.icon;
  return (
    <div
      className="relative rounded-lg p-5 card-lift"
      style={{
        background: "var(--bp-paper)",
        border: "1px solid var(--bp-paper-line)",
      }}
    >
      {[
        "top-1.5 left-1.5",
        "top-1.5 right-1.5",
        "bottom-1.5 left-1.5",
        "bottom-1.5 right-1.5",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${pos}`}
          style={{ background: "var(--bp-paper-line)" }}
        />
      ))}
      <div className="flex items-center justify-between mb-4">
        <span
          className="w-9 h-9 rounded flex items-center justify-center"
          style={{ background: "var(--bp-navy)", color: "var(--bp-cyan)" }}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
        <YoyChip value={item.yoy} />
      </div>
      <div
        className="text-[10.5px] font-bold uppercase tracking-[0.1em] mb-1"
        style={{ color: "var(--ink-soft)" }}
      >
        {item.label}
      </div>
      <div
        className="text-[28px] font-bold leading-none mb-1"
        style={{ fontFamily: "'Oswald', sans-serif", color: "var(--ink)" }}
      >
        {item.value}
      </div>
      <div
        className="text-[11px] font-mono"
        style={{ color: "var(--ink-soft)" }}
      >
        {item.sub}
      </div>
      <div
        className="text-[9px] font-mono mt-2 pt-2 border-t"
        style={{ borderColor: "var(--bp-paper-line)", color: "#A69B85" }}
      >
        measure: [{item.measure}]
      </div>
    </div>
  );
};

/* Bar tahunan bergaya penggaris */
const YearBars = () => {
  const max = Math.max(...yearly.map((d) => d.rev));
  return (
    <div className="flex items-end gap-4 sm:gap-6" style={{ height: 170 }}>
      {yearly.map((d, i) => (
        <div
          key={d.year}
          className="flex-1 flex flex-col items-center justify-end h-full gap-2"
        >
          {d.yoy !== null && (
            <span
              className="text-[10px] font-mono font-bold"
              style={{ color: d.yoy >= 0 ? "#3D7249" : "var(--bp-orange)" }}
            >
              {d.yoy >= 0 ? "+" : ""}
              {d.yoy}%
            </span>
          )}
          {d.yoy === null && (
            <span
              className="text-[10px] font-mono"
              style={{ color: "var(--ink-soft)" }}
            >
              base
            </span>
          )}
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-sm relative"
              style={{
                height: `${(d.rev / max) * 100}%`,
                background:
                  i === yearly.length - 1
                    ? "var(--bp-orange)"
                    : "var(--bp-cyan)",
                animation: "growUp 0.8s cubic-bezier(.22,.68,0,1.2) both",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <span
                className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap"
                style={{ color: "var(--ink)" }}
              >
                {d.rev.toFixed(2)}M
              </span>
            </div>
          </div>
          <span
            className="text-[11px] font-mono font-bold"
            style={{ color: "var(--ink)" }}
          >
            {d.year}
          </span>
        </div>
      ))}
    </div>
  );
};

/* Baris performa toko bergaya pita ukur */
const StoreRow = ({ store, max, rank }) => (
  <div className="flex items-center gap-3 py-2.5">
    <span
      className="w-5 text-[11px] font-mono font-bold text-right shrink-0"
      style={{ color: "var(--ink-soft)" }}
    >
      {rank}
    </span>
    <div className="w-[104px] sm:w-[120px] shrink-0">
      <div
        className="text-[12.5px] font-bold truncate"
        style={{ color: "var(--ink)" }}
      >
        {store.name}
      </div>
      <div
        className="text-[9px] font-mono uppercase tracking-wide inline-block px-1.5 py-px rounded mt-0.5"
        style={{
          background:
            store.type === "Head Office"
              ? "rgba(242,113,31,0.12)"
              : "rgba(55,182,216,0.12)",
          color:
            store.type === "Head Office"
              ? "var(--bp-orange)"
              : "var(--bp-cyan)",
        }}
      >
        {store.type}
      </div>
    </div>
    <div
      className="flex-1 h-4 rounded-sm overflow-hidden relative"
      style={{ background: "var(--bp-paper-line)" }}
    >
      <div
        className="h-full"
        style={{
          width: `${(store.rev / max) * 100}%`,
          background: "linear-gradient(90deg, var(--bp-navy), var(--bp-cyan))",
          animation: "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
        }}
      />
    </div>
    <div className="w-[68px] text-right shrink-0">
      <div
        className="text-[12px] font-mono font-bold"
        style={{ color: "var(--ink)" }}
      >
        Rp{store.rev.toFixed(2)}M
      </div>
      <div
        className="text-[9px] font-mono"
        style={{ color: "var(--ink-soft)" }}
      >
        {store.orders.toLocaleString("id-ID")} ord
      </div>
    </div>
  </div>
);

/* Tabel "material take-off" — bandingkan share revenue vs share unit */
const TakeoffRow = ({ row }) => (
  <div
    className="grid grid-cols-[1fr_auto] gap-3 py-2.5 items-center border-b last:border-0"
    style={{ borderColor: "var(--bp-paper-line)" }}
  >
    <div>
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[12.5px] font-bold"
          style={{ color: "var(--ink)" }}
        >
          {row.name}
        </span>
        <span
          className="text-[10px] font-mono"
          style={{ color: "var(--ink-soft)" }}
        >
          Rp{row.avgPrice.toLocaleString("id-ID")}/unit
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="flex-1 h-[6px] rounded-full overflow-hidden"
          style={{ background: "var(--bp-paper-line)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${row.revShare * 3}%`,
              background: "var(--bp-cyan)",
            }}
          />
        </div>
        <span
          className="text-[9.5px] font-mono w-10 text-right shrink-0"
          style={{ color: "var(--bp-cyan)" }}
        >
          {row.revShare}% Rev
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <div
          className="flex-1 h-[6px] rounded-full overflow-hidden"
          style={{ background: "var(--bp-paper-line)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${row.qtyShare * 3}%`,
              background: "var(--bp-orange)",
            }}
          />
        </div>
        <span
          className="text-[9.5px] font-mono w-10 text-right shrink-0"
          style={{ color: "var(--bp-orange)" }}
        >
          {row.qtyShare}% Unit
        </span>
      </div>
    </div>
  </div>
);

const HList = ({ data, max, format, colorFrom, colorTo }) => (
  <div className="space-y-3">
    {data.map((d, i) => (
      <div key={i}>
        <div className="flex items-baseline justify-between mb-1">
          <span
            className="text-[12px] font-medium truncate pr-2"
            style={{ color: "var(--ink)" }}
          >
            {d.name}
          </span>
          <span
            className="text-[12px] font-bold font-mono whitespace-nowrap"
            style={{ color: "var(--ink)" }}
          >
            {format(d.value)}
          </span>
        </div>
        <div
          className="h-[7px] rounded-full overflow-hidden"
          style={{ background: "var(--bp-paper-line)" }}
        >
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

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */

const TABS = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "analisis", label: "Analisis Toko & Produk" },
  { id: "insight", label: "Insight & Metodologi" },
];

const Powerbi4Dashboardqi = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("ringkasan");

  const maxStoreRev = Math.max(...stores.map((s) => s.rev));
  const maxTopProd = Math.max(...topProducts.map((d) => d.value));
  const maxBottomProd = Math.max(...bottomProducts.map((d) => d.value));
  const maxBrand = Math.max(...topBrands.map((d) => d.value));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

        :root {
          --bp-navy: #0B2340;
          --bp-navy-dark: #071627;
          --bp-cyan: #37B6D8;
          --bp-orange: #F2711F;
          --bp-paper: #F4EFE4;
          --bp-paper-line: #E4DCC8;
          --ink: #16232E;
          --ink-soft: #5B6472;
        }
        @keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes growBar { from { width: 0%; } }
        @keyframes growUp { from { height: 0px !important; } }
        @keyframes dashMove { to { stroke-dashoffset: -24; } }
        .rise { animation: riseIn 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-lift:hover { transform: translateY(-3px); box-shadow: 0 10px 24px -12px rgba(11,35,64,0.35); }
        .blueprint-grid {
          background-image:
            linear-gradient(rgba(94,168,199,0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,168,199,0.16) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .tab-on { background: var(--bp-orange); color: #fff; }
        .tab-off { background: transparent; color: rgba(244,239,228,0.6); border: 1px solid rgba(244,239,228,0.25); }
        .tab-off:hover { border-color: var(--bp-cyan); color: var(--bp-cyan); }
        .paper-card { background: var(--bp-paper); border: 1px solid var(--bp-paper-line); }
      `}</style>

      <div
        className="min-h-screen"
        style={{
          background: "var(--bp-paper)",
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="rise inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity group"
            style={{ color: "var(--ink-soft)" }}
          >
            <span
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: "var(--bp-navy)", color: "var(--bp-cyan)" }}
            >
              <ArrowLeft size={15} />
            </span>
            Kembali ke Portfolio
          </button>

          {/* HERO — blueprint sheet */}
          <div
            className="rise rounded-xl overflow-hidden shadow-lg blueprint-grid"
            style={{ background: "var(--bp-navy)", animationDelay: "0.05s" }}
          >
            <div className="relative px-6 sm:px-10 pt-9 pb-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded border"
                  style={{
                    borderColor: "var(--bp-cyan)",
                    color: "var(--bp-cyan)",
                  }}
                >
                  Power BI · Retail Analytics
                </span>
                <Stamp text="Laporan Publik" />
              </div>

              <div className="flex items-start gap-3 mb-2">
                <HardHat
                  size={26}
                  style={{ color: "var(--bp-orange)" }}
                  className="mt-1 shrink-0"
                />
                <h1
                  className="text-3xl sm:text-4xl font-bold text-white leading-[1.05] uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Top Supply Indonesia
                  <br />
                  <span style={{ color: "var(--bp-cyan)" }}>
                    Sales Performance Dashboard
                  </span>
                </h1>
              </div>
              <p className="text-white/70 text-sm max-w-2xl leading-relaxed mt-3 ml-9">
                Dashboard penjualan ritel bahan bangunan lintas 7 toko di
                Indonesia — dibangun di Power BI dari 30.000 transaksi outbound
                (2020–2024), untuk memetakan performa toko, komposisi kategori
                produk, dan pergerakan harga rata-rata dari waktu ke waktu.
              </p>

              <div className="mt-7 ml-9 max-w-xl">
                <div className="text-white/60">
                  <DimLine
                    label={`${meta.periode} · ${meta.cabang} · ${meta.transaksi}`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 ml-9">
                <a
                  href={POWERBI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--bp-orange)", color: "#fff" }}
                >
                  Buka Dashboard Live
                  <ExternalLink size={14} />
                </a>
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-mono px-3 py-2.5 rounded-lg border"
                  style={{
                    borderColor: "rgba(244,239,228,0.25)",
                    color: "rgba(244,239,228,0.6)",
                  }}
                >
                  <Warehouse size={13} />
                  Medan · Bandung · Jayapura · Tasikmalaya · Denpasar · Surabaya
                  · Jakarta
                </span>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div
            className="rise flex flex-wrap gap-2"
            style={{ animationDelay: "0.08s" }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                  tab === t.id ? "tab-on" : "paper-card"
                }`}
                style={tab === t.id ? {} : { color: "var(--ink-soft)" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ══════════ TAB: RINGKASAN ══════════ */}
          {tab === "ringkasan" && (
            <div className="space-y-5">
              <div
                className="rise grid grid-cols-2 lg:grid-cols-4 gap-4 pt-1"
                style={{ animationDelay: "0.1s" }}
              >
                {kpis.map((k, i) => (
                  <SpecPlate key={i} item={k} />
                ))}
              </div>

              <div
                className="rise paper-card rounded-xl p-5"
                style={{ animationDelay: "0.14s" }}
              >
                <SectionEyebrow
                  index="A"
                  title="Tren Revenue Tahunan"
                  subtitle="Rp Miliar, dengan % YOY per tahun"
                />
                <YearBars />
              </div>

              <div
                className="rise paper-card rounded-xl overflow-hidden"
                style={{ animationDelay: "0.18s" }}
              >
                <div
                  className="flex items-center justify-between px-5 py-4 border-b"
                  style={{ borderColor: "var(--bp-paper-line)" }}
                >
                  <div>
                    <span
                      className="text-[12px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--ink)" }}
                    >
                      Dashboard Power BI — Live
                    </span>
                    <p
                      className="text-[10.5px] font-mono mt-0.5"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      Embed langsung dari laporan publik · scroll & filter aktif
                      di dalam frame
                    </p>
                  </div>
                  <a
                    href={POWERBI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border shrink-0"
                    style={{
                      borderColor: "var(--bp-paper-line)",
                      color: "var(--bp-orange)",
                    }}
                  >
                    Tab baru <ExternalLink size={11} />
                  </a>
                </div>
                <div
                  className="p-3"
                  style={{ background: "var(--bp-navy-dark)" }}
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <iframe
                      title="Top Supply Indonesia — Power BI Dashboard"
                      src={POWERBI_URL}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB: ANALISIS TOKO & PRODUK ══════════ */}
          {tab === "analisis" && (
            <div className="space-y-5">
              <div
                className="rise paper-card rounded-xl p-5"
                style={{ animationDelay: "0.05s" }}
              >
                <SectionEyebrow
                  index="B"
                  title="Performa 7 Toko"
                  subtitle="Diurutkan dari revenue tertinggi ke terendah, 2020–2024"
                />
                <div
                  className="divide-y"
                  style={{ borderColor: "var(--bp-paper-line)" }}
                >
                  {stores.map((s, i) => (
                    <StoreRow
                      key={s.name}
                      store={s}
                      max={maxStoreRev}
                      rank={i + 1}
                    />
                  ))}
                </div>
              </div>

              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.09s" }}
              >
                <div className="paper-card rounded-xl p-5">
                  <SectionEyebrow
                    index="C"
                    title="5 Produk Revenue Tertinggi"
                    subtitle="Rp Miliar"
                  />
                  <HList
                    data={topProducts}
                    max={maxTopProd}
                    format={(v) => `Rp${v.toFixed(2)}M`}
                    colorFrom="var(--bp-navy)"
                    colorTo="var(--bp-cyan)"
                  />
                </div>
                <div className="paper-card rounded-xl p-5">
                  <SectionEyebrow
                    index="D"
                    title="5 Produk Revenue Terendah"
                    subtitle="Rp Juta"
                  />
                  <HList
                    data={bottomProducts}
                    max={maxBottomProd}
                    format={(v) => `Rp${v.toFixed(1)}Jt`}
                    colorFrom="#C89B5C"
                    colorTo="var(--bp-orange)"
                  />
                </div>
              </div>

              <div
                className="rise paper-card rounded-xl p-5"
                style={{ animationDelay: "0.13s" }}
              >
                <SectionEyebrow
                  index="E"
                  title="Material Take-off — Revenue vs Unit per Kategori"
                  subtitle="Membandingkan kontribusi % revenue (cyan) dengan % unit terjual (oranye) — kategori dengan bar cyan jauh lebih panjang dari oranye adalah kategori nilai-tinggi"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
                  {takeoff.map((row) => (
                    <TakeoffRow key={row.name} row={row} />
                  ))}
                </div>
              </div>

              <div
                className="rise grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ animationDelay: "0.17s" }}
              >
                <div className="paper-card rounded-xl p-5">
                  <SectionEyebrow
                    index="F"
                    title="5 Brand Teratas"
                    subtitle="Rp Miliar"
                  />
                  <HList
                    data={topBrands}
                    max={maxBrand}
                    format={(v) => `Rp${v.toFixed(2)}M`}
                    colorFrom="var(--bp-navy)"
                    colorTo="var(--bp-cyan)"
                  />
                </div>
                <div className="paper-card rounded-xl p-5">
                  <SectionEyebrow
                    index="G"
                    title="Metode Pengambilan"
                    subtitle="Delivery vs Pickup"
                  />
                  <div className="flex items-center gap-6 h-full">
                    <div className="flex-1 space-y-4">
                      {deliverySplit.map((d) => (
                        <div key={d.label}>
                          <div className="flex items-baseline justify-between mb-1.5">
                            <span
                              className="text-[12.5px] font-bold"
                              style={{ color: "var(--ink)" }}
                            >
                              {d.label}
                            </span>
                            <span
                              className="text-[13px] font-mono font-bold"
                              style={{ color: d.color }}
                            >
                              {d.pct}%
                            </span>
                          </div>
                          <div
                            className="h-[10px] rounded-full overflow-hidden"
                            style={{ background: "var(--bp-paper-line)" }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${d.pct}%`,
                                background: d.color,
                                animation:
                                  "growBar 0.9s cubic-bezier(.22,.68,0,1.2) both",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <p
                        className="text-[11px] leading-relaxed pt-1"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Beban armada terbagi hampir rata — nyaris tidak ada
                        preferensi kuat pelanggan terhadap salah satu jalur
                        pemenuhan pesanan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB: INSIGHT & METODOLOGI ══════════ */}
          {tab === "insight" && (
            <div className="space-y-6">
              <div className="rise" style={{ animationDelay: "0.05s" }}>
                <SectionEyebrow
                  index={null}
                  title="Temuan Utama"
                  subtitle="Empat pola yang muncul konsisten dari data transaksi 2020–2024"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {insights.map((ins, i) => {
                    const Icon = ins.icon;
                    return (
                      <div
                        key={i}
                        className="paper-card rounded-xl p-5 card-lift"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              background: "var(--bp-navy)",
                              color: "var(--bp-cyan)",
                            }}
                          >
                            <Icon size={16} />
                          </span>
                          <span
                            className="text-[10px] font-mono font-bold tracking-[0.15em]"
                            style={{ color: "var(--bp-orange)" }}
                          >
                            {ins.tag}
                          </span>
                        </div>
                        <div
                          className="text-[14.5px] font-bold mb-1.5"
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            color: "var(--ink)",
                          }}
                        >
                          {ins.title}
                        </div>
                        <p
                          className="text-[12.5px] leading-relaxed"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          {ins.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rise" style={{ animationDelay: "0.09s" }}>
                <SectionEyebrow
                  index={null}
                  title="Rekomendasi Tindak Lanjut"
                  subtitle="Empat langkah konkret yang mengikuti langsung dari temuan di atas"
                />
                <div
                  className="paper-card rounded-xl divide-y overflow-hidden"
                  style={{ borderColor: "var(--bp-paper-line)" }}
                >
                  {recommendations.map((r, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-5"
                      style={{ borderColor: "var(--bp-paper-line)" }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono text-[12px] font-bold"
                        style={{
                          background: "var(--bp-orange)",
                          color: "#fff",
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div
                          className="text-[13.5px] font-bold mb-1"
                          style={{ color: "var(--ink)" }}
                        >
                          {r.title}
                        </div>
                        <p
                          className="text-[12.5px] leading-relaxed"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          {r.body}
                        </p>
                      </div>
                      <ChevronRight
                        size={16}
                        className="shrink-0 ml-auto mt-1"
                        style={{ color: "var(--bp-paper-line)" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rise" style={{ animationDelay: "0.13s" }}>
                <SectionEyebrow
                  index={null}
                  title="Alur Kerja Analisis"
                  subtitle="Dari data mentah transaksi hingga dashboard 3 halaman (Analytics, Detail, Detail 2)"
                />
                <div className="paper-card rounded-xl p-6">
                  {pipeline.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i}>
                        <div className="flex gap-4 py-3">
                          <div className="flex-shrink-0 flex flex-col items-center">
                            <span
                              className="w-9 h-9 rounded-lg flex items-center justify-center"
                              style={{
                                background: "var(--bp-navy)",
                                color: "var(--bp-cyan)",
                              }}
                            >
                              <Icon size={16} />
                            </span>
                            <span
                              className="text-[9px] font-mono font-bold mt-1"
                              style={{ color: "var(--bp-orange)" }}
                            >
                              REV.0{i + 1}
                            </span>
                          </div>
                          <div className="pt-1">
                            <div
                              className="text-[13.5px] font-bold"
                              style={{ color: "var(--ink)" }}
                            >
                              {step.title}
                            </div>
                            <p
                              className="text-[12.5px] leading-relaxed mt-1"
                              style={{ color: "var(--ink-soft)" }}
                            >
                              {step.desc}
                            </p>
                          </div>
                        </div>
                        {i !== pipeline.length - 1 && (
                          <div
                            className="ml-[18px] h-4 w-px"
                            style={{ background: "var(--bp-paper-line)" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="rise rounded-xl overflow-hidden blueprint-grid"
                style={{
                  background: "var(--bp-navy)",
                  animationDelay: "0.17s",
                }}
              >
                <div className="px-6 py-5 flex items-start gap-4">
                  <Hammer
                    size={22}
                    style={{ color: "var(--bp-orange)" }}
                    className="shrink-0 mt-1"
                  />
                  <div>
                    <div
                      className="text-white font-bold text-sm mb-1 uppercase tracking-wide"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      Kenapa dipecah per toko & kategori, bukan hanya total
                      nasional?
                    </div>
                    <p className="text-white/70 text-[12.5px] leading-relaxed max-w-2xl">
                      Angka total menyembunyikan dua hal penting: toko mana yang
                      butuh perhatian (Jakarta), dan kategori mana yang
                      sebenarnya menggerakkan margin (Sanitary & Door), bukan
                      sekadar volume (Tool). Slicer toko dan kategori di
                      dashboard memungkinkan tim merchandising mengecek keduanya
                      tanpa menunggu laporan bulanan.
                    </p>
                  </div>
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
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity group"
              style={{ color: "var(--ink-soft)" }}
            >
              <span
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{
                  background: "var(--bp-navy)",
                  color: "var(--bp-cyan)",
                }}
              >
                <ArrowLeft size={15} />
              </span>
              Kembali
            </button>
            <a
              href={POWERBI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold"
              style={{ color: "var(--bp-orange)" }}
            >
              Buka Dashboard Live <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Powerbi4Dashboardqi;
