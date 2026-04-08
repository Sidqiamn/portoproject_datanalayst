import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Kasus",
    value: "16.058",
    icon: "🏥",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    label: "Provinsi Terdampak",
    value: "28",
    icon: "📍",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "Kasus Tertinggi",
    value: "Jawa Barat",
    icon: "📊",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    label: "Periode Data",
    value: "2025–2026",
    icon: "📅",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const highProvinces = [
  { name: "Jawa Barat", cases: 5397, pct: 100 },
  { name: "Jawa Tengah", cases: 4081, pct: 75.6 },
  { name: "DI Yogyakarta", cases: 3442, pct: 63.8 },
  { name: "Jawa Timur", cases: 1445, pct: 26.8 },
];

const midProvinces = [
  { name: "Bengkulu", cases: 539 },
  { name: "Lampung", cases: 475 },
  { name: "Nusa Tenggara Barat", cases: 344 },
  { name: "Sumatera Selatan", cases: 318 },
  { name: "Maluku", cases: 309 },
  { name: "Kepulauan Riau", cases: 267 },
];

const lowProvinces = [
  { name: "Kalimantan Timur", cases: 5 },
  { name: "Aceh", cases: 3 },
  { name: "Sulawesi Selatan", cases: 2 },
];

const Detail1 = () => {
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
        .fade-up {
          animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both;
        }
        .bar-fill {
          animation: barGrow 1s cubic-bezier(.22,.68,0,1.2) 0.4s both;
        }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
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
          {/* ── BACK BUTTON ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500
                       hover:text-blue-600 transition-colors group"
          >
            <span
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm
                             flex items-center justify-center
                             group-hover:bg-blue-50 group-hover:border-blue-200 transition-all"
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

          {/* ── HERO CARD ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            style={{ animationDelay: "0.05s" }}
          >
            {/* Gradient header */}
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
              }}
            >
              {/* BG decoration */}
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
                  background: "radial-gradient(circle, #93c5fd, transparent)",
                  transform: "translate(-20%, 30%)",
                }}
              />

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25
                                 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  📊 Tableau · Maps
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/70 text-xs font-medium">
                  Geospatial Analysis
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                Analisis Sebaran Gejala
                <br />
                <span className="text-blue-200">Keracunan MBG</span>
              </h1>
              <p className="text-blue-100 text-sm leading-relaxed max-w-xl">
                Distribusi kasus keracunan Makanan Bergizi Gratis (MBG)
                berdasarkan provinsi di Indonesia. Data diolah untuk mendukung
                evaluasi kebijakan keamanan pangan nasional.
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 Februari 2026",
                  "🗺️ 28 Provinsi",
                  "🔬 Tableau Public",
                  "📁 Geospatial",
                ].map((m) => (
                  <span
                    key={m}
                    className="bg-white/10 border border-white/20 text-white/85
                                           text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Overlap stats row */}
            <div className="bg-white px-6 pb-6 -mt-6 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -translate-y-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`${s.bg} ${s.border} border-2 rounded-2xl p-4 shadow-sm
                                hover:-translate-y-1 hover:shadow-md transition-all duration-250`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{s.icon}</span>
                      <span className={`text-lg font-extrabold ${s.color}`}>
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
                Tableau Public · Interactive Visualization
              </span>
              <span
                className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600
                               bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="w-full" style={{ height: "580px" }}>
              <iframe
                title="Keracunan MBG Tableau"
                src="https://public.tableau.com/views/KeracunanMBG/Sheet1?:embed=y&:display_count=yes&:showVizHome=no"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* ── INTRO TEXT ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 px-8 py-7"
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-slate-600 leading-relaxed text-base">
              Berdasarkan hasil pengolahan data, jumlah laporan Gejala Keracunan
              MBG menunjukkan distribusi yang{" "}
              <strong className="text-slate-800">tidak merata</strong> antar
              provinsi di Indonesia. Konsentrasi kasus paling tinggi terlihat di
              wilayah <strong className="text-blue-600">Pulau Jawa</strong>,
              sementara sebagian besar wilayah Indonesia Timur mencatat angka
              yang jauh lebih rendah.
            </p>
          </div>

          {/* ── ANALYSIS SECTIONS ── */}
          {/* HIGH */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-red-100 overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-red-50 border-b border-red-100">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-lg shadow-sm shadow-red-200">
                🔴
              </div>
              <div>
                <h3 className="text-base font-bold text-red-600">
                  Provinsi dengan Kasus Tertinggi
                </h3>
                <p className="text-xs text-red-400 font-medium">
                  Dominasi wilayah Pulau Jawa
                </p>
              </div>
            </div>
            <div className="px-7 py-6 space-y-5">
              {highProvinces.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-700">
                      {p.name}
                    </span>
                    <span className="text-sm font-extrabold text-red-500">
                      {p.cases.toLocaleString("id-ID")} kasus
                    </span>
                  </div>
                  <div className="h-2.5 bg-red-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{
                        "--w": `${p.pct}%`,
                        background: `linear-gradient(90deg, #ef4444, #f87171)`,
                        animationDelay: `${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MID */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-amber-50 border-b border-amber-100">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-sm shadow-amber-200">
                🟡
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-600">
                  Provinsi dengan Kasus Menengah
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Tersebar di Sumatera, NTB, dan Maluku
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {midProvinces.map((p, i) => (
                  <div
                    key={i}
                    className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3
                               hover:border-amber-300 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="text-sm font-bold text-slate-700">
                      {p.name}
                    </div>
                    <div className="text-xs font-extrabold text-amber-500 mt-0.5">
                      {p.cases.toLocaleString("id-ID")} kasus
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LOW */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-emerald-50 border-b border-emerald-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-lg shadow-sm shadow-emerald-200">
                🟢
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-600">
                  Provinsi dengan Kasus Rendah
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  Mayoritas wilayah Indonesia Timur
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="flex flex-wrap gap-3 mb-4">
                {lowProvinces.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-emerald-50 border border-emerald-100
                               rounded-full px-4 py-2 hover:border-emerald-300 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-700">
                      {p.name}
                    </span>
                    <span
                      className="text-xs font-extrabold text-emerald-600 bg-emerald-100
                                    px-2 py-0.5 rounded-full"
                    >
                      {p.cases} kasus
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Angka rendah dapat dipengaruhi oleh faktor{" "}
                <strong className="text-slate-600">populasi</strong>,{" "}
                <strong className="text-slate-600">distribusi program</strong>,
                maupun{" "}
                <strong className="text-slate-600">
                  kelengkapan sistem pelaporan
                </strong>{" "}
                di daerah tersebut.
              </p>
            </div>
          </div>

          {/* ── KESIMPULAN ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-blue-100"
            style={{ animationDelay: "0.35s" }}
          >
            <div
              className="px-7 py-5 border-b border-blue-100"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center
                               text-lg shadow-sm shadow-blue-200"
                >
                  🔎
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-700">
                    Kesimpulan & Implikasi
                  </h3>
                  <p className="text-xs text-blue-400 font-medium">
                    Rekomendasi berbasis data
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                Secara keseluruhan, kasus Gejala Keracunan MBG terkonsentrasi di
                Pulau Jawa dengan perbedaan signifikan dibandingkan wilayah
                lain. Data ini penting sebagai dasar evaluasi distribusi MBG,
                penguatan pengawasan keamanan pangan, serta perumusan kebijakan
                kesehatan masyarakat.
              </p>

              {/* Key points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    icon: "📋",
                    label: "Evaluasi Distribusi",
                    desc: "Tinjau ulang pola distribusi MBG di Pulau Jawa",
                    color: "blue",
                  },
                  {
                    icon: "🛡️",
                    label: "Pengawasan Pangan",
                    desc: "Perkuat standar keamanan pangan di daerah padat",
                    color: "indigo",
                  },
                  {
                    icon: "🏛️",
                    label: "Kebijakan Publik",
                    desc: "Dorong kebijakan berbasis data di tingkat provinsi",
                    color: "violet",
                  },
                ].map((k, i) => (
                  <div
                    key={i}
                    className={`bg-${k.color}-50 border border-${k.color}-100 rounded-2xl p-4
                                hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200`}
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500
                         hover:text-blue-600 transition-colors group"
            >
              <span
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm
                               flex items-center justify-center
                               group-hover:bg-blue-50 group-hover:border-blue-200 transition-all"
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
              href="https://public.tableau.com/views/KeracunanMBG/Sheet1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-sm font-bold px-5 py-2.5 rounded-xl
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
                         hover:shadow-blue-200"
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

export default Detail1;
