"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function HeroBento() {
  return (
    <section className="hero-fullbleed-container">
      {/* Background: Full-Bleed Workspace Image (Desktop Only) */}
      <div className="hero-fullbleed-bg">
        <Image
          src="/images/hero/workspace.png"
          alt="Aprillio Workspace"
          fill
          priority
          unoptimized
          sizes="(min-width: 769px) 100vw, 1px"
          className="hero-fullbleed-img"
        />
      </div>

      {/* Foreground Content: Text sits over the dark left portion of the background */}
      <motion.div
        className="hero-fullbleed-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <p className="hero-eyebrow">WELCOME TO MY DIGITAL SPACE</p>

        {/* Heading */}
        <h1 className="hero-name-heading">
          Hi, I&apos;m Aprillio<br />
          <span style={{ color: "var(--accent)" }}>Bintang</span> Perdana.
        </h1>

        {/* Role */}
        <p className="hero-role-heading">
          QA Specialist &amp; Content Creator
        </p>

        {/* Description */}
        <p className="hero-intro-text">
          Fokus pada quality assurance dan pengujian sistem, dengan ketertarikan pada produk digital dan bagaimana membuatnya lebih baik. Di luar itu, aktif membuat konten seputar Honor of Kings dan esports.
        </p>

        {/* CTAs */}
        <div className="hero-cta-group">
          <Link href="/projects" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Lihat Proyek <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
          <a href="#contact" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Mail style={{ width: 14, height: 14 }} /> Hubungi Saya
          </a>
        </div>
      </motion.div>
    </section>
  );
}
