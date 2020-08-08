import React, { Component } from 'react'
import { connect } from 'react-redux'
import querystring from 'query-string';
import StarComponent from '../FilterComponents/StarRatingComponent';


class BillingCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            checkIn: null,
            checkOut: null
        }
    }

    componentDidMount() {
        const values = querystring.parse(this.props.location.search)

        console.log(values)
        this.setState({
            checkIn: values.check_in,
            checkOut: values.check_out
        })
        // console.log(this.props)
    }

    render() {
        let { data,  review, guestCounter, days } = this.props
        let {checkIn, checkOut} = this.state
        // console.log(data, images, guestCounter)
        return (
            <div >
                <div className='row'>
                    <div className='col-6' style={{ color: "#FB8C00" }}>
                        <h5 className='font-weight-bold' >{data.length > 0 && data[0].property_name}</h5>
                        <div className=''>located in {data.length > 0 && data[0].state}</div>
                        {/* <i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-half-o" aria-hidden="true"></i> */}
                        {/* {reviews && <> <i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i> {reviews.length}</>} reviews  */}
                    </div>
                    <div className='col-3'>
                        <img src={data.length > 0 && data[0].image[0]} width='200px' height='150px' />
                    </div>
                </div>
                <hr className='w-100' />
                <div className='my-3 text-secondary'>
                    <i class="fa fa-users mr-3 " aria-hidden="true "></i><span className='text-dark'>{guestCounter} guests</span>
                    <br />

                    <i class="fa fa-calendar mr-3 mt-3" aria-hidden="true"></i><span className='text-dark'>{checkIn} <i class="fa fa-arrow-right text-secondary mx-2" aria-hidden="true"></i>{checkOut} </span>
                </div>
                <hr className='w-100' />
                <div className='row my-2 ml-2 '>
                    <div className=' d-flex flex-row'>
                        <div>
                            <p><span >&#8377;</span>{data.length > 0 && data[0].price} x {days} nights </p>
                            <p>Cleaning fee <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                            <p>Service fee <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                            <p>Occupancy taxes and fees <i class="fa fa-question-circle  mx-2 text-muted" aria-hidden="true"></i> </p>
                        </div>
                        <div className='ml-5 pl-4'>
                            <p><span className='mx-2'>	&#8377;</span>{data.length > 0 && Number(data[0].price) * days} </p>
                            <p ><span className='mx-2'>	&#8377;</span>100.00 </p>
                            <p><span className='mx-2'>	&#8377;</span>200.00 </p>
                            <p><span className='mx-2'>	&#8377;</span>400.00 </p>
                        </div>

                    </div>
                </div>
                <hr className='w-100' />
                <div className='my-3'>
                    <br /> <br />
                    <div className='d-flex flex-row'>
                        <h5 className=' font-weight-bold' style={{ color: "#FB8C00" }}>Total(INR)</h5>
                        <h5 className=' font-weight-bold' style={{ marginLeft: '200px' }} >	&#8377; {data.length > 0 && (Number(data[0].price) * days) + 100 + 200 + 400}</h5>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.entity.data,
    review: state.entity.review,
    recommendations: state.entity.recommendations,
    guestCounter: state.search.guestCounter,
})



export default connect(mapStateToProps, null)(BillingCard)
