import React from 'react';
import './FileNavBar.css';
import FreeCancellation from './FreeCancellation';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter'

export default function FilterNavBar(props) {
    let {history} = props
    let components = [<FreeCancellation history={history} />,<RatingFilter />, <PriceFilter />]
    return (
        <div className='my-5'>
            {components.map(component =><span className="filter text-muted">{component}</span>)}
        </div>
    )
}