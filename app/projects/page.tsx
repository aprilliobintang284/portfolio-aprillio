"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Bug,
  ShieldCheck,
  Lock,
  Layers,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ParallaxScene from "../components/ParallaxScene";

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
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene bg-scene-amber" />
      <ParallaxScene />
      <Navbar />

      <main style={{ paddingTop: "clamp(96px, 11vw, 140px)", paddingBottom: 110 }}>
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
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--ac-hex-1)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  01 — CASE STUDY
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4.2vw, 44px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                TENAR EVENTS (BUYER)
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip chip-green">Production Live</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  B2C Event Ticketing Platform
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Platform e-ticketing publik yang melayani ribuan pencari tiket event. Fokus pengujian adalah memastikan tidak ada kegagalan transaksi pada alur checkout multi-step, mencegah duplikasi order tiket saat network latency, dan memvalidasi keakuratan filter event aktif di berbagai ukuran layar.
              </p>
            </div>

            {/* Structured Metadata Strip */}
            <div className="qa-project-meta-strip">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
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
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Tools &amp; Workflow
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Plane · Test Matrix · Dev Sync
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Pelacakan issue dan verifikasi bug lifecycle
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Primary Focus
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  End-to-End Checkout Flow
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Cross-browser testing, filter &amp; search accuracy
                </p>
              </div>
            </div>

            {/* Live Action Bar (Compact action, not a raw URL heading) */}
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

            {/* Dedicated Verified Test Scenarios Box */}
            <div className="qa-scenarios-panel">
              <div className="qa-scenarios-header">
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.50)", textTransform: "uppercase", letterSpacing: ".10em" }}>
                  <Terminal style={{ width: 14, height: 14, color: "var(--ac-hex-1)" }} />
                  Cakupan Pengujian &amp; Skenario Terverifikasi
                </div>
                <ShieldCheck style={{ width: 15, height: 15, color: "var(--ac-hex-1)" }} />
              </div>

              <div className="qa-scenarios-body">
                <ul style={{ display: "flex", flexDirection: "column", gap: 0, listStyle: "none" }}>
                  {[
                    {
                      title: "Alur Checkout & Transaksi Pembayaran Tiket",
                      desc: "Pengujian end-to-end dari penentuan kuota kategori tiket, pengisian form data pemesan, integrasi payment redirect, hingga verifikasi token e-tiket masuk ke email pembeli.",
                    },
                    {
                      title: "Cross-Browser & Multi-Device Responsiveness",
                      desc: "Verifikasi konsistensi rendering UI, interaktivitas modal popup tiket, dan kelancaran form checkout pada browser Chrome, Safari iOS, dan Android mobile viewports.",
                    },
                    {
                      title: "Validasi Form Input & Edge Cases Pencegahan Error",
                      desc: "Pengujian pembatasan kuota tiket per transaksi, penolakan format email invalid, penanganan session timeout saat pembayaran, dan pencegahan transaksi ganda (double click prevention).",
                    },
                    {
                      title: "Fungsionalitas Filter Pencarian & Kategori Event Aktif",
                      desc: "Memastikan query pencarian event, filter lokasi kota, dan rentang tanggal menampilkan hasil akurat secara real-time tanpa freeze antarmuka.",
                    },
                  ].map((scenario, idx) => (
                    <li key={idx} className="qa-scenario-item">
                      <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
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

            {/* Distinct Result / Status Block */}
            <div className="qa-result-callout">
              <div className="qa-result-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>Production Live Status</span>
              </div>
              <p className="qa-result-desc">
                Zero critical blocker bugs saat peluncuran publik. Transaksi tiket dan alur e-ticketing beroperasi stabil dan aman bagi ribuan pengguna.
              </p>
            </div>
          </motion.article>

          {/* ── SUBSTANTIAL VERTICAL CHAPTER SEPARATION ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              CHAPTER 02: TENAR ORGANIZER
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
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--ac-hex-1)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  02 — CASE STUDY
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4.2vw, 44px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                TENAR ORGANIZER
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip chip-green">Production Live</span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  B2B Event Organizer CMS Dashboard
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Dashboard CMS eksklusif bagi penyelenggara acara untuk mengelola alur publikasi event, pengaturan kuota tiket multi-tier, pelacakan analitik penjualan tiket, dan kontrol hak akses tim lapangan (check-in gate).
              </p>
            </div>

            {/* Structured Metadata Strip */}
            <div className="qa-project-meta-strip">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
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
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Tools &amp; Workflow
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Plane · Payload Inspection · Cross-Role Testing
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Pelaporan terperinci bug integrasi API backend
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Primary Focus
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Multi-Step Form &amp; Role Access
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Sinkronisasi kuota inventori tiket &amp; validasi data
                </p>
              </div>
            </div>

            {/* Live Action Bar (Compact action, not a raw URL heading) */}
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

            {/* Dedicated Verified Test Scenarios Box */}
            <div className="qa-scenarios-panel">
              <div className="qa-scenarios-header">
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.50)", textTransform: "uppercase", letterSpacing: ".10em" }}>
                  <Bug style={{ width: 14, height: 14, color: "var(--ac-hex-1)" }} />
                  Cakupan Pengujian &amp; Kontrol Sistem Terverifikasi
                </div>
                <Layers style={{ width: 15, height: 15, color: "var(--ac-hex-1)" }} />
              </div>

              <div className="qa-scenarios-body">
                <ul style={{ display: "flex", flexDirection: "column", gap: 0, listStyle: "none" }}>
                  {[
                    {
                      title: "Form Multi-Step Pembuatan & Pengeditan Event",
                      desc: "Pengujian integritas input form kompleks: upload poster promosi, konfigurasi jadwal jam tayang, penetapan kuota Early Bird / Presale / VIP, serta perhitungan fee transaksi.",
                    },
                    {
                      title: "Role-Based Access Control (RBAC) Security",
                      desc: "Memastikan isolasi hak akses antara Promotor (Owner event), Manajer Finansial (laporan omset), dan Petugas Lapangan (hanya scanner check-in QR code).",
                    },
                    {
                      title: "Sinkronisasi Kuota Tiket dengan Transaksi Pembeli",
                      desc: "Verifikasi real-time update sisa kuota inventori tiket saat pembelian masif berlangsung, memastikan tidak terjadi over-selling tiket.",
                    },
                    {
                      title: "Pelacakan & Siklus Perbaikan Bug Terstruktur di Plane",
                      desc: "Dokumentasi issue error validasi API, pembuatan skenario reproduksi bug, dan verifikasi ulang (regression test) sebelum kode masuk ke branch production.",
                    },
                  ].map((scenario, idx) => (
                    <li key={idx} className="qa-scenario-item">
                      <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
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

            {/* Distinct Result / Status Block */}
            <div className="qa-result-callout">
              <div className="qa-result-badge">
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>Production Live Status</span>
              </div>
              <p className="qa-result-desc">
                Menjamin stabilitas operasional puluhan event promotor aktif tanpa kendala hak akses ataupun anomali inventori tiket.
              </p>
            </div>
          </motion.article>

          {/* ── SUBSTANTIAL VERTICAL CHAPTER SEPARATION ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              CHAPTER 03: PAYMENT GATEWAY MVP (IN PROGRESS)
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-mvp-chapter"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#f59e0b", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  03 — INTERNAL R&amp;D
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", margin: "4px 0 10px" }}>
                <h2 style={{ fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.92)", lineHeight: 1.15, margin: 0 }}>
                  PAYMENT GATEWAY MVP
                </h2>
                <span className="chip" style={{ fontSize: 11, padding: "3px 10px", background: "rgba(245,158,11,.12)", borderColor: "rgba(245,158,11,.28)", color: "#fbbf24" }}>
                  Status: In Progress · Internal R&amp;D
                </span>
              </div>
              <p style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.48)", margin: "0 0 14px" }}>
                Internal Bullions Integration &amp; Transaction Resilience Testing
              </p>
              <p className="qa-project-overview" style={{ margin: "0 0 24px" }}>
                Pengujian integrasi sistem pembayaran otomatis internal bullions — difokuskan pada validasi status webhook callback, penanganan boundary nominal transaksi, simulasi time-out bank, dan alur pemulihan transaksi gagal.
              </p>
            </div>

            {/* Distinct R&D Focus Strip */}
            <div style={{ padding: "16px 20px", borderRadius: 14, background: "rgba(10,8,6,.85)", border: "1px solid rgba(245,158,11,.24)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#fde68a", fontFamily: "monospace", flexWrap: "wrap" }}>
                <Lock style={{ width: 14, height: 14, color: "#f59e0b", flexShrink: 0 }} />
                <span style={{ fontWeight: 700 }}>Fokus Pengujian Internal:</span>
                <span style={{ color: "rgba(245,240,232,.65)" }}>
                  Webhook status validation · Boundary value analysis · Fallback timeout simulation · Idempotency check
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(var(--ac-1),.08)", background: "rgba(255,255,255,.015)" }}>
        <p style={{ fontSize: 11, color: "rgba(245,240,232,.25)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}