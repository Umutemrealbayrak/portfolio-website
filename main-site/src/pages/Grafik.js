import React from "react";
import ImageGallery from "../components/ImageSlider";

function Grafik() {
  return (
    <div>
      <h2 className="text-center mt-4">Grafik</h2>
      <ImageGallery categoryId={2} />
    </div>
  );
}

export default Grafik;