import { Canvas } from '@react-three/fiber';
import './App.css';
import texture1 from './img/texture1.jpg';
import texture2 from './img/texture2.jpg';
import { CameraOrbitController } from './components/CameraOrbitController';
import { Planet } from './components/Planet';

function ThreeScene() {
  return (
    <Canvas>
      <CameraOrbitController />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <Planet texture={texture1} />
    </Canvas>
  );
}

function ThreeScene2() {
  return (
    <Canvas>
      <CameraOrbitController />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <Planet texture={texture2} />
    </Canvas>
  );
}

function App() {
  return (
    <div>
      <ThreeScene />;
      <ThreeScene2 />;
    </div>
  );
}

export default App;
