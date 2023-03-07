import '../Styles/SolarNavigator.css';
import { GetPlanets } from '../Api';
import { useState, useEffect } from 'react';
import { PlanetScene } from './PlanetScene';
import { RingLoader } from 'react-spinners';

export const SolarNavigator = () => {
  const [showInfo, setShowInfo] = useState(false);
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
      <PageInfo />
      {planets ? (
        <>
          <div>
            <PlanetScene data={planets} />
          </div>
        </>
      ) : (
        <div className='loader'>
          <RingLoader color='#7090ff' />
        </div>
      )}
    </>
  );
};

const PageInfo = () => {
  return (
    <>
      <p className='info-txt'>
        Welcome.This is a simulated view of the solar system. Click a planet to
        navigate.
      </p>
    </>
  );
};
