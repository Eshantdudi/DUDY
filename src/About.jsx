import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="about-section">

      {/* Left */}
      <div className="about-left">

        <div className="about-badge">
          <div className="about-badge-dot" />
          <span className="about-badge-text">About Us</span>
        </div>

        <h2 className="about-title">
          PINAKA <span>INFRA</span>
        </h2>
        <p className="about-tagline">Divine Strength In Every Deal</p>

        <div className="about-divider" />

        <p className="about-desc">
          PINAKA INFRA is a leading supplier of ISI-marked Ductile Iron Socket &amp; Spigot Pipes,
          Double Flanged Pipes and Fittings, serving major government and infrastructure projects
          across India with a strong focus on quality, reliability and timely delivery.
          Backed by technical expertise and a client-first approach, we ensure every product
          meets national standards. From procurement to dispatch, our process is streamlined
          to deliver performance, durability, and long-term value.
        </p>

        <div className="about-stats">
          {[
           /* { num: "500+", label: "Projects"      },*/
           /* { num: "15+",  label: "Years Exp."    },*/
            { num: "ISI",  label: "Marked"     },
            { num: "PAN",  label: "India Supply"  },
          ].map((s) => (
            <div key={s.label}>
              <span className="about-stat-num">{s.num}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Right */}
      <div className="about-right">
        <div className="about-accent-tl" />
        <div className="about-accent-br" />

        <div className="about-img-frame">
          <img src="/img/pipe.png" alt="Ductile Iron Pipes" />
        </div>

        <div className="about-floating-tag">
          <div className="about-green-dot" />
          <div>
            <div className="about-tag-title">Government Approved</div>
            <div className="about-tag-sub">ISI Marked · BIS Certified</div>
          </div>
        </div>
      </div>

    </section>
  );
}