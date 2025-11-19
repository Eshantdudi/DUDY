import React from 'react';
import { Package } from 'lucide-react';


export default function Product(){
return (
<div className="card product-card">
<div className="card-content product-info">
<h2 className="product-title"><Package className="icon" /> Our Products</h2>
<ul className="product-list">
<li>DI Pipes (K-7, K-9 – 80mm to 1200mm)
As per IS: 8329 High-strength ductile iron pipes suitable for water supply, 
pressure mains, and long-distance pipeline networks.</li>
<li>DI Fittings (Bends, Tees, Reducers, etc.)
Durable fittings designed to ensure leak-proof joints 
and direction changes in DI pipeline systems.</li>

<li>DI Double Flange Pipes & Fittings
As per IS 8329 Heavy-duty flanged pipes and fittings(IS:9523 ) ideal for pumping stations, Overhead Tanks,
 valve chambers, and high-pressure installations.</li>
<li>Valves (Gate, Sluice, Butterfly)
 Reliable industrial valves as per IS used for flow control, 
 isolation, and regulation in water supply and infrastructure projects.</li>
<li>GI & MS Pipes, HDPE Pipes, TMT Bars</li>
</ul>
</div>


<div className="product-image-wrapper">
<img src="/img/RO.png" alt="pipes" className="product-image" />
</div>
</div>
);
}
