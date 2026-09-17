"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { X } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const [loadedPortrait, setLoadedPortrait] = useState<boolean | null>(null);

  const isPortrait = loadedPortrait !== null
    ? loadedPortrait
    : Boolean(image?.height && image?.width && image.height > image.width);

  useEffect(() => {
    if (image) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      closeBtnRef.current?.focus();
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
      triggerElementRef.current = null;
    }
  }, [image]);

  // Handle ESC key to dismiss
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!image) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt || "Pratinjau gambar"}
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      {/* Top Header Bar */}
      <div className="lightbox-header">
        {image.caption ? (
          <span className="lightbox-caption">{image.caption}</span>
        ) : (
          <span />
        )}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="lightbox-close-btn"
          aria-label="Tutup pratinjau gambar (Esc)"
          title="Tutup (Esc)"
        >
          <X style={{ width: 20, height: 20 }} />
        </button>
      </div>

      {/* Image Stage - Clicking outside the image closes */}
      <div className="lightbox-stage" onClick={onClose}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className={`lightbox-img ${isPortrait ? "lightbox-img-portrait" : "lightbox-img-landscape"}`}
          onClick={(e) => e.stopPropagation()}
          onLoad={(e) => {
            const img = e.currentTarget;
            setLoadedPortrait(img.naturalHeight > img.naturalWidth);
          }}
        />
      </div>
    </div>
  );
}

