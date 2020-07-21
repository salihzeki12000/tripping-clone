import React from 'react'
import Subscribe from '../Components/Subscribe'
import PopularDestinations from '../Components/PopularDestinations'
import TopLocations from '../Components/TopLocations'

export default function Home() {
    return (
        <div>
            <Subscribe />
            <PopularDestinations />
            <TopLocations />
        </div>
    )
}
