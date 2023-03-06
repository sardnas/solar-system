import React, { Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { CameraOrbitController } from './CameraOrbitController';
import * as THREE from 'three';
import marsTexture from '../img/mars.jpg';
import moonTexture from '../img/moon.jpg';
import '../Styles/PlanetDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetOrbitsByPlanetName } from '../Api';
/*
          {planetData.map((planet) => (
            <Planet planet={planet} key={planet.id} />
          ))}
*/

export default function PlanetDetails() {
  const params = useParams();
  const [orbitData, setOrbitData] = useState(null);

  useEffect(() => {
    async function getOrbits() {
      await GetOrbitsByPlanetName(params.Name).then((res) =>
        res.json().then((json) => setOrbitData(json))
      );
    }
    getOrbits();
  }, []);

  console.log(orbitData);

  return (
    <>
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <Suspense fallback={null}>
          <MainPlanet />
          <Planet
            xRadius={40}
            zRadius={20}
            size={1}
            speed={0.5}
            offset={4}
            rotationSpeed={0.02}
            textureMap={moonTexture}
          />
          <Planet
            xRadius={60}
            zRadius={30}
            size={2}
            speed={0.3}
            offset={3}
            rotationSpeed={0.02}
            textureMap={moonTexture}
          />
          <Lights />
          <CameraOrbitController />
        </Suspense>
      </Canvas>
    </>
  );
}

function MainPlanet() {
  const texture = useLoader(THREE.TextureLoader, marsTexture);
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

const Planet = ({
  xRadius,
  zRadius,
  size,
  speed,
  offset,
  rotationSpeed,
  textureMap,
}) => {
  const planetRef = React.useRef();
  const texture = useLoader(THREE.TextureLoader, textureMap);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
};

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
}
