import './App.css';
import { SolarNavigator } from './components/SolarNavigator';
import { useState, useEffect } from 'react';
import { Planets } from './Functions/Planets';
import { Scene } from './components/Scene';

function App() {
  const planets = Planets().planets;
  return (
    <div>
      {/*<Scene />*/}
      <SolarNavigator data={planets} />
    </div>
  );
}

export default App;
