"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, ShieldCheck, Bug, CheckCircle2, Server, Lock, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
<div className="relative bg-neutral-950 text-neutral-50 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Efek Spotlight Halus di Background */}
      <div className="absolute top-0 z-0 h-[80vh] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(0,0,0,0))] pointer-events-none"></div>

      {/* Navbar Khusus Page Project */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">ABP.</Link>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-400">
            <Link href="/#about" className="hover:text-white transition-colors">Tentang</Link>
            <Link href="/projects" className="text-white border-b border-white pb-1">Projects</Link>
            <Link href="/creator" className="hover:text-white transition-colors">Portofolio Kreator</Link>
            <Link href="/#experience" className="hover:text-white transition-colors">Pengalaman</Link>
            <Link href="/#education" className="hover:text-white transition-colors">Pendidikan & Sertifikasi</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hidden md:flex text-sm font-medium items-center gap-2 bg-neutral-900 border border-neutral-800 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>

            {/* Tombol Hamburger Khusus Mobile */}
            <button className="md:hidden text-neutral-300 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 flex flex-col py-4 px-6 gap-4 shadow-xl"
            >
              <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Tentang</Link>
              <Link href="/projects" className="text-white font-bold">Projects</Link>
              <Link href="/creator" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Portofolio Kreator</Link><Link href="/#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pengalaman</Link>
              <Link href="/#education" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pendidikan & Sertifikasi</Link>
              <Link href="/" className="bg-white text-black flex items-center justify-center gap-2 py-2 rounded-full font-medium mt-2">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        {/* Header Section (Tema Soft Amethyst) */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent pb-2">QA Testing Projects.</h1>
          </div>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Sebagai seorang <strong>Quality Assurance Specialist</strong>, tanggung jawab utama saya adalah memastikan setiap fungsionalitas, alur sistem, dan <strong>User Interface</strong> berjalan tanpa hambatan sebelum menyentuh pengguna akhir. 
            Berikut adalah rekam jejak platform <strong>live</strong> maupun <strong>development</strong> yang telah melewati fase pengujian dan dokumentasi <strong>bug</strong> komprehensif dari saya.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Project 1: Tenar Events (Production) */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/40 hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:-translate-y-1 transition-all duration-500 group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-mono uppercase tracking-widest rounded-full">Production Live</span>
              <a href="https://tenar.events/" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Tenar Events (Buyer)</h3>
            <p className="text-neutral-400 mb-8 flex-grow">
              Platform utama pencarian dan pembelian tiket event bagi pengguna akhir (B2C). Fokus pengujian pada kelancaran alur <strong>checkout</strong>, fungsionalitas pencarian, dan keamanan transaksi <strong>user.</strong>
            </p>
            
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Fokus Pengujian (QA Scope):</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-neutral-400"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> End-to-End Testing alur pembelian tiket.</li>
                <li className="flex items-start gap-3 text-sm text-neutral-400"><Bug className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> UI/UX Cross-browser testing (Mobile & Desktop).</li>
                <li className="flex items-start gap-3 text-sm text-neutral-400"><Server className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Fungsionalitas filter pencarian event aktif.</li>
              </ul>
            </div>
          </motion.div>

          {/* Project 2: Tenar Organizer */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/40 hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:-translate-y-1 transition-all duration-500 group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-mono uppercase tracking-widest rounded-full">Production Live</span>
              <a href="https://organizer.tenar.events/" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Tenar Organizer</h3>
            <p className="text-neutral-400 mb-8 flex-grow">
              Dashboard <strong>Content Management System (CMS)</strong> eksklusif bagi penyelenggara event (B2B). Mengelola pembuatan event, manajemen kuota tiket, hingga analitik penjualan.
            </p>
            
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Fokus Pengujian (QA Scope):</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-sm text-neutral-400"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Validasi input pembuatan event (Form Validation).</li>
                <li className="flex items-start gap-3 text-sm text-neutral-400"><Bug className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Reporting bug integrasi API melalui Plane.</li>
                <li className="flex items-start gap-3 text-sm text-neutral-400"><Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" /> Pengujian Role-Based Access Control (RBAC).</li>
              </ul>
            </div>
          </motion.div>

          {/* Project 3: Payment Gateway (Coming Soon) */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="bg-neutral-950 border border-neutral-800 border-dashed rounded-3xl p-8 hover:border-indigo-500/30 transition-colors duration-500 flex flex-col justify-center items-center text-center lg:col-span-2 py-16">
            <div className="p-4 bg-neutral-900 rounded-full mb-4">
              <Lock className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-400 mb-2">Payment Gateway MVP </h3>
            <p className="text-neutral-600 max-w-lg mx-auto mb-4">
              Pengujian integrasi sistem pembayaran otomatis. Saat ini masih dalam tahap <strong>development</strong> internal dan persiapan rilis ke <strong>production</strong>.
            </p>
            <span className="px-4 py-1.5 bg-neutral-900 text-neutral-500 text-xs font-mono uppercase tracking-widest rounded-full">In Progress</span>
          </motion.div>

        </div>
      </main>

      <footer className="border-t border-neutral-900 py-8 text-center text-neutral-700 text-xs bg-[#0a0a0a]">
        <p>© {new Date().getFullYear()} Aprillio Bintang Perdana.</p>
      </footer>
    </div>
  );
}