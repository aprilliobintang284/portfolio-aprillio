"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import styles from "./HeroBento.module.css";

export default function HeroBento() {
  return (
    <section className={styles["hero-fullbleed-container"]}>
      {/* Background: Full-Bleed Workspace Image (Desktop Only) */}
      <div className={styles["hero-fullbleed-bg"]}>
        <Image
          src="/images/hero/workspace.png"
          alt="Aprillio Workspace"
          fill
          priority
          unoptimized
          sizes="(min-width: 769px) 100vw, 1px"
          className={styles["hero-fullbleed-img"]}
        />
      </div>

      {/* Foreground Content: Text sits over the dark clean background */}
      <motion.div
        className={styles["hero-fullbleed-content"]}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <p className={styles["hero-eyebrow"]}>
          WELCOME TO MY DIGITAL SPACE
        </p>

        {/* Heading */}
        <h1 className={styles["hero-name-heading"]}>
          Hi, I&apos;m Aprillio<br />
          <span style={{ color: "var(--accent)" }}>Bintang</span> Perdana.
        </h1>

        {/* Role */}
        <p className={styles["hero-role-heading"]}>
          QA Specialist &amp; Content Creator
        </p>

        {/* Description */}
        <p className={styles["hero-intro-text"]}>
          <span className="copy-desktop">
            Fokus pada quality assurance dan pengujian sistem, dengan ketertarikan pada produk digital dan bagaimana membuatnya lebih baik. Di luar itu, aktif membuat konten seputar Honor of Kings dan esports.
          </span>
          <span className="copy-mobile">
            Fokus pada QA dan pengujian sistem, sambil aktif membuat konten Honor of Kings dan esports.
          </span>
        </p>

        {/* CTAs */}
        <div className={styles["hero-cta-group"]}>
          <Link href="/projects" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            Lihat Proyek <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
          <a href="#contact" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Mail style={{ width: 14, height: 14 }} /> Hubungi Saya
          </a>
        </div>
      </motion.div>

      {/* Mobile Workspace: 1:1 Square Visual Layer (Layered inside Hero, not a separate card) */}
      <div className={styles["hero-mobile-visual"]}>
        <Image
          src="/images/hero/workspace-mobile.png"
          alt="Aprillio Workspace"
          width={390}
          height={390}
          priority
          unoptimized
          className={styles["hero-mobile-square-img"]}
        />
      </div>
    </section>
  );
}
