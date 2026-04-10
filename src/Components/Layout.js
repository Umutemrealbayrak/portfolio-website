function Layout({ children, activePage, setActivePage }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* 🔥 SIDEBAR */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="mb-4">Admin</h4>

        <button
          className={`btn w-100 mb-2 ${
            activePage === "upload"
              ? "btn-light text-dark"
              : "btn-outline-light"
          }`}
          onClick={() => setActivePage("upload")}
        >
          Fotoğraf Ekle
        </button>

        <button
          className={`btn w-100 ${
            activePage === "subcategory"
              ? "btn-light text-dark"
              : "btn-outline-light"
          }`}
          onClick={() => setActivePage("subcategory")}
        >
          Alt Kategori Ekle
        </button>
      </div>

      {/* 🔥 CONTENT */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>

    </div>
  );
}

export default Layout;