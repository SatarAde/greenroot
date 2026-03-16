import React, { useState } from "react";
import ScoreRing from "./components/ScoreRing";
import HabitCard from "./components/HabitCard";

type Page = "home" | "features" | "pricing";

interface Habit {
  id: number;
  title: string;
  category: string;
  description?: string;
  target_days: number;
  co2_saving_per_day: number;
  current_streak: number;
  completed: boolean;
}

const INITIAL_HABITS: Habit[] = [
  { id: 1, title: "Take public transport", category: "transport", description: "Use train or bus instead of driving", target_days: 30, co2_saving_per_day: 2.1, current_streak: 12, completed: false },
  { id: 2, title: "Meat-free Mondays", category: "diet", description: "Skip meat every Monday", target_days: 12, co2_saving_per_day: 1.8, current_streak: 5, completed: false },
  { id: 3, title: "Cold water washing", category: "energy", description: "Wash clothes on cold cycle", target_days: 30, co2_saving_per_day: 0.6, current_streak: 30, completed: true },
];

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>("home");
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [score] = useState(78);

  const handleCheckin = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const newStreak = h.current_streak + 1;
        return { ...h, current_streak: newStreak, completed: newStreak >= h.target_days };
      })
    );
  };

  const handleDelete = (id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const impactData = [
    { icon: "🚗", label: "Transport", reduction: "−38%", barWidth: "72%", color: "#7A9B5E" },
    { icon: "🥗", label: "Diet", reduction: "−24%", barWidth: "55%", color: "#5C7A42" },
    { icon: "⚡", label: "Energy", reduction: "−18%", barWidth: "40%", color: "#8C6A3F" },
    { icon: "🛒", label: "Shopping", reduction: "−12%", barWidth: "28%", color: "#3D5426" },
  ];

  return (
    <div className="app">
      {/* NAV */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-dot" />
          GreenRoot
        </div>
        <ul className="nav-links">
          {(["home", "features", "pricing"] as Page[]).map((p) => (
            <li key={p}>
              <button
                className={`nav-link ${activePage === p ? "active" : ""}`}
                onClick={() => setActivePage(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="btn-ghost">Sign In</button>
          <button className="btn-green" onClick={() => setActivePage("pricing")}>
            Start Free
          </button>
        </div>
      </nav>

      {/* HOME PAGE */}
      {activePage === "home" && (
        <div className="page home-page">
          <div className="blob blob1" />
          <div className="blob blob2" />

          <div className="hero">
            <div className="hero-left">
              <div className="hero-badge">
                <div className="badge-dot" />
                Now in Beta — Join 12,000+ users
              </div>
              <h1 className="hero-h1">
                Live <em>sustainably,</em>
                <br />effortlessly.
              </h1>
              <p className="hero-desc">
                GreenRoot tracks your carbon footprint, suggests simple swaps, and
                connects you with a community making real environmental change.
              </p>
              <div className="hero-actions">
                <button className="btn-green large" onClick={() => setActivePage("pricing")}>
                  Get Started Free
                </button>
                <button className="btn-ghost large" onClick={() => setActivePage("features")}>
                  See How It Works →
                </button>
              </div>
            </div>

            <div className="hero-right">
              <div className="app-mockup">
                <div className="mockup-header">
                  <div>
                    <div className="mockup-label">Your Green Score</div>
                    <div className="mockup-title">This Month</div>
                  </div>
                  <ScoreRing score={score} />
                </div>
                <div className="impact-list">
                  {impactData.map((item) => (
                    <div key={item.label} className="impact-row">
                      <div className="impact-meta">
                        <span className="impact-name">{item.icon} {item.label}</span>
                        <span className="impact-val">{item.reduction} CO₂</span>
                      </div>
                      <div className="impact-bar-bg">
                        <div className="impact-bar-fill" style={{ width: item.barWidth, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mini-mockup">
                <div className="mini-icon">🌳</div>
                <div className="mini-label">Trees Equivalent</div>
                <div className="mini-val">14.2</div>
                <div className="mini-change">↑ +2.4 this week</div>
              </div>
            </div>
          </div>

          {/* Habits preview */}
          <div className="habits-section">
            <h2 className="section-title">Your Active Habits</h2>
            <p className="section-sub">Check in daily to build your streak and reduce your footprint.</p>
            <div className="habits-grid">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onCheckin={handleCheckin}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEATURES PAGE */}
      {activePage === "features" && (
        <div className="page features-page">
          <div className="features-hero">
            <div className="section-label">Why GreenRoot</div>
            <h1>Everything you need to <em>live greener</em></h1>
            <p>Powerful tools that turn complex environmental data into simple, actionable habits.</p>
          </div>

          <div className="features-grid">
            {[
              { icon: "📊", title: "Carbon Tracker", desc: "Automatically track your carbon footprint across transport, food, energy, and shopping.", color: "rgba(122,155,94,0.1)" },
              { icon: "🤖", title: "AI Suggestions", desc: "Our AI surfaces the highest-impact changes you can make, ranked by effort vs environmental benefit.", color: "rgba(196,135,90,0.1)" },
              { icon: "🌱", title: "Habit Builder", desc: "Set sustainability goals with smart reminders and streak tracking. Build lasting habits with gentle nudges.", color: "rgba(44,59,30,0.08)" },
              { icon: "🗺️", title: "Green Map", desc: "Discover sustainable businesses, farmers markets, and eco-friendly services near you.", color: "rgba(122,155,94,0.1)" },
              { icon: "👥", title: "Community", desc: "Join challenges, share wins, and get inspired by 12,000+ people on the same journey.", color: "rgba(140,106,63,0.1)" },
              { icon: "📈", title: "Impact Reports", desc: "Monthly reports showing exactly how much CO₂ you've saved, with shareable milestones.", color: "rgba(122,155,94,0.1)" },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                <h3 className="feature-h">{f.title}</h3>
                <p className="feature-p">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRICING PAGE */}
      {activePage === "pricing" && (
        <div className="page pricing-page">
          <div className="pricing-header">
            <div className="section-label">Simple Pricing</div>
            <h1>Start <em>free,</em> grow green.</h1>
            <p>No hidden fees. Cancel anytime. 14-day free trial on all plans.</p>
          </div>

          <div className="pricing-grid">
            {[
              {
                name: "Seedling", price: "$0", period: "/month",
                desc: "Everything you need to start your journey.",
                features: ["Carbon footprint tracker", "5 sustainability habits", "Monthly impact report", "Community access"],
                cta: "Get Started Free", featured: false,
              },
              {
                name: "Grove", price: "$9", period: "/month",
                desc: "For people serious about making real change.",
                features: ["Everything in Seedling", "Unlimited habits & goals", "AI-powered suggestions", "Green Map (full access)", "Weekly impact reports"],
                cta: "Start 14-Day Trial", featured: true,
              },
              {
                name: "Forest", price: "$24", period: "/month",
                desc: "For teams and organizations driving collective impact.",
                features: ["Everything in Grove", "Up to 10 team members", "Team impact dashboard", "Group challenges", "API access"],
                cta: "Contact Us", featured: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`price-card ${plan.featured ? "featured" : ""}`}>
                {plan.featured && <div className="featured-badge">Most Popular</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">
                  {plan.price}<span>{plan.period}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-divider" />
                <div className="plan-features">
                  {plan.features.map((f) => (
                    <div key={f} className="plan-feature">
                      <div className="check">✓</div>
                      {f}
                    </div>
                  ))}
                </div>
                <button className={`plan-cta ${plan.featured ? "cta-filled" : "cta-outline"}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
