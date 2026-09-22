"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
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

const PROJECT_GALLERY: LightboxImage[] = [
  {
    src: "/images/projects/tenar-buyer/hero.png",
    alt: "Tenar Events Buyer Mobile Interface",
    caption: "Tenar Events (Buyer) — Antarmuka Utama Mobile Web",
    width: 430,
    height: 932,
  },
  {
    src: "/images/projects/tenar-buyer/event-category.png",
    alt: "Event Category",
    caption: "Tenar Events (Buyer) — Event Category: Menampilkan event berdasarkan kategori yang dipilih pengguna",
    width: 360,
    height: 800,
  },
  {
    src: "/images/projects/tenar-buyer/search.png",
    alt: "Search",
    caption: "Tenar Events (Buyer) — Search: Pencarian event berdasarkan kata kunci untuk menemukan event yang diinginkan",
    width: 460,
    height: 1024,
  },
  {
    src: "/images/projects/tenar-buyer/event-detail.png",
    alt: "Event Detail",
    caption: "Tenar Events (Buyer) — Event Detail: Detail event, informasi venue, dan pemilihan tiket",
    width: 265,
    height: 1024,
  },
  {
    src: "/images/projects/tenar-buyer/order-summary.png",
    alt: "Order Summary",
    caption: "Tenar Events (Buyer) — Order Summary: Ringkasan data pesanan sebelum tiket diproses",
    width: 374,
    height: 1024,
  },
  {
    src: "/images/projects/tenar-organizer/hero.png",
    alt: "Tenar Organizer Dashboard",
    caption: "Tenar Organizer — Dashboard Overview: Ringkasan statistik event, penjualan, dan metrik operasional",
    width: 1917,
    height: 971,
  },
  {
    src: "/images/projects/tenar-organizer/review-configuration.png",
    alt: "Review / Event Configuration",
    caption: "Tenar Organizer — Review / Event Configuration: Konfigurasi event, form buyer dan attendee, serta pengaturan tiket sebelum dipublikasikan",
    width: 967,
    height: 1024,
  },
  {
    src: "/images/projects/tenar-organizer/order-management.png",
    alt: "Order Management",
    caption: "Tenar Organizer — Order Management: Pemantauan pesanan, status transaksi, penjualan, dan data order",
    width: 1001,
    height: 1024,
  },
  {
    src: "/images/projects/tenar-organizer/event-list.png",
    alt: "Event List",
    caption: "Tenar Organizer — Event List: Pengelolaan event yang sudah dipublikasikan dan status event yang sedang aktif",
    width: 1024,
    height: 855,
  },
  {
    src: "/images/projects/tenar-organizer/ticket-management.png",
    alt: "Ticket Management",
    caption: "Tenar Organizer — Ticket Management: Pemantauan tiket, data peserta, status tiket, dan proses check-in",
    width: 1024,
    height: 885,
  },
];

export default function ProjectsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div className="bg-scene" />
      <Navbar />

      <main className="sidebar-offset" style={{ paddingTop: "clamp(96px, 11vw, 140px)", paddingBottom: 110, overflowX: "clip" }}>
        <div className="projects-fluid-container">
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
              TENAR EVENTS (BUYER)
              Natural Editorial Case Study · Real Screenshots · Balanced Layout
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-project-chapter"
          >
            {/* 1. Clean Two-Column Editorial Hero */}
            <section className="qa-buyer-editorial-hero">
              <div className="qa-buyer-hero-grid">
                {/* LEFT: Editorial Hierarchy & Metadata */}
                <div className="qa-buyer-intro">
                  <h2 className="qa-buyer-title">
                    Tenar Events <span className="qa-buyer-title-accent">(Buyer)</span>
                  </h2>

                  <div className="qa-buyer-subhead">
                    <span className="chip chip-green">Production Live</span>
                    <span className="qa-buyer-category">
                      Mobile Web · B2C Event Ticketing
                    </span>
                  </div>

                  <p className="qa-buyer-desc">
                    Platform e-ticketing publik yang melayani ribuan pencari tiket event dalam format mobile web. Pengujian berfokus pada kelancaran alur checkout tiket, pencegahan duplikasi order, dan akurasi pencarian event aktif.
                  </p>

                  {/* Horizontal Metadata Row */}
                  <div className="qa-buyer-meta-row">
                    <div className="qa-buyer-meta-col">
                      <span className="qa-buyer-meta-label">QA Role</span>
                      <span className="qa-buyer-meta-val">Quality Assurance Specialist</span>
                      <span className="qa-buyer-meta-sub">Perencanaan skenario &amp; eksekusi testing.</span>
                    </div>

                    <div className="qa-buyer-meta-col">
                      <span className="qa-buyer-meta-label">Tools &amp; Workflow</span>
                      <span className="qa-buyer-meta-val">Plane · Test Matrix</span>
                      <span className="qa-buyer-meta-sub">Pelacakan issue dan verifikasi bug lifecycle.</span>
                    </div>

                    <div className="qa-buyer-meta-col">
                      <span className="qa-buyer-meta-label">Primary Focus</span>
                      <span className="qa-buyer-meta-val">E2E Buyer Flow &amp; UI</span>
                      <span className="qa-buyer-meta-sub">Search Flow, Validation, dan stabilitas transaksi.</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Simple Realistic iPhone Mockup */}
                <div className="qa-buyer-device-stage">
                  <div
                    className="qa-buyer-iphone"
                    onClick={() => setLightboxIndex(0)}
                    title="Klik untuk memperbesar screenshot (resolusi penuh 430x932)"
                  >
                    <div className="qa-buyer-iphone-screen">
                      <div className="qa-buyer-iphone-island" />
                      <Image
                        src="/images/projects/tenar-buyer/hero.png"
                        alt="Tenar Events Buyer Mobile Interface"
                        width={430}
                        height={932}
                        className="qa-buyer-iphone-img"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Product Screenshots Gallery (Tampilan Produk) - 2x2 Editorial Grid */}
            <div className="qa-buyer-gallery">
              <h3 className="qa-buyer-gallery-title">Tampilan Produk</h3>

              <div className="qa-buyer-gallery-grid">
                {/* Row 1, Item 1: Event Category */}
                <div
                  className="qa-buyer-screenshot-item"
                  onClick={() => setLightboxIndex(1)}
                >
                  <div className="qa-buyer-screenshot-frame">
                    <Image
                      src="/images/projects/tenar-buyer/event-category.png"
                      alt="Event Category"
                      width={360}
                      height={800}
                      className="qa-buyer-screenshot-img"
                      loading="lazy"
                    />
                    <div className="qa-buyer-screenshot-fade" aria-hidden="true" />
                  </div>
                  <div className="qa-buyer-screenshot-caption">
                    <strong className="qa-buyer-screenshot-name">Event Category</strong>
                    <p className="qa-buyer-screenshot-desc">
                      Menampilkan event berdasarkan kategori yang dipilih pengguna.
                    </p>
                  </div>
                </div>

                {/* Row 1, Item 2: Search */}
                <div
                  className="qa-buyer-screenshot-item"
                  onClick={() => setLightboxIndex(2)}
                >
                  <div className="qa-buyer-screenshot-frame">
                    <Image
                      src="/images/projects/tenar-buyer/search.png"
                      alt="Search"
                      width={460}
                      height={1024}
                      className="qa-buyer-screenshot-img"
                      loading="lazy"
                    />
                    <div className="qa-buyer-screenshot-fade" aria-hidden="true" />
                  </div>
                  <div className="qa-buyer-screenshot-caption">
                    <strong className="qa-buyer-screenshot-name">Search</strong>
                    <p className="qa-buyer-screenshot-desc">
                      Pencarian event berdasarkan kata kunci untuk menemukan event yang diinginkan.
                    </p>
                  </div>
                </div>

                {/* Row 2, Item 3: Event Detail */}
                <div
                  className="qa-buyer-screenshot-item"
                  onClick={() => setLightboxIndex(3)}
                >
                  <div className="qa-buyer-screenshot-frame">
                    <Image
                      src="/images/projects/tenar-buyer/event-detail.png"
                      alt="Event Detail"
                      width={265}
                      height={1024}
                      className="qa-buyer-screenshot-img"
                      loading="lazy"
                    />
                    <div className="qa-buyer-screenshot-fade" aria-hidden="true" />
                  </div>
                  <div className="qa-buyer-screenshot-caption">
                    <strong className="qa-buyer-screenshot-name">Event Detail</strong>
                    <p className="qa-buyer-screenshot-desc">
                      Detail event, informasi venue, dan pemilihan tiket.
                    </p>
                  </div>
                </div>

                {/* Row 2, Item 4: Order Summary */}
                <div
                  className="qa-buyer-screenshot-item"
                  onClick={() => setLightboxIndex(4)}
                >
                  <div className="qa-buyer-screenshot-frame">
                    <Image
                      src="/images/projects/tenar-buyer/order-summary.png"
                      alt="Order Summary"
                      width={374}
                      height={1024}
                      className="qa-buyer-screenshot-img"
                      loading="lazy"
                    />
                    <div className="qa-buyer-screenshot-fade" aria-hidden="true" />
                  </div>
                  <div className="qa-buyer-screenshot-caption">
                    <strong className="qa-buyer-screenshot-name">Order Summary</strong>
                    <p className="qa-buyer-screenshot-desc">
                      Ringkasan data pesanan sebelum tiket diproses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Testing Scenarios (Editorial List with Thin Dividers) */}
            <div className="qa-buyer-scenarios">
              <h3 className="qa-buyer-gallery-title">Skenario Pengujian Kunci</h3>

              <div className="qa-buyer-scenarios-list">
                {[
                  {
                    num: "01",
                    title: "Alur Checkout / Buyer Flow",
                    desc: "Pengujian seleksi kuota tiket, form data pemesan, alur redirect pembayaran, dan verifikasi konfirmasi order.",
                  },
                  {
                    num: "02",
                    title: "Cross-Browser & Mobile Responsiveness",
                    desc: "Verifikasi visual dan kelancaran form checkout pada Chrome Android, Safari iOS, dan browser mobile viewports.",
                  },
                  {
                    num: "03",
                    title: "Validation & Edge Cases",
                    desc: "Pengujian penolakan email invalid, pembatasan kuota pesanan, dan pencegahan submission ganda (double-click).",
                  },
                  {
                    num: "04",
                    title: "Search Functionality",
                    desc: "Memastikan query pencarian event menampilkan hasil yang relevan dan akurat secara real-time.",
                  },
                ].map((scenario) => (
                  <div key={scenario.num} className="qa-buyer-scenario-item">
                    <span className="qa-buyer-scenario-num">{scenario.num}</span>
                    <div className="qa-buyer-scenario-content">
                      <strong className="qa-buyer-scenario-title">{scenario.title}</strong>
                      <p className="qa-buyer-scenario-desc">{scenario.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Production Result */}
            <div className="qa-buyer-production-result">
              <p className="qa-buyer-production-desc">
                <strong style={{ color: "var(--success)" }}>Production Live: </strong>
                Zero critical blocker bugs at public launch. Transaksi tiket dan alur e-ticketing beroperasi stabil bagi ribuan pengguna.
              </p>
            </div>

            {/* 5. Final CTA */}
            <div className="qa-buyer-cta">
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
              TENAR ORGANIZER
              Two-column Editorial Layout:
              Left: Laptop Mockup (Dashboard) + 2-Column Supporting Gallery
              Right: Title, Specs, Yang Diuji, Result, CTA
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-project-chapter"
          >
            <div className="qa-organizer-grid">
              {/* LEFT COLUMN: Laptop Mockup (Dashboard) + 2-Column Supporting Gallery */}
              <div className="qa-organizer-visual-col">
                <div className="qa-organizer-visual-wrap">
                  {/* Laptop Mockup: Dashboard */}
                  <div
                    className="qa-laptop-container"
                    onClick={() => setLightboxIndex(5)}
                    title="Klik untuk memperbesar screenshot Tenar Organizer Dashboard (resolusi penuh 1917x971)"
                  >
                    <div className="qa-laptop-frame">
                      {/* Top Screen Lid */}
                      <div className="qa-laptop-lid">
                        <div className="qa-laptop-camera-dot" />
                        <div className="qa-laptop-screen">
                          <Image
                            src="/images/projects/tenar-organizer/hero.png"
                            alt="Tenar Organizer Dashboard Screenshot"
                            width={1917}
                            height={971}
                            className="qa-laptop-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      {/* Bottom Base */}
                      <div className="qa-laptop-base">
                        <div className="qa-laptop-base-notch" />
                      </div>
                    </div>
                    <div className="qa-laptop-caption">
                      <span>Tenar Organizer CMS — Dashboard Overview</span>
                    </div>
                  </div>

                  {/* 2-Column Supporting Gallery: Review / Event Configuration | Order Management */}
                  <div className="qa-organizer-supporting-gallery">
                    {/* Item 1: Review / Event Configuration */}
                    <div
                      className="qa-organizer-supporting-item"
                      onClick={() => setLightboxIndex(6)}
                      title="Klik untuk memperbesar Review / Event Configuration"
                    >
                      <div className="qa-organizer-supporting-frame">
                        <Image
                          src="/images/projects/tenar-organizer/review-configuration.png"
                          alt="Review / Event Configuration"
                          width={967}
                          height={1024}
                          className="qa-organizer-supporting-img"
                          loading="lazy"
                        />
                        <div className="qa-organizer-supporting-fade" aria-hidden="true" />
                      </div>
                      <div className="qa-organizer-supporting-caption">
                        <strong className="qa-organizer-supporting-title">
                          Review / Event Configuration
                        </strong>
                        <p className="qa-organizer-supporting-desc">
                          Konfigurasi event, form buyer dan attendee, serta pengaturan tiket sebelum dipublikasikan.
                        </p>
                      </div>
                    </div>

                    {/* Row 1, Item 2: Order Management */}
                    <div
                      className="qa-organizer-supporting-item"
                      onClick={() => setLightboxIndex(7)}
                      title="Klik untuk memperbesar Order Management"
                    >
                      <div className="qa-organizer-supporting-frame">
                        <Image
                          src="/images/projects/tenar-organizer/order-management.png"
                          alt="Order Management"
                          width={1001}
                          height={1024}
                          className="qa-organizer-supporting-img"
                          loading="lazy"
                        />
                        <div className="qa-organizer-supporting-fade" aria-hidden="true" />
                      </div>
                      <div className="qa-organizer-supporting-caption">
                        <strong className="qa-organizer-supporting-title">
                          Order Management
                        </strong>
                        <p className="qa-organizer-supporting-desc">
                          Pemantauan pesanan, status transaksi, penjualan, dan data order.
                        </p>
                      </div>
                    </div>

                    {/* Row 2, Item 3: Event List */}
                    <div
                      className="qa-organizer-supporting-item qa-organizer-supporting-item--secondary"
                      onClick={() => setLightboxIndex(8)}
                      title="Klik untuk memperbesar Event List"
                    >
                      <div className="qa-organizer-supporting-frame qa-organizer-supporting-frame--secondary">
                        <Image
                          src="/images/projects/tenar-organizer/event-list.png"
                          alt="Event List"
                          width={1024}
                          height={855}
                          className="qa-organizer-supporting-img"
                          loading="lazy"
                        />
                        <div className="qa-organizer-supporting-fade" aria-hidden="true" />
                      </div>
                      <div className="qa-organizer-supporting-caption">
                        <strong className="qa-organizer-supporting-title">
                          Event List
                        </strong>
                        <p className="qa-organizer-supporting-desc">
                          Pengelolaan event yang sudah dipublikasikan dan status event yang sedang aktif.
                        </p>
                      </div>
                    </div>

                    {/* Row 2, Item 4: Ticket Management */}
                    <div
                      className="qa-organizer-supporting-item qa-organizer-supporting-item--secondary"
                      onClick={() => setLightboxIndex(9)}
                      title="Klik untuk memperbesar Ticket Management"
                    >
                      <div className="qa-organizer-supporting-frame qa-organizer-supporting-frame--secondary">
                        <Image
                          src="/images/projects/tenar-organizer/ticket-management.png"
                          alt="Ticket Management"
                          width={1024}
                          height={885}
                          className="qa-organizer-supporting-img"
                          loading="lazy"
                        />
                        <div className="qa-organizer-supporting-fade" aria-hidden="true" />
                      </div>
                      <div className="qa-organizer-supporting-caption">
                        <strong className="qa-organizer-supporting-title">
                          Ticket Management
                        </strong>
                        <p className="qa-organizer-supporting-desc">
                          Pemantauan tiket, data peserta, status tiket, dan proses check-in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Title, Description, Metadata, Yang Diuji, Result, CTA */}
              <div className="qa-organizer-content-col">
                <div style={{ marginBottom: 18 }}>
                  <h2 className="qa-buyer-title" style={{ margin: "0 0 10px" }}>
                    Tenar Organizer
                  </h2>
                  <div className="qa-buyer-subhead">
                    <span className="chip chip-green">Production Live</span>
                    <span className="qa-buyer-category">
                      B2B · Event Organizer CMS
                    </span>
                  </div>
                  <p className="qa-buyer-desc" style={{ marginBottom: 20 }}>
                    Dashboard untuk penyelenggara acara yang digunakan untuk mengelola event, konfigurasi tiket, pesanan, dan data peserta dari satu platform.
                  </p>
                </div>

                {/* Horizontal Metadata Row */}
                <div className="qa-buyer-meta-row" style={{ maxWidth: "100%", marginBottom: 20 }}>
                  <div className="qa-buyer-meta-col">
                    <span className="qa-buyer-meta-label">QA Role</span>
                    <span className="qa-buyer-meta-val">Quality Assurance Specialist</span>
                    <span className="qa-buyer-meta-sub">Pengujian alur pengelolaan event, validasi form dan konfigurasi, serta verifikasi data pesanan dan tiket.</span>
                  </div>

                  <div className="qa-buyer-meta-col">
                    <span className="qa-buyer-meta-label">Tools &amp; Workflow</span>
                    <span className="qa-buyer-meta-val">Plane · API Inspection</span>
                    <span className="qa-buyer-meta-sub">Pelacakan bug, dokumentasi pengujian, dan pemeriksaan respons API.</span>
                  </div>

                  <div className="qa-buyer-meta-col">
                    <span className="qa-buyer-meta-label">Primary Focus</span>
                    <span className="qa-buyer-meta-val">Event, Order &amp; Ticket Management</span>
                    <span className="qa-buyer-meta-sub">Validasi konfigurasi event, alur pesanan, data tiket, dan status transaksi.</span>
                  </div>
                </div>

                {/* Yang Diuji (Numbered Editorial List) */}
                <div className="qa-organizer-paths">
                  <h3 className="qa-organizer-paths-title">
                    Yang Diuji
                  </h3>

                  <div className="qa-organizer-paths-list">
                    {[
                      {
                        num: "01",
                        title: "Event Creation & Configuration",
                        desc: "Memeriksa alur pembuatan event, kelengkapan form, konfigurasi buyer/attendee, serta pengaturan tiket sebelum event dipublikasikan.",
                      },
                      {
                        num: "02",
                        title: "Event Publishing & Management",
                        desc: "Memverifikasi perubahan status event, publish/unpublish, daftar event, dan konsistensi informasi yang ditampilkan.",
                      },
                      {
                        num: "03",
                        title: "Order & Transaction Management",
                        desc: "Memeriksa data pesanan, status transaksi, jumlah tiket, promo, serta ringkasan penjualan pada halaman Order Management.",
                      },
                      {
                        num: "04",
                        title: "Ticket Management & Check-in",
                        desc: "Memverifikasi status tiket, data peserta, face recognition, serta perubahan status tiket dari active, used, hingga expired.",
                      },
                    ].map((scenario) => (
                      <div key={scenario.num} className="qa-organizer-path-item">
                        <span className="qa-organizer-path-num">{scenario.num}</span>
                        <div className="qa-organizer-path-content">
                          <strong className="qa-organizer-path-title">
                            {scenario.title}
                          </strong>
                          <p className="qa-organizer-path-desc">
                            {scenario.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Result */}
                <div className="qa-buyer-production-result" style={{ marginTop: 4, marginBottom: 20 }}>
                  <p className="qa-buyer-production-desc">
                    <strong style={{ color: "var(--success)" }}>Production Live: </strong>
                    Alur utama pengelolaan event, pesanan, dan tiket telah digunakan dalam environment production.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="qa-buyer-cta">
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
              </div>
            </div>
          </motion.article>

          {/* ── SUBSTANTIAL VERTICAL CHAPTER SEPARATION ── */}
          <hr className="qa-chapter-divider" />

          {/* ══════════════════════════════════════════
              PAYMENT GATEWAY MVP
              Subdued visual weight · Zero fabricated screenshots
          ══════════════════════════════════════════ */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={VP}
            variants={vScale}
            className="qa-mvp-chapter"
          >
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", margin: "0 0 10px" }}>
                <h2 style={{ fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 900, letterSpacing: "-.03em", textTransform: "uppercase", color: "var(--text-primary)", lineHeight: 1.15, margin: 0 }}>
                  PAYMENT GATEWAY MVP
                </h2>
                <span className="chip" style={{ fontSize: 11, padding: "3px 10px", background: "rgba(197, 150, 58, 0.12)", borderColor: "rgba(197, 150, 58, 0.30)", color: "var(--warning)" }}>
                  In Progress · Internal R&amp;D
                </span>
              </div>
              <p className="qa-project-overview" style={{ maxWidth: 640, margin: "0 0 18px" }}>
                Pengujian integrasi sistem pembayaran otomatis internal bullions — difokuskan pada ketahanan transaksi, penanganan kegagalan jaringan, dan validasi status webhook.
              </p>
            </div>

            {/* Current Testing Focus - Understated Editorial List */}
            <div style={{ padding: "12px 18px", borderLeft: "2px solid var(--warning)", background: "rgba(197, 150, 58, 0.03)", maxWidth: 540 }}>
              <h3 style={{ fontSize: 12.5, fontWeight: 700, color: "var(--warning)", margin: "0 0 8px", letterSpacing: ".02em" }}>
                Current Testing Focus
              </h3>
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
      <Lightbox
        images={PROJECT_GALLERY}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
        <p style={{ fontSize: 11, color: "rgba(245,240,232,.25)", fontWeight: 500, letterSpacing: ".06em" }}>
          © 2026 Aprillio Bintang Perdana · QA Specialist &amp; Content Creator
        </p>
      </footer>
    </div>
  );
}