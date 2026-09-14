"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  Mail,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  ExternalLink,
  Keyboard,
  Globe,
  Lock,
  PlayCircle,
  School,
} from "lucide-react";
import Navbar from "./components/Navbar";
import ParallaxScene from "./components/ParallaxScene";
import HeroBento from "./components/HeroBento";

const v: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const vScale: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const s: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const VP = { once: true, margin: "-60px" } as const;
const W = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
const SEC = { padding: "80px 0", position: "relative" as const };

/** Deterministic number formatting with commas across all servers, browsers, and locales */
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

type DuoCourse = { title: string; xp: number; language: string };
type DuoStats = {
  streak: number;
  totalXp: number;
  activeCourses: number;
  courses: DuoCourse[];
  joinedAt: string | null;
  longestStreak: number;
};

type MTStats = {
  bestWpm: number;
  bestRaw: number;
  bestAcc: number;
  bestConsistency: number;
  avgWpm: number;
  completedTests: number;
  completionPct: number;
  timeTyping: string;
  startedTests: number;
};

export default function Home() {
  const [stats, setStats] = useState<MTStats>({
    bestWpm: 121,
    bestRaw: 125,
    bestAcc: 97,
    bestConsistency: 79,
    avgWpm: 94,
    completedTests: 669,
    completionPct: 21,
    timeTyping: "9h 52m",
    startedTests: 3300,
  });
  const [mtLoading, setMtLoading] = useState(true);
  const [duo, setDuo] = useState<DuoStats | null>({
    streak: 114,
    totalXp: 9458,
    activeCourses: 3,
    joinedAt: null,
    longestStreak: 114,
    courses: [
      { title: "English", xp: 5277, language: "en" },
      { title: "Korean", xp: 4037, language: "ko" },
      { title: "Chinese", xp: 144, language: "zh-cn" },
    ],
  });
  const [duoLoading, setDuoLoading] = useState(true);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactSending(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      emailjs.init("a-CT85N__014i3qQL");
      const result = await emailjs.send(
        "service_2cuy6wl",
        "template_dt8t5rc",
        {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          title: `Pesan dari ${contactForm.name}`,
        }
      );
      console.log("EmailJS success:", result);
      setContactError(null);
      setContactSent(true);
      setTurnstileToken(null);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setContactSent(false), 5000);
    } catch (err: unknown) {
      console.error("EmailJS error detail:", JSON.stringify(err));
      const raw = err as { status?: number; text?: string };
      const msg = raw?.text ?? (err instanceof Error ? err.message : "Unknown error");
      setContactError(msg);
      setTimeout(() => setContactError(null), 6000);
    } finally {
      setContactSending(false);
    }
  }

  useEffect(() => {
    // Fetch MonkeyType via proxy
    fetch("/api/monkeytype")
      .then((r) => r.json())
      .then((d: MTStats & { ok?: boolean }) => {
        if (d?.ok) {
          setStats({
            bestWpm: d.bestWpm ?? 121,
            bestRaw: d.bestRaw ?? 125,
            bestAcc: d.bestAcc ?? 97,
            bestConsistency: d.bestConsistency ?? 79,
            avgWpm: d.avgWpm ?? 94,
            completedTests: d.completedTests ?? 669,
            completionPct: d.completionPct ?? 21,
            timeTyping: d.timeTyping ?? "9h 52m",
            startedTests: d.startedTests ?? 3300,
          });
        }
      })
      .catch(() => {})
      .finally(() => setMtLoading(false));

    // Fetch Duolingo via proxy
    fetch("/api/duolingo")
      .then((r) => r.json())
      .then((d: DuoStats & { ok?: boolean }) => {
        if (d?.ok) {
          setDuo({
            streak: d.streak,
            totalXp: d.totalXp,
            activeCourses: d.activeCourses,
            courses: d.courses ?? [],
            joinedAt: d.joinedAt ?? null,
            longestStreak: d.longestStreak ?? d.streak,
          });
        }
      })
      .catch(() => {})
      .finally(() => setDuoLoading(false));
  }, []);

  const edu = [
    { yr: "Agu 2025 — Sekarang", title: "S1 Sistem Informasi", school: "Universitas Terbuka", href: "https://ut.ac.id" },
    { yr: "Jan 2026 — Sekarang", title: "S1 Manajemen", school: "Univ. Siber Muhammadiyah", href: "https://sibermu.ac.id" },
    { yr: "2022 — 2024", title: "Rekayasa Perangkat Lunak", school: "SMK Negeri 4 Kendal", href: "https://smkn4kendal.sch.id" },
  ];

  const certs = [
    { t: "QA Test Technique", i: "MySkill", d: "Apr 2026", f: "/cert-qa-technique.pdf", isQA: true },
    { t: "Quality Assurance Introduction", i: "MySkill", d: "Feb 2025", f: "/cert-qa-intro.pdf", isQA: true },
    { t: "Microsoft 365 Copilot", i: "Microsoft", d: "Apr 2026", f: "/cert-copilot.pdf", isQA: false },
    { t: "Pelatihan Dasar Copilot", i: "Jobstreet & Microsoft", d: "Apr 2026", f: "/cert-jobstreet-copilot.pdf", isQA: false },
    { t: "Analisis Data Excel", i: "Microsoft & Jobstreet", d: "Apr 2026", f: "/cert-excel.pdf", isQA: false },
    { t: "Intensive Bootcamp Excel", i: "KarirNex", d: "Apr 2026", f: "/cert-excel-karirnex.pdf", isQA: false },
    { t: "#JuaraVibeCoding Participant", i: "Google Developer Groups", d: "May 2026", f: "/cert-googlevibecode.pdf", isQA: false },
  ];

  const campaigns = [
    { title: "Epic Defeated Moment", views: "471,400", href: "https://vt.tiktok.com/ZSHhhM7mg/", tag: "Viral Reach" },
    { title: "The Charm of Onic HoK Players", views: "367,700", href: "https://www.tiktok.com/@scarawanderr/video/7510189240261643528", tag: "Engagement" },
    { title: "Cinematic Review Milady Swaampser", views: "198,000", href: "https://www.tiktok.com/@scarawanderr/video/7565946037865549063", tag: "Hero Spotlight" },
  ];

  const countryCode: Record<string, string> = {
    ja: "jp", en: "us", ko: "kr", fr: "fr", es: "es", de: "de",
    "zh-cn": "cn", zh: "cn", pt: "br", it: "it", ru: "ru",
    ar: "sa", hi: "in", id: "id", tr: "tr", nl: "nl", pl: "pl",
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene" />
      <ParallaxScene />
      <Navbar />

      <main>
        {/* 01 — HERO (OPEN LAYOUT) */}
        <HeroBento />

        {/* SUBTLE MARQUEE SEPARATOR */}
        <div
          style={{
            overflow: "hidden",
            padding: "12px 0",
            borderTop: "1px solid rgba(var(--ac-1),.07)",
            borderBottom: "1px solid rgba(var(--ac-1),.07)",
            background: "rgba(255,255,255,.015)",
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: "flex",
              whiteSpace: "nowrap" as const,
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: ".18em",
              textTransform: "uppercase" as const,
              color: "rgba(245,240,232,.22)",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} style={{ margin: "0 36px" }}>
                ✦ Functional Testing ✦ End-to-End Testing ✦ Bug Lifecycle ✦ Video Editing ✦ Honor of Kings Campaign ✦ Audience Analytics
              </span>
            ))}
          </div>
        </div>

        {/* 02 — ABOUT / TWO SIDES OF ME (OPEN TWO-COLUMN EDITORIAL LAYOUT — NO CARDS) */}
        <section id="about" style={{ ...SEC }}>
          <div style={W}>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}>
              <motion.div variants={v} style={{ maxWidth: 640, marginBottom: 36 }}>
                <span className="eyebrow" style={{ marginBottom: 12 }}>Tentang Saya</span>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em", lineHeight: 1.15, marginBottom: 16 }}>
                  Presisi Teknis &amp; <span className="grad-orange">Kreativitas Konten.</span>
                </h2>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 14, fontSize: 14.5, lineHeight: 1.7, color: "rgba(245,240,232,.55)" }}>
                  <p>
                    Sebagai <strong style={{ color: "rgba(245,240,232,.90)" }}>Quality Assurance Specialist</strong>, peran saya berpusat pada ketelitian: menyusun skenario pengujian terstruktur, menguji stabilitas alur transaksi, dan melacak bug di Plane sebelum perangkat lunak dinikmati publik.
                  </p>
                  <p>
                    Di saat yang sama, saya aktif sebagai <strong style={{ color: "rgba(245,240,232,.90)" }}>Gaming Content Creator</strong> untuk Honor of Kings. Di ranah ini, keahlian saya berfokus pada dinamika pacing video, riset tren komunitas, dan eksekusi konten yang menghasilkan jangkauan jutaan penonton di TikTok.
                  </p>
                </div>
              </motion.div>

              {/* Open Two-Column Focus Areas (Clean text blocks, no card containers) */}
              <div className="about-editorial-grid">
                <motion.div variants={v} className="about-editorial-block">
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: 2 }}>
                      Disiplin QA
                    </p>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "rgba(245,240,232,.92)" }}>
                      Quality Assurance &amp; Testing
                    </h3>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(245,240,232,.45)", lineHeight: 1.6 }}>
                    Metodologi pengujian terstruktur untuk menjamin keandalan fungsionalitas dan integrasi perangkat lunak.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7, marginTop: 4 }}>
                    {["Functional & E2E Testing", "Bug Reporting (Plane)", "Cross-browser Testing", "Manual API Verification", "Regression Testing"].map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: 12,
                          padding: "4px 11px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,.03)",
                          border: "1px solid rgba(255,255,255,.08)",
                          color: "rgba(245,240,232,.72)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={v} className="about-editorial-block">
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ac-hex-1)", textTransform: "uppercase" as const, letterSpacing: ".08em", marginBottom: 2 }}>
                      Disiplin Kreatif
                    </p>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "rgba(245,240,232,.92)" }}>
                      Content Creation &amp; Media
                    </h3>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(245,240,232,.45)", lineHeight: 1.6 }}>
                    Produksi video gaming dan kampanye resmi brand dengan orientasi analitik audiens dan performa retensi.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7, marginTop: 4 }}>
                    {["Video Editing & Pacing", "Campaign Strategy", "HoK Creator Camp Member", "Audience Retention Analytics", "Community Growth"].map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: 12,
                          padding: "4px 11px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,.03)",
                          border: "1px solid rgba(255,255,255,.08)",
                          color: "rgba(245,240,232,.72)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 03 — EXPERIENCE (OPEN VERTICAL TIMELINE — NO CARDS, NO RED PILLS) */}
        <section id="experience" style={{ ...SEC }}>
          <div style={W}>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} style={{ marginBottom: 40 }}>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Pengalaman Kerja</span>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em" }}>
                Rekam <span className="grad-orange">Jejak.</span>
              </h2>
            </motion.div>

            {/* Clean Timeline Structure with Unified Theme Accent */}
            <div className="timeline-track">
              {/* Role 1: QA Specialist */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-meta">
                  <span className="timeline-period">Jun 2025 — Sekarang</span>
                  <span className="timeline-badge" style={{ background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-text2)" }}>
                    Aktif
                  </span>
                </div>
                <h3 className="timeline-role">Quality Assurance Specialist</h3>
                <p className="timeline-company">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                <ul className="timeline-list">
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Melakukan end-to-end testing menyeluruh untuk platform tiket Tenar (Buyer &amp; Organizer) Phase 2–4 serta Payment Gateway MVP.</span>
                  </li>
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Menyusun puluhan test case fungsional, memvalidasi alur checkout tiket dan integrasi form event.</span>
                  </li>
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Mencatat dan mengelola status pelaporan bug secara berkala di Plane, berkoordinasi langsung dengan developer untuk verifikasi perbaikan.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Role 2: Freelance Creator */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-meta">
                  <span className="timeline-period">2025 — Sekarang</span>
                  <span className="timeline-badge" style={{ background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-text2)" }}>
                    Aktif
                  </span>
                </div>
                <h3 className="timeline-role">Freelance Gaming Content Creator</h3>
                <p className="timeline-company">Honor of Kings (Tencent / TikTok) · Remote</p>
                <ul className="timeline-list">
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Menyelesaikan kontrak 50 video promosi resmi kampanye TikTok untuk game Honor of Kings.</span>
                  </li>
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Anggota aktif HoK Creator Camp dengan akumulasi penayangan jutaan penonton dan interaksi komunitas tinggi.</span>
                  </li>
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "var(--ac-hex-1)", flexShrink: 0, marginTop: 3 }} />
                    <span>Menjalankan seluruh siklus produksi: perekaman gameplay, kurasi momen, sound design, dan pacing video yang dioptimalkan untuk algoritma.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Role 3: Server Monitoring Intern */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} className="timeline-item">
                <span className="timeline-dot" style={{ background: "rgba(245,240,232,.4)", boxShadow: "none" }} />
                <div className="timeline-meta">
                  <span className="timeline-period">Agu 2024 — Jun 2025</span>
                  <span className="timeline-badge" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.10)", color: "rgba(245,240,232,.50)" }}>
                    Selesai
                  </span>
                </div>
                <h3 className="timeline-role">Internship Monitoring Server</h3>
                <p className="timeline-company">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                <ul className="timeline-list">
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "rgba(245,240,232,.4)", flexShrink: 0, marginTop: 3 }} />
                    <span>Pemantauan operasional server produksi secara berkala untuk menjaga uptime dan stabilitas sistem.</span>
                  </li>
                  <li>
                    <CheckCircle2 style={{ width: 15, height: 15, color: "rgba(245,240,232,.4)", flexShrink: 0, marginTop: 3 }} />
                    <span>Menganalisis error transaksi dan mendokumentasikan kendala operasional ke laporan teknis pemeliharaan.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 04 — SELECTED PROJECTS / SELECTED WORK (CARDS ARE APPROPRIATE HERE) */}
        <section id="projects" style={{ ...SEC }}>
          <div style={W}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={v}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 16, marginBottom: 36 }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: 12 }}>Portofolio QA</span>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em" }}>
                  Proyek <span className="grad-orange">Pilihan.</span>
                </h2>
                <p style={{ fontSize: 14, color: "rgba(245,240,232,.45)", marginTop: 6, maxWidth: 520 }}>
                  Ringkasan pengujian fungsionalitas dan stabilitas sistem. Dokumentasi lengkap tersedia di halaman proyek.
                </p>
              </div>
              <Link href="/projects" className="btn btn-ghost btn-sm" style={{ color: "var(--ac-text2)" }}>
                Lihat Semua Project <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </motion.div>

            {/* 2 Featured QA Project Cards */}
            <div className="home-projects-grid">
              {/* Project 1: Tenar Events Buyer */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="g-card" style={{ padding: "28px 26px", display: "flex", flexDirection: "column" as const }}>
                <div className="top-bar" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-text2)" }}>
                    Production Live
                  </span>
                  <a
                    href="https://tenar.events/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: 8, borderRadius: "50%", background: "rgba(var(--ac-1),.10)", border: "1px solid rgba(var(--ac-1),.22)", color: "var(--ac-hex-1)", display: "flex" }}
                    aria-label="Kunjungi Tenar Events"
                  >
                    <ExternalLink style={{ width: 14, height: 14 }} />
                  </a>
                </div>
                <p style={{ fontSize: 11.5, fontFamily: "monospace", color: "rgba(245,240,232,.40)", marginBottom: 4 }}>B2C Event Ticketing</p>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: "rgba(245,240,232,.92)", marginBottom: 8 }}>Tenar Events (Buyer)</h3>
                <p style={{ fontSize: 13.5, color: "rgba(245,240,232,.52)", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>
                  Platform pencarian dan pembelian tiket event bagi pengguna akhir. Pengujian difokuskan pada kelancaran alur checkout tanpa hambatan, keamanan data pemesanan, dan filter pencarian event aktif.
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 8 }}>Cakupan QA</p>
                  <ul style={{ display: "flex", flexDirection: "column" as const, gap: 6, fontSize: 12.5, color: "rgba(245,240,232,.65)" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> End-to-end testing alur pembayaran tiket
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> Cross-browser testing responsif (Mobile &amp; Desktop)
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> Validasi filter pencarian event &amp; kategori
                    </li>
                  </ul>
                  <Link
                    href="/projects"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--ac-hex-1)", textDecoration: "none", marginTop: 14 }}
                  >
                    Detail Studi Kasus QA <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </motion.div>

              {/* Project 2: Tenar Organizer */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="g-card" style={{ padding: "28px 26px", display: "flex", flexDirection: "column" as const }}>
                <div className="top-bar" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-text2)" }}>
                    Production Live
                  </span>
                  <a
                    href="https://organizer.tenar.events/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: 8, borderRadius: "50%", background: "rgba(var(--ac-1),.10)", border: "1px solid rgba(var(--ac-1),.22)", color: "var(--ac-hex-1)", display: "flex" }}
                    aria-label="Kunjungi Tenar Organizer"
                  >
                    <ExternalLink style={{ width: 14, height: 14 }} />
                  </a>
                </div>
                <p style={{ fontSize: 11.5, fontFamily: "monospace", color: "rgba(245,240,232,.40)", marginBottom: 4 }}>B2B Event Organizer CMS</p>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: "rgba(245,240,232,.92)", marginBottom: 8 }}>Tenar Organizer</h3>
                <p style={{ fontSize: 13.5, color: "rgba(245,240,232,.52)", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>
                  Dashboard CMS eksklusif bagi penyelenggara acara untuk mengelola pembuatan event, pengaturan kuota tiket multi-tier, hingga pelacakan analitik penjualan secara real-time.
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ac-hex-1)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 8 }}>Cakupan QA</p>
                  <ul style={{ display: "flex", flexDirection: "column" as const, gap: 6, fontSize: 12.5, color: "rgba(245,240,232,.65)" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> Validasi form multi-step pembuatan event
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> Verifikasi hak akses Role-Based (RBAC)
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 style={{ width: 13, height: 13, color: "var(--ac-hex-1)" }} /> Pelaporan dan verifikasi isu integrasi API via Plane
                    </li>
                  </ul>
                  <Link
                    href="/projects"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--ac-hex-1)", textDecoration: "none", marginTop: 14 }}
                  >
                    Detail Studi Kasus QA <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Project 3: Payment Gateway MVP Preview Banner */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={vScale}
              style={{
                marginTop: 18,
                padding: "18px 22px",
                borderRadius: 14,
                background: "rgba(255,255,255,.02)",
                border: "1px dashed rgba(var(--ac-1),.20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap" as const,
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ padding: 8, borderRadius: 8, background: "rgba(var(--ac-1),.08)", color: "var(--ac-hex-1)" }}>
                  <Lock style={{ width: 16, height: 16 }} />
                </div>
                <div>
                  <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "rgba(245,240,232,.88)" }}>Payment Gateway MVP</h4>
                  <p style={{ fontSize: 12.5, color: "rgba(245,240,232,.42)" }}>
                    Pengujian integrasi sistem pembayaran otomatis internal — verifikasi status callback, boundary nominal, dan penanganan kegagalan transaksi.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,.05)", color: "rgba(245,240,232,.60)", whiteSpace: "nowrap" as const }}>
                  Internal MVP
                </span>
                <Link
                  href="/projects"
                  style={{ fontSize: 12, fontWeight: 700, color: "var(--ac-text2)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
                >
                  Detail MVP <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 05 — EDUCATION & CERTIFICATIONS (EDITORIAL CV / ARCHIVE) */}
        <section id="education" style={{ ...SEC }}>
          <div style={W}>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} style={{ marginBottom: 40 }}>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Curriculum Vitae</span>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em" }}>
                Education &amp; <span className="grad-orange">Certifications.</span>
              </h2>
            </motion.div>

            <div className="edu-cert-editorial-grid">
              {/* Left Column: Education Timeline */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v}>
                <h3 className="archive-subheading">Education</h3>
                <div className="edu-timeline">
                  {edu.map((e, i) => (
                    <div key={i} className="edu-timeline-item">
                      <div className="edu-timeline-node" />
                      <div className="edu-timeline-date">{e.yr}</div>
                      <h4 className="edu-timeline-institution">
                        <a href={e.href} target="_blank" rel="noopener noreferrer">
                          {e.school}
                        </a>
                      </h4>
                      <p className="edu-timeline-degree">{e.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Certifications Archive List */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v}>
                <h3 className="archive-subheading">Certifications</h3>
                <div className="cert-archive-list">
                  {certs.map((c, i) => (
                    <div
                      key={i}
                      className={`cert-archive-row ${c.isQA ? "cert-qa-emphasis" : ""}`}
                    >
                      <div className="cert-info">
                        <span className="cert-title">{c.t}</span>
                        {c.i && <span className="cert-issuer">{c.i}</span>}
                      </div>
                      <div className="cert-meta">
                        <span className="cert-year">{c.d}</span>
                        <a
                          href={c.f}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-action-link"
                          title={`Lihat Sertifikat ${c.t}`}
                        >
                          <span>Lihat Sertifikat</span>
                          <ArrowUpRight style={{ width: 12, height: 12 }} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 06 — CREATOR WORK / CONTENT (METRICS + CAMPAIGN CARDS) */}
        <section id="creator" style={{ ...SEC }}>
          <div style={W}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP}
              variants={v}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" as const, gap: 16, marginBottom: 32 }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: 12 }}>Kreator Konten</span>
                <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em" }}>
                  Digital Content &amp; <span className="grad-orange">Reach.</span>
                </h2>
                <p style={{ fontSize: 14, color: "rgba(245,240,232,.45)", marginTop: 6, maxWidth: 520 }}>
                  Sebagai anggota resmi Honor of Kings Creator Camp, memadukan riset audiens dan produksi video terkurasi.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Link href="/creator" className="btn btn-ghost btn-sm">
                  Lihat Portfolio Creator <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
                <a
                  href="https://www.tiktok.com/@scarawanderr"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm"
                  style={{ background: "rgba(var(--ac-1),.15)", border: "1px solid rgba(var(--ac-1),.30)", color: "var(--ac-text)" }}
                >
                  TikTok <ExternalLink style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </motion.div>

            {/* Proof Points Bar: 4 Clean Metrics */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="creator-stats-bar">
              {[
                { label: "Total Video Views", val: "3.8M+", sub: "Akumulasi Tayangan" },
                { label: "Total Likes", val: "245K+", sub: "Interaksi Penonton" },
                { label: "Followers", val: "2.1K", sub: "Komunitas Gaming" },
                { label: "Official Videos", val: "50+", sub: "Kontrak Kampanye HoK" },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(245,240,232,.35)", letterSpacing: ".12em", textTransform: "uppercase" as const, marginBottom: 4 }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900, color: "rgba(245,240,232,.95)", letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 4 }}>
                    {stat.val}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--ac-hex-1)", fontWeight: 500 }}>{stat.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* Top Performing Campaigns: Cards */}
            <div className="grid-3col">
              {campaigns.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial="hidden"
                  whileInView="show"
                  viewport={VP}
                  variants={vScale}
                  className="g-card"
                  style={{ padding: "18px 20px", display: "flex", flexDirection: "column" as const, textDecoration: "none" }}
                >
                  <div className="top-bar" />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: "rgba(var(--ac-1),.10)", color: "var(--ac-text2)", border: "1px solid rgba(var(--ac-1),.22)" }}>
                      {c.tag}
                    </span>
                    <ExternalLink style={{ width: 13, height: 13, color: "rgba(245,240,232,.35)" }} />
                  </div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 800, color: "rgba(245,240,232,.88)", marginBottom: 12, flex: 1, lineHeight: 1.4 }}>
                    {c.title}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--ac-text2)" }}>
                    <PlayCircle style={{ width: 14, height: 14, color: "var(--ac-hex-1)" }} />
                    <span>{c.views} Views</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 07 — A FEW THINGS ABOUT ME (TWO COMPACT CARDS: DUOLINGO & MONKEYTYPE) */}
        <section id="personal" style={{ ...SEC, paddingBottom: 72 }}>
          <div style={W}>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} style={{ marginBottom: 28 }}>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Di Luar Pekerjaan</span>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(26px,3.5vw,38px)", letterSpacing: "-.03em" }}>
                A Few Things <span className="grad-orange">About Me.</span>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(245,240,232,.45)", marginTop: 6, maxWidth: 520 }}>
                Detail kecil seputar ritme harian — konsistensi belajar bahasa dan kecepatan mengetik yang saya rawat di sela-sela waktu.
              </p>
            </motion.div>

            {/* Combined 2-Column Compact Layout with Deterministic Number Formatting */}
            <div className="personal-duo-mt-grid">
              {/* DUOLINGO CARD */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="g-card" style={{ padding: "24px 22px" }}>
                <div className="top-bar" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ padding: 7, borderRadius: 8, background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-hex-1)" }}>
                      <Globe style={{ width: 15, height: 15 }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "rgba(245,240,232,.90)" }}>Duolingo</h4>
                      <p style={{ fontSize: 11, color: "rgba(245,240,232,.40)" }}>Konsistensi Bahasa</p>
                    </div>
                  </div>
                  <a
                    href="https://www.duolingo.com/profile/AprillioBi"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 11, fontWeight: 700, color: "var(--ac-text2)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Profil <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 30, fontWeight: 900, color: "var(--ac-hex-1)", letterSpacing: "-.04em", lineHeight: 1 }}>
                    {duoLoading ? "114" : duo?.streak ?? 114}
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(245,240,232,.45)", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
                    Hari Beruntun
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
                  {(duo?.courses ?? [
                    { title: "English", xp: 5277, language: "en" },
                    { title: "Korean", xp: 4037, language: "ko" },
                    { title: "Chinese", xp: 144, language: "zh-cn" },
                  ]).map((c, i) => {
                    const cc = countryCode[c.language.toLowerCase()] ?? "un";
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "7px 11px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,.025)",
                          border: "1px solid rgba(255,255,255,.05)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Image
                            src={`https://flagcdn.com/20x15/${cc}.png`}
                            width={20}
                            height={15}
                            alt={c.title}
                            style={{ borderRadius: 2, objectFit: "cover" }}
                            unoptimized
                          />
                          <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(245,240,232,.80)" }}>{c.title}</span>
                        </div>
                        <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--ac-text2)" }}>
                          {formatNumber(c.xp)} XP
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* MONKEYTYPE CARD */}
              <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="g-card" style={{ padding: "24px 22px" }}>
                <div className="top-bar" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ padding: 7, borderRadius: 8, background: "rgba(var(--ac-1),.12)", border: "1px solid rgba(var(--ac-1),.25)", color: "var(--ac-hex-1)" }}>
                      <Keyboard style={{ width: 15, height: 15 }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "rgba(245,240,232,.90)" }}>MonkeyType</h4>
                      <p style={{ fontSize: 11, color: "rgba(245,240,232,.40)" }}>Kecepatan Mengetik</p>
                    </div>
                  </div>
                  <a
                    href="https://monkeytype.com/profile/Aprillio"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 11, fontWeight: 700, color: "var(--ac-text2)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                  >
                    Profil <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                  <span className="grad-orange" style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-.04em", lineHeight: 1 }}>
                    {mtLoading ? "121" : stats.bestWpm}
                  </span>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(245,240,232,.45)", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
                    Best WPM
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)" }}>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,.35)", fontWeight: 600 }}>Akurasi Terbaik</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(245,240,232,.90)", marginTop: 2 }}>
                      {mtLoading ? "97%" : `${stats.bestAcc}%`}
                    </p>
                  </div>
                  <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)" }}>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,.35)", fontWeight: 600 }}>Kecepatan Rata-rata</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(245,240,232,.90)", marginTop: 2 }}>
                      {mtLoading ? "94" : stats.avgWpm} WPM
                    </p>
                  </div>
                  <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)" }}>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,.35)", fontWeight: 600 }}>Tes Selesai</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(245,240,232,.90)", marginTop: 2 }}>
                      {mtLoading ? "669" : formatNumber(stats.completedTests)}
                    </p>
                  </div>
                  <div style={{ padding: "7px 11px", borderRadius: 8, background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)" }}>
                    <p style={{ fontSize: 10, color: "rgba(245,240,232,.35)", fontWeight: 600 }}>Waktu Latihan</p>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "rgba(245,240,232,.90)", marginTop: 2 }}>
                      {mtLoading ? "9h 52m" : stats.timeTyping}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <hr className="silk-divider" />

        {/* 08 — CONTACT (TWO-COLUMN OPEN LAYOUT) */}
        <section id="contact" style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              width: 480,
              height: 480,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(var(--ac-1),.12) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={s}
            style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 10 }}
          >
            {/* Section Header */}
            <motion.div variants={v} style={{ marginBottom: 36 }}>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Kontak</span>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", letterSpacing: "-.03em", lineHeight: 1.1, marginBottom: 10 }}>
                Mari <span className="grad-orange">Terhubung.</span>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(245,240,232,.45)", maxWidth: 500, lineHeight: 1.6 }}>
                Terbuka untuk diskusi proyek pengujian QA, kolaborasi konten, atau sekadar bertukar pikiran seputar industri tech.
              </p>
            </motion.div>

            {/* 2-Column Contact */}
            <div className="contact-grid">
              {/* Left Column: Social Links & Direct Email */}
              <motion.div variants={v} style={{ display: "flex", flexDirection: "column" as const }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "rgba(245,240,232,.92)", marginBottom: 4 }}>Platform Komunikasi</h3>
                <p style={{ fontSize: 12.5, color: "rgba(245,240,232,.40)", marginBottom: 18 }}>Temukan saya di jejaring profesional &amp; kreatif berikut.</p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {[
                    {
                      href: "https://linkedin.com/in/aprilliobintang",
                      l: "LinkedIn",
                      sub: "/in/aprilliobintang",
                      icon: (
                        <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                      color: "#0A66C2",
                      bg: "rgba(10,102,194,.15)",
                    },
                    {
                      href: "https://github.com/aprilliobintang455-boop",
                      l: "GitHub",
                      sub: "@aprilliobintang455-boop",
                      icon: (
                        <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                      color: "#ffffff",
                      bg: "rgba(255,255,255,.08)",
                    },
                    {
                      href: "https://www.tiktok.com/@scarawanderr",
                      l: "TikTok",
                      sub: "@scarawanderr",
                      icon: (
                        <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      ),
                      color: "#ffffff",
                      bg: "rgba(255,255,255,.08)",
                    },
                    {
                      href: "https://www.instagram.com/aprillio.bintang/",
                      l: "Instagram",
                      sub: "@aprillio.bintang",
                      icon: (
                        <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                      ),
                      color: "#E1306C",
                      bg: "rgba(225,48,108,.15)",
                    },
                  ].map(({ href, l, color, bg, icon }) => (
                    <a
                      key={l}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 14px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,.02)",
                        border: "1px solid rgba(255,255,255,.05)",
                        textDecoration: "none",
                        transition: "all .2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color,
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(245,240,232,.85)" }}>{l}</span>
                    </a>
                  ))}
                </div>

                {/* Email Direct */}
                <div
                  style={{
                    marginTop: 14,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "rgba(var(--ac-1),.06)",
                    border: "1px solid rgba(var(--ac-1),.16)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "rgba(var(--ac-1),.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--ac-hex-1)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail style={{ width: 14, height: 14 }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "rgba(245,240,232,.45)", marginBottom: 1 }}>Email Langsung</p>
                    <p style={{ fontSize: 12.5, color: "var(--ac-hex-1)", fontFamily: "monospace", fontWeight: 700 }}>
                      aprilliobintang455@gmail.com
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form */}
              <motion.div variants={v}>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "rgba(245,240,232,.92)", marginBottom: 4 }}>Kirim Pesan</h3>
                <p style={{ fontSize: 12.5, color: "rgba(245,240,232,.40)", marginBottom: 18 }}>Sampaikan ide kolaborasi atau pertanyaan Anda.</p>
                <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                  <div className="contact-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "rgba(245,240,232,.50)", marginBottom: 5 }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="email@anda.com"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 10,
                          background: "rgba(255,255,255,.04)",
                          border: "1px solid rgba(255,255,255,.08)",
                          color: "rgba(245,240,232,.90)",
                          fontSize: 13,
                          outline: "none",
                          fontFamily: "inherit",
                          boxSizing: "border-box" as const,
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "rgba(245,240,232,.50)", marginBottom: 5 }}>Nama</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Nama Anda"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 10,
                          background: "rgba(255,255,255,.04)",
                          border: "1px solid rgba(255,255,255,.08)",
                          color: "rgba(245,240,232,.90)",
                          fontSize: 13,
                          outline: "none",
                          fontFamily: "inherit",
                          boxSizing: "border-box" as const,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "rgba(245,240,232,.50)", marginBottom: 5 }}>Pesan</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Ceritakan detail proyek atau kebutuhan Anda…"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.08)",
                        color: "rgba(245,240,232,.90)",
                        fontSize: 13,
                        outline: "none",
                        fontFamily: "inherit",
                        resize: "vertical" as const,
                        lineHeight: 1.6,
                        boxSizing: "border-box" as const,
                      }}
                    />
                  </div>

                  <Turnstile
                    siteKey="0x4AAAAAADq_B4aMz84j6QmW"
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                    options={{ theme: "dark", size: "flexible" }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={contactSending || contactSent || !turnstileToken}
                    style={{
                      justifyContent: "center",
                      opacity: contactSending || contactSent || !turnstileToken ? 0.55 : 1,
                      cursor: contactSending || contactSent || !turnstileToken ? "not-allowed" : "pointer",
                    }}
                  >
                    {contactSent ? (
                      <>
                        <CheckCircle2 style={{ width: 16, height: 16 }} /> Pesan Terkirim!
                      </>
                    ) : contactSending ? (
                      <>
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            border: "2px solid rgba(255,255,255,.3)",
                            borderTop: "2px solid white",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 1s linear infinite",
                          }}
                        />{" "}
                        Mengirim…
                      </>
                    ) : (
                      <>
                        <Mail style={{ width: 16, height: 16 }} /> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Floating toast notifications */}
      {(contactSent || contactError) && (
        <div
          className="contact-toast"
          style={{
            position: "fixed",
            bottom: 28,
            right: 24,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column" as const,
            gap: 10,
            pointerEvents: "none",
          }}
        >
          {contactSent && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                borderRadius: 14,
                background: "rgba(10,12,18,.92)",
                border: "1px solid rgba(52,211,153,.35)",
                backdropFilter: "blur(16px)",
                minWidth: 260,
                pointerEvents: "auto",
              }}
            >
              <CheckCircle2 style={{ width: 17, height: 17, color: "#34d399" }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#34d399", marginBottom: 2 }}>Pesan Terkirim!</p>
                <p style={{ fontSize: 11.5, color: "rgba(52,211,153,.60)" }}>Saya akan segera membalas 👋</p>
              </div>
            </div>
          )}
          {contactError && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                borderRadius: 14,
                background: "rgba(10,12,18,.92)",
                border: "1px solid rgba(239,68,68,.35)",
                backdropFilter: "blur(16px)",
                minWidth: 260,
                pointerEvents: "auto",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 900, color: "#ef4444" }}>✕</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 2 }}>Gagal Mengirim</p>
                <p style={{ fontSize: 11.5, color: "rgba(239,68,68,.65)", lineHeight: 1.5, maxWidth: 220 }}>{contactError}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 09 — FOOTER */}
      <footer
        style={{
          padding: "32px 24px",
          textAlign: "center",
          borderTop: "1px solid rgba(var(--ac-1),.08)",
          background: "rgba(255,255,255,.015)",
        }}
      >
        <p style={{ fontSize: 11.5, color: "rgba(245,240,232,.30)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}