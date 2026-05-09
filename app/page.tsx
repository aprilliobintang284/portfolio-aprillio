"use client";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Link as LI, ArrowRight, CheckCircle2, Award, ExternalLink, Keyboard, Target, MousePointerClick, Clock, Zap, Activity, Video, Camera, Code, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";

const v: Variants = { hidden:{opacity:0,y:32}, show:{opacity:1,y:0,transition:{duration:.72,ease:[.22,1,.36,1]}} };
const vScale: Variants = { hidden:{opacity:0,y:24,scale:.97}, show:{opacity:1,y:0,scale:1,transition:{duration:.70,ease:[.22,1,.36,1]}} };
const s: Variants = { hidden:{}, show:{transition:{staggerChildren:.10}} };
const VP = { once: true, margin: "-80px" } as const;

const W = { maxWidth:960, margin:"0 auto", padding:"0 24px" };
const SEC = { padding:"96px 0", position:"relative" as const };
const CARD_STYLE = { padding:"28px", borderRadius:20, background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.075)", boxShadow:"inset 0 1px 0 rgba(255,255,255,.05), 0 4px 24px rgba(0,0,0,.50)", position:"relative" as const, overflow:"hidden" as const };

export default function Home() {
  const [stats, setStats] = useState({wpm:121,raw:125,acc:97,cons:79,tests:666,time:"9h 50m"});
  useEffect(()=>{
    fetch("https://api.monkeytype.com/users/Aprillio/profile").then(r=>r.json()).then(d=>{
      if(!d?.data) return;
      const pb=d.data.personalBests?.time?.["15"]?.[0]; const ts=d.data.typingStats;
      if(pb) setStats({wpm:Math.floor(pb.wpm)||121,raw:Math.floor(pb.raw)||125,acc:Math.floor(pb.acc)||97,cons:Math.floor(pb.consistency)||79,tests:ts?.completedTests||666,time:ts?.timeTyping?`${Math.floor(ts.timeTyping/3600)}h ${Math.floor((ts.timeTyping%3600)/60)}m`:"9h 50m"});
    }).catch(()=>{});
  },[]);

  const edu=[
    {yr:"Agu 2025—Jul 2029",title:"S1 Sistem Informasi",school:"Universitas Terbuka",href:"https://ut.ac.id"},
    {yr:"Jan 2026—Jun 2030",title:"S1 Manajemen",school:"Univ. Siber Muhammadiyah",href:"https://sibermu.ac.id"},
    {yr:"Jun 2022—Jun 2024",title:"Rekayasa Perangkat Lunak",school:"SMK Negeri 4 Kendal",href:"https://smkn4kendal.sch.id"},
  ];
  const certs=[
    {t:"Microsoft 365 Copilot",i:"Microsoft",d:"Apr 2026",f:"/cert-copilot.pdf"},
    {t:"Pelatihan Dasar Copilot",i:"Jobstreet & Microsoft",d:"Apr 2026",f:"/cert-jobstreet-copilot.pdf"},
    {t:"Analisis Data Excel",i:"Microsoft & Jobstreet",d:"Apr 2026",f:"/cert-excel.pdf"},
    {t:"QA Test Technique",i:"MySkill",d:"Apr 2026",f:"/cert-qa-technique.pdf"},
    {t:"Quality Assurance Introduction",i:"MySkill",d:"Feb 2025",f:"/cert-qa-intro.pdf"},
    {t:"Intensive Bootcamp Excel",i:"KarirNex",d:"Apr 2026",f:"/cert-excel-karirnex.pdf"},
  ];
  const st=[
    {I:Keyboard,l:"Best WPM",v:stats.wpm},{I:Zap,l:"Raw WPM",v:stats.raw},
    {I:Target,l:"Accuracy",v:`${stats.acc}%`},{I:Activity,l:"Consistency",v:`${stats.cons}%`},
    {I:MousePointerClick,l:"Tests Done",v:stats.tests},{I:Clock,l:"Time Typed",v:stats.time},
  ];

  return (
    <div style={{minHeight:"100vh",position:"relative"}}>
      <div className="bg-scene"/>
      <Navbar/>
      <main>

        {/* HERO */}
        <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"120px 24px 80px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
            <div style={{position:"absolute",width:480,height:480,borderRadius:"50%",background:"#f97316",filter:"blur(90px)",opacity:.12,top:-80,left:-80}}/>
            <div style={{position:"absolute",width:360,height:360,borderRadius:"50%",background:"#f59e0b",filter:"blur(90px)",opacity:.09,bottom:0,right:-80}}/>
          </div>
          <motion.div initial="hidden" animate="show" variants={s} style={{textAlign:"center",maxWidth:860,width:"100%",position:"relative",zIndex:10}}>
            <motion.div variants={v} style={{display:"inline-flex",alignItems:"center",gap:10,padding:"10px 20px",borderRadius:999,marginBottom:40,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"}}>
              <span style={{position:"relative",display:"flex"}}>
                <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#34d399",opacity:.5,animation:"ping 1s cubic-bezier(0,0,.2,1) infinite"}}/>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#34d399",display:"block"}}/>
              </span>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase" as const,color:"rgba(245,240,232,.55)"}}>Available for Work</span>
              <Sparkles style={{width:12,height:12,color:"#f97316",opacity:.7}}/>
            </motion.div>

            <motion.h1 variants={v} className="glow" style={{fontWeight:900,letterSpacing:"-.03em",lineHeight:1.02,marginBottom:20,fontSize:"clamp(40px,6.5vw,84px)"}}>
              <span style={{color:"rgba(245,240,232,.92)"}}>Aprillio </span>
              <span className="grad-orange">Bintang</span>
              <span style={{color:"rgba(245,240,232,.20)"}}> Perdana.</span>
            </motion.h1>

            <motion.p variants={v} style={{fontSize:11,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase" as const,color:"rgba(245,240,232,.38)",marginBottom:8}}>
              QA Specialist <span style={{opacity:.35,margin:"0 8px"}}>✦</span> Freelance Content Creator
            </motion.p>
            <motion.p variants={v} style={{fontSize:14,color:"rgba(245,240,232,.35)",lineHeight:1.6,marginBottom:44,maxWidth:380,marginLeft:"auto",marginRight:"auto"}}>
              Memastikan sistem berjalan sempurna dan konten memenangkan algoritma.
            </motion.p>

            <motion.div variants={v} style={{display:"flex",flexWrap:"wrap" as const,justifyContent:"center",gap:12,marginBottom:64}}>
              <a href="#experience" className="btn btn-primary">Lihat Pengalaman <ArrowRight style={{width:16,height:16}}/></a>
              <a href="#contact" className="btn btn-ghost">Connect</a>
            </motion.div>

            <motion.div variants={v} style={{display:"inline-flex",flexWrap:"wrap" as const,justifyContent:"center",gap:40,padding:"20px 40px",borderRadius:18,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)"}}>
              {[["3.8M","Total Views"],["50+","Videos"],["666+","QA Tests"],["121 WPM","Typing Speed"]].map(([val,lbl])=>(
                <div key={lbl} style={{textAlign:"center"}}>
                  <p className="grad-orange" style={{fontWeight:900,fontSize:"clamp(18px,2.5vw,26px)",letterSpacing:"-.04em",marginBottom:4}}>{val}</p>
                  <p style={{fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase" as const,color:"rgba(245,240,232,.30)"}}>{lbl}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div style={{overflow:"hidden",padding:"12px 0",borderTop:"1px solid rgba(249,115,22,.07)",borderBottom:"1px solid rgba(249,115,22,.07)",background:"rgba(255,255,255,.02)"}}>
          <div className="marquee-track" style={{display:"flex",whiteSpace:"nowrap" as const,fontSize:10.5,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase" as const,color:"rgba(245,240,232,.20)"}}>
            {[...Array(12)].map((_,i)=><span key={i} style={{margin:"0 40px"}}>✦ Functional Testing ✦ Video Editing ✦ Bug Reporting ✦ API Testing ✦ Content Strategy ✦ TikTok Growth </span>)}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" style={{...SEC}}>
          <div style={W}>
            <span className="section-number">01</span>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}>
              <motion.div variants={v} style={{maxWidth:620,marginBottom:48}}>
                <span className="eyebrow" style={{marginBottom:16}}>01 — Tentang</span>
                <h2 style={{fontWeight:900,fontSize:"clamp(30px,4vw,50px)",letterSpacing:"-.03em",lineHeight:1.08,marginBottom:20}}>
                  Dua Keahlian,<br/><span className="grad-orange">Satu Visi.</span>
                </h2>
                <div style={{display:"flex",flexDirection:"column" as const,gap:12,fontSize:14,lineHeight:1.65,color:"rgba(245,240,232,.45)"}}>
                  <p>Seorang <strong style={{color:"rgba(245,240,232,.80)"}}>Quality Assurance Specialist</strong> dengan ketelitian tinggi, sekaligus <strong style={{color:"rgba(245,240,232,.80)"}}>Freelance Gaming Content Creator</strong> yang kreatif.</p>
                  <p>Di dunia IT, menyusun <em>test case</em> terstruktur dan memastikan kelancaran aplikasi. Di ranah kreatif, memproduksi konten <em>Honor of Kings</em> berorientasi analitik audiens &amp; algoritma TikTok.</p>
                </div>
              </motion.div>
              <div className="grid-2col">
                {[
                  {cat:"QA & Testing", skills:["Functional & UI Testing","Bug Reporting (Plane)","Manual API Testing","Requirement Analysis"], icon:"✓", acBg:"rgba(249,115,22,.12)", acBd:"rgba(249,115,22,.22)", dot:"#f97316", bar:"linear-gradient(90deg,#f97316,#fbbf24)"},
                  {cat:"Content Creation", skills:["Video Editing","Content Strategy","Trend Analysis","Community Engagement"], icon:"▶", acBg:"rgba(239,68,68,.12)", acBd:"rgba(239,68,68,.22)", dot:"#ef4444", bar:"linear-gradient(90deg,#ef4444,#f97316)"},
                ].map(c=>(
                  <motion.div key={c.cat} variants={v} className="g-card" style={{padding:28}}>
                    <div className="top-bar" style={{background:c.bar}}/>
                    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                      <div style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",background:c.acBg,border:`1px solid ${c.acBd}`,fontSize:18,color:c.dot,flexShrink:0}}>{c.icon}</div>
                      <div>
                        <p style={{fontSize:9.5,fontWeight:700,color:"rgba(245,240,232,.28)",letterSpacing:".14em",textTransform:"uppercase" as const,marginBottom:3}}>Category</p>
                        <p style={{fontSize:14,fontWeight:900,color:"rgba(245,240,232,.90)"}}>{c.cat}</p>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                      {c.skills.map(sk=>(
                        <div key={sk} className="skill-pill">
                          <span style={{width:6,height:6,borderRadius:"50%",background:c.dot,flexShrink:0}}/>
                          {sk}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="silk-divider"/>

        {/* EXPERIENCE */}
        <section id="experience" style={{...SEC}}>
          <div style={W}>
            <span className="section-number">02</span>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} style={{marginBottom:48}}>
              <span className="eyebrow" style={{marginBottom:16}}>02 — Pengalaman</span>
              <h2 style={{fontWeight:900,fontSize:"clamp(30px,4vw,50px)",letterSpacing:"-.03em"}}>
                Rekam <span className="grad-orange">Jejak.</span>
              </h2>
            </motion.div>
            <div style={{display:"flex",flexDirection:"column" as const,gap:16}}>
              {[
                {p:"Jun 2025 — Present",r:"Quality Assurance Specialist",c:"PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor",tag:"Current",tc:"rgba(52,211,153,.10)",tb:"rgba(52,211,153,.25)",tt:"#34d399",
                 i:["End-to-end testing sistem event Tenar Buyer & Organizer Phase 2–4 dan Payment Gateway MVP.","Menyusun dan mengelola puluhan test case terstruktur.","Identifikasi dan pelaporan bug menggunakan Plane.","Koordinasi dengan developer untuk resolusi isu."]},
                {p:"2025 — Present",r:"Freelance Gaming Content Creator",c:"Honor of Kings (Tencent / TikTok) · Remote",tag:"Active",tc:"rgba(249,115,22,.10)",tb:"rgba(249,115,22,.25)",tt:"#fdba74",
                 i:["Menyelesaikan kontrak 50 video promosi official HoK kampanye TikTok.","Aktif di HoK Creator Camp dengan jutaan penayangan akumulatif.","Kurasi & editing klip berkualitas dari in-game footage."]},
                {p:"Agu 2024 — Jun 2025",r:"Internship Monitoring Server",c:"PT. BULLION ECOSYSTEM INTERNATIONAL · Bogor",tag:"Completed",tc:"rgba(255,255,255,.04)",tb:"rgba(255,255,255,.09)",tt:"rgba(245,240,232,.35)",
                 i:["Monitoring sistem produksi secara berkala.","Analisis error transaksi dan penanganan kendala operasional.","Dokumentasi hasil monitoring ke laporan teknis."]},
              ].map((exp,i)=>(
                <motion.div key={i} initial="hidden" whileInView="show" viewport={VP} variants={vScale} className="g-card" style={{padding:32}}>
                  <div className="top-bar"/>
                  <div style={{display:"flex",gap:32,flexWrap:"wrap" as const}}>
                    <div style={{minWidth:160,flexShrink:0,display:"flex",flexDirection:"column" as const,gap:10}}>
                      <span style={{fontSize:11,fontFamily:"monospace",color:"rgba(245,240,232,.32)",lineHeight:1.5}}>{exp.p}</span>
                      <span style={{fontSize:10.5,fontWeight:700,padding:"4px 12px",borderRadius:999,width:"fit-content",background:exp.tc,border:`1px solid ${exp.tb}`,color:exp.tt}}>{exp.tag}</span>
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      <h3 style={{fontSize:18,fontWeight:900,color:"rgba(245,240,232,.92)",marginBottom:6}}>{exp.r}</h3>
                      <p style={{fontSize:12,color:"rgba(245,240,232,.32)",fontWeight:500,marginBottom:20,letterSpacing:".02em"}}>{exp.c}</p>
                      <ul style={{display:"flex",flexDirection:"column" as const,gap:10}}>
                        {exp.i.map((it,j)=>(
                          <li key={j} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:13.5,lineHeight:1.55,color:"rgba(245,240,232,.52)"}}>
                            <CheckCircle2 style={{width:15,height:15,color:"#f97316",flexShrink:0,marginTop:2,opacity:.80}}/>
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <hr className="silk-divider"/>

        {/* EDUCATION */}
        <section id="education" style={{...SEC}}>
          <div style={W}>
            <span className="section-number">03</span>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v} style={{marginBottom:48}}>
              <span className="eyebrow" style={{marginBottom:16}}>03 — Pendidikan</span>
              <h2 style={{fontWeight:900,fontSize:"clamp(30px,4vw,50px)",letterSpacing:"-.03em"}}>
                Pendidikan &amp; <span className="grad-orange">Sertifikasi.</span>
              </h2>
            </motion.div>
            <div className="grid-3col" style={{marginBottom:16}}>
              {edu.map((e,i)=>(
                <motion.a key={i} href={e.href} target="_blank" rel="noopener noreferrer"
                  initial="hidden" whileInView="show" viewport={VP} variants={vScale}
                  className="g-card" style={{padding:24,display:"block",textDecoration:"none"}}>
                  <div className="top-bar"/>
                  <p style={{fontSize:10.5,fontFamily:"monospace",color:"rgba(245,240,232,.28)",marginBottom:14}}>{e.yr}</p>
                  <h3 style={{fontSize:14,fontWeight:900,color:"rgba(245,240,232,.88)",marginBottom:8,lineHeight:1.35}}>{e.title}</h3>
                  <p style={{fontSize:13,color:"rgba(245,240,232,.40)"}}>{e.school}</p>
                </motion.a>
              ))}
            </div>
            <div className="grid-2col-cert">
              {certs.map((c,i)=>(
                <motion.a key={i} href={c.f} target="_blank"
                  initial="hidden" whileInView="show" viewport={VP} variants={vScale}
                  className="g-card" style={{padding:20,display:"flex",alignItems:"flex-start",gap:16,textDecoration:"none",position:"relative"}}>
                  <div className="top-bar"/>
                  {/* External link badge top-right */}
                  <div style={{position:"absolute",top:14,right:14,padding:6,borderRadius:8,background:"rgba(249,115,22,.10)",border:"1px solid rgba(249,115,22,.18)"}}>
                    <ExternalLink style={{width:12,height:12,color:"#f97316"}}/>
                  </div>
                  <div style={{padding:10,borderRadius:12,background:"rgba(249,115,22,.09)",border:"1px solid rgba(249,115,22,.18)",flexShrink:0}}>
                    <Award style={{width:16,height:16,color:"#f97316"}}/>
                  </div>
                  <div style={{flex:1,minWidth:0,paddingRight:28}}>
                    <h4 style={{fontSize:13.5,fontWeight:700,color:"rgba(245,240,232,.85)",marginBottom:4,lineHeight:1.35}}>{c.t}</h4>
                    <p style={{fontSize:11,color:"rgba(245,240,232,.32)",marginBottom:10}}>{c.i}</p>
                    <span style={{fontSize:10.5,fontFamily:"monospace",color:"#f97316",background:"rgba(249,115,22,.09)",border:"1px solid rgba(249,115,22,.15)",padding:"3px 10px",borderRadius:999}}>{c.d}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <hr className="silk-divider"/>

        {/* STATS */}
        <section id="metrics" style={{...SEC, paddingBottom:80}}>
          <div style={W}>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v}
              style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap" as const,gap:16,marginBottom:40}}>
              <div>
                <span className="eyebrow" style={{marginBottom:12}}>Metrics</span>
                <h2 style={{fontWeight:900,fontSize:"clamp(26px,3.5vw,40px)",letterSpacing:"-.03em"}}>
                  Typing <span className="grad-orange">Performance.</span>
                </h2>
              </div>
              <a href="https://monkeytype.com/profile/Aprillio" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                <Activity style={{width:14,height:14}}/> Live Profile
              </a>
            </motion.div>

            {/* Hero WPM card */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={vScale}
              className="g-card"
              style={{padding:"36px 40px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:24,position:"relative"}}>
              <div className="top-bar" style={{background:"linear-gradient(90deg,#f97316,#fbbf24)"}} />
              <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",background:"#f97316",filter:"blur(80px)",opacity:.07,top:"50%",right:-40,transform:"translateY(-50%)",pointerEvents:"none"}}/>
              <div>
                <p style={{fontSize:11,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase" as const,color:"rgba(245,240,232,.30)",marginBottom:8}}>Personal Best · 15s Test</p>
                <p className="grad-orange" style={{fontWeight:900,fontSize:"clamp(56px,8vw,100px)",letterSpacing:"-.05em",lineHeight:1}}>{stats.wpm}</p>
                <p style={{fontSize:14,fontWeight:600,color:"rgba(245,240,232,.45)",marginTop:4}}>Words Per Minute</p>
              </div>
              <div style={{display:"flex",gap:32,flexWrap:"wrap" as const}}>
                {[["Raw WPM",stats.raw],["Accuracy",`${stats.acc}%`],["Consistency",`${stats.cons}%`]].map(([l,val])=>(
                  <div key={l as string} style={{textAlign:"center"}}>
                    <p style={{fontWeight:900,fontSize:"clamp(22px,3vw,32px)",letterSpacing:"-.04em",color:"rgba(245,240,232,.88)"}}>{val}</p>
                    <p style={{fontSize:11,color:"rgba(245,240,232,.32)",fontWeight:500,marginTop:4,letterSpacing:".04em"}}>{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom 2-stat row */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {([
                {Icon:Keyboard,label:"Tests Completed",val:stats.tests,sub:"Selesai diuji"},
                {Icon:Clock,label:"Time Typed",val:stats.time,sub:"Total durasi"},
              ] as {Icon:React.ElementType,label:string,val:string|number,sub:string}[]).map(({Icon,label,val,sub},i)=>(
                <motion.div key={i} initial="hidden" whileInView="show" viewport={VP} variants={vScale}
                  className="g-card"
                  style={{padding:"28px 32px",display:"flex",alignItems:"center",gap:24}}>
                  <div className="top-bar"/>
                  <div style={{padding:14,borderRadius:16,background:"rgba(249,115,22,.09)",border:"1px solid rgba(249,115,22,.18)",flexShrink:0}}>
                    <Icon style={{width:20,height:20,color:"#f97316"}}/>
                  </div>
                  <div>
                    <p style={{fontWeight:900,fontSize:"clamp(24px,3vw,36px)",letterSpacing:"-.04em",color:"rgba(245,240,232,.90)"}}>{val}</p>
                    <p style={{fontSize:12,color:"rgba(245,240,232,.35)",fontWeight:500,marginTop:3}}>{label}</p>
                    <p style={{fontSize:10.5,color:"rgba(249,115,22,.55)",fontWeight:600,marginTop:2,letterSpacing:".04em"}}>{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{padding:"140px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:560,height:560,borderRadius:"50%",background:"#f97316",filter:"blur(110px)",opacity:.10,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}
            style={{maxWidth:600,margin:"0 auto",textAlign:"center",position:"relative",zIndex:10}}>
            <motion.span variants={v} className="eyebrow" style={{marginBottom:20}}>04 — Kontak</motion.span>
            <motion.h2 variants={v} className="glow" style={{fontWeight:900,fontSize:"clamp(40px,7vw,80px)",letterSpacing:"-.04em",lineHeight:1.02,marginBottom:16}}>
              Mari <span className="grad-orange">Terhubung.</span>
            </motion.h2>
            <motion.p variants={v} style={{fontSize:14,color:"rgba(245,240,232,.40)",lineHeight:1.6,marginBottom:48,maxWidth:320,marginLeft:"auto",marginRight:"auto"}}>
              Terbuka untuk kolaborasi QA, tawaran profesional, atau partnership konten digital.
            </motion.p>
            <motion.div variants={v} style={{display:"flex",flexWrap:"wrap" as const,justifyContent:"center",gap:12}}>
              {[
                {href:"https://github.com/aprilliobintang455-boop",I:Code,l:"GitHub"},
                {href:"https://linkedin.com/in/aprilliobintang",I:LI,l:"LinkedIn"},
                {href:"https://www.tiktok.com/@scarawanderr",I:Video,l:"TikTok"},
                {href:"https://www.instagram.com/aprillio.bintang/",I:Camera,l:"Instagram"},
              ].map(({href,I,l})=>(
                <a key={l} href={href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <I style={{width:16,height:16,color:"#f97316"}}/> {l}
                </a>
              ))}
              <a href="mailto:aprilliobintang455@gmail.com" className="btn btn-primary">
                <Mail style={{width:16,height:16}}/> Email Me
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer style={{padding:"32px 24px",textAlign:"center",borderTop:"1px solid rgba(249,115,22,.08)",background:"rgba(255,255,255,.015)"}}>
        <p style={{fontSize:11,color:"rgba(245,240,232,.22)",fontWeight:600,letterSpacing:".16em",textTransform:"uppercase" as const}}>
          © {new Date().getFullYear()} Aprillio Bintang Perdana &nbsp;·&nbsp; Crafted with ✦
        </p>
      </footer>
    </div>
  );
}