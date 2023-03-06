import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { FlyControls, Html } from '@react-three/drei';
import '../Styles/Planet.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import texture2 from '../img/sun.jpg';

export const Planet = ({
  texture,
  pos,
  size,
  planet,
  speed,
  rotationSpeed,
  xRadius,
  zRadius,
  offset,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const mesh = useRef();
  const colorMap = useLoader(TextureLoader, texture);
  const colorMapHover = useLoader(TextureLoader, texture2);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  cookies.set(`${planet.name}Info`, planet, {
    path: '/',
    sameSite: 'none',
    secure: true,
  });

  const handleClick = () => navigate(`/planet/${planet.name}`);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    mesh.current.position.x = x;
    mesh.current.position.z = z;
    mesh.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      {hovered ? (
        <>
          <mesh
            position={[mesh.current.position.x, 0, mesh.current.position.z]}>
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
