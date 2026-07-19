import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedNumber({ target, duration = 1800, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── SECTION REVEAL ──────────────────────────────────────────────────────────
function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── PIPELINE STEP ───────────────────────────────────────────────────────────
function PipelineStep({ number, title, desc, icon, color, tools, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#1a1d2e" : "#13151f",
          border: `1px solid ${hovered ? color + "60" : "#2a2d3a"}`,
          borderRadius: "16px",
          padding: "24px",
          cursor: "default",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 40px ${color}18` : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: color + "12",
            transition: "opacity 0.3s",
            opacity: hovered ? 1 : 0,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            position: "relative",
          }}
        >
          {/* Number badge */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              flexShrink: 0,
              background: `linear-gradient(135deg, ${color}30, ${color}15)`,
              border: `1px solid ${color}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            {icon}
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: color,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                STEP {number}
              </span>
            </div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#e8e8e8",
                margin: "0 0 8px 0",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {title}
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: "#8892a4",
                lineHeight: 1.65,
                margin: "0 0 12px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {desc}
            </p>

            {/* Tool tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: color,
                    background: color + "18",
                    border: `1px solid ${color}30`,
                    borderRadius: "6px",
                    padding: "3px 10px",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

// ─── SENTIMENT BAR ────────────────────────────────────────────────────────────
function SentimentBar({ label, percentage, count, color, delay }) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFilled(true), delay * 1000 + 400);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <RevealSection delay={delay}>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                display: "inline-block",
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#c0c8d8",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {count} artikel
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: color,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {/* Track */}
        <div
          style={{
            height: 8,
            background: "#1e2130",
            borderRadius: 99,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 99,
              background: `linear-gradient(90deg, ${color}cc, ${color})`,
              width: filled ? `${percentage}%` : "0%",
              transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: `0 0 12px ${color}60`,
            }}
          />
        </div>
      </div>
    </RevealSection>
  );
}

// ─── CODE BLOCK ───────────────────────────────────────────────────────────────
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div
      style={{
        background: "#0d0f1a",
        border: "1px solid #2a2d3a",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: "#13151f",
          borderBottom: "1px solid #2a2d3a",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["#f87171", "#facc15", "#4ade80"].map((c) => (
            <div
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
          <span
            style={{
              fontSize: "12px",
              color: "#555",
              marginLeft: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: "transparent",
            border: "1px solid #2a2d3a",
            borderRadius: "6px",
            padding: "4px 10px",
            color: copied ? "#4ade80" : "#666",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div style={{ padding: "16px", overflowX: "auto" }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <span
              style={{
                color: "#2a2d3a",
                userSelect: "none",
                minWidth: 24,
                textAlign: "right",
                fontSize: "12px",
                lineHeight: "1.8",
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                color: "#c0caf5",
                fontSize: "12px",
                lineHeight: "1.8",
                whiteSpace: "pre",
              }}
            >
              {line || " "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TECH BADGE ───────────────────────────────────────────────────────────────
function TechBadge({ name, icon, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: hovered ? color + "20" : "#13151f",
        border: `1px solid ${hovered ? color + "60" : "#2a2d3a"}`,
        borderRadius: "10px",
        padding: "10px 16px",
        cursor: "default",
        transition: "all 0.25s ease",
        boxShadow: hovered ? `0 4px 20px ${color}20` : "none",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: hovered ? color : "#c0c8d8",
          fontFamily: "'DM Sans', sans-serif",
          transition: "color 0.25s",
        }}
      >
        {name}
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Scrapbappenas = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "pipeline", label: "Pipeline" },
    { id: "hasil", label: "Hasil & Insight" },
    { id: "kode", label: "Kode" },
  ];

  const PIPELINE_STEPS = [
    {
      number: 1,
      icon: "🕷️",
      title: "Web Scraping Otomatis",
      color: "#f87171",
      desc: "Mengambil artikel dari Tempo.co secara otomatis menggunakan Selenium WebDriver dengan anti-detection. Script menelusuri halaman pencarian berdasarkan keyword 'bappenas', mengekstrak judul, tanggal, link, dan konten artikel secara real-time.",
      tools: ["Selenium", "BeautifulSoup", "ChromeDriver", "Python"],
    },
    {
      number: 2,
      icon: "🔤",
      title: "Preprocessing & Cleaning",
      color: "#fb923c",
      desc: "Teks mentah dibersihkan dari karakter HTML, iklan, dan noise. Artikel yang terlalu pendek atau di luar rentang tanggal difilter otomatis. Output berupa teks siap analisis dalam format DataFrame terstruktur.",
      tools: ["Pandas", "Regex", "HTML Parser", "Text Cleaning"],
    },
    {
      number: 3,
      icon: "📝",
      title: "Summarization (mT5 XLSum)",
      color: "#facc15",
      desc: "Artikel panjang diringkas menggunakan model mT5 multilingual yang dilatih pada XL-Sum dataset. Model ini mendukung 44 bahasa termasuk Indonesia, menghasilkan ringkasan yang koheren dan merepresentasikan isi artikel.",
      tools: ["mT5", "XLSum", "HuggingFace", "PyTorch"],
    },
    {
      number: 4,
      icon: "🧠",
      title: "Analisis Sentimen (IndoBERT)",
      color: "#4ade80",
      desc: "Ringkasan artikel diklasifikasi menggunakan model RoBERTa berbasis bahasa Indonesia yang dilatih khusus untuk sentiment analysis. Model menghasilkan label (Positif/Netral/Negatif) beserta confidence score untuk setiap artikel.",
      tools: ["IndoBERT", "RoBERTa", "Transformers", "CUDA"],
    },
    {
      number: 5,
      icon: "⚡",
      title: "AI Recommendation (Groq)",
      color: "#818cf8",
      desc: "Pola sentimen yang terdeteksi dikirim ke Groq API (Llama 3.3 70B) untuk menghasilkan analisis mendalam, interpretasi, rekomendasi aksi konkret, dan strategi komunikasi bagi pemangku kepentingan.",
      tools: ["Groq API", "Llama 3.3 70B", "Prompt Engineering"],
    },
    {
      number: 6,
      icon: "📄",
      title: "Laporan PDF Otomatis",
      color: "#38bdf8",
      desc: "Seluruh hasil divisualisasikan dan dikompilasi menjadi laporan PDF profesional yang mencakup bar chart, pie chart, histogram confidence score, word cloud per sentimen, tabel artikel, dan rekomendasi AI.",
      tools: ["ReportLab", "Matplotlib", "WordCloud", "PDF Generation"],
    },
  ];

  const CODE_SAMPLES = {
    scraping: `# Selenium scraping dengan anti-detection
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

opts = Options()
opts.add_argument("--headless=new")
opts.add_argument("--no-sandbox")
opts.add_experimental_option(
    "excludeSwitches", ["enable-automation"]
)
opts.add_argument(
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64)"
)

driver = webdriver.Chrome(options=opts)
driver.execute_script(
    "Object.defineProperty(navigator,'webdriver',{get:()=>undefined})"
)

# Auto-stop jika artikel sudah terlalu lama
STOP_AFTER_OUT = 5
consecutive_old = 0

for article in articles:
    art_date = parse_date_str(article["date"])
    if art_date < start_date:
        consecutive_old += 1
        if consecutive_old >= STOP_AFTER_OUT:
            break  # Berhenti efisien`,

    sentiment: `# Analisis sentimen dengan IndoBERT
from transformers import pipeline

MODEL = "w11wo/indonesian-roberta-base-sentiment-classifier"
sent_pipe = pipeline(
    "sentiment-analysis",
    model=MODEL,
    device=0  # GPU jika tersedia
)

# Normalisasi label ke Bahasa Indonesia
LABEL_NORM = {
    "LABEL_0": "Positif", "positive": "Positif",
    "LABEL_1": "Netral",  "neutral":  "Netral",
    "LABEL_2": "Negatif", "negative": "Negatif",
}

results = []
for text in df["summary"]:
    res = sent_pipe(text, truncation=True, max_length=512)[0]
    results.append({
        "label":      LABEL_NORM[res["label"]],
        "confidence": round(res["score"], 4)
    })`,

    groq: `# Rekomendasi AI dengan Groq (Llama 3.3 70B)
import requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

body = {
    "model":       "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "max_tokens":  2000,
    "messages": [
        {
            "role": "system",
            "content": "Kamu adalah analis media profesional..."
        },
        {
            "role": "user",
            "content": f"""
Keyword: {keyword} | Total: {total} artikel
Positif: {pos_n} ({pos_pct:.1f}%)
Netral:  {neu_n} ({neu_pct:.1f}%)
Negatif: {neg_n} ({neg_pct:.1f}%)

Berikan:
1. Interpretasi sentimen dominan
2. Faktor pendorong
3. 3-5 rekomendasi aksi konkret
4. Strategi komunikasi
"""
        }
    ]
}

resp = requests.post(GROQ_URL, json=body, timeout=60)
recommendation = resp.json()["choices"][0]["message"]["content"]`,
  };

  const TECH_STACK = [
    { name: "Python 3.11", icon: "🐍", color: "#facc15" },
    { name: "Streamlit", icon: "🔴", color: "#f87171" },
    { name: "Selenium", icon: "🌐", color: "#4ade80" },
    { name: "BeautifulSoup", icon: "🍵", color: "#fb923c" },
    { name: "HuggingFace", icon: "🤗", color: "#facc15" },
    { name: "PyTorch", icon: "🔥", color: "#f87171" },
    { name: "mT5 XLSum", icon: "📝", color: "#818cf8" },
    { name: "IndoBERT", icon: "🧠", color: "#4ade80" },
    { name: "Groq AI", icon: "⚡", color: "#38bdf8" },
    { name: "Llama 3.3 70B", icon: "🦙", color: "#a78bfa" },
    { name: "Pandas", icon: "🐼", color: "#38bdf8" },
    { name: "Matplotlib", icon: "📊", color: "#fb923c" },
    { name: "WordCloud", icon: "☁️", color: "#818cf8" },
    { name: "ReportLab", icon: "📄", color: "#4ade80" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.4); }
          70% { box-shadow: 0 0 0 14px rgba(129, 140, 248, 0); }
          100% { box-shadow: 0 0 0 0 rgba(129, 140, 248, 0); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cursor-blink {
          animation: blink 1s ease-in-out infinite;
        }
        .tab-active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          border-color: transparent !important;
          color: white !important;
        }
        .tab-btn:hover:not(.tab-active) {
          background: #1a1d2e !important;
          border-color: #3a3d50 !important;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0a0c12",
          fontFamily: "'DM Sans', sans-serif",
          color: "#e8e8e8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scan line effect */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            zIndex: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, transparent, #6366f130, transparent)",
            animation: "scan 8s linear infinite",
          }}
        />

        {/* Grid background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Purple glow top */}
        <div
          style={{
            position: "fixed",
            top: -200,
            left: "20%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Back button */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "24px 24px 0",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "1px solid #2a2d3a",
              borderRadius: "10px",
              padding: "8px 18px",
              color: "#888",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.color = "#e8e8e8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#2a2d3a";
              e.currentTarget.style.color = "#888";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Kembali ke Portfolio
          </button>
        </div>

        {/* ── HERO ───────────────────────────────────────── */}
        <header
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "48px 24px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              alignItems: "flex-start",
            }}
          >
            {/* Left: Text */}
            <div style={{ flex: "1 1 480px" }}>
              {/* Status badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#13151f",
                  border: "1px solid #2a2d3a",
                  borderRadius: "99px",
                  padding: "6px 16px",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    animation: "pulse-ring 2s infinite",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#666",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Maganghub Edudata · 2025
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  margin: "0 0 8px 0",
                  color: "#f0f0f0",
                }}
              >
                Analisis Sentimen
              </h1>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  margin: "0 0 24px 0",
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Artikel Bappenas
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  color: "#8892a4",
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 0 28px 0",
                }}
              >
                Pipeline end-to-end dari scraping artikel Tempo.co,
                summarization dengan model NLP multilingual, hingga klasifikasi
                sentimen menggunakan IndoBERT — lengkap dengan laporan PDF
                otomatis bertenaga Groq AI.
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 32,
                }}
              >
                {[
                  "NLP",
                  "Sentiment Analysis",
                  "Web Scraping",
                  "Streamlit",
                  "Magang 2025",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#818cf8",
                      background: "#6366f115",
                      border: "1px solid #6366f130",
                      borderRadius: "8px",
                      padding: "4px 12px",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="https://github.com/yourusername/sentimen-bappenas"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "10px",
                    padding: "11px 22px",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Repo
                </a>
                <a
                  href="https://instagram.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    border: "1px solid #2a2d3a",
                    color: "#c0c8d8",
                    textDecoration: "none",
                    borderRadius: "10px",
                    padding: "11px 22px",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E1306C";
                    e.currentTarget.style.color = "#E1306C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2a2d3a";
                    e.currentTarget.style.color = "#c0c8d8";
                  }}
                >
                  📸 Lihat di Instagram
                </a>
              </div>
            </div>

            {/* Right: Stats */}
            <div
              style={{
                flex: "0 0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                minWidth: 260,
              }}
            >
              {[
                {
                  label: "Artikel Dianalisis",
                  value: 120,
                  suffix: "+",
                  color: "#818cf8",
                },
                {
                  label: "Avg Confidence",
                  value: 87,
                  suffix: "%",
                  color: "#4ade80",
                },
                { label: "Model NLP", value: 2, suffix: "", color: "#facc15" },
                {
                  label: "Tool Pipeline",
                  value: 6,
                  suffix: "",
                  color: "#38bdf8",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "14px",
                    padding: "20px 16px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      color: stat.color,
                      fontFamily: "'Syne', sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#555",
                      marginTop: 6,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── TABS ─────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              borderBottom: "1px solid #1e2130",
              paddingBottom: 0,
              flexWrap: "wrap",
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? "tab-active" : ""}`}
                style={{
                  background: activeTab === tab.id ? "" : "#13151f",
                  border: `1px solid ${activeTab === tab.id ? "transparent" : "#2a2d3a"}`,
                  borderBottom:
                    activeTab === tab.id ? "1px solid transparent" : "none",
                  borderRadius: "10px 10px 0 0",
                  padding: "10px 20px",
                  color: activeTab === tab.id ? "white" : "#888",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                  position: "relative",
                  bottom: -1,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT ──────────────────────────────────── */}
        <main
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "40px 24px 80px",
          }}
        >
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              {/* About */}
              <RevealSection delay={0}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "32px",
                    marginBottom: 32,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#e8e8e8",
                      margin: "0 0 16px 0",
                    }}
                  >
                    🎯 Tentang Proyek
                  </h2>
                  <p
                    style={{
                      color: "#8892a4",
                      lineHeight: 1.8,
                      fontSize: "14px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    Proyek ini dikerjakan selama magang di{" "}
                    <strong style={{ color: "#818cf8" }}>
                      Maganghub Edudata
                    </strong>
                    . Tujuannya adalah membangun sistem otomatis untuk memantau
                    dan menganalisis sentimen pemberitaan media terhadap
                    kebijakan dan program Bappenas (Badan Perencanaan
                    Pembangunan Nasional).
                  </p>
                  <p
                    style={{
                      color: "#8892a4",
                      lineHeight: 1.8,
                      fontSize: "14px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    Sistem ini mampu men-scraping ratusan artikel dari{" "}
                    <strong style={{ color: "#e8e8e8" }}>Tempo.co</strong>{" "}
                    secara otomatis, meringkasnya menggunakan model NLP
                    multilingual, kemudian mengklasifikasi sentimen tiap artikel
                    sebagai <span style={{ color: "#4ade80" }}>Positif</span>,{" "}
                    <span style={{ color: "#facc15" }}>Netral</span>, atau{" "}
                    <span style={{ color: "#f87171" }}>Negatif</span> dengan
                    model berbasis IndoBERT.
                  </p>
                  <p
                    style={{
                      color: "#8892a4",
                      lineHeight: 1.8,
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    Selain analisis teknis, saya juga bertanggung jawab dalam{" "}
                    <strong style={{ color: "#e8e8e8" }}>desain visual</strong>{" "}
                    dan{" "}
                    <strong style={{ color: "#e8e8e8" }}>
                      penyajian konten edukatif
                    </strong>{" "}
                    hasil proyek ke media sosial Maganghub Edudata.
                  </p>
                </div>
              </RevealSection>

              {/* Sentiment result preview */}
              <RevealSection delay={0.1}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "32px",
                    marginBottom: 32,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#e8e8e8",
                      margin: "0 0 8px 0",
                    }}
                  >
                    📊 Distribusi Sentimen (Contoh Hasil)
                  </h2>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "13px",
                      margin: "0 0 28px 0",
                    }}
                  >
                    Berdasarkan 120+ artikel Tempo.co dengan keyword "bappenas"
                  </p>

                  <SentimentBar
                    label="Positif"
                    percentage={42}
                    count={51}
                    color="#4ade80"
                    delay={0.1}
                  />
                  <SentimentBar
                    label="Netral"
                    percentage={38}
                    count={46}
                    color="#facc15"
                    delay={0.2}
                  />
                  <SentimentBar
                    label="Negatif"
                    percentage={20}
                    count={24}
                    color="#f87171"
                    delay={0.3}
                  />

                  <div
                    style={{
                      marginTop: 24,
                      padding: "16px 20px",
                      background: "#6366f110",
                      border: "1px solid #6366f130",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#c0c8d8",
                        lineHeight: 1.7,
                      }}
                    >
                      💡 <strong style={{ color: "#818cf8" }}>Insight:</strong>{" "}
                      Sentimen Positif mendominasi pemberitaan Bappenas,
                      menunjukkan narasi media yang cenderung mendukung
                      kebijakan perencanaan pembangunan nasional. Sentimen
                      Negatif umumnya muncul pada artikel yang membahas
                      keterlambatan atau kontroversi anggaran.
                    </p>
                  </div>
                </div>
              </RevealSection>

              {/* Tech Stack */}
              <RevealSection delay={0.2}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "32px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#e8e8e8",
                      margin: "0 0 20px 0",
                    }}
                  >
                    🛠️ Tech Stack Lengkap
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(160px, 1fr))",
                      gap: 10,
                    }}
                  >
                    {TECH_STACK.map((tech) => (
                      <TechBadge key={tech.name} {...tech} />
                    ))}
                  </div>
                </div>
              </RevealSection>
            </div>
          )}

          {/* PIPELINE TAB */}
          {activeTab === "pipeline" && (
            <div>
              <RevealSection delay={0}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #13151f, #0f1120)",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "24px 28px",
                    marginBottom: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#6366f115",
                      border: "1px solid #6366f130",
                      borderRadius: "14px",
                      animation: "float 3s ease-in-out infinite",
                    }}
                  >
                    ⚙️
                  </div>
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#e8e8e8",
                        margin: "0 0 6px 0",
                      }}
                    >
                      Pipeline End-to-End
                    </h2>
                    <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>
                      6 tahap otomatis dari data mentah ke laporan PDF —
                      dijalankan langsung di Streamlit
                    </p>
                  </div>
                </div>
              </RevealSection>

              {/* Visual flow indicator */}
              <div style={{ position: "relative" }}>
                {PIPELINE_STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    style={{ position: "relative", marginBottom: 16 }}
                  >
                    {/* Connector line */}
                    {i < PIPELINE_STEPS.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 33,
                          top: "100%",
                          width: 2,
                          height: 16,
                          zIndex: 1,
                          background: `linear-gradient(${step.color}, ${PIPELINE_STEPS[i + 1].color})`,
                          opacity: 0.4,
                        }}
                      />
                    )}
                    <PipelineStep {...step} delay={i * 0.08} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HASIL TAB */}
          {activeTab === "hasil" && (
            <div style={{ display: "grid", gap: 24 }}>
              {/* Model info */}
              <RevealSection delay={0}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {[
                    {
                      icon: "📝",
                      title: "Summarization Model",
                      model: "csebuetnlp/mT5_multilingual_XLSum",
                      color: "#facc15",
                      desc: "Model mT5 yang dilatih pada XL-Sum dataset dengan 44 bahasa. Menghasilkan ringkasan koheren dari artikel panjang. Token limit: 1024 input, 150 output.",
                      tags: ["Multilingual", "44 Bahasa", "Abstractive"],
                    },
                    {
                      icon: "🧠",
                      title: "Sentiment Model",
                      model:
                        "w11wo/indonesian-roberta-base-sentiment-classifier",
                      color: "#4ade80",
                      desc: "RoBERTa berbasis bahasa Indonesia yang dioptimasi untuk sentiment classification 3-kelas. Menghasilkan confidence score 0–1 per label.",
                      tags: ["Indonesian", "RoBERTa", "3-class"],
                    },
                    {
                      icon: "⚡",
                      title: "AI Recommendation",
                      model: "llama-3.3-70b-versatile (Groq)",
                      color: "#818cf8",
                      desc: "Model Llama 3.3 70B yang dijalankan di atas infrastruktur Groq untuk inferensi ultra-cepat. Menghasilkan analisis dan rekomendasi aksi yang actionable.",
                      tags: ["70B Params", "< 5s", "Groq Infra"],
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      style={{
                        background: "#13151f",
                        border: `1px solid ${card.color}25`,
                        borderRadius: "16px",
                        padding: "24px",
                      }}
                    >
                      <div style={{ fontSize: "28px", marginBottom: 12 }}>
                        {card.icon}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#e8e8e8",
                          margin: "0 0 6px 0",
                        }}
                      >
                        {card.title}
                      </h3>
                      <code
                        style={{
                          fontSize: "11px",
                          color: card.color,
                          fontFamily: "'DM Mono', monospace",
                          display: "block",
                          marginBottom: 12,
                          wordBreak: "break-all",
                        }}
                      >
                        {card.model}
                      </code>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#8892a4",
                          lineHeight: 1.7,
                          margin: "0 0 14px 0",
                        }}
                      >
                        {card.desc}
                      </p>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                      >
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              color: card.color,
                              background: card.color + "15",
                              border: `1px solid ${card.color}30`,
                              borderRadius: "6px",
                              padding: "3px 8px",
                              fontFamily: "'DM Mono', monospace",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealSection>

              {/* Key insights */}
              <RevealSection delay={0.1}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "28px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#e8e8e8",
                      margin: "0 0 20px 0",
                    }}
                  >
                    💡 Key Insights
                  </h2>
                  <div style={{ display: "grid", gap: 14 }}>
                    {[
                      {
                        emoji: "🟢",
                        text: "Sentimen Positif dominan (~42%) mencerminkan apresiasi media terhadap program-program pembangunan Bappenas yang proaktif.",
                        color: "#4ade80",
                      },
                      {
                        emoji: "🟡",
                        text: "Sentimen Netral tinggi (~38%) pada artikel berita informatif seperti rilis anggaran, laporan kuartalan, dan agenda rapat resmi.",
                        color: "#facc15",
                      },
                      {
                        emoji: "🔴",
                        text: "Sentimen Negatif (~20%) terkonsentrasi pada artikel terkait keterlambatan proyek IKN dan efisiensi anggaran.",
                        color: "#f87171",
                      },
                      {
                        emoji: "📈",
                        text: "Confidence score rata-rata 87% menunjukkan model berhasil mengklasifikasi sentimen dengan keyakinan tinggi.",
                        color: "#818cf8",
                      },
                      {
                        emoji: "⚡",
                        text: "Groq AI (Llama 3.3 70B) menghasilkan rekomendasi komunikasi yang relevan dan actionable dalam < 5 detik per analisis.",
                        color: "#38bdf8",
                      },
                    ].map((insight, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 14,
                          padding: "14px 18px",
                          background: insight.color + "08",
                          border: `1px solid ${insight.color}20`,
                          borderRadius: "12px",
                        }}
                      >
                        <span style={{ fontSize: "20px", flexShrink: 0 }}>
                          {insight.emoji}
                        </span>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#c0c8d8",
                            lineHeight: 1.7,
                          }}
                        >
                          {insight.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>

              {/* Output artifacts */}
              <RevealSection delay={0.2}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #2a2d3a",
                    borderRadius: "16px",
                    padding: "28px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#e8e8e8",
                      margin: "0 0 20px 0",
                    }}
                  >
                    📦 Output yang Dihasilkan
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {[
                      {
                        icon: "📊",
                        label: "Dashboard Streamlit",
                        desc: "Interaktif real-time",
                      },
                      {
                        icon: "📄",
                        label: "Laporan PDF",
                        desc: "Multi-halaman otomatis",
                      },
                      {
                        icon: "📋",
                        label: "CSV Dataset",
                        desc: "Artikel + sentimen + score",
                      },
                      {
                        icon: "☁️",
                        label: "Word Cloud",
                        desc: "Per kategori sentimen",
                      },
                      {
                        icon: "📈",
                        label: "Visualisasi Chart",
                        desc: "Bar, pie, histogram, timeline",
                      },
                      {
                        icon: "🤖",
                        label: "AI Recommendation",
                        desc: "Groq Llama 70B",
                      },
                    ].map((out) => (
                      <div
                        key={out.label}
                        style={{
                          background: "#0d0f1a",
                          border: "1px solid #1e2130",
                          borderRadius: "12px",
                          padding: "16px",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "26px", marginBottom: 8 }}>
                          {out.icon}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#c0c8d8",
                            marginBottom: 4,
                          }}
                        >
                          {out.label}
                        </div>
                        <div style={{ fontSize: "11px", color: "#555" }}>
                          {out.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            </div>
          )}

          {/* KODE TAB */}
          {activeTab === "kode" && (
            <div style={{ display: "grid", gap: 28 }}>
              <RevealSection delay={0}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#e8e8e8",
                    margin: "0 0 4px 0",
                  }}
                >
                  🕷️ Scraping dengan Selenium
                </h2>
                <p
                  style={{
                    color: "#555",
                    fontSize: "13px",
                    margin: "0 0 12px 0",
                  }}
                >
                  Anti-detection + auto-stop berdasarkan rentang tanggal
                </p>
                <CodeBlock
                  code={CODE_SAMPLES.scraping}
                  language="Python · selenium_scraper.py"
                />
              </RevealSection>

              <RevealSection delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#e8e8e8",
                    margin: "0 0 4px 0",
                  }}
                >
                  🧠 Analisis Sentimen (IndoBERT)
                </h2>
                <p
                  style={{
                    color: "#555",
                    fontSize: "13px",
                    margin: "0 0 12px 0",
                  }}
                >
                  Pipeline HuggingFace dengan normalisasi label ke Bahasa
                  Indonesia
                </p>
                <CodeBlock
                  code={CODE_SAMPLES.sentiment}
                  language="Python · sentiment_analysis.py"
                />
              </RevealSection>

              <RevealSection delay={0.2}>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#e8e8e8",
                    margin: "0 0 4px 0",
                  }}
                >
                  ⚡ Rekomendasi AI dengan Groq
                </h2>
                <p
                  style={{
                    color: "#555",
                    fontSize: "13px",
                    margin: "0 0 12px 0",
                  }}
                >
                  Llama 3.3 70B via Groq API — inferensi ultra-cepat tanpa SDK
                  tambahan
                </p>
                <CodeBlock
                  code={CODE_SAMPLES.groq}
                  language="Python · groq_recommendation.py"
                />
              </RevealSection>

              {/* Note */}
              <RevealSection delay={0.3}>
                <div
                  style={{
                    background: "#13151f",
                    border: "1px solid #6366f130",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>📌</span>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#818cf8",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Catatan Implementasi
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#8892a4",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      Kode lengkap tersedia di GitHub. Proyek dijalankan di atas{" "}
                      <strong style={{ color: "#e8e8e8" }}>Streamlit</strong>{" "}
                      sebagai antarmuka web yang interaktif. Model NLP di-cache
                      menggunakan{" "}
                      <code
                        style={{
                          color: "#facc15",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        @st.cache_resource
                      </code>{" "}
                      sehingga tidak perlu diunduh ulang setiap sesi. GPU CUDA
                      didukung untuk akselerasi inferensi.
                    </p>
                  </div>
                </div>
              </RevealSection>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Scrapbappenas;
