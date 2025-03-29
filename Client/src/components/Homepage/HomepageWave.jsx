import React, { useRef, useEffect, memo } from "react";
import * as THREE from "three";

const WaterWaves = () => {
  const mountRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const materialRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const geometryRef = useRef();

  useEffect(() => {
    console.log("WaterWaves component mounted");

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 1, 4);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Check if mountRef exists and is mounted in DOM
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
      console.log("Renderer added to DOM");
    } else {
      console.error("Mount ref is not available");
      return;
    }

    // Adjusted Plane Geometry
    const geometry = new THREE.PlaneGeometry(18, 3, 150, 80);
    geometryRef.current = geometry;
    geometry.rotateX(-Math.PI / 2);

    // Shader Material with Wider Waves
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vHeight;
        varying float vXPosition;
        uniform float time;

        float wave(float x, float z, float t) {
          float speed = 0.4;
          float height = 0.2;
          float frequency = 1.2; // Reduced for wider waves
          float w1 = sin(x * frequency + t * speed) * height; 
          float w2 = cos(z * (frequency * 0.9) + t * speed * 1.1) * height * 0.85;
          return w1 + w2;
        }

        void main() {
          vUv = uv;
          vXPosition = position.x; // Pass x position to fragment shader
          vec3 pos = position;
          float height = wave(pos.x, pos.z, time);
          pos.y += height;
          vHeight = height;

          float epsilon = 0.02;
          float nx1 = wave(pos.x + epsilon, pos.z, time);
          float nx2 = wave(pos.x - epsilon, pos.z, time);
          float nz1 = wave(pos.x, pos.z + epsilon, time);
          float nz2 = wave(pos.x, pos.z - epsilon, time);

          vNormal = normalize(vec3(nx2 - nx1, 2.0 * epsilon, nz2 - nz1));

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vHeight;
        varying float vXPosition; // Receive x position from vertex shader
        uniform float time;

        void main() {
          // Original blue colors from your code
          vec3 mainBlue = vec3(0.16, 0.35, 1.0);
          vec3 darkBlue = vec3(0.12, 0.27, 0.8);
          vec3 lightBlue = vec3(0.29, 0.47, 1.0);
          vec3 whiteShine = vec3(0.69, 0.78, 1.0);
          vec3 deepShadow = vec3(0.05, 0.12, 0.4);
          
          // Purple colors from my previous response
          vec3 mainPurple = vec3(0.7, 0.5, 0.9);
          vec3 darkPurple = vec3(0.5, 0.3, 0.7);
          vec3 lightPurple = vec3(0.8, 0.6, 1.0);
          vec3 whitePurple = vec3(0.9, 0.8, 1.0);
          vec3 deepPurple = vec3(0.3, 0.1, 0.4);

          // Create gradient based on x position (using the varying from vertex shader)
          float gradientFactor = smoothstep(-9.0, 9.0, vXPosition);
          
          // Mix between blue and purple color sets based on position
          vec3 mainColor = mix(mainBlue, mainPurple, gradientFactor);
          vec3 darkColor = mix(darkBlue, darkPurple, gradientFactor);
          vec3 lightColor = mix(lightBlue, lightPurple, gradientFactor);
          vec3 shineColor = mix(whiteShine, whitePurple, gradientFactor);
          vec3 shadowColor = mix(deepShadow, deepPurple, gradientFactor);

          vec3 lightDir = normalize(vec3(1.0, 1.0, 0.5));
          float diffuse = max(0.0, dot(vNormal, lightDir));
          float specular = pow(max(0.0, dot(reflect(-lightDir, vNormal), vec3(0.0, 0.0, 1.0))), 64.0) * 0.5;
          float fresnel = 1.0 - pow(1.0 - vUv.y, 2.5);

          float shadowIntensity = smoothstep(0.0, -0.05, vHeight);
          vec3 color = mix(mainColor, shadowColor, shadowIntensity);
          color = mix(color, darkColor, fresnel * 1.1);
          color = mix(color, lightColor, diffuse * 0.7);
          color = mix(color, shineColor, specular * 0.6);

          gl_FragColor = vec4(color, 0.9); // Added slight transparency
        }
      `,
      uniforms: {
        time: { value: 0.0 },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });
    materialRef.current = material;

    // Create Water Mesh
    const water = new THREE.Mesh(geometry, material);
    water.position.y = 1.7;
    water.scale.z = 1;
    scene.add(water);

    // Lighting - combined lighting for both color schemes
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Blended backlight that works for both blue and purple
    const backLight = new THREE.DirectionalLight(0xd8c8ff, 0.5);
    backLight.position.set(-5, 3, -5);
    scene.add(backLight);

    scene.add(new THREE.AmbientLight(0xaaaaaa, 1.0));

    // Animation Loop
    const animate = (time) => {
      // Store the animation frame ID for cleanup
      requestRef.current = requestAnimationFrame(animate);

      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Use smaller constant increment to ensure stable animation
        if (materialRef.current) {
          materialRef.current.uniforms.time.value += 0.04;
        }
      }

      previousTimeRef.current = time;

      // Only render if we still have all the necessary components
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    console.log("Animation started with frame ID:", requestRef.current);

    // Responsive Resize Handler
    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      console.log("Component unmounting, cleaning up");

      window.removeEventListener("resize", handleResize);

      if (requestRef.current) {
        console.log("Cancelling animation frame:", requestRef.current);
        cancelAnimationFrame(requestRef.current);
      }

      if (
        mountRef.current &&
        rendererRef.current &&
        mountRef.current.contains(rendererRef.current.domElement)
      ) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      // Dispose resources
      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="absolute z-10 pointer-events-none">
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          overflow: "hidden",
          background: "transparent", // Fixed typo in "transparent"
          position: "relative",
          zIndex: 0,
        }}
      />
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(WaterWaves);
