import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { FlyControls, Html } from '@react-three/drei';
import '../Styles/Planet.css';
import { useNavigate } from 'react-router-dom';
import texture2 from '../img/sun.jpg';

export const Planet = ({ texture, pos, size, planet }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/planet/${planet.name}`);
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

  const navigateClick = () => {
    //`/planet/${planet.name}`
    //document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' });
    //console.log(document.getElementById('1'));
  };
  return (
    <>
      {hovered ? (
        <>
          <mesh position={[pos[0], pos[1] + 2, pos[2]]}>
            <Html>
              <div className='label'>{planet.name}</div>
            </Html>
          </mesh>
        </>
      ) : (
        <></>
      )}
      <mesh
        position={pos}
        ref={mesh}
        onClick={handleClick}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[size]} />
        <meshStandardMaterial map={hovered ? colorMapHover : colorMap} />
      </mesh>
    </>
  );
};
