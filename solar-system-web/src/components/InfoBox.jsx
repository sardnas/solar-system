import { useRef } from 'react';
import '../Styles/InfoBox.css';
import { Scrollbar } from 'react-scrollbars-custom';

export const InfoBox = (data) => {
    console.log(data.planet);
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
                    {data.satellites.map(element => { return (<div>{element.name}</div>); })}
                </Scrollbar>
            </div>
        </>
    );
};
