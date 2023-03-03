import { useFrame, useLoader } from '@react-three/fiber';
import React, { useRef } from 'react'
import { TextureLoader } from 'three';

export const FixedBody = ({ texture, pos, size }) => {
    const mesh = useRef();
    const colorMap = useLoader(TextureLoader, texture);

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        mesh.current.rotation.x = a / 5;
        mesh.current.rotation.y = a / 6;
    });

    return (
        <mesh position={pos} ref={mesh} >
            <sphereGeometry args={[size]} />
            <meshStandardMaterial map={colorMap} />
        </mesh>
    );
};
