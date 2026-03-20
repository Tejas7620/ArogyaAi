import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const css=`
  .nutr-page{background:linear-gradient(160deg,#f0fdf4 0%,#fffbf7 50%,#fefce8 100%);min-height:calc(100vh - 68px);}
  .nutr-tgrad{background:linear-gradient(135deg,#10b981,#eab308);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
  .nutr-tabs{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;}
  .nutr-tab{padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid #dcfce7;background:transparent;color:#10b981;transition:all .2s;font-family:'Sora',sans-serif;}
  .nutr-tab.active{background:linear-gradient(135deg,#10b981,#eab308);color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(16,185,129,.26);}
  .nutr-tab:not(.active):hover{background:rgba(16,185,129,.07);}
  .nutr-main{display:grid;grid-template-columns:1fr 300px;gap:22px;margin-bottom:24px;}
  .nutr-plan{background:#fff;border:1px solid #dcfce7;border-radius:22px;padding:26px;animation:cardIn .5s ease both;}
  .nutr-plan h3{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;margin-bottom:18px;}
  .nmeal{border-radius:13px;padding:14px 16px;margin-bottom:10px;border:1px solid;}
  .nmeal-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;}
  .nmeal-name{font-weight:700;font-size:13.5px;display:flex;align-items:center;gap:7px;}
  .nkcal{font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:100px;}
  .nchips{display:flex;gap:7px;flex-wrap:wrap;}
  .nchip{padding:3px 11px;border-radius:100px;font-size:12px;font-weight:500;}
  .nutr-side{display:flex;flex-direction:column;gap:14px;}
  .nutr-sc{background:#fff;border:1px solid #dcfce7;border-radius:18px;padding:20px;animation:cardIn .5s .1s ease both;}
  .nutr-sc h4{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;margin-bottom:14px;}
  .nmacro{margin-bottom:12px;}
  .nmacro-top{display:flex;justify-content:space-between;margin-bottom:5px;font-size:12.5px;font-weight:600;}
  .nmacro-bar{height:7px;background:#f0fdf4;border-radius:100px;overflow:hidden;}
  .nmacro-fill{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.22,1,.36,1);}
  .nutr-tips{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  .ntip{background:#fff;border:1px solid #dcfce7;border-radius:18px;padding:22px 18px;animation:cardIn .5s ease both;transition:transform .25s,box-shadow .25s;}
  .ntip:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(16,185,129,.09);}
  @media(max-width:900px){.nutr-main{grid-template-columns:1fr}.nutr-tips{grid-template-columns:1fr 1fr}}
  @media(max-width:540px){.nutr-tips{grid-template-columns:1fr}}
`;
const PLANS={
  "1st Trimester":[{time:"☀️ Breakfast",bg:"#fef9c3",bc:"#fde047",kb:"rgba(234,179,8,.12)",kc:"#854d0e",items:["Poha + Peanuts","Banana","Milk"],kcal:"420 kcal"},{time:"🍎 Mid-Morning",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Fruits","Nuts"],kcal:"180 kcal"},{time:"🍛 Lunch",bg:"#ecfdf5",bc:"#6ee7b7",kb:"rgba(16,185,129,.12)",kc:"#065f46",items:["Rice","Dal","Sabzi","Curd","Salad"],kcal:"680 kcal"},{time:"🫖 Evening",bg:"#fefce8",bc:"#fde047",kb:"rgba(234,179,8,.10)",kc:"#854d0e",items:["Sprouts chaat","Coconut water"],kcal:"240 kcal"},{time:"🌙 Dinner",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Roti","Paneer curry","Soup"],kcal:"580 kcal"}],
  "2nd Trimester":[{time:"☀️ Breakfast",bg:"#fef9c3",bc:"#fde047",kb:"rgba(234,179,8,.12)",kc:"#854d0e",items:["Oats + Milk","Egg","Orange"],kcal:"480 kcal"},{time:"🍎 Mid-Morning",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Dates","Almonds","Buttermilk"],kcal:"200 kcal"},{time:"🍛 Lunch",bg:"#ecfdf5",bc:"#6ee7b7",kb:"rgba(16,185,129,.12)",kc:"#065f46",items:["Brown rice","Fish curry","Spinach","Raita"],kcal:"720 kcal"},{time:"🫖 Evening",bg:"#fefce8",bc:"#fde047",kb:"rgba(234,179,8,.10)",kc:"#854d0e",items:["Rusk","Milk"],kcal:"260 kcal"},{time:"🌙 Dinner",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Multigrain roti","Lentil soup","Salad"],kcal:"620 kcal"}],
  "3rd Trimester":[{time:"☀️ Breakfast",bg:"#fef9c3",bc:"#fde047",kb:"rgba(234,179,8,.12)",kc:"#854d0e",items:["Upma","Boiled egg","Pomegranate"],kcal:"500 kcal"},{time:"🍎 Mid-Morning",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Banana shake","Walnuts"],kcal:"220 kcal"},{time:"🍛 Lunch",bg:"#ecfdf5",bc:"#6ee7b7",kb:"rgba(16,185,129,.12)",kc:"#065f46",items:["Khichdi","Ghee","Curd","Greens"],kcal:"750 kcal"},{time:"🫖 Evening",bg:"#fefce8",bc:"#fde047",kb:"rgba(234,179,8,.10)",kc:"#854d0e",items:["Makhana","Coconut water"],kcal:"190 kcal"},{time:"🌙 Dinner",bg:"#f0fdf4",bc:"#86efac",kb:"rgba(16,185,129,.10)",kc:"#065f46",items:["Roti","Dal makhani","Sabzi"],kcal:"640 kcal"}],
};
const MACROS=[{l:"Protein",p:72,c:"#10b981"},{l:"Carbohydrates",p:85,c:"#eab308"},{l:"Iron",p:60,c:"#f43f5e"},{l:"Calcium",p:78,c:"#0ea5e9"},{l:"Folic Acid",p:55,c:"#8b5cf6"}];
export default function Nutrition(){
  const [tri,setTri]=useState("2nd Trimester");
  const navigate=useNavigate();
  return(<>
    <style>{css}</style>
    <div className="nutr-page pg-fade">
      <div className="pg-hero"><div className="pg-hero-radial" style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(16,185,129,.10) 0%,transparent 65%)"}}/>
        <div className="pg-eyebrow"><span className="pg-eyebrow-dot"/>Nutrition Planner</div>
        <h1 className="pg-title nutr-tgrad">Eat Well,<br/>Grow Strong</h1>
        <p className="pg-sub">Customised Indian meal plans for every trimester — built around your local foods and nutritional needs.</p>
      </div>
      <div className="pg-body">
        <div className="nutr-tabs">{Object.keys(PLANS).map(t=><button key={t} className={`nutr-tab${tri===t?" active":""}`} onClick={()=>setTri(t)}>{t}</button>)}</div>
        <div className="nutr-main">
          <div className="nutr-plan">
            <h3>🥗 Daily Meal Plan — {tri}</h3>
            {PLANS[tri].map((m,i)=>(
              <div key={i} className="nmeal" style={{background:m.bg,borderColor:m.bc}}>
                <div className="nmeal-hd"><div className="nmeal-name">{m.time}</div><div className="nkcal" style={{background:m.kb,color:m.kc}}>{m.kcal}</div></div>
                <div className="nchips">{m.items.map((it,j)=><span key={j} className="nchip" style={{background:m.kb,color:m.kc}}>{it}</span>)}</div>
              </div>))}
          </div>
          <div className="nutr-side">
            <div className="nutr-sc"><h4>📊 Nutrient Goals</h4>{MACROS.map((m,i)=><div key={i} className="nmacro"><div className="nmacro-top"><span>{m.l}</span><span style={{color:m.c}}>{m.p}%</span></div><div className="nmacro-bar"><div className="nmacro-fill" style={{width:`${m.p}%`,background:m.c}}/></div></div>)}</div>
            <div className="nutr-sc"><h4>💧 Hydration</h4><p style={{fontSize:"13px",color:"#9a6878",lineHeight:1.65}}>Aim for <strong>8–10 glasses</strong> of water daily. Include coconut water, buttermilk, and fresh juices. Avoid sugary drinks and excess caffeine.</p></div>
          </div>
        </div>
        <div className="nutr-tips">
          {[{icon:"🧆",t:"Iron-Rich Foods",d:"Spinach, lentils, jaggery, and sesame seeds boost haemoglobin for mother and baby."},{icon:"🥛",t:"Calcium Sources",d:"Milk, curd, ragi, and sesame are essential for baby's bone development."},{icon:"🥜",t:"Protein Power",d:"Eggs, dal, paneer, and nuts support baby's rapid tissue growth throughout pregnancy."},{icon:"🍊",t:"Vitamin C",d:"Citrus fruits, amla, and guava enhance iron absorption and boost immunity."},{icon:"🫚",t:"Healthy Fats",d:"Ghee, nuts, and coconut help brain development and absorb fat-soluble vitamins."},{icon:"🌿",t:"Folate First",d:"Start folic acid supplements before conception and continue through the 1st trimester."}].map((t,i)=>(
            <div key={i} className="ntip" style={{animationDelay:`${i*.06}s`}}><div className="info-icon">{t.icon}</div><div className="info-title">{t.t}</div><div className="info-desc">{t.d}</div></div>))}
        </div>
        <div style={{marginTop:28}}><div className="pg-cta"><h3>Pair Nutrition with AI Risk Tracking</h3><p>Your diet impacts your maternal risk score — check it today.</p><button className="cta-wbtn" onClick={()=>navigate("/risk")}>Check AI Risk →</button></div></div>
      </div>
    </div>
  </>);
}