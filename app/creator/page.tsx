"use client";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, PlayCircle, Zap, TrendingUp, Target, Video } from "lucide-react";
import Navbar from "../components/Navbar";

const v: Variants = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:.70,ease:[.22,1,.36,1]}} };
const s: Variants = { show:{transition:{staggerChildren:.09}} };
const W = { maxWidth:960, margin:"0 auto", padding:"0 24px" };

const CAMPAIGNS=[
  {title:"Cinematic Review Milady Swaampser",views:"198,000",href:"https://www.tiktok.com/@scarawanderr/video/7565946037865549063",bar:"linear-gradient(90deg,#ef4444,#f97316)",iconC:"#ef4444",badgeBg:"rgba(239,68,68,.10)",badgeBd:"rgba(239,68,68,.22)",badgeC:"#fca5a5"},
  {title:"Epic Defeated Moment",views:"471,400",href:"https://vt.tiktok.com/ZSHhhM7mg/",bar:"linear-gradient(90deg,#f97316,#fbbf24)",iconC:"#f97316",badgeBg:"rgba(249,115,22,.10)",badgeBd:"rgba(249,115,22,.22)",badgeC:"#fdba74"},
  {title:"the charm of Onic HoK players",views:"367,700",href:"https://www.tiktok.com/@scarawanderr/video/7510189240261643528",bar:"linear-gradient(90deg,#f59e0b,#fcd34d)",iconC:"#f59e0b",badgeBg:"rgba(245,158,11,.10)",badgeBd:"rgba(245,158,11,.22)",badgeC:"#fde68a"},
];

export default function Creator() {
  return (
    <div style={{minHeight:"100vh",position:"relative"}}>
      <div className="bg-scene bg-scene-red"/>
      <Navbar/>
      <main style={{paddingTop:"clamp(108px,14vw,160px)",paddingBottom:120}}>
        <div style={W}>

          {/* Header */}
          <motion.div initial="hidden" animate="show" variants={s}
            style={{textAlign:"center",maxWidth:560,margin:"0 auto 64px"}}>
            <motion.span variants={v} className="eyebrow" style={{color:"#ef4444",marginBottom:16}}>Creator Portfolio</motion.span>
            <motion.div variants={v} style={{display:"flex",justifyContent:"center",marginBottom:20}}>
              <div style={{padding:14,borderRadius:18,background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.22)"}}>
                <PlayCircle style={{width:24,height:24,color:"#ef4444"}}/>
              </div>
            </motion.div>
            <motion.h1 variants={v} className="grad-red"
              style={{fontWeight:900,fontSize:"clamp(32px,5vw,58px)",letterSpacing:"-.03em",lineHeight:1.1,marginBottom:20}}>
              Digital Content.
            </motion.h1>
            <motion.p variants={v} style={{fontSize:14,lineHeight:1.6,color:"rgba(245,240,232,.45)",marginBottom:28}}>
              Kompilasi performa kampanye sebagai <strong style={{color:"rgba(245,240,232,.78)"}}>Creator Camp Member</strong> resmi untuk game <strong style={{color:"rgba(245,240,232,.78)"}}>Honor of Kings</strong>.
            </motion.p>
            <motion.a variants={v} href="https://www.tiktok.com/@scarawanderr" target="_blank" rel="noreferrer"
              className="btn" style={{background:"linear-gradient(135deg,#ef4444,#f97316)",color:"#fff",boxShadow:"0 6px 28px rgba(239,68,68,.40),inset 0 1px 0 rgba(255,255,255,.20)",display:"inline-flex"}}>
              Kunjungi TikTok <ExternalLink style={{width:16,height:16}}/>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="show" variants={s}
            style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:64}}>
            {[
              {l:"Total Video Views",val:"3.8M",sub:"Massive Reach",I:Zap},
              {l:"Total Likes",val:"245K",sub:"High Engagement",I:TrendingUp},
              {l:"Followers",val:"2.1K",sub:"Niche Gaming Community",I:Target},
            ].map((x,i)=>(
              <motion.div key={i} variants={v} className="g-card" style={{padding:32,textAlign:"center"}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#ef4444,#f97316)"}}/>
                <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
                  <div style={{padding:12,borderRadius:14,background:"rgba(239,68,68,.09)",border:"1px solid rgba(239,68,68,.20)"}}>
                    <x.I style={{width:16,height:16,color:"#ef4444"}}/>
                  </div>
                </div>
                <p style={{fontSize:10,fontWeight:700,color:"rgba(245,240,232,.28)",letterSpacing:".14em",textTransform:"uppercase" as const,marginBottom:8}}>{x.l}</p>
                <p className="grad-red" style={{fontWeight:900,fontSize:"clamp(28px,4vw,44px)",letterSpacing:"-.04em",marginBottom:6}}>{x.val}</p>
                <p style={{fontSize:12,color:"rgba(239,68,68,.70)",fontWeight:600}}>{x.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Campaigns */}
          <motion.div initial="hidden" animate="show" variants={s}>
            <motion.div variants={v} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:32}}>
              <TrendingUp style={{width:16,height:16,color:"#ef4444"}}/>
              <h2 style={{fontSize:24,fontWeight:900,letterSpacing:"-.03em",color:"rgba(245,240,232,.88)"}}>Top Performing Campaigns</h2>
            </motion.div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
              {CAMPAIGNS.map(c=>(
                <motion.div key={c.title} variants={v} className="g-card" style={{padding:24,display:"flex",flexDirection:"column" as const}}>
                  <div className="top-bar" style={{background:c.bar}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                    <div style={{padding:10,borderRadius:12,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.07)"}}>
                      <Video style={{width:16,height:16,color:c.iconC}}/>
                    </div>
                    <a href={c.href} target="_blank" rel="noreferrer"
                      style={{padding:8,borderRadius:"50%",background:c.iconC,color:"#fff",display:"flex",cursor:"none"}}>
                      <ExternalLink style={{width:14,height:14}}/>
                    </a>
                  </div>
                  <h3 style={{fontSize:14,fontWeight:900,color:"rgba(245,240,232,.85)",lineHeight:1.4,marginBottom:16,flex:1}}>{c.title}</h3>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,padding:"7px 14px",borderRadius:10,background:c.badgeBg,border:`1px solid ${c.badgeBd}`,color:c.badgeC}}>
                    <PlayCircle style={{width:13,height:13}}/> {c.views} Views
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer style={{padding:"32px 24px",textAlign:"center",borderTop:"1px solid rgba(239,68,68,.08)",background:"rgba(255,255,255,.015)"}}>
        <p style={{fontSize:11,color:"rgba(245,240,232,.22)",fontWeight:600,letterSpacing:".16em",textTransform:"uppercase" as const}}>
          © {new Date().getFullYear()} Aprillio Bintang Perdana &nbsp;·&nbsp; Crafted with ✦
        </p>
      </footer>
    </div>
  );
}