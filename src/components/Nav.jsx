import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          font-weight: 600;
          padding: 6px 0;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(.22,.68,0,1.2);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          text-decoration: none;
          border-radius: 8px;
          margin: 2px 6px;
          transition: background 0.15s, color 0.15s;
        }
        .dropdown-item:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
      `}</style>

      {/* Spacer so page content doesn't go under fixed nav */}
      <div style={{ height: "68px" }} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999 /* ← tinggi agar tidak tertindih apapun */,
          height: "68px",
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "linear-gradient(135deg, #3b82f6 0%, #2563eb 60%, #1d4ed8 100%)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.10)"
            : "0 2px 20px rgba(37,99,235,0.25)",
          transition: "all 0.3s ease",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Rainbow accent line at very top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #E97627, #F2C811 33%, #217346 66%, #3b82f6)",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Logo mark */}
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: scrolled
                  ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                  : "rgba(255,255,255,0.2)",
                border: scrolled
                  ? "none"
                  : "1.5px solid rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                boxShadow: scrolled ? "0 2px 8px rgba(59,130,246,0.3)" : "none",
                transition: "all 0.3s",
              }}
            >
              📊
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: scrolled ? "#1e293b" : "#fff",
                letterSpacing: "-0.02em",
                transition: "color 0.3s",
              }}
            >
              Sidqi
              <span
                style={{
                  color: scrolled ? "#3b82f6" : "rgba(255,255,255,0.75)",
                }}
              >
                Data
              </span>
            </span>
          </a>

          {/* ── NAV LINKS ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {/* Topik Dropdown */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="nav-link"
                style={{
                  color: scrolled ? "#475569" : "rgba(255,255,255,0.85)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Topik
                <ChevronDownIcon
                  style={{
                    width: "15px",
                    height: "15px",
                    transition: "transform 0.25s",
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Dropdown menu */}
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: "-16px",
                    width: "200px",
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1.5px solid #e2e8f0",
                    boxShadow:
                      "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                    padding: "8px 0",
                    animationName: "dropIn",
                    animationDuration: "0.22s",
                    animationFillMode: "both",
                    animationTimingFunction: "cubic-bezier(.22,.68,0,1.2)",
                    zIndex: 10000,
                  }}
                >
                  {/* Dropdown arrow */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-7px",
                      right: "28px",
                      width: "13px",
                      height: "13px",
                      background: "#fff",
                      border: "1.5px solid #e2e8f0",
                      borderRight: "none",
                      borderBottom: "none",
                      transform: "rotate(45deg)",
                      borderRadius: "2px",
                    }}
                  />

                  <div
                    style={{
                      padding: "4px 10px 8px",
                      borderBottom: "1px solid #f1f5f9",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#94a3b8",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Kategori Topik
                    </span>
                  </div>

                  {[
                    { href: "#/makanan", label: "Makanan Bergizi", icon: "🥗" },
                    { href: "#/hr", label: "HR Analytics", icon: "👥" },
                    { href: "#/web", label: "Web Development", icon: "💻" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="dropdown-item"
                    >
                      <span
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "8px",
                          background: "#f8fafc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Tentang Kami */}
            <a
              href="/tentang"
              className="nav-link"
              style={{ color: scrolled ? "#475569" : "rgba(255,255,255,0.85)" }}
            >
              Tentang Kami
            </a>

            {/* FAQ */}
            <a
              href="/faq"
              className="nav-link"
              style={{ color: scrolled ? "#475569" : "rgba(255,255,255,0.85)" }}
            >
              FAQ
            </a>

            {/* CTA Button */}
            <a
              href="/portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s",
                background: scrolled
                  ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                  : "rgba(255,255,255,0.15)",
                color: "#fff",
                border: scrolled
                  ? "none"
                  : "1.5px solid rgba(255,255,255,0.35)",
                boxShadow: scrolled
                  ? "0 4px 14px rgba(59,130,246,0.35)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = scrolled
                  ? "0 4px 14px rgba(59,130,246,0.35)"
                  : "none";
              }}
            >
              Portfolio
              <svg
                width="12"
                height="12"
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
      </nav>
    </>
  );
};

export default Nav;
