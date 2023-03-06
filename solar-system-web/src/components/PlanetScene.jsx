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
import { FixedBody } from './FixedBody';

export const PlanetScene = ({ data }) => {
  const sun = new Object();
  sun.name = 'sun';

  data[0].texture = uranus;
  data[1].texture = texture1;
  data[2].texture = neptune;
  data[3].texture = jupiter;
  data[4].texture = mars;
  data[5].texture = mercury;
  data[6].texture = saturn;
  data[7].texture = earth;
  data[8].texture = venus;

  data[5].position = [-2.5, 0, 0]; // mercury
  data[8].position = [-4, 0, 0]; // venus
  data[7].position = [-6, 0, 0]; // earth
  data[4].position = [-8, 0, 0]; //mars
  data[3].position = [-10.5, 0, 0]; // jupiter
  data[6].position = [-13, 0, 0]; //saturn
  data[0].position = [-15, 0, 0]; //uranus
  data[2].position = [-17, 0, 0]; //neptune
  data[1].position = [-19, 0, 0]; // pluto

  data[5].size = 0.2; // mercury
  data[8].size = 0.3; // venus
  data[7].size = 0.5; // earth
  data[4].size = 0.6; //mars
  data[3].size = 1; // jupiter
  data[6].size = 0.9; //saturn
  data[0].size = 0.7; //uranus
  data[2].size = 0.7; //neptune
  data[1].size = 0.2; // pluto

  return (
    <>
      <Canvas>
        <CameraOrbitController />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={4} />
        <FixedBody texture={venus} pos={[0, 0, 0]} size={1.2} />
        {data.map((element) => {
          return (
            <Planet
              texture={element.texture}
              pos={element.position}
              size={element.size}
              planet={element}
            />
          );
        })}
      </Canvas>
    </>
  );
};
