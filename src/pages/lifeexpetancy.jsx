import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Harapan Hidup Tertinggi",
    value: "86,73 th",
    icon: "📈",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    label: "Harapan Hidup Terendah",
    value: "54,9 th",
    icon: "📉",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    label: "Cakupan Negara",
    value: "190+",
    icon: "🌍",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "Sumber Data",
    value: "worldometers",
    icon: "🏛️",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const highLE = [
  { name: "Monaco", years: 86.73, pct: 100, flag: "🇯🇵" },
  { name: "San Marino", years: 86, pct: 99.4, flag: "🇨🇭" },
  { name: "Hongkong", years: 85.9, pct: 99.0, flag: "🇸🇬" },
  { name: "Japan", years: 85.1, pct: 98.7, flag: "🇦🇺" },
  { name: "South korea", years: 84.64, pct: 98.5, flag: "🇰🇷" },
];

const lowLE = [
  { name: "Somalia", years: 59.26, flag: "🇹🇩" },
  { name: "Lesotho", years: 58.63, flag: "🇳🇬" },
  { name: "South Sudan", years: 57.97, flag: "🇸🇱" },
  { name: "Central African Rep.", years: 58.15, flag: "🇨🇫" },
  { name: "Chad", years: 55.58, flag: "🇱🇸" },
  { name: "Nigeria", years: 54.95, flag: "🇸🇴" },
];

const asean = [
  { name: "Singapore", years: 84.13, flag: "🇸🇬" },
  { name: "Malaysia", years: 77.16, flag: "🇲🇾" },
  { name: "Thailand", years: 77, flag: "🇹🇭" },
  { name: "Vietnam", years: 75, flag: "🇻🇳" },
  { name: "Indonesia", years: 71.5, flag: "🇮🇩", highlight: true },
  { name: "Philippines", years: 70.1, flag: "🇵🇭" },
];

const trendFacts = [
  {
    era: "Era Pra-2000",
    desc: "Rata-rata harapan hidup global masih berada di kisaran 65–66 tahun, tertekan oleh konflik, penyakit menular, dan kemiskinan.",
    icon: "🕰️",
    color: "slate",
  },
  {
    era: "Penurunan Tajam",
    desc: "Terdapat titik terendah (~54,9 tahun) yang mencerminkan dampak krisis kesehatan global seperti HIV/AIDS dan konflik bersenjata.",
    icon: "📉",
    color: "red",
  },
  {
    era: "Pemulihan Bertahap",
    desc: "Setelah titik terendah, harapan hidup mulai membaik secara konsisten seiring akses kesehatan dan vaksinasi yang meluas.",
    icon: "🔄",
    color: "amber",
  },
  {
    era: "Tren Terkini",
    desc: "Harapan hidup global mencapai puncak 71,1 tahun, didorong kemajuan medis, sanitasi, dan penurunan angka kematian bayi.",
    icon: "📈",
    color: "emerald",
  },
];

const colorMap = {
  slate: {
    bg: "bg-slate-50",
    border: "border-slate-100",
    title: "text-slate-700",
    icon: "bg-slate-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    title: "text-red-700",
    icon: "bg-red-500",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "text-amber-700",
    icon: "bg-amber-400",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "text-emerald-700",
    icon: "bg-emerald-500",
  },
};

// ── Tableau Embed Component ──
const TableauViz = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const TABLEAU_URL =
      "https://public.tableau.com/views/lifeexpetancy_17756170408770/Sheet1";

    // Cek apakah script sudah ada
    const existingScript = document.getElementById("tableau-api-script");

    const initViz = () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";

      const vizEl = document.createElement("tableau-viz");
      vizEl.setAttribute("src", TABLEAU_URL);
      vizEl.setAttribute("width", "100%");
      vizEl.setAttribute("height", "560");
      vizEl.setAttribute("toolbar", "bottom");
      vizEl.setAttribute("hide-tabs", "false");

      containerRef.current.appendChild(vizEl);
    };

    if (existingScript) {
      // Script sudah ada, langsung init
      initViz();
    } else {
      const script = document.createElement("script");
      script.id = "tableau-api-script";
      script.type = "module";
      script.src =
        "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
      script.onload = initViz;
      document.body.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", minHeight: "560px" }}
      className="flex items-center justify-center"
    >
      {/* Loading placeholder */}
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Memuat visualisasi…</span>
      </div>
    </div>
  );
};

const Lifeexpetancy = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;1,600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--w); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both; }
        .bar-fill { animation: barGrow 1s cubic-bezier(.22,.68,0,1.2) 0.4s both; }

        tableau-viz {
          display: block;
          width: 100% !important;
        }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Dot grid BG */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* ── BACK ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-all">
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
            className="fade-up rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #134e4a 0%, #0d9488 55%, #2dd4bf 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #fff, transparent)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #99f6e4, transparent)",
                  transform: "translate(-20%, 30%)",
                }}
              />

              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  📊 Tableau · Line Chart
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/70 text-xs font-medium">
                  Global Health Analysis
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                Life Expectancy
                <br />
                <span className="text-teal-200">Tren Harapan Hidup Global</span>
              </h1>
              <p className="text-teal-100 text-sm leading-relaxed max-w-xl">
                Visualisasi tren harapan hidup rata-rata dunia dari waktu ke
                waktu berdasarkan data World Bank. Chart interaktif memungkinkan
                eksplorasi per negara untuk memahami disparitas kesehatan
                global.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "🏦 worldometers",
                  "🌍 190+ Negara",
                  "📈 Line Chart",
                  "❤️ Public Health",
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

            {/* Stat cards overlap */}
            <div className="bg-white px-6 pb-6 -mt-6 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -translate-y-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`${s.bg} ${s.border} border-2 rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{s.icon}</span>
                      <span className={`text-base font-extrabold ${s.color}`}>
                        {s.value}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-semibold">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TABLEAU EMBED (Embedding API v3) ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Browser chrome bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-semibold text-slate-400 tracking-wide">
                Tableau Public · Interactive Visualization
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
                Live
              </span>
            </div>

            {/* ← Tableau Embedding API v3 (bukan iframe) → */}
            <div className="w-full p-0">
              <TableauViz />
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium">
                💡 <strong className="text-slate-500">Tips:</strong> Gunakan
                filter <em>Country Name</em> di sisi kanan chart untuk
                membandingkan tren harapan hidup antar negara.
              </p>
            </div>
          </div>

          {/* ── INTRO ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 px-8 py-7"
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-slate-600 leading-relaxed text-base">
              Harapan hidup (life expectancy) adalah salah satu indikator
              kesehatan masyarakat yang paling fundamental. Visualisasi ini
              menampilkan tren harapan hidup rata-rata global dalam bentuk
              <strong className="text-slate-800"> line chart interaktif</strong>
              , dengan titik terendah sekitar{" "}
              <strong className="text-red-600">54,9 tahun</strong> dan memuncak
              di <strong className="text-teal-600">86,7 tahun</strong> —
              mencerminkan kemajuan signifikan dalam kesehatan global meski
              diwarnai periode krisis.
            </p>
          </div>

          {/* ── TREN PERJALANAN ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-slate-50 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-lg shadow-sm shadow-teal-200">
                📊
              </div>
              <div>
                <h3 className="text-base font-bold text-teal-700">
                  Perjalanan Tren Harapan Hidup
                </h3>
                <p className="text-xs text-teal-400 font-medium">
                  Membaca pola naik-turun dari line chart
                </p>
              </div>
            </div>
            <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trendFacts.map((t, i) => {
                const col = colorMap[t.color];
                return (
                  <div
                    key={i}
                    className={`${col.bg} ${col.border} border rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${col.icon} flex items-center justify-center text-base mb-3`}
                    >
                      {t.icon}
                    </div>
                    <div className={`text-sm font-bold ${col.title} mb-1.5`}>
                      {t.era}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── NEGARA TERTINGGI ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-emerald-50 border-b border-emerald-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-lg shadow-sm shadow-emerald-200">
                🟢
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-700">
                  Negara dengan Harapan Hidup Tertinggi Tahun 2026
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Didominasi negara maju dengan sistem kesehatan kuat
                </p>
              </div>
            </div>
            <div className="px-7 py-6 space-y-4">
              {highLE.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-500">
                        {i + 1}
                      </span>
                      <span className="text-base">{c.flag}</span>
                      <span className="text-sm font-bold text-slate-700">
                        {c.name}
                      </span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-600">
                      {c.years} tahun
                    </span>
                  </div>
                  <div className="h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{
                        "--w": `${c.pct}%`,
                        background: "linear-gradient(90deg, #10b981, #34d399)",
                        animationDelay: `${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── NEGARA TERENDAH ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-red-100 overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-red-50 border-b border-red-100">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-lg shadow-sm shadow-red-200">
                🔴
              </div>
              <div>
                <h3 className="text-base font-bold text-red-700">
                  Negara dengan Harapan Hidup Terendah Tahun 2026
                </h3>
                <p className="text-xs text-red-400 font-medium">
                  Mayoritas di Afrika Sub-Sahara
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {lowLE.map((c, i) => (
                  <div
                    key={i}
                    className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 hover:border-red-300 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-base">{c.flag}</span>
                      <span className="text-xs font-bold text-slate-700">
                        {c.name}
                      </span>
                    </div>
                    <div className="text-sm font-extrabold text-red-500">
                      {c.years} tahun
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Rendahnya harapan hidup di negara-negara ini umumnya disebabkan
                oleh{" "}
                <strong className="text-slate-600">
                  konflik berkepanjangan
                </strong>
                ,{" "}
                <strong className="text-slate-600">
                  akses kesehatan yang terbatas
                </strong>
                , serta{" "}
                <strong className="text-slate-600">
                  tingginya angka kematian bayi dan ibu
                </strong>
                .
              </p>
            </div>
          </div>

          {/* ── ASEAN SPOTLIGHT ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-teal-100 overflow-hidden"
            style={{ animationDelay: "0.33s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-teal-50 border-b border-teal-100">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-lg shadow-sm shadow-teal-200">
                🌏
              </div>
              <div>
                <h3 className="text-base font-bold text-teal-700">
                  Sorotan: Harapan Hidup di ASEAN
                </h3>
                <p className="text-xs text-teal-400 font-medium">
                  Disparitas antar negara Asia Tenggara
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="space-y-3 mb-5">
                {asean.map((c, i) => {
                  const maxYears = 83.5;
                  const pct = ((c.years - 54) / (maxYears - 54)) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span
                            className={`text-sm font-bold ${c.highlight ? "text-red-600" : "text-slate-700"}`}
                          >
                            {c.name}
                          </span>
                          {c.highlight && (
                            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                              Kita
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-sm font-extrabold ${c.highlight ? "text-red-500" : "text-teal-600"}`}
                        >
                          {c.years} tahun
                        </span>
                      </div>
                      <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bar-fill ${c.highlight ? "bg-red-400" : "bg-teal-400"}`}
                          style={{
                            "--w": `${pct}%`,
                            animationDelay: `${0.3 + i * 0.08}s`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  🇮🇩 <strong className="text-red-600">Indonesia</strong>{" "}
                  mencatat harapan hidup sekitar{" "}
                  <strong className="text-slate-700">68 tahun</strong> — berada
                  di bawah rata-rata ASEAN. Masih ada ruang besar untuk
                  peningkatan melalui penguatan layanan kesehatan primer dan
                  pengurangan kesenjangan antar daerah.
                </p>
              </div>
            </div>
          </div>

          {/* ── FAKTOR PENENTU ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden"
            style={{ animationDelay: "0.36s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-blue-50 border-b border-blue-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-lg shadow-sm shadow-blue-200">
                🔬
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-700">
                  Faktor Penentu Harapan Hidup
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  Variabel yang paling berpengaruh
                </p>
              </div>
            </div>
            <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: "🏥",
                  label: "Akses Layanan Kesehatan",
                  desc: "Ketersediaan fasilitas, tenaga medis, dan keterjangkauan biaya kesehatan.",
                  color: "blue",
                },
                {
                  icon: "💧",
                  label: "Sanitasi & Air Bersih",
                  desc: "Akses air minum bersih dan sanitasi yang layak mencegah penyakit menular utama.",
                  color: "teal",
                },
                {
                  icon: "🍎",
                  label: "Gizi & Pangan",
                  desc: "Kecukupan gizi sejak masa kanak-kanak berdampak langsung pada kualitas dan panjang usia.",
                  color: "emerald",
                },
                {
                  icon: "📚",
                  label: "Pendidikan & Literasi",
                  desc: "Tingkat pendidikan berkorelasi kuat dengan pemahaman kesehatan dan perilaku hidup sehat.",
                  color: "violet",
                },
                {
                  icon: "🏙️",
                  label: "Urbanisasi & Lingkungan",
                  desc: "Kualitas udara, kepadatan penduduk, dan infrastruktur kota memengaruhi kesehatan jangka panjang.",
                  color: "amber",
                },
                {
                  icon: "🛡️",
                  label: "Stabilitas & Kebijakan",
                  desc: "Negara dengan tata kelola baik dan tidak berkonflik cenderung memiliki harapan hidup lebih tinggi.",
                  color: "slate",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className={`bg-${f.color}-50 border border-${f.color}-100 rounded-2xl p-4 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200`}
                >
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <div className={`text-sm font-bold text-${f.color}-700 mb-1`}>
                    {f.label}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── KESIMPULAN ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-teal-100"
            style={{ animationDelay: "0.4s" }}
          >
            <div
              className="px-7 py-5 border-b border-teal-100"
              style={{
                background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-lg shadow-sm shadow-teal-200">
                  🔎
                </div>
                <div>
                  <h3 className="text-base font-bold text-teal-700">
                    Kesimpulan & Implikasi
                  </h3>
                  <p className="text-xs text-teal-400 font-medium">
                    Rekomendasi berbasis data
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                Tren harapan hidup global mencerminkan kemajuan peradaban
                manusia, namun juga mengungkap ketimpangan mendalam. Penurunan
                tajam yang terlihat di chart mengingatkan betapa rapuhnya
                pencapaian kesehatan terhadap krisis — dan betapa pentingnya
                investasi berkelanjutan dalam sistem kesehatan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    icon: "💊",
                    label: "Investasi Kesehatan",
                    desc: "Perkuat sistem kesehatan primer agar lebih tangguh menghadapi krisis.",
                    color: "teal",
                  },
                  {
                    icon: "⚖️",
                    label: "Kurangi Disparitas",
                    desc: "Fokus pada negara & wilayah tertinggal agar tidak semakin jauh tertinggal.",
                    color: "blue",
                  },
                  {
                    icon: "📊",
                    label: "Monitor Berkelanjutan",
                    desc: "Data harapan hidup harus jadi barometer utama evaluasi kebijakan publik.",
                    color: "violet",
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
            style={{ animationDelay: "0.44s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-200 transition-all">
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
              href="https://public.tableau.com/app/profile/sidqi.amanullah/viz/lifeexpetancy/Sheet1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-200"
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

export default Lifeexpetancy;
