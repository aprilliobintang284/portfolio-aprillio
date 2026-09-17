"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Video, ChevronRight } from "lucide-react";

interface SectionNavItem {
  id: string;
  label: string;
}

const SECTIONS: SectionNavItem[] = [
  { id: "about", label: "Tentang" },
  { id: "experience", label: "Pengalaman" },
  { id: "projects", label: "Proyek" },
  { id: "education", label: "Pendidikan" },
  { id: "creator", label: "Kreator" },
  { id: "personal", label: "Personal" },
  { id: "contact", label: "Kontak" },
];

const SOCIALS = [
  { href: "https://github.com/aprilliobintang284", label: "GitHub" },
  { href: "https://linkedin.com/in/aprilliobintang", label: "LinkedIn" },
  { href: "https://www.tiktok.com/@scarawanderr", label: "TikTok" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const path = usePathname();
  const router = useRouter();
  const logoSrc = "/images/logo.png";

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
      {/* ══ DESKTOP EDITORIAL SIDEBAR ══ */}
      <aside className="sidebar" role="navigation" aria-label="Sidebar navigation">
        {/* Identity */}
        <div className="sidebar-identity">
          <button onClick={() => scrollToTop()} className="sidebar-logo-btn" aria-label="Home">
            <Image
              src={logoSrc}
              alt="Aprillio Monogram"
              width={44}
              height={24}
              className="sidebar-logo-img"
              priority
            />
          </button>
          <button
            onClick={() => scrollToTop()}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}
          >
            <p className="sidebar-name">Aprillio Bintang</p>
            <p className="sidebar-role">QA &amp; Creator</p>
          </button>
        </div>

        <div className="sidebar-divider" />

        {/* Main Navigation */}
        <div className="sidebar-nav-group">
          <p className="sidebar-nav-label">Main</p>
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
                className={`sidebar-nav-item ${isActive ? "is-active" : ""}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="sidebar-divider" />

        {/* Deep-Dive Portfolio Links */}
        <div className="sidebar-nav-group">
          <p className="sidebar-nav-label">Portfolio</p>
          <Link href="/projects" className={`sidebar-nav-item ${path === "/projects" ? "is-active" : ""}`}>
            QA Projects
          </Link>
          <Link href="/creator" className={`sidebar-nav-item ${path === "/creator" ? "is-active" : ""}`}>
            Creator Media
          </Link>
        </div>

        <div className="sidebar-divider" />

        {/* External Links */}
        <div className="sidebar-nav-group">
          <p className="sidebar-nav-label">Links</p>
          {SOCIALS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="sidebar-nav-item sidebar-external"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>© 2026</p>
        </div>
      </aside>

      {/* ══ MOBILE COMPACT TOP BAR ══ */}
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
          <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-.02em" }}>
            Aprillio<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          aria-label="Buka menu navigasi"
        >
          {open ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
        </button>

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
                <p style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-muted)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>
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

                <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />

                <p style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-muted)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 6 }}>
                  Deep-Dive Portfolio
                </p>

                <Link
                  href="/projects"
                  onClick={() => setOpen(false)}
                  className="mobile-drawer-link"
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <ShieldCheck style={{ width: 15, height: 15, color: "var(--accent)" }} />
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
                    <Video style={{ width: 15, height: 15, color: "var(--accent)" }} />
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
