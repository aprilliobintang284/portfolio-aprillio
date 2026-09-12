"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  PlayCircle,
  Video,
  ArrowUpRight,
  TrendingUp,
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

export default function CreatorPage() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene bg-scene-red" />
      <ParallaxScene />
      <Navbar />

      <main style={{ paddingTop: "clamp(96px, 11vw, 140px)", paddingBottom: 110 }}>
        <div style={W}>
          {/* ── 01. COMPACT HERO HEADER ── */}
          <motion.header
            initial="hidden"
            animate="show"
            variants={v}
            className="creator-media-header"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 12 }}>
                  Creator Portfolio · Media &amp; Campaigns
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
                  Digital Content for{" "}
                  <span className="grad-orange">Honor of Kings.</span>
                </h1>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "rgba(245,240,232,.52)",
                    maxWidth: 640,
                  }}
                >
                  Sebagai anggota resmi Honor of Kings Creator Camp (Tencent / TikTok), saya memadukan gameplay presisi, narasi visual dinamis, dan analisis retensi penonton untuk memproduksi kampanye video pendek dengan jutaan tayangan.
                </p>
              </div>

              <a
                href="https://www.tiktok.com/@scarawanderr"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ marginTop: 6 }}
              >
                Kunjungi TikTok @scarawanderr <ArrowUpRight style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </motion.header>

          {/* ── 02. COMPACT HORIZONTAL PROOF METRICS ── */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-metrics-row"
            aria-label="Creator performance metrics"
          >
            <div className="creator-metric-item">
              <span style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 900, color: "rgba(245,240,232,.96)", letterSpacing: "-.04em", lineHeight: 1.1 }}>
                3.8M+
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>
                Total Video Views
              </span>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                Akumulasi tayangan kampanye
              </span>
            </div>

            <div className="creator-metric-item">
              <span style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 900, color: "rgba(245,240,232,.96)", letterSpacing: "-.04em", lineHeight: 1.1 }}>
                245K+
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>
                Total Likes
              </span>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                Interaksi positif komunitas
              </span>
            </div>

            <div className="creator-metric-item">
              <span style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 900, color: "rgba(245,240,232,.96)", letterSpacing: "-.04em", lineHeight: 1.1 }}>
                2.1K
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>
                Followers
              </span>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                Pengikut setia konten HoK
              </span>
            </div>

            <div className="creator-metric-item">
              <span style={{ fontSize: "clamp(26px, 3.4vw, 38px)", fontWeight: 900, color: "rgba(245,240,232,.96)", letterSpacing: "-.04em", lineHeight: 1.1 }}>
                50+
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>
                Official Videos
              </span>
              <span style={{ fontSize: 11, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                Kontrak kampanye selesai
              </span>
            </div>
          </motion.section>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              03. CAMPAIGN 01: HERO FEATURED WORK
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-campaign-chapter"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#f97316", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  01 — FEATURED CAMPAIGN
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                EPIC DEFEATED MOMENT
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip" style={{ background: "rgba(249,115,22,.12)", color: "#fdba74", borderColor: "rgba(249,115,22,.25)" }}>
                  Top Performing #1
                </span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  Official HoK TikTok Community Challenge
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Video kampanye resmi dengan struktur pacing agresif yang membalikkan ekspektasi penonton dari momen kekalahan dramatis menjadi aksi comeback epik. Dirancang khusus untuk memaksimalkan retensi 3 detik pertama pada algoritma FYP TikTok.
              </p>
            </div>

            {/* Metadata Strip */}
            <div className="qa-project-meta-strip">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Objective
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Max FYP Retention Hook
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Transisi dramatis &amp; sinkronisasi audio beat
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Format &amp; Platform
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Vertical 9:16 · TikTok
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Optimalisasi layar smartphone
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f97316", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Production Role
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Gameplay, Sound &amp; Editing
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Perekaman independen hingga post-production
                </p>
              </div>
            </div>

            {/* Metric Banner + Action */}
            <div className="creator-metric-banner" style={{ border: "1px solid rgba(249,115,22,.25)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ padding: 10, borderRadius: "50%", background: "rgba(249,115,22,.12)", color: "#f97316" }}>
                  <TrendingUp style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.40)", letterSpacing: ".10em", textTransform: "uppercase" }}>
                    Performa Penayangan
                  </p>
                  <p style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, color: "#fdba74", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                    471,400 Views
                  </p>
                </div>
              </div>

              <a
                href="https://vt.tiktok.com/ZSHhhM7mg/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Tonton di TikTok <PlayCircle style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </motion.article>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              04. CAMPAIGN 02: ESPORTS SPOTLIGHT
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-campaign-chapter"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#f59e0b", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  02 — CAMPAIGN SPOTLIGHT
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                THE CHARM OF ONIC HOK PLAYERS
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip" style={{ background: "rgba(245,158,11,.10)", color: "#fde68a", borderColor: "rgba(245,158,11,.22)" }}>
                  Esports &amp; Influencer Spotlight
                </span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  Pro Player Gameplay Curation
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Kompilasi momen mikro turnamen dan mekanik hero tingkat tinggi dari atlet tim profesional Onic Esports. Dikemas dengan narasi visual yang mendekatkan figur atlet ke pemirsa kasual dan pemain pemula.
              </p>
            </div>

            {/* Metadata Strip */}
            <div className="qa-project-meta-strip">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Objective
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Community Engagement
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Mendorong antusiasme scene esports
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Format &amp; Platform
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Vertical 9:16 · TikTok
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Kurasi highlight turnamen
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Production Role
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Content Strategy &amp; Video Editing
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Seleksi momen kunci pertandingan
                </p>
              </div>
            </div>

            {/* Metric Banner + Action */}
            <div className="creator-metric-banner" style={{ border: "1px solid rgba(245,158,11,.22)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ padding: 10, borderRadius: "50%", background: "rgba(245,158,11,.12)", color: "#f59e0b" }}>
                  <TrendingUp style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.40)", letterSpacing: ".10em", textTransform: "uppercase" }}>
                    Performa Penayangan
                  </p>
                  <p style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, color: "#fde68a", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                    367,700 Views
                  </p>
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@scarawanderr/video/7510189240261643528"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Tonton di TikTok <PlayCircle style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </motion.article>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              05. CAMPAIGN 03: PRODUCT & SKIN SPOTLIGHT
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-campaign-chapter"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#ef4444", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  03 — CAMPAIGN SPOTLIGHT
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                CINEMATIC REVIEW MILADY SWAAMPSER
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip" style={{ background: "rgba(239,68,68,.10)", color: "#fca5a5", borderColor: "rgba(239,68,68,.22)" }}>
                  Skin Release Spotlight
                </span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  Product Awareness Campaign
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Review sinematik efek visual skin Milady Swaampser yang menggabungkan demonstrasi efektivitas kombo skill di lane dan analisis skin value untuk mendorong awareness peluncuran item baru.
              </p>
            </div>

            {/* Metadata Strip */}
            <div className="qa-project-meta-strip">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Objective
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Product Release Awareness
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Demonstrasi visual skin &amp; gameplay build
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Format &amp; Platform
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Vertical 9:16 · TikTok
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Color grading eksklusif &amp; slow-mo
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>
                  Production Role
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)" }}>
                  Gameplay Capture &amp; Review
                </p>
                <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.40)", marginTop: 2 }}>
                  Analisis estetika dan efektivitas skill
                </p>
              </div>
            </div>

            {/* Metric Banner + Action */}
            <div className="creator-metric-banner" style={{ border: "1px solid rgba(239,68,68,.22)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ padding: 10, borderRadius: "50%", background: "rgba(239,68,68,.12)", color: "#ef4444" }}>
                  <TrendingUp style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(245,240,232,.40)", letterSpacing: ".10em", textTransform: "uppercase" }}>
                    Performa Penayangan
                  </p>
                  <p style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 900, color: "#fca5a5", letterSpacing: "-.03em", lineHeight: 1.1 }}>
                    198,000 Views
                  </p>
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@scarawanderr/video/7565946037865549063"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Tonton di TikTok <PlayCircle style={{ width: 14, height: 14 }} />
              </a>
            </div>
          </motion.article>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              06. CREATOR PRODUCTION MILESTONES ARCHIVE
          ══════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={v}
            className="creator-archive-chapter"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--ac-hex-1)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  04 — PRODUCTION MILESTONES
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                CREATOR PRODUCTION ARCHIVE
              </h3>
              <p style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)", margin: "0 0 14px" }}>
                2025 — Sekarang · Rekam Jejak Kontrak Resmi &amp; Kampanye Publisher
              </p>
              <p className="qa-project-overview" style={{ margin: 0 }}>
                Rekam jejak kontrak resmi kampanye game publisher, produksi konten edukasi strategi mekanik hero, dan kurasi momen turnamen komunitas.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  title: "Honor of Kings Creator Camp Official Contract (Batch 1–3)",
                  deliverable: "50 Official Promotional Campaign Videos",
                  partner: "Tencent Games · Level Infinite · TikTok",
                  status: "Selesai",
                },
                {
                  title: "Hero Mechanics & Map Macro Strategy Educational Series",
                  deliverable: "Video Edukasi Gameplay, Laning, & Rotasi Map",
                  partner: "Niche Gaming Community",
                  status: "Aktif",
                },
                {
                  title: "Tournament Highlight Curation & Audio-Sync Short Clips",
                  deliverable: "Kurasi Momen Kritis Pertandingan & Sound Design",
                  partner: "Community Organic Reach",
                  status: "Aktif",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderRadius: 14,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ padding: 9, borderRadius: 10, background: "rgba(var(--ac-1),.08)", color: "var(--ac-hex-1)", flexShrink: 0 }}>
                      <Video style={{ width: 16, height: 16 }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "rgba(245,240,232,.92)" }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: 12, color: "rgba(245,240,232,.45)", marginTop: 2 }}>
                        {item.partner} · {item.deliverable}
                      </p>
                    </div>
                  </div>

                  <span className="chip" style={{ fontSize: 11, padding: "3px 10px" }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
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