function ImageGallery({ images, handleDelete }) {
  return (
    <div className="row g-4">
      {images.map((img) => (
        <div className="col-md-3" key={img.id}>
          <div className="card border-0 shadow-sm h-100">

            <img
              src={`https://localhost:7148${img.filePath}`}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover"
              }}
            />

            <div className="card-body text-center">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(img.id)}
              >
                Sil
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;