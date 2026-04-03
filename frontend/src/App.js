import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const API_URL = "https://localhost:7148/api/images";

  const fetchImages = async () => {
    const res = await axios.get(API_URL);
    setImages(res.data);
  };

  const fetchMainCategories = async () => {
    const res = await axios.get(`${API_URL}/main-categories`);
    setMainCategories(res.data);
  };

  useEffect(() => {
    fetchImages();
    fetchMainCategories();
  }, []);

  const handleMainChange = async (e) => {
    const id = e.target.value;
    setSelectedMain(id);

    const res = await axios.get(`${API_URL}/sub-categories/${id}`);
    setSubCategories(res.data);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file || !selectedSub) {
      alert("Dosya ve alt kategori seç!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subCategoryId", selectedSub);

    await axios.post(`${API_URL}/upload`, formData);

    setFile(null);
    setPreview(null);
    setSelectedSub("");

    fetchImages();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchImages();
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Admin Panel</h2>
        <p className="text-muted">Fotoğraf yönetimi</p>
      </div>

      {/* UPLOAD CARD */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <h5 className="mb-3">Fotoğraf Yükle</h5>

          <div className="row g-3">

            {/* MAIN */}
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={handleMainChange}
                value={selectedMain}
              >
                <option value="">Ana kategori seç</option>
                {mainCategories.map((x) => (
                  <option key={x.Id} value={x.Id}>
                    {x.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* SUB */}
            <div className="col-md-6">
              <select
                className="form-select"
                onChange={(e) => setSelectedSub(e.target.value)}
                value={selectedSub}
              >
                <option value="">Alt kategori seç</option>
                {subCategories.map((x) => (
                  <option key={x.Id} value={x.Id}>
                    {x.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* FILE */}
            <div className="col-md-8">
              <input
                className="form-control"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            {/* BUTTON */}
            <div className="col-md-4 d-grid">
              <button className="btn btn-dark" onClick={handleUpload}>
                Yükle
              </button>
            </div>

          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="text-center mt-3">
              <img
                src={preview}
                alt=""
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

        </div>
      </div>

      {/* GALLERY */}
      <div className="row g-4">
        {images.map((img) => (
          <div className="col-md-3" key={img.id}>
            <div className="card border-0 shadow-sm h-100">

              <img
                src={`https://localhost:7148${img.filePath}`}
                alt=""
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <div className="card-body text-center">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(img.id)}
                >
                  Sil
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;