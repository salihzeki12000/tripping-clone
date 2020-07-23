import React from 'react';
import Home from './Routes/Home';
import Routes from './Routes/Routes';
import {Link} from 'react-router-dom';
import SearchBar from './Components/SearchBar/SearchBar';
import CardComponent from './Components/Card/CardComponent';

function App() {
  return (
    <div >
   <SearchBar />
   <Link to='/'></Link>
   <Routes />
    </div>
  );
}

export default App;
