import React from 'react';
import Routes from './Routes/Routes';
import MapComponent from './Components/MapComponent';
import { Link } from 'react-router-dom';
import DetailsCard from './Components/Card/DetailsCard';
import CounterComponent from './Components/Card/CounterComponent';
import Reserve from './Components/PaymentComponents/Reserve';

function App() {
  return (
    <div >
      {/* <MapComponent /> */}
      <Routes />
      {/* <Reserve /> */}
       {/* <DetailsCard /> */}
      {/* <CounterComponent />  */}
    </div>
  );
}

export default App;
