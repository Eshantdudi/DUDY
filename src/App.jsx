import React, { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./Header";
import Product from "./Product";
import About from "./About";
import Application from "./Application";
import Copyright from "./copy";
import "./App.css";

function Contact() {
  return (
    <section className="contact-section">

      {/* Left */}
      <div className="contact-left">

        <div className="contact-badge">
          <div className="contact-badge-dot" />
          <span className="contact-badge-text">Contact Us</span>
        </div>

        <h2 className="contact-title">
          GET IN <span>TOUCH</span>
        </h2>
        <p className="contact-tagline">We respond within 24 hours</p>

        <div className="contact-divider" />

        <div className="contact-info-list">

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2C6.2 2 4 4.2 4 7c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" stroke="#ff6b1a" strokeWidth="1.4"/>
                <circle cx="9" cy="7" r="2" stroke="#ff6b1a" strokeWidth="1.3"/>
              </svg>
            </div>
            <div>
              <p className="contact-info-label">Address</p>
              <p className="contact-info-value">
                Plot 9 (DHL Square), Sector 22<br />
                IT Park, Panchkula, Haryana — 134109
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3.5C3 3.5 4 2 5.5 2c.5 0 1 .4 1.5 1.4L8 5.5c.3.6.1 1.3-.4 1.6l-.6.5c.4.8 1.4 1.8 2.2 2.2l.5-.6c.4-.5 1-.7 1.6-.4l2 .9C14 10 14.5 10.5 14.5 11 14.3 12.5 13 14.5 11.5 14.5 6.5 14.5 2 10 2 5 2 3.5 3 3.5 3 3.5z" stroke="#ff6b1a" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="contact-info-label">Phone</p>
              <p className="contact-info-value">+91 81464 44549</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="#ff6b1a" strokeWidth="1.4"/>
                <path d="M2 5l7 5 7-5" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="contact-info-label">Email</p>
              <p className="contact-info-value">eshant@pinakainfra.in</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="3" stroke="#ff6b1a" strokeWidth="1.4"/>
                <path d="M6 9h6M9 6v6" stroke="#ff6b1a" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="contact-info-label">Company</p>
              <p className="contact-info-value">PINAKA INFRA</p>
            </div>
          </div>

        </div>

        <div className="contact-gst">
          <span className="contact-gst-label">GSTIN</span>
          <span className="contact-gst-value">06ESWPS2560H1Z3</span>
        </div>

      </div>

      {/* Right */}
      <div className="contact-right">
        <div className="contact-accent-tl" />
        <div className="contact-accent-br" />

        <div className="contact-map-frame">
          <img src="/img/map.png" alt="India Map" />

          <div className="contact-pin">
            <div className="contact-pin-dot" />
            <div className="contact-pin-line" />
          </div>

          <div className="contact-pin-tooltip">
            <p>PINAKA INFRA</p>
            <span>Panchkula, Haryana</span>
          </div>
        </div>
      </div>

    </section>
  );
}

const App = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="neo-app">
      <Header />

      <main className="neo-main" ref={mainRef}>
        <div className="reveal"><Product /></div>
        <div className="section-divider" />

        <div className="reveal"><Application /></div>
        <div className="section-divider" />

        <div className="reveal"><About /></div>
        <div className="section-divider" />

        <div className="reveal"><Contact /></div>
      </main>

      <Copyright />

      {/* WhatsApp float */}
      <a
        href="https://wa.me/918146444549"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <div className="whatsapp-pulse" />
        <FaWhatsapp />
      </a>

    </div>
  );
};

export default App;