import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css = `
  .pt-page { background:linear-gradient(160deg,#fff0f4 0%,#fffbf7 40%,#fff5ee 100%); min-height:calc(100vh - 68px); }
  .pt-title-grad { background:linear-gradient(135deg,#f43f5e,#c2185b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .pt-cal-card { background:#fff; border:1px solid #f3dde5; border-radius:22px; padding:28px; margin-bottom:24px; animation:cardIn .5s .1s ease both; }
  .pt-cal-head { font-family:'Playfair Display',serif; font-size:20px; font-weight:700; margin-bottom:22px; }
  .pt-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
  .pt-dh { text-align:center; font-size:10.5px; font-weight:700; color:#9a6878; letter-spacing:.06em; text-transform:uppercase; padding-bottom:8px; }
  .pt-d { aspect-ratio:1; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:500; cursor:pointer; transition:background .2s,transform .18s; color:#2d0f1e; }
  .pt-d:not(.pt-d-emp):hover { background:rgba(244,63,94,.10); transform:scale(1.12); }
  .pt-d.per  { background:linear-gradient(135deg,#f43f5e,#fb7185); color:#fff; box-shadow:0 3px 10px rgba(244,63,94,.30); }
  .pt-d.ov   { background:linear-gradient(135deg,#f97316,#fb923c); color:#fff; box-shadow:0 3px 10px rgba(249,115,22,.30); }
  .pt-d.fer  { background:rgba(244,63,94,.13); color:#f43f5e; font-weight:700; }
  .pt-d.tod  { border:2px solid #f43f5e; font-weight:700; }
  .pt-d-emp  { cursor:default; }
  .pt-legend { display:flex; gap:18px; flex-wrap:wrap; margin-top:14px; }
  .pt-leg    { display:flex; align-items:center; gap:7px; font-size:12px; color:#9a6878; }
  .pt-ldot   { width:10px; height:10px; border-radius:50%; }
  .pt-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:28px; }
  .pt-fc { background:#fff; border:1px solid #f3dde5; border-radius:18px; padding:24px 20px; animation:cardIn .5s ease both; transition:transform .25s,box-shadow .25s; }
  .pt-fc:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(244,63,94,.10); }
  @media(max-width:820px){ .pt-feat-grid{grid-template-columns:1fr 1fr} }
  @media(max-width:540px){ .pt-feat-grid{grid-template-columns:1fr} }
`;
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const perDays=[3,4,5,6,7],ferDays=[12,13,14,15,16],ovDay=14;
export default function PeriodTracker(){
  const navigate=useNavigate();
  const first=new Date(2025,2,1).getDay(),total=31;
  const cells=[...Array(first).fill(null),...Array.from({length:total},(_,i)=>i+1)];
  const cls=d=>{if(!d)return"pt-d-emp";if(d===ovDay)return"ov";if(perDays.includes(d))return"per";if(ferDays.includes(d))return"fer";if(d===18)return"tod";return"";};
  return(<>
    <style>{css}</style>
    <div className="pt-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(244,63,94,.12) 0%,transparent 65%)"}} />
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>Period Tracker</div>
        <h1 className="pg-title pt-title-grad">Know Your Body,<br/>Own Your Cycle</h1>
        <p className="pg-sub">Track your period, predict ovulation, and gain deep insight into your menstrual health.</p>
      </div>
      <div className="pg-body">
        <div className="stat-row">
          {[{icon:"🌸",num:"28",lbl:"Avg Cycle"},{icon:"🩸",num:"5",lbl:"Period Days"},{icon:"🌿",num:"14",lbl:"Fertile Day"},{icon:"📅",num:"Mar 21",lbl:"Next Period"}].map((s,i)=>(
            <div key={i} className="stat-card" style={{animationDelay:`${i*.06}s`}}><div className="stat-icon">{s.icon}</div><div className="stat-num">{s.num}</div><div className="stat-lbl">{s.lbl}</div></div>))}
        </div>
        <div className="pt-cal-card">
          <div className="pt-cal-head">🗓️ March 2025 — Cycle Calendar</div>
          <div className="pt-cal-grid">
            {DAYS.map(d=><div key={d} className="pt-dh">{d}</div>)}
            {cells.map((d,i)=><div key={i} className={`pt-d ${cls(d)}`}>{d||""}</div>)}
          </div>
          <div className="pt-legend">
            <div className="pt-leg"><div className="pt-ldot" style={{background:"#f43f5e"}}/>Period</div>
            <div className="pt-leg"><div className="pt-ldot" style={{background:"rgba(244,63,94,.25)"}}/>Fertile</div>
            <div className="pt-leg"><div className="pt-ldot" style={{background:"#f97316"}}/>Ovulation</div>
            <div className="pt-leg"><div className="pt-ldot" style={{border:"2px solid #f43f5e",background:"transparent"}}/>Today</div>
          </div>
        </div>
        <div className="pt-feat-grid">
          {[{icon:"📊",t:"Cycle Analytics",d:"Visualise trends over 6–12 months to spot irregularities early."},{icon:"🔔",t:"Smart Reminders",d:"Get notified before your period, fertile window, and ovulation day."},{icon:"💊",t:"Symptom Log",d:"Log cramps, mood, flow intensity, and more for detailed health insights."},{icon:"🤝",t:"Partner Sharing",d:"Optionally share your cycle data with your partner or doctor."},{icon:"🧠",t:"AI Predictions",d:"Our ML model improves accuracy with every cycle you log."},{icon:"🌿",t:"Wellness Tips",d:"Personalised nutrition and exercise advice based on your current phase."}].map((f,i)=>(
            <div key={i} className="pt-fc" style={{animationDelay:`${i*.06}s`}}><div className="info-icon">{f.icon}</div><div className="info-title">{f.t}</div><div className="info-desc">{f.d}</div></div>))}
        </div>
        <div className="pg-cta"><h3>Ready to Take Control?</h3><p>Start tracking today and unlock personalised cycle insights.</p><button className="cta-wbtn" onClick={()=>navigate("/risk")}>Try AI Risk Assessment →</button></div>
      </div>
    </div>
  </>);
}