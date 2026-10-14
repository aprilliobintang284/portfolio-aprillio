"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import styles from "./HeroBento.module.css";

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function HeroBento() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <motion.div
        className={styles.heroInner}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemVariants} className={styles.eyebrow}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>QA SPECIALIST &amp; CONTENT CREATOR</span>
        </motion.p>

        <motion.h1 id="hero-heading" variants={itemVariants} className={styles.name}>
          Hi, I&apos;m Aprillio Bintang Perdana.
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.desc}>
          Quality Assurance Specialist focused on <strong>functional testing,
          end-to-end validation, and clear bug reporting</strong> to help digital
          products work reliably before release. I test <strong>event ticketing
          and payment flows</strong>, with close attention to usability,
          transaction accuracy, and edge cases.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctas}>
          <Link href="/projects" className={styles.btnPrimary}>
            Lihat Proyek <ArrowRight className={styles.btnIcon} aria-hidden="true" />
          </Link>
          <a href="#contact" className={styles.btnGhost}>
            <Mail className={styles.btnIcon} aria-hidden="true" /> Hubungi Saya
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.bottomDivider} aria-hidden="true" />
    </section>
  );
}
