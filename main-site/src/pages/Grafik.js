import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Grafik() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7148/api/images/sub-categories/2") // 2 = grafik
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="text-center fw-bold mb-4">Grafik</h2>

      <div className="row g-4">
        {subCategories.map((x) => (
          <div className="col-md-3" key={x.Id}>
            <Link
              to={`/grafik/${x.Id}`}
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center p-4 h-100">

                <h5 className="fw-bold">{x.Name}</h5>

              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Grafik;