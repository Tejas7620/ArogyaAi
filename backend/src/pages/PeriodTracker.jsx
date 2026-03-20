import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000";

/* ─── Utility ─────────────────────────────────────── */
const fmt = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const monthName = (m) =>
  ["January","February","March","April","May","June",
   "July","August","September","October","November","December"][m - 1] || "";

/* ─── Styles ───────────────────────────────────────── */
const css = `
  .pt-page { background:linear-gradient(160deg,#fff0f4 0%,#fffbf7 40%,#fff5ee 100%); min-height:calc(100vh - 68px); }
  .pt-title-grad { background:linear-gradient(135deg,#f43f5e,#c2185b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* ── Input Form Card ── */
  .pt-form-card { background:#fff; border:1px solid #f3dde5; border-radius:22px; padding:28px; margin-bottom:24px; animation:cardIn .5s ease both; }
  .pt-form-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#2d0f1e; margin-bottom:18px; }
  .pt-form-row { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .pt-field label { display:block; font-size:11.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#9a6878; margin-bottom:6px; }
  .pt-field input {
    width:100%; padding:10px 14px; border:1.5px solid #f3dde5; border-radius:12px;
    font-family:'Sora',sans-serif; font-size:14px; color:#2d0f1e;
    background:#fffbf7; outline:none; transition:border-color .2s,box-shadow .2s;
  }
  .pt-field input:focus { border-color:#f43f5e; box-shadow:0 0 0 3px rgba(244,63,94,.10); }
  .pt-submit {
    margin-top:18px; padding:11px 28px; background:linear-gradient(135deg,#f43f5e,#f97316);
    color:#fff; border:none; border-radius:100px; font-family:'Sora',sans-serif;
    font-size:14px; font-weight:600; cursor:pointer; box-shadow:0 5px 20px rgba(244,63,94,.28);
    transition:transform .18s,box-shadow .2s;
  }
  .pt-submit:hover { transform:translateY(-2px); box-shadow:0 9px 26px rgba(244,63,94,.36); }
  .pt-submit:disabled { opacity:.55; cursor:default; transform:none; }
  .pt-api-status { margin-top:10px; font-size:12px; font-weight:500; }
  .pt-api-ok  { color:#10b981; }
  .pt-api-err { color:#f43f5e; }

  /* ── Notification Banner ── */
  .pt-notif-card { background:#fff; border:1px solid #f3dde5; border-radius:18px; padding:18px 22px; margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; animation:cardIn .4s ease both; }
  .pt-notif-info { display:flex; align-items:center; gap:12px; }
  .pt-notif-icon { font-size:26px; line-height:1; }
  .pt-notif-text strong { display:block; font-size:14px; font-weight:700; color:#2d0f1e; }
  .pt-notif-text span   { font-size:12px; color:#9a6878; }
  .pt-notif-btn {
    padding:9px 22px; border:none; border-radius:100px; font-family:'Sora',sans-serif;
    font-size:13px; font-weight:600; cursor:pointer; transition:transform .18s,box-shadow .2s;
  }
  .pt-notif-btn.enable  { background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; box-shadow:0 4px 16px rgba(244,63,94,.26); }
  .pt-notif-btn.enable:hover  { transform:translateY(-2px); box-shadow:0 8px 22px rgba(244,63,94,.34); }
  .pt-notif-btn.enabled { background:#f0fdf4; color:#16a34a; border:1.5px solid #86efac; cursor:default; }
  .pt-notif-btn.denied  { background:#fff1f0; color:#9a6878; border:1.5px solid #f3dde5; cursor:not-allowed; }

  /* ── Calendar ── */
  .pt-cal-card { background:#fff; border:1px solid #f3dde5; border-radius:22px; padding:28px; margin-bottom:24px; animation:cardIn .5s .1s ease both; }
  .pt-cal-head { font-family:'Playfair Display',serif; font-size:20px; font-weight:700; margin-bottom:22px; }
  .pt-cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
  .pt-dh { text-align:center; font-size:10.5px; font-weight:700; color:#9a6878; letter-spacing:.06em; text-transform:uppercase; padding-bottom:8px; }
  .pt-d { aspect-ratio:1; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:500; cursor:default; transition:background .2s,transform .18s; color:#2d0f1e; }
  .pt-d:not(.pt-d-emp):hover { background:rgba(244,63,94,.10); transform:scale(1.12); }
  .pt-d.per         { background:linear-gradient(135deg,#f43f5e,#fb7185); color:#fff; box-shadow:0 3px 10px rgba(244,63,94,.30); }
  .pt-d.ov          { background:linear-gradient(135deg,#f97316,#fb923c); color:#fff; box-shadow:0 3px 10px rgba(249,115,22,.30); }
  .pt-d.fer         { background:rgba(244,63,94,.13); color:#f43f5e; font-weight:700; }
  .pt-d.tod         { border:2px solid #f43f5e; font-weight:700; }
  .pt-d.next-per    { background:rgba(244,63,94,.07); color:#f43f5e; border:1px dashed #f43f5e; }
  .pt-d-emp         { cursor:default; }
  .pt-legend { display:flex; gap:18px; flex-wrap:wrap; margin-top:14px; }
  .pt-leg    { display:flex; align-items:center; gap:7px; font-size:12px; color:#9a6878; }
  .pt-ldot   { width:10px; height:10px; border-radius:50%; }

  /* ── Feat grid ── */
  .pt-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:28px; }
  .pt-fc { background:#fff; border:1px solid #f3dde5; border-radius:18px; padding:24px 20px; animation:cardIn .5s ease both; transition:transform .25s,box-shadow .25s; cursor:pointer; }
  .pt-fc:hover { transform:translateY(-5px); box-shadow:0 14px 36px rgba(244,63,94,.10); }

  /* ── Symptom Modal ── */
  .pt-modal-overlay { position:fixed; inset:0; background:rgba(45,15,30,.48); backdrop-filter:blur(5px); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeUp .22s ease both; }
  .pt-modal { background:#fff; border-radius:24px; padding:32px 28px; max-width:460px; width:100%; box-shadow:0 24px 60px rgba(244,63,94,.20); position:relative; max-height:92vh; overflow-y:auto; }
  .pt-modal h3 { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#2d0f1e; margin-bottom:4px; }
  .pt-modal-sub { font-size:13px; color:#9a6878; margin-bottom:22px; }
  .pt-modal-close { position:absolute; top:16px; right:18px; font-size:20px; cursor:pointer; color:#9a6878; border:none; background:none; line-height:1; transition:color .2s; }
  .pt-modal-close:hover { color:#f43f5e; }
  /* field styles inside modal */
  .pt-mfield { margin-bottom:18px; }
  .pt-mfield label { display:block; font-size:11.5px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#9a6878; margin-bottom:7px; }
  .pt-mfield select, .pt-mfield textarea {
    width:100%; padding:10px 14px; border:1.5px solid #f3dde5; border-radius:12px;
    font-family:'Sora',sans-serif; font-size:14px; color:#2d0f1e;
    background:#fffbf7; outline:none; transition:border-color .2s,box-shadow .2s; resize:none;
  }
  .pt-mfield select:focus, .pt-mfield textarea:focus { border-color:#f43f5e; box-shadow:0 0 0 3px rgba(244,63,94,.10); }
  /* radio/toggle pills */
  .pt-pill-row { display:flex; gap:8px; flex-wrap:wrap; }
  .pt-pill { padding:8px 18px; border:1.5px solid #f3dde5; border-radius:100px; font-size:13px; font-weight:500; color:#2d0f1e; cursor:pointer; transition:border-color .2s,background .2s,color .2s; background:#fffbf7; }
  .pt-pill:hover { border-color:#fda4af; }
  .pt-pill.sel { border-color:#f43f5e; background:linear-gradient(135deg,rgba(244,63,94,.10),rgba(249,115,22,.06)); color:#f43f5e; font-weight:600; }
  /* footer */
  .pt-modal-footer { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:22px; flex-wrap:wrap; }
  .pt-modal-save { padding:11px 28px; background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; border:none; border-radius:100px; font-family:'Sora',sans-serif; font-size:14px; font-weight:600; cursor:pointer; box-shadow:0 5px 20px rgba(244,63,94,.28); transition:transform .18s,box-shadow .2s; }
  .pt-modal-save:hover { transform:translateY(-2px); }
  .pt-modal-hint { font-size:11.5px; color:#9a6878; }

  @media(max-width:820px){ .pt-feat-grid{grid-template-columns:1fr 1fr} .pt-form-row{grid-template-columns:1fr 1fr} }
  @media(max-width:540px){ .pt-feat-grid{grid-template-columns:1fr} .pt-form-row{grid-template-columns:1fr} }
`;

const WEEK_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ─── Default (static) calendar for March 2025 ─────── */
const STATIC_PERIOD_DAYS = [3,4,5,6,7];
const STATIC_FERTILE_DAYS = [12,13,14,15,16];
const STATIC_OV_DAY = 14;
const STATIC_TODAY = 18;

function staticCls(d) {
  if (!d) return "pt-d-emp";
  if (d === STATIC_OV_DAY)            return "ov";
  if (STATIC_PERIOD_DAYS.includes(d)) return "per";
  if (STATIC_FERTILE_DAYS.includes(d))return "fer";
  if (d === STATIC_TODAY)             return "tod";
  return "";
}

export default function PeriodTracker() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  /* ── Symptom modal state ── */
  const [showSymModal, setShowSymModal] = useState(false);
  const [symSaved, setSymSaved]   = useState(false);
  const [symForm, setSymForm] = useState({
    mood: "Happy",
    flow: "Medium",
    cramps: "No",
    notes: "",
  });

  const openSymModal = () => {
    // pre-fill from localStorage if previous entry exists
    const saved = localStorage.getItem("pt_symptom_log");
    if (saved) {
      try { setSymForm(JSON.parse(saved)); } catch (_) {}
    }
    setSymSaved(false);
    setShowSymModal(true);
  };

  const saveSymptoms = () => {
    const entry = { ...symForm, date: today };
    localStorage.setItem("pt_symptom_log", JSON.stringify(entry));
    setSymSaved(true);
    setTimeout(() => { setShowSymModal(false); setSymSaved(false); }, 1000);
  };

  /* ── Form state ── */
  const [form, setForm] = useState({
    last_period: today,
    cycle_length: 28,
    period_length: 5,
  });

  /* ── Prediction data from API ── */
  const [pred, setPred] = useState(null);
  const [calDays, setCalDays] = useState(null);
  const [calMeta, setCalMeta] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reminderSuccess, setReminderSuccess] = useState(false);
  const [sharingRedirect, setSharingRedirect] = useState(false);
  const [tipsLoading, setTipsLoading] = useState(false);

  /* ── Notification state ── */
  const [notifPerm, setNotifPerm] = useState(
    () => ("Notification" in window ? Notification.permission : "unsupported")
  );

  const daysUntil = (iso) => {
    if (!iso) return null;
    const diff = new Date(iso + "T00:00:00") - new Date(new Date().toDateString());
    return Math.round(diff / 86400000);
  };

  const fireNotif = (title, body) => {
    if (Notification.permission === "granted") {
      try { new Notification(title, { body, icon: "/favicon.ico" }); } catch (_) {}
    }
  };

  const checkAndNotify = useCallback((prediction) => {
    if (!prediction) return;
    const dPeriod = daysUntil(prediction.next_period);
    const dOvul   = daysUntil(prediction.ovulation_day);
    if (dPeriod !== null && dPeriod >= 0 && dPeriod <= 3)
      fireNotif(
        dPeriod === 0 ? "🩸 Period starts today!" : `🩸 Period in ${dPeriod} day${dPeriod > 1 ? "s" : ""}`,
        `Your next period is expected on ${fmt(prediction.next_period)}.`
      );
    if (dOvul !== null && dOvul >= 0 && dOvul <= 2)
      fireNotif(
        dOvul === 0 ? "🌿 Ovulation day!" : `🌿 Ovulation in ${dOvul} day${dOvul > 1 ? "s" : ""}`,
        `Your ovulation is estimated on ${fmt(prediction.ovulation_day)}.`
      );
  }, []);

  const enableNotifications = async () => {
    if (!("Notification" in window)) { setNotifPerm("unsupported"); return; }
    const result = await Notification.requestPermission();
    setNotifPerm(result);
    if (result === "granted") {
      localStorage.setItem("pt_notif_enabled", "true");
      checkAndNotify(pred);
    }
  };

  useEffect(() => {
    if (Notification.permission === "granted" && localStorage.getItem("pt_notif_enabled") === "true") {
      setNotifPerm("granted");
      checkAndNotify(pred);
    }
  }, [pred, checkAndNotify]);

  /* ── Fetch calendar after a prediction is stored ── */
  const fetchCalendar = useCallback(async () => {
    try {
      const r = await fetch(`${API}/calendar`);
      const d = await r.json();
      if (d.status === "success") {
        setCalDays(d.days);
        setCalMeta({ month: d.month, year: d.year, first_weekday: d.first_weekday });
      }
    } catch (_) {}
  }, []);

  /* ── On mount: load existing prediction ── */
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/prediction`);
        const d = await r.json();
        if (d.status === "success") { setPred(d); fetchCalendar(); }
      } catch (_) {}
    })();
  }, [fetchCalendar]);

  /* ── Submit handler ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const r = await fetch(`${API}/cycle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          last_period: form.last_period,
          cycle_length: Number(form.cycle_length),
          period_length: Number(form.period_length),
        }),
      });
      const d = await r.json();
      if (d.status === "success") {
        setPred(d);
        setStatus("ok");
        await fetchCalendar();
      } else {
        setStatus("err");
      }
    } catch (_) {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  };

  /* ── Build stat cards dynamically ── */
  const stats = pred
    ? [
        { icon: "🌸", num: pred.cycle_length + " d", lbl: "Avg Cycle" },
        { icon: "🩸", num: pred.period_length + " d", lbl: "Period Days" },
        { icon: "🌿", num: fmt(pred.ovulation_day), lbl: "Ovulation" },
        { icon: "📅", num: fmt(pred.next_period),   lbl: "Next Period" },
      ]
    : [
        { icon: "🌸", num: "28 d",    lbl: "Avg Cycle" },
        { icon: "🩸", num: "5 d",     lbl: "Period Days" },
        { icon: "🌿", num: "Day 14",  lbl: "Fertile Day" },
        { icon: "📅", num: "Mar 21",  lbl: "Next Period" },
      ];

  /* ── Build calendar cells ── */
  let calHeader = "🗓️ March 2025 — Cycle Calendar";
  let cells = null;
  let dayClass = null;

  if (calDays && calMeta) {
    // Convert python weekday (0=Mon) → JS Sunday-first offset
    const pyFirst = calMeta.first_weekday; // 0=Mon
    const jsFirst = (pyFirst + 1) % 7;    // 0=Sun
    const blanks = Array(jsFirst).fill(null);
    cells = [...blanks, ...calDays];
    const kindMap = {};
    calDays.forEach(({ day, kind }) => { kindMap[day] = kind; });
    dayClass = (d) => {
      if (!d) return "pt-d-emp";
      const k = kindMap[d.day] || "default";
      if (k === "period")     return "per";
      if (k === "ovulation")  return "ov";
      if (k === "fertile")    return "fer";
      if (k === "today")      return "tod";
      if (k === "next_period")return "next-per";
      return "";
    };
    calHeader = `🗓️ ${monthName(calMeta.month)} ${calMeta.year} — Cycle Calendar`;
  } else {
    // Static fallback
    const first = new Date(2025, 2, 1).getDay(), total = 31;
    cells = [...Array(first).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
    dayClass = (d) => staticCls(d);
  }

  /* ─── Render ───────────────────────────────────────── */
  return (
    <>
      <style>{css}</style>
      <div className="pt-page pg-fade">

        {/* Hero */}
        <div className="pg-hero">
          <div className="pg-hero-radial" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(244,63,94,.12) 0%,transparent 65%)" }} />
          <div className="pg-eyebrow"><span className="pg-eyebrow-dot" />Period Tracker</div>
          <h1 className="pg-title pt-title-grad">Know Your Body,<br />Own Your Cycle</h1>
          <p className="pg-sub">Track your period, predict ovulation, and gain deep insight into your menstrual health.</p>
        </div>

        <div className="pg-body">

          {/* ── Notification Banner ── */}
          <div className="pt-notif-card">
            <div className="pt-notif-info">
              <div className="pt-notif-icon">🔔</div>
              <div className="pt-notif-text">
                <strong>Smart Reminders</strong>
                <span>
                  {notifPerm === "granted"
                    ? "Notifications are active. You'll be reminded before your period and ovulation."
                    : notifPerm === "denied"
                    ? "Notifications blocked. Please allow them in your browser settings."
                    : notifPerm === "unsupported"
                    ? "Your browser does not support notifications."
                    : "Get notified 3 days before your period and 2 days before ovulation."}
                </span>
              </div>
            </div>
            {notifPerm === "granted" ? (
              <button className="pt-notif-btn enabled" disabled>✅ Notifications On</button>
            ) : notifPerm === "denied" ? (
              <button className="pt-notif-btn denied" disabled>🚫 Blocked</button>
            ) : notifPerm === "unsupported" ? (
              <button className="pt-notif-btn denied" disabled>❌ Not Supported</button>
            ) : (
              <button className="pt-notif-btn enable" onClick={enableNotifications}>🔔 Enable Notifications</button>
            )}
          </div>

          {/* ── Input Form ── */}
          <div className="pt-form-card">
            <div className="pt-form-title">📋 Enter Your Cycle Details</div>
            <form onSubmit={handleSubmit}>
              <div className="pt-form-row">
                <div className="pt-field">
                  <label>Last Period Date</label>
                  <input
                    type="date" max={today} value={form.last_period}
                    onChange={e => setForm(f => ({ ...f, last_period: e.target.value }))}
                    required
                  />
                </div>
                <div className="pt-field">
                  <label>Cycle Length (days)</label>
                  <input
                    type="number" min="21" max="45" value={form.cycle_length}
                    onChange={e => setForm(f => ({ ...f, cycle_length: e.target.value }))}
                    required
                  />
                </div>
                <div className="pt-field">
                  <label>Period Length (days)</label>
                  <input
                    type="number" min="2" max="10" value={form.period_length}
                    onChange={e => setForm(f => ({ ...f, period_length: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <button className="pt-submit" type="submit" disabled={loading}>
                {loading ? "Calculating…" : "Calculate Predictions →"}
              </button>
              {status === "ok"  && <p className="pt-api-status pt-api-ok">✅ Predictions updated successfully!</p>}
              {status === "err" && <p className="pt-api-status pt-api-err">⚠️ Could not connect to backend. Start the ml-service and try again.</p>}
            </form>
          </div>

          {/* ── Stats strip ── */}
          <div className="stat-row">
            {stats.map((s, i) => (
              <div key={i} className="stat-card" style={{ animationDelay: `${i * .06}s` }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* ── Extra prediction pills (shown after API call) ── */}
          {pred && (
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
              {[
                { label:"Fertile Window", val:`${fmt(pred.fertile_start)} – ${fmt(pred.fertile_end)}`, color:"#10b981" },
                { label:"Cycle Day Today", val:`Day ${pred.cycle_day}`, color:"#f43f5e" },
              ].map(p => (
                <div key={p.label} style={{ background:"#fff", border:"1px solid #f3dde5", borderRadius:14, padding:"10px 18px", fontSize:13, color:"#2d0f1e" }}>
                  <span style={{ color:p.color, fontWeight:700 }}>{p.label}: </span>{p.val}
                </div>
              ))}
            </div>
          )}

          {/* ── Calendar ── */}
          <div className="pt-cal-card">
            <div className="pt-cal-head">{calHeader}</div>
            <div className="pt-cal-grid">
              {WEEK_LABELS.map(d => <div key={d} className="pt-dh">{d}</div>)}
              {cells.map((d, i) => (
                <div key={i} className={`pt-d ${dayClass(d)}`}>
                  {calDays ? (d ? d.day : "") : (d || "")}
                </div>
              ))}
            </div>
            <div className="pt-legend">
              <div className="pt-leg"><div className="pt-ldot" style={{ background: "#f43f5e" }} />Period</div>
              <div className="pt-leg"><div className="pt-ldot" style={{ background: "rgba(244,63,94,.25)" }} />Fertile</div>
              <div className="pt-leg"><div className="pt-ldot" style={{ background: "#f97316" }} />Ovulation</div>
              <div className="pt-leg"><div className="pt-ldot" style={{ border: "2px solid #f43f5e", background: "transparent" }} />Today</div>
              <div className="pt-leg"><div className="pt-ldot" style={{ border: "1px dashed #f43f5e", background: "rgba(244,63,94,.07)" }} />Next Period</div>
            </div>
          </div>

          {/* ── Features ── */}
          <div className="pt-feat-grid">
            {[
              { icon:"📊", t:"Cycle Analytics",  d:"Visualise trends over 6–12 months to spot irregularities early.",        onClick:() => navigate("/analytics") },
              { icon:"🔔", t:"Smart Reminders",  d:"Get notified before your period, fertile window, and ovulation day.",    onClick: async () => {
                console.log("Reminder feature working");
                if (!("Notification" in window)) {
                  alert("Your browser does not support notifications.");
                  return;
                }
                const res = await Notification.requestPermission();
                if (res === "granted") {
                  new Notification("Reminder Enabled 💖", {
                    body: "You will be notified before your period and ovulation."
                  });
                  setReminderSuccess(true);
                  setTimeout(() => {
                    setReminderSuccess(false);
                    navigate("/period");
                  }, 2000);
                } else {
                  alert("Notifications were denied. Please enable them in browser settings.");
                }
              } },
              { icon:"💊", t:"Symptom Log",       d:"Log cramps, mood, flow intensity, and more for detailed health insights.",onClick:() => openSymModal() },
              { icon:"🤝", t:"Partner Sharing",  d:"Optionally share your cycle data with your partner or doctor.",           onClick: () => {
                console.log("Partner sharing clicked");
                alert("Sharing feature coming soon. Redirecting to dashboard...");
                setSharingRedirect(true);
                setTimeout(() => {
                  setSharingRedirect(false);
                  navigate("/period");
                }, 1500);
              } },
              { icon:"🧠", t:"AI Predictions",   d:"Our ML model improves accuracy with every cycle you log.",                onClick:() => navigate("/risk") },
              { icon:"🌿", t:"Wellness Tips",    d:"Personalised nutrition and exercise advice based on your current phase.",  onClick: () => {
                console.log("Wellness tips clicked");
                alert("Personalised wellness tips loading...");
                setTipsLoading(true);
                setTimeout(() => {
                  setTipsLoading(false);
                  navigate("/period");
                }, 1500);
              } },
            ].map((f, i) => (
              <div key={i} className="pt-fc" style={{ animationDelay:`${i * .06}s` }} onClick={f.onClick}>
                <div className="info-icon">{f.icon}</div>
                <div className="info-title">{f.t}</div>
                <div className="info-desc">{f.d}</div>
                {f.t === "Smart Reminders" && reminderSuccess && (
                  <p style={{ color: "#16a34a", fontSize: "12px", marginTop: "8px", fontWeight: "600" }}>
                    Reminders activated successfully!
                  </p>
                )}
                {f.t === "Partner Sharing" && sharingRedirect && (
                  <p style={{ color: "#f43f5e", fontSize: "12px", marginTop: "8px", fontWeight: "600" }}>
                    Redirecting...
                  </p>
                )}
                {f.t === "Wellness Tips" && tipsLoading && (
                  <p style={{ color: "#f97316", fontSize: "12px", marginTop: "8px", fontWeight: "600" }}>
                    Fetching tips...
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ── Symptom Log Modal ── */}
          {showSymModal && (
            <div className="pt-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowSymModal(false); }}>
              <div className="pt-modal">
                <button className="pt-modal-close" onClick={() => setShowSymModal(false)}>✕</button>
                <h3>💊 Symptom Log</h3>
                <p className="pt-modal-sub">How are you feeling today? Your log is saved locally.</p>

                {/* Mood */}
                <div className="pt-mfield">
                  <label>😊 Mood</label>
                  <select value={symForm.mood} onChange={e => setSymForm(f => ({ ...f, mood: e.target.value }))}>
                    {["Happy","Calm","Anxious","Irritable","Sad","Energetic","Tired"].map(m => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Flow */}
                <div className="pt-mfield">
                  <label>💧 Flow Intensity</label>
                  <div className="pt-pill-row">
                    {["Light","Medium","Heavy","Spotting","None"].map(f => (
                      <div
                        key={f}
                        className={`pt-pill${symForm.flow === f ? " sel" : ""}`}
                        onClick={() => setSymForm(sf => ({ ...sf, flow: f }))}
                      >{f}</div>
                    ))}
                  </div>
                </div>

                {/* Cramps */}
                <div className="pt-mfield">
                  <label>🤕 Cramps</label>
                  <div className="pt-pill-row">
                    {["No","Mild","Moderate","Severe"].map(c => (
                      <div
                        key={c}
                        className={`pt-pill${symForm.cramps === c ? " sel" : ""}`}
                        onClick={() => setSymForm(sf => ({ ...sf, cramps: c }))}
                      >{c}</div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-mfield">
                  <label>📝 Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Anything else you'd like to note..."
                    value={symForm.notes}
                    onChange={e => setSymForm(f => ({ ...f, notes: e.target.value }))}
                  />
                </div>

                <div className="pt-modal-footer">
                  <button className="pt-modal-save" onClick={saveSymptoms}>
                    {symSaved ? "✅ Saved to Device!" : "Save Symptom Log"}
                  </button>
                  <span className="pt-modal-hint">Stored privately on your device</span>
                </div>
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="pg-cta">
            <h3>Ready to Take Control?</h3>
            <p>Start tracking today and unlock personalised cycle insights.</p>
            <button className="cta-wbtn" onClick={() => navigate("/risk")}>Try AI Risk Assessment →</button>
          </div>

        </div>
      </div>
    </>
  );
}