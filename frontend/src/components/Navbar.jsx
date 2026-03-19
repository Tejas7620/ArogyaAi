
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", icon: "🏠", to: "/" },
  { label: "Period Tracker", icon: "🌸", to: "/period" },
  { label: "Pregnancy", icon: "🤰", to: "/pregnancy" },
  { label: "Vaccination", icon: "💉", to: "/vaccination" },
  { label: "Nutrition", icon: "🥗", to: "/nutrition" },
  { label: "AI Risk", icon: "🩺", to: "/risk" },
  { label: "Community", icon: "👩‍⚕️", to: "/community" },
];

export default function Navbar() {
  const [raised, setRaised] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setRaised(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-[15px] font-medium whitespace-nowrap group hover:scale-105 hover:shadow-sm ${
      isActive
        ? "bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20"
        : "text-gray-600 hover:text-primary hover:bg-white/80"
    }`;

  const dClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 text-lg font-medium ${
      isActive
        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
        : "text-gray-700 hover:bg-primary/10 hover:text-primary"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          raised
            ? "py-4 bg-white/70 backdrop-blur-xl shadow-lg border-b border-primary/10"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
              🌺
            </div>
            <span className="text-3xl font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors">
              CareMaa
            </span>
          </NavLink>

          <ul className="hidden xl:flex items-center gap-4 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/50 shadow-sm">
            {NAV_ITEMS.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} className={linkClass} end={it.to === "/"}>
                  <span className="text-lg group-hover:scale-110 transition-transform">{it.icon}</span>
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-300">
              Sign In
            </button>
            <button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => navigate("/risk")}
            >
              Get Started
            </button>
          </div>

          <button
            className={`lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center transition-all ${
              open ? "rotate-90" : ""
            }`}
            onClick={() => setOpen((p) => !p)}
            aria-label="Menu"
          >
            <span className={`w-full h-0.5 bg-primary rounded-full transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-full h-0.5 bg-primary rounded-full transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-primary rounded-full transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl lg:hidden flex flex-col p-8 pt-28 gap-4 transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {NAV_ITEMS.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={dClass}
            end={it.to === "/"}
            onClick={() => setOpen(false)}
          >
            <span className="text-2xl">{it.icon}</span>
            {it.label}
          </NavLink>
        ))}
        <div className="h-px bg-primary/10 my-4" />
        <div className="flex flex-col gap-4">
          <button className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-bold">
            Sign In
          </button>
          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20"
            onClick={() => {
              navigate("/risk");
              setOpen(false);
            }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </>
  );
}

