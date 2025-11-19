import React from "react";


export default function Copyright() {
  return (
    <footer className="footer-dark">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} PINAKA INFRA. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}