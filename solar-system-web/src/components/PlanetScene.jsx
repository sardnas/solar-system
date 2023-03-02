import { CameraOrbitController } from './CameraOrbitController';
import { Planet } from './Planet';
import { InfoBox } from './InfoBox';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';

const PlanetScene = ({ texture, planetData }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {isOpen ? (
                <>
                    <InfoBox planet={[1, 2, 3]} />
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