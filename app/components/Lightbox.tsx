"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  image?: LightboxImage | null;
  images?: LightboxImage[];
  currentIndex?: number | null;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export default function Lightbox({
  image: directImage,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const [loadedPortrait, setLoadedPortrait] = useState<boolean | null>(null);

  // Derive current image from images array if currentIndex is provided, otherwise directImage
  const hasGallery = Boolean(images && images.length > 0 && currentIndex !== undefined && currentIndex !== null);
  const activeImage = hasGallery && images && currentIndex !== null && currentIndex !== undefined
    ? images[currentIndex]
    : directImage;

  const totalImages = images?.length || 0;
  const currentNum = (currentIndex ?? 0) + 1;

  const isPortrait = loadedPortrait !== null
    ? loadedPortrait
    : Boolean(activeImage?.height && activeImage?.width && activeImage.height > activeImage.width);

  useEffect(() => {
    if (activeImage) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      closeBtnRef.current?.focus();
    } else if (triggerElementRef.current) {
      triggerElementRef.current.focus();
      triggerElementRef.current = null;
    }
  }, [activeImage]);

  const handlePrev = useCallback(() => {
    if (!hasGallery || !images || currentIndex === undefined || currentIndex === null || !onNavigate) return;
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setLoadedPortrait(null);
    onNavigate(prevIdx);
  }, [hasGallery, images, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (!hasGallery || !images || currentIndex === undefined || currentIndex === null || !onNavigate) return;
    const nextIdx = (currentIndex + 1) % images.length;
    setLoadedPortrait(null);
    onNavigate(nextIdx);
  }, [hasGallery, images, currentIndex, onNavigate]);

  // Handle keyboard events: ESC to dismiss, Arrow keys for navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    if (!activeImage) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, handleKeyDown]);

  if (!activeImage) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={activeImage.caption || activeImage.alt || "Pratinjau gambar"}
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      {/* Top Header Bar */}
      <div className="lightbox-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {activeImage.caption && (
            <span className="lightbox-caption">{activeImage.caption}</span>
          )}
          {hasGallery && totalImages > 1 && (
            <span className="lightbox-counter">
              {currentNum} / {totalImages}
            </span>
          )}
        </div>
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="lightbox-close-btn"
          aria-label="Tutup pratinjau gambar (Esc)"
          title="Tutup (Esc)"
        >
          <X style={{ width: 18, height: 18 }} />
        </button>
      </div>

      {/* Image Stage - Clicking outside the image closes */}
      <div className="lightbox-stage" onClick={onClose}>
        {hasGallery && totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="lightbox-nav-btn lightbox-nav-prev"
            aria-label="Gambar sebelumnya (Panah Kiri)"
            title="Sebelumnya (←)"
          >
            <ChevronLeft style={{ width: 22, height: 22 }} />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className={`lightbox-img ${isPortrait ? "lightbox-img-portrait" : "lightbox-img-landscape"}`}
          onClick={(e) => e.stopPropagation()}
          onLoad={(e) => {
            const img = e.currentTarget;
            setLoadedPortrait(img.naturalHeight > img.naturalWidth);
          }}
        />

        {hasGallery && totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="lightbox-nav-btn lightbox-nav-next"
            aria-label="Gambar berikutnya (Panah Kanan)"
            title="Berikutnya (→)"
          >
            <ChevronRight style={{ width: 22, height: 22 }} />
          </button>
        )}
      </div>
    </div>
  );
}
