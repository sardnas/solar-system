import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { TextureLoader } from 'three';
import texture2 from '../img/texture2.jpg';

export const Planet = ({ texture, pos, size, planet }) => {
  const mesh = useRef();
  const colorMap = useLoader(TextureLoader, texture);
  const colorMapHover = useLoader(TextureLoader, texture2);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    mesh.current.rotation.x = a;
    mesh.current.rotation.y = a;
  });

  const navigate = () => {
    //document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' });
    //console.log(document.getElementById('1'));
  }
  return (
    <mesh position={pos} ref={mesh} onClick={navigate} onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[size]} />
      <meshStandardMaterial map={hovered ? colorMapHover : colorMap} />
    </mesh>
  );
};
