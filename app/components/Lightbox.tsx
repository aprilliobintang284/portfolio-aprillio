"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
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

  // Store trigger element to restore focus on close
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

    // Prevent body scroll when lightbox is active
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
      aria-label={image.caption || image.alt || "Image preview"}
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      {/* Top Close Bar */}
      <div className="lightbox-header">
        {image.caption && <span className="lightbox-caption">{image.caption}</span>}
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

      {/* Image Stage */}
      <div className="lightbox-stage" onClick={onClose}>
        <div
          className="lightbox-image-container"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 1400}
            height={image.height || 900}
            className="lightbox-img"
            priority
          />
        </div>
      </div>
    </div>
  );
}
