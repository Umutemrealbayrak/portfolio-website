import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageSlider";

function SubCategoryPage() {
  const { subId } = useParams();

  return (
    <div>
      <h2 className="text-center mt-4">Alt Kategori</h2>
      <ImageGallery subCategoryId={parseInt(subId)} />
    </div>
  );
}

export default SubCategoryPage;