import React from 'react'
import Subscribe from '../Components/Subscribe'
import PopularDestinations from '../Components/PopularDestinations'
import TopLocations from '../Components/TopLocations'
import TopCountries from '../Components/TopCountries'

export default function Home() {
    return (
        <div>
            <Subscribe />
            <PopularDestinations />
            <TopLocations />
            <TopCountries />
        </div>
    )
}
