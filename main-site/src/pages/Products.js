import React from "react";
import ImageGallery from "../components/ImageSlider";
import 'bootstrap/dist/css/bootstrap.min.css';

function Products() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-10 font-bold">Hizmetlerimiz</h1>
      <ImageGallery />
    </div>
  );
}

export default Products;