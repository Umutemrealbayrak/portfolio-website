import { useEffect, useRef } from "react";
import "./beforeafter.css";

function BeforeAfterSlider({ before, after }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const handle = container.querySelector(".handle");
    const resize = container.querySelector(".resize");

    let isDragging = false;

    const startDrag = () => {
      isDragging = true;
    };

    const stopDrag = () => {
      isDragging = false;
    };

    const onMove = (e) => {
      if (!isDragging) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;

      let percent = (x / rect.width) * 100;

      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;

      handle.style.left = percent + "%";
      resize.style.width = percent + "%";
    };

    handle.addEventListener("mousedown", startDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mousemove", onMove);

    return () => {
      handle.removeEventListener("mousedown", startDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="ba-slider" ref={containerRef}>
      <img src={after} alt="after" />

      <div className="resize">
        <img src={before} alt="before" />
      </div>

      <span className="handle"></span>
    </div>
  );
}

export default BeforeAfterSlider;