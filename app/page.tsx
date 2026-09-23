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
  Flame,
  User,
  MessageSquare,
  Send,
  ArrowRight,
  Briefcase,
  Users,
  Sparkles,
  GraduationCap,
  ArrowUp,
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroBento from "./components/HeroBento";
import styles from "./page.module.css";

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

      <main className={styles["main-content-flow"]}>
        {/* ═══ 1. HERO (TWO-COLUMN WITH BLENDED WORKSPACE) ═══ */}
        <HeroBento />

        {/* ═══ 2. ABOUT (TENTANG SAYA) ═══ */}
        <section id="about" className={styles["about-section-wrap"]}>
          <motion.div className={styles["about-wide-container"]} initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className={styles["about-editorial-layout"]}>
              {/* Left & Center Column: Content */}
              <div className={styles["about-main-col"]}>
                {/* Main Heading */}
                <motion.h2 variants={v} className={styles["about-heading"]}>
                  Tentang <span style={{ color: "#2EA8E6" }}>Saya.</span>
                </motion.h2>

                {/* Personal Introduction Paragraphs */}
                <motion.div variants={v} className={styles["about-intro-text-wrap"]}>
                  <p className={styles["about-intro-p"]}>
                    <span className="copy-desktop">
                      Saya adalah lulusan SMK yang fokus pada quality assurance, pengujian sistem, dan memastikan produk digital bekerja dengan baik. Di sisi lain, saya juga membuat konten seputar game Honor of Kings dan scene esports-nya, mulai dari highlight, clip gameplay, hingga informasi dan update turnamen.
                    </span>
                    <span className="copy-mobile">
                      Lulusan SMK yang fokus pada quality assurance dan pengujian sistem. Di luar itu, aktif membuat konten Honor of Kings dan esports.
                    </span>
                  </p>
                  <p className={styles["about-intro-p"]}>
                    <span className="copy-desktop">
                      Saya percaya bahwa rasa ingin tahu, belajar secara konsisten, dan berbagi pengalaman adalah cara terbaik untuk terus berkembang dan memberi manfaat bagi orang lain.
                    </span>
                    <span className="copy-mobile">
                      Suka belajar, mencoba hal baru, dan terus mencari cara untuk membuat sesuatu menjadi lebih baik.
                    </span>
                  </p>
                </motion.div>

                {/* Two Feature Blocks Side-by-Side */}
                <motion.div variants={v} className={styles["about-features-row"]}>
                  {/* Left: Quality Assurance & Testing */}
                  <div className={styles["about-feature-item"]}>
                    <div className={styles["about-feature-icon-box"]}>
                      <Code2 style={{ width: 22, height: 22, color: "#2EA8E6" }} />
                    </div>
                    <div className={styles["about-feature-body"]}>
                      <h3 className={styles["about-feature-label"]}>QUALITY ASSURANCE &amp; TESTING</h3>
                      <p className={styles["about-feature-desc"]}>
                        <span className="copy-desktop">
                          Melakukan pengujian sistem, menemukan bug, dan memastikan setiap fitur bekerja dengan baik sebelum sampai ke pengguna.
                        </span>
                        <span className="copy-mobile">
                          Pengujian sistem, mencari bug, dan memastikan fitur bekerja dengan baik.
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Konten Honor of Kings & Esports */}
                  <div className={styles["about-feature-item"]}>
                    <div className={styles["about-feature-icon-box"]}>
                      <Video style={{ width: 22, height: 22, color: "#2EA8E6" }} />
                    </div>
                    <div className={styles["about-feature-body"]}>
                      <h3 className={styles["about-feature-label"]}>KONTEN HONOR OF KINGS &amp; ESPORTS</h3>
                      <p className={styles["about-feature-desc"]}>
                        <span className="copy-desktop">
                          Membuat konten seputar Honor of Kings, seperti highlight, clip gameplay, update turnamen, dan informasi seputar scene esports.
                        </span>
                        <span className="copy-mobile">
                          Membuat highlight, clip gameplay, dan konten seputar esports.
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Far Right: Separated Quote Column with Divider */}
              <motion.div variants={v} className={styles["about-quote-col"]}>
                <div className={styles["about-quote-content"]}>
                  <blockquote className={styles["about-quote-text"]}>
                    &ldquo;Curious about how things work, and how to make them better.&rdquo;
                  </blockquote>
                  <div className={styles["about-quote-accent-bar"]} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 3. EXPERIENCE (PENGALAMAN) ═══ */}
        <section id="experience" className={styles["ref-doc-section"]}>
          <motion.div className={styles["ref-container-920"]} initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.h2 variants={v} className={styles["ref-section-heading"]}>
              Pengalaman
            </motion.h2>

            <div className={styles["ref-timeline-track"]}>
              {/* Role 1 */}
              <motion.div variants={v} className={styles["ref-timeline-item"]}>
                <div className={styles["ref-timeline-left"]}>
                  <span className={styles["ref-timeline-date"]}>Jun 2025 — Sekarang</span>
                </div>
                <div className={styles["ref-timeline-middle"]}>
                  <span className={`${styles["ref-timeline-dot"]} ${styles["is-active"]}`} />
                  <div className={styles["ref-timeline-line"]} />
                </div>
                <div>
                  <h3 className={styles["ref-role-title"]}>Quality Assurance Specialist</h3>
                  <p className={styles["ref-company-name"]}>PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                  <ul className={styles["ref-timeline-bullets"]}>
                    <li>
                      <span className="copy-desktop">· End-to-end testing menyeluruh untuk platform tiket Tenar (Buyer &amp; Organizer) Phase 2–4 serta Payment Gateway MVP.</span>
                      <span className="copy-mobile">· End-to-end testing platform Tenar (Buyer &amp; Organizer) dan Payment Gateway MVP.</span>
                    </li>
                    <li>
                      <span className="copy-desktop">· Menyusun puluhan test case fungsional, memvalidasi alur checkout tiket dan integrasi form event.</span>
                      <span className="copy-mobile">· Menyusun test case fungsional, validasi checkout tiket, dan form event.</span>
                    </li>
                    <li>
                      <span className="copy-desktop">· Mencatat dan mengelola status pelaporan bug secara berkala di Plane, berkoordinasi langsung dengan developer.</span>
                      <span className="copy-mobile">· Melaporkan dan mengelola bug di Plane bersama developer.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Role 2 */}
              <motion.div variants={v} className={styles["ref-timeline-item"]}>
                <div className={styles["ref-timeline-left"]}>
                  <span className={styles["ref-timeline-date"]}>2025 — Sekarang</span>
                </div>
                <div className={styles["ref-timeline-middle"]}>
                  <span className={`${styles["ref-timeline-dot"]} ${styles["is-active"]}`} />
                  <div className={styles["ref-timeline-line"]} />
                </div>
                <div>
                  <h3 className={styles["ref-role-title"]}>Freelance Gaming Content Creator</h3>
                  <p className={styles["ref-company-name"]}>Honor of Kings (Tencent / TikTok) · Remote</p>
                  <ul className={styles["ref-timeline-bullets"]}>
                    <li>
                      <span className="copy-desktop">· Menyelesaikan konten &amp; 50+ video promosi resmi kampanye TikTok untuk game Honor of Kings.</span>
                      <span className="copy-mobile">· Memproduksi 50+ video kampanye resmi TikTok untuk Honor of Kings.</span>
                    </li>
                    <li>
                      <span className="copy-desktop">· Anggota aktif HoK Creator Camp dengan akumulasi penayangan jutaan penonton.</span>
                      <span className="copy-mobile">· Anggota HoK Creator Camp dengan jutaan akumulasi penayangan.</span>
                    </li>
                    <li>
                      <span className="copy-desktop">· Menjalankan seluruh siklus produksi: perekaman gameplay, narasi, editing, sound design, dan pacing video.</span>
                      <span className="copy-mobile">· Perekaman gameplay, narasi, editing, sound design, dan pacing video.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Role 3 */}
              <motion.div variants={v} className={styles["ref-timeline-item"]}>
                <div className={styles["ref-timeline-left"]}>
                  <span className={styles["ref-timeline-date"]}>Agu 2024 — Jun 2025</span>
                </div>
                <div className={styles["ref-timeline-middle"]}>
                  <span className={`${styles["ref-timeline-dot"]} ${styles["is-muted"]}`} />
                </div>
                <div>
                  <h3 className={styles["ref-role-title"]}>Internship Monitoring Server</h3>
                  <p className={styles["ref-company-name"]}>PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                  <ul className={styles["ref-timeline-bullets"]}>
                    <li>
                      <span className="copy-desktop">· Pemantauan operasional server produksi secara berkala untuk menjaga uptime dan stabilitas sistem.</span>
                      <span className="copy-mobile">· Monitoring server produksi untuk menjaga uptime dan stabilitas.</span>
                    </li>
                    <li>
                      <span className="copy-desktop">· Menganalisis error transaksi dan mendokumentasikan kendala operasional ke laporan teknis.</span>
                      <span className="copy-mobile">· Menganalisis error transaksi dan menyusun laporan teknis.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 4. EDUCATION & CERTIFICATIONS (PENDIDIKAN & SERTIFIKASI) ═══ */}
        <section id="education" className={styles["ref-doc-section"]}>
          <motion.div className={styles["ref-container-920"]} initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className={styles["edu-cert-two-col"]}>
              {/* Left Column: Pendidikan */}
              <motion.div variants={v}>
                <h2 className={styles["ref-section-heading"]} style={{ marginBottom: 24 }}>
                  Pendidikan
                </h2>
                <div className={styles["edu-timeline-list"]}>
                  {edu.map((e, i) => (
                    <div key={i} className={styles["edu-timeline-row"]}>
                      <div className={styles["edu-dot-wrap"]}>
                        <span className={styles["edu-node-dot"]} />
                        {i < edu.length - 1 && <div className={styles["edu-node-line"]} />}
                      </div>
                      <div>
                        <p className={styles["edu-date-text"]}>{e.yr}</p>
                        <h4 className={styles["edu-school-name"]}>
                          <a href={e.href} target="_blank" rel="noopener noreferrer">
                            {e.school}
                          </a>
                        </h4>
                        <p className={styles["edu-degree-text"]}>{e.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Sertifikasi */}
              <motion.div variants={v}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                  <h2 className={styles["ref-section-heading"]} style={{ marginBottom: 0 }}>
                    Sertifikasi
                  </h2>
                  <span className={styles["cert-all-link"]}>
                    Lihat Semua <ArrowUpRight style={{ width: 12, height: 12 }} />
                  </span>
                </div>

                <div className={styles["cert-list-stack"]}>
                  {certs.map((c, i) => (
                    <div key={i} className={styles["cert-row-item"]}>
                      <div>
                        <span className={styles["cert-title-text"]}>{c.t}</span>
                        {c.i && <span className={styles["cert-issuer-text"]}>{c.i}</span>}
                      </div>
                      <div className={styles["cert-row-actions"]}>
                        <span className={styles["cert-date-text"]}>{c.d}</span>
                        <a
                          href={c.f}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles["cert-view-btn"]}
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
        <section id="personal" className={styles["personal-section-wrap"]}>
          <motion.div className={styles["personal-wide-container"]} initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className={styles["personal-editorial-layout"]}>
              {/* Left Column: Contextual Introduction */}
              <div className={styles["personal-intro-col"]}>
                <div>
                  <motion.div variants={v} className={styles["personal-eyebrow-row"]}>
                    <span className={styles["personal-eyebrow-text"]}>PERSONAL</span>
                    <span className={styles["personal-eyebrow-line"]} />
                  </motion.div>

                  <motion.h2 variants={v} className={styles["personal-main-heading"]}>
                    Hal-hal kecil<br />
                    yang <span style={{ color: "#2EA8E6" }}>berarti.</span>
                  </motion.h2>

                  <motion.p variants={v} className={styles["personal-intro-desc"]}>
                    <span className="copy-desktop">
                      Selain pengujian QA dan membuat konten, saya juga punya beberapa kebiasaan yang membantu saya tetap konsisten, fokus, dan berkembang. Dua di antaranya adalah belajar bahasa di Duolingo dan melatih kecepatan mengetik di Monkeytype.
                    </span>
                    <span className="copy-mobile">
                      Beberapa kebiasaan kecil yang membantu tetap konsisten, fokus, dan berkembang.
                    </span>
                  </motion.p>
                </div>

                <motion.div variants={v} className={styles["personal-quote-block"]}>
                  <blockquote className={styles["personal-quote-text"]}>
                    &ldquo;Small habits,<br />
                    big progress.&rdquo;
                  </blockquote>
                  <div className={styles["personal-quote-accent-bar"]} />
                </motion.div>
              </div>

              {/* Right Columns: Duolingo & MonkeyType Modules */}
              <div className={styles["personal-cards-wrap"]}>
                {/* ── Duolingo Module ── */}
                <motion.div variants={v} className={styles["personal-card-box"]}>
                  {/* Header */}
                  <div className={styles["personal-card-header"]}>
                    <div className={styles["personal-header-left"]}>
                      <Image
                        src="/images/personal/duolingo.png"
                        alt="Duolingo"
                        width={48}
                        height={48}
                        className={styles["duo-owl-img"]}
                      />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span className={styles["personal-card-title"]}>Duolingo</span>
                          <ArrowUpRight style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                        </div>
                        <p className={styles["personal-card-subtitle"]}>Belajar hari ini, kesempatan lebih banyak esok.</p>
                      </div>
                    </div>
                    <span className={styles["personal-header-meta"]}>{duoStreak} day streak</span>
                  </div>

                  {/* Body: Streak Panel & Languages List */}
                  <div className={styles["duo-card-content-grid"]}>
                    {/* Left Streak Panel */}
                    <div className={styles["duo-streak-panel"]}>
                      <div className={styles["duo-streak-header"]}>
                        <Flame style={{ width: 14, height: 14, color: "#FF9600" }} />
                        <span className={styles["duo-streak-label"]}>Streak</span>
                      </div>
                      <div className={styles["duo-streak-val"]}>{duoStreak}</div>
                      <p className={styles["duo-streak-sub"]}>hari berturut-turut</p>
                      <p className={styles["duo-streak-note"]}>
                        Konsisten belajar, selangkah lebih dekat ke kesempatan baru.
                      </p>
                    </div>

                    {/* Right Languages Panel */}
                    <div className={styles["duo-languages-panel"]}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                        <h4 className={styles["duo-languages-title"]}>Bahasa yang sedang dipelajari</h4>
                        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#6F6C66", fontWeight: 600 }}>
                          {formatNumber(duoTotalXp)} Total XP
                        </span>
                      </div>
                      <div className={styles["duo-languages-list"]}>
                        {duoCourses.map((c, i) => {
                          const flag = getFlagForCourse(c);
                          const pct = Math.min(100, Math.max(15, Math.round((c.xp / maxCourseXp) * 100)));
                          return (
                            <div key={i} className={styles["duo-lang-item"]}>
                              <div className={styles["duo-lang-head"]}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  {flag && (
                                    <Image
                                      src={`https://flagcdn.com/w40/${flag.code}.png`}
                                      alt={flag.name}
                                      width={18}
                                      height={13}
                                      style={{ borderRadius: 2, flexShrink: 0, objectFit: "cover" }}
                                      unoptimized
                                    />
                                  )}
                                  <span className={styles["duo-lang-name"]}>{flag?.name ?? c.title}</span>
                                </div>
                                <span className={styles["duo-lang-xp"]}>{formatNumber(c.xp)} XP</span>
                              </div>
                              <div className={styles["duo-bar-track"]}>
                                <div className={styles["duo-bar-fill"]} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer Button */}
                  <a
                    href="https://www.duolingo.com/profile/AprillioBi"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["personal-card-btn"]}
                  >
                    <span>Lihat Profil Duolingo</span>
                    <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </a>
                </motion.div>

                {/* ── MonkeyType Module ── */}
                <motion.div variants={v} className={styles["personal-card-box"]}>
                  {/* Header */}
                  <div className={styles["personal-card-header"]}>
                    <div className={styles["personal-header-left"]}>
                      <Image
                        src="/images/personal/monkeytype.png"
                        alt="Monkeytype"
                        width={48}
                        height={48}
                        className={styles["monkey-logo-img"]}
                      />
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span className={styles["personal-card-title"]}>Monkeytype</span>
                          <ArrowUpRight style={{ width: 14, height: 14, color: "var(--text-muted)" }} />
                        </div>
                        <p className={styles["personal-card-subtitle"]}>Latihan kecil, hasil yang nyata.</p>
                      </div>
                    </div>
                    <span className={styles["personal-header-meta"]}>Typing progress</span>
                  </div>

                  {/* 4 Metric Columns in a Row */}
                  <div className={styles["monkey-metrics-row"]}>
                    <div className={styles["monkey-metric-cell"]}>
                      <span className={styles["monkey-cell-label"]}>WPM</span>
                      <div className={styles["monkey-cell-val"]}>{mtBestWpm}</div>
                      <span className={styles["monkey-cell-tag"]} title={`Best Raw: ${mtBestRaw} WPM`}>raw: {mtBestRaw}</span>
                    </div>
                    <div className={styles["monkey-metric-cell"]}>
                      <span className={styles["monkey-cell-label"]}>ACC</span>
                      <div className={styles["monkey-cell-val"]}>{mtAcc}%</div>
                      <span className={styles["monkey-cell-tag"]}>best</span>
                    </div>
                    <div className={styles["monkey-metric-cell"]}>
                      <span className={styles["monkey-cell-label"]}>Consistency</span>
                      <div className={styles["monkey-cell-val"]}>{mtConsistency}%</div>
                      <span className={styles["monkey-cell-tag"]}>avg: {mtAvgWpm}</span>
                    </div>
                    <div className={styles["monkey-metric-cell"]}>
                      <span className={styles["monkey-cell-label"]}>Tests</span>
                      <div className={styles["monkey-cell-val"]}>{formatNumber(mtTests)}</div>
                      <span className={styles["monkey-cell-tag"]}>{mtTime}</span>
                    </div>
                  </div>

                  {/* Mini Visualization: Typing Progress (Last 7 Days) */}
                  <div className={styles["monkey-chart-panel"]}>
                    <div className={styles["monkey-chart-head"]}>
                      <span className={styles["monkey-chart-caption"]}>Typing Progress (Last 7 Days)</span>
                      <span className={styles["monkey-chart-trend-badge"]}>+12% ↗ dari minggu</span>
                    </div>
                    <div className={styles["monkey-bars-container"]}>
                      {[
                        { day: "Mon", h: 56 },
                        { day: "Tue", h: 68 },
                        { day: "Wed", h: 84 },
                        { day: "Thu", h: 72 },
                        { day: "Fri", h: 92 },
                        { day: "Sat", h: 64 },
                        { day: "Sun", h: 96 },
                      ].map((bar, idx) => (
                        <div key={idx} className={styles["monkey-bar-col"]}>
                          <div className={styles["monkey-bar-track"]}>
                            <div
                              className={styles["monkey-bar-pillar"]}
                              style={{ height: `${bar.h}%` }}
                            />
                          </div>
                          <span className={styles["monkey-bar-day"]}>{bar.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Button */}
                  <a
                    href="https://monkeytype.com/profile/Aprillio"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["personal-card-btn"]}
                  >
                    <span>Lihat Profil Monkeytype</span>
                    <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 6. CONTACT (KONTAK) — FINAL SECTION (NO FOOTER AFTER THIS) ═══ */}
        <section id="contact" className={styles["ref-doc-section"]} style={{ paddingBottom: 80 }}>
          <motion.div className={styles["contact-wide-container"]} initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className={styles["contact-reference-grid"]}>
              {/* Left Column: Info, Opportunities, Socials & Email */}
              <motion.div variants={v} className={styles["contact-left-col"]}>
                <div className={styles["contact-eyebrow-text"]}>LET&apos;S CONNECT</div>
                <h2 className={styles["contact-main-heading"]}>Kontak</h2>
                <p className={styles["contact-desc-text"]}>
                  <span className="copy-desktop">
                    Terbuka untuk diskusi seputar peluang kerja, kolaborasi konten, atau sekadar ngobrol soal teknologi, game, dan hal menarik lainnya.
                  </span>
                  <span className="copy-mobile">
                    Terbuka untuk peluang kerja, kolaborasi konten, atau sekadar ngobrol soal teknologi dan game.
                  </span>
                </p>

                {/* 3 Compact Opportunity Cards */}
                <div className={styles["contact-opportunities-grid"]}>
                  <div className={styles["contact-opp-card"]}>
                    <div className={styles["contact-opp-icon"]}>
                      <Briefcase style={{ width: 18, height: 18 }} />
                    </div>
                    <h4 className={styles["contact-opp-title"]}>Peluang Kerja</h4>
                    <p className={styles["contact-opp-desc"]}>
                      <span className="copy-desktop">Full-time, internship, atau project freelance.</span>
                      <span className="copy-mobile">Full-time, internship, atau freelance.</span>
                    </p>
                  </div>

                  <div className={styles["contact-opp-card"]}>
                    <div className={styles["contact-opp-icon"]}>
                      <Users style={{ width: 18, height: 18 }} />
                    </div>
                    <h4 className={styles["contact-opp-title"]}>Kolaborasi Konten</h4>
                    <p className={styles["contact-opp-desc"]}>Gaming, tech, atau komunitas.</p>
                  </div>

                  <div className={styles["contact-opp-card"]}>
                    <div className={styles["contact-opp-icon"]}>
                      <MessageSquare style={{ width: 18, height: 18 }} />
                    </div>
                    <h4 className={styles["contact-opp-title"]}>Diskusi &amp; Lainnya</h4>
                    <p className={styles["contact-opp-desc"]}>
                      <span className="copy-desktop">Ide, saran, atau sekadar ngobrol.</span>
                      <span className="copy-mobile">Ide, saran, atau ngobrol santai.</span>
                    </p>
                  </div>
                </div>

                <h3 className={styles["contact-subtitle"]}>Temukan Saya di</h3>
                <div className={styles["contact-socials-row"]}>
                  {[
                    {
                      href: "https://github.com/aprilliobintang284",
                      l: "GitHub",
                      icon: (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://linkedin.com/in/aprilliobintang",
                      l: "LinkedIn",
                      icon: (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.tiktok.com/@scarawanderr",
                      l: "TikTok",
                      icon: (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.instagram.com/aprillio.bintang/",
                      l: "Instagram",
                      icon: (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
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
                      className={styles["contact-social-btn"]}
                    >
                      <span className={styles["contact-social-icon"]}>{icon}</span>
                      <span>{l}</span>
                      <ArrowUpRight style={{ width: 11, height: 11, opacity: 0.6 }} />
                    </a>
                  ))}
                </div>

                <div
                  className={styles["contact-direct-email-row"]}
                  onClick={() => {
                    navigator.clipboard?.writeText("aprilliobintang284@gmail.com");
                    alert("Email disalin: aprilliobintang284@gmail.com");
                  }}
                  title="Klik untuk menyalin email"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Mail style={{ width: 16, height: 16, color: "#2EA8E6", flexShrink: 0 }} />
                    <span className={styles["contact-email-text"]}>aprilliobintang284@gmail.com</span>
                  </div>
                  <ArrowRight style={{ width: 14, height: 14, color: "var(--text-muted)", flexShrink: 0 }} />
                </div>
              </motion.div>

              {/* Middle Column: Form */}
              <motion.div variants={v} className={styles["contact-right-col"]}>
                <h3 className={styles["contact-form-title"]}>Kirim Pesan</h3>
                <p className={styles["contact-form-desc"]}>
                  Punya pertanyaan atau ingin bekerja sama? Tulis pesanmu di sini.
                </p>

                <form onSubmit={handleContactSubmit} className={styles["contact-form-box"]}>
                  <div className={styles["contact-form-inputs-row"]}>
                    <div className={styles["contact-input-wrap"]}>
                      <User className={styles["contact-input-icon"]} style={{ width: 15, height: 15 }} />
                      <input
                        type="text"
                        name="name"
                        required
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Nama Anda"
                        className={styles["contact-input-field"]}
                      />
                    </div>
                    <div className={styles["contact-input-wrap"]}>
                      <Mail className={styles["contact-input-icon"]} style={{ width: 15, height: 15 }} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="Email Anda"
                        className={styles["contact-input-field"]}
                      />
                    </div>
                  </div>

                  <div className={styles["contact-textarea-wrap"]}>
                    <MessageSquare className={styles["contact-textarea-icon"]} style={{ width: 15, height: 15 }} />
                    <textarea
                      name="message"
                      required
                      maxLength={500}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tulis pesan Anda..."
                      className={styles["contact-textarea-field"]}
                    />
                    <span className={styles["contact-char-count"]}>{contactForm.message.length}/500</span>
                  </div>

                  {/* Cloudflare Turnstile */}
                  <div className={styles["contact-turnstile-wrap"]}>
                    <Turnstile
                      siteKey="0x4AAAAAADq_B4aMz84j6QmW"
                      onSuccess={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                      options={{ theme: "dark", size: "normal" }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={styles["contact-submit-btn"]}
                    disabled={contactSending || contactSent || !turnstileToken}
                    style={{
                      opacity: contactSending || contactSent || !turnstileToken ? 0.55 : 1,
                      cursor: contactSending || contactSent || !turnstileToken ? "not-allowed" : "pointer",
                    }}
                  >
                    {contactSent ? (
                      <>
                        <CheckCircle2 style={{ width: 16, height: 16 }} /> Terkirim!
                      </>
                    ) : contactSending ? (
                      <>Mengirim…</>
                    ) : (
                      <>
                        <Send style={{ width: 14, height: 14 }} />
                        <span>Kirim Pesan</span>
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Right Column: Editorial Quote */}
              <div className={styles["contact-quote-col"]}>
                <div className={styles["contact-quote-content"]}>
                  <blockquote className={styles["contact-quote-text"]}>
                    &ldquo;Good conversations lead to great opportunities.&rdquo;
                  </blockquote>
                  <div className={styles["contact-quote-accent-bar"]} />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══ 7. FOOTER — EDITORIAL CLOSING SECTION ═══ */}
        <footer className={styles["footer-wrap"]}>
          <div className={styles["footer-container"]}>
            {/* 4-column Main Grid */}
            <div className={styles["footer-grid"]}>
              {/* Column 1: Identity */}
              <div className={styles["footer-col-identity"]}>
                <div className={styles["footer-brand-header"]}>
                  <Image
                    src="/images/logo.png"
                    alt="Aprillio Bintang"
                    width={38}
                    height={38}
                    className={styles["footer-logo-img"]}
                  />
                  <div>
                    <h3 className={styles["footer-brand-name"]}>Aprillio Bintang</h3>
                    <p className={styles["footer-brand-role"]}>QA Specialist &amp; Content Creator</p>
                  </div>
                </div>

                <p className={styles["footer-bio-text"]}>
                  Building better products through quality, and sharing the journey along the way.
                </p>

                {/* 4 Social Icon Buttons */}
                <div className={styles["footer-social-row"]}>
                  <a
                    href="https://github.com/aprilliobintang284"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-icon-btn"]}
                    aria-label="GitHub"
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/aprilliobintang"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-icon-btn"]}
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@scarawanderr"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-icon-btn"]}
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/aprillio.bintang/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-icon-btn"]}
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Column 2: Navigasi */}
              <div>
                <h4 className={styles["footer-col-title"]}>Navigasi</h4>
                <nav className={styles["footer-link-list"]}>
                  <a href="#about" className={styles["footer-nav-link"]}>
                    <User className={styles["footer-link-icon"]} />
                    <span>Tentang</span>
                  </a>
                  <a href="#experience" className={styles["footer-nav-link"]}>
                    <Briefcase className={styles["footer-link-icon"]} />
                    <span>Pengalaman</span>
                  </a>
                  <a href="#education" className={styles["footer-nav-link"]}>
                    <GraduationCap className={styles["footer-link-icon"]} />
                    <span>Pendidikan</span>
                  </a>
                  <a href="#personal" className={styles["footer-nav-link"]}>
                    <Sparkles className={styles["footer-link-icon"]} />
                    <span>Personal</span>
                  </a>
                  <a href="#contact" className={styles["footer-nav-link"]}>
                    <Mail className={styles["footer-link-icon"]} />
                    <span>Kontak</span>
                  </a>
                </nav>
              </div>

              {/* Column 3: Terhubung */}
              <div>
                <h4 className={styles["footer-col-title"]}>Terhubung</h4>
                <div className={styles["footer-link-list"]}>
                  <a
                    href="https://github.com/aprilliobintang284"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-link"]}
                  >
                    <span className={styles["footer-social-brand-icon"]}>
                      <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </span>
                    <span>GitHub</span>
                    <ArrowUpRight className={styles["footer-external-arrow"]} />
                  </a>
                  <a
                    href="https://linkedin.com/in/aprilliobintang"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-link"]}
                  >
                    <span className={`${styles["footer-social-brand-tile"]} ${styles["footer-tile-linkedin"]}`}>
                      <svg viewBox="0 0 24 24" width={11} height={11} fill="#FFFFFF">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </span>
                    <span>LinkedIn</span>
                    <ArrowUpRight className={styles["footer-external-arrow"]} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@scarawanderr"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-link"]}
                  >
                    <span className={styles["footer-social-brand-icon"]}>
                      <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </span>
                    <span>TikTok</span>
                    <ArrowUpRight className={styles["footer-external-arrow"]} />
                  </a>
                  <a
                    href="https://www.instagram.com/aprillio.bintang/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles["footer-social-link"]}
                  >
                    <span className={`${styles["footer-social-brand-tile"]} ${styles["footer-tile-instagram"]}`}>
                      <svg viewBox="0 0 24 24" width={11} height={11} fill="#FFFFFF">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </span>
                    <span>Instagram</span>
                    <ArrowUpRight className={styles["footer-external-arrow"]} />
                  </a>
                </div>
              </div>

              {/* Column 4: Far-Right Quote */}
              <div className={styles["footer-col-quote"]}>
                <div>
                  <blockquote className={styles["footer-quote-text"]}>
                    &ldquo;Better products.<br />
                    Better experiences.&rdquo;
                  </blockquote>
                  <div className={styles["footer-quote-divider"]} />
                  <p className={styles["footer-quote-sub"]}>
                    Testing today<br />
                    for a better tomorrow.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className={styles["footer-bottom-row"]}>
              <span className={styles["footer-copyright"]}>
                &copy; 2026 Aprillio Bintang Perdana. All rights reserved.
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={styles["footer-back-to-top-btn"]}
                aria-label="Kembali ke atas"
              >
                <span className={styles["footer-back-to-top-circle"]}>
                  <ArrowUp style={{ width: 14, height: 14 }} />
                </span>
                <span>Kembali ke atas</span>
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Toast Notification */}
      {(contactSent || contactError) && (
        <div
          className={styles["contact-toast"]}
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