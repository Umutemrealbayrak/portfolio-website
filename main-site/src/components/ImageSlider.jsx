import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ImageGallery({ categoryId }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7148/api/images")
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 FİLTRE
  const filteredImages = categoryId
    ? images.filter((img) => img.categoryId === categoryId)
    : images;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    e.currentTarget.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    e.currentTarget.style.transform = "scale(2)";
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {filteredImages.map((img) => (
          <div className="col-md-4" key={img.id}>
            <div className="card border-0 shadow-sm" style={{ borderRadius: "15px" }}>
              
              <div style={{ overflow: "hidden", borderRadius: "15px" }}>
                <img
                  src={`https://localhost:7148/images/${img.fileName}`}
                  alt={img.fileName}
                  className="w-100"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#imageModal"
                  onClick={() =>
                    setSelectedImage(`https://localhost:7148/images/${img.fileName}`)
                  }
                />
              </div>

              <div className="card-body text-center">
                <h6 className="fw-bold">{img.fileName}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="imageModal" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content bg-dark border-0">
            <div className="modal-body text-center p-0">
              <img
                src={selectedImage}
                alt=""
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                  cursor: "zoom-in",
                }}
                onMouseMove={handleMove}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;