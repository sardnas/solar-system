import { useRef } from 'react';
import '../Styles/InfoBox.css';

export const InfoBox = (data) => {
    return (
        <>
            <div className='outerBox'>
                <h1>{data.planet.name}</h1>
                <p>Gravity: {data.planet.gravity}</p>
                <p>Density: {data.planet.density}</p>
                <p>Radius: {data.planet.meanRadius}</p>
                <p>Mass: {data.planet.massKg} kg</p>
                <p>Satellites: _</p>
            </div>
        </>
    );
};
