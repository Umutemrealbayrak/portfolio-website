function AddSubCategoryForm({
  mainCategories,
  setSelectedMainForSub,
  newSubName,
  setNewSubName,
  handleAddSubCategory
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <h5 className="mb-3">Alt Kategori Ekle</h5>

        <div className="row g-3">

          <div className="col-md-4">
            <select
              className="form-select"
              onChange={(e) => setSelectedMainForSub(e.target.value)}
            >
              <option value="">Ana kategori seç</option>
              {mainCategories.map((x) => (
                <option key={x.Id} value={x.Id}>
                  {x.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Alt kategori adı"
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
            />
          </div>

          <div className="col-md-4 d-grid">
            <button className="btn btn-success" onClick={handleAddSubCategory}>
              Ekle
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AddSubCategoryForm;