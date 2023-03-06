import './App.css';
import PlanetDetails from './components/PlanetDetails';
import { SolarNavigator } from './components/SolarNavigator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<SolarNavigator />}></Route>
        <Route path='/planet/:Name' exact element={<PlanetDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
