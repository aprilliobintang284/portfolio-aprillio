"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Video,
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroBento from "./components/HeroBento";

const FLAG_MAP: Record<string, { code: string; name: string }> = {
  en: { code: "us", name: "English" },
  ko: { code: "kr", name: "Korean" },
  zh: { code: "cn", name: "Chinese (Simplified)" },
  "zh-cn": { code: "cn", name: "Chinese (Simplified)" },
  zs: { code: "cn", name: "Chinese (Simplified)" },
  ja: { code: "jp", name: "Japanese" },
  es: { code: "es", name: "Spanish" },
  fr: { code: "fr", name: "French" },
  de: { code: "de", name: "German" },
};

function getFlagForCourse(c: { language?: string; title?: string }) {
  const langKey = (c.language ?? "").toLowerCase().trim();
  const titleKey = (c.title ?? "").toLowerCase().trim();
  if (FLAG_MAP[langKey]) return FLAG_MAP[langKey];
  if (langKey.includes("zh") || langKey === "zs" || titleKey.includes("chinese"))
    return { code: "cn", name: "Chinese (Simplified)" };
  if (langKey.includes("en") || titleKey.includes("english"))
    return { code: "us", name: "English" };
  if (langKey.includes("ko") || titleKey.includes("korean"))
    return { code: "kr", name: "Korean" };
  if (langKey.includes("ja") || titleKey.includes("japanese"))
    return { code: "jp", name: "Japanese" };
  if (langKey.includes("es") || titleKey.includes("spanish"))
    return { code: "es", name: "Spanish" };
  if (langKey.includes("fr") || titleKey.includes("french"))
    return { code: "fr", name: "French" };
  if (langKey.includes("de") || titleKey.includes("german"))
    return { code: "de", name: "German" };
  return null;
}

const v: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const s: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const VP = { once: true, margin: "-60px" } as const;

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
  chartData?: { label: string; wpm: number; raw: number; acc: number; consistency: number }[] | null;
};

export default function Home() {
  const [stats, setStats] = useState<MTStats>({
    bestWpm: 121,
    bestRaw: 125,
    bestAcc: 97,
    bestConsistency: 79,
    avgWpm: 94,
    completedTests: 674,
    completionPct: 21,
    timeTyping: "9h 54m",
    startedTests: 3300,
    chartData: null,
  });
  const [mtLoading, setMtLoading] = useState(true);

  const [duo, setDuo] = useState<DuoStats | null>({
    streak: 121,
    totalXp: 19021,
    activeCourses: 3,
    joinedAt: null,
    longestStreak: 121,
    courses: [
      { title: "English", xp: 11891, language: "en" },
      { title: "Korean", xp: 6822, language: "ko" },
      { title: "Chinese", xp: 308, language: "zh-cn" },
    ],
  });
  const [duoLoading, setDuoLoading] = useState(true);

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
      await emailjs.send("service_2cuy6wl", "template_dt8t5rc", {
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
        title: `Pesan dari ${contactForm.name}`,
      });
      setContactError(null);
      setContactSent(true);
      setTurnstileToken(null);
      setContactForm({ name: "", email: "", message: "" });
      setTimeout(() => setContactSent(false), 5000);
    } catch (err: unknown) {
      const raw = err as { text?: string };
      const msg = raw?.text ?? (err instanceof Error ? err.message : "Unknown error");
      setContactError(msg);
      setTimeout(() => setContactError(null), 6000);
    } finally {
      setContactSending(false);
    }
  }

  useEffect(() => {
    fetch("/api/monkeytype")
      .then((r) => r.json())
      .then((d: MTStats & { ok?: boolean }) => {
        if (d?.ok)
          setStats({
            bestWpm: d.bestWpm ?? 121,
            bestRaw: d.bestRaw ?? 125,
            bestAcc: d.bestAcc ?? 97,
            bestConsistency: d.bestConsistency ?? 79,
            avgWpm: d.avgWpm ?? 94,
            completedTests: d.completedTests ?? 674,
            completionPct: d.completionPct ?? 21,
            timeTyping: d.timeTyping ?? "9h 54m",
            startedTests: d.startedTests ?? 3300,
            chartData: d.chartData ?? null,
          });
      })
      .catch(() => {})
      .finally(() => setMtLoading(false));

    fetch("/api/duolingo")
      .then((r) => r.json())
      .then((d: DuoStats & { ok?: boolean }) => {
        if (d?.ok)
          setDuo({
            streak: d.streak,
            totalXp: d.totalXp,
            activeCourses: d.activeCourses,
            courses: d.courses ?? [],
            joinedAt: d.joinedAt ?? null,
            longestStreak: d.longestStreak ?? d.streak,
          });
      })
      .catch(() => {})
      .finally(() => setDuoLoading(false));
  }, []);

  const edu = [
    {
      yr: "Agu 2025 — Sekarang",
      title: "S1 Sistem Informasi",
      school: "Universitas Terbuka",
      href: "https://ut.ac.id",
    },
    {
      yr: "Jan 2026 — Sekarang",
      title: "S1 Manajemen",
      school: "Univ. Siber Muhammadiyah",
      href: "https://sibermu.ac.id",
    },
    {
      yr: "2022 — 2024",
      title: "Rekayasa Perangkat Lunak",
      school: "SMK Negeri 4 Kendal",
      href: "https://smkn4kendal.sch.id",
    },
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

  const duoCourses = duo?.courses ?? [
    { title: "English", xp: 11891, language: "en" },
    { title: "Korean", xp: 6822, language: "ko" },
    { title: "Chinese", xp: 308, language: "zh-cn" },
  ];
  const duoStreak = duoLoading ? 121 : duo?.streak ?? 121;
  const duoTotalXp = duoLoading ? 19021 : duo?.totalXp ?? 19021;

  const mtBestWpm = mtLoading ? 121 : stats.bestWpm;
  const mtBestRaw = mtLoading ? 125 : stats.bestRaw ?? 125;
  const mtAvgWpm = mtLoading ? 94 : stats.avgWpm;
  const mtAcc = mtLoading ? 97 : stats.bestAcc;
  const mtConsistency = stats.bestConsistency ?? 79;
  const mtTests = mtLoading ? 674 : stats.completedTests;
  const mtTime = mtLoading ? "9h 54m" : stats.timeTyping;

  // Max XP in active courses for relative progress calculation
  const maxCourseXp = Math.max(...duoCourses.map((c) => c.xp), 1);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene" />
      <Navbar />

      <main className="main-content-flow">
        {/* ═══ 1. HERO (TWO-COLUMN WITH BLENDED WORKSPACE) ═══ */}
        <HeroBento />

        {/* ═══ 2. ABOUT (TENTANG SAYA) ═══ */}
        <section id="about" className="about-section-wrap">
          <motion.div className="about-wide-container" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className="about-editorial-layout">
              {/* Left & Center Column: Content */}
              <div className="about-main-col">
                {/* Eyebrow Label with subtle horizontal line */}
                <motion.div variants={v} className="about-eyebrow-row">
                  <span className="about-eyebrow-text">TENTANG SAYA</span>
                  <span className="about-eyebrow-line" />
                </motion.div>

                {/* Main Heading */}
                <motion.h2 variants={v} className="about-heading">
                  Tentang <span style={{ color: "#2EA8E6" }}>Saya.</span>
                </motion.h2>

                {/* Personal Introduction Paragraphs */}
                <motion.div variants={v} className="about-intro-text-wrap">
                  <p className="about-intro-p">
                    Saya adalah lulusan SMK yang fokus pada quality assurance, pengujian sistem, dan memastikan produk digital bekerja dengan baik. Di sisi lain, saya juga membuat konten seputar game Honor of Kings dan scene esports-nya, mulai dari highlight, clip gameplay, hingga informasi dan update turnamen.
                  </p>
                  <p className="about-intro-p">
                    Saya percaya bahwa rasa ingin tahu, belajar secara konsisten, dan berbagi pengalaman adalah cara terbaik untuk terus berkembang dan memberi manfaat bagi orang lain.
                  </p>
                </motion.div>

                {/* Two Feature Blocks Side-by-Side */}
                <motion.div variants={v} className="about-features-row">
                  {/* Left: Quality Assurance & Testing */}
                  <div className="about-feature-item">
                    <div className="about-feature-icon-box">
                      <Code2 style={{ width: 22, height: 22, color: "#2EA8E6" }} />
                    </div>
                    <div className="about-feature-body">
                      <h3 className="about-feature-label">QUALITY ASSURANCE &amp; TESTING</h3>
                      <p className="about-feature-desc">
                        Melakukan pengujian sistem, menemukan bug, dan memastikan setiap fitur bekerja dengan baik sebelum sampai ke pengguna.
                      </p>
                    </div>
                  </div>

                  {/* Right: Konten Honor of Kings & Esports */}
                  <div className="about-feature-item">
                    <div className="about-feature-icon-box">
                      <Video style={{ width: 22, height: 22, color: "#2EA8E6" }} />
                    </div>
                    <div className="about-feature-body">
                      <h3 className="about-feature-label">KONTEN HONOR OF KINGS &amp; ESPORTS</h3>
                      <p className="about-feature-desc">
                        Membuat konten seputar Honor of Kings, seperti highlight, clip gameplay, update turnamen, dan informasi seputar scene esports.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Far Right: Separated Quote Column with Divider */}
              <motion.div variants={v} className="about-quote-col">
                <div className="about-quote-content">
                  <blockquote className="about-quote-text">
                    &ldquo;Curious about how things work, and how to make them better.&rdquo;
                  </blockquote>
                  <div className="about-quote-accent-bar" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 3. EXPERIENCE (PENGALAMAN) ═══ */}
        <section id="experience" className="ref-doc-section">
          <motion.div className="ref-container-920" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.h2 variants={v} className="ref-section-heading">
              Pengalaman
            </motion.h2>

            <div className="ref-timeline-track">
              {/* Role 1 */}
              <motion.div variants={v} className="ref-timeline-item">
                <div className="ref-timeline-left">
                  <span className="ref-timeline-date">Jun 2025 — Sekarang</span>
                </div>
                <div className="ref-timeline-middle">
                  <span className="ref-timeline-dot is-active" />
                  <div className="ref-timeline-line" />
                </div>
                <div className="ref-timeline-right">
                  <h3 className="ref-role-title">Quality Assurance Specialist</h3>
                  <p className="ref-company-name">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                  <ul className="ref-timeline-bullets">
                    <li>· End-to-end testing menyeluruh untuk platform tiket Tenar (Buyer &amp; Organizer) Phase 2–4 serta Payment Gateway MVP.</li>
                    <li>· Menyusun puluhan test case fungsional, memvalidasi alur checkout tiket dan integrasi form event.</li>
                    <li>· Mencatat dan mengelola status pelaporan bug secara berkala di Plane, berkoordinasi langsung dengan developer.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Role 2 */}
              <motion.div variants={v} className="ref-timeline-item">
                <div className="ref-timeline-left">
                  <span className="ref-timeline-date">2025 — Sekarang</span>
                </div>
                <div className="ref-timeline-middle">
                  <span className="ref-timeline-dot is-active" />
                  <div className="ref-timeline-line" />
                </div>
                <div className="ref-timeline-right">
                  <h3 className="ref-role-title">Freelance Gaming Content Creator</h3>
                  <p className="ref-company-name">Honor of Kings (Tencent / TikTok) · Remote</p>
                  <ul className="ref-timeline-bullets">
                    <li>· Menyelesaikan konten &amp; 50+ video promosi resmi kampanye TikTok untuk game Honor of Kings.</li>
                    <li>· Anggota aktif HoK Creator Camp dengan akumulasi penayangan jutaan penonton.</li>
                    <li>· Menjalankan seluruh siklus produksi: perekaman gameplay, narasi, editing, sound design, dan pacing video.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Role 3 */}
              <motion.div variants={v} className="ref-timeline-item">
                <div className="ref-timeline-left">
                  <span className="ref-timeline-date">Agu 2024 — Jun 2025</span>
                </div>
                <div className="ref-timeline-middle">
                  <span className="ref-timeline-dot is-muted" />
                </div>
                <div className="ref-timeline-right">
                  <h3 className="ref-role-title">Internship Monitoring Server</h3>
                  <p className="ref-company-name">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                  <ul className="ref-timeline-bullets">
                    <li>· Pemantauan operasional server produksi secara berkala untuk menjaga uptime dan stabilitas sistem.</li>
                    <li>· Menganalisis error transaksi dan mendokumentasikan kendala operasional ke laporan teknis.</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 4. EDUCATION & CERTIFICATIONS (PENDIDIKAN & SERTIFIKASI) ═══ */}
        <section id="education" className="ref-doc-section">
          <motion.div className="ref-container-920" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className="edu-cert-two-col">
              {/* Left Column: Pendidikan */}
              <motion.div variants={v} className="edu-col">
                <h2 className="ref-section-heading" style={{ marginBottom: 24 }}>
                  Pendidikan
                </h2>
                <div className="edu-timeline-list">
                  {edu.map((e, i) => (
                    <div key={i} className="edu-timeline-row">
                      <div className="edu-dot-wrap">
                        <span className="edu-node-dot" />
                        {i < edu.length - 1 && <div className="edu-node-line" />}
                      </div>
                      <div className="edu-content">
                        <p className="edu-date-text">{e.yr}</p>
                        <h4 className="edu-school-name">
                          <a href={e.href} target="_blank" rel="noopener noreferrer">
                            {e.school}
                          </a>
                        </h4>
                        <p className="edu-degree-text">{e.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Sertifikasi */}
              <motion.div variants={v} className="cert-col">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                  <h2 className="ref-section-heading" style={{ marginBottom: 0 }}>
                    Sertifikasi
                  </h2>
                  <span className="cert-all-link">
                    Lihat Semua <ArrowUpRight style={{ width: 12, height: 12 }} />
                  </span>
                </div>

                <div className="cert-list-stack">
                  {certs.map((c, i) => (
                    <div key={i} className="cert-row-item">
                      <div className="cert-row-info">
                        <span className="cert-title-text">{c.t}</span>
                        {c.i && <span className="cert-issuer-text">{c.i}</span>}
                      </div>
                      <div className="cert-row-actions">
                        <span className="cert-date-text">{c.d}</span>
                        <a
                          href={c.f}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-view-btn"
                          title={`Lihat Sertifikat ${c.t}`}
                        >
                          Lihat <ArrowUpRight style={{ width: 12, height: 12 }} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 5. PERSONAL (DUOLINGO & MONKEYTYPE) ═══ */}
        <section id="personal" className="ref-doc-section">
          <motion.div className="ref-container-920" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.h2 variants={v} className="ref-section-heading">
              Personal
            </motion.h2>

            <div className="personal-modules-side-by-side">
              {/* ── Duolingo Module ── */}
              <motion.div variants={v} className="personal-card-box">
                <div className="personal-card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="duo-icon-box" style={{ background: "rgba(88, 204, 2, 0.15)", border: "1px solid rgba(88, 204, 2, 0.3)" }}>
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="#58CC02">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm5 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                      </svg>
                    </div>
                    <span className="personal-brand-name">Duolingo</span>
                  </div>
                  <a
                    href="https://www.duolingo.com/profile/AprillioBi"
                    target="_blank"
                    rel="noreferrer"
                    className="personal-profile-link"
                  >
                    Lihat Profil <ArrowUpRight style={{ width: 12, height: 12 }} />
                  </a>
                </div>

                {/* Top highlight stats */}
                <div className="personal-top-stat-row">
                  <div className="personal-stat-col">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>🔥</span>
                      <span className="personal-stat-num">{duoStreak}</span>
                    </div>
                    <span className="personal-stat-label">Day Streak</span>
                  </div>

                  <div className="personal-stat-col">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>🏆</span>
                      <span className="personal-stat-num">{formatNumber(duoTotalXp)}</span>
                    </div>
                    <span className="personal-stat-label">Total XP</span>
                  </div>
                </div>

                {/* Language Rows with Progress Bars */}
                <div className="duo-language-rows">
                  {duoCourses.map((c, i) => {
                    const flag = getFlagForCourse(c);
                    const pct = Math.min(100, Math.max(12, Math.round((c.xp / maxCourseXp) * 100)));

                    return (
                      <div key={i} className="duo-lang-row">
                        <div style={{ display: "flex", alignItems: "center", gap: 8, width: 140, flexShrink: 0 }}>
                          {flag && (
                            <Image
                              src={`https://flagcdn.com/w40/${flag.code}.png`}
                              alt={flag.name}
                              width={20}
                              height={14}
                              style={{ borderRadius: 2, flexShrink: 0, objectFit: "cover" }}
                              unoptimized
                            />
                          )}
                          <span className="duo-lang-name">{flag?.name ?? c.title}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="duo-progress-track">
                          <div className="duo-progress-fill" style={{ width: `${pct}%` }} />
                        </div>

                        <span className="duo-xp-badge">{formatNumber(c.xp)} XP</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── MonkeyType Module ── */}
              <motion.div variants={v} className="personal-card-box">
                <div className="personal-card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="monkey-icon-box" style={{ background: "rgba(226, 183, 20, 0.15)", border: "1px solid rgba(226, 183, 20, 0.3)" }}>
                      <svg viewBox="0 0 24 24" width={15} height={15} fill="#E2B714">
                        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
                      </svg>
                    </div>
                    <span className="personal-brand-name">MonkeyType</span>
                  </div>
                  <a
                    href="https://monkeytype.com/profile/Aprillio"
                    target="_blank"
                    rel="noreferrer"
                    className="personal-profile-link"
                  >
                    Lihat Profil <ArrowUpRight style={{ width: 12, height: 12 }} />
                  </a>
                </div>

                {/* Top highlight stats */}
                <div className="personal-top-stat-row">
                  <div className="personal-stat-col">
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span className="personal-stat-num">{mtBestWpm}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>Best WPM</span>
                    </div>
                    <span className="personal-stat-label">Avg: {mtAvgWpm} WPM</span>
                  </div>
                </div>

                {/* 2x2 Stats Grid */}
                <div className="monkey-stats-grid">
                  <div className="monkey-stat-box">
                    <div className="monkey-stat-head">
                      <span>🎯</span>
                      <span className="monkey-stat-value">{mtAcc}%</span>
                    </div>
                    <p className="monkey-stat-caption">Accuracy</p>
                    <p className="monkey-stat-sub">Consistency: {mtConsistency}%</p>
                  </div>

                  <div className="monkey-stat-box">
                    <div className="monkey-stat-head">
                      <span>✨</span>
                      <span className="monkey-stat-value">{formatNumber(mtTests)}</span>
                    </div>
                    <p className="monkey-stat-caption">Tests Completed</p>
                    <p className="monkey-stat-sub">21% completion</p>
                  </div>

                  <div className="monkey-stat-box">
                    <div className="monkey-stat-head">
                      <span>⏱️</span>
                      <span className="monkey-stat-value">{mtTime}</span>
                    </div>
                    <p className="monkey-stat-caption">Time Typing</p>
                    <p className="monkey-stat-sub">3.3k started</p>
                  </div>

                  <div className="monkey-stat-box">
                    <div className="monkey-stat-head">
                      <span>⚡</span>
                      <span className="monkey-stat-value">125</span>
                    </div>
                    <p className="monkey-stat-caption">Best Raw WPM</p>
                    <p className="monkey-stat-sub">Typing speed</p>
                  </div>
                </div>

                {/* MonkeyType Trend Line Visualization matching reference blueprint */}
                <div className="monkey-chart-section">
                  <div className="monkey-chart-header">
                    <span className="monkey-chart-title">Recent WPM [Last 10 Tests]</span>
                    <span className="monkey-chart-best-raw">{mtBestRaw} Best Raw WPM</span>
                  </div>
                  <div className="monkey-chart-body">
                    {/* SVG Line Chart */}
                    <div className="monkey-chart-y-axis">
                      <span>140</span>
                      <span>105</span>
                      <span>70</span>
                      <span>35</span>
                    </div>
                    <div className="monkey-chart-svg-wrap">
                      <svg viewBox="0 0 320 48" className="monkey-chart-svg" preserveAspectRatio="none">
                        <line x1="0" y1="4" x2="320" y2="4" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="0" y1="18" x2="320" y2="18" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="0" y1="32" x2="320" y2="32" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="0" y1="46" x2="320" y2="46" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        {(() => {
                          const points = [88, 94, 91, 98, 93, 101, 96, 104, 98, 108];
                          const coords = points.map((p, i) => {
                            const x = (i / (points.length - 1)) * 308 + 6;
                            const y = 46 - ((p - 35) / (140 - 35)) * 40 - 2;
                            return { x, y, p };
                          });
                          const pathStr = coords.reduce((acc, pt, idx) => idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`, "");
                          return (
                            <>
                              <path d={pathStr} fill="none" stroke="var(--accent)" strokeWidth="1.8" />
                              {coords.map((pt, idx) => (
                                <circle
                                  key={idx}
                                  cx={pt.x}
                                  cy={pt.y}
                                  r={idx === coords.length - 1 ? 3.5 : 2.5}
                                  fill={idx === coords.length - 1 ? "var(--accent)" : "#141413"}
                                  stroke="var(--accent)"
                                  strokeWidth="1.5"
                                />
                              ))}
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 6. CONTACT (KONTAK) — FINAL SECTION (NO FOOTER AFTER THIS) ═══ */}
        <section id="contact" className="ref-doc-section" style={{ paddingBottom: 80 }}>
          <motion.div className="ref-container-920" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className="contact-reference-grid">
              {/* Left Column: Info & Socials */}
              <motion.div variants={v} className="contact-left-col">
                <h2 className="ref-section-heading">Kontak</h2>
                <p className="contact-desc-text">
                  Terbuka untuk diskusi proyek pengujian QA, kolaborasi konten, atau sekadar bertukar pikiran seputar industri tech.
                </p>

                <h3 className="contact-subtitle">Platform Komunikasi</h3>
                <div className="contact-socials-list">
                  {[
                    {
                      href: "https://linkedin.com/in/aprilliobintang",
                      l: "LinkedIn",
                      icon: (
                        <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://github.com/aprilliobintang284",
                      l: "GitHub",
                      icon: (
                        <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.tiktok.com/@scarawanderr",
                      l: "TikTok",
                      icon: (
                        <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.instagram.com/aprillio.bintang/",
                      l: "Instagram",
                      icon: (
                        <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                      ),
                    },
                  ].map(({ href, l, icon }) => (
                    <a
                      key={l}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-btn"
                    >
                      <span className="contact-social-icon">{icon}</span>
                      <span className="contact-social-label">{l}</span>
                    </a>
                  ))}
                </div>

                <div
                  className="contact-direct-email-row"
                  onClick={() => {
                    navigator.clipboard?.writeText("aprilliobintang284@gmail.com");
                    alert("Email disalin: aprilliobintang284@gmail.com");
                  }}
                  title="Klik untuk menyalin email"
                >
                  <Mail style={{ width: 14, height: 14, color: "var(--accent)" }} />
                  <span className="contact-email-text">aprilliobintang284@gmail.com</span>
                </div>
              </motion.div>

              {/* Middle Column: Form */}
              <motion.div variants={v} className="contact-right-col">
                <h3 className="contact-subtitle">Kirim Pesan</h3>
                <form onSubmit={handleContactSubmit} className="contact-form-box">
                  <div className="contact-form-inputs-row">
                    <input
                      type="text"
                      name="name"
                      required
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Nama Anda"
                      className="contact-input-field"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="email@anda.com"
                      className="contact-input-field"
                    />
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Ceritakan kebutuhan Anda..."
                    className="contact-textarea-field"
                  />
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
                      width: "100%",
                      justifyContent: "center",
                      opacity: contactSending || contactSent || !turnstileToken ? 0.55 : 1,
                      cursor: contactSending || contactSent || !turnstileToken ? "not-allowed" : "pointer",
                    }}
                  >
                    {contactSent ? (
                      <>
                        <CheckCircle2 style={{ width: 15, height: 15 }} /> Terkirim!
                      </>
                    ) : contactSending ? (
                      <>Mengirim…</>
                    ) : (
                      <>
                        <Mail style={{ width: 15, height: 15 }} /> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Right Column: Editorial Quote */}
              <div className="contact-quote-col">
                <p className="contact-quote-text">
                  &ldquo;Let&apos;s build something better together.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Toast Notification */}
      {(contactSent || contactError) && (
        <div
          className="contact-toast"
          style={{
            position: "fixed",
            bottom: 24,
            right: 20,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            pointerEvents: "none",
          }}
        >
          {contactSent && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--surface-elevated)",
                border: "1px solid rgba(73,168,120,.40)",
                minWidth: 240,
                pointerEvents: "auto",
                boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              }}
            >
              <CheckCircle2 style={{ width: 15, height: 15, color: "var(--success)" }} />
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--success)", marginBottom: 1 }}>
                  Pesan Terkirim!
                </p>
                <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Saya akan segera membalas 👋</p>
              </div>
            </div>
          )}
          {contactError && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--surface-elevated)",
                border: "1px solid rgba(239,68,68,.40)",
                minWidth: 240,
                pointerEvents: "auto",
                boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 900, color: "#ef4444" }}>✕</span>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "#ef4444", marginBottom: 1 }}>
                  Gagal Mengirim
                </p>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: 200 }}>
                  {contactError}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}