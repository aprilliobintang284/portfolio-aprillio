"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Video, ChevronRight } from "lucide-react";
import { useColorTheme } from "./ThemeContext";

interface SectionNavItem {
  id: string;
  label: string;
}

const SECTIONS: SectionNavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "creator", label: "Creator" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const path = usePathname();
  const router = useRouter();
  const { colorTheme, toggleColorTheme } = useColorTheme();
  const isGreen = colorTheme === "green";
  const logoSrc = isGreen ? "/images/logo-green.png" : "/images/logo.png";

  // IntersectionObserver for active section tracking on homepage
  useEffect(() => {
    if (path !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.15, 0.4], rootMargin: "-15% 0px -25% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [path]);

  const scrollTo = useCallback(
    (anchor: string, closeMenu = false) => {
      if (closeMenu) setOpen(false);

      if (anchor === "projects" && path === "/projects") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (anchor === "creator" && path === "/creator") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const doScroll = () => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (path !== "/") {
        router.push(`/#${anchor}`);
      } else {
        doScroll();
      }
    },
    [path, router]
  );

  const scrollToTop = useCallback(
    (closeMenu = false) => {
      if (closeMenu) setOpen(false);
      if (path !== "/") {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [path, router]
  );

  return (
    <>
      {/* ── DESKTOP VERTICAL EDITORIAL RAIL (CSS Media Query Controlled) ── */}
      <nav
        className="nav-rail"
        role="navigation"
        aria-label="Editorial navigation rail"
      >
        {/* Top Logo Monogram */}
        <button
          onClick={() => scrollToTop()}
          className="rail-logo-btn"
          aria-label="Kembali ke atas"
          title="Aprillio Bintang"
        >
          <Image
            src={logoSrc}
            alt="Aprillio Monogram"
            width={44}
            height={24}
            className="rail-logo-img"
            priority
          />
          <span className="rail-tooltip">Aprillio Bintang</span>
        </button>

        <span className="rail-divider" />

        {/* Section Navigation Dots */}
        <div className="rail-items-group">
          {SECTIONS.map(({ id, label }) => {
            const isActive =
              path === "/projects"
                ? id === "projects"
                : path === "/creator"
                ? id === "creator"
                : activeSection === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`rail-item-btn ${isActive ? "is-active" : ""}`}
                aria-label={`Pindah ke bagian ${label}`}
                title={label}
              >
                <span className="rail-dot" />
                <span className="rail-tooltip">{label}</span>
              </button>
            );
          })}
        </div>

        <span className="rail-divider" />

        {/* Bottom Theme Switcher */}
        <button
          onClick={toggleColorTheme}
          className="rail-theme-btn"
          aria-label={`Ganti tema ke ${isGreen ? "Blue" : "Green"}`}
          title={`Ganti tema ke ${isGreen ? "Blue" : "Green"}`}
        >
          <span className="rail-theme-icon">{isGreen ? "🌿" : "🌊"}</span>
          <span className="rail-tooltip">{isGreen ? "Mode Green" : "Mode Blue"}</span>
        </button>
      </nav>

      {/* ── MOBILE COMPACT TOP BAR (CSS Media Query Controlled) ── */}
      <header className="mobile-top-bar">
        <button onClick={() => scrollToTop()} className="mobile-logo-btn" aria-label="Home">
          <Image
            src={logoSrc}
            alt="Aprillio Monogram"
            width={44}
            height={24}
            className="mobile-logo-img"
            priority
          />
          <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(245,240,232,.90)", letterSpacing: "-.02em" }}>
            Aprillio<span className="grad-orange">.</span>
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleColorTheme}
            className="mobile-theme-btn"
            aria-label={`Ganti tema ke ${isGreen ? "Blue" : "Green"}`}
          >
            <span>{isGreen ? "🌿" : "🌊"}</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            aria-label="Buka menu navigasi"
          >
            {open ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-nav-drawer"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 320 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(245,240,232,.35)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>
                  Navigasi
                </p>

                {SECTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id, true)}
                    className="mobile-drawer-link"
                  >
                    <span>{label}</span>
                    <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
                  </button>
                ))}

                <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "10px 0" }} />

                <p style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(245,240,232,.35)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>
                  Deep-Dive Portfolio
                </p>

                <Link
                  href="/projects"
                  onClick={() => setOpen(false)}
                  className="mobile-drawer-link"
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ShieldCheck style={{ width: 15, height: 15, color: "var(--ac-hex-1)" }} />
                    QA Portfolio Detail
                  </span>
                  <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
                </Link>

                <Link
                  href="/creator"
                  onClick={() => setOpen(false)}
                  className="mobile-drawer-link"
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Video style={{ width: 15, height: 15, color: "#ef4444" }} />
                    Creator Portfolio Detail
                  </span>
                  <ChevronRight style={{ width: 14, height: 14, opacity: 0.4 }} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
