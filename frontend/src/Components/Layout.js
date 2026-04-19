function Layout({ children, activePage, setActivePage }) {
  return (
    <div className="d-flex">

      {/* SOL MENÜ */}
      <div className="bg-dark text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>

        <h5 className="mb-4">Admin</h5>

        <div
          className="mb-3"
          style={{
            cursor: "pointer",
            background: activePage === "upload" ? "#444" : "transparent",
            padding: "8px",
            borderRadius: "5px"
          }}
          onClick={() => setActivePage("upload")}
        >
          Grafik Foto
        </div>

        <div
          className="mb-3"
          style={{
            cursor: "pointer",
            background: activePage === "dekupe" ? "#444" : "transparent",
            padding: "8px",
            borderRadius: "5px"
          }}
          onClick={() => setActivePage("dekupe")}
        >
          Dekupe (Before/After)
        </div>

        <div
          className="mb-3"
          style={{
            cursor: "pointer",
            background: activePage === "subcategory" ? "#444" : "transparent",
            padding: "8px",
            borderRadius: "5px"
          }}
          onClick={() => setActivePage("subcategory")}
        >
          Alt Kategori
        </div>

      </div>

      {/* SAĞ CONTENT */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>

    </div>
  );
}

export default Layout;