"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Bug,
  ShieldCheck,
  Lock,
  Layers,
  ArrowUpRight,
  Terminal,
  AlertCircle,
  Maximize2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Lightbox, { type LightboxImage } from "../components/Lightbox";

const v: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const vScale: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const VP = { once: true, margin: "-40px" } as const;
const W = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };

export default function ProjectsPage() {
  const [lightboxImg, setLightboxImg] = useState<LightboxImage | null>(null);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene" />
      <Navbar />

      <main className="sidebar-offset" style={{ paddingTop: "clamp(96px, 11vw, 140px)", paddingBottom: 110 }}>
        <div style={W}>
          {/* Header */}
          <motion.header
            initial="hidden"
            animate="show"
            variants={v}
            className="qa-archive-header"
          >
            <span className="eyebrow" style={{ marginBottom: 12 }}>
              QA Work &amp; Case Studies
            </span>
            <h1
              style={{
                fontWeight: 900,
                fontSize: "clamp(30px, 4.4vw, 48px)",
                letterSpacing: "-.03em",
                lineHeight: 1.15,
                color: "rgba(245,240,232,.96)",
                marginBottom: 14,
              }}
            >
              Testing products before{" "}
              <span className="grad-orange">they reach users.</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(245,240,232,.52)",
                maxWidth: 640,
              }}
            >
              Dokumentasi sistematis pengujian fungsionalitas end-to-end, validasi alur transaksi checkout tiket, dan pelaporan isu di Plane untuk memastikan keandalan produk sebelum rilis ke pengguna akhir.
            </p>
          </motion.header>

          {/* ══════════════════════════════════════════
              CHAPTER 01: TENAR EVENTS (BUYER)
              Rhythm: Image First → Metadata → Evidence → Scenarios → Result
          {/* ══════════════════════════════════════════
              CHAPTER 01: TENAR EVENTS (BUYER)
              Sequential Rhythm:
              Overview → [hero.png] → Metadata → Limitation → TAMPILAN PRODUK → Scenarios → Result
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-project-chapter"
          >
            {/* 1. Chapter Header & Overview */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--accent)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  01 — CASE STUDY
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4.2vw, 44px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                TENAR EVENTS (BUYER)
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip chip-green">Production Live</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  Mobile Web · B2C Event Ticketing
                </span>
              </div>
              <p className="qa-project-overview" style={{ maxWidth: 680, margin: "0 0 22px" }}>
                Platform e-ticketing publik yang melayani ribuan pencari tiket event dalam format mobile web. Pengujian berfokus pada kelancaran alur checkout tiket, pencegahan duplikasi order, dan akurasi pencarian event aktif.
              </p>
            </div>

            {/* 2. Primary Product Visual Anchor (Real Mobile Screenshot) */}
            <div style={{ margin: "22px 0 26px" }}>
              <div
                className="qa-mobile-frame"
                onClick={() =>
                  setLightboxImg({
                    src: "/images/projects/tenar-buyer/hero.png",
                    alt: "Tenar Events Buyer Mobile Interface",
                    caption: "Tenar Events (Buyer) — Antarmuka Utama Mobile Web",
                    width: 430,
                    height: 932,
                  })
                }
                title="Klik untuk memperbesar screenshot (resolusi penuh 430x932)"
              >
                <Image
                  src="/images/projects/tenar-buyer/hero.png"
                  alt="Tenar Events Buyer Mobile Interface"
                  width={430}
                  height={932}
                  priority
                />
              </div>
            </div>

            {/* 3. Structured Metadata Strip */}
            <div className="qa-project-meta-strip" style={{ maxWidth: 860 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  QA Role
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Quality Assurance Specialist
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Perencanaan skenario &amp; eksekusi testing
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Tools &amp; Workflow
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Plane · Test Matrix
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Pelacakan issue dan verifikasi bug lifecycle
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Primary Focus
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  E2E Buyer Flow &amp; UI
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Search Flow, Input Validation
                </p>
              </div>
            </div>

            {/* 4. Honest Limitation Notice */}
            <div className="qa-limitation-notice">
              <AlertCircle style={{ width: 15, height: 15, color: "var(--warning)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: "var(--warning)", display: "block", marginBottom: 2 }}>
                  Catatan Batasan Pengujian
                </strong>
                Full purchase completion could not be validated because no purchasable event/ticket was available in the accessible production environment.
              </div>
            </div>

            {/* 5. TAMPILAN PRODUK (Real Product UI Screens) */}
            <div className="qa-evidence-section">
              <p className="qa-evidence-title">Tampilan Produk</p>
              <div className="qa-evidence-grid">
                <div
                  className="qa-evidence-card"
                  onClick={() =>
                    setLightboxImg({
                      src: "/images/projects/tenar-buyer/event-detail.png",
                      alt: "Event Detail",
                      caption: "Tenar Events (Buyer) — Event Detail",
                      width: 269,
                      height: 583,
                    })
                  }
                  title="Perbesar gambar"
                >
                  <div className="qa-evidence-thumb-wrap">
                    <Image
                      src="/images/projects/tenar-buyer/event-detail.png"
                      alt="Event Detail"
                      width={269}
                      height={583}
                      loading="lazy"
                    />
                  </div>
                  <div className="qa-evidence-caption">
                    <span>Event Detail</span>
                    <Maximize2 style={{ width: 13, height: 13, opacity: 0.6 }} />
                  </div>
                </div>

                <div
                  className="qa-evidence-card"
                  onClick={() =>
                    setLightboxImg({
                      src: "/images/projects/tenar-buyer/search-filter.png",
                      alt: "Search",
                      caption: "Tenar Events (Buyer) — Search",
                      width: 269,
                      height: 583,
                    })
                  }
                  title="Perbesar gambar"
                >
                  <div className="qa-evidence-thumb-wrap">
                    <Image
                      src="/images/projects/tenar-buyer/search-filter.png"
                      alt="Search"
                      width={269}
                      height={583}
                      loading="lazy"
                    />
                  </div>
                  <div className="qa-evidence-caption">
                    <span>Search</span>
                    <Maximize2 style={{ width: 13, height: 13, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 6. SKENARIO PENGUJIAN TERVERIFIKASI (What was tested) */}
            <div className="qa-scenarios-panel">
              <div className="qa-scenarios-header">
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.50)", textTransform: "uppercase", letterSpacing: ".10em" }}>
                  <Terminal style={{ width: 14, height: 14, color: "var(--accent)" }} />
                  Skenario Pengujian Terverifikasi
                </div>
                <ShieldCheck style={{ width: 15, height: 15, color: "var(--accent)" }} />
              </div>

              <div className="qa-scenarios-body">
                <ul style={{ display: "flex", flexDirection: "column", gap: 0, listStyle: "none" }}>
                  {[
                    {
                      title: "Alur Checkout / Buyer Flow",
                      desc: "Pengujian seleksi kuota tiket, form data pemesan, alur redirect pembayaran, dan verifikasi konfirmasi order.",
                    },
                    {
                      title: "Cross-Browser & Mobile Responsiveness",
                      desc: "Verifikasi visual dan kelancaran form checkout pada Chrome Android, Safari iOS, dan browser mobile viewports.",
                    },
                    {
                      title: "Validation & Edge Cases",
                      desc: "Pengujian penolakan email invalid, pembatasan kuota pesanan, dan pencegahan submission ganda (double-click).",
                    },
                    {
                      title: "Search Functionality",
                      desc: "Memastikan query pencarian event menampilkan hasil yang relevan dan akurat secara real-time.",
                    },
                  ].map((scenario, idx) => (
                    <li key={idx} className="qa-scenario-item">
                      <CheckCircle2 style={{ width: 15, height: 15, color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
                      <div>
                        <strong style={{ color: "rgba(245,240,232,.92)", display: "block", fontSize: 13, marginBottom: 2 }}>
                          {scenario.title}
                        </strong>
                        <span style={{ fontSize: 12, color: "rgba(245,240,232,.48)", lineHeight: 1.6, display: "block" }}>
                          {scenario.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. Compact Result */}
            <div className="qa-result-callout">
              <div className="qa-result-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>Production Live</span>
              </div>
              <p className="qa-result-desc">
                Zero critical blocker bugs at public launch. Transaksi tiket dan alur e-ticketing beroperasi stabil bagi ribuan pengguna.
              </p>
            </div>

            {/* 8. Live Action */}
            <div className="qa-live-action-bar">
              <a
                href="https://tenar.events/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Buka Platform Live <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
              <span className="qa-live-meta-url">tenar.events</span>
            </div>
          </motion.article>

          {/* ── SUBSTANTIAL VERTICAL CHAPTER SEPARATION ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              CHAPTER 02: TENAR ORGANIZER
              Rhythm: Metadata → Dashboard Image → Scope → Paths → Result
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-project-chapter"
          >
            {/* Chapter Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--accent)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  02 — CASE STUDY
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4.2vw, 44px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                TENAR ORGANIZER
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip chip-green">Production Live</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  B2B · Event Organizer CMS
                </span>
              </div>
              <p className="qa-project-overview" style={{ maxWidth: 680, margin: "0 0 22px" }}>
                Dashboard CMS bagi penyelenggara acara untuk mempublikasikan event, mengatur alokasi kuota tiket bertingkat, dan memantau analitik penjualan secara real-time.
              </p>
            </div>

            {/* 1. Structured Metadata Strip (Metadata First Rhythm) */}
            <div className="qa-project-meta-strip" style={{ maxWidth: 860 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  QA Role
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Quality Assurance Specialist
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Form validation, RBAC verification &amp; regression
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Tools &amp; Workflow
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Plane · API Inspection
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Pelaporan terperinci bug integrasi API backend
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Primary Focus
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Form Validation &amp; RBAC
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Ticket Inventory, API / System Integration
                </p>
              </div>
            </div>

            {/* 2. Large Dashboard Screenshot (Visual Anchor) */}
            <div
              className="qa-dashboard-frame"
              onClick={() =>
                setLightboxImg({
                  src: "/images/projects/tenar-organizer/hero.png",
                  alt: "Tenar Organizer CMS Dashboard",
                  caption: "Tenar Organizer — Dashboard CMS Manajemen Event & Tiket",
                  width: 1917,
                  height: 971,
                })
              }
              title="Klik untuk memperbesar screenshot dashboard"
            >
              <Image
                src="/images/projects/tenar-organizer/hero.png"
                alt="Tenar Organizer CMS Dashboard Screenshot"
                width={1917}
                height={971}
                style={{ width: "100%", height: "auto", display: "block" }}
                loading="lazy"
              />
            </div>

            {/* 3. Verified System Paths */}
            <div className="qa-scenarios-panel">
              <div className="qa-scenarios-header">
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.50)", textTransform: "uppercase", letterSpacing: ".10em" }}>
                  <Bug style={{ width: 14, height: 14, color: "var(--accent)" }} />
                  Verified System Paths
                </div>
                <Layers style={{ width: 15, height: 15, color: "var(--accent)" }} />
              </div>

              <div className="qa-scenarios-body">
                <ul style={{ display: "flex", flexDirection: "column", gap: 0, listStyle: "none" }}>
                  {[
                    {
                      title: "Multi-Step Event Creation",
                      desc: "Pengujian integritas form upload poster promosi, konfigurasi jadwal, penetapan kuota tiket, dan validasi data input.",
                    },
                    {
                      title: "Role-Based Access Control (RBAC)",
                      desc: "Memastikan hak akses promotor, tim finansial, dan scanner gate terisolasi secara ketat tanpa kebocoran data.",
                    },
                    {
                      title: "Ticket Inventory / Quota Synchronization",
                      desc: "Verifikasi pembaruan kuota real-time saat transaksi berlangsung untuk mencegah kelebihan penjualan (over-selling).",
                    },
                    {
                      title: "Bug Lifecycle / Regression",
                      desc: "Dokumentasi error API terstruktur di Plane dan eksekusi regression testing sebelum release ke production.",
                    },
                  ].map((scenario, idx) => (
                    <li key={idx} className="qa-scenario-item">
                      <CheckCircle2 style={{ width: 15, height: 15, color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
                      <div>
                        <strong style={{ color: "rgba(245,240,232,.92)", display: "block", fontSize: 13, marginBottom: 2 }}>
                          {scenario.title}
                        </strong>
                        <span style={{ fontSize: 12, color: "rgba(245,240,232,.48)", lineHeight: 1.6, display: "block" }}>
                          {scenario.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Result & Action */}
            <div className="qa-result-callout">
              <div className="qa-result-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>Production Live</span>
              </div>
              <p className="qa-result-desc">
                Stable production behavior and verified critical organizer workflows.
              </p>
            </div>

            <div className="qa-live-action-bar">
              <a
                href="https://organizer.tenar.events/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Buka Dashboard Organizer <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
              <span className="qa-live-meta-url">organizer.tenar.events</span>
            </div>
          </motion.article>

          {/* ── SUBSTANTIAL VERTICAL CHAPTER SEPARATION ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              CHAPTER 03: PAYMENT GATEWAY MVP (IN PROGRESS)
              Subdued visual weight · Zero fabricated screenshots
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-mvp-chapter"
          >
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--warning)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  03 — INTERNAL R&amp;D
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", margin: "4px 0 10px" }}>
                <h2 style={{ fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "var(--text-primary)", lineHeight: 1.15, margin: 0 }}>
                  PAYMENT GATEWAY MVP
                </h2>
                <span className="chip" style={{ fontSize: 11, padding: "3px 10px", background: "rgba(197, 150, 58, 0.12)", borderColor: "rgba(197, 150, 58, 0.30)", color: "var(--warning)" }}>
                  In Progress · Internal R&amp;D
                </span>
              </div>
              <p className="qa-project-overview" style={{ maxWidth: 560, margin: "0 0 18px" }}>
                Pengujian integrasi sistem pembayaran otomatis internal bullions — difokuskan pada ketahanan transaksi, penanganan kegagalan jaringan, dan validasi status webhook.
              </p>
            </div>

            {/* Current Testing Focus - Understated Editorial List */}
            <div style={{ padding: "14px 18px", borderRadius: 10, background: "rgba(197, 150, 58, 0.04)", borderLeft: "2px solid var(--warning)", maxWidth: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--warning)", fontFamily: "monospace", marginBottom: 8 }}>
                <Lock style={{ width: 13, height: 13, color: "var(--warning)", flexShrink: 0 }} />
                <span style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>
                  Current Testing Focus
                </span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5, fontSize: 12.5, color: "var(--text-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--warning)" }} />
                  Webhook status validation
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--warning)" }} />
                  Boundary value analysis
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--warning)" }} />
                  Fallback timeout simulation
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--warning)" }} />
                  Idempotency
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--warning)" }} />
                  Failure handling
                </li>
              </ul>
            </div>
          </motion.article>
        </div>
      </main>

      {/* Lightbox Modal */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <p style={{ fontSize: 11, color: "rgba(245,240,232,.25)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}