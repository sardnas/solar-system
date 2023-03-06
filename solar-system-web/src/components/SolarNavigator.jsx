import '../Styles/SolarNavigator.css';
import { GetPlanets } from '../Api';
import { useState, useEffect } from 'react';
import { PlanetScene } from './PlanetScene';

export const SolarNavigator = () => {
    const [shouldFetchPlanets, setShouldFetchPlanets] = useState(true);
    const [errorFetchingPlanets, setErrorFetchingPlanets] = useState(false);
    const [planets, setPlanets] = useState(null);

    useEffect(() => {
        async function FetchPlanets() {
            try {
                let response = await GetPlanets();
                if (response.status === 200) {
                    let json = await response.json();
                    setPlanets(json);
                } else if (response.status === 400) {
                    alert('request was invalid because of missing or invalid input');
                    setErrorFetchingPlanets(true); //set error value
                } else {
                    alert('An unknown error occured');
                    setErrorFetchingPlanets(true); //set error value
                }
            } catch (e) {
                console.error('There was an error when fetching the planets! :-(');
                console.error(e);
                setErrorFetchingPlanets(true); //set error value
            }
        }

        if (shouldFetchPlanets) {
            setShouldFetchPlanets(false);
            FetchPlanets();
        }
    }, [shouldFetchPlanets, planets]);

    console.log(errorFetchingPlanets);

    return (
        <>
            {planets ? (
                <>
                    <div>
                        <PlanetScene data={planets} />
                    </div>
                </>
            ) : (
                <h1>loading planets</h1>
            )}
        </>
    );
};
