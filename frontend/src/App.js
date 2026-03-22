import { useState, useEffect } from "react";
import axios from "axios";

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

  // 🔥 main seçilince sub çek
  const handleMainChange = async (e) => {
    const id = e.target.value;
    setSelectedMain(id);

    const res = await axios.get(`${API_URL}/sub-categories/${id}`);
    setSubCategories(res.data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file || !selectedSub) {
      alert("Dosya ve alt kategori seç!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subCategoryId", selectedSub); // 🔥 kritik

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
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* 🔥 MAIN CATEGORY */}
      <select onChange={handleMainChange}>
        <option value="">Ana kategori seç</option>
        {mainCategories.map((x) => (
          <option key={x.Id} value={x.Id}>
            {x.Name}
          </option>
        ))}
      </select>

      {/* 🔥 SUB CATEGORY */}
      <select onChange={(e) => setSelectedSub(e.target.value)}>
        <option value="">Alt kategori seç</option>
        {subCategories.map((x) => (
          <option key={x.Id} value={x.Id}>
            {x.Name}
          </option>
        ))}
      </select>

      {/* FILE */}
      <input type="file" onChange={handleFileChange} />

      {preview && <img src={preview} className="w-40 mt-2" alt="" />}

      <button onClick={handleUpload}>Yükle</button>

      <ul className="mt-4">
        {images.map((img) => (
          <li key={img.id} className="mb-2">
            <img
              src={`https://localhost:7148${img.filePath}`}
              alt=""
              className="w-20"
            />
            <button onClick={() => handleDelete(img.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;