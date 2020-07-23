import React from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import CardComponent from './Components/CardComponent';
import CarouselCard from './Components/CarouselCard';
import FilterNavBar from './Components/FilterComponents/FilterNavBar';
import Amenities from './Components/FilterComponents/Amenites'

function App() {
  return (
    <div className="App">
      {/* <SearchBar /> */}
      {/* <CardComponent /> */}
      {/* <CarouselCard /> */}
      <FilterNavBar />
      <Amenities />
    </div>
  );
}

export default App;
