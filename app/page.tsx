"use client";
import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Link as LI, ArrowRight, CheckCircle2, Award, ExternalLink, Keyboard, Target, MousePointerClick, Clock, Zap, Activity, Video, Camera, Code, Sparkles, Flame, Trophy, BookOpen, Globe } from "lucide-react";
import Navbar from "./components/Navbar";
import ParallaxScene from "./components/ParallaxScene";

const v: Variants = { hidden:{opacity:0,y:32}, show:{opacity:1,y:0,transition:{duration:.72,ease:[.22,1,.36,1]}} };
const vScale: Variants = { hidden:{opacity:0,y:24,scale:.97}, show:{opacity:1,y:0,scale:1,transition:{duration:.70,ease:[.22,1,.36,1]}} };
const s: Variants = { hidden:{}, show:{transition:{staggerChildren:.10}} };
const VP = { once: true, margin: "-80px" } as const;

const W = { maxWidth:960, margin:"0 auto", padding:"0 24px" };
const SEC = { padding:"96px 0", position:"relative" as const };
const CARD_STYLE = { padding:"28px", borderRadius:20, background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.075)", boxShadow:"inset 0 1px 0 rgba(255,255,255,.05), 0 4px 24px rgba(0,0,0,.50)", position:"relative" as const, overflow:"hidden" as const };

type DuoCourse = { title: string; xp: number; language: string };
type DuoStats = {
  streak: number; totalXp: number; activeCourses: number;
  courses: DuoCourse[]; joinedAt: string | null; longestStreak: number;
};
type MTChartPoint = { label: string; wpm: number; raw: number; acc: number; consistency: number };
type MTStats = {
  bestWpm: number; bestRaw: number; bestAcc: number; bestConsistency: number;
  avgWpm: number; completedTests: number; completionPct: number;
  timeTyping: string; startedTests: number; chartData: MTChartPoint[] | null;
};

// ── MonkeyType SVG Line Chart ──────────────────────────────────────────────
function MTLineChart({ data, loading }: { data: MTChartPoint[]; loading: boolean }) {
  const [hov, setHov] = useState<number|null>(null);
  const W = 420, H = 180, PAD = { top:16, right:16, bottom:32, left:36 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  if (loading) return (
    <div style={{height:H,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:12,color:"rgba(245,240,232,.25)",letterSpacing:".08em"}}>Loading…</span>
    </div>
  );

  const wpmVals = data.map(d=>d.wpm);
  const rawVals = data.map(d=>d.raw);
  const allVals = [...wpmVals, ...rawVals];
  const minV = Math.max(0, Math.min(...allVals) - 10);
  const maxV = Math.max(...allVals) + 10;
  const range = maxV - minV || 1;

  const xScale = (i:number) => PAD.left + (i / Math.max(data.length-1,1)) * plotW;
  const yScale = (v:number) => PAD.top + plotH - ((v - minV)/range) * plotH;

  // Build smooth SVG path using cubic bezier
  function buildPath(vals: number[]) {
    if (vals.length < 2) return "";
    const pts = vals.map((v,i)=>({ x: xScale(i), y: yScale(v) }));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i=1; i<pts.length; i++) {
      const prev = pts[i-1], cur = pts[i];
      const cpx = (prev.x + cur.x) / 2;
      d += ` C ${cpx},${prev.y} ${cpx},${cur.y} ${cur.x},${cur.y}`;
    }
    return d;
  }

  // Y-axis tick values
  const ticks = [minV, minV+Math.round(range/3), minV+Math.round(2*range/3), maxV].map(Math.round);

  // Find nearest point on mousemove
  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const scaleX = W / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;
    let closest = 0, minD = Infinity;
    data.forEach((_,i)=>{ const d=Math.abs(mx-xScale(i)); if(d<minD){minD=d;closest=i;} });
    setHov(closest);
  }

  return (
    <div style={{width:"100%",overflow:"hidden",position:"relative"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",overflow:"visible",cursor:"crosshair"}}
        onMouseMove={handleMouseMove} onMouseLeave={()=>setHov(null)}>
        <defs>
          <linearGradient id="wpmFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="wpmLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f97316"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {ticks.map(t=>(
          <line key={t} x1={PAD.left} x2={W-PAD.right} y1={yScale(t)} y2={yScale(t)}
            stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="4 4"/>
        ))}
        {ticks.map(t=>(
          <text key={t} x={PAD.left-6} y={yScale(t)+4} textAnchor="end"
            fill="rgba(245,240,232,.30)" fontSize="9" fontFamily="monospace">{t}</text>
        ))}

        {/* Hover vertical line */}
        {hov!==null && (
          <line x1={xScale(hov)} x2={xScale(hov)} y1={PAD.top} y2={PAD.top+plotH}
            stroke="rgba(255,255,255,.15)" strokeWidth="1" strokeDasharray="3 3"/>
        )}

        {/* Raw WPM line */}
        <path d={buildPath(rawVals)} fill="none" stroke="rgba(249,115,22,.35)" strokeWidth="1.5" strokeDasharray="5 3"/>
        {/* Fill */}
        <path d={buildPath(wpmVals)+` L ${xScale(data.length-1)},${yScale(minV)} L ${xScale(0)},${yScale(minV)} Z`} fill="url(#wpmFill)"/>
        {/* WPM line */}
        <path d={buildPath(wpmVals)} fill="none" stroke="url(#wpmLine)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>

        {/* Data points */}
        {data.map((pt,i)=>(
          <g key={i}>
            <circle cx={xScale(i)} cy={yScale(pt.wpm)} r={hov===i?6:4}
              fill="#0e0c09" stroke={hov===i?"#fbbf24":"#f97316"} strokeWidth={hov===i?2.5:2}
              style={{transition:"r .15s,stroke .15s"}}/>
            <circle cx={xScale(i)} cy={yScale(pt.raw)} r={hov===i?4.5:3}
              fill={hov===i?"rgba(249,115,22,.6)":"rgba(249,115,22,.3)"}
              stroke="rgba(249,115,22,.5)" strokeWidth="1.5"
              style={{transition:"r .15s"}}/>
          </g>
        ))}

        {/* X labels */}
        {data.map((pt,i)=>(
          <text key={i} x={xScale(i)} y={H-6} textAnchor="middle"
            fill={hov===i?"rgba(245,240,232,.70)":"rgba(245,240,232,.30)"}
            fontSize="9" fontFamily="monospace" style={{transition:"fill .15s"}}>{pt.label}</text>
        ))}

        {/* Hover tooltip inside SVG */}
        {hov!==null&&(()=>{
          const pt=data[hov];
          const cx=xScale(hov);
          const tipW=90, tipH=46, tipX=Math.min(Math.max(cx-tipW/2,PAD.left),W-PAD.right-tipW), tipY=PAD.top-4;
          return (
            <g>
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="6" ry="6"
                fill="rgba(20,16,10,.92)" stroke="rgba(249,115,22,.35)" strokeWidth="1"/>
              <text x={tipX+tipW/2} y={tipY+14} textAnchor="middle"
                fill="rgba(245,240,232,.45)" fontSize="8" fontFamily="monospace">{pt.label}</text>
              <text x={tipX+8} y={tipY+28} fill="#f97316" fontSize="10" fontWeight="700" fontFamily="monospace">WPM</text>
              <text x={tipX+tipW-8} y={tipY+28} textAnchor="end" fill="#fbbf24" fontSize="10" fontWeight="900" fontFamily="monospace">{pt.wpm}</text>
              <text x={tipX+8} y={tipY+42} fill="rgba(249,115,22,.5)" fontSize="10" fontWeight="700" fontFamily="monospace">Raw</text>
              <text x={tipX+tipW-8} y={tipY+42} textAnchor="end" fill="rgba(249,115,22,.75)" fontSize="10" fontWeight="900" fontFamily="monospace">{pt.raw}</text>
            </g>
          );
        })()}
      </svg>

      <div style={{display:"flex",gap:16,marginTop:8,justifyContent:"flex-end"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:16,height:2,background:"linear-gradient(90deg,#f97316,#fbbf24)",borderRadius:1}}/>
          <span style={{fontSize:10,color:"rgba(245,240,232,.40)",fontWeight:600}}>WPM</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:16,height:2,background:"rgba(249,115,22,.4)",borderRadius:1,borderTop:"1.5px dashed rgba(249,115,22,.5)"}}/>
          <span style={{fontSize:10,color:"rgba(245,240,232,.40)",fontWeight:600}}>Raw</span>
        </div>
      </div>
    </div>
  );
}

// ── MonkeyType SVG Bar Chart ───────────────────────────────────────────────
function MTBarChart({ data, loading }: { data: MTChartPoint[]; loading: boolean }) {
  const [hov, setHov] = useState<number|null>(null);
  const W = 420, H = 180, PAD = { top:16, right:16, bottom:32, left:36 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const maxV = 100;

  if (loading) return (
    <div style={{height:H,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <span style={{fontSize:12,color:"rgba(245,240,232,.25)",letterSpacing:".08em"}}>Loading…</span>
    </div>
  );

  const n = data.length;
  const groupW = plotW / n;
  const barW = groupW * 0.32;
  const gap = barW * 0.35;
  const ticks = [0, 25, 50, 75, 100];
  const yScale = (v:number) => PAD.top + plotH - (v/maxV) * plotH;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    let closest = 0, minD = Infinity;
    data.forEach((_,i)=>{
      const cx = PAD.left + i * groupW + groupW/2;
      const d = Math.abs(mx - cx);
      if(d<minD){minD=d;closest=i;}
    });
    setHov(closest);
  }

  return (
    <div style={{width:"100%",overflow:"hidden",position:"relative"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",overflow:"visible",cursor:"crosshair"}}
        onMouseMove={handleMouseMove} onMouseLeave={()=>setHov(null)}>
        <defs>
          <linearGradient id="accBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="accBarHov" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="1"/>
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="consBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#475569" stopOpacity="0.5"/>
          </linearGradient>
          <linearGradient id="consBarHov" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="1"/>
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.8"/>
          </linearGradient>
        </defs>

        {ticks.map(t=>(
          <line key={t} x1={PAD.left} x2={W-PAD.right} y1={yScale(t)} y2={yScale(t)}
            stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="4 4"/>
        ))}
        {ticks.map(t=>(
          <text key={t} x={PAD.left-6} y={yScale(t)+4} textAnchor="end"
            fill="rgba(245,240,232,.30)" fontSize="9" fontFamily="monospace">{t}</text>
        ))}

        {/* Hover highlight band */}
        {hov!==null&&(
          <rect
            x={PAD.left+hov*groupW} y={PAD.top}
            width={groupW} height={plotH}
            fill="rgba(255,255,255,.04)" rx="4"/>
        )}

        {data.map((pt,i)=>{
          const cx = PAD.left + i * groupW + groupW/2;
          const accH = (pt.acc/maxV) * plotH;
          const consH = (pt.consistency/maxV) * plotH;
          const isHov = hov===i;
          return (
            <g key={i}>
              <rect x={cx-barW-gap/2} y={yScale(pt.acc)} width={barW} height={accH} rx="2" ry="2"
                fill={isHov?"url(#accBarHov)":"url(#accBar)"}
                style={{transition:"fill .15s"}}/>
              <rect x={cx+gap/2} y={yScale(pt.consistency)} width={barW} height={consH} rx="2" ry="2"
                fill={isHov?"url(#consBarHov)":"url(#consBar)"}
                style={{transition:"fill .15s"}}/>
              <text x={cx} y={H-6} textAnchor="middle"
                fill={isHov?"rgba(245,240,232,.70)":"rgba(245,240,232,.30)"}
                fontSize="9" fontFamily="monospace" style={{transition:"fill .15s"}}>{pt.label}</text>
            </g>
          );
        })}

        {/* Tooltip */}
        {hov!==null&&(()=>{
          const pt=data[hov];
          const cx=PAD.left+hov*groupW+groupW/2;
          const tipW=100, tipH=46;
          const tipX=Math.min(Math.max(cx-tipW/2,PAD.left),W-PAD.right-tipW);
          const tipY=PAD.top-4;
          return (
            <g>
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="6" ry="6"
                fill="rgba(20,16,10,.92)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <text x={tipX+tipW/2} y={tipY+14} textAnchor="middle"
                fill="rgba(245,240,232,.45)" fontSize="8" fontFamily="monospace">{pt.label}</text>
              <text x={tipX+8} y={tipY+28} fill="rgba(226,232,240,.80)" fontSize="10" fontWeight="700" fontFamily="monospace">Acc</text>
              <text x={tipX+tipW-8} y={tipY+28} textAnchor="end" fill="#e2e8f0" fontSize="10" fontWeight="900" fontFamily="monospace">{pt.acc}%</text>
              <text x={tipX+8} y={tipY+42} fill="rgba(100,116,139,.90)" fontSize="10" fontWeight="700" fontFamily="monospace">Cons</text>
              <text x={tipX+tipW-8} y={tipY+42} textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="900" fontFamily="monospace">{pt.consistency}%</text>
            </g>
          );
        })()}
      </svg>

      <div style={{display:"flex",gap:16,marginTop:8,justifyContent:"flex-end"}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:10,height:10,background:"rgba(226,232,240,.85)",borderRadius:2}}/>
          <span style={{fontSize:10,color:"rgba(245,240,232,.40)",fontWeight:600}}>Accuracy</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:10,height:10,background:"rgba(100,116,139,.75)",borderRadius:2}}/>
          <span style={{fontSize:10,color:"rgba(245,240,232,.40)",fontWeight:600}}>Consistency</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState<MTStats>({
    bestWpm:121,bestRaw:125,bestAcc:97,bestConsistency:79,
    avgWpm:94,completedTests:669,completionPct:21,
    timeTyping:"9h 52m",startedTests:3300,chartData:null,
  });
  const [mtLoading, setMtLoading] = useState(true);
  const [duo, setDuo] = useState<DuoStats | null>(null);
  const [duoLoading, setDuoLoading] = useState(true);

  useEffect(()=>{
    // Fetch MonkeyType via our proxy API
    fetch("/api/monkeytype").then(r=>r.json()).then((d: MTStats & { ok?: boolean })=>{
      if(d?.ok) setStats({
        bestWpm: d.bestWpm ?? 121,
        bestRaw: d.bestRaw ?? 125,
        bestAcc: d.bestAcc ?? 97,
        bestConsistency: d.bestConsistency ?? 79,
        avgWpm: d.avgWpm ?? 94,
        completedTests: d.completedTests ?? 669,
        completionPct: d.completionPct ?? 21,
        timeTyping: d.timeTyping ?? "9h 52m",
        startedTests: d.startedTests ?? 3300,
        chartData: d.chartData ?? null,
      });
    }).catch(()=>{}).finally(()=>setMtLoading(false));

    fetch("/api/duolingo").then(r=>r.json()).then((d: DuoStats & { ok?: boolean })=>{
      if(d?.ok) setDuo({
        streak: d.streak, totalXp: d.totalXp,
        activeCourses: d.activeCourses, courses: d.courses ?? [],
        joinedAt: d.joinedAt ?? null, longestStreak: d.longestStreak ?? d.streak,
      });
    }).catch(()=>{}).finally(()=>setDuoLoading(false));
  },[]);

  const edu=[
    {yr:"Agu 2025 — Present",title:"S1 Sistem Informasi",school:"Universitas Terbuka",href:"https://ut.ac.id"},
    {yr:"Jan 2026 — Present",title:"S1 Manajemen",school:"Univ. Siber Muhammadiyah",href:"https://sibermu.ac.id"},
    {yr:"Jun 2022 — Jun 2024",title:"Rekayasa Perangkat Lunak",school:"SMK Negeri 4 Kendal",href:"https://smkn4kendal.sch.id"},
  ];
  const certs=[
    {t:"Microsoft 365 Copilot",i:"Microsoft",d:"Apr 2026",f:"/cert-copilot.pdf"},
    {t:"Pelatihan Dasar Copilot",i:"Jobstreet & Microsoft",d:"Apr 2026",f:"/cert-jobstreet-copilot.pdf"},
    {t:"Analisis Data Excel",i:"Microsoft & Jobstreet",d:"Apr 2026",f:"/cert-excel.pdf"},
    {t:"QA Test Technique",i:"MySkill",d:"Apr 2026",f:"/cert-qa-technique.pdf"},
    {t:"Quality Assurance Introduction",i:"MySkill",d:"Feb 2025",f:"/cert-qa-intro.pdf"},
    {t:"Intensive Bootcamp Excel",i:"KarirNex",d:"Apr 2026",f:"/cert-excel-karirnex.pdf"},
  ];
  // Format startedTests → e.g. 3.3K
  const fmtK = (n:number) => n>=1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  // Fallback chart data (last 5 tests mock) if no ApeKey configured
  const defaultChart: MTChartPoint[] = [
    {label:"T1",wpm:95,raw:100,acc:96,consistency:72},
    {label:"T2",wpm:121,raw:125,acc:100,consistency:78},
    {label:"T3",wpm:88,raw:92,acc:91,consistency:65},
    {label:"T4",wpm:72,raw:76,acc:90,consistency:62},
    {label:"T5",wpm:118,raw:122,acc:99,consistency:74},
  ];
  const chartData = stats.chartData ?? defaultChart;

  return (
    <div style={{minHeight:"100vh",position:"relative"}}>
      <div className="bg-scene"/>
      <ParallaxScene />
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
              {[["3.8M","Total Views"],["110+","Videos"],["352+","QA Tests"],["108 WPM","Typing Speed"]].map(([val,lbl])=>(
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

        {/* DUOLINGO PROGRESS */}
        <section id="duolingo" style={{...SEC, paddingBottom:80}}>
          <div style={W}>
            <span className="section-number">04</span>
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v}
              style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap" as const,gap:16,marginBottom:40}}>
              <div>
                <span className="eyebrow" style={{marginBottom:12}}>Duolingo</span>
                <h2 style={{fontWeight:900,fontSize:"clamp(26px,3.5vw,40px)",letterSpacing:"-.03em"}}>
                  Language <span style={{background:"linear-gradient(135deg,#58cc02,#89e219)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Progress.</span>
                </h2>
              </div>
              <a href="https://www.duolingo.com/profile/AprillioBi" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm"
                style={{borderColor:"rgba(88,204,2,.25)",color:"rgba(88,204,2,.8)"}}>
                <Globe style={{width:14,height:14,color:"#58cc02"}}/> Profile
              </a>
            </motion.div>

            {/* 3 stat cards — responsive via CSS class */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s} className="duo-stat-grid">

              {/* Streak */}
              <motion.div variants={vScale} className="g-card" style={{padding:"28px 24px",position:"relative"}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#ff6b00,#ff9900)"}}/>
                <div style={{position:"absolute",width:120,height:120,borderRadius:"50%",background:"#ff6b00",filter:"blur(40px)",opacity:.10,top:-20,right:-20,pointerEvents:"none"}}/>
                <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                  <div style={{padding:10,borderRadius:12,background:"rgba(255,107,0,.10)",border:"1px solid rgba(255,107,0,.22)",width:"fit-content"}}>
                    <Flame style={{width:20,height:20,color:"#ff6b00"}}/>
                  </div>
                  <p style={{fontWeight:900,fontSize:"clamp(32px,4vw,52px)",letterSpacing:"-.04em",lineHeight:1,
                    background:"linear-gradient(135deg,#ff6b00,#ff9900)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                    {duoLoading ? "—" : (duo?.streak ?? 0).toLocaleString()}
                  </p>
                  <p style={{fontSize:12,color:"rgba(245,240,232,.38)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase" as const}}>Day Streak</p>
                </div>
              </motion.div>

              {/* Total XP */}
              <motion.div variants={vScale} className="g-card" style={{padding:"28px 24px",position:"relative"}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#ffc800,#ffe066)"}}/>
                <div style={{position:"absolute",width:120,height:120,borderRadius:"50%",background:"#ffc800",filter:"blur(40px)",opacity:.10,top:-20,right:-20,pointerEvents:"none"}}/>
                <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                  <div style={{padding:10,borderRadius:12,background:"rgba(255,200,0,.10)",border:"1px solid rgba(255,200,0,.22)",width:"fit-content"}}>
                    <Trophy style={{width:20,height:20,color:"#ffc800"}}/>
                  </div>
                  <p style={{fontWeight:900,fontSize:"clamp(28px,3.5vw,46px)",letterSpacing:"-.04em",lineHeight:1,
                    background:"linear-gradient(135deg,#ffc800,#ffe066)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                    {duoLoading ? "—" : (duo?.totalXp ?? 0).toLocaleString()}
                  </p>
                  <p style={{fontSize:12,color:"rgba(245,240,232,.38)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase" as const}}>Total XP</p>
                </div>
              </motion.div>

              {/* Active Courses */}
              <motion.div variants={vScale} className="g-card" style={{padding:"28px 24px",position:"relative"}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#1cb0f6,#58cc02)"}}/>
                <div style={{position:"absolute",width:120,height:120,borderRadius:"50%",background:"#1cb0f6",filter:"blur(40px)",opacity:.10,top:-20,right:-20,pointerEvents:"none"}}/>
                <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
                  <div style={{padding:10,borderRadius:12,background:"rgba(28,176,246,.10)",border:"1px solid rgba(28,176,246,.22)",width:"fit-content"}}>
                    <BookOpen style={{width:20,height:20,color:"#1cb0f6"}}/>
                  </div>
                  <p style={{fontWeight:900,fontSize:"clamp(32px,4vw,52px)",letterSpacing:"-.04em",lineHeight:1,
                    background:"linear-gradient(135deg,#1cb0f6,#58cc02)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                    {duoLoading ? "—" : (duo?.activeCourses ?? 0)}
                  </p>
                  <p style={{fontSize:12,color:"rgba(245,240,232,.38)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase" as const}}>Active Courses</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Course breakdown — responsive via CSS class */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s} className="duo-course-grid">
              {duoLoading
                ? [1,2,3].map(i=>(
                    <div key={i} className="g-card" style={{padding:"20px 22px",opacity:.4}}>
                      <div className="top-bar" style={{background:"linear-gradient(90deg,#58cc02,#89e219)"}}/>
                      <div style={{height:14,borderRadius:8,background:"rgba(255,255,255,.08)",marginBottom:12,width:"60%"}}/>
                      <div style={{height:4,borderRadius:999,background:"rgba(255,255,255,.06)"}}/>
                    </div>
                  ))
                : (duo?.courses ?? []).map((c, i) => {
                  const courses = duo?.courses ?? [];
                  const maxXp = Math.max(...courses.map(x => x.xp), 1);
                  const pct = Math.round((c.xp / maxXp) * 100);
                  // Map learningLanguage code → ISO 3166-1 alpha-2 for flagcdn.com
                  const countryCode: Record<string,string> = {
                    ja:"jp", en:"us", ko:"kr", fr:"fr", es:"es", de:"de",
                    "zh-cn":"cn", zh:"cn", pt:"br", it:"it", ru:"ru",
                    ar:"sa", hi:"in", id:"id", tr:"tr", nl:"nl", pl:"pl",
                    sv:"se", da:"dk", fi:"fi", nb:"no", el:"gr", cs:"cz",
                    ro:"ro", uk:"ua", vi:"vn", th:"th",
                  };
                  const cc = countryCode[c.language.toLowerCase()] ?? "un";
                  return (
                    <motion.div key={i} variants={vScale} className="g-card" style={{padding:"20px 22px"}}>
                      <div className="top-bar" style={{background:"linear-gradient(90deg,#58cc02,#89e219)"}}/>
                      <div className="duo-course-card-inner" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          {/* Use flagcdn.com image — works on all platforms including Windows */}
                          <img
                            src={`https://flagcdn.com/28x21/${cc}.png`}
                            srcSet={`https://flagcdn.com/56x42/${cc}.png 2x`}
                            width={28} height={21}
                            alt={c.title}
                            style={{borderRadius:3,objectFit:"cover",flexShrink:0,boxShadow:"0 1px 4px rgba(0,0,0,.4)"}}
                          />
                          <p style={{fontSize:14,fontWeight:700,color:"rgba(245,240,232,.85)"}}>{c.title}</p>
                        </div>
                        <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999,
                          background:"rgba(88,204,2,.10)",border:"1px solid rgba(88,204,2,.22)",
                          color:"#89e219",fontFamily:"monospace",whiteSpace:"nowrap" as const}}>
                          {c.xp.toLocaleString()} XP
                        </span>
                      </div>
                      <div style={{height:4,borderRadius:999,background:"rgba(255,255,255,.06)",overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${pct}%`,borderRadius:999,
                          background:"linear-gradient(90deg,#58cc02,#89e219)",
                          transition:"width 1s ease"}} />
                      </div>
                    </motion.div>
                  );
                })
              }
            </motion.div>
          </div>
        </section>

        <hr className="silk-divider"/>

        {/* TYPING PERFORMANCE — MonkeyType Dashboard */}
        <section id="metrics" style={{...SEC, paddingBottom:80}}>
          <div style={W}>
            <span className="section-number">05</span>

            {/* Header */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={v}
              style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap" as const,gap:16,marginBottom:40}}>
              <div>
                <span className="eyebrow" style={{marginBottom:12}}>MonkeyType</span>
                <h2 style={{fontWeight:900,fontSize:"clamp(26px,3.5vw,40px)",letterSpacing:"-.03em"}}>
                  Typing <span className="grad-orange">Performance.</span>
                </h2>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {/* Live badge */}
                <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:999,background:"rgba(249,115,22,.10)",border:"1px solid rgba(249,115,22,.22)",fontSize:11,fontWeight:700,letterSpacing:".08em",color:"rgba(249,115,22,.90)"}}>
                  <span style={{position:"relative",display:"flex"}}>
                    <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#f97316",opacity:.5,animation:"ping 1s cubic-bezier(0,0,.2,1) infinite"}}/>
                    <span style={{width:6,height:6,borderRadius:"50%",background:"#f97316",display:"block"}}/>
                  </span>
                  Real-time
                </span>
                <a href="https://monkeytype.com/profile/Aprillio" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <Activity style={{width:14,height:14}}/> Live Profile
                </a>
              </div>
            </motion.div>

            {/* ROW 1 — 4 stat cards (Best WPM, Accuracy, Tests, Time Typing) */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}
              className="mt-grid-4">

              {/* Best WPM */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#f97316,#fbbf24)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(249,115,22,.12)",border:"1px solid rgba(249,115,22,.22)"}}>
                  <Keyboard style={{width:18,height:18,color:"#f97316"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val grad-orange">{mtLoading ? "—" : stats.bestWpm}</p>
                  <p className="mt-stat-label">Best WPM</p>
                  <p className="mt-stat-sub">Avg: {mtLoading ? "—" : stats.avgWpm} WPM</p>
                </div>
              </motion.div>

              {/* Accuracy */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#10b981,#34d399)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.22)"}}>
                  <Target style={{width:18,height:18,color:"#10b981"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#10b981,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : `${stats.bestAcc}%`}</p>
                  <p className="mt-stat-label">Best Accuracy</p>
                  <p className="mt-stat-sub">Consistency: {mtLoading ? "—" : `${stats.bestConsistency}%`}</p>
                </div>
              </motion.div>

              {/* Tests Completed */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#8b5cf6,#a78bfa)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.22)"}}>
                  <MousePointerClick style={{width:18,height:18,color:"#8b5cf6"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#8b5cf6,#a78bfa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : stats.completedTests.toLocaleString()}</p>
                  <p className="mt-stat-label">Tests Completed</p>
                  <p className="mt-stat-sub">{mtLoading ? "—" : `${stats.completionPct}%`} completion</p>
                </div>
              </motion.div>

              {/* Time Typing */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#06b6d4,#38bdf8)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(6,182,212,.12)",border:"1px solid rgba(6,182,212,.22)"}}>
                  <Clock style={{width:18,height:18,color:"#06b6d4"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#06b6d4,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : stats.timeTyping}</p>
                  <p className="mt-stat-label">Time Typing</p>
                  <p className="mt-stat-sub">{mtLoading ? "—" : fmtK(stats.startedTests)} started</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ROW 2 — 3 stat cards (Raw WPM, Avg WPM, Consistency) */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}
              className="mt-grid-3" style={{marginTop:12}}>

              {/* Best Raw WPM */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#f97316,#fb923c)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(249,115,22,.12)",border:"1px solid rgba(249,115,22,.22)"}}>
                  <Zap style={{width:18,height:18,color:"#fb923c"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#fb923c,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : stats.bestRaw}</p>
                  <p className="mt-stat-label">Best Raw WPM</p>
                  <p className="mt-stat-sub">Uncorrected speed</p>
                </div>
              </motion.div>

              {/* Average WPM */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#f59e0b,#fcd34d)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(245,158,11,.12)",border:"1px solid rgba(245,158,11,.22)"}}>
                  <Activity style={{width:18,height:18,color:"#f59e0b"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#f59e0b,#fcd34d)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : stats.avgWpm}</p>
                  <p className="mt-stat-label">Average WPM</p>
                  <p className="mt-stat-sub">Across all tests</p>
                </div>
              </motion.div>

              {/* Best Consistency */}
              <motion.div variants={vScale} className="g-card mt-stat-card">
                <div className="top-bar" style={{background:"linear-gradient(90deg,#ec4899,#f472b6)"}}/>
                <div className="mt-stat-icon-wrap" style={{background:"rgba(236,72,153,.12)",border:"1px solid rgba(236,72,153,.22)"}}>
                  <Award style={{width:18,height:18,color:"#ec4899"}}/>
                </div>
                <div className="mt-stat-body">
                  <p className="mt-stat-val" style={{background:"linear-gradient(135deg,#ec4899,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{mtLoading ? "—" : `${stats.bestConsistency}%`}</p>
                  <p className="mt-stat-label">Best Consistency</p>
                  <p className="mt-stat-sub">Typing stability</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ROW 3 — 2 charts side by side */}
            <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}
              className="mt-charts-row" style={{marginTop:12}}>

              {/* WPM Progress Line Chart */}
              <motion.div variants={vScale} className="g-card" style={{padding:"28px 24px",flex:1,minWidth:0}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#f97316,#fbbf24)"}}/>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
                  <div style={{padding:8,borderRadius:10,background:"rgba(249,115,22,.12)",border:"1px solid rgba(249,115,22,.22)"}}>
                    <Activity style={{width:16,height:16,color:"#f97316"}}/>
                  </div>
                  <h3 style={{fontWeight:800,fontSize:15,color:"rgba(245,240,232,.90)"}}>WPM Progress</h3>
                </div>
                <MTLineChart data={chartData} loading={mtLoading}/>
              </motion.div>

              {/* Accuracy & Consistency Bar Chart */}
              <motion.div variants={vScale} className="g-card" style={{padding:"28px 24px",flex:1,minWidth:0}}>
                <div className="top-bar" style={{background:"linear-gradient(90deg,#10b981,#06b6d4)"}}/>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
                  <div style={{padding:8,borderRadius:10,background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.22)"}}>
                    <Target style={{width:16,height:16,color:"#10b981"}}/>
                  </div>
                  <h3 style={{fontWeight:800,fontSize:15,color:"rgba(245,240,232,.90)"}}>Accuracy &amp; Consistency</h3>
                </div>
                <MTBarChart data={chartData} loading={mtLoading}/>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{padding:"140px 24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:560,height:560,borderRadius:"50%",background:"#f97316",filter:"blur(110px)",opacity:.10,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={s}
            style={{maxWidth:600,margin:"0 auto",textAlign:"center",position:"relative",zIndex:10}}>
            <motion.span variants={v} className="eyebrow" style={{marginBottom:20}}>05 — Kontak</motion.span>
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
          © {new Date().getFullYear()} &nbsp;·&nbsp; Aprillio Bintang Perdana &nbsp;·&nbsp; Crafted with ✦
        </p>
      </footer>
    </div>
  );
}