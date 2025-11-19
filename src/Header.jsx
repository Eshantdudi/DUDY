
import "./App.css";
import React from 'react';
import { Package } from 'lucide-react';


export default function Header(){
return (
<header className="header">
<div className="header-logo">
<img src="/img/logo.jpg" alt="logo" style={{width:'100%',height:'100%',objectFit:'cover'}} />
</div>
<div>
<div className="header-title">PINAKA INFRA</div>
<div className="header-sub">DIVINE STRENGTH IN EVERY DEAL</div>
</div>
<div style={{marginLeft:'auto'}}>

</div>
</header>
);
}