function UploadForm({
  subCategories,
  selectedSub,
  setSelectedSub,
  handleFileChange,
  handleUpload,
  preview
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <h5 className="mb-3">Grafik Foto Yükle</h5>

        <div className="row g-3">

          {/* ❌ ANA KATEGORİ KALDIRILDI */}

          <div className="col-md-12">
            <select
              className="form-select"
              onChange={(e) => setSelectedSub(e.target.value)}
              value={selectedSub}
            >
              <option value="">Alt kategori seç</option>
              {subCategories.map((x) => (
                <option key={x.Id} value={x.Id}>
                  {x.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-8">
            <input
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
          </div>

          <div className="col-md-4 d-grid">
            <button className="btn btn-dark" onClick={handleUpload}>
              Yükle
            </button>
          </div>

        </div>

        {preview && (
          <div className="text-center mt-3">
            <img src={preview} className="img-thumbnail" style={{ maxWidth: "200px" }} />
          </div>
        )}

      </div>
    </div>
  );
}
export default UploadForm;