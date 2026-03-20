import React from "react";
import "./Copy.css";

export default function Copyright() {
  return (
    <footer className="copyright-footer">

      {/* Left — Brand */}
      <div className="copyright-left">
        <div className="copyright-logo-dot" />
        <span className="copyright-brand">
          PINAKA <span>INFRA</span>
        </span>
      </div>

      {/* Center — Copyright text */}
      <div className="copyright-center">
        © {new Date().getFullYear()} PINAKA INFRA.{" "}
        <strong>All Rights Reserved.</strong>
        <br />
        <span style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
          ISI Marked · BIS Certified · Pan India Supply
        </span>
      </div>

      {/* Right — Links + Made in India */}
      <div className="copyright-right">
      { /* <a href="#" className="copyright-link">Privacy</a>
        <div className="copyright-divider" />
        <a href="#" className="copyright-link">Terms</a>
        <div className="copyright-divider" />*/}
        <a href="mailto:eshant@pinakainfra.in" className="copyright-link">
          Contact
        </a>
        <div className="copyright-divider" />
        <div className="copyright-made">
          <span>Made in</span>
          <span className="copyright-flag">🇮🇳</span>
          <span>India</span>
        </div>
      </div>

    </footer>
  );
}