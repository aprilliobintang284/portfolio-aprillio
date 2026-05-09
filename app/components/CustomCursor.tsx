"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    // Only enable on devices that support true hover (desktops / laptops)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;

    const onMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isHoverDevice]);

  // Don't render anything on touch/mobile devices
  if (!isHoverDevice) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#f97316",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transform: "translate(-100px, -100px)",
        boxShadow: "0 0 12px rgba(249,115,22,.60)",
      }}
    />
  );
}
