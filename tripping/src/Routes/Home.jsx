import React from 'react'
import Subscribe from '../Components/Subscribe'
import PopularDestinations from '../Components/PopularDestinations'
import TopLocations from '../Components/TopLocations'
import TopCountries from '../Components/TopCountries'
import TrippingDescription from '../Components/TrippingDescription'
import VacationRental from '../Components/VacationRental'
import SearchBar from '../Components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <div>
               <Link to='/register'>Register</Link>
                <Link to='/signin'>Signin</Link>
            </div>
            <SearchBar />
            <Subscribe />
            <PopularDestinations />
            <TopLocations />
            <TopCountries />
            <TrippingDescription />
            <VacationRental />
        </div>
    )
}
