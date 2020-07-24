import React from 'react'
import './FileNavBar.css'

export default function FilterNavBar() {
    let filters = ['Amenities','Price','Location','Accommodation types','Free cancellation']
    return (
        <div className='my-5'>

            {filters.map(filter =><button className="filter text-muted">{filter}</button>)}
        </div>
    )
}