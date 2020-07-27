import React from 'react'
import Subscribe from './HomeComponents/Subscribe'
import PopularDestinations from './HomeComponents/PopularDestinations'
import TopLocations from './HomeComponents/TopLocations'
import TopCountries from './HomeComponents/TopCountries'
import TrippingDescription from './HomeComponents/TrippingDescription'
import VacationRental from './HomeComponents/VacationRental'
import HomeSearchBar from './HomeComponents/HomeSearchBar'
// import { Link } from 'react-router-dom'
import HomeNavbar from './HomeComponents/HomeNavbar'
import DetailsCard from '../Components/Card/DetailsCard'

export default function Home() {
    return (
        <div>
            <DetailsCard />
            <HomeNavbar />
            <HomeSearchBar />
            <Subscribe />
            <PopularDestinations />
            <TopLocations />
            <TopCountries />
            <TrippingDescription />
            <VacationRental />
        </div>
    )
}
