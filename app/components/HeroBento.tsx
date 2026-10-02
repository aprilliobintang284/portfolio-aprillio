"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Shield, Gamepad2, Cpu, BarChart3 } from "lucide-react";
import styles from "./HeroBento.module.css";

const v = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function HeroBento() {
  return (
    <section className={styles.hero}>
      {/* Subtle grid background */}
      <div className={styles.heroGridBg} aria-hidden />

      {/* Main two-column composition */}
      <div className={styles.heroInner}>
        {/* ═══ LEFT COLUMN (62–65%) ═══ */}
        <motion.div
          className={styles.left}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="show"
        >
          {/* Name Heading */}
          <motion.h1 variants={v} className={styles.name}>
            Hi, I&apos;m<br />
            <span className={styles.nowrap}>Aprillio Bintang</span><br />
            Perdana.
          </motion.h1>

          {/* Role */}
          <motion.p variants={v} className={styles.role}>
            QA Specialist &amp; Content Creator
          </motion.p>

          {/* Description — 3 lines matching screenshot */}
          <motion.p variants={v} className={styles.desc}>
            Fokus pada quality assurance dan pengujian sistem,<br />
            dengan ketertarikan pada produk digital dan bagaimana<br />
            membuatnya lebih baik.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={v} className={styles.ctas}>
            <Link href="/projects" className={styles.btnPrimary}>
              Lihat Proyek <ArrowRight className={styles.btnIcon} />
            </Link>
            <a href="#contact" className={styles.btnGhost}>
              <Mail className={styles.btnIcon} /> Hubungi Saya
            </a>
          </motion.div>
        </motion.div>

        {/* ═══ VERTICAL DIVIDER ═══ */}
        <div className={styles.divider} />

        {/* ═══ RIGHT COLUMN (35–38%) ═══ */}
        <motion.div
          className={styles.right}
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
        >
          {/* Focus Area */}
          <div className={styles.focusBlock}>
            <motion.div variants={v} className={styles.labelRow}>
              <span className={styles.label}>FOCUS AREA</span>
              <span className={styles.labelLine} />
            </motion.div>

            <div className={styles.focusList}>
              {[
                { icon: <Shield style={{ width: 16, height: 16 }} />, text: "Quality Assurance" },
                { icon: <Gamepad2 style={{ width: 16, height: 16 }} />, text: "Game & Tech Content" },
                { icon: <Cpu style={{ width: 16, height: 16 }} />, text: "System Testing" },
                { icon: <BarChart3 style={{ width: 16, height: 16 }} />, text: "Continuous Learning" },
              ].map((item, i) => (
                <motion.div key={i} variants={v} className={styles.focusItem}>
                  <div className={styles.focusIcon}>{item.icon}</div>
                  <span className={styles.focusText}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Horizontal separator */}
          <motion.div variants={v} className={styles.hRule} />

          {/* Currently */}
          <div className={styles.currentlyBlock}>
            <motion.div variants={v} className={styles.labelRow}>
              <span className={styles.label}>CURRENTLY</span>
              <span className={styles.labelLine} />
            </motion.div>

            <motion.div variants={v} className={styles.currentlyRow}>
              <span className={styles.currentlyDot} />
              <div className={styles.currentlyTextCol}>
                <p className={styles.currentlyTitle}>Open for opportunities</p>
                <p className={styles.currentlySub}>Internship · Project · Collaboration</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ═══ STRUCTURAL SECTION DIVIDER ═══ */}
      <div className={styles.bottomDivider} aria-hidden />
    </section>
  );
}