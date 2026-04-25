import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import excell1 from "../assets/excell1.png";

/* ─── DATA ─────────────────────────────────────────────────── */
const kpiCards = [
  {
    label: "Total Karyawan",
    value: "8.950",
    icon: "👥",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    label: "Karyawan Perempuan",
    value: "4.149",
    icon: "👩",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  {
    label: "Karyawan Laki-laki",
    value: "4.801",
    icon: "👨",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  {
    label: "Total Negara Bagian",
    value: "50",
    icon: "🗺️",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
];

const genderData = [
  { label: "Female", value: 4149, pct: 46.36, color: "#3b82f6" },
  { label: "Male", value: 4801, pct: 53.64, color: "#f97316" },
];

const ageData = [
  { label: "Dewasa", value: 4950, color: "#3b82f6" },
  { label: "Remaja", value: 1350, color: "#60a5fa" },
  { label: "Tua", value: 2650, color: "#1d4ed8" },
];

const performanceData = [
  {
    rating: "Satisfactory",
    phd: 80,
    master: 150,
    highschool: 200,
    bachelor: 1800,
  },
  {
    rating: "Needs Improvement",
    phd: 60,
    master: 120,
    highschool: 180,
    bachelor: 800,
  },
  { rating: "Good", phd: 90, master: 160, highschool: 220, bachelor: 3200 },
  { rating: "Excellent", phd: 50, master: 100, highschool: 160, bachelor: 600 },
];

/* ── UPDATED: nilai sesuai pivot table Excel ── */
const yearlyTrend = [
  { year: "2015", value: 472 },
  { year: "2016", value: 729 },
  { year: "2017", value: 1560 },
  { year: "2018", value: 850 },
  { year: "2019", value: 902 },
  { year: "2020", value: 968 },
  { year: "2021", value: 422 },
  { year: "2022", value: 1042 },
  { year: "2023", value: 1201 },
  { year: "2024", value: 804 },
];

const educationColors = {
  PhD: "#f59e0b",
  Master: "#9ca3af",
  "High School": "#f97316",
  Bachelor: "#3b82f6",
};

const stateData = [
  { state: "NY", employees: 6270, x: 76, y: 28 },
  { state: "CA", employees: 4100, x: 10, y: 42 },
  { state: "TX", employees: 3200, x: 38, y: 62 },
  { state: "FL", employees: 2800, x: 68, y: 70 },
  { state: "IL", employees: 1900, x: 60, y: 32 },
  { state: "PA", employees: 1700, x: 74, y: 33 },
  { state: "OH", employees: 1500, x: 67, y: 34 },
  { state: "GA", employees: 1200, x: 65, y: 60 },
  { state: "NC", employees: 1100, x: 70, y: 52 },
  { state: "MI", employees: 950, x: 63, y: 27 },
  { state: "WA", employees: 800, x: 10, y: 16 },
  { state: "AZ", employees: 700, x: 20, y: 55 },
  { state: "CO", employees: 600, x: 32, y: 40 },
  { state: "MN", employees: 500, x: 52, y: 22 },
  { state: "WI", employees: 450, x: 58, y: 26 },
  { state: "MO", employees: 400, x: 55, y: 44 },
  { state: "TN", employees: 380, x: 62, y: 53 },
  { state: "IN", employees: 360, x: 63, y: 37 },
  { state: "VA", employees: 340, x: 73, y: 44 },
  { state: "MA", employees: 320, x: 81, y: 26 },
  { state: "KY", employees: 300, x: 66, y: 46 },
  { state: "SC", employees: 280, x: 69, y: 57 },
  { state: "AL", employees: 260, x: 62, y: 62 },
  { state: "LA", employees: 240, x: 55, y: 68 },
  { state: "OK", employees: 220, x: 44, y: 54 },
  { state: "KS", employees: 200, x: 47, y: 44 },
  { state: "IA", employees: 190, x: 54, y: 32 },
  { state: "AR", employees: 180, x: 56, y: 58 },
  { state: "MS", employees: 170, x: 60, y: 66 },
  { state: "NE", employees: 160, x: 46, y: 36 },
  { state: "NV", employees: 150, x: 16, y: 38 },
  { state: "UT", employees: 140, x: 24, y: 40 },
  { state: "NM", employees: 130, x: 30, y: 56 },
  { state: "OR", employees: 120, x: 10, y: 24 },
  { state: "ID", employees: 110, x: 20, y: 26 },
  { state: "MT", employees: 103, x: 28, y: 18 },
];

/* ─── ACTIVE FILTERS STATE ───────────────────────────────────── */
const genderOptions = ["Female", "Male"];
const educationOptions = ["Bachelor", "High School", "Master", "PhD"];

/* ─── DONUT CHART ─────────────────────────────────────────────── */
const DonutChart = ({ activeGender }) => {
  const filteredData =
    activeGender.length === 0
      ? genderData
      : genderData.filter((d) => activeGender.includes(d.label));

  const total = filteredData.reduce((s, d) => s + d.value, 0);
  const allTotal = genderData.reduce((s, d) => s + d.value, 0);
  const r = 60,
    cx = 80,
    cy = 80,
    circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 160 160" className="w-36 h-36 flex-shrink-0">
        {filteredData.map((d, i) => {
          const pct = (d.value / allTotal) * 100;
          const dash = (pct / 100) * circ;
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
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
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
      <div className="space-y-3">
        {genderData.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: g.color,
                opacity:
                  activeGender.length === 0 || activeGender.includes(g.label)
                    ? 1
                    : 0.3,
              }}
            />
            <div>
              <div className="text-xs font-bold text-slate-700">{g.label}</div>
              <div className="text-[11px] text-slate-400">
                {g.value.toLocaleString("id-ID")} ({g.pct}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── AGE BAR CHART ────────────────────────────────────────────── */
const AgeBarChart = ({ activeGender }) => {
  const multiplier =
    activeGender.length === 0
      ? 1
      : activeGender.includes("Female") && activeGender.includes("Male")
        ? 1
        : activeGender.includes("Female")
          ? 0.464
          : 0.536;

  const filteredAge = ageData.map((d) => ({
    ...d,
    value: Math.round(d.value * multiplier),
  }));
  const maxVal = Math.max(...filteredAge.map((d) => d.value));
  const height = 160;

  return (
    <div
      className="flex items-end gap-4 justify-center"
      style={{ height: height + 30 }}
    >
      {filteredAge.map((d, i) => {
        const pct = (d.value / maxVal) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[11px] font-bold text-slate-600">
              {d.value.toLocaleString("id-ID")}
            </span>
            <div
              className="w-full rounded-t-sm transition-all duration-500"
              style={{
                height: `${(pct / 100) * height}px`,
                background: d.color,
                minHeight: 4,
              }}
            />
            <span className="text-[10px] text-slate-400 text-center leading-tight">
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── US MAP ─────────────────────────────────────────────────── */
const USMap = ({ activeGender }) => {
  const multiplier =
    activeGender.length === 0
      ? 1
      : activeGender.includes("Female") && activeGender.includes("Male")
        ? 1
        : activeGender.includes("Female")
          ? 0.464
          : 0.536;

  const maxEmp = 6270;
  const getColor = (employees) => {
    const pct = (employees * multiplier) / maxEmp;
    if (pct > 0.7) return "#1d4ed8";
    if (pct > 0.4) return "#3b82f6";
    if (pct > 0.2) return "#93c5fd";
    if (pct > 0.1) return "#bfdbfe";
    return "#dbeafe";
  };

  return (
    <div className="relative w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
      <svg
        viewBox="0 0 100 80"
        className="w-full"
        style={{ height: 200 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="80" fill="#f8fafc" />
        <path
          d="M8,15 L85,15 L90,18 L92,25 L88,35 L85,38 L82,55 L78,68 L72,72 L50,74 L30,72 L15,68 L8,60 L5,45 L5,25 Z"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.5"
        />
        {stateData.map((s, i) => (
          <g key={i}>
            <circle
              cx={s.x}
              cy={s.y}
              r={Math.max(1.5, ((s.employees * multiplier) / maxEmp) * 5 + 1)}
              fill={getColor(s.employees)}
              opacity={0.85}
            />
          </g>
        ))}
        <text x="76" y="26" fontSize="3.5" fill="#1e3a8a" fontWeight="bold">
          NY
        </text>
        <text x="70" y="23" fontSize="3" fill="#1e40af">
          {Math.round(6270 * multiplier).toLocaleString("id-ID")}
        </text>
      </svg>
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="text-[10px] text-slate-400">Count of Employee_ID</span>
        <div className="flex items-center gap-1">
          <div
            className="w-12 h-2 rounded-full"
            style={{
              background: "linear-gradient(to right, #dbeafe, #1d4ed8)",
            }}
          />
          <div className="flex justify-between w-12">
            <span className="text-[9px] text-slate-400">103</span>
            <span className="text-[9px] text-slate-400">
              {Math.round(6270 * multiplier).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── PERFORMANCE CHART ─────────────────────────────────────── */
const PerformanceChart = ({ activeEducation }) => {
  const maxVal = 4000;
  const eduKeys = ["PhD", "Master", "High School", "Bachelor"];
  const activeKeys =
    activeEducation.length === 0
      ? eduKeys
      : eduKeys.filter((k) => activeEducation.includes(k));

  return (
    <div className="space-y-3">
      {performanceData.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 w-32 text-right flex-shrink-0 leading-tight">
            {row.rating}
          </span>
          <div className="flex-1 flex gap-0.5 h-6">
            {activeKeys.map((edu) => {
              const val =
                edu === "PhD"
                  ? row.phd
                  : edu === "Master"
                    ? row.master
                    : edu === "High School"
                      ? row.highschool
                      : row.bachelor;
              const w = (val / maxVal) * 100;
              return (
                <div
                  key={edu}
                  className="h-full rounded-sm"
                  style={{
                    width: `${w}%`,
                    background: educationColors[edu],
                    transition: "width 0.5s",
                  }}
                  title={`${edu}: ${val}`}
                />
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 w-8 text-right flex-shrink-0">
            {Object.entries(row)
              .filter(
                ([k]) =>
                  k !== "rating" &&
                  activeKeys.includes(
                    k === "phd"
                      ? "PhD"
                      : k === "master"
                        ? "Master"
                        : k === "highschool"
                          ? "High School"
                          : "Bachelor",
                  ),
              )
              .reduce((s, [, v]) => s + v, 0)
              .toLocaleString()}
          </span>
        </div>
      ))}
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100">
        {eduKeys.map((edu) => (
          <span
            key={edu}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600"
          >
            <span
              className="w-3 h-2 rounded-sm inline-block"
              style={{
                background: educationColors[edu],
                opacity:
                  activeEducation.length === 0 || activeEducation.includes(edu)
                    ? 1
                    : 0.3,
              }}
            />
            {edu}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── TREND LINE CHART ──────────────────────────────────────── */
const TrendChart = ({ activeGender, activeEducation }) => {
  const multiplier =
    activeGender.length === 0
      ? 1
      : activeGender.includes("Female") && activeGender.includes("Male")
        ? 1
        : activeGender.includes("Female")
          ? 0.464
          : 0.536;

  const eduMultiplier =
    activeEducation.length === 0 ? 1 : activeEducation.length / 4;

  const filteredData = yearlyTrend.map((d) => ({
    ...d,
    value: Math.round(
      d.value * multiplier * (eduMultiplier === 0 ? 1 : eduMultiplier),
    ),
  }));

  const w = 320,
    h = 120;
  const maxV = Math.max(...filteredData.map((d) => d.value));
  const pts = filteredData.map((d, i) => ({
    x: (i / (filteredData.length - 1)) * (w - 30) + 15,
    y: h - 20 - (d.value / maxV) * (h - 30),
  }));
  const pathD = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${h - 15} L ${pts[0].x} ${h - 15} Z`;

  const yLabels = [0, 400, 800, 1200, 1600];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yLabels.map((val) => {
        const y = h - 20 - (val / maxV) * (h - 30);
        return (
          <g key={val}>
            <line
              x1="15"
              y1={y}
              x2={w - 5}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
            <text x="12" y={y + 3} textAnchor="end" fontSize="7" fill="#94a3b8">
              {val}
            </text>
          </g>
        );
      })}
      <path d={areaD} fill="url(#trendGrad)" />
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
      {filteredData.map((d, i) => (
        <text
          key={i}
          x={pts[i].x}
          y={h - 3}
          textAnchor="middle"
          fontSize="7"
          fill="#94a3b8"
        >
          {d.year}
        </text>
      ))}
    </svg>
  );
};

/* ─── FILTER PANEL ──────────────────────────────────────────── */
const FilterPanel = ({
  activeGender,
  setActiveGender,
  activeEducation,
  setActiveEducation,
}) => {
  const toggle = (arr, setArr, val) => {
    setArr((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  return (
    <div className="space-y-4">
      {/* Gender Filter */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700">Gender</span>
          <div className="flex gap-1">
            <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100">
              <svg
                className="w-3 h-3 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100">
              <svg
                className="w-3 h-3 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          {genderOptions.map((g) => (
            <button
              key={g}
              onClick={() => toggle(activeGender, setActiveGender, g)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeGender.length === 0 || activeGender.includes(g)
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {activeGender.length > 0 && (
          <button
            onClick={() => setActiveGender([])}
            className="mt-2 w-full text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Education Filter */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700">
            Education Level
          </span>
          <div className="flex gap-1">
            <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100">
              <svg
                className="w-3 h-3 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-slate-100">
              <svg
                className="w-3 h-3 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          {educationOptions.map((edu) => (
            <button
              key={edu}
              onClick={() => toggle(activeEducation, setActiveEducation, edu)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeEducation.length === 0 || activeEducation.includes(edu)
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {edu}
            </button>
          ))}
        </div>
        {activeEducation.length > 0 && (
          <button
            onClick={() => setActiveEducation([])}
            className="mt-2 w-full text-[10px] text-slate-400 hover:text-blue-600 transition-colors"
          >
            Reset filter
          </button>
        )}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
const Excell1 = () => {
  const navigate = useNavigate();
  const [activeGender, setActiveGender] = useState([]);
  const [activeEducation, setActiveEducation] = useState([]);
  const [imgZoomed, setImgZoomed] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
        .card-hover {
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px rgba(59,130,246,0.12);
        }
        .grid-bg {
          background-image: linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .img-zoom-overlay {
          animation: zoomIn 0.25s cubic-bezier(.22,.68,0,1.2) both;
        }
        .dashboard-img {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: zoom-in;
        }
        .dashboard-img:hover {
          transform: scale(1.01);
          box-shadow: 0 20px 60px -10px rgba(37,99,235,0.2);
        }
      `}</style>

      {/* ── LIGHTBOX OVERLAY ── */}
      {imgZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setImgZoomed(false)}
        >
          <div className="img-zoom-overlay relative max-w-6xl w-full">
            <img
              src={excell1}
              alt="Excel Dashboard Full View"
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setImgZoomed(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white
                         flex items-center justify-center shadow-lg transition-all"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500
                       hover:text-blue-600 transition-colors group"
          >
            <span
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm
                             flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all"
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
                  📊 Excel · HR Analytics
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Human Resources Intelligence
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Dashboard Analitik
                <br />
                <span className="text-blue-300">Sumber Daya Manusia</span>
              </h1>
              <p className="text-blue-100/80 text-sm max-w-lg leading-relaxed">
                Visualisasi interaktif data karyawan, distribusi gender,
                pendidikan, performa kerja, dan tren rekrutmen berdasarkan data
                multi-negara bagian AS periode 2015–2024.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 2015–2024",
                  "🌏 50 Negara Bagian",
                  "📁 Microsoft Excel",
                  "👥 8.950 Karyawan",
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

            {/* ── KPI OVERLAP ── */}
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
                      {k.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MAIN DASHBOARD LAYOUT ── */}
          <div
            className="fade-up flex gap-4"
            style={{ animationDelay: "0.1s" }}
          >
            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-4 min-w-0">
              {/* ROW 1: Gender + Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Total Karyawan berdasarkan Gender
                  </h3>
                  <DonutChart activeGender={activeGender} />
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Total Karyawan berdasarkan Usia
                  </h3>
                  <AgeBarChart activeGender={activeGender} />
                </div>
              </div>

              {/* ROW 2: US Map */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                <h3 className="text-sm font-bold text-slate-700 mb-4">
                  Distribusi Karyawan per Negara Bagian (AS)
                </h3>
                <USMap activeGender={activeGender} />
              </div>

              {/* ROW 3: Performance + Trend */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-4">
                    Performa Karyawan berdasarkan Pendidikan
                  </h3>
                  <PerformanceChart activeEducation={activeEducation} />
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <h3 className="text-sm font-bold text-slate-700 mb-1">
                    Total Karyawan per Tahun
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-4">
                    Tren rekrutmen 2015–2024
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-500">
                      <span className="w-3 h-0.5 bg-blue-500 inline-block rounded" />{" "}
                      Total
                    </span>
                  </div>
                  <TrendChart
                    activeGender={activeGender}
                    activeEducation={activeEducation}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR — FILTER PANEL */}
            <div className="w-44 flex-shrink-0">
              <FilterPanel
                activeGender={activeGender}
                setActiveGender={setActiveGender}
                activeEducation={activeEducation}
                setActiveEducation={setActiveEducation}
              />
            </div>
          </div>

          {/* ── INSIGHT CARD ── */}
          <div
            className="fade-up rounded-2xl overflow-hidden shadow border border-blue-100"
            style={{ animationDelay: "0.2s" }}
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
                  icon: "👨",
                  title: "Dominasi Laki-laki",
                  desc: "Karyawan laki-laki mendominasi sebesar 53.6% (4.801 orang) dibanding perempuan 46.4% (4.149 orang).",
                  color: "blue",
                },
                {
                  icon: "🗽",
                  title: "NY Terbesar",
                  desc: "New York menjadi negara bagian dengan karyawan terbanyak, mencapai 6.270 — jauh melampaui negara bagian lain.",
                  color: "indigo",
                },
                {
                  icon: "📈",
                  title: "Puncak 2017",
                  desc: "Tahun 2017 mencatat rekrutmen tertinggi dengan 1.560 karyawan baru — tertinggi sepanjang periode 2015–2024.",
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

          {/* ── DASHBOARD PREVIEW IMAGE ── */}
          <div
            className="fade-up bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-600">
                    📊 Preview Dashboard Excel
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
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50
                             border border-blue-200 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
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

            {/* Image */}
            <div className="p-4 bg-gradient-to-b from-slate-50 to-white">
              <img
                src={excell1}
                alt="Excel Dashboard — Analitik Sumber Daya Manusia"
                className="dashboard-img w-full rounded-xl border border-slate-200 shadow-md"
                onClick={() => setImgZoomed(true)}
              />
            </div>

            {/* Caption */}
            <div className="px-6 pb-5 flex items-center justify-between">
              <p className="text-xs text-slate-400 leading-relaxed">
                Hasil akhir visualisasi menggunakan{" "}
                <span className="font-semibold text-slate-600">
                  Microsoft Excel
                </span>
                . Klik gambar untuk melihat tampilan penuh.
              </p>
              <button
                onClick={() => setImgZoomed(true)}
                className="flex-shrink-0 ml-4 text-[11px] font-semibold text-blue-500 hover:text-blue-700
                           hover:underline transition-colors"
              >
                Lihat lebih besar →
              </button>
            </div>
          </div>

          {/* ── BOTTOM NAV ── */}
          <div
            className="fade-up flex items-center justify-between pt-2 pb-10"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500
                         hover:text-blue-600 transition-colors group"
            >
              <span
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm
                               flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all"
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
              Kembali
            </button>
            <a
              href="https://microsoft.com/excel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-bold px-5 py-2.5 rounded-xl
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
            >
              Buka di Excel
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

export default Excell1;
