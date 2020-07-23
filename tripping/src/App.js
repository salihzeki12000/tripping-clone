import React from 'react';
import Home from './Routes/Home';
import Routes from './Routes/Routes';
import {Link} from 'react-router-dom';
import CardComponent from './Components/Card/CardComponent';

function App() {
  return (
    <div >
   <Link to='/'></Link>
   <Routes />
    </div>
  );
}

export default App;
