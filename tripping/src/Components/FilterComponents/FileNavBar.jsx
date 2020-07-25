import React from 'react';
import './FileNavBar.css';
import FreeCancellation from './FreeCancellation';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter';
import Amenities from './Amenities';
import Accommodation from './AccommodationTypes';

export default function FilterNavBar(props) {
    let {history} = props
    // let components = [<Amenities />,<FreeCancellation history={history} />,<RatingFilter />, <PriceFilter />,<Accommodation />]
    return (
        <div className='my-2'>
            {/* {components.map(component =><span className="filter text-muted">{component}</span>)} */}
            <div className='d-flex flex-row'>
                 <div className=''>
                      <Amenities />
                 </div>
                 <div className=''>
                      <PriceFilter />
                 </div>
                 <div className=''>
                      <RatingFilter />
                 </div>
                 <div className=''>
                      <Accommodation />
                 </div>
                 <div className=''>
                      <FreeCancellation />
                 </div>

            </div>
        </div>
        // <div className='row'>
        //       <div></div>
        // </div>
    )
}