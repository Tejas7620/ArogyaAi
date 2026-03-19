import React from "react";
import { useNavigate } from "react-router-dom";

const homeCss = `
  .home-page { min-height:calc(100vh - 68px); }

  /* ── HERO ── */
  .home-hero {
    min-height: calc(100vh - 68px);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:80px 24px 60px; position:relative; overflow:hidden;
    background:
      radial-gradient(ellipse 75% 60% at 20% 30%, rgba(244,63,94,.14) 0%, transparent 60%),
      radial-gradient(ellipse 65% 65% at 80% 70%, rgba(249,115,22,.11) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 100%, rgba(251,113,133,.08) 0%, transparent 55%),
      #fffbf7;
  }
  .hero-blob { position:absolute; border-radius:50%; filter:blur(72px); opacity:.15; pointer-events:none; animation:blobFloat 10s ease-in-out infinite; }
  .hero-blob-1 { width:520px; height:520px; background:#f43f5e; top:-180px; left:-120px; animation-delay:0s; }
  .hero-blob-2 { width:400px; height:400px; background:#f97316; bottom:-100px; right:-100px; animation-delay:-5s; }
  .hero-blob-3 { width:280px; height:280px; background:#fda4af; top:38%; left:58%; animation-delay:-8s; }

  .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(244,63,94,.08); border:1px solid rgba(244,63,94,.18); border-radius:100px; padding:6px 18px; font-size:11.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#f43f5e; margin-bottom:28px; position:relative; animation:fadeUp .7s .1s ease both; }
  .hero-badge-dot { width:7px; height:7px; border-radius:50%; background:#f43f5e; animation:pulseDot 2s ease infinite; }

  .hero-title { font-family:'Playfair Display',serif; font-size:clamp(72px,14vw,120px); font-weight:700; line-height:.95; letter-spacing:-.035em; margin-bottom:6px; position:relative; animation:fadeUp .7s .2s ease both; }
  .hero-title .care { background:linear-gradient(135deg,#f43f5e,#c2185b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .hero-title .maa  { font-style:italic; background:linear-gradient(135deg,#f97316,#e8620f); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .hero-sub { font-size:clamp(16px,2.5vw,21px); color:#9a6878; max-width:480px; line-height:1.65; margin:22px auto 44px; position:relative; animation:fadeUp .7s .3s ease both; }

  .hero-btns { display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap; position:relative; animation:fadeUp .7s .44s ease both; }
  .hero-btn-primary { padding:15px 36px; border:none; border-radius:100px; background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; font-family:'Sora',sans-serif; font-size:15px; font-weight:600; cursor:pointer; box-shadow:0 8px 26px rgba(244,63,94,.30); transition:transform .18s,box-shadow .2s; letter-spacing:.01em; }
  .hero-btn-primary:hover { transform:translateY(-3px); box-shadow:0 14px 34px rgba(244,63,94,.38); }
  .hero-btn-primary:active { transform:scale(.97); }
  .hero-btn-ghost { padding:14px 30px; border:1.5px solid #f3dde5; border-radius:100px; background:transparent; color:#2d0f1e; font-family:'Sora',sans-serif; font-size:15px; font-weight:500; cursor:pointer; transition:border-color .2s,background .2s,transform .18s; }
  .hero-btn-ghost:hover { border-color:#fda4af; background:rgba(244,63,94,.04); transform:translateY(-2px); }

  .hero-stats { display:flex; align-items:center; gap:44px; margin-top:64px; flex-wrap:wrap; justify-content:center; position:relative; animation:fadeUp .7s .58s ease both; }
  .hstat { text-align:center; }
  .hstat-num { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:#f43f5e; line-height:1; }
  .hstat-lbl { font-size:11.5px; color:#9a6878; font-weight:500; margin-top:5px; letter-spacing:.03em; }
  .hstat-div  { width:1px; height:38px; background:#f3dde5; }

  /* ── CARDS SECTION ── */
  .home-section { max-width:1160px; margin:0 auto; padding:80px 40px 100px; }
  .home-sh { text-align:center; margin-bottom:56px; }
  .home-sh-eye { font-size:11.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:#f43f5e; margin-bottom:14px; }
  .home-sh-title { font-family:'Playfair Display',serif; font-size:clamp(30px,5vw,48px); font-weight:700; line-height:1.12; letter-spacing:-.025em; color:#2d0f1e; max-width:540px; margin:0 auto 14px; }
  .home-sh-title em { font-style:italic; color:#f43f5e; -webkit-text-fill-color:#f43f5e; }
  .home-sh-desc { font-size:15.5px; color:#9a6878; max-width:460px; margin:0 auto; line-height:1.7; }

  .home-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }

  .hcard { background:#fff; border:1px solid #f3dde5; border-radius:22px; padding:30px 26px 24px; display:flex; flex-direction:column; cursor:pointer; position:relative; overflow:hidden; transition:transform .30s cubic-bezier(.22,1,.36,1),box-shadow .30s,border-color .22s; animation:cardIn .55s ease both; }
  .hcard::before { content:''; position:absolute; inset:0; border-radius:22px; background:linear-gradient(135deg,var(--wa,#fdf2f5),var(--wb,#fff)); opacity:0; transition:opacity .28s; }
  .hcard::after  { content:''; position:absolute; top:0; left:22px; right:22px; height:2px; border-radius:0 0 4px 4px; background:var(--strip,linear-gradient(90deg,#f43f5e,#f97316)); opacity:0; transform:scaleX(.5); transition:opacity .28s,transform .32s cubic-bezier(.22,1,.36,1); }
  .hcard:hover { transform:translateY(-10px) scale(1.012); box-shadow:0 22px 52px rgba(244,63,94,.12),0 4px 12px rgba(244,63,94,.07); border-color:#fda4af; }
  .hcard:hover::before { opacity:1; }
  .hcard:hover::after  { opacity:1; transform:scaleX(1); }
  .hcard-icon { width:64px; height:64px; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:30px; margin-bottom:20px; position:relative; z-index:1; transition:transform .32s cubic-bezier(.34,1.56,.64,1); }
  .hcard:hover .hcard-icon { transform:scale(1.10) rotate(-6deg); }
  .hcard-title { font-family:'Playfair Display',serif; font-size:20px; font-weight:700; letter-spacing:-.015em; color:#2d0f1e; margin-bottom:10px; position:relative; z-index:1; }
  .hcard-desc  { font-size:14px; color:#9a6878; line-height:1.7; flex:1; position:relative; z-index:1; }
  .hcard-cta   { display:inline-flex; align-items:center; gap:6px; margin-top:22px; font-size:13.5px; font-weight:600; color:#f43f5e; background:none; border:none; cursor:pointer; padding:0; font-family:'Sora',sans-serif; position:relative; z-index:1; transition:gap .2s,color .2s; }
  .hcard-cta:hover { gap:10px; color:#f97316; }
  .hcard-arrow { display:inline-block; transition:transform .22s; }
  .hcard:hover .hcard-arrow { transform:translateX(4px); }

  /* ── BOTTOM CTA ── */
  .home-cta-wrap { max-width:1160px; margin:0 auto 0; padding:0 40px 100px; }
  .home-cta-inner { border-radius:28px; background:linear-gradient(135deg,#f43f5e 0%,#c2185b 45%,#f97316 100%); padding:64px 40px; text-align:center; position:relative; overflow:hidden; }
  .home-cta-inner::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px); background-size:26px 26px; pointer-events:none; }
  .home-cta-title { font-family:'Playfair Display',serif; font-size:clamp(24px,4vw,42px); color:#fff; font-weight:700; letter-spacing:-.02em; margin-bottom:12px; position:relative; }
  .home-cta-sub   { font-size:15px; color:rgba(255,255,255,.82); margin-bottom:32px; max-width:400px; margin-left:auto; margin-right:auto; line-height:1.65; position:relative; }
  .home-cta-btn   { display:inline-block; padding:14px 38px; background:#fff; color:#f43f5e; border:none; border-radius:100px; font-family:'Sora',sans-serif; font-size:15px; font-weight:700; cursor:pointer; box-shadow:0 6px 24px rgba(0,0,0,.13); transition:transform .18s,box-shadow .2s; position:relative; }
  .home-cta-btn:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,.18); }

  @keyframes blobFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.04)} }

  @media(max-width:900px){ .home-grid{grid-template-columns:repeat(2,1fr);gap:18px} }
  @media(max-width:600px){ .home-grid{grid-template-columns:1fr} .home-section,.home-cta-wrap{padding-left:16px;padding-right:16px} .hero-stats{gap:20px} .hstat-div{display:none} .home-cta-inner{padding:44px 22px;border-radius:18px} }
`;

const CARDS = [
  { emoji:"🌸", title:"Period Tracker",      desc:"Log cycles, predict ovulation, and understand your body with intelligent pattern analysis.", iconBg:"linear-gradient(135deg,#fce7f3,#fda4af)", wa:"#fff0f4", wb:"#ffe4ec", strip:"linear-gradient(90deg,#f43f5e,#fb7185)", to:"/period",      delay:"0s" },
  { emoji:"🤰", title:"Pregnancy Monitor",   desc:"Week-by-week guidance, symptom tracking, and milestone reminders throughout your journey.",  iconBg:"linear-gradient(135deg,#ffedd5,#fdba74)", wa:"#fff5ee", wb:"#ffe8d5", strip:"linear-gradient(90deg,#f97316,#fb923c)", to:"/pregnancy",   delay:".06s" },
  { emoji:"🩺", title:"AI Risk Tracker",     desc:"Powered by machine learning — assess maternal risk levels from your health vitals instantly.", iconBg:"linear-gradient(135deg,#fee2e2,#fca5a5)", wa:"#fdf0f2", wb:"#fce4e8", strip:"linear-gradient(90deg,#ef4444,#f43f5e)", to:"/risk",        delay:".12s" },
  { emoji:"💉", title:"Vaccination Schedule",desc:"Never miss a dose. Personalised vaccination timelines for both mother and child.",            iconBg:"linear-gradient(135deg,#e0f2fe,#7dd3fc)", wa:"#f0f9ff", wb:"#e0f2fe", strip:"linear-gradient(90deg,#0ea5e9,#38bdf8)", to:"/vaccination", delay:".18s" },
  { emoji:"🥗", title:"Nutrition Planner",   desc:"Custom meal plans for every trimester and post-natal stage, built around Indian diets.",      iconBg:"linear-gradient(135deg,#dcfce7,#86efac)", wa:"#f0fdf4", wb:"#dcfce7", strip:"linear-gradient(90deg,#10b981,#34d399)", to:"/nutrition",   delay:".24s" },
  { emoji:"👩‍⚕️", title:"Community",         desc:"Connect with healthcare workers, mothers, and verified experts across India.",               iconBg:"linear-gradient(135deg,#fef9c3,#fde047)", wa:"#fefce8", wb:"#fef9c3", strip:"linear-gradient(90deg,#eab308,#facc15)", to:"/community",   delay:".30s" },
];

const STATS = [
  { num:"50K+", lbl:"Mothers Supported" },
  { num:"98%",  lbl:"Accuracy Rate" },
  { num:"6",    lbl:"Health Modules" },
  { num:"24/7", lbl:"AI Assistance" },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <style>{homeCss}</style>
      <div className="home-page">
        {/* Hero */}
        <section className="home-hero">
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />
          <div className="hero-badge"><span className="hero-badge-dot" />Trusted Maternal &amp; Child Care</div>
          <h1 className="hero-title"><span className="care">Care</span><span className="maa">Maa</span></h1>
          <p className="hero-sub">Your Maternal &amp; Child Health Companion —<br />powered by AI, designed with love.</p>
          <div className="hero-btns">
            <button className="hero-btn-primary" onClick={() => navigate("/risk")}>Get Started Free</button>
            <button className="hero-btn-ghost">Watch Demo ▶</button>
          </div>
          <div className="hero-stats">
            {STATS.map((s,i) => (
              <React.Fragment key={s.num}>
                {i > 0 && <div className="hstat-div" />}
                <div className="hstat"><div className="hstat-num">{s.num}</div><div className="hstat-lbl">{s.lbl}</div></div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="home-section">
          <div className="home-sh">
            <div className="home-sh-eye">Everything You Need</div>
            <h2 className="home-sh-title">Health Tools Built for <em>Every Stage</em></h2>
            <p className="home-sh-desc">From your first period to post-natal care — CareMaa walks with you through every milestone.</p>
          </div>
          <div className="home-grid">
            {CARDS.map(c => (
              <div key={c.to} className="hcard" style={{"--wa":c.wa,"--wb":c.wb,"--strip":c.strip,animationDelay:c.delay}} onClick={() => navigate(c.to)}>
                <div className="hcard-icon" style={{background:c.iconBg}}>{c.emoji}</div>
                <div className="hcard-title">{c.title}</div>
                <div className="hcard-desc">{c.desc}</div>
                <button className="hcard-cta">Explore <span className="hcard-arrow">→</span></button>
              </div>
            ))}
          </div>
        </section>

       

        {/* Bottom CTA */}
        <div className="home-cta-wrap">
          <div className="home-cta-inner">
            <h2 className="home-cta-title">Start Your Health Journey Today</h2>
            <p className="home-cta-sub">Join thousands of mothers across India who trust CareMaa for smarter, kinder maternal care.</p>
            <button className="home-cta-btn" onClick={() => navigate("/risk")}>Try CareMaa Free →</button>
          </div>
        </div>
      </div>
    </>
  );
}