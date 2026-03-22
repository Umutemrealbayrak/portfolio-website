import React from "react";
import ImageGallery from "../components/ImageSlider";

function Dekupe() {
  return (
    <div>
      <h2 className="text-center mt-4">Dekupe</h2>
      <ImageGallery categoryId={1} />
    </div>
  );
}

export default Dekupe;