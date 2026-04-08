import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
// Ganti path import sesuai struktur project kamu
import imgMBG from "../assets/mbgkeracunan.png";
import diabatesimg from "../assets/diabetes.png";
import sales_dashboard1 from "../assets/sales_dashboard1.png";
import hR from "../assets/hR.png";
import rankmiliter from "../assets/rankmiliter.png";
import gdp from "../assets/gdp.png";
import lifeex from "../assets/lifeex.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    id: "tableau",
    label: "Tableau",
    emoji: "📊",
    accentClass: "text-orange-500",
    badgeClass: "bg-orange-500",
    borderClass: "border-orange-200",
    bgClass: "bg-orange-50",
    leftBarClass: "border-orange-200",
    dotColor: "#E97627",
    desc: "Interactive visual analytics & storytelling",
    subs: [
      {
        id: "tableau-maps",
        label: "Maps & Chart",
        icon: "🗺️",
        items: [
          {
            id: 1,
            title: "Sebaran Gejala Keracunan MBG",
            date: "15 Feb 2026",
            tag: "Geospatial",
            tagColor: "bg-orange-500",
            image: imgMBG, // ← pakai gambar asli
            url: "/jumlahkeracunanmbg", // ← navigasi ke Detail1
            isInternal: true,
          },
          {
            id: 2,
            title: "Ranking Diabetes",
            date: "2024",
            tag: "Diabetes",
            tagColor: "bg-amber-500",
            image: diabatesimg, // ← ganti dengan gambar lain
            url: "/tableudiabates",
            isInternal: false,
          },
          {
            id: 3,
            title: "Rank Global Military",
            date: "2025",
            tag: "CRM",
            tagColor: "bg-violet-500",
            image: rankmiliter,
            url: "/militerranks",
            isInternal: false,
          },
          {
            id: 4,
            title: "Distribusi GDP Global",
            date: "Des 2025",
            tag: "GDP",
            tagColor: "bg-indigo-500",
            image: gdp,
            url: "/gdp",
            isInternal: false,
          },
          {
            id: 5,
            title: "Life Expectancy",
            date: "Apr 2026",
            tag: "Line Chart",
            tagColor: "bg-red-500",
            image: lifeex,
            url: "/lifeexpectancy",
            isInternal: false,
          },
        ],
      },
      {
        id: "tableau-dashboard",
        label: "Dashboard",
        icon: "🖥️",
        items: [
          {
            id: 1,
            title: "Sales Dashboard",
            date: "Jan 2026",
            tag: "Dashboard",
            tagColor: "bg-orange-500",
            image: sales_dashboard1,
            url: "/sales_dashboard1",
            isInternal: false,
          },
          {
            id: 2,
            title: "HR Dashboard",
            date: "Feb 2026",
            tag: "HR",
            tagColor: "bg-blue-500",
            image: hR,
            url: "/hRDashboard",
            isInternal: false,
          },
          {
            id: 3,
            title: "Rank Global Military",
            date: "2025",
            tag: "CRM",
            tagColor: "bg-violet-500",
            image: rankmiliter,
            url: "/militerranks",
            isInternal: false,
          },
          {
            id: 4,
            title: "Financial Summary Report",
            date: "Mar 2026",
            tag: "Finance",
            tagColor: "bg-emerald-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 5,
            title: "Marketing Funnel Analytics",
            date: "Apr 2026",
            tag: "Marketing",
            tagColor: "bg-pink-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
        ],
      },
    ],
  },
  {
    id: "powerbi",
    label: "Power BI",
    emoji: "⚡",
    accentClass: "text-yellow-600",
    badgeClass: "bg-yellow-500",
    borderClass: "border-yellow-200",
    bgClass: "bg-yellow-50",
    leftBarClass: "border-yellow-200",
    dotColor: "#B8900A",
    desc: "Business intelligence & interactive reports",
    subs: [
      {
        id: "powerbi-reports",
        label: "Reports",
        icon: "📋",
        items: [
          {
            id: 1,
            title: "Monthly Revenue Report",
            date: "Jan 2026",
            tag: "Revenue",
            tagColor: "bg-yellow-600",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 2,
            title: "HR Workforce Analytics",
            date: "Feb 2026",
            tag: "HR",
            tagColor: "bg-sky-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 3,
            title: "Inventory Management Report",
            date: "Feb 2026",
            tag: "Inventory",
            tagColor: "bg-emerald-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 4,
            title: "Product Performance Tracker",
            date: "Mar 2026",
            tag: "Product",
            tagColor: "bg-violet-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 5,
            title: "Customer Churn Analysis",
            date: "Apr 2026",
            tag: "Retention",
            tagColor: "bg-red-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
        ],
      },
      {
        id: "powerbi-dashboard",
        label: "Dashboard",
        icon: "📈",
        items: [
          {
            id: 1,
            title: "Real-Time Operations Dashboard",
            date: "Jan 2026",
            tag: "Ops",
            tagColor: "bg-yellow-600",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 2,
            title: "Budget vs Actual Dashboard",
            date: "Feb 2026",
            tag: "Finance",
            tagColor: "bg-blue-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 3,
            title: "Social Media Performance BI",
            date: "Mar 2026",
            tag: "Social",
            tagColor: "bg-pink-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 4,
            title: "Supply Chain BI Overview",
            date: "Mar 2026",
            tag: "Logistics",
            tagColor: "bg-emerald-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 5,
            title: "E-Commerce Analytics BI",
            date: "Apr 2026",
            tag: "E-Com",
            tagColor: "bg-indigo-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
        ],
      },
    ],
  },
  {
    id: "excel",
    label: "Excel",
    emoji: "📗",
    accentClass: "text-green-700",
    badgeClass: "bg-green-600",
    borderClass: "border-green-200",
    bgClass: "bg-green-50",
    leftBarClass: "border-green-200",
    dotColor: "#217346",
    desc: "Advanced spreadsheet analysis & automation",
    subs: [
      {
        id: "excel-analysis",
        label: "Analysis",
        icon: "🔬",
        items: [
          {
            id: 1,
            title: "Pivot Table Sales Analysis",
            date: "Jan 2026",
            tag: "Pivot",
            tagColor: "bg-green-600",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 2,
            title: "Cohort Analysis Template",
            date: "Feb 2026",
            tag: "Cohort",
            tagColor: "bg-sky-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 3,
            title: "What-If Scenario Modeling",
            date: "Feb 2026",
            tag: "Modeling",
            tagColor: "bg-violet-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 4,
            title: "Statistical Regression Analysis",
            date: "Mar 2026",
            tag: "Stats",
            tagColor: "bg-amber-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 5,
            title: "Financial Ratio Calculator",
            date: "Apr 2026",
            tag: "Finance",
            tagColor: "bg-red-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
        ],
      },
      {
        id: "excel-automation",
        label: "Automation",
        icon: "⚙️",
        items: [
          {
            id: 1,
            title: "VBA Macro Report Generator",
            date: "Jan 2026",
            tag: "VBA",
            tagColor: "bg-green-600",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 2,
            title: "Automated Data Cleaning Script",
            date: "Feb 2026",
            tag: "ETL",
            tagColor: "bg-blue-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 3,
            title: "Dynamic Dashboard with Slicers",
            date: "Mar 2026",
            tag: "Dynamic",
            tagColor: "bg-pink-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 4,
            title: "Power Query Data Transform",
            date: "Mar 2026",
            tag: "Power Query",
            tagColor: "bg-indigo-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
          {
            id: 5,
            title: "Automated Email Report VBA",
            date: "Apr 2026",
            tag: "Automation",
            tagColor: "bg-emerald-500",
            image: imgMBG,
            url: "#",
            isInternal: false,
          },
        ],
      },
    ],
  },
];

// ─── CAROUSEL HOOK ────────────────────────────────────────────────────────────
function useCarousel(count, delay = 3800) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (paused) {
      clearInterval(ref.current);
      return;
    }
    ref.current = setInterval(() => setCurrent((p) => (p + 1) % count), delay);
    return () => clearInterval(ref.current);
  }, [paused, count, delay]);

  const go = (i) => setCurrent(((i % count) + count) % count);
  return { current, go, setPaused };
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ item, dotColor, animDelay = 0 }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.isInternal) {
      navigate(item.url);
    } else if (item.url !== "#") {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-300"
      style={{
        animationName: "cardIn",
        animationDuration: "0.5s",
        animationDelay: `${animDelay}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(.22,.68,0,1.2)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image area */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Tag badge */}
        <span
          className={`absolute top-3 left-3 ${item.tagColor} text-white text-[10px] font-bold
                          px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md`}
        >
          {item.tag}
        </span>

        {/* Date */}
        <span
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-600
                         text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/50"
        >
          {item.date}
        </span>

        {/* Internal link indicator */}
        {item.isInternal && (
          <span
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[10px]
                           font-bold text-slate-700 px-2 py-0.5 rounded-full border border-white/50
                           flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Live
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h4
          className="text-sm font-bold text-slate-800 leading-snug mb-3 line-clamp-2
                       font-[Lora,Georgia,serif]"
        >
          {item.title}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Lihat Detail
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-250
                       bg-slate-100 group-hover:bg-slate-800"
          >
            <svg
              className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUB SECTION ─────────────────────────────────────────────────────────────
function SubSection({ sub, dotColor }) {
  const PER = 3;
  const { current, go, setPaused } = useCarousel(sub.items.length, 3800);
  const visible = Array.from(
    { length: PER },
    (_, i) => sub.items[(current + i) % sub.items.length],
  );

  return (
    <div>
      {/* Sub header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{sub.icon}</span>
          <span className="text-[15px] font-bold text-slate-700">
            {sub.label}
          </span>
          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
            style={{
              color: dotColor,
              background: `${dotColor}15`,
              borderColor: `${dotColor}30`,
            }}
          >
            {sub.items.length} projects
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {sub.items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="h-2 rounded-full transition-all duration-300 border-0 cursor-pointer"
              style={{
                width: current === i ? "22px" : "7px",
                background: current === i ? dotColor : "#cbd5e1",
              }}
            />
          ))}
          {/* Prev */}
          <button
            onClick={() => go(current - 1)}
            className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center
                       justify-center ml-1.5 cursor-pointer transition-colors hover:bg-slate-200"
          >
            <svg
              className="w-3 h-3 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {/* Next */}
          <button
            onClick={() => go(current + 1)}
            className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center
                       justify-center cursor-pointer transition-colors hover:bg-slate-200"
          >
            <svg
              className="w-3 h-3 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {visible.map((item, i) => (
          <ProjectCard
            key={item.id + "-" + i}
            item={item}
            dotColor={dotColor}
            animDelay={i * 0.07}
          />
        ))}
      </div>
    </div>
  );
}

// ─── TOOL SECTION ─────────────────────────────────────────────────────────────
function ToolSection({ tool, index }) {
  const [open, setOpen] = useState(true);

  return (
    <section
      id={tool.id}
      className="mb-12"
      style={{
        animationName: "sectionIn",
        animationDuration: "0.6s",
        animationDelay: `${index * 0.12}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(.22,.68,0,1.2)",
      }}
    >
      {/* Tool header */}
      <div
        onClick={() => setOpen((o) => !o)}
        className={`${tool.bgClass} ${tool.borderClass} border-2 rounded-2xl px-6 py-5
                    flex items-center justify-between cursor-pointer
                    transition-all duration-200 hover:shadow-md mb-0 select-none`}
      >
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            className={`w-14 h-14 rounded-xl bg-white border-2 ${tool.borderClass}
                           flex items-center justify-center text-3xl shadow-sm`}
          >
            {tool.emoji}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                {tool.label}
              </h2>
              <span
                className={`${tool.badgeClass} text-white text-[11px] font-bold
                                px-2.5 py-0.5 rounded-full`}
              >
                {tool.subs.reduce((a, s) => a + s.items.length, 0)} Projects
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {tool.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {tool.subs.map((s) => (
            <span
              key={s.id}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold
                         text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full"
            >
              {s.icon} {s.label}
            </span>
          ))}
          <div
            className={`w-8 h-8 rounded-lg bg-white border border-slate-200
                           flex items-center justify-center ml-2 transition-transform duration-300
                           ${open ? "rotate-180" : "rotate-0"}`}
          >
            <svg
              className="w-4 h-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sub sections */}
      {open && (
        <div
          className={`mt-6 flex flex-col gap-8 pl-4 ml-3 border-l-4 ${tool.leftBarClass}`}
        >
          {tool.subs.map((sub) => (
            <SubSection key={sub.id} sub={sub} dotColor={tool.dotColor} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const DataSeries = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600;1,700&display=swap');

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sectionIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          60%       { box-shadow: 0 0 0 7px rgba(34,197,94,0); }
        }
        .dot-pulse { animation: dotPulse 2s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100
                      font-sans relative"
      >
        {/* Dot grid background */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.45,
          }}
        />

        {/* Rainbow top bar */}
        <div
          className="h-1 relative z-10"
          style={{
            background:
              "linear-gradient(90deg, #E97627, #F2C811 33%, #217346 66%, #3b82f6)",
          }}
        />

        {/* ── HERO ── */}
        <header
          className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 pt-14 pb-12"
          style={{
            animationName: "heroIn",
            animationDuration: "0.65s",
            animationFillMode: "both",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-8">
            {/* Left: title block */}
            <div className="flex-1 min-w-[260px]">
              {/* Live badge */}
              <div
                className="inline-flex items-center gap-2 bg-white border border-slate-200
                              rounded-full px-4 py-1.5 mb-5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 dot-pulse" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Data Analyst Portfolio
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight
                           tracking-tight mb-4"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                Data Visualization
                <br />
                <em
                  className="not-italic"
                  style={{
                    background:
                      "linear-gradient(90deg, #E97627, #d97706 40%, #217346)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Projects Showcase
                </em>
              </h1>

              <p className="text-slate-500 text-base leading-relaxed max-w-md">
                Koleksi proyek visualisasi data yang dibangun dengan{" "}
                <strong className="text-orange-500">Tableau</strong>,{" "}
                <strong className="text-yellow-600">Power BI</strong>, dan{" "}
                <strong className="text-green-700">Excel</strong> — mengubah
                data mentah menjadi wawasan yang actionable.
              </p>

              {/* Tool nav pills */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {TOOLS.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className={`flex items-center gap-2 bg-white ${t.borderClass} border-2
                                rounded-xl px-4 py-2 text-slate-700 text-sm font-bold
                                no-underline transition-all duration-200 hover:-translate-y-0.5
                                hover:shadow-md`}
                  >
                    <span className="text-base">{t.emoji}</span>
                    {t.label}
                    {t.subs.map((s) => (
                      <span
                        key={s.id}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          color: t.dotColor,
                          background: `${t.dotColor}18`,
                        }}
                      >
                        {s.label}
                      </span>
                    ))}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: stats grid */}
            <div className="grid grid-cols-2 gap-3 min-w-[240px]">
              {[
                {
                  val: "10+",
                  label: "Tableau Projects",
                  color: "#E97627",
                  icon: "📊",
                },
                {
                  val: "10+",
                  label: "Power BI Reports",
                  color: "#B8900A",
                  icon: "⚡",
                },
                {
                  val: "10+",
                  label: "Excel Workbooks",
                  color: "#217346",
                  icon: "📗",
                },
                {
                  val: "3",
                  label: "Tools Mastered",
                  color: "#6366f1",
                  icon: "🛠️",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-slate-100 rounded-2xl p-4
                             transition-all duration-250 hover:-translate-y-1 hover:shadow-lg
                             cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.color + "45";
                    e.currentTarget.style.boxShadow = `0 10px 28px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{s.icon}</span>
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: s.color }}
                    >
                      {s.val}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Section divider */}
        <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-12">
          {TOOLS.map((tool, i) => (
            <ToolSection key={tool.id} tool={tool} index={i} />
          ))}
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 border-t border-slate-200 bg-white
                           px-6 lg:px-16 py-5 flex justify-between items-center flex-wrap gap-3"
        >
          <div className="flex items-center gap-5">
            {TOOLS.map((t) => (
              <span
                key={t.id}
                className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"
              >
                {t.emoji} {t.label}
              </span>
            ))}
          </div>
          <span className="text-xs text-slate-300">
            Data Analyst Portfolio · 2026
          </span>
        </footer>
      </div>
    </>
  );
};

export default DataSeries;
