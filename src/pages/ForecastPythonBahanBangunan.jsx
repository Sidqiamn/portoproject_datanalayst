import {
  Area,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Database,
  Calendar,
  Activity,
  Sliders,
  GitMerge,
  Target,
  Users,
  Ruler,
  CheckCircle2,
  Layers,
  Repeat,
  CloudRain,
  Building2,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Truck,
  Boxes,
  FileSpreadsheet,
  Gauge,
  ChevronRight,
  ExternalLink,
  Handshake,
  GitBranch,
  Radar,
  Wrench,
  Megaphone,
} from "lucide-react";

const NOTEBOOK_URL =
  "https://colab.research.google.com/drive/14pbapMZhAJf6-wCpn7gqqBwwRgZSfcJ2?usp=sharing";

/* ============================== DATA (diambil langsung dari output notebook) ============================== */

const acfData = [
  { lag: 1, value: -1.1 },
  { lag: 2, value: -0.5 },
  { lag: 3, value: 9.1 },
  { lag: 4, value: -4.9 },
  { lag: 5, value: 5.5 },
  { lag: 6, value: -2.3 },
  { lag: 7, value: 2.7 },
  { lag: 8, value: -8.4 },
  { lag: 9, value: -17.2 },
  { lag: 10, value: -26.2 },
  { lag: 11, value: 9.1 },
  { lag: 12, value: -5.2 },
];
const ACF_SIGNIFICANCE = 25.3; // 1.96/sqrt(60) dalam %

const sampleRaw = [
  { bulan: "Jan 2020", nilai: 1759958200 },
  { bulan: "Feb 2020", nilai: 1456073800 },
  { bulan: "Mar 2020", nilai: 1555050800 },
  { bulan: "Apr 2020", nilai: 2018008700 },
  { bulan: "Mei 2020", nilai: 1432463500 },
];

const modelComparison = [
  { model: "XGBoost", validation: 7.84, test: 7.53 },
  { model: "LightGBM", validation: 7.48, test: 6.11 },
  { model: "Ensemble", validation: 7.48, test: 6.11 },
];

const forecastData = [
  {
    bulan: "Jan '25",
    forecast: 1805688824,
    lower: 1567300743,
    upper: 2044076906,
  },
  {
    bulan: "Feb '25",
    forecast: 1589049785,
    lower: 1350661704,
    upper: 1827437866,
  },
  {
    bulan: "Mar '25",
    forecast: 1745193656,
    lower: 1506805575,
    upper: 1983581737,
  },
  {
    bulan: "Apr '25",
    forecast: 1658103570,
    lower: 1419715489,
    upper: 1896491651,
  },
  {
    bulan: "Mei '25",
    forecast: 1604346031,
    lower: 1365957950,
    upper: 1842734112,
  },
  {
    bulan: "Jun '25",
    forecast: 1569347616,
    lower: 1330959534,
    upper: 1807735697,
  },
].map((d) => ({ ...d, band: d.upper - d.lower }));

const gaugeData = [
  { name: "akurat", value: 93.89 },
  { name: "meleset", value: 6.11 },
];
const GAUGE_COLORS = ["#F2650C", "rgba(245,241,230,0.12)"];

const xgbParams = [
  ["n_estimators", "356"],
  ["max_depth", "3"],
  ["learning_rate", "0.178"],
  ["subsample", "0.769"],
  ["colsample_bytree", "0.852"],
  ["min_child_weight", "1"],
  ["reg_alpha", "1.935"],
  ["reg_lambda", "2.966"],
];
const lgbmParams = [
  ["n_estimators", "83"],
  ["max_depth", "2"],
  ["learning_rate", "0.044"],
  ["num_leaves", "6"],
  ["subsample", "0.871"],
  ["colsample_bytree", "0.838"],
  ["min_child_samples", "6"],
  ["reg_alpha", "1.324"],
  ["reg_lambda", "0.501"],
];

const featureGroups = [
  {
    title: "Kalender",
    icon: Calendar,
    items: [
      "year",
      "quarter",
      "month_num",
      "time_index",
      "month_sin",
      "month_cos",
    ],
  },
  {
    title: "Lag (angka masa lalu)",
    icon: Repeat,
    items: ["lag_1", "lag_2", "lag_3", "lag_6", "lag_12"],
  },
  {
    title: "Rolling (rata-rata bergerak)",
    icon: Activity,
    items: [
      "rolling_mean_3",
      "rolling_std_3",
      "rolling_mean_6",
      "rolling_mean_12",
    ],
  },
  {
    title: "Eksogen (data pendukung)",
    icon: Boxes,
    items: [
      "num_transactions",
      "avg_price_per_unit",
      "total_qty",
      "unique_customers",
      "unique_products",
      "delivery_ratio",
    ],
  },
];

/* ============================== HELPERS ============================== */

function formatRupiah(n, opts = {}) {
  const { short = true } = opts;
  const abs = Math.abs(n);
  if (short && abs >= 1e9)
    return `Rp ${(n / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 2 })} M`;
  if (short && abs >= 1e6)
    return `Rp ${(n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 0 })} jt`;
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "#0B1D33",
        border: "1px solid rgba(111,168,201,0.4)",
        borderRadius: 4,
        padding: "10px 14px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        color: "#F5F1E6",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ color: "#6FA8C9", marginBottom: 4, fontWeight: 600 }}>
        {label}
      </div>
      {payload
        .filter((p) => p.name !== "lower" && p.dataKey !== "band")
        .map((p, i) => (
          <div key={i}>
            {p.name}:{" "}
            <b>
              {typeof p.value === "number" && p.value > 1000
                ? formatRupiah(p.value)
                : `${p.value}%`}
            </b>
          </div>
        ))}
    </div>
  );
}

/* ============================== SMALL COMPONENTS ============================== */

function FigLabel({ n, children }) {
  return (
    <div className="fig-label">
      <span className="fig-tag">FIG. {n}</span>
      <span className="fig-line" />
      <span className="fig-caption">{children}</span>
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone = "default" }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <Icon size={18} strokeWidth={1.75} />
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function PipelineNode({ icon: Icon, num, title, desc, last }) {
  return (
    <div className="pipe-node">
      <div className="pipe-badge">
        <Icon size={20} strokeWidth={1.6} />
        <span className="pipe-num">{num}</span>
      </div>
      <div className="pipe-title">{title}</div>
      <div className="pipe-desc">{desc}</div>
      {!last && (
        <ChevronRight className="pipe-arrow" size={18} strokeWidth={1.5} />
      )}
    </div>
  );
}

function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

function ParamTable({ title, rows, accent }) {
  return (
    <div className="param-table" style={{ "--accent": accent }}>
      <div className="param-table-head">{title}</div>
      {rows.map(([k, v]) => (
        <div className="param-row" key={k}>
          <span className="param-key">{k}</span>
          <span className="param-val">{v}</span>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ icon: Icon, title, children, tone = "insight" }) {
  return (
    <div className={`insight-card tone-${tone}`}>
      <div className="insight-icon">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div>
        <div className="insight-title">{title}</div>
        <div className="insight-body">{children}</div>
      </div>
    </div>
  );
}

/* ============================== MAIN APP ============================== */

export default function ForecastPythonBahanBangunan() {
  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root{
          --navy:#0B1D33;
          --navy-2:#122A4A;
          --paper:#F5F1E6;
          --paper-line:rgba(20,33,61,0.09);
          --ink:#14213D;
          --ink-soft:#4B5A73;
          --cyan:#6FA8C9;
          --orange:#F2650C;
          --orange-soft:#FCEEE3;
          --green:#3E7C59;
          --green-soft:#E7F1EB;
          --amber:#C4770A;
          --amber-soft:#FBF0DA;
          --concrete:#CFC9BA;
        }
        *{box-sizing:border-box;}
        .page{
          font-family:'IBM Plex Sans', sans-serif;
          background:var(--paper);
          color:var(--ink);
          line-height:1.6;
          overflow-x:hidden;
        }
        h1,h2,h3{ font-family:'Space Grotesk', sans-serif; margin:0; letter-spacing:-0.01em; }
        p{ margin:0; }
        .mono{ font-family:'IBM Plex Mono', monospace; }

        /* ---------- generic section shells ---------- */
        .dark-section{ background:var(--navy); color:var(--paper); position:relative; }
        .dark-section::before{
          content:""; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(111,168,201,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,168,201,0.09) 1px, transparent 1px);
          background-size:36px 36px;
          pointer-events:none;
        }
        .light-section{ background:var(--paper); position:relative; }
        .inner{ max-width:1080px; margin:0 auto; padding:72px 28px; position:relative; z-index:1; }
        .inner.tight{ padding-top:48px; padding-bottom:48px; }

        .eyebrow{
          font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.14em;
          text-transform:uppercase; color:var(--orange); margin-bottom:10px; font-weight:600;
        }
        .dark-section .eyebrow{ color:#8DC3E0; }
        .section-head h2{ font-size:clamp(22px,3.4vw,32px); font-weight:700; margin-bottom:12px; }
        .section-head .lead{ max-width:640px; color:var(--ink-soft); font-size:15.5px; }
        .dark-section .section-head .lead{ color:#C7D4E4; }

        .fig-label{ display:flex; align-items:center; gap:10px; margin:6px 0 22px 0; }
        .fig-tag{ font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.08em; color:var(--orange); font-weight:600; white-space:nowrap; }
        .dark-section .fig-tag{ color:#F2A15E; }
        .fig-line{ flex:1; height:1px; background:repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 11px); color:var(--paper-line); }
        .dark-section .fig-line{ color:rgba(255,255,255,0.2); }
        .fig-caption{ font-size:12px; color:var(--ink-soft); font-family:'IBM Plex Mono',monospace; }
        .dark-section .fig-caption{ color:#9FB2C7; }

        /* ---------- HERO ---------- */
        .hero{ padding:88px 28px 40px; }
        .hero-top{ display:flex; justify-content:space-between; align-items:flex-start; gap:24px; flex-wrap:wrap; }
        .hero-kicker{
          display:inline-flex; align-items:center; gap:8px; font-family:'IBM Plex Mono',monospace;
          font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#8DC3E0;
          border:1px solid rgba(141,195,224,0.35); padding:6px 12px; border-radius:100px; margin-bottom:26px;
        }
        .hero h1{
          font-size:clamp(32px,5.4vw,54px); font-weight:700; max-width:820px; line-height:1.08; color:#fff;
        }
        .hero h1 span{ color:var(--orange); }
        .hero-sub{ max-width:600px; margin-top:20px; color:#C7D4E4; font-size:16.5px; }
        .notebook-btn{
          display:inline-flex; align-items:center; gap:8px; margin-top:24px;
          background:var(--orange); color:#fff; text-decoration:none;
          font-family:'IBM Plex Mono',monospace; font-size:13px; font-weight:600;
          padding:12px 18px; border-radius:6px; letter-spacing:0.02em;
          border:1px solid rgba(255,255,255,0.15); transition:transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow:0 6px 18px rgba(242,101,12,0.28);
        }
        .notebook-btn:hover{ transform:translateY(-1px); box-shadow:0 10px 22px rgba(242,101,12,0.38); }
        .notebook-btn.ghost{
          background:transparent; color:var(--orange); box-shadow:none;
          border:1px solid rgba(242,101,12,0.5);
        }
        .notebook-cta-row{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
        .hero-gauge{ text-align:center; min-width:200px; }
        .gauge-num{ font-family:'IBM Plex Mono',monospace; font-size:42px; font-weight:600; color:var(--orange); margin-top:-70px; }
        .gauge-label{ font-size:12px; color:#9FB2C7; text-transform:uppercase; letter-spacing:0.1em; margin-top:4px; }

        .hero-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:1px; background:rgba(255,255,255,0.12); margin-top:56px; border:1px solid rgba(255,255,255,0.12); border-radius:6px; overflow:hidden; }
        .hero-stat{ background:var(--navy-2); padding:18px 16px; }
        .hero-stat .v{ font-family:'IBM Plex Mono',monospace; font-size:20px; color:#fff; font-weight:600; }
        .hero-stat .l{ font-size:11.5px; color:#9FB2C7; margin-top:4px; text-transform:uppercase; letter-spacing:0.06em; }

        /* ---------- pipeline ---------- */
        .pipeline{ display:flex; align-items:flex-start; gap:6px; flex-wrap:wrap; margin-top:36px; }
        .pipe-node{ position:relative; flex:1 1 118px; min-width:118px; display:flex; flex-direction:column; align-items:center; text-align:center; padding:0 14px; }
        .pipe-badge{ width:52px; height:52px; border-radius:10px; border:1px solid rgba(242,101,12,0.5); background:rgba(242,101,12,0.08); display:flex; align-items:center; justify-content:center; color:var(--orange); position:relative; margin-bottom:10px; }
        .pipe-num{ position:absolute; top:-8px; right:-8px; background:var(--orange); color:var(--navy); font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:700; width:18px; height:18px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .pipe-title{ font-size:12.5px; font-weight:600; color:#fff; margin-bottom:4px; }
        .pipe-desc{ font-size:11px; color:#9FB2C7; line-height:1.4; }
        .pipe-arrow{ position:absolute; right:-11px; top:16px; color:rgba(242,101,12,0.45); }
        @media (max-width:820px){ .pipe-arrow{ display:none; } }

        /* ---------- stat card grid ---------- */
        .stat-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; margin-top:28px; }
        .stat-card{ background:#fff; border:1px solid var(--paper-line); border-radius:8px; padding:16px 18px; color:var(--orange); }
        .stat-card .stat-value{ font-family:'IBM Plex Mono',monospace; font-size:22px; font-weight:600; color:var(--ink); margin-top:10px; }
        .stat-card .stat-label{ font-size:12px; color:var(--ink-soft); margin-top:2px; }
        .stat-card .stat-sub{ font-size:11px; color:var(--ink-soft); opacity:0.75; margin-top:2px; }
        .tone-green{ color:var(--green); } .tone-amber{ color:var(--amber); }

        /* ---------- charts wrapper ---------- */
        .chart-box{ background:#fff; border:1px solid var(--paper-line); border-radius:10px; padding:22px 18px 10px; margin-top:18px; }
        .dark-section .chart-box{ background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.12); }

        /* ---------- two column ---------- */
        .two-col{ display:grid; grid-template-columns:1.1fr 1fr; gap:32px; align-items:start; }
        @media (max-width:820px){ .two-col{ grid-template-columns:1fr; } }

        /* ---------- explainer box ---------- */
        .explain{ background:var(--orange-soft); border-left:3px solid var(--orange); border-radius:0 8px 8px 0; padding:16px 18px; font-size:14px; color:#7A3B0D; margin-top:16px; }
        .explain b{ color:#5C2C08; }
        .dark-section .explain{ background:rgba(242,101,12,0.1); border-left-color:var(--orange); color:#F5D3B4; }
        .dark-section .explain b{ color:#fff; }

        /* ---------- feature chips ---------- */
        .feat-groups{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; margin-top:24px; }
        .feat-group{ background:#fff; border:1px solid var(--paper-line); border-radius:10px; padding:16px; }
        .feat-group-head{ display:flex; align-items:center; gap:8px; color:var(--orange); font-weight:600; font-size:13.5px; margin-bottom:10px; }
        .chip{ display:inline-block; font-family:'IBM Plex Mono',monospace; font-size:11px; background:var(--paper); border:1px solid var(--paper-line); color:var(--ink-soft); padding:4px 8px; border-radius:5px; margin:3px 4px 0 0; }

        /* ---------- walk forward diagram ---------- */
        .wf-wrap{ background:#fff; border:1px solid var(--paper-line); border-radius:10px; padding:24px 20px; margin-top:20px; }
        .wf-row{ display:flex; align-items:center; gap:14px; margin-bottom:10px; }
        .wf-row-label{ font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--ink-soft); width:96px; flex-shrink:0; }
        .wf-cells{ display:flex; gap:3px; flex:1; }
        .wf-cell{ height:16px; flex:1; border-radius:2px; background:var(--paper-line); }
        .wf-cell.train{ background:var(--cyan); opacity:0.55; }
        .wf-cell.pred{ background:var(--orange); }
        .wf-legend{ display:flex; gap:18px; margin-top:14px; font-size:11.5px; color:var(--ink-soft); flex-wrap:wrap; }
        .wf-legend span{ display:inline-flex; align-items:center; gap:6px; }
        .wf-dot{ width:10px; height:10px; border-radius:2px; display:inline-block; }

        /* ---------- param tables ---------- */
        .param-tables{ display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin-top:22px; }
        .param-table{ background:#fff; border:1px solid var(--paper-line); border-top:3px solid var(--accent); border-radius:8px; overflow:hidden; }
        .param-table-head{ padding:12px 16px; font-weight:600; font-size:13.5px; background:var(--paper); }
        .param-row{ display:flex; justify-content:space-between; padding:8px 16px; font-size:12.5px; border-top:1px solid var(--paper-line); }
        .param-key{ font-family:'IBM Plex Mono',monospace; color:var(--ink-soft); }
        .param-val{ font-family:'IBM Plex Mono',monospace; font-weight:600; }

        /* ---------- champion badge ---------- */
        .champion-banner{ display:flex; align-items:center; gap:16px; background:var(--green-soft); border:1px solid rgba(62,124,89,0.3); border-radius:10px; padding:18px 22px; margin-top:24px; flex-wrap:wrap; }
        .champion-banner .cb-icon{ color:var(--green); flex-shrink:0; }
        .champion-banner b{ color:var(--green); }

        /* ---------- insight cards ---------- */
        .insight-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; margin-top:24px; }
        .insight-card{ display:flex; gap:14px; background:var(--navy-2); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:18px; }
        .insight-card .insight-icon{ color:var(--orange); flex-shrink:0; margin-top:2px; }
        .insight-card .insight-title{ font-weight:600; font-size:14px; color:#fff; margin-bottom:6px; }
        .insight-card .insight-body{ font-size:13px; color:#B9C7D9; line-height:1.55; }
        .tone-rekomendasi{ border-left:3px solid var(--orange); }
        .insight-grid.biz .insight-card,
        .insight-card.tone-biz{
          background:#fff; border:1px solid var(--paper-line); border-left:3px solid var(--green);
        }
        .insight-card.tone-biz .insight-icon{ color:var(--green); }
        .insight-card.tone-biz .insight-title{ color:var(--ink); }
        .insight-card.tone-biz .insight-body{ color:var(--ink-soft); }

        .cta-band{
          margin-top:34px; display:flex; align-items:center; justify-content:space-between; gap:20px;
          background:rgba(242,101,12,0.08); border:1px solid rgba(242,101,12,0.3); border-radius:10px;
          padding:20px 24px; flex-wrap:wrap;
        }
        .cta-band-title{ font-weight:600; color:#fff; font-size:14.5px; margin-bottom:4px; }
        .cta-band-sub{ font-size:12.5px; color:#B9C7D9; max-width:480px; }

        .muted-section{ background:#EAE5D6; border-top:1px dashed var(--paper-line); }
        .model-section-tag{
          display:inline-flex; align-items:center; gap:6px; font-family:'IBM Plex Mono',monospace;
          font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-soft);
          border:1px dashed var(--ink-soft); border-radius:100px; padding:5px 12px; margin-bottom:14px;
        }
        .model-section-title{ font-size:20px; font-weight:700; margin-bottom:8px; }
        .model-section-lead{ font-size:13.5px; color:var(--ink-soft); max-width:640px; margin-bottom:8px; }
        .insight-grid.model-grid .insight-card,
        .insight-card.tone-model{
          background:transparent; border:1px dashed rgba(20,33,61,0.25); box-shadow:none;
        }
        .insight-card.tone-model .insight-icon{ color:var(--ink-soft); }
        .insight-card.tone-model .insight-title{ color:var(--ink); font-size:13.5px; }
        .insight-card.tone-model .insight-body{ color:var(--ink-soft); font-size:12.5px; }

        /* ---------- footer ---------- */
        .footer{ padding:36px 28px; text-align:center; font-size:12px; color:var(--ink-soft); font-family:'IBM Plex Mono',monospace; background:var(--paper); border-top:1px solid var(--paper-line); }

        table.simple{ width:100%; border-collapse:collapse; margin-top:16px; font-size:13px; }
        table.simple th{ text-align:left; font-family:'IBM Plex Mono',monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; color:var(--ink-soft); border-bottom:1px solid var(--paper-line); padding:8px 10px; }
        table.simple td{ padding:9px 10px; border-bottom:1px solid var(--paper-line); font-family:'IBM Plex Mono',monospace; }
        table.simple tr:last-child td{ border-bottom:none; }
      `}</style>

      {/* ============================== HERO ============================== */}
      <section className="dark-section">
        <div className="inner hero">
          <div className="hero-top">
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className="hero-kicker">
                <Building2 size={13} /> Toko Bahan Bangunan · Forecasting ML
              </div>
              <h1>
                Meramal <span>Total Penjualan</span> Bulanan Pakai Machine
                Learning
              </h1>
              <p className="hero-sub">
                Penjelasan lengkap — dari data mentah 30.000 transaksi sampai
                hasil ramalan 6 bulan ke depan — ditulis supaya bisa dipahami
                tanpa harus paham coding atau statistik.
              </p>
              <a
                className="notebook-btn"
                href={NOTEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={15} /> Buka Notebook (Google Colab)
              </a>
            </div>
            <div className="hero-gauge">
              <ResponsiveContainer width={200} height={130}>
                <PieChart>
                  <Pie
                    data={gaugeData}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={68}
                    outerRadius={92}
                    dataKey="value"
                    stroke="none"
                  >
                    {gaugeData.map((d, i) => (
                      <Cell key={i} fill={GAUGE_COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="gauge-num">93,9%</div>
              <div className="gauge-label">akurasi (test MAPE 6,11%)</div>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="v">30.000</div>
              <div className="l">baris transaksi</div>
            </div>
            <div className="hero-stat">
              <div className="v">2020–2024</div>
              <div className="l">rentang data (60 bulan)</div>
            </div>
            <div className="hero-stat">
              <div className="v">2</div>
              <div className="l">model: XGBoost & LightGBM</div>
            </div>
            <div className="hero-stat">
              <div className="v">6,11%</div>
              <div className="l">MAPE akhir (test)</div>
            </div>
            <div className="hero-stat">
              <div className="v">6 bulan</div>
              <div className="l">horizon ramalan</div>
            </div>
          </div>

          <FigLabel n="01">
            Alur kerja end-to-end model — 7 tahap utama
          </FigLabel>
          <div className="pipeline">
            <PipelineNode
              icon={Database}
              num={1}
              title="Data Mentah"
              desc="30.000 transaksi harian, 2020–2024"
            />
            <PipelineNode
              icon={Layers}
              num={2}
              title="Agregasi Bulanan"
              desc="Digabung jadi 60 titik data/bulan"
            />
            <PipelineNode
              icon={Activity}
              num={3}
              title="Diagnosis"
              desc="Cek pola & stabilitas data"
            />
            <PipelineNode
              icon={Sliders}
              num={4}
              title="Feature Engineering"
              desc="21 fitur dari histori & kalender"
            />
            <PipelineNode
              icon={Target}
              num={5}
              title="Tuning & Backtest"
              desc="Uji simulasi 12x, 60 kombinasi"
            />
            <PipelineNode
              icon={GitMerge}
              num={6}
              title="Ensemble"
              desc="Gabungkan XGBoost + LightGBM"
            />
            <PipelineNode
              icon={TrendingUp}
              num={7}
              title="Forecast"
              desc="Ramalan 6 bulan + rentang"
              last
            />
          </div>
        </div>
      </section>

      {/* ============================== APA ITU FORECASTING ============================== */}
      <section className="light-section">
        <div className="inner">
          <SectionHead
            eyebrow="Konsep Dasar"
            title="Apa yang sebenarnya sedang diprediksi?"
            lead="Model ini mencoba menjawab satu pertanyaan sederhana: 'Kira-kira berapa total penjualan toko bulan depan?' — persis seperti BMKG meramal cuaca, tapi datanya angka rupiah, bukan suhu udara."
          />
          <div className="two-col" style={{ marginTop: 24 }}>
            <div>
              <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>
                Alih-alih menebak, model belajar dari pola 5 tahun transaksi
                terakhir: kapan penjualan biasanya naik, kapan turun, dan
                seberapa besar hubungan antara satu bulan dengan bulan-bulan
                sebelumnya. Dua "otak" yang dipakai adalah <b>XGBoost</b> dan{" "}
                <b>LightGBM</b> — dua algoritma machine learning berbasis
                <i> decision tree</i> (pohon keputusan) yang terkenal akurat
                untuk data tabel/angka seperti ini, dan sering menjadi juara di
                kompetisi data science.
              </p>
              <div className="explain">
                <b>Kenapa forecasting penting buat toko bahan bangunan?</b>{" "}
                Supaya pemilik toko bisa merencanakan stok barang, arus kas, dan
                jadwal pengadaan dari supplier — tanpa harus menebak-nebak atau
                kaget kehabisan/kelebihan stok di bulan tertentu.
              </div>
            </div>
            <div className="chart-box">
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-soft)",
                  marginBottom: 6,
                  fontFamily: "'IBM Plex Mono',monospace",
                }}
              >
                Contoh 5 bulan pertama data mentah (sebelum diolah)
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sampleRaw}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--paper-line)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="bulan"
                    tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => formatRupiah(v)}
                    tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="nilai"
                    name="Total Sales"
                    fill="#6FA8C9"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== DATASET ============================== */}
      <section className="light-section" style={{ background: "#EFEAdb20" }}>
        <div className="inner tight">
          <SectionHead
            eyebrow="Tahap 1–2"
            title="Dari 30.000 transaksi jadi 60 titik data bulanan"
          />
          <p
            style={{
              color: "var(--ink-soft)",
              fontSize: 14.5,
              maxWidth: 700,
              marginTop: 8,
            }}
          >
            Data asli berisi transaksi harian per produk (nama barang, brand,
            harga, jumlah beli, kasir, dsb). Karena tujuannya meramal{" "}
            <b>total penjualan per bulan</b>, semua transaksi dalam satu bulan
            dijumlahkan (agregasi) menjadi satu angka{" "}
            <span className="mono">total_sales</span>, ditemani beberapa angka
            pendukung lain.
          </p>
          <div className="stat-grid">
            <StatCard icon={Database} value="30.000" label="Baris transaksi" />
            <StatCard
              icon={Calendar}
              value="60 bulan"
              label="Jan 2020 – Des 2024"
            />
            <StatCard
              icon={CheckCircle2}
              value="0"
              label="Data kosong / hilang"
              tone="green"
            />
            <StatCard
              icon={Ruler}
              value="10,2%"
              label="Variasi bulanan (CoV)"
              sub="relatif stabil"
            />
            <StatCard
              icon={Users}
              value="171+"
              label="Pelanggan unik/bulan (contoh)"
            />
          </div>
        </div>
      </section>

      {/* ============================== DIAGNOSIS ============================== */}
      <section className="dark-section">
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 3"
            title="Diagnosis: Seberapa 'bisa ditebak' pola penjualan ini?"
            lead="Sebelum melatih model, data diperiksa dulu layaknya dokter memeriksa pasien — supaya tahu ekspektasi hasil yang realistis dan fitur apa yang perlu disiapkan."
          />
          <div className="two-col" style={{ marginTop: 20 }}>
            <div>
              <FigLabel n="02">
                Uji ADF (Augmented Dickey-Fuller) — kestabilan tren
              </FigLabel>
              <p style={{ fontSize: 14, color: "#C7D4E4" }}>
                Hasil: <b style={{ color: "#fff" }}>p-value ≈ 0,0000</b> → data
                dinyatakan <b style={{ color: "#fff" }}>stasioner</b>. Artinya,
                secara rata-rata jangka panjang, penjualan toko{" "}
                <b>tidak sedang naik atau turun drastis</b> — seperti permukaan
                kolam yang tenang, hanya beriak naik-turun tiap bulan di sekitar
                level yang sama (rata-rata ≈ {formatRupiah(1654245100)}/bulan).
              </p>
              <div className="explain" style={{ marginTop: 18 }}>
                <b>Kesimpulan diagnosis:</b> autokorelasi (hubungan antar bulan)
                tergolong lemah dan pola musiman relatif kecil. Ini artinya
                sinyal historis murni yang bisa "dihafal" model itu terbatas —
                kunci menekan error bukan menambah kompleksitas model, tapi{" "}
                <b>regularisasi kuat + tuning yang divalidasi dengan benar</b>,
                supaya model tidak "menghafal noise" dari data latih yang hanya
                ~48 baris.
              </div>
            </div>
            <div className="chart-box">
              <div
                style={{
                  fontSize: 12,
                  color: "#9FB2C7",
                  marginBottom: 6,
                  fontFamily: "'IBM Plex Mono',monospace",
                }}
              >
                Autokorelasi per bulan mundur (lag 1–12)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={acfData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="lag"
                    tick={{
                      fontSize: 10,
                      fill: "#9FB2C7",
                      fontFamily: "IBM Plex Mono",
                    }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "lag (bulan)",
                      position: "insideBottom",
                      offset: -4,
                      fontSize: 10,
                      fill: "#9FB2C7",
                    }}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "#9FB2C7",
                      fontFamily: "IBM Plex Mono",
                    }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                    width={40}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine
                    y={ACF_SIGNIFICANCE}
                    stroke="#F2650C"
                    strokeDasharray="4 3"
                    strokeWidth={1}
                  />
                  <ReferenceLine
                    y={-ACF_SIGNIFICANCE}
                    stroke="#F2650C"
                    strokeDasharray="4 3"
                    strokeWidth={1}
                  />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" />
                  <Bar
                    dataKey="value"
                    name="Autokorelasi"
                    radius={[2, 2, 2, 2]}
                  >
                    {acfData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={
                          Math.abs(d.value) > ACF_SIGNIFICANCE
                            ? "#F2650C"
                            : "#6FA8C9"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11.5, color: "#9FB2C7", marginTop: 6 }}>
                Garis putus-putus oranye = batas signifikan 95%. Hampir semua
                batang di dalam batas → korelasi antar bulan lemah, jadi model
                butuh fitur tambahan, bukan cuma "menebak dari histori".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURE ENGINEERING ============================== */}
      <section className="light-section">
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 4"
            title="Feature Engineering: bahan baku yang 'dimakan' model"
            lead="Karena histori mentah saja sinyalnya lemah (lihat diagnosis di atas), 21 fitur dibuat dari data yang ada supaya model punya lebih banyak petunjuk untuk belajar."
          />
          <div className="feat-groups">
            {featureGroups.map((g) => (
              <div className="feat-group" key={g.title}>
                <div className="feat-group-head">
                  <g.icon size={16} /> {g.title}
                </div>
                <div>
                  {g.items.map((it) => (
                    <Chip key={it}>{it}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="explain" style={{ marginTop: 20 }}>
            <b>Dalam bahasa sederhana:</b> "lag" itu seperti mengintip angka
            penjualan 1, 2, 3, 6, atau 12 bulan lalu. "Rolling" itu rata-rata
            bergerak — mirip rata-rata rapor 3 bulan terakhir, bukan cuma nilai
            bulan kemarin. "month_sin/month_cos" adalah trik matematika supaya
            model paham bahwa Desember dan Januari itu "bersebelahan" dalam
            siklus tahunan, bukan angka 12 dan 1 yang jauh. Semua fitur ini
            dihitung dari data <i>sebelum</i> bulan yang diramal — jadi tidak
            ada "bocoran masa depan" (data leakage).
          </div>
        </div>
      </section>

      {/* ============================== BACKTESTING ============================== */}
      <section className="light-section" style={{ background: "#F0ECE0" }}>
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 5a"
            title="Walk-forward Backtesting: ujian simulasi berkali-kali"
            lead="Standar industri (dipakai kompetisi M4/M5, Amazon Forecast, Uber): model diuji memprediksi 1 bulan ke depan, lalu 'waktu' digeser maju satu bulan, diulang — bukan cuma 1x ujian akhir."
          />
          <div className="wf-wrap">
            <div className="wf-row">
              <span className="wf-row-label">Simulasi #1</span>
              <div className="wf-cells">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`wf-cell ${i < 8 ? "train" : i === 8 ? "pred" : ""}`}
                  />
                ))}
              </div>
            </div>
            <div className="wf-row">
              <span className="wf-row-label">Simulasi #2</span>
              <div className="wf-cells">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`wf-cell ${i < 9 ? "train" : i === 9 ? "pred" : ""}`}
                  />
                ))}
              </div>
            </div>
            <div className="wf-row">
              <span className="wf-row-label">… diulang 12x</span>
              <div className="wf-cells">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`wf-cell ${i < 11 ? "train" : "pred"}`}
                  />
                ))}
              </div>
            </div>
            <div className="wf-legend">
              <span>
                <i
                  className="wf-dot"
                  style={{ background: "var(--cyan)", opacity: 0.55 }}
                />{" "}
                Data latih (train)
              </span>
              <span>
                <i className="wf-dot" style={{ background: "var(--orange)" }} />{" "}
                Bulan yang diramal & dicek akurasinya
              </span>
            </div>
          </div>
          <p
            style={{
              fontSize: 13.5,
              color: "var(--ink-soft)",
              marginTop: 14,
              maxWidth: 700,
            }}
          >
            Dari 48 baris data siap-model, <b>12 bulan</b> dipakai sebagai{" "}
            <b>validation window</b> (khusus untuk memilih setelan/parameter
            terbaik) dan <b>12 bulan terakhir</b> dipakai sebagai{" "}
            <b>test window</b> yang hanya disentuh <b>satu kali di akhir</b>{" "}
            untuk melaporkan hasil final — supaya angka akurasi yang dilaporkan
            benar-benar jujur, bukan hasil "mengintip jawaban" duluan.
          </p>
        </div>
      </section>

      {/* ============================== TUNING ============================== */}
      <section className="dark-section">
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 5b"
            title="Hyperparameter Tuning: mencari 'resep' terbaik"
            lead="Alih-alih menebak setelan model, 60 kombinasi parameter dicoba secara acak-terstruktur (Randomized Search) untuk tiap algoritma, dan masing-masing kombinasi diuji dengan 12 simulasi walk-forward di atas — total ratusan kali eksperimen mini, tapi hanya di validation window."
          />
          <div className="param-tables">
            <ParamTable
              title="🔧 XGBoost — parameter terbaik (val MAPE 7,84%)"
              rows={xgbParams}
              accent="#F2650C"
            />
            <ParamTable
              title="🔧 LightGBM — parameter terbaik (val MAPE 7,48%)"
              rows={lgbmParams}
              accent="#3E7C59"
            />
          </div>
          <div className="explain" style={{ marginTop: 18 }}>
            Perhatikan: <span className="mono">max_depth</span> dan{" "}
            <span className="mono">num_leaves</span> dibuat kecil, ditambah{" "}
            <span className="mono">reg_alpha/reg_lambda</span> (regularisasi)
            yang cukup besar. Ini sengaja — karena data latih cuma ~36-48 baris,
            pohon keputusan yang terlalu "dalam" akan menghafal data alih-alih
            belajar pola, sehingga hasilnya bagus di latihan tapi jelek di dunia
            nyata (overfitting).
          </div>
        </div>
      </section>

      {/* ============================== ENSEMBLE ============================== */}
      <section className="light-section">
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 6"
            title="Ensemble: menggabungkan 'pendapat' dua model"
            lead="Ensemble = mencampur prediksi XGBoost dan LightGBM dengan bobot w·XGBoost + (1-w)·LightGBM, dicari otomatis supaya MAPE di validation window paling rendah — teknik umum di kompetisi forecasting untuk menurunkan variansi prediksi."
          />
          <div className="champion-banner">
            <GitMerge className="cb-icon" size={26} />
            <div>
              Bobot optimal yang ditemukan: <b>XGBoost = 0%</b>,{" "}
              <b>LightGBM = 100%</b>. Artinya untuk kasus ini, campuran terbaik
              ternyata adalah <b>LightGBM murni</b> — sistem secara jujur
              "memilih" ini karena performanya memang lebih baik sendirian,
              bukan karena dipaksa dicampur.
            </div>
          </div>
        </div>
      </section>

      {/* ============================== COMPARISON / CHAMPION ============================== */}
      <section className="light-section" style={{ background: "#F0ECE0" }}>
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 8"
            title="Model Champion: LightGBM (tuned)"
            lead="Tiga kandidat dibandingkan pakai MAPE (Mean Absolute Percentage Error) — rata-rata persentase selisih prediksi dari angka penjualan yang sebenarnya. Makin rendah, makin akurat."
          />
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={modelComparison} barGap={6}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--paper-line)"
                  vertical={false}
                />
                <XAxis
                  dataKey="model"
                  tick={{ fontSize: 12, fontFamily: "IBM Plex Mono" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  unit="%"
                  tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, fontFamily: "IBM Plex Mono" }}
                />
                <Bar
                  dataKey="validation"
                  name="MAPE Validasi"
                  fill="#6FA8C9"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="test"
                  name="MAPE Test (final)"
                  fill="#F2650C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="two-col" style={{ marginTop: 24 }}>
            <div className="explain">
              <b>Kenapa LightGBM (bukan XGBoost) yang dipilih?</b> Karena MAPE
              validasinya paling rendah (7,48%) di antara ketiganya, lalu
              dikonfirmasi ulang di test window (data yang sama sekali belum
              pernah dilihat proses pemilihan model) dan hasilnya{" "}
              <b>tetap bagus: 6,11%</b>.
            </div>
            <div className="explain">
              <b>
                Kenapa selisih validasi (7,48%) vs test (6,11%) itu kabar baik?
              </b>{" "}
              Selisih yang kecil menandakan parameter yang dipilih{" "}
              <b>tidak overfitting</b> ke satu periode tertentu — performa di
              data baru bisa dipercaya sebagai gambaran performa nyata di masa
              depan, bukan kebetulan.
            </div>
          </div>

          <FigLabel n="03">Cara membaca MAPE 6,11%</FigLabel>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", maxWidth: 700 }}>
            Kalau rata-rata penjualan bulanan sekitar{" "}
            <b>{formatRupiah(1654245100)}</b>, maka MAPE 6,11% berarti rata-rata
            prediksi model meleset kira-kira{" "}
            <b>{formatRupiah(1654245100 * 0.0611)}</b> saja dari angka
            sebenarnya — atau dengan kata lain, model ini <b>±93,9% akurat</b>{" "}
            secara rata-rata. Untuk data penjualan bulanan dengan pola musiman
            lemah seperti ini, angka tersebut tergolong{" "}
            <b>baik dan realistis</b>
            (bukan hasil overfitting, karena divalidasi dengan rolling-origin
            backtest + test window terpisah).
          </p>
        </div>
      </section>

      {/* ============================== FORECAST ============================== */}
      <section className="dark-section">
        <div className="inner">
          <SectionHead
            eyebrow="Tahap 12–13"
            title="Hasil Akhir: Ramalan 6 Bulan ke Depan"
            lead="Forecast dilakukan secara rekursif — prediksi Januari dipakai sebagai 'histori' untuk meramal Februari, dst. Rentang 95% dihitung dari simpangan residual model champion di test window."
          />
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={forecastData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="bulan"
                  tick={{
                    fontSize: 11,
                    fill: "#9FB2C7",
                    fontFamily: "IBM Plex Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => formatRupiah(v)}
                  tick={{
                    fontSize: 10,
                    fill: "#9FB2C7",
                    fontFamily: "IBM Plex Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                  domain={["dataMin - 100000000", "dataMax + 100000000"]}
                />
                <Tooltip content={<ChartTooltip />} />
                <ReferenceLine
                  y={1654245100}
                  stroke="#6FA8C9"
                  strokeDasharray="4 4"
                  label={{
                    value: "rata-rata historis",
                    position: "insideTopLeft",
                    fontSize: 10,
                    fill: "#6FA8C9",
                  }}
                />
                <Area
                  dataKey="lower"
                  stackId="ci"
                  stroke="none"
                  fill="transparent"
                />
                <Area
                  dataKey="band"
                  stackId="ci"
                  stroke="none"
                  fill="#F2650C"
                  fillOpacity={0.16}
                  name="Rentang 95%"
                />
                <Line
                  dataKey="forecast"
                  name="Forecast"
                  stroke="#F2650C"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#F2650C" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <table className="simple" style={{ marginTop: 22, color: "#fff" }}>
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Forecast</th>
                <th>Batas Bawah 95%</th>
                <th>Batas Atas 95%</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((d) => (
                <tr key={d.bulan}>
                  <td style={{ color: "#C7D4E4" }}>{d.bulan}</td>
                  <td style={{ color: "#F2650C", fontWeight: 600 }}>
                    {formatRupiah(d.forecast)}
                  </td>
                  <td style={{ color: "#9FB2C7" }}>{formatRupiah(d.lower)}</td>
                  <td style={{ color: "#9FB2C7" }}>{formatRupiah(d.upper)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11.5, color: "#9FB2C7", marginTop: 10 }}>
            Rentang 95% (area oranye) bukan tanda ketidakpastian model "lemah" —
            ini justru praktik standar production-grade forecasting: memberi
            gambaran <i>worst case</i> dan <i>best case</i>, bukan cuma satu
            angka tunggal yang terkesan pasti.
          </p>
        </div>
      </section>

      {/* ============================== INSIGHT BISNIS ============================== */}
      <section className="dark-section" style={{ background: "#0A1830" }}>
        <div className="inner">
          <SectionHead
            eyebrow="Sudut Pandang Data Analyst"
            title="Insight Bisnis"
            lead="Membaca hasil model bukan cuma soal angka MAPE — tapi apa artinya untuk keputusan operasional toko sehari-hari."
          />

          <div className="insight-grid" style={{ marginTop: 24 }}>
            <InsightCard
              icon={Gauge}
              title="Penjualan relatif stabil, bukan musiman ekstrem"
            >
              Variasi bulanan hanya <b>10,2%</b> (coefficient of variation) dan
              komponen musiman berkisar ±Rp150 jutaan dari rata-rata Rp1,65 M.
              Toko ini <b>tidak</b> punya pola "high season vs low season" yang
              tajam seperti bisnis fashion/retail musiman — permintaan bahan
              bangunan cenderung konsisten sepanjang tahun.
            </InsightCard>
            <InsightCard
              icon={Activity}
              title="Penjualan bulan ini tidak sepenuhnya mengikuti pola bulan lalu"
            >
              Hubungan antar-bulan tergolong lemah, artinya penjualan bulan
              berjalan <b>tidak banyak bisa ditebak</b> hanya dari melihat tren
              bulan-bulan sebelumnya. Faktor di luar data toko — proyek
              konstruksi, cuaca, harga bahan baku — kemungkinan berperan lebih
              besar daripada "musim" itu sendiri.
            </InsightCard>
            <InsightCard
              icon={TrendingDown}
              title="Forecast Jan–Jun 2025: cenderung menurun lalu stabil"
            >
              Ramalan dibuka tinggi di Januari (~{formatRupiah(1805688824)})
              lalu turun dan bergerak di kisaran {formatRupiah(1569347616)}–
              {formatRupiah(1745193656)} pada bulan-bulan berikutnya — sedikit
              di bawah rata-rata historis 5 tahun. Ini sinyal awal untuk
              waspada, bukan alarm — tetap dalam rentang wajar (lihat pita 95%
              pada grafik forecast).
            </InsightCard>
            <InsightCard
              icon={CheckCircle2}
              title="Angka ini teruji jujur, layak dipegang untuk perencanaan"
            >
              Selisih tipis antara akurasi di data uji-coba dan data final (MAPE
              7,48% vs 6,11%) menunjukkan hasil bukan kebetulan. Artinya
              forecast ini cukup bisa diandalkan sebagai pegangan perencanaan,
              bukan sekadar angka optimis di atas kertas.
            </InsightCard>
          </div>

          <div className="cta-band">
            <div>
              <div className="cta-band-title">
                Ingin lihat proses & kode lengkapnya?
              </div>
              <div className="cta-band-sub">
                Seluruh langkah di halaman ini — mulai dari data mentah sampai
                kode training model — ada di notebook aslinya.
              </div>
            </div>
            <a
              className="notebook-btn"
              href={NOTEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={15} /> Buka Notebook
            </a>
          </div>
        </div>
      </section>

      {/* ============================== REKOMENDASI BISNIS ============================== */}
      <section className="light-section">
        <div className="inner">
          <SectionHead
            eyebrow="Rekomendasi"
            title="Rekomendasi untuk Operasional Toko"
            lead="Langkah konkret yang bisa langsung dijalankan tim toko/manajemen berdasarkan hasil forecast di atas."
          />
          <div className="insight-grid biz">
            <InsightCard
              tone="biz"
              icon={PiggyBank}
              title="Pakai rentang, bukan angka tunggal, untuk anggaran"
            >
              Gunakan <b>batas bawah 95%</b> sebagai skenario konservatif saat
              menyusun anggaran kas, dan
              <b> batas atas 95%</b> untuk menentukan stok pengaman (safety
              stock) maksimum — hindari komitmen pembelian besar hanya
              berdasarkan satu angka forecast.
            </InsightCard>
            <InsightCard
              tone="biz"
              icon={Boxes}
              title="Sederhanakan kebijakan stok bulanan"
            >
              Karena permintaan relatif stabil sepanjang tahun (bukan musiman
              ekstrem), stok reguler bulanan bisa distandarkan di sekitar level
              forecast, tanpa perlu lonjakan/penumpukan besar-besaran di bulan
              tertentu seperti bisnis musiman.
            </InsightCard>
            <InsightCard
              tone="biz"
              icon={Megaphone}
              title="Siapkan strategi dorongan penjualan Feb–Jun"
            >
              Karena forecast Februari–Juni 2025 sedikit di bawah rata-rata
              historis, pertimbangkan promosi, bundling produk, atau program
              loyalitas pelanggan di periode tersebut untuk menjaga volume
              penjualan.
            </InsightCard>
            <InsightCard
              tone="biz"
              icon={Handshake}
              title="Manfaatkan periode stabil untuk negosiasi supplier"
            >
              Pola permintaan yang konsisten adalah posisi tawar yang baik untuk
              mengunci kontrak volume tetap atau harga grosir jangka panjang
              dengan supplier, karena risiko fluktuasi permintaan relatif
              rendah.
            </InsightCard>
            <InsightCard
              tone="biz"
              icon={Truck}
              title="Jadikan forecast input rutin tim pengadaan"
            >
              Bagikan hasil forecast (beserta rentangnya) ke tim
              pembelian/inventory setiap bulan sebagai salah satu input
              perencanaan stok — bukan sebagai keputusan otomatis, tapi
              pelengkap pengalaman tim lapangan.
            </InsightCard>
            <InsightCard
              tone="biz"
              icon={Radar}
              title="Bangun early-warning: bandingkan aktual vs forecast"
            >
              Setiap akhir bulan, cek apakah penjualan aktual berada di dalam
              pita 95%. Jika aktual keluar dari rentang tersebut, itu sinyal ada
              faktor luar biasa (proyek besar, gangguan pasokan, dll.) yang
              layak diselidiki lebih lanjut oleh tim manajemen.
            </InsightCard>
          </div>
        </div>
      </section>

      {/* ============================== REKOMENDASI PENGUATAN MODEL (terpisah, opsional) ============================== */}
      <section className="light-section muted-section">
        <div className="inner tight">
          <div className="model-section-tag">
            <Wrench size={13} /> Opsional · Untuk Tim Data/Model
          </div>
          <h3 className="model-section-title">Rekomendasi Penguatan Model</h3>
          <p className="model-section-lead">
            Bagian ini dipisah dari rekomendasi bisnis di atas — berisi arahan
            teknis bila tim data ingin menekan MAPE lebih rendah lagi di iterasi
            berikutnya. Tidak wajib dijalankan untuk memakai hasil forecast saat
            ini.
          </p>
          <div className="insight-grid model-grid">
            <InsightCard
              tone="model"
              icon={CloudRain}
              title="Tambahkan data eksternal (exogenous features)"
            >
              Karena sinyal historis murni terbatas, akurasi berpotensi naik
              lebih jauh dengan menambahkan: jadwal proyek
              konstruksi/pemerintah, musim hujan, indeks harga semen, suku bunga
              KPR, dan kalender promosi/diskon toko.
            </InsightCard>
            <InsightCard
              tone="model"
              icon={GitBranch}
              title="Coba forecast per kategori produk / lokasi toko"
            >
              Pendekatan <i>hierarchical/bottom-up forecasting</i> — meramal
              tiap kategori produk atau cabang toko dulu, baru dijumlah ke total
              — sering menangkap pola yang hilang saat langsung meramal angka
              total gabungan.
            </InsightCard>
            <InsightCard
              tone="model"
              icon={Repeat}
              title="Retraining & monitoring berkala"
            >
              Latih ulang model tiap bulan dengan data terbaru, dan pantau MAPE
              dari waktu ke waktu (rolling), bukan dihitung sekali lalu
              dilupakan — model "champion" bisa berganti seiring bertambahnya
              data.
            </InsightCard>
            <InsightCard
              tone="model"
              icon={FileSpreadsheet}
              title="Perbanyak histori data"
            >
              60 titik bulanan relatif sedikit untuk model berbasis pohon
              keputusan. Beberapa tahun data tambahan akan membantu model
              menangkap pola musiman yang lebih stabil dan mengurangi risiko
              noise.
            </InsightCard>
          </div>
        </div>
      </section>

      <div className="footer">
        <div style={{ marginBottom: 14 }}>
          <a
            className="notebook-btn ghost"
            href={NOTEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={14} /> Lihat Notebook Lengkap di Google Colab
          </a>
        </div>
        DISUSUN DARI NOTEBOOK · forecast_total_sales_v3 · XGBoost & LightGBM ·
        Rolling-Origin Backtesting
      </div>
    </div>
  );
}
