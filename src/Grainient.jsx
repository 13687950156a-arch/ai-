import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./Grainient.css";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

vec2 hash(vec2 point) {
  point = vec2(dot(point, vec2(2127.1, 81.17)), dot(point, vec2(1269.5, 283.37)));
  return fract(sin(point) * 43758.5453);
}

float noise(vec2 point) {
  vec2 integer = floor(point);
  vec2 fraction = fract(point);
  vec2 curve = fraction * fraction * (3.0 - 2.0 * fraction);

  float lower = mix(
    dot(-1.0 + 2.0 * hash(integer + vec2(0.0, 0.0)), fraction - vec2(0.0, 0.0)),
    dot(-1.0 + 2.0 * hash(integer + vec2(1.0, 0.0)), fraction - vec2(1.0, 0.0)),
    curve.x
  );
  float upper = mix(
    dot(-1.0 + 2.0 * hash(integer + vec2(0.0, 1.0)), fraction - vec2(0.0, 1.0)),
    dot(-1.0 + 2.0 * hash(integer + vec2(1.0, 1.0)), fraction - vec2(1.0, 1.0)),
    curve.x
  );

  return 0.5 + 0.5 * mix(lower, upper, curve.y);
}

void mainImage(out vec4 outputColor, vec2 coordinate) {
  float time = iTime * uTimeSpeed;
  vec2 uv = coordinate / iResolution.xy;
  float ratio = iResolution.x / iResolution.y;
  vec2 transformedUv = uv - 0.5 + uCenterOffset;
  transformedUv /= max(uZoom, 0.001);

  float degree = noise(vec2(time * 0.1, transformedUv.x * transformedUv.y) * uNoiseScale);
  transformedUv.y *= 1.0 / ratio;
  transformedUv *= Rot(radians((degree - 0.5) * uRotationAmount + 180.0));
  transformedUv.y *= ratio;

  float frequency = uWarpFrequency;
  float warpStrength = max(uWarpStrength, 0.001);
  float amplitude = uWarpAmplitude / warpStrength;
  float warpTime = time * uWarpSpeed;
  transformedUv.x += sin(transformedUv.y * frequency + warpTime) / amplitude;
  transformedUv.y += sin(transformedUv.x * (frequency * 1.5) + warpTime) / (amplitude * 0.5);

  float balance = uColorBalance;
  float softness = max(uBlendSoftness, 0.0);
  mat2 blendRotation = Rot(radians(uBlendAngle));
  float blendX = (transformedUv * blendRotation).x;
  float edge0 = -0.3 - balance - softness;
  float edge1 = 0.2 - balance + softness;
  float vertical0 = 0.5 - balance + softness;
  float vertical1 = -0.3 - balance - softness;
  vec3 layer1 = mix(uColor3, uColor2, S(edge0, edge1, blendX));
  vec3 layer2 = mix(uColor2, uColor1, S(edge0, edge1, blendX));
  vec3 color = mix(layer1, layer2, S(vertical0, vertical1, transformedUv.y));

  vec2 grainUv = uv * max(uGrainScale, 0.001);
  if (uGrainAnimated > 0.5) grainUv += vec2(iTime * 0.05);
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * uGrainAmount;

  color = (color - 0.5) * uContrast + 0.5;
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(luma), color, uSaturation);
  color = pow(max(color, 0.0), vec3(1.0 / max(uGamma, 0.001)));
  outputColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}

void main() {
  vec4 outputColor = vec4(0.0);
  mainImage(outputColor, gl_FragCoord.xy);
  fragColor = outputColor;
}
`;

const contexts = new WeakMap();

const Grainient = ({
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = "#FF9FFC",
  color2 = "#5227FF",
  color3 = "#B497CF",
  className = "",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return undefined;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: 0.25 },
        uColorBalance: { value: 0 },
        uWarpStrength: { value: 1 },
        uWarpFrequency: { value: 5 },
        uWarpSpeed: { value: 2 },
        uWarpAmplitude: { value: 50 },
        uBlendAngle: { value: 0 },
        uBlendSoftness: { value: 0.05 },
        uRotationAmount: { value: 500 },
        uNoiseScale: { value: 2 },
        uGrainAmount: { value: 0.1 },
        uGrainScale: { value: 2 },
        uGrainAnimated: { value: 0 },
        uContrast: { value: 1.5 },
        uGamma: { value: 1 },
        uSaturation: { value: 1 },
        uCenterOffset: { value: new Float32Array([0, 0]) },
        uZoom: { value: 0.9 },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    contexts.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const resolution = program.uniforms.iResolution.value;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    let animationFrame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();

    const loop = (now) => {
      program.uniforms.iTime.value = (now - startedAt) * 0.001;
      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!reduceMotion && visible && pageVisible && animationFrame === 0) {
        animationFrame = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      contexts.delete(container);
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const context = container && contexts.get(container);
    if (!context) return;

    const uniforms = context.program.uniforms;
    uniforms.uTimeSpeed.value = timeSpeed;
    uniforms.uColorBalance.value = colorBalance;
    uniforms.uWarpStrength.value = warpStrength;
    uniforms.uWarpFrequency.value = warpFrequency;
    uniforms.uWarpSpeed.value = warpSpeed;
    uniforms.uWarpAmplitude.value = warpAmplitude;
    uniforms.uBlendAngle.value = blendAngle;
    uniforms.uBlendSoftness.value = blendSoftness;
    uniforms.uRotationAmount.value = rotationAmount;
    uniforms.uNoiseScale.value = noiseScale;
    uniforms.uGrainAmount.value = grainAmount;
    uniforms.uGrainScale.value = grainScale;
    uniforms.uGrainAnimated.value = grainAnimated ? 1 : 0;
    uniforms.uContrast.value = contrast;
    uniforms.uGamma.value = gamma;
    uniforms.uSaturation.value = saturation;
    uniforms.uCenterOffset.value = new Float32Array([centerX, centerY]);
    uniforms.uZoom.value = zoom;
    uniforms.uColor1.value = new Float32Array(hexToRgb(color1));
    uniforms.uColor2.value = new Float32Array(hexToRgb(color2));
    uniforms.uColor3.value = new Float32Array(hexToRgb(color3));
  }, [
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3,
  ]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />;
};

export default Grainient;
