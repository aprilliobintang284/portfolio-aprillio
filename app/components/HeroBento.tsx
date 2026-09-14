"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function HeroBento() {
  return (
    <section className="hero-spot">
      {/* Subtle ambient background glow */}
      <div className="hero-spot-orb hero-spot-orb-1" aria-hidden />
      <div className="hero-spot-orb hero-spot-orb-2" aria-hidden />

      {/* Main Hero Content */}
      <motion.div
        className="hero-spot-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name */}
        <h1 className="hero-spot-name glow">
          <span style={{ color: "rgba(245,240,232,.94)" }}>Hi, I&apos;m </span>
          <span style={{ color: "rgba(245,240,232,.94)" }}>Aprillio </span>
          <span className="grad-orange">Bintang.</span>
        </h1>

        {/* Primary Identity */}
        <p className="hero-spot-role">
          QA Specialist &amp; Content Creator
        </p>

        {/* Concise, human first-person supporting text */}
        <p className="hero-spot-desc">
          Memastikan keandalan fungsionalitas sistem web sebelum digunakan pengguna, sekaligus memproduksi konten gaming &amp; kampanye video berbasis data audiens.
        </p>

        {/* Clear 1-2 CTAs */}
        <div className="hero-spot-cta">
          <a href="#projects" className="btn btn-primary">
            Lihat Proyek <ArrowRight style={{ width: 15, height: 15 }} />
          </a>
          <a href="#contact" className="btn btn-ghost">
            <Mail style={{ width: 15, height: 15 }} /> Hubungi Saya
          </a>
        </div>
      </motion.div>
    </section>
  );
}
