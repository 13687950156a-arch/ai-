import "./BorderGlow.css";

const BorderGlow = ({
  children,
  className = "",
  backgroundColor = "#05090b",
  borderRadius = 28,
  colors = ["#91d4c8", "#4ca1ce", "#f3f0e8"],
}) => (
  <div
    className={`border-glow-card ${className}`}
    style={{
      "--card-bg": backgroundColor,
      "--border-radius": `${borderRadius}px`,
      "--gradient-one": `radial-gradient(at 80% 55%, ${colors[0]} 0px, transparent 50%)`,
      "--gradient-two": `radial-gradient(at 22% 18%, ${colors[1]} 0px, transparent 50%)`,
      "--gradient-three": `radial-gradient(at 52% 4%, ${colors[2]} 0px, transparent 50%)`,
    }}
  >
    <span className="edge-light" />
    <div className="border-glow-inner">{children}</div>
  </div>
);

export default BorderGlow;
