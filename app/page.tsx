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
  ExternalLink,
} from "lucide-react";
import Navbar from "./components/Navbar";
import HeroBento from "./components/HeroBento";

const FLAG_MAP: Record<string, { code: string; name: string }> = {
  en: { code: "us", name: "English" },
  ko: { code: "kr", name: "Korean" },
  "zh-cn": { code: "cn", name: "Chinese (Simplified)" },
  ja: { code: "jp", name: "Japanese" },
  es: { code: "es", name: "Spanish" },
  fr: { code: "fr", name: "French" },
  de: { code: "de", name: "German" },
};

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
};

export default function Home() {
  const [stats, setStats] = useState<MTStats>({
    bestWpm: 121, bestRaw: 125, bestAcc: 97, bestConsistency: 79,
    avgWpm: 94, completedTests: 669, completionPct: 21,
    timeTyping: "9h 52m", startedTests: 3300,
  });
  const [mtLoading, setMtLoading] = useState(true);
  const [duo, setDuo] = useState<DuoStats | null>({
    streak: 114, totalXp: 9458, activeCourses: 3, joinedAt: null, longestStreak: 114,
    courses: [
      { title: "English", xp: 5277, language: "en" },
      { title: "Korean", xp: 4037, language: "ko" },
      { title: "Chinese", xp: 144, language: "zh-cn" },
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
        name: contactForm.name, email: contactForm.email,
        message: contactForm.message, title: `Pesan dari ${contactForm.name}`,
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
    fetch("/api/monkeytype").then(r => r.json()).then((d: MTStats & { ok?: boolean }) => {
      if (d?.ok) setStats({
        bestWpm: d.bestWpm ?? 121, bestRaw: d.bestRaw ?? 125, bestAcc: d.bestAcc ?? 97,
        bestConsistency: d.bestConsistency ?? 79, avgWpm: d.avgWpm ?? 94,
        completedTests: d.completedTests ?? 669, completionPct: d.completionPct ?? 21,
        timeTyping: d.timeTyping ?? "9h 52m", startedTests: d.startedTests ?? 3300,
      });
    }).catch(() => {}).finally(() => setMtLoading(false));

    fetch("/api/duolingo").then(r => r.json()).then((d: DuoStats & { ok?: boolean }) => {
      if (d?.ok) setDuo({
        streak: d.streak, totalXp: d.totalXp, activeCourses: d.activeCourses,
        courses: d.courses ?? [], joinedAt: d.joinedAt ?? null,
        longestStreak: d.longestStreak ?? d.streak,
      });
    }).catch(() => {}).finally(() => setDuoLoading(false));
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
    { title: "Epic Defeated Moment", views: "471,400", href: "https://vt.tiktok.com/ZSHhhM7mg/" },
    { title: "The Charm of Onic HoK Players", views: "367,700", href: "https://www.tiktok.com/@scarawanderr/video/7510189240261643528" },
    { title: "Cinematic Review Milady Swaampser", views: "198,000", href: "https://www.tiktok.com/@scarawanderr/video/7565946037865549063" },
  ];

  const duoCourses = duo?.courses ?? [
    { title: "English", xp: 5277, language: "en" },
    { title: "Korean", xp: 4037, language: "ko" },
    { title: "Chinese", xp: 144, language: "zh-cn" },
  ];
  const duoStreak = duoLoading ? 114 : (duo?.streak ?? 114);
  const duoTotalXp = duoLoading ? 9458 : (duo?.totalXp ?? 9458);

  const mtBestWpm = mtLoading ? 121 : stats.bestWpm;
  const mtAvgWpm = mtLoading ? 94 : stats.avgWpm;
  const mtAcc = mtLoading ? 97 : stats.bestAcc;
  const mtTests = mtLoading ? 669 : stats.completedTests;
  const mtTime = mtLoading ? "9h 52m" : stats.timeTyping;

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene" />
      <Navbar />

      <main>
        {/* ═══ HERO ═══ */}
        <HeroBento />

        <hr className="silk-divider" />

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="doc-section" style={{ paddingTop: 48, paddingBottom: 40 }}>
          <motion.div className="doc-inner-820" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.div variants={v}>
              <h2 className="doc-heading-md">Presisi Teknis &amp; Kreativitas Konten.</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 10 }}>
                Sebagai <strong style={{ color: "var(--text-primary)" }}>Quality Assurance Specialist</strong>, peran saya berpusat pada ketelitian: menyusun skenario pengujian terstruktur, menguji stabilitas alur transaksi, dan melacak bug di Plane sebelum perangkat lunak dinikmati publik.
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 24 }}>
                Di saat yang sama, saya aktif sebagai <strong style={{ color: "var(--text-primary)" }}>Gaming Content Creator</strong> untuk Honor of Kings — memadukan riset tren komunitas dan eksekusi konten yang menghasilkan jangkauan jutaan penonton di TikTok.
              </p>
            </motion.div>

            <motion.div variants={v} className="about-editorial-grid">
              <div style={{ paddingLeft: 14, borderLeft: "1px solid var(--border)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: ".02em", textTransform: "uppercase" as const }}>
                  Quality Assurance &amp; Testing
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 4, fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55 }}>
                  <li>Functional &amp; E2E Testing</li>
                  <li>Bug Reporting (Plane)</li>
                  <li>Cross-browser Testing</li>
                  <li>Manual API Verification</li>
                  <li>Regression Testing</li>
                </ul>
              </div>
              <div style={{ paddingLeft: 14, borderLeft: "1px solid var(--border)" }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: ".02em", textTransform: "uppercase" as const }}>
                  Content Creation &amp; Media
                </h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 3, fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.55 }}>
                  <li>Video Editing &amp; Pacing</li>
                  <li>Campaign Strategy</li>
                  <li>HoK Creator Camp Member</li>
                  <li>Audience Retention Analytics</li>
                  <li>Community Growth</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience" className="doc-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <motion.div className="doc-inner-900" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.h2 variants={v} className="doc-heading-lg">Pengalaman</motion.h2>

            <div className="timeline-track" style={{ gap: 32 }}>
              <motion.div variants={v} className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-period">Jun 2025 — Sekarang</div>
                <h3 className="timeline-role">Quality Assurance Specialist</h3>
                <p className="timeline-company">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 5, fontSize: 14, lineHeight: 1.65, color: "rgba(245,240,232,.62)" }}>
                  <li>· End-to-end testing menyeluruh untuk platform tiket Tenar (Buyer &amp; Organizer) Phase 2–4 serta Payment Gateway MVP.</li>
                  <li>· Menyusun puluhan test case fungsional, memvalidasi alur checkout tiket dan integrasi form event.</li>
                  <li>· Mencatat dan mengelola status pelaporan bug secara berkala di Plane, berkoordinasi langsung dengan developer.</li>
                </ul>
              </motion.div>

              <motion.div variants={v} className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-period">2025 — Sekarang</div>
                <h3 className="timeline-role">Freelance Gaming Content Creator</h3>
                <p className="timeline-company">Honor of Kings (Tencent / TikTok) · Remote</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 4, fontSize: 13, lineHeight: 1.6, color: "rgba(245,240,232,.62)" }}>
                  <li>· Menyelesaikan kontrak 50 video promosi resmi kampanye TikTok untuk game Honor of Kings.</li>
                  <li>· Anggota aktif HoK Creator Camp dengan akumulasi penayangan jutaan penonton.</li>
                  <li>· Menjalankan seluruh siklus produksi: perekaman gameplay, kurasi momen, sound design, dan pacing video.</li>
                </ul>
              </motion.div>

              <motion.div variants={v} className="timeline-item">
                <span className="timeline-dot" style={{ background: "var(--text-muted)" }} />
                <div className="timeline-period">Agu 2024 — Jun 2025</div>
                <h3 className="timeline-role">Internship Monitoring Server</h3>
                <p className="timeline-company">PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 4, fontSize: 13, lineHeight: 1.6, color: "rgba(245,240,232,.62)" }}>
                  <li>· Pemantauan operasional server produksi secara berkala untuk menjaga uptime dan stabilitas sistem.</li>
                  <li>· Menganalisis error transaksi dan mendokumentasikan kendala operasional ke laporan teknis.</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="projects" className="doc-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <motion.div className="doc-inner-960" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.div variants={v} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
              <h2 className="doc-heading-lg" style={{ marginBottom: 0 }}>Proyek Pilihan</h2>
              <Link href="/projects" className="project-editorial-link">Lihat Semua <ArrowRight style={{ width: 13, height: 13 }} /></Link>
            </motion.div>

            <motion.div variants={v} className="project-editorial-row">
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" as const, marginBottom: 3 }}>
                <h3 className="project-editorial-title">Tenar Events (Buyer)</h3>
                <a href="https://tenar.events/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}>
                  tenar.events <ExternalLink style={{ width: 10, height: 10 }} />
                </a>
              </div>
              <div className="project-editorial-sub">
                <span>B2C Event Ticketing</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span className="project-status-live">Production Live</span>
              </div>
              <p className="project-editorial-desc">
                Platform pencarian dan pembelian tiket event. Pengujian difokuskan pada kelancaran alur checkout, keamanan data pemesanan, dan filter pencarian event.
              </p>
              <p className="project-editorial-qa">QA: E2E testing alur pembayaran · Cross-browser testing · Validasi filter pencarian event &amp; kategori</p>
              <Link href="/projects" className="project-editorial-link">Detail Studi Kasus <ArrowRight style={{ width: 12, height: 12 }} /></Link>
            </motion.div>

            <motion.div variants={v} className="project-editorial-row">
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" as const, marginBottom: 3 }}>
                <h3 className="project-editorial-title">Tenar Organizer</h3>
                <a href="https://organizer.tenar.events/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}>
                  organizer.tenar.events <ExternalLink style={{ width: 10, height: 10 }} />
                </a>
              </div>
              <div className="project-editorial-sub">
                <span>B2B Event Organizer CMS</span>
                <span style={{ color: "var(--border)" }}>·</span>
                <span className="project-status-live">Production Live</span>
              </div>
              <p className="project-editorial-desc">
                Dashboard CMS bagi penyelenggara acara untuk mengelola pembuatan event, pengaturan kuota tiket multi-tier, dan analitik penjualan real-time.
              </p>
              <p className="project-editorial-qa">QA: Validasi form multi-step · Verifikasi RBAC · Pelaporan isu integrasi API via Plane</p>
              <Link href="/projects" className="project-editorial-link">Detail Studi Kasus <ArrowRight style={{ width: 12, height: 12 }} /></Link>
            </motion.div>

            <motion.div variants={v} className="project-editorial-row">
              <h3 className="project-editorial-title" style={{ fontSize: 15 }}>Payment Gateway MVP</h3>
              <div className="project-editorial-sub">
                <span className="project-status-mvp">Internal MVP</span>
              </div>
              <p className="project-editorial-desc" style={{ marginBottom: 6 }}>
                Pengujian integrasi sistem pembayaran otomatis internal — verifikasi status callback, boundary nominal, dan penanganan kegagalan transaksi.
              </p>
              <Link href="/projects" className="project-editorial-link">Detail MVP <ArrowRight style={{ width: 12, height: 12 }} /></Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ EDUCATION & CERTIFICATIONS ═══ */}
        <section id="education" className="doc-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <motion.div className="doc-inner-860" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <div className="edu-cert-editorial-grid">
              <motion.div variants={v}>
                <h2 className="doc-heading-md" style={{ marginBottom: 20 }}>Pendidikan</h2>
                <div className="edu-timeline">
                  {edu.map((e, i) => (
                    <div key={i} className="edu-timeline-item">
                      <div className="edu-timeline-node" />
                      <div className="edu-timeline-date">{e.yr}</div>
                      <h4 className="edu-timeline-institution">
                        <a href={e.href} target="_blank" rel="noopener noreferrer">{e.school}</a>
                      </h4>
                      <p className="edu-timeline-degree">{e.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={v}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Sertifikasi</h3>
                <div className="cert-archive-list">
                  {certs.map((c, i) => (
                    <div key={i} className={`cert-archive-row ${c.isQA ? "cert-qa-emphasis" : ""}`}>
                      <div className="cert-info">
                        <span className="cert-title">{c.t}</span>
                        {c.i && <span className="cert-issuer">{c.i}</span>}
                      </div>
                      <div className="cert-meta">
                        <span className="cert-year">{c.d}</span>
                        <a href={c.f} target="_blank" rel="noopener noreferrer" className="cert-action-link" title={`Lihat Sertifikat ${c.t}`}>
                          <span>Lihat</span>
                          <ArrowUpRight style={{ width: 12, height: 12 }} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ CREATOR ═══ */}
        <section id="creator" className="doc-section" style={{ paddingTop: 40, paddingBottom: 36 }}>
          <motion.div className="doc-inner-900" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.div variants={v} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
              <h2 className="doc-heading-md" style={{ marginBottom: 0 }}>Kreator Konten</h2>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Link href="/creator" className="project-editorial-link" style={{ fontSize: 12 }}>Portfolio <ArrowRight style={{ width: 12, height: 12 }} /></Link>
                <a href="https://www.tiktok.com/@scarawanderr" target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  TikTok <ExternalLink style={{ width: 11, height: 11 }} />
                </a>
              </div>
            </motion.div>

            <motion.div variants={v} className="creator-inline-metrics">
              <strong>3.8M+</strong> <span>views</span>
              <span className="creator-inline-sep">·</span>
              <strong>245K+</strong> <span>likes</span>
              <span className="creator-inline-sep">·</span>
              <strong>2.1K</strong> <span>followers</span>
              <span className="creator-inline-sep">·</span>
              <strong>50+</strong> <span>video kampanye</span>
            </motion.div>

            <motion.div variants={v}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: ".08em", textTransform: "uppercase" as const, marginBottom: 10 }}>
                Kampanye Terpilih
              </h3>
              <div>
                {campaigns.map((c, i) => (
                  <a key={i} href={c.href} target="_blank" rel="noreferrer" className="campaign-editorial-row" style={{ textDecoration: "none" }}>
                    <span className="campaign-editorial-title">{c.title}</span>
                    <span className="campaign-editorial-views">{c.views} views</span>
                    <span className="campaign-editorial-link">Lihat <ArrowUpRight style={{ width: 11, height: 11 }} /></span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ PERSONAL ═══ */}
        <section id="personal" className="doc-section" style={{ paddingTop: 36, paddingBottom: 40 }}>
          <motion.div className="doc-inner-760" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.h2 variants={v} className="doc-heading-sm">Tentang Saya</motion.h2>

            <div className="personal-modules-grid">
              {/* ── Duolingo Module ── */}
              <motion.div variants={v} className="personal-module">
                <div className="personal-module-header">
                  <span className="personal-module-title">🦉 Duolingo</span>
                  <a href="https://www.duolingo.com/profile/AprillioBi" target="_blank" rel="noreferrer" className="personal-compact-link">
                    Profil <ExternalLink style={{ width: 10, height: 10 }} />
                  </a>
                </div>

                <div className="personal-module-highlight">
                  {duoStreak}<span>day streak</span>
                </div>

                {/* Language rows with flags */}
                <div className="personal-module-list" style={{ gap: 8 }}>
                  {duoCourses.map((c, i) => {
                    const flag = FLAG_MAP[c.language];
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 7, borderBottom: i < duoCourses.length - 1 ? "1px solid var(--border)" : "none" }}>
                        {flag && (
                          <Image
                            src={`https://flagcdn.com/24x18/${flag.code}.png`}
                            alt={flag.name}
                            width={20}
                            height={15}
                            style={{ borderRadius: 2, flexShrink: 0 }}
                          />
                        )}
                        <span style={{ flex: 1, fontSize: 13.5, color: "var(--text-secondary)", fontWeight: 500 }}>
                          {flag?.name ?? c.title}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "monospace" }}>
                          {formatNumber(c.xp)} XP
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 8, borderTop: "1px solid var(--border)", fontSize: 12.5 }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Total XP</span>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)", fontFamily: "monospace" }}>{formatNumber(duoTotalXp)}</span>
                </div>
              </motion.div>

              {/* ── MonkeyType Module ── */}
              <motion.div variants={v} className="personal-module">
                <div className="personal-module-header">
                  <span className="personal-module-title">⌨️ MonkeyType</span>
                  <a href="https://monkeytype.com/profile/Aprillio" target="_blank" rel="noreferrer" className="personal-compact-link">
                    Profil <ExternalLink style={{ width: 10, height: 10 }} />
                  </a>
                </div>

                {/* Big WPM display */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-.04em", lineHeight: 1 }}>{mtBestWpm}</span>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>WPM</span>
                    <span style={{ fontSize: 10.5, color: "var(--text-muted)" }}>personal best</span>
                  </div>
                </div>

                {/* Stats grid 2x2 */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Average</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{mtAvgWpm} <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>WPM</span></p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Accuracy</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{mtAcc}<span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>%</span></p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Tests</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{formatNumber(mtTests)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Time Typed</p>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)" }}>{mtTime}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="doc-section" style={{ paddingTop: 40, paddingBottom: 48 }}>
          <motion.div className="doc-inner-900" initial="hidden" whileInView="show" viewport={VP} variants={s}>
            <motion.div variants={v} style={{ marginBottom: 20 }}>
              <h2 className="doc-heading-sm">Kontak</h2>
              <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.6 }}>
                Terbuka untuk diskusi proyek pengujian QA, kolaborasi konten, atau sekadar bertukar pikiran.
              </p>
            </motion.div>

            <div className="contact-grid">
              <motion.div variants={v} style={{ display: "flex", flexDirection: "column" as const }}>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "var(--text-primary)", marginBottom: 12 }}>Platform Komunikasi</h3>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                  {[
                    { href: "https://linkedin.com/in/aprilliobintang", l: "LinkedIn", sub: "/in/aprilliobintang",
                      icon: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                      color: "#0A66C2", bg: "rgba(10,102,194,.15)" },
                    { href: "https://github.com/aprilliobintang284", l: "GitHub", sub: "@aprilliobintang284",
                      icon: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
                      color: "#fff", bg: "rgba(255,255,255,.08)" },
                    { href: "https://www.tiktok.com/@scarawanderr", l: "TikTok", sub: "@scarawanderr",
                      icon: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
                      color: "#fff", bg: "rgba(255,255,255,.08)" },
                    { href: "https://www.instagram.com/aprillio.bintang/", l: "Instagram", sub: "@aprillio.bintang",
                      icon: <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>,
                      color: "#E1306C", bg: "rgba(225,48,108,.15)" },
                  ].map(({ href, l, color, bg, icon }) => (
                    <a key={l} href={href} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "var(--surface-elevated)", border: "1px solid var(--border)", textDecoration: "none", transition: "all .2s ease" }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)" }}>{l}</span>
                    </a>
                  ))}
                </div>
                <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: "var(--surface-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(46,168,230,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                    <Mail style={{ width: 13, height: 13 }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10.5, color: "var(--text-muted)", marginBottom: 1 }}>Email Langsung</p>
                    <p style={{ fontSize: 12, color: "var(--accent)", fontFamily: "monospace", fontWeight: 700 }}>aprilliobintang455@gmail.com</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={v}>
                <h3 style={{ fontWeight: 800, fontSize: 14, color: "var(--text-primary)", marginBottom: 12 }}>Kirim Pesan</h3>
                <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                  <div className="contact-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>Email</label>
                      <input type="email" name="email" required value={contactForm.email} onChange={handleContactChange} placeholder="email@anda.com"
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 12.5, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>Nama</label>
                      <input type="text" name="name" required value={contactForm.name} onChange={handleContactChange} placeholder="Nama Anda"
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 12.5, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>Pesan</label>
                    <textarea name="message" required rows={3} value={contactForm.message} onChange={handleContactChange} placeholder="Ceritakan kebutuhan Anda…"
                      style={{ width: "100%", padding: "8px 10px", borderRadius: 8, background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 12.5, outline: "none", fontFamily: "inherit", resize: "vertical" as const, lineHeight: 1.6, boxSizing: "border-box" as const }} />
                  </div>
                  <Turnstile siteKey="0x4AAAAAADq_B4aMz84j6QmW" onSuccess={(token) => setTurnstileToken(token)} onExpire={() => setTurnstileToken(null)} onError={() => setTurnstileToken(null)} options={{ theme: "dark", size: "flexible" }} />
                  <button type="submit" className="btn btn-primary" disabled={contactSending || contactSent || !turnstileToken}
                    style={{ justifyContent: "center", opacity: contactSending || contactSent || !turnstileToken ? 0.55 : 1, cursor: contactSending || contactSent || !turnstileToken ? "not-allowed" : "pointer" }}>
                    {contactSent ? (<><CheckCircle2 style={{ width: 15, height: 15 }} /> Terkirim!</>) : contactSending ? (<>Mengirim…</>) : (<><Mail style={{ width: 15, height: 15 }} /> Kirim Pesan</>)}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Toast */}
      {(contactSent || contactError) && (
        <div className="contact-toast" style={{ position: "fixed", bottom: 24, right: 20, zIndex: 9999, display: "flex", flexDirection: "column" as const, gap: 8, pointerEvents: "none" }}>
          {contactSent && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, background: "var(--surface-elevated)", border: "1px solid rgba(73,168,120,.40)", minWidth: 240, pointerEvents: "auto", boxShadow: "0 6px 20px rgba(0,0,0,0.5)" }}>
              <CheckCircle2 style={{ width: 15, height: 15, color: "var(--success)" }} />
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--success)", marginBottom: 1 }}>Pesan Terkirim!</p>
                <p style={{ fontSize: 11, color: "var(--text-secondary)" }}>Saya akan segera membalas 👋</p>
              </div>
            </div>
          )}
          {contactError && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", borderRadius: 12, background: "var(--surface-elevated)", border: "1px solid rgba(239,68,68,.40)", minWidth: 240, pointerEvents: "auto", boxShadow: "0 6px 20px rgba(0,0,0,0.5)" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#ef4444" }}>✕</span>
              <div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "#ef4444", marginBottom: 1 }}>Gagal Mengirim</p>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: 200 }}>{contactError}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="sidebar-offset" style={{ padding: "20px 24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}