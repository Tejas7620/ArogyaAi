
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label:"Home",           icon:"🏠", to:"/"            },
  { label:"Period Tracker", icon:"🌸", to:"/period"      },
  { label:"Pregnancy",      icon:"🤰", to:"/pregnancy"   },
  { label:"Vaccination",    icon:"💉", to:"/vaccination" },
  { label:"Nutrition",      icon:"🥗", to:"/nutrition"   },
  { label:"AI Risk",        icon:"🩺", to:"/risk"        },
  { label:"Community",      icon:"👩‍⚕️", to:"/community"  },
];

export default function Navbar() {
  const [raised, setRaised] = useState(false);
  const [open, setOpen]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setRaised(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkClass = ({ isActive }) => `cm-link${isActive ? " active" : ""}`;
  const dClass    = ({ isActive }) => `cm-ditem${isActive ? " active" : ""}`;

  return (
    <>
      <header className={`cm-nav${raised ? " raised" : ""}`}>
        <div className="cm-nav-inner">
          <NavLink to="/" className="cm-logo" onClick={() => setOpen(false)}>
            <div className="cm-logo-badge">🌺</div>
            <span className="cm-logo-text">CareMaa</span>
          </NavLink>

          <ul className="cm-links">
            {NAV_ITEMS.map(it => (
              <li key={it.to}>
                <NavLink to={it.to} className={linkClass} end={it.to === "/"}>
                  <span className="cm-link-icon">{it.icon}</span>{it.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="cm-nav-cta">
            <button className="cm-nbtn cm-nbtn-ghost">Sign In</button>
            <button className="cm-nbtn cm-nbtn-solid" onClick={() => navigate("/risk")}>Get Started</button>
          </div>

          <button className={`cm-hbg${open ? " open" : ""}`} onClick={() => setOpen(p => !p)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      <nav className={`cm-drawer${open ? " open" : ""}`}>
        {NAV_ITEMS.map(it => (
          <NavLink key={it.to} to={it.to} className={dClass} end={it.to === "/"} onClick={() => setOpen(false)}>
            <span className="cm-ditem-icon">{it.icon}</span>{it.label}
          </NavLink>
        ))}
        <div className="cm-drawer-hr" />
        <div className="cm-drawer-cta">
          <button className="cm-nbtn cm-nbtn-ghost">Sign In</button>
          <button className="cm-nbtn cm-nbtn-solid" onClick={() => { navigate("/risk"); setOpen(false); }}>Get Started</button>
        </div>
      </nav>
    </>
  );
}