import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
import imgMBG from "../assets/mbgkeracunan.png";
import diabatesimg from "../assets/diabetes.png";
import salesdashboard1 from "../assets/salesdashboard1.png";
import hr2 from "../assets/hr2.png";
import rankmiliter from "../assets/rankmiliter.png";
import gdp from "../assets/gdp.png";
import lifeex from "../assets/lifeex.png";
import powerBI1 from "../assets/powerBI1.png";
import excell1 from "../assets/excell1.png";
import excel2 from "../assets/exell2.png";
import pytthonimage1 from "../assets/orderheatmap.png";
import dashboardhijabPowerbi2 from "../assets/dashboardzen2powerbi2.png";
import powerbidashboard3blink from "../assets/powerbidashboard3blink.png";
import powerbi4supplydashboard from "../assets/powerbi4supplydashboard.png";
import forecastpython1 from "../assets/forecastpython1.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Palette refined to a formal, editorial "data-report" identity per tool.
// `dotColorDark` is the brightened variant used automatically when dark mode
// is active, so every tint/badge/border derived from it stays legible on a
// dark surface without touching the light-mode values.
const TOOLS = [
  {
    id: "tableau",
    label: "Tableau",
    emoji: "📊",
    accentClass: "text-[#B3551A]",
    badgeClass: "bg-[#B3551A]",
    borderClass: "border-[#E7C5A5]",
    bgClass: "bg-[#FBF3EA]",
    leftBarClass: "border-[#E7C5A5]",
    dotColor: "#B3551A",
    dotColorDark: "#E8823D",
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
            tagColor: "bg-[#B3551A]",
            image: imgMBG,
            url: "/jumlahkeracunanmbg",
            isInternal: true,
          },
          {
            id: 2,
            title: "Ranking Diabetes",
            date: "2024",
            tag: "Diabetes",
            tagColor: "bg-amber-700",
            image: diabatesimg,
            url: "/tableudiabates",
            isInternal: true,
          },
          {
            id: 3,
            title: "Rank Global Military",
            date: "2025",
            tag: "CRM",
            tagColor: "bg-violet-700",
            image: rankmiliter,
            url: "/militerranks",
            isInternal: true,
          },
          {
            id: 4,
            title: "Distribusi GDP Global",
            date: "Des 2025",
            tag: "GDP",
            tagColor: "bg-indigo-700",
            image: gdp,
            url: "/gdp",
            isInternal: true,
          },
          {
            id: 5,
            title: "Life Expectancy",
            date: "Apr 2026",
            tag: "Line Chart",
            tagColor: "bg-rose-700",
            image: lifeex,
            url: "/lifeexpectancy",
            isInternal: true,
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
            tagColor: "bg-[#B3551A]",
            image: salesdashboard1,
            url: "/salesdashboard1",
            isInternal: true,
          },
          {
            id: 2,
            title: "HR Dashboard",
            date: "Feb 2026",
            tag: "HR",
            tagColor: "bg-blue-700",
            image: hr2,
            url: "/hRDashboard",
            isInternal: true,
          },
        ],
      },
    ],
  },
  {
    id: "powerbi",
    label: "Power BI",
    emoji: "⚡",
    accentClass: "text-[#9C7A1E]",
    badgeClass: "bg-[#9C7A1E]",
    borderClass: "border-[#E6D6A0]",
    bgClass: "bg-[#FBF7E8]",
    leftBarClass: "border-[#E6D6A0]",
    dotColor: "#9C7A1E",
    dotColorDark: "#D9B14A",
    desc: "Business intelligence & interactive reports",
    subs: [
      {
        id: "powerbi-reports",
        label: "SQL+PowerBI",
        icon: "📋",
        items: [
          {
            id: 1,
            title: "Report E-commerce",
            date: "Jan 2026",
            tag: "Revenue",
            tagColor: "bg-[#9C7A1E]",
            image: powerBI1,
            url: "/powerBI1",
            isInternal: false,
          },
          {
            id: 2,
            title: "Zen Hijab Dashboard",
            date: "Feb 2026",
            tag: "E-Commerce",
            tagColor: "bg-sky-700",
            image: dashboardhijabPowerbi2,
            url: "/Powerbi2Hijab",
            isInternal: true,
          },
          {
            id: 3,
            title: "Blinkit Dashboard",
            date: "Feb 2026",
            tag: "E-Commerce",
            tagColor: "bg-sky-700",
            image: powerbidashboard3blink,
            url: "/PowerBI3Blink",
            isInternal: true,
          },
          {
            id: 4,
            title: "Supply Dashboard",
            date: "Juli 2026",
            tag: "Bahan Bangunan",
            tagColor: "bg-sky-700",
            image: powerbi4supplydashboard,
            url: "/Powerbi4Dashboardqi",
            isInternal: true,
          },
        ],
      },
    ],
  },
  {
    id: "excel",
    label: "Excel/Spreadsheet + Looker Studio",
    emoji: "📗",
    accentClass: "text-[#1F6F45]",
    badgeClass: "bg-[#1F6F45]",
    borderClass: "border-[#BEE0CB]",
    bgClass: "bg-[#EFF8F2]",
    leftBarClass: "border-[#BEE0CB]",
    dotColor: "#1F6F45",
    dotColorDark: "#3FAE79",
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
            tagColor: "bg-[#1F6F45]",
            image: excell1,
            url: "/excell1",
            isInternal: true,
          },
          {
            id: 2,
            title: "Dashboard Sales Analysis",
            date: "Jan 2026",
            tag: "Pivot, Power Query, VBA",
            tagColor: "bg-[#1F6F45]",
            image: excel2,
            url: "/excel2",
            isInternal: true,
          },
        ],
      },
    ],
  },
  {
    id: "python",
    label: "Python + Machine/Deep Learning  ",
    emoji: "🐍",
    accentClass: "text-[#9C2B23]",
    badgeClass: "bg-[#9C2B23]",
    borderClass: "border-[#E7C3BE]",
    bgClass: "bg-[#FBEEEC]",
    leftBarClass: "border-[#E7C3BE]",
    dotColor: "#9C2B23",
    dotColorDark: "#E2685B",
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
            tagColor: "bg-[#9C2B23]",
            image: pytthonimage1,
            url: "/EcommerceAnalytics",
            isInternal: true,
          },
          {
            id: 2,
            title: "Forecast Machine Learning",
            date: "Jan 2026",
            tag: "ML, Forecast",
            tagColor: "bg-[#1F6F45]",
            image: forecastpython1,
            url: "/ForecastPythonBahanBangunan",
            isInternal: true,
          },
        ],
      },
    ],
  },
];

// ─── DARK-MODE STYLE HELPERS ──────────────────────────────────────────────────
// Small pure helpers that return inline-style overrides only when dark mode is
// active. In light mode they return `undefined` so the original Tailwind
// classes render exactly as before — nothing about the light theme changes.
function panelStyle(
  dark,
  { bg = "#141A24", border = "rgba(255,255,255,0.10)" } = {},
) {
  return dark ? { backgroundColor: bg, borderColor: border } : undefined;
}
function headingStyle(dark, color = "#F1F5F9") {
  return dark ? { color } : undefined;
}
function bodyTextStyle(dark, color = "#9AA7BD") {
  return dark ? { color } : undefined;
}

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

// ─── AMBIENT DATA-NETWORK BACKGROUND ──────────────────────────────────────────
// Signature element: a quiet, formal canvas of drifting nodes connected by
// thin lines — a nod to the "data" subject matter. Reads as atmosphere, not
// decoration, and switches its ink color for dark mode automatically.
function NetworkCanvas({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width, height, nodes, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rgb = dark ? "226,232,240" : "15,23,42";

    const NODE_COUNT = 46;
    const LINK_DIST = 150;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function init() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(${rgb},${0.1 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.32)`;
        ctx.fill();
      }

      if (!prefersReduced) raf = requestAnimationFrame(step);
    }

    resize();
    init();
    step();

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

// ─── DARK MODE TOGGLE ─────────────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center
                 border backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
      style={{
        /* Background tombol diubah jadi Biru (#2563EB) di mode terang */
        background: dark ? "rgba(20,26,36,0.85)" : "#2563EB",
        borderColor: dark ? "rgba(255,255,255,0.14)" : "#1D4ED8",
        boxShadow: dark
          ? "0 4px 18px rgba(0,0,0,0.45)"
          : "0 4px 18px rgba(37,99,235,0.35)", // Shadow disesuaikan dengan warna biru
      }}
    >
      <span
        className="relative block w-5 h-5 transition-transform duration-500"
        style={{ transform: dark ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              fill="#D9B14A"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            {/* Icon matahari diubah ke Putih (#FFFFFF) agar kontras dengan background biru */}
            <circle cx="12" cy="12" r="4.5" fill="#FFFFFF" />
            <g stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2.2M19.8 12H22M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
            </g>
          </svg>
        )}
      </span>
    </button>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ item, dotColor, animDelay = 0, dark }) {
  const navigate = useNavigate();
  const spotRef = useRef(null);
  const cardRef = useRef(null);

  const handleClick = () => {
    if (item.isInternal) {
      navigate(item.url);
    } else if (item.url !== "#") {
      window.open(item.url, "_blank");
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current;
      const spot = spotRef.current;
      if (!card || !spot) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const alpha = dark ? "33" : "22";
      spot.style.background = `radial-gradient(360px circle at ${x}% ${y}%, ${dotColor}${alpha}, transparent 65%)`;
    },
    [dotColor, dark],
  );

  const handleMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.background = "transparent";
  };

  const baseShadow = dark
    ? "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)"
    : "0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04)";

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden cursor-pointer
                 transition-all duration-300 hover:-translate-y-2"
      style={{
        ...panelStyle(dark),
        animationName: "cardIn",
        animationDuration: "0.55s",
        animationDelay: `${animDelay}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(.22,.68,0,1.2)",
        boxShadow: baseShadow,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `${baseShadow.split(",")[0]}, 0 22px 44px -12px ${dotColor}33`;
        e.currentTarget.style.borderColor = `${dotColor}55`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = baseShadow;
        e.currentTarget.style.borderColor = dark
          ? "rgba(255,255,255,0.10)"
          : "";
      }}
    >
      {/* cursor-tracked spotlight sheen */}
      <div
        ref={spotRef}
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
      />

      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <span
          className={`absolute top-3 left-3 ${item.tagColor} text-white text-[10px] font-bold
                          px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md`}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          {item.tag}
        </span>
        <span
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-600
                         text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/50"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {item.date}
        </span>
        {item.isInternal && (
          <span
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[10px]
                           font-bold text-slate-700 px-2 py-0.5 rounded-full border border-white/50
                           flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block dot-pulse" />
            Live
          </span>
        )}
      </div>
      <div className="relative z-0 p-4">
        <h4
          className="text-sm font-bold text-slate-800 leading-snug mb-3 line-clamp-2
                       font-[Lora,Georgia,serif]"
          style={headingStyle(dark, "#E8ECF3")}
        >
          {item.title}
        </h4>
        <div className="flex items-center justify-between">
          <span
            className="text-xs text-slate-400 font-medium tracking-wide"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              ...bodyTextStyle(dark, "#6B7A94"),
            }}
          >
            Lihat Detail
          </span>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-250
                       bg-slate-100 group-hover:text-white"
            style={{
              transitionProperty: "background-color, color",
              ...(dark ? { backgroundColor: "rgba(255,255,255,0.08)" } : {}),
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = dotColor)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.08)"
                : "")
            }
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
function SubSection({ sub, dotColor, dark }) {
  const PER = 3;
  const { current, go, setPaused } = useCarousel(sub.items.length, 3800);
  const visible = Array.from(
    { length: PER },
    (_, i) => sub.items[(current + i) % sub.items.length],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{sub.icon}</span>
          <span
            className="text-[15px] font-bold text-slate-700"
            style={{
              fontFamily: "'Lora', Georgia, serif",
              ...headingStyle(dark, "#DCE2EC"),
            }}
          >
            {sub.label}
          </span>
          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
            style={{
              color: dotColor,
              background: `${dotColor}15`,
              borderColor: `${dotColor}35`,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {sub.items.length} projects
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {sub.items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="h-2 rounded-full transition-all duration-300 border-0 cursor-pointer"
              style={{
                width: current === i ? "22px" : "7px",
                background:
                  current === i ? dotColor : dark ? "#334155" : "#cbd5e1",
              }}
            />
          ))}
          <button
            onClick={() => go(current - 1)}
            className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center
                       justify-center ml-1.5 cursor-pointer transition-all hover:-translate-x-0.5"
            style={panelStyle(dark, {
              bg: "rgba(255,255,255,0.06)",
              border: "rgba(255,255,255,0.12)",
            })}
          >
            <svg
              className="w-3 h-3 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dark ? "#B8C2D4" : "currentColor"}
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(current + 1)}
            className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center
                       justify-center cursor-pointer transition-all hover:translate-x-0.5"
            style={panelStyle(dark, {
              bg: "rgba(255,255,255,0.06)",
              border: "rgba(255,255,255,0.12)",
            })}
          >
            <svg
              className="w-3 h-3 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dark ? "#B8C2D4" : "currentColor"}
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
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
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}

// ─── TOOL SECTION ─────────────────────────────────────────────────────────────
function ToolSection({ tool, index, dark }) {
  const [open, setOpen] = useState(true);
  const accent = dark ? tool.dotColorDark : tool.dotColor;

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
      <div
        onClick={() => setOpen((o) => !o)}
        className={`${tool.bgClass} ${tool.borderClass} border-2 rounded-2xl px-6 py-5
                    flex items-center justify-between cursor-pointer
                    transition-all duration-200 hover:shadow-lg mb-0 select-none relative overflow-hidden`}
        style={
          dark
            ? { background: `${accent}14`, borderColor: `${accent}40` }
            : undefined
        }
      >
        <div className="flex items-center gap-4 relative z-10">
          <div
            className={`w-14 h-14 rounded-xl bg-white border-2 ${tool.borderClass}
                           flex items-center justify-center text-3xl shadow-sm
                           transition-transform duration-300 group-hover:rotate-6`}
            style={panelStyle(dark, {
              bg: "rgba(255,255,255,0.06)",
              border: `${accent}40`,
            })}
          >
            {tool.emoji}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2
                className="text-xl font-extrabold text-slate-800 tracking-tight"
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  ...headingStyle(dark),
                }}
              >
                {tool.label}
              </h2>
              <span
                className={`${tool.badgeClass} text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  ...(dark ? { background: accent } : {}),
                }}
              >
                {tool.subs.reduce((a, s) => a + s.items.length, 0)} Projects
              </span>
            </div>
            <p
              className="text-xs text-slate-400 font-medium mt-0.5"
              style={bodyTextStyle(dark, "#8896AC")}
            >
              {tool.desc}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          {tool.subs.map((s) => (
            <span
              key={s.id}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold
                         text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-full"
              style={panelStyle(dark, {
                bg: "rgba(255,255,255,0.06)",
                border: "rgba(255,255,255,0.14)",
              })}
            >
              <span style={bodyTextStyle(dark, "#C3CBDA")}>
                {s.icon} {s.label}
              </span>
            </span>
          ))}
          <div
            className={`w-8 h-8 rounded-lg bg-white border border-slate-200
                           flex items-center justify-center ml-2 transition-transform duration-300
                           ${open ? "rotate-180" : "rotate-0"}`}
            style={panelStyle(dark, {
              bg: "rgba(255,255,255,0.06)",
              border: "rgba(255,255,255,0.14)",
            })}
          >
            <svg
              className="w-4 h-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dark ? "#B8C2D4" : "currentColor"}
              strokeWidth="2.5"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {/* faint accent underline that reveals on open, echoes a report divider */}
        <div
          className="absolute bottom-0 left-0 h-[3px] transition-all duration-500"
          style={{
            width: open ? "100%" : "0%",
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />
      </div>

      {open && (
        <div
          className={`mt-6 flex flex-col gap-8 pl-4 ml-3 border-l-4 ${tool.leftBarClass}`}
          style={dark ? { borderColor: `${accent}40` } : undefined}
        >
          {tool.subs.map((sub) => (
            <SubSection key={sub.id} sub={sub} dotColor={accent} dark={dark} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── MAGANGHUB SECTION ────────────────────────────────────────────────────────
function MaganghubSection({ dark }) {
  const navigate = useNavigate();
  const indigo = dark ? "#8B85E0" : "#3730A3";

  const socialLinks = [
    {
      platform: "Instagram",
      handle: "@edudataid",
      desc: "Lihat konten visualisasi & desain data",
      url: "https://www.instagram.com/edudataid?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", // ganti dengan URL asli
      gradient:
        "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      badge: "Follow",
      badgeColor: "#C2185B",
    },
    {
      platform: "TikTok",
      handle: "@edudata.id",
      desc: "Konten analisis data",
      url: "https://www.tiktok.com/@edudata_id?is_from_webapp=1&sender_device=pc", // ganti dengan URL asli
      gradient:
        "linear-gradient(135deg, #010101 0%, #69C9D0 50%, #EE1D52 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
        </svg>
      ),
      badge: "Watch",
      badgeColor: "#B0123E",
    },
  ];

  return (
    <section
      id="maganghub"
      className="mb-12"
      style={{
        animationName: "sectionIn",
        animationDuration: "0.6s",
        animationDelay: "0.36s",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(.22,.68,0,1.2)",
      }}
    >
      {/* Header */}
      <div
        className="rounded-2xl px-6 py-5 flex items-center justify-between border-2 select-none mb-6"
        style={{
          background: dark
            ? `${indigo}14`
            : "linear-gradient(135deg, #EEF0FC 0%, #EFF8F2 100%)",
          borderColor: dark ? `${indigo}40` : "#C9CDF2",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border-2"
            style={{
              background: dark ? "rgba(255,255,255,0.06)" : "white",
              borderColor: dark ? `${indigo}40` : "#C9CDF2",
            }}
          >
            🏢
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                className="text-xl font-extrabold text-slate-800 tracking-tight"
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  ...headingStyle(dark),
                }}
              >
                Maganghub Edudata
              </h2>
              <span
                className="text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  background: indigo,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Internship Project
              </span>
            </div>
            <p
              className="text-xs text-slate-400 font-medium mt-0.5"
              style={bodyTextStyle(dark, "#8896AC")}
            >
              Scraping data, analisis sentimen & content creation
            </p>
          </div>
        </div>
        <span
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold
                     text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            ...panelStyle(dark, {
              bg: "rgba(255,255,255,0.06)",
              border: "rgba(255,255,255,0.14)",
            }),
            ...bodyTextStyle(dark, "#C3CBDA"),
          }}
        >
          🎓 Magang 2026
        </span>
      </div>

      {/* Content */}
      <div
        className="ml-3 pl-4 border-l-4 border-[#C9CDF2]"
        style={dark ? { borderColor: `${indigo}40` } : undefined}
      >
        {/* Description block */}
        <div
          className="rounded-2xl p-5 mb-6 border border-[#D9DCF6]"
          style={{
            background: dark
              ? "rgba(255,255,255,0.03)"
              : "linear-gradient(135deg, #F8F9FF 0%, #F1FAF4 100%)",
            borderColor: dark ? "rgba(255,255,255,0.10)" : "#D9DCF6",
          }}
        >
          <p
            className="text-sm text-slate-600 leading-relaxed"
            style={bodyTextStyle(dark, "#B0BACB")}
          >
            Selama magang di{" "}
            <strong style={{ color: indigo }}>Maganghub Edudata</strong>, saya
            mengerjakan proyek scraping data artikel dari{" "}
            <strong style={dark ? { color: "#DCE2EC" } : { color: "#334155" }}>
              Bappenas
            </strong>{" "}
            dan melakukan{" "}
            <strong style={dark ? { color: "#DCE2EC" } : { color: "#334155" }}>
              analisis sentimen
            </strong>{" "}
            terhadap konten tersebut. Saya juga bertanggung jawab mengolah data
            sekaligus membuat desain visualnya. Dokumentasi proyek dapat dilihat
            di media sosial berikut.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {/* Sentiment Analysis Card */}
          <div
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer
                       transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onClick={() => navigate("/scrapbappenas")}
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              ...panelStyle(dark),
            }}
          >
            {/* Visual header */}
            <div
              className="relative h-40 flex items-center justify-center overflow-hidden"
              style={{
                background: dark
                  ? "linear-gradient(135deg, #2A2570 0%, #453488 50%, #5C3F82 100%)"
                  : "linear-gradient(135deg, #3730A3 0%, #5B3FA0 50%, #7C4DA6 100%)",
              }}
            >
              {/* Decorative blobs */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20"
                style={{ background: "white" }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-10"
                style={{ background: "white" }}
              />

              {/* Icon cluster */}
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-2">🧠</div>
                <div className="flex items-center gap-2 justify-center">
                  {["Positif 😊", "Netral 😐", "Negatif 😟"].map((label) => (
                    <span
                      key={label}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live badge */}
              <span
                className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full
                           flex items-center gap-1"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: indigo,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block dot-pulse" />
                Live
              </span>

              <span
                className="absolute top-3 left-3 text-white text-[10px] font-bold
                           px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                NLP · Sentiment
              </span>
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3
                className="text-base font-bold text-slate-800 mb-2 leading-snug"
                style={{
                  fontFamily: "Lora, Georgia, serif",
                  ...headingStyle(dark, "#E8ECF3"),
                }}
              >
                Analisis Sentimen Artikel Bappenas
              </h3>
              <p
                className="text-xs text-slate-500 mb-4 leading-relaxed"
                style={bodyTextStyle(dark, "#93A0B5")}
              >
                Scraping dan klasifikasi sentimen dari artikel kebijakan
                Bappenas menggunakan metode NLP. Visualisasi distribusi sentimen
                & kata kunci dominan.
              </p>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                {["Web Scraping", "NLP", "Python", "Visualisasi"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: dark ? `${indigo}22` : "#EEF0FC",
                      color: indigo,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="text-xs text-slate-400 font-medium"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    ...bodyTextStyle(dark, "#6B7A94"),
                  }}
                >
                  Lihat Proyek
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-250
                             bg-indigo-50 group-hover:bg-[#3730A3]"
                  style={dark ? { backgroundColor: `${indigo}22` } : undefined}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = indigo)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = dark
                      ? `${indigo}22`
                      : "")
                  }
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#3730A3] group-hover:text-white transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={dark ? indigo : "currentColor"}
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[13px] font-bold text-slate-600"
                style={bodyTextStyle(dark, "#C3CBDA")}
              >
                📲 Media Sosial Proyek
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: dark ? `${indigo}22` : "#EEF0FC",
                  color: indigo,
                  border: `1px solid ${dark ? indigo + "40" : "#C9CDF2"}`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Dokumentasi
              </span>
            </div>

            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl border border-slate-200 p-4
                           transition-all duration-300 hover:-translate-y-1 hover:shadow-xl no-underline"
                style={{
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  ...panelStyle(dark),
                }}
              >
                {/* Platform icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0
                             transition-transform duration-300 group-hover:scale-110"
                  style={{ background: social.gradient }}
                >
                  {social.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span
                      className="text-sm font-bold text-slate-800"
                      style={headingStyle(dark, "#E8ECF3")}
                    >
                      {social.platform}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: social.badgeColor }}
                    >
                      {social.badge}
                    </span>
                  </div>
                  <p
                    className="text-xs text-slate-400 truncate"
                    style={bodyTextStyle(dark, "#8896AC")}
                  >
                    {social.desc}
                  </p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{
                      color: social.badgeColor,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {social.handle}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                             bg-slate-100 group-hover:bg-slate-800 transition-colors"
                  style={panelStyle(dark, {
                    bg: "rgba(255,255,255,0.06)",
                    border: "transparent",
                  })}
                >
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={dark ? "#B8C2D4" : "currentColor"}
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Note card */}
            <div
              className="rounded-xl p-3.5 flex items-start gap-3 border border-[#D9DCF6]"
              style={{
                background: dark ? "rgba(255,255,255,0.03)" : "#F8F9FF",
                borderColor: dark ? "rgba(255,255,255,0.10)" : "#D9DCF6",
              }}
            >
              <span className="text-lg flex-shrink-0">💡</span>
              <p
                className="text-xs text-slate-500 leading-relaxed"
                style={bodyTextStyle(dark, "#93A0B5")}
              >
                Proyek magang ini mencakup pengolahan data mentah, desain
                infografis, dan distribusi konten edukatif seputar kebijakan
                publik Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const DataSeries = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .df-root { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }

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
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          60%       { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
        }
        .dot-pulse { animation: dotPulse 2s ease-in-out infinite; }

        .df-shimmer-text {
          background: linear-gradient(90deg, var(--df-c1) 0%, var(--df-c2) 25%, var(--df-c3) 50%, var(--df-c4) 75%, var(--df-c5) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .df-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .df-scrollbar::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.3); border-radius: 999px; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div
        className="df-root df-scrollbar min-h-screen relative transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(1200px 600px at 10% -10%, #B3551A18 0%, transparent 60%), radial-gradient(1200px 600px at 100% 0%, #1F6F4518 0%, transparent 55%), linear-gradient(180deg, #0B0F17 0%, #0E131C 100%)"
            : "radial-gradient(1200px 600px at 10% -10%, #FBF3EA 0%, transparent 60%), radial-gradient(1200px 600px at 100% 0%, #EFF8F2 0%, transparent 55%), linear-gradient(180deg, #FAFAF8 0%, #F5F5F2 100%)",
          "--df-c1": isDark ? "#E8823D" : "#B3551A",
          "--df-c2": isDark ? "#D9B14A" : "#9C7A1E",
          "--df-c3": isDark ? "#3FAE79" : "#1F6F45",
          "--df-c4": isDark ? "#E2685B" : "#9C2B23",
          "--df-c5": isDark ? "#8B85E0" : "#3730A3",
        }}
      >
        <ThemeToggle dark={isDark} onToggle={() => setIsDark((d) => !d)} />

        {/* Fine graph-paper texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)"
              : "linear-gradient(#0f172a08 1px, transparent 1px), linear-gradient(90deg, #0f172a08 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Rainbow top bar (refined, deeper tones) */}
        <div
          className="h-[3px] relative z-10"
          style={{
            background: isDark
              ? "linear-gradient(90deg, #E8823D, #D9B14A 25%, #3FAE79 50%, #E2685B 75%, #8B85E0)"
              : "linear-gradient(90deg, #B3551A, #9C7A1E 25%, #1F6F45 50%, #9C2B23 75%, #3730A3)",
          }}
        />

        {/* ── HERO ── */}
        <header
          className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 pt-14 pb-12 overflow-hidden"
          style={{
            animationName: "heroIn",
            animationDuration: "0.65s",
            animationFillMode: "both",
          }}
        >
          {/* ambient data-network canvas, signature element */}
          <NetworkCanvas dark={isDark} />

          <div className="flex flex-wrap items-start justify-between gap-8 relative z-10">
            <div className="flex-1 min-w-[260px]">
              <div
                className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200
                              rounded-full px-4 py-1.5 mb-5 shadow-sm"
                style={panelStyle(isDark, {
                  bg: "rgba(20,26,36,0.85)",
                  border: "rgba(255,255,255,0.14)",
                })}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 dot-pulse" />
                <span
                  className="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    ...bodyTextStyle(isDark, "#B0BACB"),
                  }}
                >
                  Data Analyst Portfolio
                </span>
              </div>

              <h1
                className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight
                           tracking-tight mb-4"
                style={{
                  fontFamily: "Lora, Georgia, serif",
                  ...headingStyle(isDark, "#F3F5F9"),
                }}
              >
                Data Visualization
                <br />
                <em className="not-italic df-shimmer-text">
                  Projects Showcase
                </em>
              </h1>

              <p
                className="text-slate-500 text-base leading-relaxed max-w-md"
                style={bodyTextStyle(isDark, "#A6B0C3")}
              >
                Koleksi proyek visualisasi data yang dibangun dengan{" "}
                <strong style={{ color: isDark ? "#E8823D" : "#B3551A" }}>
                  Tableau
                </strong>
                ,{" "}
                <strong style={{ color: isDark ? "#D9B14A" : "#9C7A1E" }}>
                  Power BI
                </strong>
                , dan{" "}
                <strong style={{ color: isDark ? "#3FAE79" : "#1F6F45" }}>
                  Excel
                </strong>{" "}
                — mengubah data mentah menjadi wawasan yang actionable.
              </p>

              <div className="flex flex-wrap gap-2.5 mt-6">
                {TOOLS.map((t) => {
                  const accent = isDark ? t.dotColorDark : t.dotColor;
                  return (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={`flex items-center gap-2 bg-white/90 backdrop-blur-sm ${t.borderClass} border-2
                                rounded-xl px-4 py-2 text-slate-700 text-sm font-bold
                                no-underline transition-all duration-200 hover:-translate-y-0.5
                                hover:shadow-md`}
                      style={{
                        ...panelStyle(isDark, {
                          bg: "rgba(20,26,36,0.85)",
                          border: `${accent}40`,
                        }),
                        ...headingStyle(isDark, "#DCE2EC"),
                      }}
                    >
                      <span className="text-base">{t.emoji}</span>
                      {t.label}
                      {t.subs.map((s) => (
                        <span
                          key={s.id}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            color: accent,
                            background: `${accent}18`,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {s.label}
                        </span>
                      ))}
                    </a>
                  );
                })}
                {/* Maganghub pill */}
                <a
                  href="#maganghub"
                  className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-[#C9CDF2]
                             rounded-xl px-4 py-2 text-slate-700 text-sm font-bold
                             no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    ...panelStyle(isDark, {
                      bg: "rgba(20,26,36,0.85)",
                      border: "#8B85E040",
                    }),
                    ...headingStyle(isDark, "#DCE2EC"),
                  }}
                >
                  <span className="text-base">🏢</span>
                  Maganghub
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      color: isDark ? "#8B85E0" : "#3730A3",
                      background: isDark ? "#8B85E018" : "#3730A315",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Internship
                  </span>
                </a>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 min-w-[240px]">
              {[
                {
                  val: "10+",
                  label: "Tableau Projects",
                  color: isDark ? "#E8823D" : "#B3551A",
                  icon: "📊",
                },
                {
                  val: "10+",
                  label: "Power BI Reports",
                  color: isDark ? "#D9B14A" : "#9C7A1E",
                  icon: "⚡",
                },
                {
                  val: "10+",
                  label: "Excel Workbooks",
                  color: isDark ? "#3FAE79" : "#1F6F45",
                  icon: "📗",
                },
                {
                  val: "4",
                  label: "Tools Mastered",
                  color: isDark ? "#8B85E0" : "#3730A3",
                  icon: "🛠️",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-2xl p-4
                             transition-all duration-250 hover:-translate-y-1 hover:shadow-lg
                             cursor-default"
                  style={panelStyle(isDark, {
                    bg: "rgba(20,26,36,0.9)",
                    border: "rgba(255,255,255,0.10)",
                  })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.color + "45";
                    e.currentTarget.style.boxShadow = `0 10px 28px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark
                      ? "rgba(255,255,255,0.10)"
                      : "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{s.icon}</span>
                    <span
                      className="text-2xl font-extrabold"
                      style={{
                        color: s.color,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {s.val}
                    </span>
                  </div>
                  <div
                    className="text-[11px] text-slate-400 font-semibold"
                    style={bodyTextStyle(isDark, "#8896AC")}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
          <div
            className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
            style={
              isDark
                ? {
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent)",
                  }
                : undefined
            }
          />
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-12">
          {TOOLS.map((tool, i) => (
            <ToolSection key={tool.id} tool={tool} index={i} dark={isDark} />
          ))}

          {/* Maganghub Section */}
          <MaganghubSection dark={isDark} />
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-sm
                           px-6 lg:px-16 py-5 flex justify-between items-center flex-wrap gap-3"
          style={panelStyle(isDark, {
            bg: "rgba(11,15,23,0.85)",
            border: "rgba(255,255,255,0.10)",
          })}
        >
          <div className="flex items-center gap-5 flex-wrap">
            {TOOLS.map((t) => (
              <span
                key={t.id}
                className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"
                style={bodyTextStyle(isDark, "#7C8AA0")}
              >
                {t.emoji} {t.label}
              </span>
            ))}
            <span
              className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"
              style={bodyTextStyle(isDark, "#7C8AA0")}
            >
              🏢 Maganghub
            </span>
          </div>
          <span
            className="text-xs text-slate-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              ...bodyTextStyle(isDark, "#5A6784"),
            }}
          >
            Data Analyst Portfolio · 2026
          </span>
        </footer>
      </div>
    </>
  );
};

export default DataSeries;
