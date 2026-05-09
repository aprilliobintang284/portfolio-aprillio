"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

const LINKS = [
  { label: "Tentang",    href: "/#about",      anchor: "about",      pages: ["/"] },
  { label: "Pengalaman", href: "/#experience", anchor: "experience", pages: ["/"] },
  { label: "Pendidikan", href: "/#education",  anchor: "education",  pages: ["/"] },
  { label: "Projects",   href: "/projects",    anchor: null,         pages: ["/projects"] },
  { label: "Kreator",    href: "/creator",     anchor: null,         pages: ["/creator"] },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  // Smooth-scroll to an anchor — works whether we're already on the page or not
  const scrollTo = (anchor: string, closeMenu = false) => {
    if (closeMenu) setOpen(false);

    const doScroll = () => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (path !== "/") {
      // Navigate to home first, then scroll after transition
      router.push("/");
      setTimeout(doScroll, 600);
    } else {
      doScroll();
    }
  };

  // Smooth scroll back to very top (used by logo)
  const scrollToTop = useCallback((closeMenu = false) => {
    if (closeMenu) setOpen(false);
    if (path !== "/") {
      router.push("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 400);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [path, router]);

  const NavLink = ({ l, mobile = false, onClick }: { l: typeof LINKS[0]; mobile?: boolean; onClick?: () => void }) => {
    const isActive = l.pages.includes(path) && !l.anchor;
    const cls = `pill-nav-link${isActive ? " is-active" : ""}`;
    const mobileStyle = mobile ? { fontSize: 22, fontWeight: 700, padding: "10px 24px" } : undefined;

    if (l.anchor) {
      return (
        <button
          className={cls}
          style={mobileStyle}
          onClick={() => scrollTo(l.anchor!, mobile)}
        >
          {l.label}
        </button>
      );
    }
    return (
      <Link href={l.href} className={cls} style={mobileStyle} onClick={onClick}>
        {l.label}
      </Link>
    );
  };

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
          <button onClick={() => scrollToTop()} className="logo" aria-label="Back to top">ABP.</button>
          <span className="pill-divider" />

          {LINKS.map(l => (
            <NavLink key={l.href} l={l} />
          ))}

          <span className="pill-divider" />
          <button className="btn btn-primary btn-sm" onClick={() => scrollTo("contact")}>
            Connect <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.nav>
      </header>

      {/* ── MOBILE ── */}
      <header className="md:hidden">
        <div className="mobile-nav">
          <button onClick={() => scrollToTop()} className="logo" aria-label="Back to top">ABP.</button>
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
                  <NavLink l={l} mobile onClick={() => setOpen(false)} />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: .28 }}
                style={{ marginTop: 16 }}
              >
                <button className="btn btn-primary" onClick={() => scrollTo("contact", true)}>
                  Connect <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
