import { Canvas } from '@react-three/fiber';
import './App.css';
import texture1 from './img/texture1.jpg';
import texture2 from './img/texture2.jpg';
import { CameraOrbitController } from './components/CameraOrbitController';
import { Planet } from './components/Planet';
import { InfoBox } from './components/InfoBox';
import { useState } from 'react';

const PlanetScene = ({ texture, planetData }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      {isOpen ? (
        <>
          <InfoBox />
          <div onClick={() => setIsOpen(!isOpen)}>
            <Canvas>
              <CameraOrbitController />
              <ambientLight intensity={1} />
              <pointLight position={[2, 2, 2]} intensity={2} />
              <pointLight position={[-3, -3, 2]} />
              <Planet texture={texture} />
            </Canvas>
          </div>
        </>
      ) : (
        <>
          <div onClick={() => setIsOpen(!isOpen)}>
            <Canvas>
              <CameraOrbitController />
              <ambientLight intensity={1} />
              <pointLight position={[2, 2, 2]} intensity={2} />
              <pointLight position={[-3, -3, 2]} />
              <Planet texture={texture} />
            </Canvas>
          </div>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <div>
      <PlanetScene texture={texture1} />;
      <PlanetScene texture={texture2} />;
    </div>
  );
}

export default App;
