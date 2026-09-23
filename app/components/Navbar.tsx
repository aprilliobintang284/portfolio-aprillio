"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Mail,
  ShieldCheck,
  Video,
  ChevronRight,
} from "lucide-react";
import styles from "./Navbar.module.css";

interface SectionNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
}

const SECTIONS: SectionNavItem[] = [
  { id: "about", label: "Tentang", icon: User },
  { id: "experience", label: "Pengalaman", icon: Briefcase },
  { id: "education", label: "Pendidikan", icon: GraduationCap },
  { id: "personal", label: "Personal", icon: Sparkles },
  { id: "contact", label: "Kontak", icon: Mail },
];

const PORTFOLIO_ITEMS = [
  { href: "/projects", label: "QA Projects", icon: ShieldCheck },
  { href: "/creator", label: "Creator Media", icon: Video },
];

const SOCIALS = [
  {
    href: "https://github.com/aprilliobintang284",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/aprilliobintang",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@scarawanderr",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/aprillio.bintang/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const logoSrc = "/images/logo.png";

  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for top navbar transparent vs scrolled state
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (path !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScrolled(true);
      return;
    }
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [path]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Reliable reading-line active section calculation
  const determineActiveSection = useCallback(() => {
    if (typeof window === "undefined" || path !== "/") return;

    // Check bottom of page — activate the last section (#contact)
    const scrollBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= documentHeight - 60) {
      setActiveSection("contact");
      return;
    }

    // Trigger point: ~35% from the top of the viewport (between 30% and 40%)
    const triggerPoint = window.innerHeight * 0.35;

    // If above the first section (Hero area), default to 'about'
    const firstSection = document.getElementById(SECTIONS[0].id);
    if (firstSection) {
      const firstRect = firstSection.getBoundingClientRect();
      if (firstRect.top > triggerPoint) {
        setActiveSection(SECTIONS[0].id);
        return;
      }
    }

    // Identify which section is currently crossing the reading trigger line
    let currentActive = SECTIONS[0].id;
    for (let i = 0; i < SECTIONS.length; i++) {
      const section = SECTIONS[i];
      const el = document.getElementById(section.id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerPoint) {
        currentActive = section.id;
      } else {
        break;
      }
    }

    setActiveSection(currentActive);
  }, [path]);

  // Initial load / hash handling and scroll listener
  useEffect(() => {
    if (typeof window === "undefined" || path !== "/") return;

    // Check if initial URL has a hash matching one of our sections
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && SECTIONS.some((s) => s.id === initialHash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(initialHash);
    } else {
      determineActiveSection();
    }

    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      determineActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [path, determineActiveSection]);

  const scrollTo = useCallback(
    (anchor: string, closeMenu = false) => {
      if (closeMenu) setOpen(false);

      if (path !== "/") {
        router.push(`/#${anchor}`);
        return;
      }

      // 1. Immediately highlight the clicked section
      setActiveSection(anchor);

      // 2. Lock scroll detection during smooth scroll animation to avoid race conditions
      isManualScrollRef.current = true;
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
      manualScrollTimeoutRef.current = setTimeout(() => {
        isManualScrollRef.current = false;
        determineActiveSection();
      }, 950);

      // 3. Update hash without page jump
      if (window.history.pushState) {
        window.history.pushState(null, "", `#${anchor}`);
      }

      // 4. Smoothly scroll to the target section
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [path, router, determineActiveSection]
  );

  const scrollToTop = useCallback(
    (closeMenu = false) => {
      if (closeMenu) setOpen(false);
      if (path !== "/") {
        router.push("/");
      } else {
        setActiveSection("about");
        isManualScrollRef.current = true;
        if (manualScrollTimeoutRef.current) {
          clearTimeout(manualScrollTimeoutRef.current);
        }
        manualScrollTimeoutRef.current = setTimeout(() => {
          isManualScrollRef.current = false;
          determineActiveSection();
        }, 950);

        if (window.history.pushState) {
          window.history.pushState(null, "", "/");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [path, router, determineActiveSection]
  );

  return (
    <>
      {/* ══ DESKTOP EDITORIAL SIDEBAR ══ */}
      <aside className={styles["sidebar"]} role="navigation" aria-label="Sidebar navigation">
        {/* Identity */}
        <div className={styles["sidebar-identity"]}>
          <button onClick={() => scrollToTop()} className={styles["sidebar-logo-btn"]} aria-label="Home">
            <Image
              src={logoSrc}
              alt="Aprillio Monogram"
              width={38}
              height={22}
              className={styles["sidebar-logo-img"]}
              priority
            />
          </button>
          <button
            onClick={() => scrollToTop()}
            style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" as const, padding: 0 }}
          >
            <p className={styles["sidebar-name"]}>Aprillio Bintang</p>
            <p className={styles["sidebar-role"]}>QA &amp; Creator</p>
          </button>
        </div>

        <div className={styles["sidebar-divider"]} />

        {/* Main Navigation */}
        <div className={styles["sidebar-nav-group"]}>
          <p className={styles["sidebar-nav-label"]}>Main</p>
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = path === "/" && activeSection === id;

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`${styles["sidebar-nav-item"]} ${isActive ? styles["is-active"] : ""}`}
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles["sidebar-divider"]} />

        {/* Deep-Dive Portfolio Links */}
        <div className={styles["sidebar-nav-group"]}>
          <p className={styles["sidebar-nav-label"]}>Portfolio</p>
          {PORTFOLIO_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`${styles["sidebar-nav-item"]} ${isActive ? styles["is-active"] : ""}`}
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles["sidebar-divider"]} />

        {/* External Links */}
        <div className={styles["sidebar-nav-group"]}>
          <p className={styles["sidebar-nav-label"]}>Links</p>
          {SOCIALS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`${styles["sidebar-nav-item"]} ${styles["sidebar-external"]}`}
            >
              <span style={{ width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: 0.7 }}>
                {icon}
              </span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </aside>

      {/* ══ MOBILE COMPACT TOP BAR ══ */}
      <header className={`${styles["mobile-top-bar"]} ${isScrolled ? styles["is-scrolled"] : styles["is-transparent"]}`}>
        <button onClick={() => scrollToTop()} className={styles["mobile-logo-btn"]} aria-label="Home">
          <Image
            src={logoSrc}
            alt="Aprillio Monogram"
            width={34}
            height={20}
            className={styles["mobile-logo-img"]}
            priority
          />
          <span className={styles["mobile-logo-text"]}>
            Aprillio<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </button>

        <button
          onClick={() => setOpen(!open)}
          className={`${styles["mobile-menu-btn"]} ${open ? styles["is-open"] : ""}`}
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
        >
          <span className={`${styles["hamburger-line"]} ${styles["line-1"]}`} />
          <span className={`${styles["hamburger-line"]} ${styles["line-2"]}`} />
          <span className={`${styles["hamburger-line"]} ${styles["line-3"]}`} />
        </button>
      </header>

      {/* ══ MOBILE NAVIGATION DRAWER & BACKDROP ══ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark translucent backdrop with restrained blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles["mobile-nav-backdrop"]}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Right-sliding Navigation Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={styles["mobile-nav-drawer"]}
              role="dialog"
              aria-modal="true"
              aria-label="Navigasi Mobile"
            >
              {/* Drawer Top Header */}
              <div className={styles["mobile-drawer-header"]}>
                <button
                  onClick={() => scrollToTop(true)}
                  className={styles["mobile-logo-btn"]}
                  aria-label="Home"
                >
                  <Image
                    src={logoSrc}
                    alt="Aprillio Monogram"
                    width={34}
                    height={20}
                    className={styles["mobile-logo-img"]}
                  />
                  <span className={styles["mobile-logo-text"]}>
                    Aprillio<span style={{ color: "var(--accent)" }}>.</span>
                  </span>
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className={styles["mobile-drawer-close-btn"]}
                  aria-label="Tutup menu navigasi"
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              {/* Drawer Scrollable Body */}
              <div className={styles["mobile-drawer-body"]}>
                {/* 1. NAVIGASI */}
                <div className={styles["mobile-drawer-group"]}>
                  <p className={styles["mobile-drawer-label"]}>NAVIGASI</p>
                  <div className={styles["mobile-drawer-items"]}>
                    {SECTIONS.map(({ id, label, icon: Icon }) => {
                      const isActive = path === "/" && activeSection === id;
                      return (
                        <button
                          key={id}
                          onClick={() => scrollTo(id, true)}
                          className={`${styles["mobile-drawer-item"]} ${isActive ? styles["is-active"] : ""}`}
                        >
                          <span className={styles["mobile-drawer-item-left"]}>
                            <Icon className={styles["mobile-drawer-icon"]} />
                            <span>{label}</span>
                          </span>
                          <ChevronRight className={styles["mobile-drawer-chevron"]} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles["mobile-drawer-divider"]} />

                {/* 2. PORTFOLIO */}
                <div className={styles["mobile-drawer-group"]}>
                  <p className={styles["mobile-drawer-label"]}>PORTFOLIO</p>
                  <div className={styles["mobile-drawer-items"]}>
                    {PORTFOLIO_ITEMS.map(({ href, label, icon: Icon }) => {
                      const isActive = path === href;
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={`${styles["mobile-drawer-item"]} ${isActive ? styles["is-active"] : ""}`}
                        >
                          <span className={styles["mobile-drawer-item-left"]}>
                            <Icon className={styles["mobile-drawer-icon"]} />
                            <span>{label}</span>
                          </span>
                          <ChevronRight className={styles["mobile-drawer-chevron"]} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className={styles["mobile-drawer-divider"]} />

                {/* 3. LINKS */}
                <div className={styles["mobile-drawer-group"]}>
                  <p className={styles["mobile-drawer-label"]}>LINKS</p>
                  <div className={styles["mobile-drawer-items"]}>
                    {SOCIALS.map(({ href, label, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles["mobile-drawer-item"]} ${styles["mobile-drawer-external"]}`}
                      >
                        <span className={styles["mobile-drawer-item-left"]}>
                          <span className={styles["mobile-drawer-social-icon"]}>
                            {icon}
                          </span>
                          <span>{label}</span>
                        </span>
                        <ChevronRight className={styles["mobile-drawer-chevron"]} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
