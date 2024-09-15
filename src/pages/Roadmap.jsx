import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    vec3 skyColor = mix(vec3(0.2, 0.4, 0.8), vec3(0.7, 0.9, 1.0), vUv.y);
    gl_FragColor = vec4(skyColor, 1.0);
  }
`;

const SkyShader = () => {
  return (
    <mesh scale={[100, 100, 100]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

const ZiplineScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Sky Shader as a full-screen quad */}
      <SkyShader />

      {/* Load and position the zipline model */}
      <ZiplineModel />

      {/* Camera following the curve */}
      <CameraAlongPath />
    </Canvas>
  );
};

const ZiplineModel = () => {
  // Load the GLB model from the public assets folder
  const { scene } = useGLTF('/zipline.glb');

  return <primitive object={scene} position={[0, 0, 0]} />;
};

const CameraAlongPath = () => {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  // Define a curved path for the camera to follow
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -2, 0),
    new THREE.Vector3(2, -2, -5),
    new THREE.Vector3(4, -2, -10),
    new THREE.Vector3(6, -2, -15),
    new THREE.Vector3(0, -2, -20),
  ]);

  let t = 0;
  
  useFrame(() => {
    t += 0.001; // Adjust the speed by modifying this value
    if (t > 1) t = 0; // Loop the animation

    const point = curve.getPointAt(t);
    cameraRef.current.position.set(point.x, point.y, point.z);

    const lookAtPoint = curve.getPointAt(Math.min(t + 0.01, 1));
    cameraRef.current.lookAt(lookAtPoint);
  });

  return null;
};

export default ZiplineScene;
