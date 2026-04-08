import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Negara Dianalisis",
    value: "145",
    icon: "🌍",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    label: "Posisi Indonesia",
    value: "#13",
    icon: "🇮🇩",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    label: "PowerIndex RI",
    value: "0.2557",
    icon: "⚡",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    label: "Indikator Diukur",
    value: "60+",
    icon: "📐",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const topCountries = [
  {
    rank: 1,
    name: "Amerika Serikat",
    flag: "🇺🇸",
    pwrIdx: "0.0744",
    pct: 100,
    desc: "Unggul dalam pesawat tempur, kapal selam & anggaran pertahanan",
  },
  {
    rank: 2,
    name: "Rusia",
    flag: "🇷🇺",
    pwrIdx: "0.0788",
    pct: 96,
    desc: "Kuat dalam artileri, MLRS, dan cadangan gas alam terbesar",
  },
  {
    rank: 3,
    name: "China",
    flag: "🇨🇳",
    pwrIdx: "0.0788",
    pct: 93,
    desc: "Personel aktif terbesar, ekspansi kekuatan laut yang masif",
  },
  {
    rank: 4,
    name: "India",
    flag: "🇮🇳",
    pwrIdx: "0.1184",
    pct: 78,
    desc: "Populasi militer terbesar dengan 5,1 juta personel total",
  },
  {
    rank: 5,
    name: "Korea Selatan",
    flag: "🇰🇷",
    pwrIdx: "0.1627",
    pct: 68,
    desc: "Wajib militer ketat dan armada kapal perusak modern",
  },
];

const midCountries = [
  { rank: 6, name: "Inggris", flag: "🇬🇧", pwrIdx: "0.1771" },
  { rank: 7, name: "Prancis", flag: "🇫🇷", pwrIdx: "0.1839" },
  { rank: 8, name: "Jepang", flag: "🇯🇵", pwrIdx: "0.1839" },
  { rank: 9, name: "Turki", flag: "🇹🇷", pwrIdx: "0.1914" },
  { rank: 10, name: "Italia", flag: "🇮🇹", pwrIdx: "0.1973" },
  { rank: 11, name: "Brasil", flag: "🇧🇷", pwrIdx: "0.2069" },
];

const indonesiaStrengths = [
  {
    icon: "👥",
    label: "Populasi Besar",
    desc: "Tenaga kerja militer potensial sangat besar",
  },
  {
    icon: "⚓",
    label: "Armada Kapal Niaga",
    desc: "Kapasitas angkut maritim yang kompetitif",
  },
  {
    icon: "⛏️",
    label: "Produksi Batu Bara",
    desc: "Sumber daya energi pendukung logistik militer",
  },
];

const indonesiaWeaknesses = [
  {
    icon: "🚢",
    label: "Kapal Induk",
    desc: "Belum memiliki armada kapal induk",
  },
  {
    icon: "🚁",
    label: "Helikopter Serang",
    desc: "Jumlah terbatas dibanding negara setara",
  },
  {
    icon: "💳",
    label: "Utang Luar Negeri",
    desc: "Menjadi faktor pengurang skor PowerIndex",
  },
];

const neighborRanks = [
  {
    rank: 12,
    name: "Israel",
    flag: "🇮🇱",
    pwrIdx: "0.2661",
    note: "Di bawah Indonesia",
  },
  {
    rank: 13,
    name: "Indonesia 🏆",
    flag: "🇮🇩",
    pwrIdx: "0.2557",
    note: "Posisi RI",
    highlight: true,
  },
  {
    rank: 14,
    name: "Jerman",
    flag: "🇩🇪",
    pwrIdx: "0.2663",
    note: "Di bawah Indonesia",
  },
  {
    rank: 15,
    name: "Australia",
    flag: "🇦🇺",
    pwrIdx: "0.3168",
    note: "Di bawah Indonesia",
  },
];

const MiliterRanks = () => {
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
        @keyframes badgePop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .fade-up {
          animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both;
        }
        .bar-fill {
          animation: barGrow 1.1s cubic-bezier(.22,.68,0,1.2) 0.4s both;
        }
        .badge-pop {
          animation: badgePop 0.5s cubic-bezier(.22,.68,0,1.2) 0.6s both;
        }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Dot grid BG */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* ── BACK BUTTON ── */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-slate-50 group-hover:border-slate-300 transition-all">
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
            className="fade-up rounded-3xl overflow-hidden shadow-xl border border-slate-200"
            style={{ animationDelay: "0.05s" }}
          >
            {/* Gradient header — dark military green/slate */}
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #334155 100%)",
              }}
            >
              {/* BG decoration */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #94a3b8, transparent)",
                  transform: "translate(35%, -35%)",
                }}
              />
              <div
                className="absolute bottom-0 left-10 w-52 h-52 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #475569, transparent)",
                  transform: "translateY(35%)",
                }}
              />

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  📊 Tableau · Bar Chart
                </span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs font-medium">
                  Global Military Ranking
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                Peringkat Kekuatan
                <br />
                <span className="text-slate-300">Militer Dunia 2025</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Visualisasi peringkat kekuatan militer 145 negara berdasarkan
                skor PowerIndex Global Firepower — mencakup 60+ indikator mulai
                dari personel, aset tempur, keuangan, geografi, hingga sumber
                daya alam.
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 Data 2025",
                  "🌍 145 Negara",
                  "🔬 Global Firepower",
                  "📁 Bar Chart",
                ].map((m) => (
                  <span
                    key={m}
                    className="bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Indonesia badge */}
              <div
                className="badge-pop absolute top-8 right-8 hidden sm:flex flex-col items-center justify-center
                           w-24 h-24 rounded-full border-2 border-amber-400/60 bg-amber-400/10 backdrop-blur-sm"
              >
                <span className="text-3xl">🇮🇩</span>
                <span className="text-amber-300 text-xs font-extrabold mt-0.5">
                  Rank #13
                </span>
              </div>
            </div>

            {/* Overlap stats row */}
            <div className="bg-white px-6 pb-6 -mt-6 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -translate-y-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`${s.bg} ${s.border} border-2 rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-250`}
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
                Tableau Public · Interactive Bar Chart
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Live
              </span>
            </div>
            <div className="w-full" style={{ height: "580px" }}>
              <iframe
                title="Rank Militer Dunia Tableau"
                src="https://public.tableau.com/views/rankmiliter/Sheet1?:embed=y&:display_count=yes&:showVizHome=no"
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
              Berdasarkan data{" "}
              <strong className="text-slate-800">Global Firepower 2025</strong>,
              peta kekuatan militer dunia masih didominasi oleh trio{" "}
              <strong className="text-slate-800">
                Amerika Serikat, Rusia, dan China
              </strong>
              . Namun yang menarik,{" "}
              <strong className="text-red-600">
                Indonesia berhasil masuk 15 besar
              </strong>{" "}
              dengan mengungguli negara-negara seperti Israel, Jerman, dan
              Australia — sebuah capaian yang mencerminkan potensi besar dari
              sisi populasi dan sumber daya strategis nasional.
            </p>
          </div>

          {/* ── TOP 5 SECTION ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div
              className="flex items-center gap-3 px-7 py-5 border-b border-slate-100"
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-sm">
                🏆
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  5 Negara Militer Terkuat Dunia
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Berdasarkan skor PowerIndex Global Firepower 2025
                </p>
              </div>
            </div>
            <div className="px-7 py-6 space-y-5">
              {topCountries.map((c, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-extrabold text-slate-500">
                        #{c.rank}
                      </span>
                      <span className="text-lg">{c.flag}</span>
                      <div>
                        <span className="text-sm font-bold text-slate-700">
                          {c.name}
                        </span>
                        <p className="text-xs text-slate-400 leading-tight">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-mono">
                      {c.pwrIdx}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{
                        "--w": `${c.pct}%`,
                        background:
                          i === 0
                            ? "linear-gradient(90deg, #1e40af, #3b82f6)"
                            : i === 1
                              ? "linear-gradient(90deg, #dc2626, #f87171)"
                              : i === 2
                                ? "linear-gradient(90deg, #b45309, #fbbf24)"
                                : "linear-gradient(90deg, #475569, #94a3b8)",
                        animationDelay: `${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── MID TABLE (6–11) ── */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-slate-50 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center text-lg shadow-sm">
                🎖️
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-700">
                  Peringkat 6–11: Kekuatan Eropa & Regional
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Negara-negara NATO dan kekuatan regional lainnya
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {midCountries.map((c, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-extrabold text-slate-400">
                        #{c.rank}
                      </span>
                      <span className="text-base">{c.flag}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-700">
                      {c.name}
                    </div>
                    <div className="text-xs font-extrabold text-slate-400 mt-0.5 font-mono">
                      {c.pwrIdx}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── INDONESIA SPOTLIGHT ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-red-100"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="px-7 py-5 border-b border-red-100"
              style={{
                background: "linear-gradient(135deg, #fff1f2, #ffe4e6)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-lg shadow-sm shadow-red-200">
                  🇮🇩
                </div>
                <div>
                  <h3 className="text-base font-bold text-red-700">
                    Spotlight: Indonesia — Peringkat #13
                  </h3>
                  <p className="text-xs text-red-400 font-medium">
                    PowerIndex 0.2557 · Unggul dari Israel, Jerman & Australia
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-5">
              {/* Context rank */}
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                {neighborRanks.map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 ${
                      r.highlight
                        ? "bg-red-50 border-l-4 border-red-400"
                        : i % 2 === 0
                          ? "bg-white"
                          : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-extrabold ${r.highlight ? "text-red-500" : "text-slate-400"}`}
                      >
                        #{r.rank}
                      </span>
                      <span className="text-base">{r.flag}</span>
                      <span
                        className={`text-sm font-bold ${r.highlight ? "text-red-700" : "text-slate-600"}`}
                      >
                        {r.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        {r.pwrIdx}
                      </span>
                      {!r.highlight && (
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {r.note}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">
                    <span>✅</span> Kekuatan Utama RI
                  </h4>
                  <div className="space-y-2.5">
                    {indonesiaStrengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-lg leading-none mt-0.5">
                          {s.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-700">
                            {s.label}
                          </div>
                          <div className="text-xs text-slate-500">{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-rose-700 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Area yang Perlu Diperkuat
                  </h4>
                  <div className="space-y-2.5">
                    {indonesiaWeaknesses.map((w, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-lg leading-none mt-0.5">
                          {w.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-700">
                            {w.label}
                          </div>
                          <div className="text-xs text-slate-500">{w.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── KESIMPULAN ── */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-slate-200"
            style={{ animationDelay: "0.35s" }}
          >
            <div
              className="px-7 py-5 border-b border-slate-200"
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-lg shadow-sm">
                  🔎
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Kesimpulan & Implikasi
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Rekomendasi berbasis data Global Firepower
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                Peta kekuatan militer global 2025 menunjukkan bahwa dominasi
                Amerika Serikat, Rusia, dan China masih sangat kuat. Namun
                Indonesia mencatat posisi yang menggembirakan di peringkat ke-13
                dari 145 negara — melampaui Israel, Jerman, dan Australia.
                Capaian ini berbasis pada populasi dan sumber daya, namun
                modernisasi alutsista tetap menjadi agenda strategis yang tidak
                bisa ditunda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    icon: "🛡️",
                    label: "Modernisasi Alutsista",
                    desc: "Perkuat armada kapal perang dan helikopter serang untuk naik peringkat",
                    color: "slate",
                  },
                  {
                    icon: "💰",
                    label: "Anggaran Pertahanan",
                    desc: "Tingkatkan alokasi APBN untuk pertahanan secara bertahap dan terukur",
                    color: "amber",
                  },
                  {
                    icon: "🌐",
                    label: "Diplomasi Pertahanan",
                    desc: "Manfaatkan posisi strategis untuk memperkuat kemitraan keamanan regional",
                    color: "emerald",
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
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-slate-50 group-hover:border-slate-300 transition-all">
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
              href="https://public.tableau.com/app/profile/sidqi.amanullah/viz/rankmiliter/Sheet1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-300"
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

export default MiliterRanks;
