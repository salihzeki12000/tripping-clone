import React from 'react';
import './FileNavBar.css';
import FreeCancellation from './FreeCancellation';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter'

export default function FilterNavBar() {
    let components = [<FreeCancellation />,<RatingFilter />, <PriceFilter />]
    return (
        <div className='my-5'>
            {components.map(component =><span className="filter text-muted">{component}</span>)}
        </div>
    )
}