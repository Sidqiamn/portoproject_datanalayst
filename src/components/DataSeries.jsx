import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
import imgMBG from "../assets/mbgkeracunan.png";
import diabatesimg from "../assets/diabetes.png";
import sales_dashboard1 from "../assets/sales_dashboard1.png";
import hR from "../assets/hR.png";
import rankmiliter from "../assets/rankmiliter.png";
import gdp from "../assets/gdp.png";
import lifeex from "../assets/lifeex.png";
import powerBI1 from "../assets/powerBI1.png";
import excell1 from "../assets/excell1.png";
import excel2 from "../assets/exell2.png";
import pytthonimage1 from "../assets/orderheatmap.png";
import dashboard_hijab_Powerbi2 from "../assets/dashboard_hijab_Powerbi2.png";

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
            image: imgMBG,
            url: "/jumlahkeracunanmbg",
            isInternal: true,
          },
          {
            id: 2,
            title: "Ranking Diabetes",
            date: "2024",
            tag: "Diabetes",
            tagColor: "bg-amber-500",
            image: diabatesimg,
            url: "/tableudiabates",
            isInternal: true,
          },
          {
            id: 3,
            title: "Rank Global Military",
            date: "2025",
            tag: "CRM",
            tagColor: "bg-violet-500",
            image: rankmiliter,
            url: "/militerranks",
            isInternal: true,
          },
          {
            id: 4,
            title: "Distribusi GDP Global",
            date: "Des 2025",
            tag: "GDP",
            tagColor: "bg-indigo-500",
            image: gdp,
            url: "/gdp",
            isInternal: true,
          },
          {
            id: 5,
            title: "Life Expectancy",
            date: "Apr 2026",
            tag: "Line Chart",
            tagColor: "bg-red-500",
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
            tagColor: "bg-orange-500",
            image: sales_dashboard1,
            url: "/sales_dashboard1",
            isInternal: true,
          },
          {
            id: 2,
            title: "HR Dashboard",
            date: "Feb 2026",
            tag: "HR",
            tagColor: "bg-blue-500",
            image: hR,
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
        label: "SQL+PowerBI",
        icon: "📋",
        items: [
          {
            id: 1,
            title: "Report E-commerce",
            date: "Jan 2026",
            tag: "Revenue",
            tagColor: "bg-yellow-600",
            image: powerBI1,
            url: "/powerBI1",
            isInternal: false,
          },
          {
            id: 2,
            title: "Zen Hijab Dashboard",
            date: "Feb 2026",
            tag: "E-Commerce",
            tagColor: "bg-sky-500",
            image: dashboard_hijab_Powerbi2,
            url: "/Powerbi2Hijab",
            isInternal: false,
          },
        ],
      },
      // {
      //   id: "SQL-PowerBI",
      //   label: "Reports Dashboard",
      //   icon: "📈",
      //   items: [
      //     {
      //       id: 1,
      //       title: "Real-Time Operations Dashboard",
      //       date: "Jan 2026",
      //       tag: "Ops",
      //       tagColor: "bg-yellow-600",
      //       image: imgMBG,
      //       url: "#",
      //       isInternal: true,
      //     },
      //     {
      //       id: 2,
      //       title: "Budget vs Actual Dashboard",
      //       date: "Feb 2026",
      //       tag: "Finance",
      //       tagColor: "bg-blue-500",
      //       image: imgMBG,
      //       url: "#",
      //       isInternal: true,
      //     },
      //   ],
      // },
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
            image: excell1,
            url: "/excell1",
            isInternal: true,
          },
          {
            id: 2,
            title: "Dashboard Sales Analysis",
            date: "Jan 2026",
            tag: "Pivot, Power Query, VBA",
            tagColor: "bg-green-600",
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
    label: "python",
    emoji: "📗",
    accentClass: "text-red-700",
    badgeClass: "bg-red-600",
    borderClass: "border-red-200",
    bgClass: "bg-red-50",
    leftBarClass: "border-red-200",
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
            tagColor: "bg-red-600",
            image: pytthonimage1,
            url: "/EcommerceAnalytics",
            isInternal: true,
          },
          // {
          //   id: 2,
          //   title: "Dashboard Sales Analysis",
          //   date: "Jan 2026",
          //   tag: "Pivot, Power Query, VBA",
          //   tagColor: "bg-green-600",
          //   image: excel2,
          //   url: "/excel2",
          //   isInternal: true,
          // },
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
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 ${item.tagColor} text-white text-[10px] font-bold
                          px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md`}
        >
          {item.tag}
        </span>
        <span
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-600
                         text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/50"
        >
          {item.date}
        </span>
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
      <div
        onClick={() => setOpen((o) => !o)}
        className={`${tool.bgClass} ${tool.borderClass} border-2 rounded-2xl px-6 py-5
                    flex items-center justify-between cursor-pointer
                    transition-all duration-200 hover:shadow-md mb-0 select-none`}
      >
        <div className="flex items-center gap-4">
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
                className={`${tool.badgeClass} text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full`}
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

// ─── MAGANGHUB SECTION ────────────────────────────────────────────────────────
function MaganghubSection() {
  const navigate = useNavigate();

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
      badgeColor: "#E1306C",
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
      badgeColor: "#EE1D52",
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
          background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)",
          borderColor: "#c7d2fe",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm border-2"
            style={{ background: "white", borderColor: "#c7d2fe" }}
          >
            🏢
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Maganghub Edudata
              </h2>
              <span
                className="text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: "#6366f1" }}
              >
                Internship Project
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Scraping data, analisis sentimen & content creation
            </p>
          </div>
        </div>
        <span
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold
                     text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full"
        >
          🎓 Magang 2026
        </span>
      </div>

      {/* Content */}
      <div className="ml-3 pl-4 border-l-4 border-indigo-200">
        {/* Description block */}
        <div
          className="rounded-2xl p-5 mb-6 border border-indigo-100"
          style={{
            background: "linear-gradient(135deg, #f8faff 0%, #f0fdf4 100%)",
          }}
        >
          <p className="text-sm text-slate-600 leading-relaxed">
            Selama magang di{" "}
            <strong className="text-indigo-600">Maganghub Edudata</strong>, saya
            mengerjakan proyek scraping data artikel dari{" "}
            <strong className="text-slate-700">Bappenas</strong> dan melakukan{" "}
            <strong className="text-slate-700">analisis sentimen</strong>{" "}
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
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            {/* Visual header */}
            <div
              className="relative h-40 flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
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
                  color: "#4f46e5",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block dot-pulse" />
                Live
              </span>

              <span
                className="absolute top-3 left-3 text-white text-[10px] font-bold
                           px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.25)" }}
              >
                NLP · Sentiment
              </span>
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3
                className="text-base font-bold text-slate-800 mb-2 leading-snug"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                Analisis Sentimen Artikel Bappenas
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Scraping dan klasifikasi sentimen dari artikel kebijakan
                Bappenas menggunakan metode NLP. Visualisasi distribusi sentimen
                & kata kunci dominan.
              </p>

              <div className="flex items-center gap-2 flex-wrap mb-4">
                {["Web Scraping", "NLP", "Python", "Visualisasi"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: "#eef2ff", color: "#4f46e5" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Lihat Proyek
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-250
                             bg-indigo-50 group-hover:bg-indigo-600"
                >
                  <svg
                    className="w-3.5 h-3.5 text-indigo-500 group-hover:text-white transition-colors"
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

          {/* Social Media Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] font-bold text-slate-600">
                📲 Media Sosial Proyek
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "#eef2ff",
                  color: "#4f46e5",
                  border: "1px solid #c7d2fe",
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
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
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
                    <span className="text-sm font-bold text-slate-800">
                      {social.platform}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: social.badgeColor }}
                    >
                      {social.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {social.desc}
                  </p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: social.badgeColor }}
                  >
                    {social.handle}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                             bg-slate-100 group-hover:bg-slate-800 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Note card */}
            <div
              className="rounded-xl p-3.5 flex items-start gap-3 border border-indigo-100"
              style={{ background: "#f8faff" }}
            >
              <span className="text-lg flex-shrink-0">💡</span>
              <p className="text-xs text-slate-500 leading-relaxed">
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
              "linear-gradient(90deg, #E97627, #F2C811 25%, #217346 50%, #6366f1 75%, #a855f7)",
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
            <div className="flex-1 min-w-[260px]">
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
                {/* Maganghub pill */}
                <a
                  href="#maganghub"
                  className="flex items-center gap-2 bg-white border-2 border-indigo-200
                             rounded-xl px-4 py-2 text-slate-700 text-sm font-bold
                             no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-base">🏢</span>
                  Maganghub
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: "#6366f1", background: "#6366f115" }}
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
                  val: "4",
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

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 py-12">
          {TOOLS.map((tool, i) => (
            <ToolSection key={tool.id} tool={tool} index={i} />
          ))}

          {/* Maganghub Section */}
          <MaganghubSection />
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 border-t border-slate-200 bg-white
                           px-6 lg:px-16 py-5 flex justify-between items-center flex-wrap gap-3"
        >
          <div className="flex items-center gap-5 flex-wrap">
            {TOOLS.map((t) => (
              <span
                key={t.id}
                className="text-xs text-slate-400 font-semibold flex items-center gap-1.5"
              >
                {t.emoji} {t.label}
              </span>
            ))}
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              🏢 Maganghub
            </span>
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
