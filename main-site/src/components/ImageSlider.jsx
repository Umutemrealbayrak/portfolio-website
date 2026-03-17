import React, { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);

  // API’den dosya adlarını alıyoruz
  useEffect(() => {
    axios.get("https://localhost:7148/api/images") // backend API endpoint
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.map(img => (
        <img
          key={img.id}
          src={`https://localhost:7148/images/${img.fileName}`}
          alt={img.fileName}
          width="300"
          height="300"
          style={{ objectFit: "cover" }}
        />
      ))}
    </div>
  );
}

export default Gallery;
