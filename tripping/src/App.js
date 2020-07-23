import React from 'react';
import Home from './Routes/Home';
import Routes from './Routes/Routes'
// import './App.css';
import {Link} from 'react-router-dom'

function App() {
  return (
    <div >
    
   {/* <Home /> */}
   <Link to='/'></Link>
   <Routes />
    </div>
  );
}

export default App;
