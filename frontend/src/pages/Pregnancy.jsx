import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css=`
  .preg-page{background:linear-gradient(160deg,#fff5ee 0%,#fffbf7 50%,#fff0f4 100%);min-height:calc(100vh - 68px);}
  .preg-tgrad{background:linear-gradient(135deg,#f97316,#c2185b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .preg-slider{background:#fff;border:1px solid #f3dde5;border-radius:22px;padding:28px 30px;margin-bottom:22px;animation:cardIn .5s ease both;}
  .preg-slider-lbl{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin-bottom:18px;}
  .preg-track{position:relative;height:8px;background:#f3dde5;border-radius:100px;cursor:pointer;margin-bottom:8px;}
  .preg-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#f43f5e,#f97316);transition:width .4s;}
  .preg-thumb{position:absolute;top:50%;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#f97316);border:3px solid #fff;box-shadow:0 2px 8px rgba(244,63,94,.35);transform:translate(-50%,-50%);transition:left .4s;cursor:grab;}
  .preg-wlbls{display:flex;justify-content:space-between;font-size:11px;color:#9a6878;}
  .preg-badges{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;}
  .preg-badge{display:flex;align-items:center;gap:6px;padding:6px 15px;border-radius:100px;background:linear-gradient(135deg,#f97316,#f43f5e);color:#fff;font-size:12.5px;font-weight:600;}
  .preg-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:22px;}
  .preg-card{background:#fff;border:1px solid #f3dde5;border-radius:18px;padding:26px;animation:cardIn .5s .1s ease both;}
  .preg-card h3{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin-bottom:14px;}
  .preg-list{list-style:none;display:flex;flex-direction:column;gap:9px;}
  .preg-list li{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:#2d0f1e;}
  .preg-list li::before{content:'✦';color:#f43f5e;font-size:9px;margin-top:3px;flex-shrink:0;}
  .preg-tip{background:linear-gradient(135deg,rgba(249,115,22,.08),rgba(244,63,94,.06));border-radius:11px;padding:12px 14px;margin-top:12px;font-size:13px;color:#9a6878;line-height:1.6;font-style:italic;}
  .preg-tline{background:#fff;border:1px solid #f3dde5;border-radius:22px;padding:28px;animation:cardIn .5s .2s ease both;}
  .preg-tline h3{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin-bottom:20px;}
  .tl{position:relative;padding-left:28px;display:flex;flex-direction:column;}
  .tl::before{content:'';position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:linear-gradient(180deg,#f43f5e,#f97316);border-radius:2px;}
  .tl-item{position:relative;padding:0 0 24px 22px;}
  .tl-item:last-child{padding-bottom:0;}
  .tl-item::before{content:'';position:absolute;left:-21px;top:5px;width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#f97316);border:2px solid #fff;box-shadow:0 0 0 2px rgba(244,63,94,.22);}
  .tl-title{font-weight:700;font-size:14.5px;margin-bottom:3px;}
  .tl-desc{font-size:13px;color:#9a6878;line-height:1.6;}
  @media(max-width:760px){.preg-row{grid-template-columns:1fr}}
`;
const MILESTONES=[{t:"Week 4 — Implantation",d:"Embryo attaches to uterine wall. Heart begins forming."},{t:"Week 8 — Heartbeat",d:"Baby's heartbeat is detectable via ultrasound."},{t:"Week 12 — End of 1st Trimester",d:"Risk of miscarriage drops significantly. Nuchal scan recommended."},{t:"Week 20 — Anatomy Scan",d:"Detailed ultrasound checks organs and can reveal gender."},{t:"Week 28 — 3rd Trimester",d:"Baby's eyes open. Lungs maturing rapidly."},{t:"Week 40 — Due Date",d:"Full-term baby ready for birth. Average weight ~3.4 kg."}];
export default function Pregnancy(){
  const [week,setWeek]=useState(20);
  const navigate=useNavigate();
  const pct=((week-1)/39)*100;
  return(<>
    <style>{css}</style>
    <div className="preg-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(249,115,22,.12) 0%,transparent 65%)"}}/>
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>Pregnancy Monitor</div>
        <h1 className="pg-title preg-tgrad">Your Journey,<br/>Week by Week</h1>
        <p className="pg-sub">Personalised guidance, milestone tracking, and symptom logs — from conception to birth.</p>
      </div>
      <div className="pg-body">
        <div className="preg-slider">
          <div className="preg-slider-lbl">📅 Currently at Week {week} of 40</div>
          <div className="preg-track" onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setWeek(Math.round(1+Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*39));}}>
            <div className="preg-fill" style={{width:`${pct}%`}}/>
            <div className="preg-thumb" style={{left:`${pct}%`}}/>
          </div>
          <div className="preg-wlbls"><span>Week 1</span><span>Week 10</span><span>Week 20</span><span>Week 30</span><span>Week 40</span></div>
          <div className="preg-badges"><div className="preg-badge">🌱 1st Trimester · Wks 1–12</div><div className="preg-badge">🤰 2nd Trimester · Wks 13–26</div><div className="preg-badge">👶 3rd Trimester · Wks 27–40</div></div>
        </div>
        <div className="preg-row">
          <div className="preg-card"><h3>🌱 Baby's Development</h3><ul className="preg-list"><li>Size of a banana (~25 cm, ~300 g)</li><li>Can hear your voice and respond to sounds</li><li>Eyebrows and eyelashes have formed</li><li>Movements (kicks) becoming stronger</li><li>Digestive system practicing with amniotic fluid</li></ul><div className="preg-tip">💡 Talk, sing, or play music — your baby can hear you from week 18 onwards!</div></div>
          <div className="preg-card"><h3>💛 Mother's Changes</h3><ul className="preg-list"><li>Baby bump clearly visible; round ligament pain common</li><li>Energy levels usually higher in 2nd trimester</li><li>Possible backache, leg cramps, and mild swelling</li><li>Skin changes: stretch marks may begin appearing</li><li>Iron and calcium needs significantly increased</li></ul><div className="preg-tip">💡 Sleep on your left side to improve blood flow to baby and kidneys.</div></div>
        </div>
        <div className="preg-tline"><h3>🗓️ Key Pregnancy Milestones</h3><div className="tl">{MILESTONES.map((m,i)=><div key={i} className="tl-item"><div className="tl-title">{m.t}</div><div className="tl-desc">{m.d}</div></div>)}</div></div>
        <div style={{marginTop:28}}><div className="pg-cta"><h3>Get Your AI Risk Assessment</h3><p>Enter your vitals and our model will assess your maternal risk in seconds.</p><button className="cta-wbtn" onClick={()=>navigate("/risk")}>Check AI Risk →</button></div></div>
      </div>
    </div>
  </>);
}