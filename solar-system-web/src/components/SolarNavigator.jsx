import { Component } from 'react';
import { PlanetScene } from './PlanetScene';
import '../Styles/SolarNavigator.css';

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


export class SolarNavigator extends Component {
    constructor(props) {
        super(props);
        if (props.data) {
            props.data[0].texture = uranus;
            props.data[1].texture = texture1;
            props.data[2].texture = neptune;
            props.data[3].texture = jupiter;
            props.data[4].texture = mars;
            props.data[5].texture = mercury;
            props.data[6].texture = saturn;
            props.data[7].texture = earth;
            props.data[8].texture = venus;
        }
        //console.log(props.data);
        this.state = ({
            currentPlanet: [],
            infoBox: false,
            mousePos: [0, 0]
        })
    }

    updateContent = (planet) => {
        this.setState({ currentPlanet: planet });
        //console.log(this.state.currentPlanet);
    }

    handleOnClick = (planet) => {
        this.setState({ currentPlanet: planet });
        console.log(this.state.currentPlanet);
        if (!this.infoBox) {
            this.setState({ infoBox: true });
            console.log(this.state.infoBox);
        }
    }

    closeInfoBox = () => {
        this.setState({ infoBox: false });
    }
    //{this.state.infoBox ? () : ()}
    render() {
        return (
            <>
                {this.props.data ? (
                    <div className='spaceContainer'>
                        {this.state.infoBox ? (<><div onClick={() => this.closeInfoBox()}><InfoBox planet={this.state.currentPlanet} /></div></>) : (<></>)}
                        {this.props.data.map(element => {
                            return (
                                <div>
                                    <div className='planetHolder' onMouseOver={() => this.updateContent(element)} onClick={() => this.handleOnClick(element)}>
                                        <PlanetScene texture={element.texture} />
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                ) : (
                    <><p>loading</p></>
                )}
            </>
        );
    }
}

export default { SolarNavigator };