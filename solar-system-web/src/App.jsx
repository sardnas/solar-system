import './App.css';
import { SolarNavigator } from './components/SolarNavigator';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

function App() {
  return (
    <>
      <Parallax pages={2}>
        <ParallaxLayer offset={0}>
          <SolarNavigator />
        </ParallaxLayer>
        <ParallaxLayer offset={1}>
          <div id={1}>test</div>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

export default App;
