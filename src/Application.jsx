import React from 'react';
import { Building2 } from 'lucide-react';


export default function Application(){
return (
<div className="card">
<div className="card-content">
<h2><Building2 className="icon" /> Applications</h2>
<ul className="application-list product-list">
<li>Water Supply Projects
  Reliable DI piping solutions for urban, rural, and municipal water distribution networks.</li>
<li>Irrigation
Durable pipelines supporting efficient agricultural water delivery and field irrigation systems.</li>
<li>Industries & Power Plants
High-performance pipeline systems designed for industrial processing and cooling operations.</li>
<li>Fire Fighting Systems
Pressure-resistant pipes and fittings for dependable firefighting and safety infrastructure.</li>
<li>Sewerage & Drainage
Corrosion-resistant pipelines built for smooth wastewater, sewage, and stormwater management.</li>
</ul>
</div>


<div className="product-image-wrapper">
<img src="/img/tank.png" alt="appl" className="product-image" />
</div>
</div>
);
}