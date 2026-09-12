"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  PlayCircle,
  Video,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import ParallaxScene from "../components/ParallaxScene";
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

export default function CreatorPage() {
  const [lightboxImg, setLightboxImg] = useState<LightboxImage | null>(null);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene bg-scene-red" />
      <ParallaxScene />
      <Navbar />

      <main style={{ paddingTop: "clamp(96px, 11vw, 140px)", paddingBottom: 110 }}>
        <div style={W}>
          {/* ── 01. COMPACT INTRO HEADER ── */}
          <motion.header
            initial="hidden"
            animate="show"
            variants={v}
            className="creator-media-header"
            style={{ marginBottom: 32 }}
          >
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
              Sebagai anggota resmi Honor of Kings Creator Camp (Tencent Games / Level Infinite / TikTok), saya memproduksi video gameplay dengan kurasi narasi visual dinamis dan analisis retensi penonton.
            </p>
          </motion.header>

          {/* ── 02. REAL TIKTOK PROFILE SCREENSHOT & CREATOR PROFILE ── */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-profile-split"
          >
            {/* Column 1: Real TikTok Profile Screenshot */}
            <div
              className="creator-profile-screenshot-frame"
              onClick={() =>
                setLightboxImg({
                  src: "/images/creator/profil.png",
                  alt: "Tangkapan Layar Profil Resmi TikTok @scarawanderr",
                  caption: "Profil Resmi TikTok @scarawanderr — Honor of Kings Creator Camp",
                  width: 800,
                  height: 1600,
                })
              }
              title="Klik untuk memperbesar tangkapan layar profil TikTok"
            >
              <Image
                src="/images/creator/profil.png"
                alt="Tangkapan Layar Profil Resmi TikTok @scarawanderr"
                width={800}
                height={1600}
                className="creator-profile-screenshot-img"
                priority
              />
            </div>

            {/* Column 2: Creator Information & Pure Typography Metrics */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#f97316", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  CREATOR PROFILE
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 900, color: "rgba(245,240,232,.98)", letterSpacing: "-.03em", margin: "0 0 10px", lineHeight: 1.15 }}>
                @scarawanderr
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <span className="chip" style={{ background: "rgba(239,68,68,.10)", color: "#fca5a5", borderColor: "rgba(239,68,68,.22)", fontSize: 11 }}>
                  Honor of Kings Creator Camp
                </span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.45)" }}>
                  Official Tencent / TikTok Partner
                </span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "rgba(245,240,232,.62)", margin: "0 0 20px", maxWidth: 540 }}>
                Kurasi momen turnamen, video strategi makro hero, dan kampanye video pendek vertikal. Berfokus pada retensi penonton dan narasi audio yang sinkron dengan algoritma FYP TikTok.
              </p>

              {/* Metrics as Pure Typography (Not dashboard widgets) */}
              <div className="creator-typography-metrics" style={{ marginBottom: 24 }}>
                <div className="creator-type-metric-item">
                  <span className="creator-type-metric-num">3.8M+</span>
                  <span className="creator-type-metric-label">Views</span>
                </div>
                <div className="creator-type-metric-item">
                  <span className="creator-type-metric-num">245K+</span>
                  <span className="creator-type-metric-label">Likes</span>
                </div>
                <div className="creator-type-metric-item">
                  <span className="creator-type-metric-num">2.1K</span>
                  <span className="creator-type-metric-label">Followers</span>
                </div>
                <div className="creator-type-metric-item">
                  <span className="creator-type-metric-num">50+</span>
                  <span className="creator-type-metric-label">Videos</span>
                </div>
              </div>

              <div>
                <a
                  href="https://www.tiktok.com/@scarawanderr"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Kunjungi TikTok <ArrowUpRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </div>
          </motion.section>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              03. FEATURED CAMPAIGN: EPIC DEFEATED MOMENT
              Strongest Visual Treatment · Open Editorial Section
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="creator-featured-moment"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "#f97316", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  01 — FEATURED CAMPAIGN
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4.4vw, 44px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 10px" }}>
                EPIC DEFEATED MOMENT
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="chip" style={{ background: "rgba(249,115,22,.12)", color: "#fdba74", borderColor: "rgba(249,115,22,.28)" }}>
                  Top Performing #1
                </span>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)" }}>
                  Official HoK TikTok Community Challenge
                </span>
              </div>
              <p className="qa-project-overview" style={{ margin: 0, maxWidth: 660, fontSize: 15, lineHeight: 1.75 }}>
                Video kampanye resmi dengan struktur pacing agresif yang membalikkan ekspektasi penonton dari momen kekalahan dramatis menjadi aksi comeback epik. Dirancang khusus untuk memaksimalkan retensi 3 detik pertama pada algoritma FYP TikTok melalui sinkronisasi beat audio dan transisi layar dinamis.
              </p>
            </div>

            {/* Central Dominant Metric Banner (Visual Focal Point) */}
            <div className="creator-epic-display">
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#f97316", letterSpacing: ".12em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  Top Performing Video
                </span>
                <p style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 900, color: "#fdba74", letterSpacing: "-.04em", lineHeight: 1, margin: 0 }}>
                  471,400 <span style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "rgba(245,240,232,.65)", letterSpacing: "normal" }}>Views</span>
                </p>
                <p style={{ fontSize: 12.5, color: "rgba(245,240,232,.50)", margin: "6px 0 0" }}>
                  Struktur transisi beat-synced dengan retensi 3-detik pertama di FYP TikTok
                </p>
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

            {/* Editorial Metadata Strip */}
            <div className="qa-project-meta-strip" style={{ maxWidth: 860 }}>
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
          </motion.article>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              04. SECONDARY CAMPAIGNS (COMPACT EDITORIAL ROWS)
              Compact entries separated by thin lines · Zero fake thumbnails
          ══════════════════════════════════════════ */}
          <div className="creator-editorial-rows">
            {/* Campaign 02 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={vScale}
              className="creator-editorial-row"
            >
              <div>
                <span style={{ fontSize: 11.5, fontWeight: 800, fontFamily: "monospace", color: "#f59e0b", letterSpacing: ".16em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  02 — ESPORTS CURATION
                </span>
                <h3 style={{ fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 900, letterSpacing: "-.02em", color: "rgba(245,240,232,.98)", margin: "0 0 8px" }}>
                  THE CHARM OF ONIC HOK PLAYERS
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(245,240,232,.58)", maxWidth: 580, margin: "0 0 10px" }}>
                  Kompilasi momen mikro turnamen dan mekanik hero tingkat tinggi dari atlet profesional Onic Esports, dikemas dengan narasi visual yang mendekatkan figur pro player ke audiens kasual.
                </p>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "rgba(245,240,232,.42)", fontFamily: "monospace" }}>
                  <span>Format: Vertical 9:16</span>
                  <span>·</span>
                  <span>Role: Strategy &amp; Video Editing</span>
                </div>
              </div>

              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "#fde68a", letterSpacing: "-.03em" }}>
                  367,700 <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(245,240,232,.5)" }}>Views</span>
                </span>
                <a
                  href="https://www.tiktok.com/@scarawanderr/video/7510189240261643528"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Tonton di TikTok <ArrowUpRight style={{ width: 13, height: 13 }} />
                </a>
              </div>
            </motion.article>

            {/* Campaign 03 */}
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={vScale}
              className="creator-editorial-row"
            >
              <div>
                <span style={{ fontSize: 11.5, fontWeight: 800, fontFamily: "monospace", color: "#ef4444", letterSpacing: ".16em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  03 — SKIN RELEASE SPOTLIGHT
                </span>
                <h3 style={{ fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 900, letterSpacing: "-.02em", color: "rgba(245,240,232,.98)", margin: "0 0 8px" }}>
                  CINEMATIC REVIEW MILADY SWAAMPSER
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(245,240,232,.58)", maxWidth: 580, margin: "0 0 10px" }}>
                  Review sinematik efek visual skin Milady Swaampser yang menggabungkan demonstrasi efektivitas kombo skill di lane dan analisis skin value untuk mendorong awareness peluncuran item baru.
                </p>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "rgba(245,240,232,.42)", fontFamily: "monospace" }}>
                  <span>Format: Vertical 9:16</span>
                  <span>·</span>
                  <span>Role: Gameplay Capture &amp; Review</span>
                </div>
              </div>

              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "#fca5a5", letterSpacing: "-.03em" }}>
                  198,000 <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(245,240,232,.5)" }}>Views</span>
                </span>
                <a
                  href="https://www.tiktok.com/@scarawanderr/video/7565946037865549063"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Tonton di TikTok <ArrowUpRight style={{ width: 13, height: 13 }} />
                </a>
              </div>
            </motion.article>
          </div>

          {/* ── CHAPTER DIVIDER ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              05. CREATOR PRODUCTION MILESTONES ARCHIVE
              Lightweight scannable list · Open section
          ══════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={v}
            className="creator-archive-section"
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 900, fontFamily: "monospace", color: "var(--ac-hex-1)", letterSpacing: ".22em", textTransform: "uppercase" }}>
                  04 — PRODUCTION MILESTONES
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "rgba(245,240,232,.98)", lineHeight: 1.15, margin: "4px 0 6px" }}>
                CREATOR PRODUCTION ARCHIVE
              </h3>
              <p style={{ fontSize: 13, fontFamily: "monospace", color: "rgba(245,240,232,.50)", margin: 0 }}>
                2025 — Sekarang · Rekam Jejak Kontrak Resmi &amp; Kampanye Publisher
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ padding: 6, borderRadius: 6, background: "rgba(var(--ac-1),.08)", color: "var(--ac-hex-1)", flexShrink: 0 }}>
                      <Video style={{ width: 14, height: 14 }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.90)", margin: 0 }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.42)", margin: "2px 0 0" }}>
                        {item.partner} · {item.deliverable}
                      </p>
                    </div>
                  </div>

                  <span className="chip" style={{ fontSize: 10.5, padding: "2px 8px" }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Lightbox Modal */}
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(var(--ac-1),.08)", background: "rgba(255,255,255,.015)" }}>
        <p style={{ fontSize: 11, color: "rgba(245,240,232,.25)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}