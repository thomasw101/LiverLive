import { useState, useEffect, useRef } from "react";

const COLORS = {
  brand: "#1A9FC7",
  brandLight: "#22B8E6",
  brandDark: "#147FA0",
  brandGlow: "rgba(26,159,199,0.25)",
  brandSubtle: "rgba(26,159,199,0.08)",
  accent: "#F5A623",
  accentGlow: "rgba(245,166,35,0.2)",
  bg: "#FAFCFD",
  surface: "#FFFFFF",
  surfaceAlt: "#F0F6F9",
  border: "#E2EBF0",
  borderHover: "#1A9FC7",
  text: "#1A2B3C",
  textMid: "#4A6274",
  textLight: "#8A9DAD",
  dark: "#0C1B26",
  success: "#34B87A",
};

const HORSE_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 32 32'%3E%3Ctext x='2' y='26' font-size='26'%3E%F0%9F%90%B4%3C/text%3E%3C/svg%3E") 14 14, pointer`;

function LoginGate({ onAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleSubmit = () => {
    if (username === "Liverylive" && password === "Thursday12") {
      onAuth();
    } else {
      setError("Incorrect credentials. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: COLORS.dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          textAlign: "center",
          maxWidth: 400,
          width: "90%",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.brandLight})`,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 32px ${COLORS.brandGlow}`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p style={{ color: "#6A8A9D", fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>
          Private Preview
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{ background: "#132633", border: "1px solid #1E3A4C", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.3s" }}
            onFocus={(e) => (e.target.style.borderColor = COLORS.brand)} onBlur={(e) => (e.target.style.borderColor = "#1E3A4C")} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{ background: "#132633", border: "1px solid #1E3A4C", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.3s" }}
            onFocus={(e) => (e.target.style.borderColor = COLORS.brand)} onBlur={(e) => (e.target.style.borderColor = "#1E3A4C")} />
          <button onClick={handleSubmit}
            style={{ background: `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.brandLight})`, border: "none", borderRadius: 10, padding: "14px 16px", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginTop: 4, transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 4px 20px ${COLORS.brandGlow}`; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
            Enter
          </button>
        </div>
        {error && <p style={{ color: "#e74c3c", fontSize: 13, marginTop: 16 }}>{error}</p>}
      </div>
    </div>
  );
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const startVal = display;
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}

function ROICalculator() {
  const [horses, setHorses] = useState(20);
  const [adminHours, setAdminHours] = useState(10);
  const [missedCharges, setMissedCharges] = useState(5);
  const [avgCharge, setAvgCharge] = useState(15);
  const [hourlyWage, setHourlyWage] = useState(12);

  const timeSavedPercent = 0.6;
  const hoursSavedMonthly = Math.round(adminHours * timeSavedPercent * 4.3);
  const revRecovered = missedCharges * avgCharge * 12;
  const appCost = horses * 2 * 12;
  const netBenefit = revRecovered - appCost;
  const timeSavingsValue = hoursSavedMonthly * hourlyWage * 12;
  const totalAnnualBenefit = netBenefit + timeSavingsValue;

  const SliderInput = ({ label, value, onChange, min, max, step, unit, description }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <label style={{ fontSize: 14, color: COLORS.textMid, fontWeight: 500 }}>{label}</label>
        <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, fontFamily: "'Instrument Serif', serif" }}>
          {unit === "£" ? `£${value}` : value}{unit && unit !== "£" ? ` ${unit}` : ""}
        </span>
      </div>
      {description && <p style={{ fontSize: 12, color: COLORS.textLight, margin: "0 0 8px", lineHeight: 1.4 }}>{description}</p>}
      <input type="range" min={min} max={max} step={step || 1} value={value} onChange={(e) => onChange(Number(e.target.value))} className="horse-slider"
        style={{ width: "100%", height: 6, WebkitAppearance: "none", appearance: "none",
          background: `linear-gradient(to right, ${COLORS.brand} 0%, ${COLORS.brand} ${((value - min) / (max - min)) * 100}%, ${COLORS.border} ${((value - min) / (max - min)) * 100}%, ${COLORS.border} 100%)`,
          borderRadius: 3, outline: "none", cursor: HORSE_CURSOR }} />
    </div>
  );

  const ResultCard = ({ label, value, highlight, sub }) => (
    <div style={{
      background: highlight ? `linear-gradient(135deg, #EAF7FC, #F0FAFF)` : COLORS.surface,
      border: `1px solid ${highlight ? COLORS.brand : COLORS.border}`,
      borderRadius: 14, padding: "20px 24px", textAlign: "center",
      boxShadow: highlight ? `0 4px 20px ${COLORS.brandGlow}` : "none",
    }}>
      <p style={{ fontSize: 12, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</p>
      <p style={{ fontSize: highlight ? 36 : 28, fontWeight: 700, color: highlight ? COLORS.brand : COLORS.text, fontFamily: "'Instrument Serif', serif", margin: 0, lineHeight: 1.2 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: COLORS.textLight, marginTop: 6 }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 40px rgba(0,0,0,0.04)" }}>
      <div style={{ padding: "32px 32px 0" }}>
        <div style={{ display: "inline-block", background: COLORS.brandSubtle, borderRadius: 20, padding: "6px 14px", fontSize: 11, color: COLORS.brand, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16, border: `1px solid rgba(26,159,199,0.15)` }}>
          Interactive Tool
        </div>
        <h3 style={{ fontSize: 28, fontWeight: 400, color: COLORS.text, fontFamily: "'Instrument Serif', serif", margin: "0 0 4px" }}>
          Livery Live ROI Calculator
        </h3>
        <p style={{ fontSize: 14, color: COLORS.textLight, margin: "0 0 32px", lineHeight: 1.6 }}>
          See how much time and money your yard could save. Adjust the sliders to match your yard.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 340px", padding: "0 32px 32px" }}>
          <SliderInput label="Horses on your yard" value={horses} onChange={setHorses} min={5} max={100} unit="horses" />
          <SliderInput label="Weekly admin hours" value={adminHours} onChange={setAdminHours} min={1} max={40} unit="hrs" description="Time spent on invoicing, records, feed charts, staff coordination" />
          <SliderInput label="Hourly wage for admin" value={hourlyWage} onChange={setHourlyWage} min={8} max={30} unit="£" description="Average hourly rate for the person doing the admin work" />
          <SliderInput label="Missed charges per month" value={missedCharges} onChange={setMissedCharges} min={0} max={30} description="Extra services, arena bookings, or feed charges that slip through" />
          <SliderInput label="Average charge value" value={avgCharge} onChange={setAvgCharge} min={5} max={50} step={5} unit="£" />
        </div>
        <div style={{ flex: "1 1 300px", padding: "0 32px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, marginBottom: 4 }}>
            <p style={{ fontSize: 11, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Your yard at a glance</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: COLORS.textMid }}>LiveryLive cost</span>
              <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>£{appCost}/yr</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: COLORS.textMid }}>Revenue recovered</span>
              <span style={{ fontSize: 13, color: COLORS.success, fontWeight: 600 }}>+£<AnimatedNumber value={revRecovered} />/yr</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: COLORS.textMid }}>Admin hours saved</span>
              <span style={{ fontSize: 13, color: COLORS.success, fontWeight: 600 }}><AnimatedNumber value={hoursSavedMonthly} /> hrs/month</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: COLORS.textMid }}>Admin rate</span>
              <span style={{ fontSize: 13, color: COLORS.text }}>£{hourlyWage}/hr</span>
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: COLORS.textMid }}>Time savings value</span>
              <span style={{ fontSize: 13, color: COLORS.success, fontWeight: 600 }}>+£<AnimatedNumber value={timeSavingsValue} />/yr</span>
            </div>
          </div>
          <ResultCard label="Total Annual Benefit" value={<span>£<AnimatedNumber value={totalAnnualBenefit} /></span>} highlight sub={`That's £${Math.round(totalAnnualBenefit / 12).toLocaleString()} per month back in your pocket`} />
          <ResultCard label="Return on Investment" value={<span><AnimatedNumber value={appCost > 0 ? Math.round((totalAnnualBenefit / appCost) * 100) : 0} />%</span>} sub="For every £1 spent on LiveryLive" />
        </div>
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)", transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function ServiceCard({ icon, title, description, items }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: COLORS.surface, border: `1px solid ${hovered ? COLORS.brand : COLORS.border}`, borderRadius: 16, padding: 32, transition: "all 0.4s ease", cursor: "default", boxShadow: hovered ? `0 8px 32px ${COLORS.brandGlow}` : "0 2px 12px rgba(0,0,0,0.03)", height: "100%" }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: COLORS.brandSubtle, border: `1px solid rgba(26,159,199,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{icon}</div>
      <h4 style={{ fontSize: 20, fontWeight: 400, color: COLORS.text, fontFamily: "'Instrument Serif', serif", margin: "0 0 12px" }}>{title}</h4>
      <p style={{ fontSize: 14, color: COLORS.textMid, lineHeight: 1.7, margin: "0 0 16px" }}>{description}</p>
      {items && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {items.map((item, i) => (
            <span key={i} style={{ fontSize: 11, color: COLORS.brand, background: COLORS.brandSubtle, border: `1px solid rgba(26,159,199,0.12)`, borderRadius: 20, padding: "5px 12px", letterSpacing: "0.02em", fontWeight: 500 }}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .horse-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: ${COLORS.brand}; cursor: ${HORSE_CURSOR};
          border: 3px solid #fff; box-shadow: 0 2px 8px rgba(26,159,199,0.35);
          transition: transform 0.2s;
        }
        .horse-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .horse-slider::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 50%;
          background: ${COLORS.brand}; cursor: ${HORSE_CURSOR};
          border: 3px solid #fff; box-shadow: 0 2px 8px rgba(26,159,199,0.35);
        }
        ::selection { background: rgba(26,159,199,0.2); color: ${COLORS.text}; }
        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .section-pad { padding: 60px 20px !important; }
        }
      `}</style>

      {/* HERO */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(26,159,199,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(245,166,35,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "120px 40px 80px", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 24, padding: "8px 16px", marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.brand, boxShadow: `0 0 8px ${COLORS.brand}` }} />
              <span style={{ fontSize: 13, color: COLORS.textMid, letterSpacing: "0.02em" }}>
                Prepared exclusively by <strong style={{ color: COLORS.text }}>LearnLab Media</strong>
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="hero-title" style={{ fontSize: 60, fontWeight: 400, fontFamily: "'Instrument Serif', serif", lineHeight: 1.12, marginBottom: 24, color: COLORS.text }}>
              Content that connects.<br /><span style={{ color: COLORS.brand }}>Tools that convert.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p style={{ fontSize: 18, color: COLORS.textMid, lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
              We help equine and agritech businesses grow through authentic video content filmed on-farm and on-yard, online learning systems, and intelligent AI tools that turn users into advocates.
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a href="#showreel" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.brandLight})`, color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 16px ${COLORS.brandGlow}` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch our latest work
              </a>
              <a href="#calculator" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.surface, color: COLORS.textMid, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none", border: `1px solid ${COLORS.border}`, fontFamily: "'DM Sans', sans-serif" }}>
                Try the ROI Calculator
              </a>
            </div>
          </FadeIn>
        </div>
        <div style={{ textAlign: "center", paddingBottom: 40 }}>
          <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, ${COLORS.border}, transparent)`, margin: "0 auto" }} />
        </div>
      </div>

      {/* VIDEO */}
      <div id="showreel" className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <p style={{ fontSize: 12, color: COLORS.brand, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Recent Work</p>
          <h2 style={{ fontSize: 40, fontWeight: 400, fontFamily: "'Instrument Serif', serif", marginBottom: 12, lineHeight: 1.2, color: COLORS.text }}>Real stories from real yards</h2>
          <p style={{ fontSize: 16, color: COLORS.textMid, lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
            Here's a testimonial we recently filmed on-farm for another agritech business in the UK. This is exactly the kind of authentic, on-location content we'd create for Livery Live.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, overflow: "hidden", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}>
            <iframe src="https://player.vimeo.com/video/1164173070?badge=0&autopause=0&player_id=0&app_id=58479" width="1920" height="1080" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerPolicy="strict-origin-when-cross-origin" title="UK Farm 2 Embed" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
          </div>
        </FadeIn>
      </div>

      {/* ROI CALCULATOR */}
      <div id="calculator" className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <p style={{ fontSize: 12, color: COLORS.brand, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Built for you</p>
          <h2 style={{ fontSize: 40, fontWeight: 400, fontFamily: "'Instrument Serif', serif", marginBottom: 12, lineHeight: 1.2, color: COLORS.text }}>What could your yard save?</h2>
          <p style={{ fontSize: 16, color: COLORS.textMid, lineHeight: 1.7, marginBottom: 40, maxWidth: 560 }}>
            We built this tool to show what's possible. Imagine giving every prospective yard owner an instant, personalised business case for switching to Livery Live.
          </p>
        </FadeIn>
        <FadeIn delay={200}><ROICalculator /></FadeIn>
        <FadeIn delay={300}>
          <div style={{ marginTop: 20, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 20, marginTop: 1 }}>💡</span>
            <p style={{ fontSize: 14, color: COLORS.textMid, lineHeight: 1.65 }}>
              <strong style={{ color: COLORS.text }}>Why this matters:</strong> A tool like this on the Livery Live website would let prospective customers see the value before they even start a trial. It's a sales conversion tool that works 24/7 — and this is just a taste of what we can build together.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* SERVICES */}
      <div className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px" }}>
        <FadeIn>
          <p style={{ fontSize: 12, color: COLORS.brand, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>How we can help</p>
          <h2 style={{ fontSize: 40, fontWeight: 400, fontFamily: "'Instrument Serif', serif", marginBottom: 40, lineHeight: 1.2, color: COLORS.text }}>Three ways to grow Livery Live</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <FadeIn delay={100}>
            <ServiceCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>}
              title="On-Yard Testimonials"
              description="Professional video testimonials filmed at real yards with real users. Authentic stories that build trust and drive sign-ups."
              items={["Farm & yard filming", "User stories", "Social content", "Case studies"]}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <ServiceCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>}
              title="Online Learning System"
              description="Help users get the most from LiveryLive with guided onboarding videos, tutorials, and a structured learning platform that reduces churn."
              items={["Onboarding flows", "Feature tutorials", "Help centre videos", "Reduce support load"]}
            />
          </FadeIn>
          <FadeIn delay={300}>
            <ServiceCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={COLORS.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
              title="AI Tools & Implementation"
              description="Custom AI-powered tools — like the ROI calculator above — that enhance the user experience and drive conversions. We stay on the curve so you don't have to."
              items={["Sales tools", "AI chatbots", "Automation", "Custom builds"]}
            />
          </FadeIn>
        </div>
      </div>

      {/* CTA */}
      <div className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px 120px" }}>
        <FadeIn>
          <div style={{ background: `linear-gradient(135deg, ${COLORS.dark}, #112A38)`, border: "1px solid #1E3A4C", borderRadius: 24, padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.brandGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
            <h2 style={{ fontSize: 36, fontWeight: 400, fontFamily: "'Instrument Serif', serif", marginBottom: 16, lineHeight: 1.2, position: "relative", color: "#fff" }}>Let's talk about what's next</h2>
            <p style={{ fontSize: 16, color: "#8AAFBF", lineHeight: 1.7, maxWidth: 460, margin: "0 auto 32px", position: "relative" }}>
              Whether it's filming testimonials at your best yards, building an onboarding learning system, or creating AI tools that help sell Livery Live — we'd love to explore how we can work together.
            </p>
            <a href="mailto:tom@learnlabmedia.com" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${COLORS.brand}, ${COLORS.brandLight})`, color: "#fff", padding: "16px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", position: "relative", fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 20px ${COLORS.brandGlow}` }}>
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "32px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: COLORS.textLight }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 16, color: COLORS.textMid }}>LearnLab Media</span>
          <span style={{ margin: "0 12px", color: COLORS.border }}>|</span>
          Content · Learning · AI
        </p>
      </div>
    </div>
  );
}
