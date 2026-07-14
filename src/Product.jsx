import React, { useState } from 'react';
import './Product.css';

const products = [
  {
    title: "DI Pipes",
    tag: "K-7, K-9 · 80mm–1200mm",
    desc: "As per IS:8329. High-strength ductile iron pipes for water supply, pressure mains, and long-distance pipeline networks.",
    img: "/img/pipe.png",
  },
  {
    title: "DI Fittings",
    tag: "Bends, Tees, Reducers",
    desc: "Durable fittings ensuring leak-proof joints and direction changes in DI pipeline systems.",
    img: "/img/fittings.png",
  },
  {
    title: "DI Double Flange Pipes & Fittings",
    tag: "IS:8329 · IS:9523",
    desc: "Heavy-duty flanged pipes ideal for pumping stations, overhead tanks, valve chambers, and high-pressure installations.",
    img: "/img/DFpipe.png",
  },
  {
    title: "Valves",
    tag: "Gate · Sluice · Butterfly",
    desc: "Reliable industrial valves for flow control, isolation, and regulation in water supply and infrastructure projects.",
    img: "/img/Valves.png",
  },
  {
    title: "GI & MS Pipes · HDPE Pipes · TMT Bars",
    tag: "Multi-product",
    desc: "Complete range of structural and fluid-carrying products for diverse infrastructure and construction requirements.",
    img: "/img/GI.png",
  },
];

export default function Product() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const activeProduct = products[activeIndex];

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
          {products.map((p, index) => (
            <li
              key={p.title}
              className={`product-item ${activeIndex === index ? 'product-item-active' : ''}`}
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="product-item-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="product-item-body">
                <p className="product-item-title">
                  {p.title}
                  <span>{p.tag}</span>
                </p>
                <p className="product-item-desc">{p.desc}</p>
              </div>
              <div className="product-item-arrow">→</div>
            </li>
          ))}
        </ul>

      </div>

      {/* Right */}
      <div className="product-right">
        <div className="product-img-frame">
          <img
            key={activeProduct.img}
            src={activeProduct.img}
            alt={activeProduct.title}
            className={`product-img ${isHovering ? 'product-img-zoom' : ''}`}
          />

          <div className="product-frame-border" />

          <div className={`product-hover-overlay ${isHovering ? 'product-hover-overlay-visible' : ''}`}>
            <p className="product-hover-tag">{activeProduct.tag}</p>
            <h3>{activeProduct.title}</h3>
            <p className="product-hover-desc">{activeProduct.desc}</p>
          </div>
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