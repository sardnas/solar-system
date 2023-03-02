import './App.css';
import { SolarNavigator } from './components/SolarNavigator';
import { useState, useEffect } from 'react';
import { Planets } from './Functions/Planets';


function App() {
  const planets = Planets().planets;
  return (
    <div>
      <SolarNavigator data={planets} />;
    </div>
  );
}

export default App;
