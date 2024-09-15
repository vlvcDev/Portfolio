import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const useFrameRate = (callback, fps) => {
  const frame = useRef(0);
  const interval = 1 / fps;

  useFrame((state, delta) => {
    frame.current += delta;
    if (frame.current >= interval) {
      console.log('Frame update'); // Debug log
      callback(state, delta);
      frame.current = 0;
    }
  });
};

export default useFrameRate;