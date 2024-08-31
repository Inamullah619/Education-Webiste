import React, { useState } from "react";
import Head from "./Head";
import "./header.css";

const Header = ({ navigate }) => {
  const [click, setClick] = useState(false);

  const handleNavigation = (path) => {
    setClick(false);
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path; 
    }
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>Home</a>
            </li>
            <li>
              <a href="/courses" onClick={(e) => { e.preventDefault(); handleNavigation('/courses'); }}>All Courses</a>
            </li>
            <li>
              <a href="/about" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }}>About</a>
            </li>
            <li>
              <a href="/team" onClick={(e) => { e.preventDefault(); handleNavigation('/team'); }}>Team</a>
            </li>
            <li>
              <a href="/pricing" onClick={(e) => { e.preventDefault(); handleNavigation('/pricing'); }}>Pricing</a>
            </li>
            
            <li>
              <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact</a>
            </li>
          </ul>
          <div className="start">
            <div className="button"><a href ="/Online Test " onClick={(e) =>{
              e.preventDefault();
              console.log("Hi"); 
               handleNavigation('/Online Test');
                }}><span>APPLY FOR TEST</span></a></div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
