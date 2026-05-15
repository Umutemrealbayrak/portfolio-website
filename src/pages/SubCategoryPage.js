import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../components/ImageSlider";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const BASE_URL = "https://localhost:7148";

function SubCategoryPage() {
  const { subId } = useParams();
  const location = useLocation();

  const isDekupe = location.pathname.includes("dekupe");

  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    if (isDekupe) {
      axios
        .get(`${BASE_URL}/api/images/pairs/${subId}`)
        .then((res) => {
          let data = res.data;

          // 🔥 .NET $values fix
          if (data?.$values) {
            data = data.$values;
          }

          if (!Array.isArray(data)) {
            console.error("ARRAY DEĞİL:", data);
            setPairs([]);
            return;
          }

          setPairs(data);
        })
        .catch((err) => console.error(err));
    }
  }, [subId, isDekupe]);

  return (
    <div className="container mt-4">

      <h2 className="text-center fw-bold mb-4">
        {isDekupe ? "Dekupe" : "Grafik"}
      </h2>

      {/* 🔥 DEKUPE */}
      {/* 🔥 DEKUPE */}
{isDekupe ? (
  pairs.length > 0 ? (
    <div className="row">
      {pairs.map((p, i) => {
        const beforePath = (p.beforeImagePath || p.BeforeImagePath || "").replace("/uploads", "/images");
        const afterPath = (p.afterImagePath || p.AfterImagePath || "").replace("/uploads", "/images");

        return (
          <div key={i} className="col-md-4 mb-4">

            <BeforeAfterSlider
              before={`${BASE_URL}${beforePath}`}
              after={`${BASE_URL}${afterPath}`}
            />

          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-center">Foto yok</p>
  )
) : (
  <ImageGallery subCategoryId={parseInt(subId)} />
)}

    </div>
  );
}

export default SubCategoryPage;