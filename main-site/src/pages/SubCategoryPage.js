import { useParams, useLocation } from "react-router-dom";
import ImageGallery from "../components/ImageSlider";

function SubCategoryPage() {
  const { subId } = useParams();
  const location = useLocation();

  const isDekupe = location.pathname.includes("dekupe");
  const mainCategoryId = isDekupe ? 1 : 2;

  return (
    <div className="container mt-4">

      <h2 className="text-center">
        {isDekupe ? "Dekupe" : "Grafik"}
      </h2>

      <ImageGallery
        categoryId={mainCategoryId}
        subCategoryId={parseInt(subId)}
      />

    </div>
  );
}

export default SubCategoryPage;