import React, { Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { CameraOrbitController } from './CameraOrbitController';
import * as THREE from 'three';
import moonTexture from '../img/moon.jpg';
import moonTexture1 from '../img/moonRed.jpg';
import moonTexture2 from '../img/moonBlue.jpg';
import marsTexture from '../img/mars.jpg';
import '../Styles/PlanetDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetOrbitsByPlanetName } from '../Api';
import { OrbitFactory } from '../utils/OrbitDataFactory';
import { textures as PlanetTextures } from '../utils/Textures';
import { Html } from '@react-three/drei';
import { AiOutlineHome } from 'react-icons/ai';
import Cookies from 'universal-cookie';
import { InfoBox } from './InfoBox';

export default function PlanetDetails() {
  const cookies = new Cookies();
  const moonText = [moonTexture, moonTexture1, moonTexture2];
  const params = useParams();
  const navigate = useNavigate();
  const backToHome = () => navigate('/');
  const [orbitData, setOrbitData] = useState(null);
  const [planetData, setPlanetData] = useState([]);
  const planetName = params.Name;

  const mainPlanetData = cookies.get(`${planetName}Info`);

  useEffect(() => {
    async function getOrbits() {
      await GetOrbitsByPlanetName(planetName).then((res) =>
        res.json().then((json) => {
          setOrbitData(json);
          setPlanetData(OrbitFactory(json));
        })
      );
    }
    getOrbits();
  }, []);

  return (
    <>
      <AiOutlineHome className='home-btn' onClick={backToHome} />
      <InfoBox planet={mainPlanetData} satellites={planetData}></InfoBox>
      <Canvas camera={{ position: [0, 60, 80], fov: 80 }}>
        <Suspense fallback={null}>
          <MainPlanet
            planetTexture={
              PlanetTextures.filter(
                (PlanetTextures) => PlanetTextures.name === planetName
              )[0].img
            }
          />
          {planetData.map((p) => (
            <Planet
              key={p.id}
              xRadius={p.xRadius}
              zRadius={p.zRadius}
              size={p.size}
              speed={p.speed / 3}
              offset={p.offset}
              rotationSpeed={p.rotationSpeed}
              textureMap={moonText[Math.round(Math.random() * 2)]}
              name={p.name}
            />
          ))}
          <Lights />
          <CameraOrbitController />
        </Suspense>
      </Canvas>
    </>
  );
}

function MainPlanet({ planetTexture }) {
  const texture = useLoader(THREE.TextureLoader, planetTexture);
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
  name,
}) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const planetRef = React.useRef();
  const texture = useLoader(THREE.TextureLoader, textureMap);
  const hoveredTexture = useLoader(THREE.TextureLoader, marsTexture);
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
      {hovered ? (
        <>
          <mesh
            position={[
              planetRef.current.position.x,
              0,
              planetRef.current.position.z,
            ]}>
            <Html>
              <div className='label'>{name}</div>
            </Html>
          </mesh>
        </>
      ) : (
        <> </>
      )}
      <mesh
        ref={planetRef}
        onClick={() => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={hovered ? hoveredTexture : texture} />
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
