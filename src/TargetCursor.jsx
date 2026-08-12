import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import "./TargetCursor.css";

const TargetCursor = ({
  targetSelector = "a, button, .heroCategoryCard, .creatorProjectPanel",
  cursorColor = "#d8dde2",
  cursorColorOnTarget = "#f6be25",
  spinDuration = 3.2,
}) => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const cornersRef = useRef([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || !cursorRef.current) return undefined;

    const cursor = cursorRef.current;
    const corners = cornersRef.current;
    let target = null;
    let spin;
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });
    spin = gsap.to(cursor, { rotation: 360, duration: spinDuration, ease: "none", repeat: -1 });

    const reset = () => {
      target = null;
      spin?.play();
      gsap.to([dotRef.current, ...corners], { color: cursorColor, duration: 0.18, overwrite: true });
      gsap.to(corners, {
        x: 0,
        y: 0,
        duration: 0.26,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const move = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const hover = (event) => {
      const next = event.target.closest(targetSelector);
      if (!next || next === target) return;
      target = next;
      spin?.pause();
      gsap.set(cursor, { rotation: 0 });
      const rect = next.getBoundingClientRect();
      const pad = 4;
      const points = [
        { x: rect.left - event.clientX - pad, y: rect.top - event.clientY - pad },
        { x: rect.right - event.clientX + pad - 12, y: rect.top - event.clientY - pad },
        { x: rect.right - event.clientX + pad - 12, y: rect.bottom - event.clientY + pad - 12 },
        { x: rect.left - event.clientX - pad, y: rect.bottom - event.clientY + pad - 12 },
      ];
      gsap.to([dotRef.current, ...corners], { color: cursorColorOnTarget, duration: 0.16, overwrite: true });
      corners.forEach((corner, index) => {
        gsap.to(corner, { ...points[index], duration: 0.24, ease: "power3.out", overwrite: true });
      });
      next.addEventListener("mouseleave", reset, { once: true });
    };

    const down = () => gsap.to(cursor, { scale: 0.82, duration: 0.16, overwrite: true });
    const up = () => gsap.to(cursor, { scale: 1, duration: 0.24, ease: "power2.out", overwrite: true });
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", hover, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      spin?.kill();
      document.body.style.cursor = previousCursor;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorColor, cursorColorOnTarget, spinDuration, targetSelector]);

  return createPortal(
    <div ref={cursorRef} className="targetCursor" aria-hidden="true">
      <i ref={dotRef} className="targetCursorDot" style={{ color: cursorColor }} />
      {["tl", "tr", "br", "bl"].map((position, index) => (
        <i
          key={position}
          ref={(element) => { cornersRef.current[index] = element; }}
          className={`targetCursorCorner targetCursorCorner--${position}`}
          style={{ color: cursorColor }}
        />
      ))}
    </div>,
    document.body,
  );
};

export default TargetCursor;
