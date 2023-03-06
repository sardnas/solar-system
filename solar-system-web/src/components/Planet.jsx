import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { FlyControls, Html } from '@react-three/drei';
import '../Styles/Planet.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import texture2 from '../img/sun.jpg';
import * as THREE from 'three';

//Color needs to be update preferably with increased opacity
function PlaneColor(key) {
  var dictionary = {
    Mercury: '#393e46',
    Venus: '#ba6f13',
    Earth: '#2b75e3',
    Mars: '#b34100',
    Jupiter: '#fabc98',
    Saturn: '#393e46',
    Uranus: '#8ad4ff',
    Neptune: '#0077ff',
  };
  return dictionary[key];
}

function EclipticPlane({ xRadius = 1, zRadius = 1, color }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach='material' color={color} linewidth={10} />
    </line>
  );
}

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
  const EclipticPlaneColor = PlaneColor(planet.name);

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
      <EclipticPlane
        color={EclipticPlaneColor}
        xRadius={xRadius}
        zRadius={zRadius}
      />
    </>
  );
};
