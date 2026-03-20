import React from 'react';
import './Application.css';

const applications = [
  {
    title: "Water Supply Projects",
    desc: "Reliable DI piping solutions for urban, rural, and municipal water distribution networks.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C9 2 4 7 4 11a5 5 0 0 0 10 0c0-4-5-9-5-9z" stroke="#ff6b1a" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M6.5 12c0 1.4 1.1 2.5 2.5 2.5" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Irrigation",
    desc: "Durable pipelines supporting efficient agricultural water delivery and field irrigation systems.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 14c2-4 4-6 7-6s5 2 7 6" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9 8V4M6 6l3-3 3 3" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 14v2M9 14v2M13 14v2" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Industries & Power Plants",
    desc: "High-performance pipeline systems designed for industrial processing and cooling operations.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="10" width="4" height="6" rx="1" stroke="#ff6b1a" strokeWidth="1.3"/>
        <rect x="7" y="7" width="4" height="9" rx="1" stroke="#ff6b1a" strokeWidth="1.3"/>
        <rect x="12" y="4" width="4" height="12" rx="1" stroke="#ff6b1a" strokeWidth="1.3"/>
        <path d="M2 10L6 6l4 3 4-5" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Fire Fighting Systems",
    desc: "Pressure-resistant pipes and fittings for dependable firefighting and safety infrastructure.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2c0 3-3 4-3 7a3 3 0 0 0 6 0c0-3-3-4-3-7z" stroke="#ff6b1a" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7 13c0 1.1.9 2 2 2s2-.9 2-2" stroke="#ff6b1a" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M6 9c0 2 1.5 3 3 3" stroke="#ff6b1a" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Sewerage & Drainage",
    desc: "Corrosion-resistant pipelines built for smooth wastewater, sewage, and stormwater management.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 6h14" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M2 9h14" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5 6v7M9 6v7M13 6v7" stroke="#ff6b1a" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="2" y="13" width="14" height="3" rx="1.5" stroke="#ff6b1a" strokeWidth="1.3"/>
      </svg>
    ),
  },
];

export default function Application() {
  return (
    <section className="application-section">

      {/* Left — Image */}
      <div className="application-left">
        <div className="application-accent-tl" />
        <div className="application-accent-br" />

        <div className="application-img-frame">
          <img src="/img/tank.png" alt="Applications" />
        </div>

        <div className="application-floating-tag">
          <div className="application-green-dot" />
          <div>
            <div className="application-tag-title">5 Core Sectors</div>
            <div className="application-tag-sub">Govt. & Private Projects</div>
          </div>
        </div>
      </div>

      {/* Right — Content */}
      <div className="application-right">

        <div className="application-badge">
          <div className="application-badge-dot" />
          <span className="application-badge-text">Applications</span>
        </div>

        <h2 className="application-title">
          OUR <span>APPLICATIONS</span>
        </h2>
        <p className="application-tagline">
          Serving Every Infrastructure Need
        </p>

        <div className="application-divider" />

        <ul className="application-list">
          {applications.map((a) => (
            <li key={a.title} className="application-item">
              <div className="application-item-icon">{a.icon}</div>
              <div>
                <p className="application-item-title">{a.title}</p>
                <p className="application-item-desc">{a.desc}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>

    </section>
  );
}