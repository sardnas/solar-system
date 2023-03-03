import { CameraOrbitController } from './CameraOrbitController';
import { Planet } from './Planet';
import { Canvas } from '@react-three/fiber';
import earth from '../img/earth.jpg';
import jupiter from '../img/jupiter.jpg';
import mars from '../img/mars.jpg';
import mercury from '../img/mercury.jpg';
import neptune from '../img/neptune.jpg';
import saturn from '../img/saturn.jpg';
import uranus from '../img/uranus.jpg';
import venus from '../img/venus.jpg';

import texture1 from '../img/texture1.jpg';

export const PlanetScene = ({ data }) => {
    console.log();
    data[0].texture = uranus;
    data[1].texture = texture1;
    data[2].texture = neptune;
    data[3].texture = jupiter;
    data[4].texture = mars;
    data[5].texture = mercury;
    data[6].texture = saturn;
    data[7].texture = earth;
    data[8].texture = venus;

    data[0].position = [2, 0, 0];
    data[1].position = [0, 0, 0];
    data[2].position = [-2, 0, 0];
    data[3].position = [-4, 0, 0];
    data[4].position = [-6, 0, 0];
    data[5].position = [-8, 0, 0];
    data[6].position = [-10, 0, 0];
    data[7].position = [-12, 0, 0];
    data[8].position = [-14, 0, 0];

    return (
        <>
            <Canvas>
                <CameraOrbitController />
                <ambientLight intensity={1} />
                <pointLight position={[2, 2, 2]} intensity={2} />
                <pointLight position={[-3, -3, 2]} />
                {data.map(element => { return <Planet texture={element.texture} pos={element.position} /> })}
            </Canvas>
        </>
    );
}