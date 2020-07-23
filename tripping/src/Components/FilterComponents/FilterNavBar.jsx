import React from 'react'
import './FilterNavBar.css'

export default function FilterNavBar() {
    let filters = ['Amenities','Price','Location','Accommodation types','Free cancellation']
    return (
        <div>
            {filters.map(filter =><button className="filter text-muted">{filter}</button>)}
        </div>
    )
}
