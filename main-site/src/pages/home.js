import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import logo from "../assets/indir1.jpeg"; // logonun yolu

function Home() {
  return (
    <div className="home-background">
      {/* Üst logo ve yuvarlaklar */}
      <div className="top-center-container">
        <img src={logo} alt="Logo" className="top-logo" />
        <div className="circles-container">
          <div className="circle" img src="C:\Users\albay\Desktop\ersindekupe\main-site\src\assets\Adobe_Illustrator_CC_icon.svg.png"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>

      {/* Sürekli dönen banner alanları */}
      <Link to="/products" className="side left-side"></Link>
      <Link to="/products" className="side right-side"></Link>
    </div>
  );
}

export default Home;
