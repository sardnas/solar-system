import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader } from 'three';

export const Planet = ({ texture, pos }) => {
  const boxRef = useRef();
  const colorMap = useLoader(TextureLoader, texture);
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    boxRef.current.rotation.x = a;
    boxRef.current.rotation.y = a;
  });

  return (
    <mesh position={pos} ref={boxRef} onClick={() => console.log('clicked sphere')}>
      <sphereGeometry args={[0.7]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
};
