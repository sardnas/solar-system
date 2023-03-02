import { Component } from 'react';
import { PlanetScene } from './PlanetScene';
import '../Styles/SolarNavigator.css';
import texture1 from '../img/texture1.jpg';

export class SolarNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentPlanet: [],
            infoBox: false
        })
    }

    updateContent = (planet) => {
        this.setState({ currentPlanet: planet });
        console.log(this.state.currentPlanet);
        if (!this.infoBox) {
            this.setState({ infoBox: true });
            console.log(this.state.infoBox);
        }
    }

    render() {
        return (
            <>
                {this.props.data ? (
                    <div className='spaceContainer'>
                        {this.props.data.map(element => {
                            element.texture = texture1;
                            return <div ><div onClick={() => this.updateContent(element)}><PlanetScene texture={element.texture} /></div></div>
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