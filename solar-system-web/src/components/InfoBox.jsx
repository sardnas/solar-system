import '../Styles/InfoBox.css';
import { Scrollbar } from 'react-scrollbars-custom';
import { useState } from 'react';

export const InfoBox = (data) => {
  const [active, setActive] = useState(false);
  const [activeSatellite, setActiveSatellite] = useState();
  const handleOnClick = (satellite) => {
    setActiveSatellite([
      satellite.name,
      satellite.gravity,
      satellite.mass,
      satellite.id,
    ]);
    if (!active) {
      setActive(true);
    }
  };
  return (
    <>
      <div className='outerBox'>
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          <h1>{data.planet.name}</h1>
          <p>Gravity: {data.planet.gravity}</p>
          <p>Density: {data.planet.density}</p>
          <p>Radius: {data.planet.meanRadius}</p>
          <p>Mass: {data.planet.massKg} kg</p>
          <p>Satellites: {data.satellites.length}</p>
          {data.satellites.map((element) => {
            return (
              <div className='cursor' onClick={() => handleOnClick(element)}>
                {element.name}
              </div>
            );
          })}
        </Scrollbar>
      </div>
      {active ? (
        <>
          <div onClick={() => setActive(!active)} className='satelliteBox'>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <h1>{activeSatellite[0]}</h1>
              <p>Mass: {activeSatellite[2]} kg</p>
              <p>Gravity: {activeSatellite[1]}</p>
            </Scrollbar>
          </div>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};
