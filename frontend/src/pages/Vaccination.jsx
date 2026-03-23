import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css=`
  .vacc-page{background:linear-gradient(160deg,#f0f9ff 0%,#fffbf7 50%,#f0fdf4 100%);min-height:calc(100vh - 68px);}
  .vacc-tgrad{background:linear-gradient(135deg,#0ea5e9,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .vacc-tabs{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;}
  .vacc-tab{padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #e0f2fe;background:transparent;color:#0ea5e9;transition:all .2s;font-family:'Sora',sans-serif;}
  .vacc-tab.active{background:linear-gradient(135deg,#0ea5e9,#10b981);color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(14,165,233,.26);}
  .vacc-tab:not(.active):hover{background:rgba(14,165,233,.07);}
  .vacc-tbl-wrap{background:#fff;border:1px solid #e0f2fe;border-radius:22px;overflow:hidden;animation:cardIn .5s ease both;margin-bottom:24px;}
  .vacc-tbl{width:100%;border-collapse:collapse;}
  .vacc-tbl thead tr{background:linear-gradient(90deg,#f0f9ff,#f0fdf4);}
  .vacc-tbl th{padding:13px 18px;text-align:left;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0ea5e9;}
  .vacc-tbl td{padding:15px 18px;font-size:13.5px;border-top:1px solid #f0f9ff;vertical-align:top;}
  .vacc-tbl tr:hover td{background:rgba(14,165,233,.03);}
  .vbadge{display:inline-flex;align-items:center;gap:5px;padding:3px 11px;border-radius:100px;font-size:11.5px;font-weight:600;}
  .vbadge.done{background:rgba(16,185,129,.12);color:#10b981;}
  .vbadge.due{background:rgba(249,115,22,.12);color:#f97316;}
  .vbadge.upcoming{background:rgba(14,165,233,.12);color:#0ea5e9;}
  .vacc-tips{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  .vtip{background:#fff;border:1px solid #e0f2fe;border-radius:18px;padding:22px 18px;animation:cardIn .5s ease both;transition:transform .25s,box-shadow .25s;}
  .vtip:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(14,165,233,.09);}
  @media(max-width:760px){.vacc-tips{grid-template-columns:1fr 1fr}}
  @media(max-width:480px){.vacc-tips{grid-template-columns:1fr}.vacc-tbl th,.vacc-tbl td{padding:10px 12px}}
`;
const MOTHER=[{n:"Tetanus Toxoid (TT1)",w:"As early as possible",s:"done"},{n:"Tetanus Toxoid (TT2)",w:"4 weeks after TT1",s:"done"},{n:"Influenza Vaccine",w:"Any trimester (2nd recommended)",s:"due"},{n:"COVID-19 Booster",w:"After 12 weeks, consult doctor",s:"upcoming"},{n:"Hepatitis B",w:"3-dose series, any trimester",s:"upcoming"}];
const CHILD=[{n:"BCG + OPV 0 + Hep B1",w:"At birth",s:"done"},{n:"OPV 1,2,3 + Pentavalent 1,2,3",w:"6, 10, 14 weeks",s:"done"},{n:"IPV + Rotavirus",w:"6 & 14 weeks",s:"due"},{n:"PCV (Pneumococcal)",w:"6, 14 weeks, 9-month booster",s:"upcoming"},{n:"Measles / MMR",w:"9 months & 15 months",s:"upcoming"},{n:"Typhoid",w:"9–12 months, repeat at 2 yrs",s:"upcoming"}];
export default function Vaccination(){
  const [tab,setTab]=useState("Mother");
  const navigate=useNavigate();
  const data=tab==="Mother"?MOTHER:CHILD;
  return(<>
    <style>{css}</style>
    <div className="vacc-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(14,165,233,.10) 0%,transparent 65%)"}}/>
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>Vaccination Schedule</div>
        <h1 className="pg-title vacc-tgrad">Never Miss<br/>a Vital Dose</h1>
        <p className="pg-sub">Personalised vaccination timelines for mother and child — based on India's national immunisation programme.</p>
      </div>
      <div className="pg-body">
        <div className="stat-row">
          {[{icon:"💉",num:"11",lbl:"Key Vaccines"},{icon:"📅",num:"On Time",lbl:"Next Due"},{icon:"✅",num:"2/5",lbl:"Mother Done"},{icon:"🛡️",num:"Free",lbl:"Govt. Centres"}].map((s,i)=>(
            <div key={i} className="stat-card" style={{animationDelay:`${i*.06}s`}}><div className="stat-icon">{s.icon}</div><div className="stat-num">{s.num}</div><div className="stat-lbl">{s.lbl}</div></div>))}
        </div>
        <div className="vacc-tabs">
          {["Mother","Child","Upcoming"].map(t=><button key={t} className={`vacc-tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>)}
        </div>
        <div className="vacc-tbl-wrap">
          <table className="vacc-tbl">
            <thead><tr><th>Vaccine</th><th>When to Take</th><th>Status</th></tr></thead>
            <tbody>{data.map((v,i)=><tr key={i}><td><strong>💉 {v.n}</strong></td><td style={{color:"#9a6878"}}>{v.w}</td><td><span className={`vbadge ${v.s}`}>{v.s==="done"?"✓ Done":v.s==="due"?"⚠ Due Soon":"🕐 Upcoming"}</span></td></tr>)}</tbody>
          </table>
        </div>
        <div className="vacc-tips">
          {[{icon:"📋",t:"Keep Records",d:"Always carry your vaccination card to every antenatal and child health visit."},{icon:"⏰",t:"Timely Doses",d:"Missing vaccine windows reduces effectiveness. Set reminders in CareMaa."},{icon:"🏥",t:"Free Vaccines",d:"All NIP vaccines are available free at government health centres across India."},{icon:"🌡️",t:"Post-Vaccine Care",d:"Mild fever and soreness are normal. Use paracetamol if needed; rest well."},{icon:"👨‍👩‍👧",t:"Family Immunity",d:"Ensure all household members are vaccinated to protect your newborn."},{icon:"📲",t:"Smart Reminders",d:"CareMaa sends push notifications 7 days before each scheduled dose."}].map((t,i)=>(
            <div key={i} className="vtip" style={{animationDelay:`${i*.06}s`}}><div className="info-icon">{t.icon}</div><div className="info-title">{t.t}</div><div className="info-desc">{t.d}</div></div>))}
        </div>
        <div style={{marginTop:28}}><div className="pg-cta"><h3>Stay Protected Throughout Pregnancy</h3><p>Set up smart dose reminders and never miss an important vaccine.</p><button className="cta-wbtn" onClick={()=>navigate("/nutrition")}>Plan Your Nutrition →</button></div></div>
      </div>
    </div>
  </>);
}