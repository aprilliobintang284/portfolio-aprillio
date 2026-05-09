"use client";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, ShieldCheck, CheckCircle2, Bug, Lock, Server } from "lucide-react";
import Navbar from "../components/Navbar";

const v: Variants = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.70,ease:[.22,1,.36,1]}} };
const s: Variants = { show:{transition:{staggerChildren:.09}} };
const W = { maxWidth:960, margin:"0 auto", padding:"0 24px" };

export default function Projects() {
  return (
    <div style={{minHeight:"100vh",position:"relative"}}>
      <div className="bg-scene bg-scene-amber"/>
      <Navbar/>
      <main style={{paddingTop:"clamp(108px,14vw,160px)",paddingBottom:120}}>
        <div style={W}>

          {/* Header */}
          <motion.div initial="hidden" animate="show" variants={s}
            style={{textAlign:"center",maxWidth:560,margin:"0 auto 80px"}}>
            <motion.span variants={v} className="eyebrow" style={{marginBottom:16}}>QA Projects</motion.span>
            <motion.div variants={v} style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{padding:14,borderRadius:18,background:"rgba(249,115,22,.12)",border:"1px solid rgba(249,115,22,.22)"}}>
                <ShieldCheck style={{width:24,height:24,color:"#f97316"}}/>
              </div>
            </motion.div>
            <motion.h1 variants={v} className="grad-amber"
              style={{fontWeight:900,fontSize:"clamp(32px,5vw,58px)",letterSpacing:"-.03em",lineHeight:1.1,marginBottom:20}}>
              QA Testing Projects.
            </motion.h1>
            <motion.p variants={v} style={{fontSize:14,lineHeight:1.6,color:"rgba(245,240,232,.45)"}}>
              Sebagai <strong style={{color:"rgba(245,240,232,.78)"}}>Quality Assurance Specialist</strong>, saya memastikan setiap fungsionalitas berjalan sempurna sebelum menyentuh pengguna akhir.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20,marginBottom:20}}>
            {[
              {href:"https://tenar.events/",title:"Tenar Events (Buyer)",
               desc:"Platform pencarian & pembelian tiket event bagi pengguna akhir (B2C). Fokus pada kelancaran alur checkout, fungsionalitas pencarian, dan keamanan transaksi.",
               items:[{I:CheckCircle2,t:"End-to-End Testing alur pembelian tiket."},{I:Bug,t:"UI/UX Cross-browser testing (Mobile & Desktop)."},{I:Server,t:"Fungsionalitas filter pencarian event aktif."}]},
              {href:"https://organizer.tenar.events/",title:"Tenar Organizer",
               desc:"Dashboard CMS eksklusif bagi penyelenggara event (B2B). Mengelola pembuatan event, manajemen kuota tiket, hingga analitik penjualan.",
               items:[{I:CheckCircle2,t:"Validasi input pembuatan event (Form Validation)."},{I:Bug,t:"Reporting bug integrasi API melalui Plane."},{I:Lock,t:"Pengujian Role-Based Access Control (RBAC)."}]},
            ].map((p,i)=>(
              <motion.div key={i} initial="hidden" animate="show" variants={v} className="g-card" style={{padding:32,display:"flex",flexDirection:"column" as const}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#f97316,#fbbf24)"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
                  <span className="chip chip-green">Production Live</span>
                  <a href={p.href} target="_blank" rel="noreferrer"
                    style={{padding:10,borderRadius:"50%",background:"rgba(249,115,22,.10)",border:"1px solid rgba(249,115,22,.20)",color:"#f97316",display:"flex",cursor:"none"}}>
                    <ExternalLink style={{width:16,height:16}}/>
                  </a>
                </div>
                <h2 style={{fontSize:22,fontWeight:900,color:"rgba(245,240,232,.90)",marginBottom:12}}>{p.title}</h2>
                <p style={{fontSize:13.5,lineHeight:1.6,color:"rgba(245,240,232,.48)",marginBottom:24,flex:1}}>{p.desc}</p>
                <div style={{paddingTop:20,borderTop:"1px solid rgba(249,115,22,.09)"}}>
                  <p style={{fontSize:10,fontWeight:700,color:"rgba(245,240,232,.28)",letterSpacing:".14em",textTransform:"uppercase" as const,marginBottom:12}}>QA Scope</p>
                  <ul style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                    {p.items.map(({I,t},j)=>(
                      <li key={j} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:13,color:"rgba(245,240,232,.52)"}}>
                        <I style={{width:15,height:15,color:"#f97316",flexShrink:0,marginTop:2}}/>{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* WIP */}
          <motion.div initial="hidden" animate="show" variants={v} className="g-card"
            style={{padding:56,textAlign:"center",background:"rgba(255,255,255,.02)",border:"1.5px dashed rgba(249,115,22,.16)"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{padding:14,borderRadius:18,background:"rgba(249,115,22,.09)",border:"1px solid rgba(249,115,22,.18)"}}>
                <Lock style={{width:24,height:24,color:"#f97316"}}/>
              </div>
            </div>
            <h2 style={{fontSize:20,fontWeight:900,color:"rgba(245,240,232,.45)",marginBottom:10}}>Payment Gateway MVP</h2>
            <p style={{fontSize:13.5,lineHeight:1.6,color:"rgba(245,240,232,.32)",maxWidth:420,margin:"0 auto 20px"}}>
              Pengujian integrasi sistem pembayaran otomatis. Masih dalam tahap <strong style={{color:"rgba(245,240,232,.48)"}}>development</strong> internal.
            </p>
            <span className="chip">In Progress</span>
          </motion.div>
        </div>
      </main>

      <footer style={{padding:"32px 24px",textAlign:"center",borderTop:"1px solid rgba(249,115,22,.08)",background:"rgba(255,255,255,.015)"}}>
        <p style={{fontSize:11,color:"rgba(245,240,232,.22)",fontWeight:600,letterSpacing:".16em",textTransform:"uppercase" as const}}>
          © {new Date().getFullYear()} Aprillio Bintang Perdana &nbsp;·&nbsp; Crafted with ✦
        </p>
      </footer>
    </div>
  );
}