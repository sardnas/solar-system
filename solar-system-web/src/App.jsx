import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import './App.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import bg from './img/texture1.jpg';

const CameraOrbitController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

function Box() {
  const boxRef = useRef();
  const colorMap = useLoader(TextureLoader, bg);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    boxRef.current.rotation.x = a;
    boxRef.current.rotation.y = a;
  });

  return (
    <mesh ref={boxRef} onClick={() => console.log('clicked sphere')}>
      <sphereGeometry args={[2]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <Canvas>
      <CameraOrbitController />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <Box />
    </Canvas>
  );
}

function App() {
  return <ThreeScene />;
}

export default App;
