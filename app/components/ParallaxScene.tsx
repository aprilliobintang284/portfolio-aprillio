"use client";
import { useEffect, useRef } from "react";

/**
 * ParallaxScene — three blurred orbs that shift at different depths on scroll.
 * Depth factors: shape1=0.1 (far), shape2=0.2 (mid), shape3=0.3 (near).
 * Uses requestAnimationFrame with lerp for silky-smooth 60fps movement.
 */
export default function ParallaxScene() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip parallax entirely on mobile — saves continuous RAF cost
    if (window.innerWidth <= 768) return;

    let raf: number;
    let y1 = 0, y2 = 0, y3 = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const t1 = scrollY * 0.10;
      const t2 = scrollY * 0.20;
      const t3 = scrollY * 0.30;

      const lf = 0.09;
      y1 += (t1 - y1) * lf;
      y2 += (t2 - y2) * lf;
      y3 += (t3 - y3) * lf;

      if (ref1.current) ref1.current.style.transform = `translateY(${y1.toFixed(2)}px)`;
      if (ref2.current) ref2.current.style.transform = `translateY(${y2.toFixed(2)}px)`;
      if (ref3.current) ref3.current.style.transform = `translateY(${y3.toFixed(2)}px)`;

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
      {/* Shape 1 — slow / far depth */}
      <div ref={ref1} className="parallax-shape parallax-shape-1" />
      {/* Shape 2 — medium depth */}
      <div ref={ref2} className="parallax-shape parallax-shape-2" />
      {/* Shape 3 — fast / near depth */}
      <div ref={ref3} className="parallax-shape parallax-shape-3" />
    </div>
  );
}
