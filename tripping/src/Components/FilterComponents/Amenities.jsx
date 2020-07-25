import React from 'react'
import './Amenities.css'

export default function Amenities() {
    let amenites = [{ logo: "fa fa-wifi", name: "Internet", id: "internet" }, { logo: "fa fa-cutlery", name: "Kitchen", id: "kitchen" },
    { logo: "fas fa-swimming-pool", name: "Pool", id: "pool" }, { logo: "fa fa-television", name: "TV", id: "tv" },
    { logo: "far fa-snowflake", name: "Air Conditioning", id: "air_conditioning" }, { logo: "fas fa-fan", name: "Washer", id: "washer" },
    { logo: "fas fa-door-closed", name: "Balcony/Patio", id: "balacony" }, { logo: "fas fa-dog", name: "Pet allowed", id: "pet_allowed" },
    { logo: "fas fa-fire", name: "Fireplace", id: "fireplace" }, { logo: "fa-fa-glass", name: "Dishwasher", id: "dis_watcher" }, { logo: "fas fa-paw", name: "No pets", id: "no_pets" },
    { logo: "fas fa-smoking", name: "Smoking", id: "smoking" }, { logo: "fas fa-smoking-ban", name: "No Smoking", id: "no_smoking" },
    { logo: "fas fa-hot-tub", name: "Jacuzzi", id: "jacuzzi" }, { logo: "fas fa-fish", name: "Fishing", id: "fishing" }

    ]

    return (
        <div className='container-fluid'>
            <div className='d-flex flex-row fontSizeAmenities'>
                <div className='mr-5 '>
                    <div className='d-flex flex-row'>
                        <div> <i class="fa fa-bed text-secondary mr-1" aria-hidden="true "></i> Bedrooms</div>
                        <div className='ml-5 qtyDiv qtyDivDec mr-3'>-</div>
                        <div>1</div>
                        <div className='qtyDiv qtyDivInc ml-3'>+</div>
                    </div>
                </div>
                <div className=' '>
                    <div className='d-flex flex-row'>
                        <div> <i class="fa fa-shower" aria-hidden="true"></i> Bathrooms</div>
                        <div className='ml-5 qtyDiv qtyDivDec mr-3'>-</div>
                        <div>1</div>
                        <div className='qtyDiv qtyDivInc ml-3'>+</div>
                    </div>
                </div>
            </div>
            <hr />

            <br />
            <div className='clear-both '></div>
            <div className='text-secondary mt-3 font-weight-bold '>AMENITIES</div>
            <div className='d-flex flex-row mt-3'>
                <div className='row inputTagFilters'>
                    {amenites.map(item => {
                        return (
                            <div key={item.logo} className='col-4 my-2'>
                                <input className='checkAmenities ' id={item.id} type='checkbox' />
                                <i className={`px-2 ${item.logo}`}></i>
                                <span className='fontSizeAmenities'>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='text-secondary float-right'>
                close
            </div>
            <div >
                <button className='btn text-white'>Apply</button>
            </div>

        </div>
    )
}
