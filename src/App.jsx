import React, { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./Header";
import Product from "./Product";
import About from "./About";
import Application from "./Application";
import Copyright from "./copy";

import "./App.css"; // main CSS for Neo-Glass theme


const App = () => {
useEffect(() => {
const cards = document.querySelectorAll('.card');
const revealCards = () => {
cards.forEach(card => {
const rect = card.getBoundingClientRect();
if (rect.top < window.innerHeight - 80) card.classList.add('show');
});
};
window.addEventListener('scroll', revealCards);
revealCards();
return () => window.removeEventListener('scroll', revealCards);
}, []);


return (
<div className="neo-app">
<Header />


<main className="neo-main">
<Product />
<Application />
<About />




<div className="card contact">
<div className="card-content">
<h2>Contact Us</h2>

<p><strong>PINAKA INFRA </strong></p>
<p><strong>Address:</strong> Plot 9 (DHL SQUARE), Sector 22, IT Park, Panchkula, Haryana, 134109</p>
<p><strong>Phone:</strong> +91 8146444549</p>
<p><strong>Email:</strong> eshant@pinakainfra.in</p>

<p className="gst">GSTIN: 06ESWPS2560H1Z3</p>
</div>

 {/* Right Side Map */}
      <div className="map-wrapper">
        <div className="map-container">
          <img src="/img/map.png" alt="India Map" className="india-map" />

          {/* Haryana Tooltip Point */}
          <div className="pin"></div>
          <div className="tooltip">PINAKA INFRA</div>
        </div>
      </div>
    </div>
</main>





<Copyright />




<a href="https://wa.me/918146444549" className="whatsapp-float" target="_blank" rel="noreferrer">
<FaWhatsapp />
</a>
</div>
);
};


export default App;