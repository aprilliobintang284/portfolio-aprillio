"use client";
import { useEffect, useRef } from "react";

/**
 * ParallaxScene — atmospheric background orbs with lightweight passive scroll parallax.
 * Only updates during active scrolling via requestAnimationFrame throttle (no infinite RAF loops).
 */
export default function ParallaxScene() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on mobile/touch devices or if user prefers reduced motion
    if (window.innerWidth <= 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          if (ref1.current) ref1.current.style.transform = `translate3d(0, ${(sy * 0.08).toFixed(1)}px, 0)`;
          if (ref2.current) ref2.current.style.transform = `translate3d(0, ${(sy * 0.14).toFixed(1)}px, 0)`;
          if (ref3.current) ref3.current.style.transform = `translate3d(0, ${(sy * 0.20).toFixed(1)}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
      {/* Shape 1 — far depth */}
      <div ref={ref1} className="parallax-shape parallax-shape-1" />
      {/* Shape 2 — mid depth */}
      <div ref={ref2} className="parallax-shape parallax-shape-2" />
      {/* Shape 3 — near depth */}
      <div ref={ref3} className="parallax-shape parallax-shape-3" />
    </div>
  );
}
