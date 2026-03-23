import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css=`
  .comm-page{background:linear-gradient(160deg,#fefce8 0%,#fffbf7 50%,#fff0f4 100%);min-height:calc(100vh - 68px);}
  .comm-tgrad{background:linear-gradient(135deg,#eab308,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .comm-layout{display:grid;grid-template-columns:1fr 320px;gap:22px;margin-bottom:24px;}
  .comm-compose{background:#fff;border:1px solid #f3dde5;border-radius:18px;padding:18px;margin-bottom:14px;}
  .comm-ta{width:100%;border:1.5px solid #f3dde5;border-radius:11px;padding:11px 13px;font-family:'Sora',sans-serif;font-size:13.5px;color:#2d0f1e;resize:none;outline:none;transition:border-color .2s,box-shadow .2s;background:#faf7ff;min-height:76px;}
  .comm-ta:focus{border-color:#f43f5e;background:#fff;box-shadow:0 0 0 4px rgba(244,63,94,.07);}
  .comm-pbtn{margin-top:8px;padding:8px 22px;border:none;border-radius:100px;background:linear-gradient(135deg,#f43f5e,#f97316);color:#fff;font-family:'Sora',sans-serif;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(244,63,94,.24);transition:transform .18s,box-shadow .2s;}
  .comm-pbtn:hover{transform:translateY(-2px);box-shadow:0 7px 20px rgba(244,63,94,.32);}
  .comm-feed{display:flex;flex-direction:column;gap:14px;}
  .comm-post{background:#fff;border:1px solid #f3dde5;border-radius:18px;padding:20px;animation:cardIn .5s ease both;transition:box-shadow .25s,border-color .2s;}
  .comm-post:hover{box-shadow:0 10px 30px rgba(244,63,94,.07);border-color:#fda4af;}
  .comm-ph{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
  .comm-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
  .comm-author{font-weight:700;font-size:13.5px;margin-bottom:1px;}
  .comm-meta{font-size:11.5px;color:#9a6878;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
  .comm-vbadge{background:linear-gradient(135deg,#10b981,#0ea5e9);color:#fff;font-size:9.5px;font-weight:700;padding:2px 7px;border-radius:100px;}
  .comm-text{font-size:13.5px;color:#2d0f1e;line-height:1.7;margin-bottom:12px;}
  .comm-tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;}
  .comm-tag{padding:3px 11px;border-radius:100px;background:rgba(244,63,94,.08);color:#f43f5e;font-size:11.5px;font-weight:600;}
  .comm-acts{display:flex;gap:14px;}
  .comm-act{display:flex;align-items:center;gap:5px;font-size:12.5px;color:#9a6878;cursor:pointer;transition:color .2s;font-weight:500;}
  .comm-act:hover{color:#f43f5e;}
  .comm-side{display:flex;flex-direction:column;gap:14px;}
  .comm-sc{background:#fff;border:1px solid #f3dde5;border-radius:18px;padding:20px;}
  .comm-sc h4{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;margin-bottom:13px;}
  .comm-exp{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f3dde5;}
  .comm-exp:last-child{border:none;padding-bottom:0;}
  .comm-exav{width:38px;height:38px;border-radius:50%;font-size:17px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .comm-exname{font-weight:700;font-size:13px;}
  .comm-exrole{font-size:11px;color:#9a6878;}
  .comm-fwbtn{margin-left:auto;padding:4px 13px;border-radius:100px;border:1.5px solid rgba(244,63,94,.25);color:#f43f5e;background:none;font-size:11.5px;font-weight:600;cursor:pointer;font-family:'Sora',sans-serif;transition:background .2s;}
  .comm-fwbtn:hover{background:rgba(244,63,94,.07);}
  .comm-trend{display:flex;align-items:center;gap:9px;padding:7px 0;cursor:pointer;transition:color .2s;color:#2d0f1e;}
  .comm-trend:hover{color:#f43f5e;}
  .comm-tnum{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#f3dde5;min-width:22px;}
  .comm-ttxt{font-size:13px;font-weight:600;}
  @media(max-width:900px){.comm-layout{grid-template-columns:1fr}.comm-side{display:none}}
`;
const POSTS=[
  {av:"👩‍⚕️",avBg:"linear-gradient(135deg,#fce7f3,#fda4af)",author:"Dr. Sunita Rao",role:"Gynaecologist · AIIMS Delhi",time:"2 hours ago",verified:true,text:"Many first-time mothers worry unnecessarily about foetal movements. After 28 weeks, 10 movements in 2 hours is normal. Track consistently and consult if you notice a sudden drop.",tags:["#FoetalMovement","#3rdTrimester"],likes:142,comments:38},
  {av:"🤱",avBg:"linear-gradient(135deg,#dcfce7,#86efac)",author:"Priya Mehta",role:"Expecting · 24 weeks",time:"5 hours ago",verified:false,text:"My iron levels were low at week 20. My doctor suggested switching to liquid iron supplements + vitamin C with each dose. The difference in 4 weeks was incredible! 💛",tags:["#Anaemia","#IronTips","#2ndTrimester"],likes:89,comments:24},
  {av:"👶",avBg:"linear-gradient(135deg,#e0f2fe,#7dd3fc)",author:"Anjali S.",role:"New Mom · 3 months postpartum",time:"Yesterday",verified:false,text:"For all new moms struggling with breastfeeding — it took me 6 weeks to get the latch right. Lactation consultants are underrated. CareMaa's feeding tracker helped me notice patterns I couldn't otherwise.",tags:["#Breastfeeding","#PostPartum"],likes:211,comments:67},
  {av:"🏥",avBg:"linear-gradient(135deg,#fef9c3,#fde047)",author:"CareMaa Health Team",role:"Official · Verified",time:"2 days ago",verified:true,text:"🔔 Reminder: The 2nd trimester anatomy scan (18–20 weeks) checks all major organs, amniotic fluid, and placenta position. Don't skip it!",tags:["#AnatomyScan","#Reminder"],likes:334,comments:91},
];
const EXPERTS=[{e:"👩‍⚕️",bg:"linear-gradient(135deg,#fce7f3,#fda4af)",n:"Dr. Kavitha N.",r:"Obstetrician"},{e:"🧪",bg:"linear-gradient(135deg,#dcfce7,#86efac)",n:"Dr. Arun Patel",r:"Neonatologist"},{e:"🥗",bg:"linear-gradient(135deg,#fef9c3,#fde047)",n:"Ritu Sharma",r:"Prenatal Nutritionist"}];
const TRENDING=["Iron deficiency in pregnancy","Week 20 anatomy scan guide","Normal BP ranges 3rd trimester","Postpartum depression signs","Best foods for folic acid"];
export default function Community(){
  const [draft,setDraft]=useState("");
  const navigate=useNavigate();
  return(<>
    <style>{css}</style>
    <div className="comm-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(234,179,8,.10) 0%,transparent 65%)"}}/>
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>Community</div>
        <h1 className="pg-title comm-tgrad">You're Never<br/>Alone in This</h1>
        <p className="pg-sub">Connect with verified doctors, experienced mothers, and maternal health experts across India.</p>
      </div>
      <div className="pg-body">
        <div className="comm-layout">
          <div>
            <div className="comm-compose">
              <textarea className="comm-ta" placeholder="Share a tip, ask a question, or start a discussion…" value={draft} onChange={e=>setDraft(e.target.value)}/>
              <button className="comm-pbtn">Post to Community →</button>
            </div>
            <div className="comm-feed">
              {POSTS.map((p,i)=>(
                <div key={i} className="comm-post" style={{animationDelay:`${i*.07}s`}}>
                  <div className="comm-ph"><div className="comm-av" style={{background:p.avBg}}>{p.av}</div><div><div className="comm-author">{p.author}</div><div className="comm-meta"><span>{p.role}</span>{p.verified&&<span className="comm-vbadge">✓ Verified</span>}<span>· {p.time}</span></div></div></div>
                  <div className="comm-text">{p.text}</div>
                  <div className="comm-tags">{p.tags.map(t=><span key={t} className="comm-tag">{t}</span>)}</div>
                  <div className="comm-acts"><div className="comm-act">❤️ {p.likes}</div><div className="comm-act">💬 {p.comments}</div><div className="comm-act">↗️ Share</div></div>
                </div>))}
            </div>
          </div>
          <div className="comm-side">
            <div className="comm-sc"><h4>👩‍⚕️ Expert Doctors</h4>{EXPERTS.map((e,i)=><div key={i} className="comm-exp"><div className="comm-exav" style={{background:e.bg}}>{e.e}</div><div><div className="comm-exname">{e.n}</div><div className="comm-exrole">{e.r}</div></div><button className="comm-fwbtn">Follow</button></div>)}</div>
            <div className="comm-sc"><h4>🔥 Trending Topics</h4>{TRENDING.map((t,i)=><div key={i} className="comm-trend"><span className="comm-tnum">{String(i+1).padStart(2,"0")}</span><span className="comm-ttxt">{t}</span></div>)}</div>
          </div>
        </div>
        <div className="pg-cta"><h3>Ready to Start Your Assessment?</h3><p>Use our AI Risk Tracker for an instant maternal health check.</p><button className="cta-wbtn" onClick={()=>navigate("/risk")}>Try AI Risk Assessment →</button></div>
      </div>
    </div>
  </>);
}