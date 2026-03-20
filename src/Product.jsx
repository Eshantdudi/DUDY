import React from 'react';
import './Product.css';

const products = [
  {
    title: "DI Pipes",
    tag: "K-7, K-9 · 80mm–1200mm",
    desc: "As per IS:8329. High-strength ductile iron pipes for water supply, pressure mains, and long-distance pipeline networks.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="6" width="14" height="6" rx="3" stroke="#ff6b1a" strokeWidth="1.4"/>
        <circle cx="4" cy="9" r="1.5" stroke="#ff6b1a" strokeWidth="1.2"/>
        <circle cx="14" cy="9" r="1.5" stroke="#ff6b1a" strokeWidth="1.2"/>
        <path d="M5.5 9h7" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "DI Fittings",
    tag: "Bends, Tees, Reducers",
    desc: "Durable fittings ensuring leak-proof joints and direction changes in DI pipeline systems.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9h5v5" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 9l5-5" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="8" cy="9" r="2" stroke="#ff6b1a" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "DI Double Flange Pipes & Fittings",
    tag: "IS:8329 · IS:9523",
    desc: "Heavy-duty flanged pipes ideal for pumping stations, overhead tanks, valve chambers, and high-pressure installations.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="7" width="16" height="4" rx="2" stroke="#ff6b1a" strokeWidth="1.4"/>
        <rect x="3" y="5" width="2" height="8" rx="1" stroke="#ff6b1a" strokeWidth="1.2"/>
        <rect x="13" y="5" width="2" height="8" rx="1" stroke="#ff6b1a" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "Valves",
    tag: "Gate · Sluice · Butterfly",
    desc: "Reliable industrial valves for flow control, isolation, and regulation in water supply and infrastructure projects.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="5" stroke="#ff6b1a" strokeWidth="1.4"/>
        <path d="M9 4v10M4 9h10" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "GI & MS Pipes · HDPE Pipes · TMT Bars",
    tag: "Multi-product",
    desc: "Complete range of structural and fluid-carrying products for diverse infrastructure and construction requirements.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 6h14M2 9h14M2 12h14" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Product() {
  return (
    <section className="product-section">

      {/* Left */}
      <div className="product-left">

        <div className="product-badge">
          <div className="product-badge-dot" />
          <span className="product-badge-text">Our Products</span>
        </div>

        <h2 className="product-title">
          OUR <span>PRODUCTS</span>
        </h2>
        <p className="product-tagline">ISI Marked · BIS Certified · Pan India Supply</p>

        <div className="product-divider" />

        <ul className="product-list">
          {products.map((p) => (
            <li key={p.title} className="product-item">
              <div className="product-item-icon">{p.icon}</div>
              <div className="product-item-body">
                <p className="product-item-title">
                  {p.title}
                  <span>{p.tag}</span>
                </p>
                <p className="product-item-desc">{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>

      </div>

      {/* Right */}
      <div className="product-right">
        <div className="product-accent-tl" />
        <div className="product-accent-br" />

        <div className="product-img-frame">
          <img src="/img/RO.png" alt="DI Pipes and Fittings" />
        </div>

        <div className="product-floating-tag">
          <div className="product-green-dot" />
          <div>
            <div className="product-tag-title">Pan India Delivery</div>
            <div className="product-tag-sub">Govt. Projects · Bulk Supply</div>
          </div>
        </div>
      </div>

    </section>
  );
}