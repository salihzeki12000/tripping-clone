import React from 'react';
import Home from './Routes/Home';
import Routes from './Routes/Routes';
import { Link } from 'react-router-dom';
import DetailsCard from './Components/Card/DetailsCard';
import CounterComponent from './Components/Card/CounterComponent';

function App() {
  return (
    <div >
      {/* <Link to='/'></Link> */}
      {/* <Routes /> */}
      <DetailsCard />
      <CounterComponent />
    </div>
  );
}

export default App;
