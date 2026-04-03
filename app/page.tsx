"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Mail, Phone, MapPin, Link, ArrowRight, CheckCircle2, Award, ExternalLink, Keyboard, Target, MousePointerClick, Clock, Zap, TrendingUp, Medal, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState({
    wpm: 121, raw: 125, acc: 97, cons: 79, tests: 666, time: "9h 50m"
  });

  useEffect(() => {
    setIsMounted(true);
    
    // Inisialisasi Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Fetch Monkeytype Data
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.monkeytype.com/users/Aprillio/profile");
        const data = await res.json();
        if (data && data.data) {
          const pb = data.data.personalBests?.time?.["15"]?.[0] || data.data.personalBests?.time?.["60"]?.[0];
          const typingStats = data.data.typingStats;
          
          if (pb) {
            setStats(prev => ({
              ...prev,
              wpm: Math.floor(pb.wpm) || prev.wpm,
              raw: Math.floor(pb.raw) || prev.raw,
              acc: Math.floor(pb.acc) || prev.acc,
              cons: Math.floor(pb.consistency) || prev.cons,
              tests: typingStats?.completedTests || prev.tests,
              time: typingStats?.timeTyping ? `${Math.floor(typingStats.timeTyping / 3600)}h ${Math.floor((typingStats.timeTyping % 3600) / 60)}m` : prev.time
            }));
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data Monkeytype:", err);
      }
    };

    fetchStats();

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => lenis.destroy();
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // Data Grafik dummy agar sesuai dengan desain gambar
  const wpmData = [
    { name: "T1", wpm: 85 }, { name: "T2", wpm: 110 }, { name: "T3", wpm: 75 },
    { name: "T4", wpm: 65 }, { name: "T5", wpm: 121 }
  ];

  const accData = [
    { name: "T1", acc: 98, cons: 65 }, { name: "T2", acc: 100, cons: 79 },
    { name: "T3", acc: 92, cons: 66 }, { name: "T4", acc: 93, cons: 64 },
    { name: "T5", acc: 97, cons: 70 }
  ];

  return (
    <div className="bg-neutral-950 text-neutral-50 min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-2xl font-light tracking-widest text-neutral-300">
              APRILLIO BINTANG
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight">ABP.</div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">Tentang</a>
            <a href="#metrics" className="hover:text-white transition-colors">Metrics</a>
            <a href="#experience" className="hover:text-white transition-colors">Pengalaman</a>
            <a href="#education" className="hover:text-white transition-colors">Pendidikan</a>
            <a href="#certificates" className="hover:text-white transition-colors">Sertifikat</a>
          </div>
          <a href="#contact" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">Hubungi Saya</a>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.p variants={fadeInUp} className="text-neutral-400 mb-4 text-lg tracking-wide uppercase">Portfolio Profesional</motion.p>
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
              Aprillio Bintang <br /><span className="text-neutral-500">Perdana.</span>
            </motion.h1>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl font-light text-neutral-300 mb-8">Quality Assurance Specialist.</motion.h2>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <a href="#experience" className="flex items-center gap-2 border border-neutral-700 rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors">
                Lihat Pekerjaan <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee */}
        <div className="w-full overflow-hidden bg-neutral-900 py-4 border-y border-neutral-800 flex items-center">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 15, repeat: Infinity }} className="flex whitespace-nowrap text-neutral-500 text-sm font-mono tracking-widest uppercase">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">• Functional Testing • UI Testing • Requirement Analysis • Bug Reporting </span>
            ))}
          </motion.div>
        </div>

        {/* About Section */}
        <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight">Tentang Saya</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Saya memiliki pengalaman dalam pengujian sistem, pengolahan data, dan pembuatan laporan melalui peran sebagai Quality Assurance. Saya terbiasa menyusun dokumentasi secara terstruktur, menggunakan spreadsheet untuk pengolahan data, serta memastikan kualitas dan akurasi dalam setiap pekerjaan.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed">
                Memiliki ketelitian tinggi dan mampu bekerja secara tim maupun individu dalam mendukung operasional perusahaan.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Keahlian Utama</h3>
              <div className="flex flex-wrap gap-3">
                {["Functional & UI Testing", "Test Case Creation", "Bug Reporting (Plane)", "Data Testing & Skenario", "Manual API Testing (Postman)", "Requirement Analysis", "Problem Solving", "Log Analysis (Google Cloud)"].map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-300">{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Monkeytype Dashboard Section (NEW) */}
        <section id="metrics" className="py-24 px-6 bg-[#0a0a0a] border-y border-neutral-900 overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div className="flex items-center gap-3">
                <Keyboard className="w-6 h-6 text-neutral-400" />
                <h3 className="text-2xl font-bold tracking-tight text-neutral-200">MonkeyType Performance</h3>
              </div>
              <a href="https://monkeytype.com/profile/Aprillio" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-mono text-neutral-400 bg-neutral-900 px-4 py-2 rounded-full border border-neutral-800 hover:text-white hover:border-neutral-500 transition-all">
                <Activity className="w-4 h-4" /> Last 10 Tests
              </a>
            </div>

            {/* Top Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><Keyboard className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.wpm}</h4>
                  <p className="text-sm font-semibold text-neutral-400">Best WPM</p>
                  <p className="text-xs text-neutral-500 mt-1">Avg: 94 WPM</p>
                </div>
              </div>
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><Target className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.acc}%</h4>
                  <p className="text-sm font-semibold text-neutral-400">Best Accuracy</p>
                  <p className="text-xs text-neutral-500 mt-1">Consistency: {stats.cons}%</p>
                </div>
              </div>
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><MousePointerClick className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.tests}</h4>
                  <p className="text-sm font-semibold text-neutral-400">Tests Completed</p>
                  <p className="text-xs text-neutral-500 mt-1">20% completion</p>
                </div>
              </div>
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><Clock className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.time}</h4>
                  <p className="text-sm font-semibold text-neutral-400">Time Typing</p>
                  <p className="text-xs text-neutral-500 mt-1">3.3K started</p>
                </div>
              </div>
            </div>

            {/* Second Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><Zap className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.raw}</h4>
                  <p className="text-sm font-semibold text-neutral-400">Best Raw WPM</p>
                  <p className="text-xs text-neutral-500 mt-1">Uncorrected speed</p>
                </div>
              </div>
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><TrendingUp className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">94</h4>
                  <p className="text-sm font-semibold text-neutral-400">Average WPM</p>
                  <p className="text-xs text-neutral-500 mt-1">Across all tests</p>
                </div>
              </div>
              <div className="bg-[#121212] border border-[#222] p-5 rounded-2xl flex items-center gap-5 hover:border-neutral-600 transition-colors">
                <div className="p-3 bg-[#1e1e1e] rounded-xl"><Medal className="w-6 h-6 text-neutral-300" /></div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stats.cons}%</h4>
                  <p className="text-sm font-semibold text-neutral-400">Best Consistency</p>
                  <p className="text-xs text-neutral-500 mt-1">Typing stability</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            {isMounted && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Line Chart */}
                <div className="bg-[#121212] border border-[#222] p-6 rounded-2xl hover:border-neutral-600 transition-colors">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-neutral-300" />
                    <h4 className="text-lg font-bold text-white">WPM Progress</h4>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wpmData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                        <Line type="monotone" dataKey="wpm" stroke="#ffffff" strokeWidth={3} dot={{ r: 5, fill: '#ffffff' }} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-[#121212] border border-[#222] p-6 rounded-2xl hover:border-neutral-600 transition-colors">
                  <div className="flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5 text-neutral-300" />
                    <h4 className="text-lg font-bold text-white">Accuracy & Consistency</h4>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={accData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} cursor={{ fill: '#222' }} />
                        <Bar dataKey="acc" fill="#ffffff" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cons" fill="#525252" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl font-bold mb-16 tracking-tight">Pengalaman Profesional</motion.h3>
            <div className="space-y-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group border-b border-neutral-800 pb-12">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-1 text-neutral-500 font-mono text-sm pt-1">Jun 2025 — Sekarang</div>
                  <div className="col-span-3">
                    <h4 className="text-2xl font-semibold text-white mb-2">Quality Assurance</h4>
                    <p className="text-neutral-400 mb-6 text-lg">PT. BULLION ECOSYSTEM INTERNATIONAL • Bogor, Jawa Barat</p>
                    <ul className="space-y-3">
                      {["Melakukan pengujian pada berbagai sistem (Event Platform, Dashboard Payment Gateway).", "Melakukan pengujian end-to-end.", "Menyusun dan mengelola puluhan test case.", "Mengidentifikasi dan melaporkan bug menggunakan tools (Plane).", "Berkoordinasi dengan tim developer."].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-300"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group border-b border-neutral-800 pb-12">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="col-span-1 text-neutral-500 font-mono text-sm pt-1">Agu 2024 — Jun 2025</div>
                  <div className="col-span-3">
                    <h4 className="text-2xl font-semibold text-white mb-2">Internship Monitoring Server</h4>
                    <p className="text-neutral-400 mb-6 text-lg">PT. BULLION ECOSYSTEM INTERNATIONAL • Bogor, Jawa Barat</p>
                    <ul className="space-y-3">
                      {["Melakukan monitoring sistem produksi secara berkala.", "Menganalisis berbagai jenis error transaksi.", "Menangani dan melaporkan kendala operasional.", "Mendokumentasikan hasil monitoring."].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-300"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 px-6 max-w-7xl mx-auto border-t border-neutral-900">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl font-bold mb-16 tracking-tight">Pendidikan</motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-neutral-600 transition-colors">
              <div className="text-neutral-500 font-mono text-sm mb-4">Agu 2025 — Jul 2029 (Expected)</div>
              <h4 className="text-xl font-bold mb-2">Bachelor of Information Systems</h4>
              <p className="text-neutral-400 mb-4">Universitas Terbuka • Bogor</p>
            </motion.div>
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-neutral-600 transition-colors">
              <div className="text-neutral-500 font-mono text-sm mb-4">Jan 2026 — Jun 2030 (Expected)</div>
              <h4 className="text-xl font-bold mb-2">Bachelor of Management</h4>
              <p className="text-neutral-400 mb-4">Univ. Siber Muhammadiyah • Yogyakarta</p>
            </motion.div>
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-neutral-600 transition-colors">
              <div className="text-neutral-500 font-mono text-sm mb-4">Jun 2022 — Jun 2024</div>
              <h4 className="text-xl font-bold mb-2">Software Engineering</h4>
              <p className="text-neutral-400 mb-4">SMK Negeri 4 Kendal</p>
              <p className="text-sm text-neutral-500">• Lulus UKK dengan predikat Kompeten<br/>• Peringkat 3 terbaik jurusan RPL</p>
            </motion.div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-32 px-6 bg-neutral-900/30 border-y border-neutral-900">
          <div className="max-w-7xl mx-auto">
            <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-4xl font-bold mb-16 tracking-tight">Sertifikasi Profesional</motion.h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Explore the possibilities with Microsoft 365 Copilot", issuer: "Microsoft", date: "April 2026", file: "/cert-copilot.pdf" },
                { title: "Sertifikat Pelatihan Dasar Microsoft 365 Copilot", issuer: "Jobstreet by SEEK & Microsoft", date: "April 2026", file: "/cert-jobstreet-copilot.pdf" },
                { title: "Sertifikat Analisis Data Excel", issuer: "Microsoft & Jobstreet by SEEK", date: "April 2026", file: "/cert-excel.pdf" },
                { title: "QA Test Technique", issuer: "MySkill", date: "April 2026", file: "/cert-qa-technique.pdf" },
                { title: "Quality Assurance Introduction", issuer: "MySkill", date: "Februari 2025", file: "/cert-qa-intro.pdf" }
              ].map((cert, index) => (
                <motion.a href={cert.file} target="_blank" rel="noopener noreferrer" key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group relative flex items-start gap-4 p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-neutral-500 hover:bg-neutral-900 transition-all cursor-pointer overflow-hidden">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl group-hover:scale-110 transition-transform"><Award className="w-6 h-6 text-neutral-300" /></div>
                  <div className="pr-8">
                    <h4 className="text-lg font-semibold text-white mb-1 leading-snug group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                    <p className="text-neutral-400 text-sm mb-2">{cert.issuer}</p>
                    <span className="text-xs font-mono text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">{cert.date}</span>
                  </div>
                  <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-neutral-950">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="text-5xl font-bold mb-6 tracking-tight">Mari Berkolaborasi.</h3>
              <p className="text-neutral-400 text-lg mb-12">Terbuka untuk peluang baru, diskusi teknologi, atau sekadar berbagi pengalaman seputar Quality Assurance dan Software Engineering.</p>
              <div className="space-y-6">
                <a href="mailto:aprilliobintang455@gmail.com" className="flex items-center gap-4 group">
                  <div className="p-4 bg-neutral-900 rounded-full group-hover:bg-neutral-800 transition-colors"><Mail className="w-6 h-6" /></div>
                  <div><p className="text-sm text-neutral-500">Email</p><p className="text-lg group-hover:text-neutral-300 transition-colors">aprilliobintang455@gmail.com</p></div>
                </a>
                <a href="https://wa.me/6282329713351" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="p-4 bg-neutral-900 rounded-full group-hover:bg-neutral-800 transition-colors"><Phone className="w-6 h-6" /></div>
                  <div><p className="text-sm text-neutral-500">Telepon / WhatsApp</p><p className="text-lg group-hover:text-neutral-300 transition-colors">082329713351</p></div>
                </a>
                <a href="https://linkedin.com/in/aprilliobintang" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="p-4 bg-neutral-900 rounded-full group-hover:bg-neutral-800 transition-colors"><Link className="w-6 h-6" /></div>
                  <div><p className="text-sm text-neutral-500">LinkedIn</p><p className="text-lg group-hover:text-neutral-300 transition-colors">linkedin.com/in/aprilliobintang</p></div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-neutral-900 rounded-full"><MapPin className="w-6 h-6" /></div>
                  <div><p className="text-sm text-neutral-500">Lokasi</p><p className="text-lg">Kendal, Jawa Tengah</p></div>
                </div>
              </div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full h-[400px] md:h-full min-h-[400px] bg-neutral-900 rounded-2xl overflow-hidden relative border border-neutral-800 filter grayscale hover:grayscale-0 transition-all duration-700">
              <iframe src="https://maps.google.com/maps?q=Kendal,%20Jawa%20Tengah&t=&z=12&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0" />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-8 px-6 text-center text-sm text-neutral-600 bg-neutral-950">
        <p>© {new Date().getFullYear()} Aprillio Bintang Perdana. All rights reserved.</p>
      </footer>
    </div>
  );
}