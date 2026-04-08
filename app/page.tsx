"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Link as LinkIcon, ArrowRight, CheckCircle2, Award, ExternalLink, Keyboard, Target, MousePointerClick, Clock, Zap, TrendingUp, Medal, Activity, Video, Smartphone, DollarSign, PlayCircle, Code, Camera, Menu, X } from "lucide-react";
import Link from "next/link"; // Tambahkan import Link dari next/link

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    wpm: 121, raw: 125, acc: 97, cons: 79, tests: 666, time: "9h 50m"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.monkeytype.com/users/Aprillio/profile");
        const data = await res.json();
        if (data?.data) {
          const pb = data.data.personalBests?.time?.["15"]?.[0] || data.data.personalBests?.time?.["60"]?.[0];
          const ts = data.data.typingStats;
          if (pb) {
            setStats(prev => ({
              ...prev,
              wpm: Math.floor(pb.wpm) || prev.wpm,
              raw: Math.floor(pb.raw) || prev.raw,
              acc: Math.floor(pb.acc) || prev.acc,
              cons: Math.floor(pb.consistency) || prev.cons,
              tests: ts?.completedTests || prev.tests,
              time: ts?.timeTyping ? `${Math.floor(ts.timeTyping / 3600)}h ${Math.floor((ts.timeTyping % 3600) / 60)}m` : prev.time
            }));
          }
        }
      } catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative bg-neutral-950 text-neutral-50 min-h-screen font-sans selection:bg-blue-500/30 selection:text-white scroll-smooth">
      {/* Efek Spotlight Solid Blue */}
      <div className="absolute top-0 z-0 h-[80vh] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.25),rgba(0,0,0,0))] pointer-events-none"></div>

      {/* Navbar Utama (Home) */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">ABP.</Link>

          {/* Menu Desktop (Gaya Modern Pill) */}
          <div className="hidden md:flex items-center space-x-1 text-sm font-medium text-neutral-400">
            <a href="#about" className="px-4 py-2 rounded-full hover:text-white hover:bg-neutral-800/50 transition-all duration-300">Tentang</a>
            <Link href="/projects" className="px-4 py-2 rounded-full hover:text-white hover:bg-neutral-800/50 transition-all duration-300">Projects</Link>
            <Link href="/creator" className="px-4 py-2 rounded-full hover:text-white hover:bg-neutral-800/50 transition-all duration-300">Portofolio Kreator</Link>
            <a href="#experience" className="px-4 py-2 rounded-full hover:text-white hover:bg-neutral-800/50 transition-all duration-300">Pengalaman</a>
            <a href="#education" className="px-4 py-2 rounded-full hover:text-white hover:bg-neutral-800/50 transition-all duration-300">Pendidikan & Sertifikasi</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden md:block text-sm font-medium bg-neutral-950/50 border border-neutral-700 text-neutral-300 px-6 py-2.5 rounded-full hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300">
              Connect
            </a>
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
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Tentang</a>
              <Link href="/projects" className="text-neutral-300 hover:text-white">Projects</Link>
              <Link href="/creator" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Portofolio Kreator</Link>
              <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pengalaman</a>
              <a href="#education" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pendidikan & Sertifikasi</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-black text-center py-2 rounded-full font-medium mt-2">Connect</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center px-6 max-w-7xl mx-auto pt-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="grid lg:grid-cols-2 gap-12 items-center w-full">
            <div>
              <motion.p variants={fadeInUp} className="text-neutral-400 mb-4 text-sm font-mono tracking-wide uppercase">Portofolio</motion.p>
              <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-white pb-2">
                Aprillio Bintang <br /><span className="text-neutral-500">Perdana.</span>
              </motion.h1>
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-light text-neutral-300 mb-8 leading-snug">
                QA Specialist & <br />Freelance Content Creator.
              </motion.h2>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a href="#experience" className="flex items-center gap-2 border border-neutral-700 rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors">
                  Lihat Pekerjaan <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="hidden lg:block relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
              <img src="/profile.jpg" alt="Aprillio Bintang" className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 border border-white/10 rounded-3xl z-10 pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee */}
        <div className="w-full overflow-hidden bg-neutral-900 py-4 border-y border-neutral-800 flex items-center">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 15, repeat: Infinity }} className="flex whitespace-nowrap text-neutral-500 text-sm font-mono tracking-widest uppercase">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">• Functional Testing • Video Editing • Requirement Analysis • Content Strategy </span>
            ))}
          </motion.div>
        </div>

        {/* About Section */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight text-white">Tentang Saya</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Seorang <strong>Quality Assurance Specialist</strong> yang memiliki ketelitian tinggi dalam pengujian sistem, sekaligus <strong>Freelance Gaming Content Creator</strong> yang kreatif.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Di dunia IT, saya terbiasa menyusun skenario <i>test case</i> secara terstruktur dan memastikan kelancaran aplikasi. Di ranah kreatif, saya aktif memproduksi konten kampanye <i>Honor of Kings</i> yang berorientasi pada analitik audiens dan tren algoritma TikTok.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Saya percaya bahwa logika analitis dari QA dan kreativitas dari pembuatan konten digital dapat dipadukan untuk menghasilkan produk dan strategi kampanye yang berdampak luas.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Keahlian Profesional</h3>
              <div className="flex flex-wrap gap-3">
                {["Functional & UI Testing", "Bug Reporting (Plane)", "Manual API Testing (Postman)", "Requirement Analysis", "Video Editing", "Content Strategy", "Trend Analysis", "Community Engagement"].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-300">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 bg-neutral-900/30 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto">
            <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl font-bold mb-16 tracking-tight text-white">Pengalaman Kerja</motion.h3>
            <div className="space-y-12">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group border-b border-neutral-800 pb-12">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-1 text-neutral-500 font-mono text-sm pt-1 uppercase tracking-widest">Jun 2025 — Present</div>
                  <div className="col-span-3">
                    <h4 className="text-2xl font-semibold text-white mb-2">Quality Assurance Specialist</h4>
                    <p className="text-neutral-400 mb-6 text-lg">PT. BULLION ECOSYSTEM INTERNATIONAL • Bogor</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Pengujian end-to-end sistem event Tenar Buyer & Organizer Phase 2-4 dan dashboard Payment Gateway MVP - Phase 2.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Menyusun dan mengelola puluhan test case secara terstruktur melalui spreadsheet.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Mengidentifikasi dan melaporkan bug menggunakan tools (Plane).</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Berkoordinasi dengan tim developer untuk resolusi isu tepat waktu.</span></li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group border-b border-neutral-800 pb-12">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-1 text-neutral-500 font-mono text-sm pt-1 uppercase tracking-widest">2025 — Present</div>
                  <div className="col-span-3">
                    <h4 className="text-2xl font-semibold text-white mb-2">Freelance Gaming Content Creator</h4>
                    <p className="text-neutral-400 mb-6 text-lg">Honor of Kings (Tencent / TikTok Project) • Remote</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Berhasil menyelesaikan kontrak partnership pembuatan 50 video promosi official Honor of Kings untuk kampanye TikTok.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Aktif memproduksi konten eksklusif di dalam HoK Creator Camp dengan pencapaian jutaan penayangan akumulatif.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Secara konsisten melakukan kurasi dan editing klip berkualitas tinggi dari in-game footage serta livestream komunitas.</span></li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group pb-4">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-1 text-neutral-500 font-mono text-sm pt-1 uppercase tracking-widest">Agu 2024 — Jun 2025</div>
                  <div className="col-span-3">
                    <h4 className="text-2xl font-semibold text-white mb-2">Internship Monitoring Server</h4>
                    <p className="text-neutral-400 mb-6 text-lg">PT. BULLION ECOSYSTEM INTERNATIONAL • Bogor</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Melakukan monitoring sistem produksi secara berkala.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Menganalisis berbagai jenis error transaksi dan menangani kendala operasional.</span></li>
                      <li className="flex items-start gap-3 text-neutral-300 font-light leading-relaxed"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-1" /><span>Mendokumentasikan hasil monitoring ke dalam laporan teknis.</span></li>
                    </ul>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

{/* Education Section - Brighter & Mobile-Friendly Logos */}
        <section id="education" className="py-32 px-6 max-w-7xl mx-auto relative">
          
          <motion.h3 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} 
            className="text-4xl font-bold mb-16 tracking-tight text-white relative z-10"
          >
            Pendidikan & Sertifikasi
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
            {[
              { 
                year: "Agu 2025 — Jul 2029 (Expected)", 
                title: "S1 Sistem Informasi", 
                school: "Universitas Terbuka", 
                link: "https://www.ut.ac.id/",
                logo: "/images/logo-ut.png" 
              },
              { 
                year: "Jan 2026 — Jun 2030 (Expected)", 
                title: "S1 Manajemen", 
                school: "Univ. Siber Muhammadiyah", 
                link: "https://sibermu.ac.id/",
                logo: "/images/logo-mu.png"
              },
              { 
                year: "Jun 2022 — Jun 2024", 
                title: "Rekayasa Perangkat Lunak", 
                school: "SMK Negeri 4 Kendal", 
                link: "https://smkn4kendal.sch.id/",
                logo: "/images/logo-smk.png"
              }
            ].map((edu, index) => (
              <motion.a 
                key={index}
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                className="group relative bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-neutral-900/80 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* 1. Watermark Logo - Visibilitas Ditingkatkan (Brighter Base & Full Hover) */}
                <div className="absolute -right-1 -bottom-1 w-48 h-48 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <img 
                    src={edu.logo} 
                    alt={`Logo ${edu.school}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* 2. Efek Cahaya Sudut saat Hover */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
                
                {/* 3. Konten Teks (relative z-10 agar di atas logo) */}
                <div className="relative z-10">
                  <div className="text-neutral-500 font-mono text-xs mb-4 flex justify-between items-center">
                    <span>{edu.year}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all text-blue-400" />
                  </div>
                  {/* Warna Teks Judul dibuat lebih terang (dari pb-2 ke pb-0 agar seragam) */}
                  <h4 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors tracking-tight">{edu.title}</h4>
                  <p className="text-neutral-300 font-medium text-lg">{edu.school}</p>
                  
                  {/* Indikator Klik */}
                  <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-blue-500/0 group-hover:text-blue-500/100 transition-all duration-500">
                    Visit Website <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div id="certificates" className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Explore the possibilities with Microsoft 365 Copilot", issuer: "Microsoft", date: "April 2026", file: "/cert-copilot.pdf" },
              { title: "Pelatihan Dasar Microsoft 365 Copilot", issuer: "Jobstreet & Microsoft", date: "April 2026", file: "/cert-jobstreet-copilot.pdf" },
              { title: "Sertifikat Analisis Data Excel", issuer: "Microsoft & Jobstreet", date: "April 2026", file: "/cert-excel.pdf" },
              { title: "QA Test Technique", issuer: "MySkill", date: "April 2026", file: "/cert-qa-technique.pdf" },
              { title: "Quality Assurance Introduction", issuer: "MySkill", date: "Februari 2025", file: "/cert-qa-intro.pdf" }
            ].map((cert, index) => (
              <motion.a href={cert.file} target="_blank" rel="noopener noreferrer" key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group relative flex items-start gap-4 p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-neutral-500 transition-all overflow-hidden">
                <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl group-hover:scale-110 transition-transform"><Award className="w-6 h-6 text-neutral-300" /></div>
                <div className="pr-8">
                  <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                  <p className="text-neutral-400 text-sm mb-2">{cert.issuer}</p>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">{cert.date}</span>
                </div>
                <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all" />
              </motion.a>
            ))}
          </div>
        </section>

        {/* Monkeytype Dashboard (Dipindah ke sini) */}
        <section id="metrics" className="py-24 px-6 bg-[#0a0a0a] border-y border-neutral-900 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div className="flex items-center gap-3">
                <Keyboard className="w-6 h-6 text-neutral-400" />
                <h3 className="text-2xl font-bold tracking-tight text-neutral-200">Typing Performance</h3>
              </div>
              <a href="https://monkeytype.com/profile/Aprillio" target="_blank" rel="noreferrer" className="text-sm font-mono text-neutral-400 bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800 hover:text-white transition-all flex items-center gap-2">
                <Activity className="w-4 h-4" /> Live Profile
              </a>
            </div>
            {/* Grid 6 Kotak (3 Kolom x 2 Baris) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {[
                { icon: Keyboard, label: "Best WPM", value: stats.wpm },
                { icon: Zap, label: "Raw WPM", value: stats.raw },
                { icon: Target, label: "Accuracy", value: `${stats.acc}%` },
                { icon: Activity, label: "Consistency", value: `${stats.cons}%` },
                { icon: MousePointerClick, label: "Tests", value: stats.tests },
                { icon: Clock, label: "Time", value: stats.time },
              ].map((item) => (
                <div key={item.label} className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-700 transition-colors">
                  <div className="p-3 bg-[#1e1e1e] rounded-xl">
                    <item.icon className="w-6 h-6 text-neutral-300" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white tracking-tighter">{item.value}</h4>
                    <p className="text-sm font-medium text-neutral-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONNECT WITH ME SECTION */}
        <section id="contact" className="relative py-32 px-6 bg-neutral-950 overflow-hidden">
          {/* Efek Spotlight Biru Halus dari Bawah */}
          <div className="absolute bottom-0 left-0 z-0 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(59,130,246,0.15),rgba(0,0,0,0))] pointer-events-none"></div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-4xl mx-auto text-center">
            <h3 className="text-5xl md:text-6xl font-bold mb-8 text-white tracking-tighter">Connect With Me.</h3>
            <p className="text-neutral-400 text-lg mb-12 max-w-2xl mx-auto">
              Selalu terbuka untuk tawaran profesional, kolaborasi QA, maupun partnership pembuatan konten digital game. Let's build something great together.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a href="https://github.com/aprilliobintang455-boop" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-neutral-900 border border-neutral-800 hover:border-white rounded-full transition-all group">
                <Code className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                <span className="font-semibold text-neutral-300 group-hover:text-white">GitHub</span>
              </a>

              <a href="https://linkedin.com/in/aprilliobintang" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-neutral-900 border border-neutral-800 hover:border-[#0a66c2] rounded-full transition-all group">
                <LinkIcon className="w-5 h-5 text-neutral-400 group-hover:text-[#0a66c2]" />
                <span className="font-semibold text-neutral-300 group-hover:text-white">LinkedIn</span>
              </a>

              <a href="https://www.tiktok.com/@scarawanderr" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-neutral-900 border border-neutral-800 hover:border-[#fe2c55] rounded-full transition-all group">
                <Video className="w-5 h-5 text-neutral-400 group-hover:text-[#fe2c55]" />
                <span className="font-semibold text-neutral-300 group-hover:text-white">TikTok</span>
              </a>

              <a href="https://www.instagram.com/aprillio.bintang/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-neutral-900 border border-neutral-800 hover:border-[#e1306c] rounded-full transition-all group">
                <Camera className="w-5 h-5 text-neutral-400 group-hover:text-[#e1306c]" />
                <span className="font-semibold text-neutral-300 group-hover:text-white">Instagram</span>
              </a>

              <a href="mailto:aprilliobintang455@gmail.com" className="flex items-center gap-3 px-6 py-4 bg-white text-black hover:bg-neutral-200 rounded-full transition-all group">
                <Mail className="w-5 h-5" />
                <span className="font-bold text-black">Email Me</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-8 text-center text-neutral-600 text-sm bg-[#0a0a0a]">
        <p>© {new Date().getFullYear()} Aprillio Bintang Perdana.</p>
      </footer>
    </div>
  );
}