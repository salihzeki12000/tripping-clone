import React from 'react';
import './FileNavBar.css';
import FreeCancellation from './FreeCancellation';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter';
import Amenities from './Amenities';
import Accommodation from './AccommodationTypes';

export default function FilterNavBar(props) {
     let { history } = props
     return (
          <div className='my-2'>
               {/* {components.map(component =><span className="filter text-muted">{component}</span>)} */}
               <div className='d-flex flex-row'>
                    <div className=''>
                         <Amenities history={history} />
                    </div>
                    <div className=''>
                         <PriceFilter history={history} />
                    </div>
                    <div className=''>
                         <RatingFilter history={history} />
                    </div>
                    <div className=''>
                         <Accommodation history={history} />
                    </div>
                    <div className=''>
                         <FreeCancellation history={history} />
                    </div>

               </div>
          </div>
     )
}