import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

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
  const [authModal, setAuthModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate();
  const { currentUser, login, signup, loginWithGoogle, logout } = useAuth();

  useEffect(() => {
    const fn = () => setRaised(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      setAuthModal(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleGoogle = async () => {
    setAuthError("");
    try {
      await loginWithGoogle();
      setAuthModal(false);
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-[15px] font-medium whitespace-nowrap group hover:scale-105 hover:shadow-sm ${
      isActive
        ? "bg-gradient-to-r from-[#f43f5e] to-[#f97316] text-white shadow-md"
        : "text-gray-600 hover:text-[#f43f5e] hover:bg-white/80"
    }`;

  const dClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 text-lg font-medium ${
      isActive
        ? "bg-gradient-to-r from-[#f43f5e] to-[#f97316] text-white shadow-lg"
        : "text-gray-700 hover:bg-pink-50 hover:text-[#f43f5e]"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          raised
            ? "py-4 bg-white/70 backdrop-blur-xl shadow-lg border-b border-pink-100"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <div className="w-12 h-12 bg-gradient-to-br from-[#f43f5e] to-[#f97316] rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 transition-transform duration-300">
              🌺
            </div>
            <span className="text-3xl font-bold tracking-tight text-gray-800 group-hover:text-[#f43f5e] transition-colors">
              ArogyaAi
            </span>
          </NavLink>

          <ul className="hidden xl:flex items-center gap-4 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/50 shadow-sm">
            {NAV_ITEMS.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} className={linkClass} end={it.to === "/"}>
                  <span className="text-lg">{it.icon}</span>
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            {currentUser ? (
              // ← LOGGED IN: show user email + logout
              <>
                <span className="text-sm text-gray-600 font-medium">
                  👋 {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-full border-2 border-[#f43f5e] text-[#f43f5e] font-semibold hover:bg-[#f43f5e] hover:text-white transition-all duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // ← LOGGED OUT: show sign in button
              <>
                <button
                  onClick={() => { setIsSignUp(false); setAuthModal(true); }}
                  className="px-6 py-2.5 rounded-full border-2 border-[#f43f5e] text-[#f43f5e] font-semibold hover:bg-[#f43f5e] hover:text-white transition-all duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/risk")}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f43f5e] to-[#f97316] text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className={`lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center transition-all ${open ? "rotate-90" : ""}`}
            onClick={() => setOpen((p) => !p)}
            aria-label="Menu"
          >
            <span className={`w-full h-0.5 bg-[#f43f5e] rounded-full transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-full h-0.5 bg-[#f43f5e] rounded-full transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-full h-0.5 bg-[#f43f5e] rounded-full transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
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
          <NavLink key={it.to} to={it.to} className={dClass} end={it.to === "/"} onClick={() => setOpen(false)}>
            <span className="text-2xl">{it.icon}</span>
            {it.label}
          </NavLink>
        ))}
        <div className="h-px bg-pink-100 my-4" />
        <div className="flex flex-col gap-4">
          {currentUser ? (
            <button
              onClick={() => { handleLogout(); setOpen(false); }}
              className="w-full py-4 rounded-2xl border-2 border-[#f43f5e] text-[#f43f5e] font-bold"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => { setIsSignUp(false); setAuthModal(true); setOpen(false); }}
              className="w-full py-4 rounded-2xl border-2 border-[#f43f5e] text-[#f43f5e] font-bold"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => { navigate("/risk"); setOpen(false); }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f43f5e] to-[#f97316] text-white font-bold shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Auth Modal */}
      {authModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {isSignUp ? "Create Account" : "Welcome Back"} 🌺
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {isSignUp ? "Join CareMaa today" : "Sign in to your CareMaa account"}
            </p>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f43f5e] text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#f43f5e] text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f43f5e] to-[#f97316] text-white font-bold shadow-md hover:scale-[1.02] transition-all"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={handleGoogle}
              className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-[#f43f5e] hover:text-[#f43f5e] transition-all flex items-center justify-center gap-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp((p) => !p)}
                className="text-[#f43f5e] font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>

            <button
              onClick={() => { setAuthModal(false); setAuthError(""); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}


