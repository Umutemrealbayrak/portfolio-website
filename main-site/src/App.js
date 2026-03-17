import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <nav className="flex justify-center gap-6 mt-6 text-lg font-semibold">
      <Link to="/">Ana Sayfa</Link>
      <Link to="/products">Ürünler</Link>
    </nav>
  );
}

export default App;