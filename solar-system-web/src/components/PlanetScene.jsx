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
import { FixedBody } from './FixedBody';

export const PlanetScene = ({ data }) => {
  const sun = new Object();
  sun.name = 'sun';

  data[0].texture = uranus;
  data[1].texture = uranus;
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

  data[5].position = [-2.5, 0, 0]; // mercury
  data[8].position = [-4, 0, 0]; // venus
  data[7].position = [-6, 0, 0]; // earth
  data[4].position = [-8, 0, 0]; //mars
  data[3].position = [-10.5, 0, 0]; // jupiter
  data[6].position = [-13, 0, 0]; //saturn
  data[0].position = [-15, 0, 0]; //uranus
  data[2].position = [-17, 0, 0]; //neptune
  data[1].position = [-19, 0, 0]; // pluto

  data[5].size = 0.9; // mercury
  data[8].size = 1.1; // venus
  data[7].size = 1.3; // earth
  data[4].size = 1.3; //mars
  data[3].size = 1.7; // jupiter
  data[6].size = 1.7; //saturn
  data[0].size = 1.5; //uranus
  data[2].size = 1.5; //neptune
  data[1].size = 0.9; // pluto

  data[5].xRadius = 10; // mercury
  data[8].xRadius = 15; // venus
  data[7].xRadius = 20; // earth
  data[4].xRadius = 25; //mars
  data[3].xRadius = 30; // jupiter
  data[6].xRadius = 35; //saturn
  data[0].xRadius = 40; //uranus
  data[2].xRadius = 45; //neptune
  data[1].xRadius = 50; // pluto

  data[5].zRadius = 5; // mercury
  data[8].zRadius = 10; // venus
  data[7].zRadius = 15; // earth
  data[4].zRadius = 20; //mars
  data[3].zRadius = 25; // jupiter
  data[6].zRadius = 30; //saturn
  data[0].zRadius = 35; //uranus
  data[2].zRadius = 40; //neptune
  data[1].zRadius = 45; // pluto

  data.splice(1, 1);

  return (
    <>
      <Canvas camera={{ position: [0, 55, 65], fov: 60 }}>
        <CameraOrbitController />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={4} />
        <FixedBody texture={venus} pos={[0, 0, 0]} size={2.2} />
        {data.map((element, i) => {
          return (
            <Planet
              key={i}
              texture={element.texture}
              pos={element.position}
              size={element.size}
              planet={element}
              speed={((Math.random() * (1 - 0.02) + 1) / element.zRadius) * 3}
              rotationSpeed={Math.random() * (0.03 - 0.01) + 0.03}
              xRadius={element.xRadius}
              zRadius={element.zRadius}
            />
          );
        })}
      </Canvas>
    </>
  );
};
