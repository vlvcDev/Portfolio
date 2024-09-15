import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FaAlignRight } from 'react-icons/fa';

const FluidShaderMesh = ({ color1, color2, color3 }) => {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_resolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <mesh>
      <planeGeometry args={[28, 8]} /> {/* The plane is now sized to fill the canvas */}
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          u_time: { value: 0 },
          u_resolution: {
            value: new THREE.Vector2(window.outerWidth, window.outerHeight),
          },
          u_color1: { value: new THREE.Color(color1) },
          u_color2: { value: new THREE.Color(color2) },
          u_color3: { value: new THREE.Color(color3) },
          u_swirlOffset: { value: new THREE.Vector2(10.0, 10.0) },
        }}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const FluidSimulation = () => {
  return (
    <div style={styles.container}>
      <Canvas style={styles.canvas}>
        <FluidShaderMesh
          color1="#59C9ff"
          color2="#452251"
          color3="#5611ff"
        />
      </Canvas>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '92vw',  // Make the container smaller, 80% of the viewport width
    height: '50vh', // Make the container smaller, 60% of the viewport height
    backgroundColor: 'transparent', // Black background for the container
    borderRadius: '20px', // Apply rounded corners to the container
    position: 'fixed', // Position relative to allow absolute positioning within
    overflow: 'hidden', // Ensure that content doesn't overflow the rounded corners
    top: '3%'
  },
  canvas: {
    width: '100%',
    height: '100%',
    borderRadius: '20px', // Apply rounded corners to match the container
    backgroundColor: 'transparent', // Transparent background for the canvas
  },
};

export default FluidSimulation;


const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;

  // Editable colors
  uniform vec3 u_color1; // First color (e.g., purple)
  uniform vec3 u_color2; // Second color (e.g., green)
  uniform vec3 u_color3; // Third color (e.g., blue)

  uniform vec2 u_swirlOffset; // Swirl offset for distortion

  // Simplex noise function for grain
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float grainNoise(vec2 uv, float scale, float time) {
      // Reset time periodically to prevent patterns
      float modTime = mod(time, 100.0); // Reset every 100 seconds
      float x = uv.x * scale + modTime;
      float y = uv.y * scale + modTime;
      return random(vec2(x, y));
  }

  // Fractal Brownian Motion (FBM) for generating smooth noise
  float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.3;
      for (int i = 0; i < 4; i++) {
          value += amplitude * sin(p.x + u_time * 0.2) * cos(p.y + u_time * 0.3);
          p *= 1.6;
          amplitude *= 0.64;
      }
      return value;
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;

      // Adjust UV coordinates for animation and fluid effect
      vec2 p = uv * 4.0 - vec2(2.0);
      p.x += sin(u_time * 0.1) * 0.1;
      p.y += cos(u_time * 0.3) * 0.2;

      // Apply the swirl offset
      p -= u_swirlOffset;

      // Create a swirling distortion
      float theta = fbm(p + u_time * 0.1);
      float r = length(p);
      p.x = r * cos(theta);
      p.y = r * sin(theta);

      // Add the swirl offset back
      p += u_swirlOffset;

      // Generate the fluid pattern with FBM
      float n = fbm(p * 1.0 + u_time * 0.1);
      float n2 = fbm(p * 2.0 - u_time * 0.05);

      // Combine the FBM noise for swirling effects
      float mixed = mix(n, n2, 0.4);

      // Apply color based on the noise value using the editable colors
      vec3 color = mix(u_color1, u_color2, mixed);
      color = mix(color, u_color3, mixed);

      // Add more noticeable film grain effect
      float grainScale = 100.0; // Larger scale for bigger grains
      float grainIntensity = 0.6; // Increase the intensity of the grain
      float grain = grainNoise(uv, grainScale, u_time) * grainIntensity;

      // Combine color with grain
      color += grain * vec3(0.2); // Apply grain with more intensity

      // Final color output
      gl_FragColor = vec4(color, 1.0);
  }
`;

