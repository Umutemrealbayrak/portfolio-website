import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const API_URL = "https://localhost:7148/api/images";

  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) return alert("Dosya seçmedin!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/upload`, formData);
      setFile(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Resimler</h1>

      <input type="file" onChange={handleFileChange} />

      {preview && <img src={preview} className="w-40 mt-2" alt="" />}

      <button onClick={handleUpload}>Yükle</button>

      <ul>
        {images.map((img) => (
          <li key={img.id}>
            <img
              src={`http://localhost:5000${img.filePath}`}
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