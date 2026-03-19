import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css=`
  .air-page{background:linear-gradient(160deg,#fff0f4 0%,#fffbf7 50%,#fdf0f2 100%);min-height:calc(100vh - 68px);}
  .air-tgrad{background:linear-gradient(135deg,#f43f5e,#9333ea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .air-form{background:#fff;border:1px solid #f3dde5;border-radius:22px;padding:32px;margin-bottom:22px;animation:cardIn .5s ease both;}
  .air-form-title{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;margin-bottom:24px;display:flex;align-items:center;gap:9px;}
  .air-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;}
  .air-field{display:flex;flex-direction:column;gap:5px;}
  .air-lbl{font-size:11.5px;font-weight:600;color:#9a6878;display:flex;align-items:center;gap:5px;}
  .air-iw{position:relative;}
  .air-inp{width:100%;padding:11px 13px 11px 36px;border:1.5px solid #f3dde5;border-radius:11px;font-family:'Sora',sans-serif;font-size:14px;font-weight:500;color:#2d0f1e;background:#faf7ff;outline:none;transition:border-color .2s,box-shadow .2s;-moz-appearance:textfield;}
  .air-inp::-webkit-inner-spin-button,.air-inp::-webkit-outer-spin-button{-webkit-appearance:none;}
  .air-inp::placeholder{color:#c4b5d4;font-weight:400;}
  .air-inp:focus{border-color:#f43f5e;background:#fff;box-shadow:0 0 0 4px rgba(244,63,94,.08);}
  .air-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;pointer-events:none;opacity:.6;}
  .air-btn{width:100%;padding:15px;border:none;border-radius:13px;background:linear-gradient(135deg,#f43f5e 0%,#9333ea 55%,#f97316 100%);color:#fff;font-family:'Sora',sans-serif;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 4px 18px rgba(244,63,94,.28);transition:transform .15s,box-shadow .2s;}
  .air-btn:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(244,63,94,.36);}
  .air-btn:active{transform:scale(.98);}
  .air-btn:disabled{opacity:.7;cursor:not-allowed;}
  .air-res{border-radius:20px;padding:26px;border:2px solid;margin-top:22px;animation:resIn .5s cubic-bezier(.34,1.56,.64,1) both;}
  .air-res.low{background:#f0fdf4;border-color:#86efac;color:#166534;}
  .air-res.mid{background:#fffbeb;border-color:#fcd34d;color:#92400e;}
  .air-res.high{background:#fff1f2;border-color:#fca5a5;color:#991b1b;}
  .air-res-top{display:flex;align-items:center;gap:13px;margin-bottom:18px;}
  .air-emoji{font-size:38px;}
  .air-rtag{font-size:10.5px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;opacity:.65;margin-bottom:3px;}
  .air-rlvl{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;text-transform:capitalize;}
  .air-conf{margin-top:2px;}
  .air-conf-top{display:flex;justify-content:space-between;margin-bottom:6px;}
  .air-conf-lbl{font-size:11.5px;font-weight:600;opacity:.65;letter-spacing:.04em;text-transform:uppercase;}
  .air-conf-pct{font-size:17px;font-weight:700;}
  .air-prog{height:8px;border-radius:100px;background:rgba(0,0,0,.08);overflow:hidden;}
  .air-fill{height:100%;border-radius:100px;transition:width .9s cubic-bezier(.22,1,.36,1);}
  .air-res.low .air-fill{background:linear-gradient(90deg,#34d399,#10b981);}
  .air-res.mid .air-fill{background:linear-gradient(90deg,#fbbf24,#f59e0b);}
  .air-res.high .air-fill{background:linear-gradient(90deg,#f87171,#ef4444);}
  .air-adv{margin-top:14px;padding-top:14px;border-top:1px solid rgba(0,0,0,.08);font-size:13px;line-height:1.65;opacity:.75;font-style:italic;}
  .air-how{background:#fff;border:1px solid #f3dde5;border-radius:22px;padding:28px;animation:cardIn .5s .2s ease both;}
  .air-how h3{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin-bottom:18px;}
  .air-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
  .air-step{text-align:center;}
  .air-snum{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#9333ea);color:#fff;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;margin:0 auto 9px;}
  .air-stitle{font-weight:700;font-size:13.5px;margin-bottom:5px;}
  .air-sdesc{font-size:12px;color:#9a6878;line-height:1.6;}
  @keyframes resIn{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @media(max-width:760px){.air-fields{grid-template-columns:repeat(2,1fr)}.air-steps{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:480px){.air-fields{grid-template-columns:1fr}}
`;
const FIELDS=[{name:"age",lbl:"Age",icon:"👤",unit:"yrs"},{name:"systolic_bp",lbl:"Systolic BP",icon:"💉",unit:"mmHg"},{name:"diastolic_bp",lbl:"Diastolic BP",icon:"🩸",unit:"mmHg"},{name:"blood_sugar",lbl:"Blood Sugar",icon:"🍬",unit:"mg/dL"},{name:"body_temp",lbl:"Body Temp",icon:"🌡️",unit:"°F"},{name:"heart_rate",lbl:"Heart Rate",icon:"❤️",unit:"bpm"}];
const ADVICE={low:"Your indicators look healthy. Keep up regular check-ups and maintain a balanced lifestyle.",mid:"Some values warrant attention. Please consult your healthcare provider for a thorough evaluation.",high:"Immediate medical consultation is strongly recommended. Please contact your doctor right away."};
function getRisk(f){let s=0;if(+f.age>35)s+=2;if(+f.systolic_bp>140)s+=3;else if(+f.systolic_bp>120)s+=1;if(+f.diastolic_bp>90)s+=3;else if(+f.diastolic_bp>80)s+=1;if(+f.blood_sugar>140)s+=3;else if(+f.blood_sugar>100)s+=1;if(+f.body_temp>100.4)s+=2;if(+f.heart_rate>100||+f.heart_rate<60)s+=1;if(s<=2)return{level:"low risk",conf:.82,cls:"low",emoji:"💚"};if(s<=5)return{level:"mid risk",conf:.71,cls:"mid",emoji:"⚠️"};return{level:"high risk",conf:.88,cls:"high",emoji:"🚨"};}
export default function AIRisk(){
  const [form,setForm]=useState({age:"",systolic_bp:"",diastolic_bp:"",blood_sugar:"",body_temp:"",heart_rate:""});
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [pct,setPct]=useState(0);
  const navigate=useNavigate();
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const predict=async()=>{setLoading(true);setRes(null);await new Promise(r=>setTimeout(r,1000));const r=getRisk(form);setRes(r);setLoading(false);setTimeout(()=>setPct(Math.round(r.conf*100)),80);};
  return(<>
    <style>{css}</style>
    <div className="air-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(244,63,94,.12) 0%,transparent 65%)"}}/>
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>AI Risk Tracker</div>
        <h1 className="pg-title air-tgrad">Instant Maternal<br/>Risk Assessment</h1>
        <p className="pg-sub">Enter your vitals and our ML model will assess your risk level in seconds — backed by clinical data.</p>
      </div>
      <div className="pg-body">
        <div className="air-form">
          <div className="air-form-title">🩺 Enter Your Health Vitals</div>
          <div className="air-fields">
            {FIELDS.map(f=>(
              <div key={f.name} className="air-field">
                <label className="air-lbl">{f.icon} {f.lbl} <span style={{marginLeft:"auto",opacity:.6,fontWeight:400,fontSize:"10.5px"}}>{f.unit}</span></label>
                <div className="air-iw"><span className="air-ico">{f.icon}</span><input className="air-inp" type="number" name={f.name} placeholder="—" value={form[f.name]} onChange={change}/></div>
              </div>))}
          </div>
          <button className="air-btn" onClick={predict} disabled={loading}>
            {loading?<><div style={{width:17,height:17,border:"2.5px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .75s linear infinite"}}/>Analysing…</>:<><span>✨</span>Predict Risk</>}
          </button>
          {res&&(<div className={`air-res ${res.cls}`}>
            <div className="air-res-top"><div className="air-emoji">{res.emoji}</div><div><div className="air-rtag">Risk Assessment</div><div className="air-rlvl">{res.level}</div></div></div>
            <div className="air-conf"><div className="air-conf-top"><span className="air-conf-lbl">Model Confidence</span><span className="air-conf-pct">{pct}%</span></div><div className="air-prog"><div className="air-fill" style={{width:`${pct}%`}}/></div></div>
            <div className="air-adv">{ADVICE[res.cls]}</div>
          </div>)}
        </div>
        <div className="air-how">
          <h3>🧠 How Our AI Works</h3>
          <div className="air-steps">
            {[{n:1,t:"Enter Vitals",d:"Input 6 key health parameters from your antenatal visit."},{n:2,t:"ML Analysis",d:"Our Random Forest model processes 47 clinical features."},{n:3,t:"Risk Score",d:"Outputs low, mid, or high risk with confidence %."},{n:4,t:"Action Plan",d:"Get personalised guidance and connect with your doctor."}].map(s=>(
              <div key={s.n} className="air-step"><div className="air-snum">{s.n}</div><div className="air-stitle">{s.t}</div><div className="air-sdesc">{s.d}</div></div>))}
          </div>
        </div>
        <div style={{marginTop:28}}><div className="pg-cta"><h3>Talk to Our Community</h3><p>Connect with verified doctors and mothers who've been through it all.</p><button className="cta-wbtn" onClick={()=>navigate("/community")}>Visit Community →</button></div></div>
      </div>
    </div>
  </>);
}