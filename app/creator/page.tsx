"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, PlayCircle, Zap, TrendingUp, Target, Video, Menu, X } from "lucide-react";
import Link from "next/link";

export default function CreatorPortfolio() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="relative bg-neutral-950 text-neutral-50 min-h-screen font-sans selection:bg-rose-500/30 selection:text-white scroll-smooth">

            {/* Efek Spotlight Soft Crimson/Rose (Vibe TikTok Premium) */}
            <div className="absolute top-0 z-0 h-[80vh] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,29,72,0.15),rgba(0,0,0,0))] pointer-events-none"></div>

            {/* Navbar Khusus Page Creator */}
            <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">ABP.</Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-400">
                        <Link href="/#about" className="hover:text-white transition-colors">Tentang</Link>
                        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <Link href="/creator" className="text-white border-b border-white pb-1">Portofolio Kreator</Link>
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
                            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Projects</Link>
                            <Link href="/creator" className="text-white font-bold">Portofolio Kreator</Link>
                            <Link href="/#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pengalaman</Link>
                            <Link href="/#education" onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-300 hover:text-white">Pendidikan & Sertifikasi</Link>
                            <Link href="/" className="bg-white text-black flex items-center justify-center gap-2 py-2 rounded-full font-medium mt-2">
                                <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-neutral-800 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <PlayCircle className="w-8 h-8 text-rose-500" />
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white pb-2">Digital Content.</h1>
                        </div>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Kompilasi performa kampanye media sosial dan <i>freelance partnership</i> saya sebagai <strong>Creator Camp Member</strong> resmi untuk game <strong>Honor of Kings</strong>. Berfokus pada pengolahan data analitik audiens menjadi konten visual yang menarik.
                        </p>
                    </div>
                    <a href="https://www.tiktok.com/@scarawanderr" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#fe2c55] text-white px-8 py-4 rounded-full hover:bg-[#e0264b] hover:shadow-[0_0_20px_rgba(254,44,85,0.3)] hover:-translate-y-1 transition-all duration-300 font-semibold text-sm shrink-0">
                        Kunjungi TikTok Saya <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>

                {/* Stats Grid */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl hover:border-rose-500/30 hover:bg-neutral-900/60 transition-all duration-500 group">
                        <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">Total Video Views</p>
                        <h4 className="text-6xl font-bold text-white mb-2 tracking-tighter group-hover:text-rose-400 transition-colors">3.8M</h4>
                        <p className="text-xs text-rose-500 flex items-center gap-1"><Zap className="w-3 h-3" /> Massive Account Reach</p>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl hover:border-rose-500/30 hover:bg-neutral-900/60 transition-all duration-500 group">
                        <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">Total Likes</p>
                        <h4 className="text-5xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">245K</h4>
                        <p className="text-xs text-rose-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> High Engagement</p>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl hover:border-rose-500/30 hover:bg-neutral-900/60 transition-all duration-500 group">
                        <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-2">Followers Base</p>
                        <h4 className="text-5xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">2.1K</h4>
                        <p className="text-xs text-neutral-400 flex items-center gap-1"><Target className="w-3 h-3" /> Niche Gaming Community</p>
                    </div>
                </motion.div>

                {/* Campaigns Grid */}
                <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="w-6 h-6 text-rose-500" />
                        <h4 className="text-3xl font-bold text-white tracking-tight">Top Performing Campaigns</h4>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Cinematic Review Milady Swaampser", views: "198,000", link: "https://www.tiktok.com/@scarawanderr/video/7565946037865549063",
                                bgTheme: "bg-[#fe2c55]", textTheme: "text-[#fe2c55]", hoverTheme: "group-hover:text-[#fe2c55]", borderTheme: "hover:border-[#fe2c55]/50"
                            },
                            {
                                title: "Epic Defeated Moment", views: "471,400", link: "https://vt.tiktok.com/ZSHhhM7mg/",
                                bgTheme: "bg-blue-600", textTheme: "text-blue-500", hoverTheme: "group-hover:text-blue-500", borderTheme: "hover:border-blue-500/50"
                            },
                            {
                                title: "the charm of Onic HoK players", views: "367,700", link: "https://www.tiktok.com/@scarawanderr/video/7510189240261643528",
                                bgTheme: "bg-purple-600", textTheme: "text-purple-500", hoverTheme: "group-hover:text-purple-500", borderTheme: "hover:border-purple-500/50"
                            }
                        ].map((vid) => (
                            <div key={vid.title} className={`group bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 ${vid.borderTheme} flex flex-col`}>

                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl w-fit">
                                        <Video className={`w-6 h-6 ${vid.textTheme}`} />
                                    </div>

                                    <a href={vid.link} target="_blank" rel="noreferrer" className={`p-3 rounded-full text-white ${vid.bgTheme} hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>

                                <h5 className={`text-2xl font-bold text-white mb-4 transition-colors ${vid.hoverTheme} flex-grow`}>{vid.title}</h5>

                                <div className="flex items-center gap-2 font-mono text-sm text-neutral-300 font-semibold bg-neutral-950 border border-neutral-800 w-fit px-4 py-2.5 rounded-xl mt-auto">
                                    <PlayCircle className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" /> {vid.views} Views
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </main>

            {/* Efek Spotlight Rose/Merah dari Bawah */}
            <div className="absolute bottom-0 left-0 z-0 h-[60vh] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(225,29,72,0.15),rgba(0,0,0,0))] pointer-events-none"></div>

            <footer className="border-t border-neutral-900 py-8 text-center text-neutral-600 text-sm bg-[#0a0a0a] relative z-10">
                <p>© {new Date().getFullYear()} Aprillio Bintang Perdana.</p>
            </footer>
        </div>
    );
}