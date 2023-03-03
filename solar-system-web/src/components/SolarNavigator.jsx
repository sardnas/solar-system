/*
import { Component } from 'react';
import { PlanetScene } from './PlanetScene';
*/
import '../Styles/SolarNavigator.css';
import { GetPlanets } from '../Api';
import { useState, useEffect } from 'react';
import { PlanetScene } from './PlanetScene';
/*
import earth from '../img/earth.jpg';
import jupiter from '../img/jupiter.jpg';
import mars from '../img/mars.jpg';
import mercury from '../img/mercury.jpg';
import neptune from '../img/neptune.jpg';
import saturn from '../img/saturn.jpg';
import uranus from '../img/uranus.jpg';
import venus from '../img/venus.jpg';

import texture1 from '../img/texture1.jpg';
import { InfoBox } from './InfoBox';
*/
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
                    alert(
                        "request was invalid because of missing or invalid input"
                    );
                    setErrorFetchingPlanets(true); //set error value
                } else {
                    alert("An unknown error occured");
                    setErrorFetchingPlanets(true); //set error value
                }
            } catch (e) {
                console.error("There was an error when fetching the planets! :-(");
                console.error(e);
                setErrorFetchingPlanets(true); //set error value
            }
        }

        if (shouldFetchPlanets) {
            setShouldFetchPlanets(false);
            FetchPlanets();
        }
    }, [shouldFetchPlanets, planets]);

    //console.log(errorFetchingPlanets);
    //console.log(planets);
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
        </>);

    /*

    return (
        <>
            <h1>welcome</h1>;
            {planets ? (
                <>
                    <h1>planets: </h1>
                    {planets.map(element => { return <div>test</div> })}
                </>
            ) : (
                <h1>loading</h1>
            )};
        </>
    );*/
}
/*
export class SolarNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentPlanet: [],
            infoBox: false,
            mousePos: [0, 0]
        })
    }

    updateContent = (planet) => {
        //this.setState({ currentPlanet: planet });
        //console.log(this.state.currentPlanet)
    }

    handleOnClick = (planet) => {
        this.setState({ currentPlanet: planet });
        //console.log(this.state.currentPlanet);
        if (!this.infoBox) {
            this.setState({ infoBox: true });
            //console.log(this.state.infoBox)
        }
    }

    closeInfoBox = () => {
        this.setState({ infoBox: false });
    }
    //{this.state.infoBox ? () : ()}
    render() {
        return (
            <>
                {this.props.data ? (<>
                    {this.state.infoBox ? (<><div onClick={() => this.closeInfoBox()}><InfoBox planet={this.state.currentPlanet} /></div></>) : (<></>)}
                    <div className='spaceContainer'>
                        <div planets={Planets().planets} />
                    </div>
                </>
                ) : (
                    <><p>loading</p></>
                )}
            </>
        );
    }
}

export default { SolarNavigator };*/