import React from 'react';
import Home from './Routes/Home';
import Routes from './Routes/Routes';
import { Link } from 'react-router-dom';
import DetailsCard from './Components/Card/DetailsCard';

function App() {
  return (
    <div >
      <Link to='/'></Link>
      <Routes />
      {/* <DetailsCard /> */}
    </div>
  );
}

export default App;
