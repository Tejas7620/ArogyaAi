import React from "react";
import { useNavigate } from "react-router-dom";

const CARDS = [
  { emoji:"🌸", title:"Period Tracker",      desc:"Log cycles, predict ovulation, and understand your body with intelligent pattern analysis.", iconBg:"linear-gradient(135deg,#fce7f3,#fda4af)", strip:"linear-gradient(90deg,#f43f5e,#fb7185)", to:"/period"      },
  { emoji:"🤰", title:"Pregnancy Monitor",   desc:"Week-by-week guidance, symptom tracking, and milestone reminders throughout your journey.",  iconBg:"linear-gradient(135deg,#ffedd5,#fdba74)", strip:"linear-gradient(90deg,#f97316,#fb923c)", to:"/pregnancy"   },
  { emoji:"🩺", title:"AI Risk Tracker",     desc:"Powered by machine learning — assess maternal risk levels from your health vitals instantly.", iconBg:"linear-gradient(135deg,#fee2e2,#fca5a5)", strip:"linear-gradient(90deg,#ef4444,#f43f5e)", to:"/risk"        },
  { emoji:"💉", title:"Vaccination Schedule",desc:"Never miss a dose. Personalised vaccination timelines for both mother and child.",            iconBg:"linear-gradient(135deg,#e0f2fe,#7dd3fc)", strip:"linear-gradient(90deg,#0ea5e9,#38bdf8)", to:"/vaccination" },
  { emoji:"🥗", title:"Nutrition Planner",   desc:"Custom meal plans for every trimester and post-natal stage, built around Indian diets.",      iconBg:"linear-gradient(135deg,#dcfce7,#86efac)", strip:"linear-gradient(90deg,#10b981,#34d399)", to:"/nutrition"   },
  { emoji:"👩‍⚕️", title:"Community",         desc:"Connect with healthcare workers, mothers, and verified experts across India.",               iconBg:"linear-gradient(135deg,#fef9c3,#fde047)", strip:"linear-gradient(90deg,#eab308,#facc15)", to:"/community"   },
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
        <p className="max-w-xl text-xl md:text-2xl text-gray-500 font-medium leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Your Maternal & Child Health Companion —<br />
          powered by <span className="text-primary font-bold">AI</span>, designed with <span className="text-accent font-bold">love</span>.
        </p>

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
          {CARDS.map((c) => (
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