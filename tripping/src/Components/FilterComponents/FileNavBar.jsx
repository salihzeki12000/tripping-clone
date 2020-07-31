import React from 'react';
import './FileNavBar.css';
import FreeCancellation from './FreeCancellation';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter';
import Amenities from './Amenities';
import Accommodation from './AccommodationTypes';

export default function FilterNavBar(props) {

     let { history, location } = props

     return (
          <div className='my-2'>
               <div className='d-flex flex-row'>
                    <div className=''>
                         <Amenities history={history} location={location} />
                    </div>
                    <div className=''>
                         <PriceFilter history={history} location={location} />
                    </div>
                    <div className=''>
                         <RatingFilter history={history} location={location} />
                    </div>
                    <div className=''>
                         <Accommodation history={history} location={location} />
                    </div>
                    <div className=''>
                         <FreeCancellation history={history} location={location} />
                    </div>
               </div>
          </div>
     )
}