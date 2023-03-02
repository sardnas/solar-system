import './App.css';
import texture1 from './img/texture1.jpg';
import texture2 from './img/texture2.jpg';
import { PlanetScene } from './components/InfoBox';


function App() {
  return (
    <div>
      <PlanetScene texture={texture1} />;
      <PlanetScene texture={texture2} />;
    </div>
  );
}

export default App;
