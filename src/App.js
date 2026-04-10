import { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Layout from "./Components/Layout";
import UploadForm from "./Components/UploadForm";
import AddSubCategoryForm from "./Components/AddSubCategoryForm";
import ImageGallery from "./Components/ImageGallery";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  // 🔥 SUB CATEGORY ADD
  const [newSubName, setNewSubName] = useState("");
  const [selectedMainForSub, setSelectedMainForSub] = useState("");

  const [activePage, setActivePage] = useState("upload");
  const API_URL = "https://localhost:7148/api/images";

  // 🔥 IMAGES
  const fetchImages = async () => {
    try {
      const res = await axios.get(API_URL);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 MAIN CATEGORIES
  const fetchMainCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/main-categories`);
      setMainCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchMainCategories();
  }, []);

  // 🔥 MAIN CHANGE → SUB GETİR
  const handleMainChange = async (e) => {
    const id = e.target.value;
    setSelectedMain(id);

    try {
      const res = await axios.get(`${API_URL}/sub-categories/${id}`);
      setSubCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FILE
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // 🔥 UPLOAD
  const handleUpload = async () => {
    if (!file || !selectedSub) {
      alert("Dosya ve alt kategori seç!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("subCategoryId", selectedSub);

    try {
      await axios.post(`${API_URL}/upload`, formData);

      setFile(null);
      setPreview(null);
      setSelectedSub("");

      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 ADD SUB CATEGORY
  const handleAddSubCategory = async () => {
    if (!newSubName || !selectedMainForSub) {
      alert("Alanları doldur!");
      return;
    }

    try {
      await axios.post(`${API_URL}/add-subcategory`, {
        Name: newSubName,
        MainCategoryId: parseInt(selectedMainForSub),
      });

      setNewSubName("");
      alert("Alt kategori eklendi!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <Layout activePage={activePage} setActivePage={setActivePage}>

    <h2 className="mb-4">Admin Panel</h2>

    {activePage === "upload" && (
      <UploadForm
        mainCategories={mainCategories}
        subCategories={subCategories}
        selectedMain={selectedMain}
        selectedSub={selectedSub}
        handleMainChange={handleMainChange}
        setSelectedSub={setSelectedSub}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        preview={preview}
      />
    )}

    {activePage === "subcategory" && (
      <AddSubCategoryForm
        mainCategories={mainCategories}
        setSelectedMainForSub={setSelectedMainForSub}
        newSubName={newSubName}
        setNewSubName={setNewSubName}
        handleAddSubCategory={handleAddSubCategory}
      />
    )}

    <ImageGallery
      images={images}
      handleDelete={handleDelete}
    />

  </Layout>
);
}

export default App;