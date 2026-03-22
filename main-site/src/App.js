import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/home";
import Dekupe from "./pages/Dekupe";
import Grafik from "./pages/Grafik";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dekupe" element={<Dekupe />} />
        <Route path="/grafik" element={<Grafik />} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const location = useLocation();

  if (location.pathname === "/") return null;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Umut</span>

        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-dark">
            Ana Sayfa
          </Link>
          <Link to="/dekupe" className="btn btn-outline-dark">
            Dekupe
          </Link>
          <Link to="/grafik" className="btn btn-outline-dark">
            Grafik
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default App;