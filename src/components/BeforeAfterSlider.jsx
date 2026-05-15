import { useRef, useEffect } from "react";
import "./BeforeAfter.css";

function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null);
  const topImageRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const topImg = topImageRef.current;
    const handle = handleRef.current;

    let dragging = false;

    const move = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;

      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percent = (x / rect.width) * 100;

      // 🔥 handle
      handle.style.left = percent + "%";

      // 🔥 ASIL OLAY (wipe)
      topImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    };

    const start = (e) => {
      dragging = true;
      move(e.clientX);
    };

    const stop = () => (dragging = false);

    const onMove = (e) => {
      if (!dragging) return;
      move(e.clientX);
    };

    container.addEventListener("mousedown", start);
    window.addEventListener("mouseup", stop);
    window.addEventListener("mousemove", onMove);

    return () => {
      container.removeEventListener("mousedown", start);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="ba-wipe">

      {/* ALT FOTO */}
      <img src={after} className="base" />

      {/* ÜST FOTO (KESİLEN) */}
      <img ref={topImageRef} src={before} className="top" />

      {/* HANDLE */}
      <div ref={handleRef} className="handle"></div>

    </div>
  );
}

export default BeforeAfterSlider;