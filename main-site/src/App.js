import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const API_URL = "https://localhost:7148/api/images"; // Backend adresin

  // 1️⃣ Resimleri getir (GET)
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };
}
  useEffect(() => {
    fetchImages();
  }, []);

  // 2️⃣ Dosya seçildiğinde önizleme
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  // 3️⃣ Dosya yükleme (POST)
  const handleUpload = async () => {
    if (!file) return alert("Dosya seçmedin!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setPreview(null);
      fetchImages(); // Listeyi güncelle
    } catch (err) {
      console.error(err);
      alert("Yükleme hatası!");
    }
  };

  // 4️⃣ Dosya silme (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Silme hatası!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Resimler</h1>

      {/* Yükleme Alanı */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <input type="file" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 w-40 rounded shadow"
          />
        )}
        <button
          onClick={handleUpload}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Yükle
        </button>
      </div>

      {/* Resim Listesi */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Yüklü Resimler</h2>
        {images.length === 0 ? (
          <p>Henüz resim yok</p>
        ) : (
          <ul>
            {images.map((img) => (
              <li key={img.id} className="flex items-center justify-between mb-2">
                <img
                  src={`http://localhost:5000${img.filePath}`}
                  alt={img.fileName}
                  className="w-20 rounded shadow"
                />
                <span>{img.fileName}</span>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ImageGallery from "./components/ImageSlider";
import Home from "./pages/home";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <div>
              <h1 className="text-4xl text-center mt-10 font-bold">Hizmetlerimiz</h1>
              <ImageGallery />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

// Navbar component
function Navbar() {
  const location = useLocation();

  // Sadece /products sayfasında göster
  if (location.pathname === "/") return null;

  return (
    <nav className="flex justify-center gap-6 mt-6 text-lg font-semibold">
      <Link to="/" className="hover:text-blue-600">Ana Sayfa</Link>
      <Link to="/products" className="hover:text-blue-600">Ürünler</Link>
    </nav>
  );
}

export default App;
