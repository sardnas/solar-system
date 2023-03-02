import { CameraOrbitController } from './CameraOrbitController';
import { Planet } from './Planet';
import { InfoBox } from './InfoBox';
import { Canvas } from '@react-three/fiber';

export const PlanetScene = ({ texture }) => {
    return (
        <>
            <Canvas>
                <CameraOrbitController />
                <ambientLight intensity={1} />
                <pointLight position={[2, 2, 2]} intensity={2} />
                <pointLight position={[-3, -3, 2]} />
                <Planet texture={texture} />
            </Canvas>
        </>
    );
}