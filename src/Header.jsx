import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">

      {/* Logo */}
      <div className="logo-box">
        <img src="/img/logo.jpg" alt="Pinaka Infra Logo" />
      </div>

      {/* Brand */}
      <div className="brand">
        <div className="brand-title">
          PINAKA
          <span className="highlight">INFRA</span>
        </div>
        <div className="brand-sub">
          Divine Strength In Every Deal
        </div>
      </div>

      {/* Line */}
      <div className="divider" />

      {/* Nav */}
    { /* <nav className="nav">
        {['Home', 'Projects', 'About', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>*/}

      {/* Dot */}
      <div className="dot" />

    </header>
  );
}