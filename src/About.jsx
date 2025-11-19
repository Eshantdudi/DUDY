import React from 'react';
import { Hammer } from 'lucide-react';


export default function About(){
return (
<div className="card">
<div className="card-content">
<h2><Hammer className="icon" /> About Us</h2>
<p className="product-list">
PINAKA INFRA is a leading supplier of ISI-marked Ductile Iron Socket & Spigot Pipes,
            Double Flanged pipes and Fittings, serving major government and infrastructure
            projects across India with a strong focus on quality, reliability and timely delivery.
            Backed by technical expertise and a client-first approach, we ensure that every product
            meets national standards and project-specific requirements. From procurement to 
            dispatch, our process is streamlined to deliver performance, durability, and long-term value.
</p>
</div>
<div className="product-image-wrapper">
<img src="/img/pipe.png" alt="about" className="product-image" />
</div>
</div>
);
}