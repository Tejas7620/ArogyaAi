import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-[#fffbf7] selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Soft Radial Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-pulse-slow delay-2000" />
        </div>

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-10 bg-primary/5 border border-primary/20 rounded-full shadow-sm animate-fade-up">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Trusted Maternal & Child Care
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tighter leading-[0.9] mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Care</span>
          <span className="italic bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">Maa</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-xl text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Your Maternal & Child Health Companion —<br />
          powered by <span className="text-primary font-bold">AI</span>, designed with <span className="text-accent font-bold">love</span>.
        </p>

        {/* Hero Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <button
            className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-full shadow-[0_15px_30px_rgba(244,63,94,0.3)] hover:scale-105 hover:shadow-[0_20px_40px_rgba(244,63,94,0.4)] active:scale-95 transition-all duration-300"
            onClick={() => navigate("/risk")}
          >
            Get Started Free
          </button>
          <button className="px-10 py-5 bg-white/20 backdrop-blur-md border border-gray-200 text-gray-800 font-semibold text-lg rounded-full shadow-sm hover:bg-white/40 hover:-translate-y-1 active:scale-95 transition-all duration-300">
            Watch Demo ▶
          </button>
        </div>

        {/* Hero Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.num}>
              {i > 0 && <div className="hidden md:block w-px h-12 bg-gray-200" />}
              <div className="text-center group">
                <div className="text-4xl font-serif font-bold text-primary group-hover:scale-110 transition-transform">
                  {s.num}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  {s.lbl}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Everything You Need</div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Health Tools Built for <em className="not-italic text-primary">Every Stage</em>
          </h2>
          <p className="max-w-lg mx-auto text-lg text-gray-500 leading-relaxed">
            From your first period to post-natal care — CareMaa walks with you through every milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARDS.map((c, i) => (
            <div
              key={c.to}
              className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => navigate(c.to)}
            >
              <div className="relative z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform"
                  style={{ background: c.iconBg }}
                >
                  {c.emoji}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{c.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px] mb-6">{c.desc}</p>
                <div className="flex items-center gap-2 text-primary font-bold transition-all group-hover:gap-4">
                  Explore <span>→</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundImage: c.strip }} />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative rounded-[40px] bg-premium-gradient p-12 md:p-24 text-center overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Start Your Health Journey Today</h2>
            <p className="max-w-lg mx-auto text-white/80 text-lg mb-12">
              Join thousands of mothers across India who trust CareMaa for smarter, kinder maternal care.
            </p>
            <button
              className="px-12 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => navigate("/risk")}
            >
              Try CareMaa Free →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
