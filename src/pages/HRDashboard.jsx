import React from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Karyawan",
    value: "8,950",
    icon: "👥",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    label: "Tingkat Turnover",
    value: "18.6%",
    icon: "🔄",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    label: "Karyawan Aktif",
    value: "7,984",
    icon: "✅",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    label: "Rata-rata Gaji",
    value: "$54,229",
    icon: "💰",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const departments = [
  { name: "Operations", employees: 2429, pct: 100, terminated: 401 },
  { name: "IT", employees: 1571, pct: 64.7, terminated: 271 },
  { name: "Sales", employees: 1327, pct: 54.6, terminated: 223 },
  { name: "Marketing", employees: 892, pct: 36.7, terminated: 158 },
  { name: "Finance", employees: 714, pct: 29.4, terminated: 89 },
];

const genderData = [
  { label: "Laki-laki", pct: 54, count: "4,833", color: "bg-blue-500" },
  { label: "Perempuan", pct: 46, count: "4,117", color: "bg-pink-400" },
];

const ageGroups = [
  { range: "25–34", count: 2814, pct: 85 },
  { range: "35–44", count: 3311, pct: 100 },
  { range: "45–54", count: 1872, pct: 56.5 },
  { range: "55+", count: 953, pct: 28.8 },
];

const educationLevels = [
  { level: "Bachelor's", count: 4032, icon: "🎓" },
  { level: "Master's", count: 2187, icon: "📚" },
  { level: "High School", count: 1463, icon: "🏫" },
  { level: "PhD", count: 872, icon: "🔬" },
  { level: "Associate", count: 396, icon: "📋" },
];

const HRDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,600;0,700;1,600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--w); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both; }
        .bar-fill { animation: barGrow 1.1s cubic-bezier(.22,.68,0,1.2) 0.4s both; }
        .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
      `}</style>

      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {/* Dot grid background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="fade-up inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
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

          {/* HERO CARD */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-xl border border-slate-100"
            style={{ animationDelay: "0.05s" }}
          >
            {/* Gradient header */}
            <div
              className="relative px-8 pt-10 pb-16 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
              }}
            >
              {/* BG decorations */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #fff, transparent)",
                  transform: "translate(35%, -35%)",
                }}
              />
              <div
                className="absolute bottom-0 left-10 w-52 h-52 rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #a5b4fc, transparent)",
                  transform: "translateY(40%)",
                }}
              />

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  📊 Tableau · HR Analytics
                </span>
                <span className="text-white/50 text-xs">·</span>
                <span className="text-white/70 text-xs font-medium">
                  Workforce Intelligence
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3"
                style={{ fontFamily: "Lora, Georgia, serif" }}
              >
                HR Summary Dashboard
                <br />
                <span className="text-indigo-200">Analisis Tenaga Kerja</span>
              </h1>
              <p className="text-indigo-100 text-sm leading-relaxed max-w-xl">
                Dashboard interaktif untuk memantau kondisi SDM perusahaan —
                mencakup headcount, turnover, demografi karyawan, struktur
                departemen, hingga distribusi gaji secara komprehensif.
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  "📅 2024–2025",
                  "🏢 7 Departemen",
                  "🔬 Tableau Public",
                  "📁 HR Analytics",
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

            {/* Stats overlap row */}
            <div className="bg-white px-6 pb-6 -mt-6 relative">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 -translate-y-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`${s.bg} ${s.border} border-2 rounded-2xl p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
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

          {/* TABLEAU EMBED */}
          <div
            className="fade-up bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-semibold text-slate-400 tracking-wide">
                Tableau Public · HR Summary Dashboard
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot inline-block" />
                Live
              </span>
            </div>
            <div className="w-full" style={{ height: "600px" }}>
              <iframe
                title="HR Dashboard Tableau"
                src="https://public.tableau.com/views/HRDashboard_17749627863350/HRSummary?:embed=y&:display_count=yes&:showVizHome=no"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>

          {/* INTRO TEXT */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-slate-100 px-8 py-7"
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-slate-600 leading-relaxed text-base">
              Dashboard ini menampilkan gambaran menyeluruh kondisi{" "}
              <strong className="text-slate-800">
                tenaga kerja perusahaan
              </strong>
              , mulai dari komposisi karyawan aktif dan yang telah keluar,
              distribusi berdasarkan departemen dan demografi, hingga tren
              rekrutmen. Visualisasi ini dirancang untuk mendukung{" "}
              <strong className="text-indigo-600">
                pengambilan keputusan strategis HR
              </strong>{" "}
              berbasis data.
            </p>
          </div>

          {/* DEPARTEMEN */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-indigo-100 overflow-hidden"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-indigo-50 border-b border-indigo-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                🏢
              </div>
              <div>
                <h3 className="text-base font-bold text-indigo-700">
                  Distribusi Karyawan per Departemen
                </h3>
                <p className="text-xs text-indigo-400 font-medium">
                  Headcount aktif & terminasi per divisi
                </p>
              </div>
            </div>
            <div className="px-7 py-6 space-y-5">
              {departments.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-slate-700">
                      {d.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-rose-400 font-semibold">
                        {d.terminated} keluar
                      </span>
                      <span className="text-sm font-extrabold text-indigo-600">
                        {d.employees.toLocaleString("id-ID")} karyawan
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-fill"
                      style={{
                        "--w": `${d.pct}%`,
                        background: "linear-gradient(90deg, #4338ca, #818cf8)",
                        animationDelay: `${0.3 + i * 0.08}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GENDER + AGE ROW */}
          <div
            className="fade-up grid grid-cols-1 sm:grid-cols-2 gap-5"
            style={{ animationDelay: "0.25s" }}
          >
            {/* Gender */}
            <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 bg-pink-50 border-b border-pink-100">
                <div className="w-9 h-9 rounded-xl bg-pink-500 flex items-center justify-center text-base shadow-sm shadow-pink-200">
                  ⚧
                </div>
                <div>
                  <h3 className="text-sm font-bold text-pink-700">
                    Komposisi Gender
                  </h3>
                  <p className="text-xs text-pink-400 font-medium">
                    Distribusi jenis kelamin
                  </p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {genderData.map((g, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-bold text-slate-700">
                        {g.label}
                      </span>
                      <span className="text-sm font-extrabold text-slate-600">
                        {g.count} ({g.pct}%)
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bar-fill ${g.color}`}
                        style={{
                          "--w": `${g.pct}%`,
                          animationDelay: `${0.35 + i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
                {/* Visual ratio bar */}
                <div className="mt-2 h-4 rounded-full overflow-hidden flex">
                  <div
                    className="bg-blue-500 h-full transition-all"
                    style={{ width: "54%" }}
                  />
                  <div className="bg-pink-400 h-full flex-1" />
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-semibold -mt-1">
                  <span className="text-blue-500">Laki-laki 54%</span>
                  <span className="text-pink-400">Perempuan 46%</span>
                </div>
              </div>
            </div>

            {/* Age groups */}
            <div className="bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 bg-amber-50 border-b border-amber-100">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-base shadow-sm shadow-amber-200">
                  🎂
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-700">
                    Distribusi Usia
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    Kelompok umur karyawan
                  </p>
                </div>
              </div>
              <div className="px-6 py-5 space-y-3">
                {ageGroups.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold text-slate-700">
                        {a.range} tahun
                      </span>
                      <span className="text-sm font-extrabold text-amber-600">
                        {a.count.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="h-2.5 bg-amber-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bar-fill"
                        style={{
                          "--w": `${a.pct}%`,
                          background:
                            "linear-gradient(90deg, #d97706, #fbbf24)",
                          animationDelay: `${0.3 + i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-teal-100 overflow-hidden"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-teal-50 border-b border-teal-100">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-lg shadow-sm shadow-teal-200">
                🎓
              </div>
              <div>
                <h3 className="text-base font-bold text-teal-700">
                  Latar Belakang Pendidikan
                </h3>
                <p className="text-xs text-teal-400 font-medium">
                  Komposisi tingkat pendidikan karyawan
                </p>
              </div>
            </div>
            <div className="px-7 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {educationLevels.map((e, i) => (
                  <div
                    key={i}
                    className="bg-teal-50 border border-teal-100 rounded-2xl px-4 py-4 text-center hover:border-teal-300 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="text-2xl mb-2">{e.icon}</div>
                    <div className="text-lg font-extrabold text-teal-700">
                      {e.count.toLocaleString("id-ID")}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">
                      {e.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TURNOVER INSIGHT */}
          <div
            className="fade-up bg-white rounded-3xl shadow-sm border border-rose-100 overflow-hidden"
            style={{ animationDelay: "0.33s" }}
          >
            <div className="flex items-center gap-3 px-7 py-5 bg-rose-50 border-b border-rose-100">
              <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-lg shadow-sm shadow-rose-200">
                📉
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-600">
                  Analisis Turnover
                </h3>
                <p className="text-xs text-rose-400 font-medium">
                  Tren dan distribusi karyawan yang keluar
                </p>
              </div>
            </div>
            <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  metric: "966",
                  label: "Total Terminasi",
                  sub: "Sepanjang periode data",
                  icon: "🚪",
                  color: "rose",
                },
                {
                  metric: "18.6%",
                  label: "Tingkat Turnover",
                  sub: "Dari total headcount",
                  icon: "📊",
                  color: "orange",
                },
                {
                  metric: "35–44",
                  label: "Kelompok Usia Terdampak",
                  sub: "Rentang usia paling dominan",
                  icon: "🎯",
                  color: "amber",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className={`bg-${t.color}-50 border border-${t.color}-100 rounded-2xl p-5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <span className="text-2xl">{t.icon}</span>
                  <div
                    className={`text-2xl font-extrabold text-${t.color}-600 mt-2`}
                  >
                    {t.metric}
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-1">
                    {t.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* KESIMPULAN */}
          <div
            className="fade-up rounded-3xl overflow-hidden shadow-md border border-indigo-100"
            style={{ animationDelay: "0.37s" }}
          >
            <div
              className="px-7 py-5 border-b border-indigo-100"
              style={{
                background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-lg shadow-sm shadow-indigo-200">
                  🔎
                </div>
                <div>
                  <h3 className="text-base font-bold text-indigo-700">
                    Kesimpulan & Rekomendasi
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium">
                    Insight berbasis data HR
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white px-7 py-6 space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                Data menunjukkan bahwa perusahaan memiliki struktur tenaga kerja
                yang relatif{" "}
                <strong className="text-slate-800">
                  didominasi karyawan berusia produktif (35–44 tahun)
                </strong>
                . Tingkat turnover sebesar{" "}
                <strong className="text-rose-500">18.6%</strong> perlu mendapat
                perhatian, terutama di departemen Operations yang mencatat
                jumlah terminasi tertinggi. Diversitas gender cukup seimbang,
                sementara mayoritas karyawan memiliki latar belakang pendidikan
                sarjana (S1).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    icon: "🛡️",
                    label: "Retensi Karyawan",
                    desc: "Prioritaskan program retensi di departemen Operations & IT",
                    color: "indigo",
                  },
                  {
                    icon: "🌱",
                    label: "Pengembangan Kompetensi",
                    desc: "Tingkatkan pelatihan untuk karyawan usia 45+ agar tetap relevan",
                    color: "teal",
                  },
                  {
                    icon: "⚖️",
                    label: "Keberagaman & Inklusi",
                    desc: "Pertahankan keseimbangan gender dan perluas program diversity",
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

          {/* BOTTOM NAV */}
          <div
            className="fade-up flex items-center justify-between pt-2 pb-8"
            style={{ animationDelay: "0.42s" }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
            >
              <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
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
              href="https://public.tableau.com/app/profile/sidqi.amanullah/viz/HRDashboard_17749627863350/HRSummary"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
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

export default HRDashboard;
