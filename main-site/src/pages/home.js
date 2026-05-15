import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import logo from "../assets/indir1.jpeg"; // logonun yolu
import ai from "../assets/Adobe_Illustrator_CC_icon.svg.png";
import ps from "../assets/Adobe_Photoshop_CC_icon.svg.png";
import figma from "../assets/Adobe_Photoshop_Lightroom_CC_logo.svg.png";
import ae from "../assets/Adobe_After_Effects_CC_icon.svg.png";
import pr from "../assets/Adobe_Premiere_Pro_CC_icon.svg.png";


function Home() {
  return (
    <div className="home-background">
      {/* Üst logo ve yuvarlaklar */}
      <div className="top-center-container">
        <img src={logo} alt="Logo" className="top-logo" />
        <div className="circles-container">
  <div className="circle" style={{ backgroundImage: `url(${ps})` }}></div>
  <div className="circle" style={{ backgroundImage: `url(${figma})` }}></div>
  <div className="circle" style={{ backgroundImage: `url(${ai})` }}></div>
  <div className="circle" style={{ backgroundImage: `url(${ae})` }}></div>
  <div className="circle" style={{ backgroundImage: `url(${pr})` }}></div>
</div>
      </div>

      {/* Sürekli dönen banner alanları */}
      <Link to="/Dekupe" className="side left-side"></Link>
      <Link to="/Grafik" className="side right-side"></Link>
    </div>
  );
}

export default Home;
