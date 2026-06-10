"use client"

import { useEffect, useRef } from "react"
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three"

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
varying vec2 vUv;

float blob(vec2 p, vec2 c, float r) {
  return smoothstep(r, 0.0, length(p - c));
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.12;

  vec3 base  = vec3(0.965, 0.969, 0.976);
  vec3 slate = vec3(0.255, 0.353, 0.467);
  vec3 sky   = vec3(0.682, 0.733, 0.816);
  vec3 gold  = vec3(0.851, 0.816, 0.722);

  vec2 c1 = vec2(0.28 * aspect + 0.20 * sin(t * 0.9), 0.72 + 0.13 * cos(t * 0.7));
  vec2 c2 = vec2(0.74 * aspect + 0.22 * cos(t * 0.6 + 2.0), 0.62 + 0.16 * sin(t * 0.8 + 1.0));
  vec2 c3 = vec2(0.50 * aspect + 0.26 * sin(t * 0.5 + 4.0), 0.30 + 0.12 * cos(t * 0.9 + 3.0));

  vec3 col = base;
  col = mix(col, sky,   blob(p, c1, 0.58) * 0.60);
  col = mix(col, slate, blob(p, c2, 0.52) * 0.30);
  col = mix(col, gold,  blob(p, c3, 0.46) * 0.50);

  col = mix(col, base, smoothstep(0.78, 1.0, uv.y) * 0.65);
  col = mix(col, base, smoothstep(0.16, 0.0, uv.y) * 0.85);

  float n = fract(sin(dot(uv * uRes, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * 0.014;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export function HeroAurora({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: false })
    } catch {
      return
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const resolution = new Vector2(1, 1)
    const material = new ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: resolution },
      },
    })
    const mesh = new Mesh(new PlaneGeometry(2, 2), material)
    scene.add(mesh)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    const resize = () => {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight, false)
      resolution.set(clientWidth, clientHeight)
    }
    resize()

    const start = performance.now()
    let frameId = 0
    let visible = true

    const renderFrame = () => {
      material.uniforms.uTime.value = (performance.now() - start) / 1000
      renderer.render(scene, camera)
    }

    const loop = () => {
      renderFrame()
      frameId = requestAnimationFrame(loop)
    }

    if (reduceMotion) {
      material.uniforms.uTime.value = 18
      renderer.render(scene, camera)
    } else {
      frameId = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting
      if (nowVisible === visible) return
      visible = nowVisible
      if (reduceMotion) return
      cancelAnimationFrame(frameId)
      if (nowVisible) {
        frameId = requestAnimationFrame(loop)
      }
    })
    observer.observe(container)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      resizeObserver.disconnect()
      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        background:
          "radial-gradient(80% 60% at 30% 65%, rgba(174,187,208,0.45), transparent 70%), radial-gradient(70% 55% at 72% 55%, rgba(65,90,119,0.18), transparent 70%), radial-gradient(60% 50% at 50% 25%, rgba(217,208,184,0.4), transparent 70%), #f6f7f9",
      }}
    />
  )
}

export default HeroAurora
