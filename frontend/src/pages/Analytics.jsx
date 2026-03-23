import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from "recharts";

/* ── Dummy 6-month cycle data ── */
const CYCLE_DATA = [
  { month: "Oct '25", cycleLength: 30, periodLength: 5 },
  { month: "Nov '25", cycleLength: 27, periodLength: 4 },
  { month: "Dec '25", cycleLength: 29, periodLength: 5 },
  { month: "Jan '26", cycleLength: 32, periodLength: 6 },
  { month: "Feb '26", cycleLength: 26, periodLength: 4 },
  { month: "Mar '26", cycleLength: 28, periodLength: 5 },
];

const AVG_CYCLE  = Math.round(CYCLE_DATA.reduce((s, d) => s + d.cycleLength, 0)  / CYCLE_DATA.length);
const AVG_PERIOD = Math.round(CYCLE_DATA.reduce((s, d) => s + d.periodLength, 0) / CYCLE_DATA.length);

/* ── Styles ── */
const css = `
  .an-page { background:linear-gradient(160deg,#fff0f4 0%,#fffbf7 40%,#fff5ee 100%); min-height:calc(100vh - 68px); }
  .an-title-grad { background:linear-gradient(135deg,#f43f5e,#c2185b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .an-chart-card {
    background:#fff; border:1px solid #f3dde5; border-radius:22px;
    padding:28px 28px 20px; margin-bottom:24px;
    animation:cardIn .5s ease both;
  }
  .an-chart-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#2d0f1e; margin-bottom:4px; }
  .an-chart-sub   { font-size:13px; color:#9a6878; margin-bottom:22px; }

  /* custom tooltip */
  .an-tooltip { background:#fff; border:1px solid #f3dde5; border-radius:12px; padding:10px 14px; box-shadow:0 8px 24px rgba(244,63,94,.12); font-family:'Sora',sans-serif; }
  .an-tooltip-label { font-size:12px; font-weight:700; color:#9a6878; margin-bottom:4px; }
  .an-tooltip-val   { font-size:15px; font-weight:700; color:#f43f5e; }

  /* insight cards */
  .an-insight-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:26px; }
  .an-insight { background:#fff; border:1px solid #f3dde5; border-radius:18px; padding:20px 18px; text-align:center; animation:cardIn .5s ease both; transition:transform .25s,box-shadow .25s; }
  .an-insight:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(244,63,94,.09); }
  .an-insight-icon { font-size:26px; margin-bottom:8px; }
  .an-insight-val  { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#f43f5e; line-height:1; }
  .an-insight-lbl  { font-size:11.5px; color:#9a6878; margin-top:4px; font-weight:500; }

  /* bar mini-grid */
  .an-bar-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; align-items:flex-end; }
  .an-bar-wrap { display:flex; flex-direction:column; align-items:center; gap:6px; }
  .an-bar-outer { width:100%; background:#f9eef1; border-radius:8px; overflow:hidden; height:90px; display:flex; align-items:flex-end; }
  .an-bar-fill  { width:100%; border-radius:8px 8px 0 0; transition:height .4s cubic-bezier(.22,1,.36,1); }
  .an-bar-lbl   { font-size:10.5px; color:#9a6878; text-align:center; font-weight:500; }
  .an-bar-val   { font-size:11px; font-weight:700; color:#f43f5e; }

  @media(max-width:820px){ .an-insight-grid{grid-template-columns:1fr 1fr} .an-bar-grid{grid-template-columns:repeat(3,1fr)} }
  @media(max-width:540px){ .an-insight-grid{grid-template-columns:1fr 1fr} .an-bar-grid{grid-template-columns:repeat(2,1fr)} }
`;

/* ── Custom tooltip component ── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="an-tooltip">
      <div className="an-tooltip-label">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="an-tooltip-val" style={{ color: p.color }}>
          {p.value} days <span style={{ fontSize: 11, color: "#9a6878", fontWeight: 400 }}>({p.name})</span>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const navigate = useNavigate();

  const maxCycle = Math.max(...CYCLE_DATA.map(d => d.cycleLength));

  return (
    <>
      <style>{css}</style>
      <div className="an-page pg-fade">

        {/* Hero */}
        <div className="pg-hero">
          <div className="pg-hero-radial" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(244,63,94,.12) 0%,transparent 65%)" }} />
          <div className="pg-eyebrow"><span className="pg-eyebrow-dot" />Cycle Analytics</div>
          <h1 className="pg-title an-title-grad">Your Cycle,<br />Visualised</h1>
          <p className="pg-sub">Six months of cycle data at a glance — spot trends, track changes, and understand your rhythm.</p>
        </div>

        <div className="pg-body">

          {/* ── Insight Summary Cards ── */}
          <div className="an-insight-grid">
            {[
              { icon: "📅", val: `${AVG_CYCLE} days`,  lbl: "Avg Cycle Length",  delay: "0s" },
              { icon: "🩸", val: `${AVG_PERIOD} days`, lbl: "Avg Period Length", delay: ".06s" },
              { icon: "📊", val: "Regular",             lbl: "Cycle Pattern",     delay: ".12s" },
              { icon: "✅", val: "6",                   lbl: "Cycles Tracked",    delay: ".18s" },
              { icon: "📉", val: "26 days",             lbl: "Shortest Cycle",    delay: ".24s" },
              { icon: "📈", val: "32 days",             lbl: "Longest Cycle",     delay: ".30s" },
            ].map((c, i) => (
              <div key={i} className="an-insight" style={{ animationDelay: c.delay }}>
                <div className="an-insight-icon">{c.icon}</div>
                <div className="an-insight-val">{c.val}</div>
                <div className="an-insight-lbl">{c.lbl}</div>
              </div>
            ))}
          </div>

          {/* ── Line Chart: Cycle Length ── */}
          <div className="an-chart-card">
            <div className="an-chart-title">📈 Cycle Length Over 6 Months</div>
            <div className="an-chart-sub">Your cycle length trend with the average baseline shown.</div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={CYCLE_DATA} margin={{ top: 10, right: 18, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cycleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f9eef1" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: "#9a6878", fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
                <YAxis domain={[20, 40]} tick={{ fontSize: 11.5, fill: "#9a6878", fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={AVG_CYCLE} stroke="#f97316" strokeDasharray="5 4" strokeWidth={1.5}
                  label={{ value: `Avg ${AVG_CYCLE}d`, position: "insideTopRight", fontSize: 11, fill: "#f97316", fontWeight: 600 }} />
                <Area type="monotone" dataKey="cycleLength" name="Cycle Length"
                  stroke="#f43f5e" strokeWidth={2.5} fill="url(#cycleGrad)" dot={{ r: 5, fill: "#f43f5e", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#f43f5e", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ── Line Chart: Period Length ── */}
          <div className="an-chart-card">
            <div className="an-chart-title">🩸 Period Length Over 6 Months</div>
            <div className="an-chart-sub">Track how many days your period lasts each cycle.</div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={CYCLE_DATA} margin={{ top: 10, right: 18, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="periodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f97316" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#fff5ee" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11.5, fill: "#9a6878", fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 10]} tick={{ fontSize: 11.5, fill: "#9a6878", fontFamily: "'Sora',sans-serif" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={AVG_PERIOD} stroke="#f43f5e" strokeDasharray="5 4" strokeWidth={1.5}
                  label={{ value: `Avg ${AVG_PERIOD}d`, position: "insideTopRight", fontSize: 11, fill: "#f43f5e", fontWeight: 600 }} />
                <Area type="monotone" dataKey="periodLength" name="Period Length"
                  stroke="#f97316" strokeWidth={2.5} fill="url(#periodGrad)" dot={{ r: 5, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ── Bar Visual: per-month ── */}
          <div className="an-chart-card">
            <div className="an-chart-title">📊 Monthly Comparison</div>
            <div className="an-chart-sub">Bar height shows cycle length relative to your longest cycle.</div>
            <div className="an-bar-grid" style={{ marginTop: 12 }}>
              {CYCLE_DATA.map((d, i) => {
                const pct = Math.round((d.cycleLength / maxCycle) * 100);
                const hue = 340 + i * 10; // subtle hue shift
                return (
                  <div key={i} className="an-bar-wrap" style={{ animationDelay: `${i * .07}s` }}>
                    <div className="an-bar-val">{d.cycleLength}d</div>
                    <div className="an-bar-outer">
                      <div className="an-bar-fill"
                        style={{ height: `${pct}%`, background: `linear-gradient(180deg, hsl(${hue},88%,62%), hsl(${hue},88%,52%))` }} />
                    </div>
                    <div className="an-bar-lbl">{d.month.split(" ")[0]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="pg-cta">
            <h3>Log More Cycles for Better Insights</h3>
            <p>The more cycles you track, the more accurate your predictions become.</p>
            <button className="cta-wbtn" onClick={() => navigate("/period")}>Go to Period Tracker →</button>
          </div>

        </div>
      </div>
    </>
  );
}
