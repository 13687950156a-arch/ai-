import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./SideRays.css";

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [
        Number.parseInt(match[1], 16) / 255,
        Number.parseInt(match[2], 16) / 255,
        Number.parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const originToFlip = (origin) => {
  switch (origin) {
    case "top-left":
      return [1, 0];
    case "bottom-right":
      return [0, 1];
    case "bottom-left":
      return [1, 1];
    default:
      return [0, 0];
  }
};

const SideRays = ({
  speed = 1,
  rayColor1 = "#f6be25",
  rayColor2 = "#e7d6a2",
  intensity = 1,
  spread = 1,
  origin = "top-right",
  tilt = 0,
  saturation = 1,
  blend = 0.5,
  falloff = 2,
  opacity = 1,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!isVisible || !container) return undefined;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    let frameId = 0;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.replaceChildren(canvas);

    const vertex = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragment = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform float iSpeed;
      uniform vec3 iRayColor1;
      uniform vec3 iRayColor2;
      uniform float iIntensity;
      uniform float iSpread;
      uniform float iFlipX;
      uniform float iFlipY;
      uniform float iTilt;
      uniform float iSaturation;
      uniform float iBlend;
      uniform float iFalloff;
      uniform float iOpacity;

      float rayStrength(vec2 source, vec2 direction, vec2 coordinate, float seedA, float seedB, float velocity) {
        vec2 fromSource = coordinate - source;
        float cosine = dot(normalize(fromSource), direction);
        float shimmer = clamp(
          (0.45 + 0.15 * sin(cosine * seedA + iTime * velocity)) +
          (0.3 + 0.2 * cos(-cosine * seedB + iTime * velocity)),
          0.0,
          1.0
        );
        return shimmer * clamp((iResolution.x - length(fromSource)) / iResolution.x, 0.5, 1.0);
      }

      void main() {
        vec2 fragmentCoordinate = gl_FragCoord.xy;
        if (iFlipX > 0.5) fragmentCoordinate.x = iResolution.x - fragmentCoordinate.x;
        if (iFlipY > 0.5) fragmentCoordinate.y = iResolution.y - fragmentCoordinate.y;

        vec2 coordinate = vec2(fragmentCoordinate.x, iResolution.y - fragmentCoordinate.y);
        vec2 source = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);
        float radians = iTilt * 3.14159265 / 180.0;
        float cosine = cos(radians);
        float sine = sin(radians);
        vec2 relative = coordinate - source;
        vec2 tiltedCoordinate = vec2(
          relative.x * cosine - relative.y * sine,
          relative.x * sine + relative.y * cosine
        ) + source;

        float halfSpread = iSpread * 0.275;
        vec2 direction1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
        vec2 direction2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));
        vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(source, direction1, tiltedCoordinate, 36.2214, 21.11349, iSpeed);
        vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(source, direction2, tiltedCoordinate, 22.3991, 18.0234, iSpeed * 0.2);
        vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

        float distanceToLight = length(fragmentCoordinate.xy - vec2(source.x, iResolution.y - source.y)) / iResolution.y;
        float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
        color.rgb *= brightness;
        float grayscale = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(vec3(grayscale), color.rgb, iSaturation);
        color.a = max(color.r, max(color.g, color.b)) * iOpacity;
        gl_FragColor = color;
      }
    `;

    const [flipX, flipY] = originToFlip(origin);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      iSpeed: { value: speed },
      iRayColor1: { value: hexToRgb(rayColor1) },
      iRayColor2: { value: hexToRgb(rayColor2) },
      iIntensity: { value: intensity },
      iSpread: { value: spread },
      iFlipX: { value: flipX },
      iFlipY: { value: flipY },
      iTilt: { value: tilt },
      iSaturation: { value: saturation },
      iBlend: { value: blend },
      iFalloff: { value: falloff },
      iOpacity: { value: opacity },
    };
    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex, fragment, uniforms }),
    });

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      renderer.setSize(width, height);
      uniforms.iResolution.value = [width * renderer.dpr, height * renderer.dpr];
    };
    const render = (time) => {
      if (document.hidden) {
        frameId = requestAnimationFrame(render);
        return;
      }
      uniforms.iTime.value = time * 0.001;
      renderer.render({ scene: mesh });
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      const loseContext = gl.getExtension("WEBGL_lose_context");
      loseContext?.loseContext();
      canvas.remove();
    };
  }, [blend, falloff, intensity, isVisible, opacity, origin, rayColor1, rayColor2, saturation, speed, spread, tilt]);

  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} aria-hidden="true" />;
};

export default SideRays;
