import { useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars = {};

  for (let index = 0; index < opacities.length; index += 1) {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(
      opacities[index] * intensity,
      100,
    )}%)`;
  }

  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};

  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    vars[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value) {
  return value * value * value;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const startedAt = performance.now() + delay;

  function tick() {
    const elapsed = performance.now() - startedAt;
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(progress));

    if (progress < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }

  window.setTimeout(() => requestAnimationFrame(tick), delay);
}

const BorderGlow = ({
  as: Tag = "div",
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
  style,
  ...rest
}) => {
  const cardRef = useRef(null);
  const pointerFrameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  const getCenterOfElement = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const ratioX = deltaX === 0 ? Infinity : centerX / Math.abs(deltaX);
      const ratioY = deltaY === 0 ? Infinity : centerY / Math.abs(deltaY);

      return Math.min(Math.max(1 / Math.min(ratioX, ratioY), 0), 1);
    },
    [getCenterOfElement],
  );

  const getCursorAngle = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      if (deltaX === 0 && deltaY === 0) return 0;

      let degrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement],
  );

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (pointerFrameRef.current) return;
      pointerFrameRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = pointerRef.current.x - rect.left;
        const y = pointerRef.current.y - rect.top;
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.classList.add("is-glow-active");
        card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
        card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
        pointerFrameRef.current = 0;
      });
    },
    [getCursorAngle, getEdgeProximity],
  );

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = 0;
    cardRef.current?.classList.remove("is-glow-active");
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;

    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: (value) => card.style.setProperty("--edge-proximity", value) });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (value) => {
        card.style.setProperty("--cursor-angle", `${((angleEnd - angleStart) * value) / 100 + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (value) => {
        card.style.setProperty("--cursor-angle", `${((angleEnd - angleStart) * value) / 100 + angleStart}deg`);
      },
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty("--edge-proximity", value),
      onEnd: () => card.classList.remove("sweep-active"),
    });

    return undefined;
  }, [animated]);

  const normalizedRadius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;

  return (
    <Tag
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`.trim()}
      style={{
        "--card-bg": backgroundColor,
        "--edge-sensitivity": edgeSensitivity,
        "--border-radius": normalizedRadius,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": coneSpread,
        "--fill-opacity": fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
        ...style,
      }}
      {...rest}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </Tag>
  );
};

export default BorderGlow;
