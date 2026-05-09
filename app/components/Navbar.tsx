"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const LINKS = [
  { label: "Tentang",    href: "/#about",      pages: ["/"] },
  { label: "Pengalaman", href: "/#experience", pages: ["/"] },
  { label: "Pendidikan", href: "/#education",  pages: ["/"] },
  { label: "Projects",   href: "/projects",    pages: ["/projects"] },
  { label: "Kreator",    href: "/creator",     pages: ["/creator"] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      {/* ── DESKTOP ── */}
      <header className="hidden md:flex"
        style={{position:"fixed",top:20,left:0,right:0,zIndex:200,justifyContent:"center",pointerEvents:"none"}}>
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .72, ease: [.22,1,.36,1], delay: .12 }}
          className="pill-nav"
          style={{ pointerEvents: "auto" }}
        >
          <Link href="/" className="logo">ABP.</Link>
          <span className="pill-divider" />

          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`pill-nav-link${l.pages.includes(path) && !l.href.startsWith("/#") ? " is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}

          <span className="pill-divider" />
          <Link href="/#contact" className="btn btn-primary btn-sm">
            Connect <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </motion.nav>
      </header>

      {/* ── MOBILE ── */}
      <header className="md:hidden">
        <div className="mobile-nav">
          <Link href="/" className="logo">ABP.</Link>
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-sm"
            style={{ padding: "8px 14px" }}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: .24, ease: [.22,1,.36,1] }}
              className="mobile-menu-overlay"
            >
              <button
                onClick={() => setOpen(false)}
                className="btn btn-ghost"
                style={{ position: "absolute", top: 20, right: 20, padding: "8px 14px" }}
              >
                <X className="w-4 h-4" />
              </button>

              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: .28, ease: [.22,1,.36,1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`pill-nav-link${l.pages.includes(path) && !l.href.startsWith("/#") ? " is-active" : ""}`}
                    style={{ fontSize: 22, fontWeight: 700, padding: "10px 24px" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: .28 }}
                style={{ marginTop: 16 }}
              >
                <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary">
                  Connect <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
