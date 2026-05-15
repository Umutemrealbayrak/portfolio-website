import axios from "axios";
import { useState } from "react";

function UploadPairForm({ subCategories }) {
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [subId, setSubId] = useState("");

  // 🔥 SADECE DEKUPE (mainCategoryId = 1)
  const filteredSubs = subCategories.filter(x => x.MainCategoryId === 1);

  const handleUpload = async () => {
    if (!before || !after || !subId) {
      alert("Hepsini seç knk");
      return;
    }

    const formData = new FormData();
    formData.append("before", before);
    formData.append("after", after);
    formData.append("subCategoryId", parseInt(subId));

    await axios.post("https://localhost:7148/api/images/upload-pair", formData);

    alert("Yüklendi 🔥");
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Dekupe (Before / After)</h5>

      <select
        className="form-select mb-2"
        onChange={(e) => setSubId(e.target.value)}
      >
        <option>Alt kategori seç</option>
        {subCategories.map((x) => (
          <option key={x.Id} value={x.Id}>
            {x.Name}
          </option>
        ))}
      </select>

      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setBefore(e.target.files[0])}
      />

      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setAfter(e.target.files[0])}
      />

      <button className="btn btn-dark" onClick={handleUpload}>
        Upload Pair
      </button>
    </div>
  );
}
export default UploadPairForm;