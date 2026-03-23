

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --rose:   #f43f5e;
    --amber:  #f97316;
    --peach:  #fda4af;
    --ivory:  #fffbf7;
    --cream:  #fdf6f0;
    --ink:    #2d0f1e;
    --muted:  #9a6878;
    --border: #f3dde5;
    --nav-h:  68px;
  }
  html { scroll-behavior: smooth; }
  body { font-family:'Sora',sans-serif; background:var(--ivory); color:var(--ink); overflow-x:hidden; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--cream); }
  ::-webkit-scrollbar-thumb { background:var(--peach); border-radius:99px; }

  /* ── NAV ── */
  .cm-nav {
    position:sticky; top:0; z-index:200; height:var(--nav-h);
    background:linear-gradient(105deg,#fff0f3 0%,#fff6ee 55%,#fff9f0 100%);
    border-bottom:1px solid rgba(244,63,94,.09);
    box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 6px 24px rgba(244,63,94,.07);
    transition:box-shadow .3s;
  }
  .cm-nav::before { content:''; display:block; height:3px; background:linear-gradient(90deg,#f43f5e,#f97316 55%,#fb923c); position:absolute; top:0; left:0; right:0; }
  .cm-nav.raised { box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 14px 40px rgba(244,63,94,.13); }
  .cm-nav-inner { max-width:1280px; margin:0 auto; height:100%; display:flex; align-items:center; padding:0 40px; gap:4px; }
  .cm-logo { display:flex; align-items:center; gap:9px; cursor:pointer; user-select:none; flex-shrink:0; margin-right:8px; text-decoration:none; }
  .cm-logo-badge { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#f43f5e,#f97316); display:flex; align-items:center; justify-content:center; font-size:17px; box-shadow:0 3px 12px rgba(244,63,94,.28); transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .2s; }
  .cm-logo:hover .cm-logo-badge { transform:rotate(-8deg) scale(1.1); box-shadow:0 5px 18px rgba(244,63,94,.38); }
  .cm-logo-text { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; background:linear-gradient(135deg,#f43f5e,#c2185b 45%,#f97316); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:-.02em; }
  .cm-links { display:flex; align-items:center; gap:2px; list-style:none; flex:1; justify-content:center; }
  .cm-link { display:flex; align-items:center; gap:5px; padding:8px 14px; border-radius:100px; font-size:13px; font-weight:500; color:#5c2d3e; cursor:pointer; user-select:none; white-space:nowrap; text-decoration:none; transition:background .2s,color .2s,transform .18s cubic-bezier(.22,1,.36,1),box-shadow .2s; position:relative; }
  .cm-link-icon { font-size:13px; transition:transform .28s cubic-bezier(.34,1.56,.64,1); display:inline-block; }
  .cm-link:not(.active):hover { background:rgba(244,63,94,.08); color:#f43f5e; transform:translateY(-2px); }
  .cm-link:not(.active):hover .cm-link-icon { transform:scale(1.3) rotate(-8deg); }
  .cm-link.active { background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; font-weight:600; box-shadow:0 4px 16px rgba(244,63,94,.32),0 1px 0 rgba(255,255,255,.2) inset; transform:translateY(-1px); }
  .cm-link.active::after { content:''; position:absolute; inset:0; border-radius:100px; background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent); background-size:200% 100%; animation:navShimmer 3s ease infinite; }
  .cm-link.active:hover { transform:translateY(-3px); box-shadow:0 7px 22px rgba(244,63,94,.42); }
  .cm-nav-cta { display:flex; align-items:center; gap:8px; flex-shrink:0; margin-left:6px; }
  .cm-nbtn { padding:8px 20px; border-radius:100px; font-family:'Sora',sans-serif; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; transition:transform .18s,box-shadow .2s; border:none; }
  .cm-nbtn-ghost { background:transparent; border:1.5px solid rgba(244,63,94,.28); color:#f43f5e; }
  .cm-nbtn-ghost:hover { border-color:#f43f5e; background:rgba(244,63,94,.05); transform:translateY(-2px); }
  .cm-nbtn-solid { background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; box-shadow:0 4px 14px rgba(244,63,94,.26); }
  .cm-nbtn-solid:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(244,63,94,.36); }
  .cm-hbg { display:none; flex-direction:column; gap:5px; padding:8px; background:none; border:none; cursor:pointer; margin-left:auto; border-radius:10px; transition:background .2s; }
  .cm-hbg:hover { background:rgba(244,63,94,.08); }
  .cm-hbg span { display:block; width:21px; height:2px; background:#5c2d3e; border-radius:3px; transition:transform .32s cubic-bezier(.22,1,.36,1),opacity .22s; transform-origin:center; }
  .cm-hbg.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .cm-hbg.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
  .cm-hbg.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
  .cm-drawer { position:fixed; top:var(--nav-h); left:0; right:0; background:rgba(255,247,242,.97); backdrop-filter:blur(20px); border-bottom:1px solid rgba(244,63,94,.10); padding:12px 20px 24px; z-index:199; display:flex; flex-direction:column; gap:4px; transform:translateY(-10px); opacity:0; pointer-events:none; transition:transform .36s cubic-bezier(.22,1,.36,1),opacity .26s; box-shadow:0 20px 44px rgba(244,63,94,.10); }
  .cm-drawer.open { transform:translateY(0); opacity:1; pointer-events:all; }
  .cm-ditem { display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:13px; font-size:14.5px; font-weight:500; color:#5c2d3e; cursor:pointer; text-decoration:none; transition:background .2s,color .2s,transform .18s; }
  .cm-ditem:hover { background:rgba(244,63,94,.07); color:#f43f5e; transform:translateX(4px); }
  .cm-ditem.active { background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; }
  .cm-ditem-icon { font-size:17px; }
  .cm-drawer-hr { height:1px; background:rgba(244,63,94,.10); margin:8px 0; }
  .cm-drawer-cta { display:flex; gap:10px; }
  .cm-drawer-cta .cm-nbtn { flex:1; text-align:center; }

  /* ── SHARED PAGE ── */
  .pg-fade { animation:fadeUp .5s ease both; }
  .pg-hero { text-align:center; padding:64px 40px 48px; position:relative; overflow:hidden; }
  .pg-hero-radial { position:absolute; inset:0; pointer-events:none; }
  .pg-eyebrow { display:inline-flex; align-items:center; gap:7px; background:rgba(244,63,94,.08); border:1px solid rgba(244,63,94,.15); border-radius:100px; padding:5px 15px; font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#f43f5e; margin-bottom:18px; }
  .pg-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:#f43f5e; animation:pulseDot 2s ease infinite; }
  .pg-title { font-family:'Playfair Display',serif; font-size:clamp(34px,6vw,58px); font-weight:700; letter-spacing:-.03em; line-height:1.08; margin-bottom:14px; }
  .pg-sub { font-size:16.5px; color:#9a6878; max-width:500px; margin:0 auto; line-height:1.7; }
  .pg-body { max-width:1120px; margin:0 auto; padding:0 40px 80px; }

  /* stat strip */
  .stat-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:40px; }
  .stat-card { background:#fff; border:1px solid var(--border); border-radius:18px; padding:22px 18px; text-align:center; animation:cardIn .5s ease both; transition:transform .25s,box-shadow .25s; }
  .stat-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(244,63,94,.10); }
  .stat-icon { font-size:28px; margin-bottom:6px; }
  .stat-num { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#f43f5e; line-height:1; }
  .stat-lbl { font-size:11.5px; color:#9a6878; font-weight:500; margin-top:3px; }

  /* info grid */
  .info-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:28px; }
  .info-card { background:#fff; border:1px solid var(--border); border-radius:18px; padding:26px 22px; animation:cardIn .5s ease both; transition:transform .25s,box-shadow .25s; }
  .info-card:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(244,63,94,.09); }
  .info-icon { font-size:30px; margin-bottom:10px; }
  .info-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; margin-bottom:7px; }
  .info-desc { font-size:13.5px; color:#9a6878; line-height:1.65; }

  /* cta strip */
  .pg-cta { background:linear-gradient(135deg,#f43f5e 0%,#c2185b 45%,#f97316 100%); border-radius:22px; padding:48px 36px; text-align:center; position:relative; overflow:hidden; }
  .pg-cta::before { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px); background-size:24px 24px; pointer-events:none; }
  .pg-cta h3 { font-family:'Playfair Display',serif; font-size:clamp(20px,3.5vw,34px); color:#fff; font-weight:700; margin-bottom:10px; position:relative; }
  .pg-cta p  { font-size:14.5px; color:rgba(255,255,255,.82); margin-bottom:26px; position:relative; }
  .cta-wbtn  { display:inline-block; padding:12px 34px; background:#fff; color:#f43f5e; border:none; border-radius:100px; font-family:'Sora',sans-serif; font-size:14px; font-weight:700; cursor:pointer; box-shadow:0 5px 20px rgba(0,0,0,.12); transition:transform .18s,box-shadow .2s; position:relative; }
  .cta-wbtn:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(0,0,0,.18); }

  /* keyframes */
  @keyframes navShimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes pulseDot   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.7)} }
  @keyframes cardIn     { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  @media(max-width:1080px){ .cm-nav-inner{padding:0 20px} .cm-link{padding:7px 10px;font-size:12px} .cm-nav-cta{display:none} .info-grid{grid-template-columns:1fr 1fr} .stat-row{grid-template-columns:1fr 1fr} }
  @media(max-width:768px){ .cm-links{display:none} .cm-hbg{display:flex} .pg-hero{padding:44px 20px 36px} .pg-body{padding:0 16px 60px} .info-grid{grid-template-columns:1fr} .stat-row{grid-template-columns:1fr 1fr} }
  @media(max-width:480px){ .stat-row{grid-template-columns:1fr 1fr} }
`;