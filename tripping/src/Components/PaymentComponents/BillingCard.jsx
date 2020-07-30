import React, { Component } from 'react'
import { connect } from 'react-redux'

class BillingCard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let { data, images, reviews, guestCounter } = this.props
        console.log(data, images, guestCounter)
        return (
            <div className='p-3 border'>
                <div className='row'>
                    <div className='col-8'>
                        <h6 className='font-weight-bold'>{data.length > 0 && data[0].hotel_name}</h6>
                        <div className=''>located in {data.length > 0 && data[0].state}</div>
                        <i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-half-o" aria-hidden="true"></i>{reviews && reviews.length} reviews
                    </div>
                    <div className='col-4'>
                        <img src={images[0]} width='100px' height='100px' />
                    </div>
                </div>
                <hr className='w-100' />
                <div className='my-3 text-secondary'>
                    <i class="fa fa-users mr-3 " aria-hidden="true "></i><span className='text-dark'>{guestCounter} guests</span>
                    <br />

                    <i class="fa fa-calendar mr-3 mt-3" aria-hidden="true"> </i><span className='text-dark'>july 29,2020 <i class="fa fa-arrow-right text-secondary mx-2" aria-hidden="true"></i> july 30, 2020</span>
                </div>
                <hr className='w-100' />
                <div className='row my-2 ml-2 '>
                    <div className=' d-flex flex-row'>
                        <div>
                            <p><span className='mx-2'>$</span>{data.length > 0 && data[0].price} x 3 nights </p>
                            <p>Cleaning fee <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                            <p>Service fee <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                            <p>Occupancy taxes and fees <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                        </div>
                        <div className='ml-5 pl-4'>
                            <p><span className='mx-2'>$</span>{data.length > 0 && Number(data[0].price) * 3} </p>
                            <p ><span className='mx-2'>$</span>100.00 </p>
                            <p><span className='mx-2'>$</span>200.00 </p>
                            <p><span className='mx-2'>$</span>400.00 </p>
                        </div>

                    </div>
                </div>
                <hr className='w-100' />
                <div className='my-3'>
                    <br /> <br />
                    <div className='d-flex flex-row'>
                        <h5 className=' font-weight-bold'>Total(USD)</h5>
                        <h5 className='ml-5 font-weight-bold'>${data.length > 0 && Number(data[0].price) * 3 + 100 + 200 + 300}</h5>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.signup.user,
    images: state.entity.images,
    data: state.entity.data,
    review: state.entity.review,
    recommendations: state.entity.recommendations,
    guestCounter: state.search.guestCounter,
})



export default connect(mapStateToProps, null)(BillingCard)
