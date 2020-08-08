import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Modal from 'react-modal';
import CounterComponent from './CounterComponent';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import { getImageRequest, getDataRequest, getReviewRequest, getRecommendRequest, reviewRequest, getBookingRequest } from '../../Redux/EntityAPI/Action'
import querystring from 'query-string';
import SearchBar from '../SearchBar/SearchBar';
import Amenities from '../FilterComponents/Amenities';
import { format } from 'fecha'
// import MapComponent from '../MapComponent';
import EntityMap from '../EntityMap'
import './CarouselCard.css';
import { DatesData } from '../../Redux/SearchBar/action'
import HomeNavbar from '../../Routes/HomeComponents/HomeNavbar'

function getData(key) {
    try {
        let data = localStorage.getItem(key)
        data = JSON.parse(data)
        return data
    }
    catch{
        return undefined
    }
}


Modal.setAppElement('#root');
class TempCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            flag: false,
            id: '',
            startDate: null,
            endDate: null,
            dateFlag: false,
            bookingRes: '',
            bookingDate: [],
            tokenFlag: false
        }
    }

    componentDidMount() {
        console.log('enter')
        const values = querystring.parse(this.props.location.search)

        console.log(values)

        console.log(values.check_in, values.check_out)
        if (values.check_in && values.check_out) {

            var checkIn = values.check_in.split('-')
            var checkOut = values.check_out.split('-')
            // console.log(checkIn)

            var x = format(new Date(Number(checkIn[0]), Number(checkIn[1]) - 1, Number(checkIn[2])), 'isoDate')
            var y = format(new Date(Number(checkOut[0]), Number(checkOut[1]) - 1, Number(checkOut[2])), 'isoDate')
            console.log(x, y)
        }

        this.setState({
            data: "uday",
            id: Number(values.id)
        })

        const { getImageRequest, getDataRequest, getReviewRequest, getRecommendRequest, getBookingRequest } = this.props

        // getImageRequest(Number(values.id))
        getReviewRequest(Number(values.id))
        getDataRequest(Number(values.id))
        getRecommendRequest(Number(values.id))
        getBookingRequest(Number(values.id), x, y)
    }


    handleClick = () => {
        let { click, counter } = this.state
        this.setState({
            click: !click,
            counter: !counter
        })

    }


    handleAvailabity = () => {
        let { startDate, endDate, id } = this.state

        var start = ''
        var end = ''
        var arr = []
        if (startDate && endDate) {
            start = startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()
            end = endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()

            this.setState({
                dateFlag: true,
            })

            arr.push(start, end)

            this.props.DatesData({ check_in: `${startDate._d.getMonth()}/${startDate._d.getDate()}/${startDate._d.getFullYear()}`, check_out: `${endDate._d.getMonth()}/${endDate._d.getDate()}/${endDate._d.getFullYear()}` })

        }
        else {
            this.setState({
                dateFlag: true
            })
        }

        if (getData('token')) {
            this.setState({
                tokenFlag: true
            })
        } else {
            alert("please login before booking")
        }

        axios.get("http://trippingbackend.gunjan.tech/entity/check_dates", {
            params: {
                property_id: id,
                check_in: start,
                check_out: end
            }
        })
            .then(res => res.data)
            .then(res => {
                this.setState({
                    bookingRes: res,
                    bookingDate: arr
                })
            })

    }

    handleReserve = () => {
        if (getData('token')) {
            this.setState({
                tokenFlag: true
            })
        } else {
            alert("please login before booking")
        }
    }

    render() {



        let { user, review, data, recommendations, guestCounter, bookingResponse } = this.props;
        let { startDate, endDate, click, open, counter, dateFlag, bookingRes, tokenFlag } = this.state
        console.log(data, review, recommendations)
        // console.log(data[0].hotel_name)
        console.log(bookingRes, bookingResponse)
        console.log(user.success, user.image, user)
        return (
            <>
                <HomeNavbar />
                <div className='container-fluid'>
                    <div className="row">
                        <hr className="col-12" />
                        <div className='container'>
                            <div className='row'>
                                <div className="ml-5 mr-5 col-12">
                                    {data.length > 0 && <>
                                        <h4 className='font-weight-bold'>{data[0].property_name} @{data && data[0].locality}</h4>
                                        <div className='d-flex flex-row'>
                                            <p><i className="fa fa-star orange" ></i></p>
                                            <p className='ml-3'>{data.length > 0 && data[0].rating}({review && review.length})</p>
                                            <p className="mx-1"> {data[0].city, data[0].state, data[0].country}</p>
                                        </div>
                                    </>
                                    }
                                </div>
                                <div className="col-12">
                                    <div className="row ml-5 mr-5">
                                        <div className="col-6 p-2">
                                            <img className="img-fluid detCard" src={data.length > 0 && data[0].image[0]} />
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[1]} /></div>
                                                <div className="col-6 pt-2"> <img className="img-fluid childCard-right" src={data.length > 0 && data[0].image[2]} /></div>
                                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[3]} /></div>
                                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard-right" src={data.length > 0 && data[0].image[4]} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='row ml-5 mr-5 mt-4'>
                                        <div className='col-7'>
                                            {data.length > 0 && <>
                                                <h4 className="font-weight-bold">{data[0].accomodation_type}</h4>
                                                <p>{data[0].guest}+ . guests . {data[0].bedroom} bedrooms</p>
                                            </>}
                                            <hr className="col-11" />
                                            <div className='row mt-2'>
                                                <div className='col-1'>
                                                    <i className="fas fa-home orange"></i>
                                                </div>
                                                <div className='col-11'>
                                                    <h6 className="font-weight-bold">Enitre locality <br />
                                                        <small className='text-muted'>You’ll have the serviced apartment to yourself.</small>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-1'>
                                                    <i className="fas fa-map-marker orange"></i>
                                                </div>
                                                <div className='col-11'>
                                                    <h6 className="font-weight-bold">Great location<br />
                                                        <small className='text-muted'>94% of recent guests gave the location a 5-star rating.</small>
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className='row mt-2'>
                                                <div className='col-1'>
                                                    <i className="far fa-calendar-alt orange"></i>
                                                </div>
                                                <div className='col-11'>
                                                    <h6 className="font-weight-bold">Free cancellation policy</h6>
                                                </div>
                                            </div>
                                            <hr className="col-11" />
                                            <div className="col-12">
                                                <div className='row'>
                                                    <h6 className="font-weight-bold">Description</h6>
                                                    <p className="font-weight-lighter text-muted">{data.length > 0 && data[0].description}</p>

                                                </div>
                                            </div>
                                            <hr className="col-11" />

                                            <h6 className='font-weight-bold mt-3'>Amenities</h6>
                                            <div className='col-12 mt-2 mb-2'>
                                                <div className='row'>
                                                    <div className='col-5 fontSizeAmenities'>
                                                        <div className='my-2'>
                                                            <i className='px-3 far fa-snowflake'></i>
                                                            {data.length > 0 && data[0].aminities.air_conditioning == 1 ? <span >Air Conditioning</span> : <span style={{ textDecoration: "line-through" }}>Air Conditioning</span>}
                                                        </div>
                                                        <div className='my-2'>
                                                            <i className='px-3 fa fa-wifi'></i>
                                                            {data.length > 0 && data[0].aminities.air_internet == 1 ? <span >Internet</span> : <span style={{ textDecoration: "line-through" }}>Internet</span>}
                                                        </div>
                                                        <div className='my-2'>
                                                            <i className='px-3 fa fa-cutlery'></i>
                                                            {data.length > 0 && data[0].aminities.kitchen == 1 ? <span >Kitchen</span> : <span style={{ textDecoration: "line-through" }}>Kitchen</span>}
                                                        </div>
                                                        <div className='my-2'>
                                                            <i className='px-3 far fa-snowflake'></i>
                                                            {data.length > 0 && data[0].aminities.parking == 1 ? <span >Parking</span> : <span style={{ textDecoration: "line-through" }}>Parking</span>}
                                                        </div>

                                                    </div>
                                                    <div className='col-5 offset-2 fontSizeAmenities'>
                                                        <div className='my-2'>
                                                            <i className='px-3 fas fa-dog'></i>
                                                            {data.length > 0 && data[0].aminities.air_pet_allowed == 1 ? <span >Pet Allowed</span> : <span style={{ textDecoration: "line-through" }}>Pet Allowed</span>}
                                                        </div> <div className='my-2'>
                                                            <i className='px-3 fas fa-swimming-pool'></i>
                                                            {data.length > 0 && data[0].aminities.pool == 1 ? <span >Pool</span> : <span style={{ textDecoration: "line-through" }}>Pool</span>}
                                                        </div> <div className='my-2'>
                                                            <i className='px-3 fas fa-smoking'></i>
                                                            {data.length > 0 && data[0].aminities.smoking == 1 ? <span >Smoking</span> : <span style={{ textDecoration: "line-through" }}>Smoking</span>}
                                                        </div> <div className='my-2'>
                                                            <i className='px-3 fa fa-television'></i>
                                                            {data.length > 0 && data[0].aminities.tv == 1 ? <span >TV</span> : <span style={{ textDecoration: "line-through" }}>TV</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className='mt-3'>
                                                <h4 className='font-weight-bold'>Select checkout date</h4>
                                                <small>Minimum stay: 2 nights</small>
                                                <DayPicker numberOfMonths={2} />
                                            </div> */}
                                        </div>
                                        <div className="col-5 ">
                                            <div className="row p-2 border shadow" style={{ borderRadius: "3%" }} >
                                                <div className="col-6 d-flex flex-row">
                                                    <span><h5 className='font-weight-bold mx-2'>	&#8377; {data.length > 0 && data[0].price}</h5></span>  <span className='mx-2'> /night</span>
                                                </div>

                                                <div className='mt-4 ml-5 border dateGuest'>
                                                    <DateRangePicker
                                                        className='CalendarDay__selected CalendarDay__selected_span'
                                                        startDate={startDate}
                                                        startDateId="your_unique_start_date_id"
                                                        endDate={endDate}
                                                        endDateId="your_unique_end_date_id"
                                                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                                        focusedInput={this.state.focusedInput}
                                                        disabledDates={""}
                                                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                                                        color="#FB8C00"

                                                    />
                                                </div>
                                                <div>
                                                    <div className="border ml-5 p-3 mt-1 dateGuest pt-2 " style={{ width: '280px' }} onClick={this.handleClick}>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <span className="font-weight-lighter">Guests</span>
                                                            </div>
                                                            <div className='offset-1 col-2'>
                                                                <span className=''>{guestCounter}</span>

                                                            </div>
                                                            <div className="col-2">
                                                                {click ? <i class="fa fa-angle-up text-warning" aria-hidden="true"></i> : <i class="fa fa-angle-down text-warning" aria-hidden="true"></i>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=' p-2'>
                                                        {counter && <CounterComponent clickHandler={this.handleClick} />}
                                                    </div>
                                                    <div className='ml-5 p-2 text-danger'>
                                                        {bookingRes && bookingRes.error && <> <h5>{bookingRes.message}</h5> <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button></>}
                                                        {!bookingRes && !dateFlag && <>  <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button></>}
                                                    </div>
                                                    <div className='ml-5'>
                                                        {/* {data.length>0 && startDate && endDate && <Link to={`/payment/tripping/?id=${data[0].property_id}&property_name=${data[0].property_name}&check_in=${startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()}&check_out=${endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()}&country=${data[0].country}&state=${data[0].state}&locality=${data[0].locality}&area=${data[0].area}&accomodation=${data[0].accomodation_type}`}  ><button className="btn btn-block reserve" >Reserve</button></Link>} */}
                                                        {/* {!dateFlag && <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button>} */}
                                                        {bookingRes && !bookingRes.error && <> <h5 className="text-success">{bookingRes.message}</h5>
                                                            <button className="btn btn-block reserve" onClick={() => this.handleReserve()} >
                                                                {
                                                                    tokenFlag ?
                                                                        <Link to={`/payment/tripping/?id=${data[0].property_id}&property_name=${data[0].property_name}&check_in=${startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()}&check_out=${endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()}&country=${data[0].country}&state=${data[0].state}&locality=${data[0].locality}&area=${data[0].area}&accomodation=${data[0].accomodation_type}`}  >
                                                                            Reserve
                                                                    </Link>
                                                                        : "Reserve"
                                                                }
                                                            </button></>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row ml-5 mr-5">
                                        <hr className="col-12" />
                                        <div className='col-12 mt-2 mb-2'>
                                            <h6 className='font-weight-bold'>
                                                <i class="fa fa-star orange mx-2" aria-hidden="true"></i>
                                                {data.length > 0 && data[0].rating} ({review.length > 0 && review.length} reviews)
                                            </h6>
                                            <div className='row'>
                                                {review?.map((elem, i) => <div className='col-6 my-2'>
                                                    <div className='d-flex flex-row'>
                                                        <img src="/revIcon.jpeg" style={{ borderRadius: "50%", height: "50px", width: "50px" }} />
                                                        <div className='ml-3 mt-2'>
                                                            <h6 className="font-weight-bold">{elem.first_name}<br />
                                                                <small className="text-muted">{elem.reviewed_at.substring(0, 16)}</small>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='my-2 font-weight-lighter' style={{ fontSize: "15px" }}>{elem.review}</p>
                                                    </div>
                                                </div>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-4 mb-4 ">
                                    <div className="row ml-5 mr-5">
                                        <div className="col-12" style={{ height: "400px", width: "250px" }}>
                                            {data && <EntityMap data={data} />}
                                        </div>
                                    </div>

                                </div>
                                <div className='col-12 mt-2 mb-2'>
                                    <div className='row ml-5 mr-5'>
                                        <hr className="col-12"></hr>
                                        <h6 className='font-weight-bold col-12'>Recommendations</h6>
                                        {recommendations?.filter((elem, i) => i < 6 && elem).map((item, i) => {
                                            return (
                                                <div key={item.property_id} className="col-4 my-2">
                                                    <div className="card font-wright-lighter" >
                                                        <img src={item.image[0]} className="card-img-top img-fluid" alt="..." style={{ height: "200px", width: "330px" }} />
                                                        <div className="card-body">
                                                            <h6 className="card-title">{item.property_name}</h6>
                                                            <div className='d-flex flex-row card-text'>
                                                                <span className='mx-2 font-weight-bolder'>	&#8377; {item.price} .</span>
                                                                <small className='mx-2'>Rooms:  {item.total_room} .</small>
                                                                <small className='mx-2'>City:  {item.city}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.signup.user,
    images: state.entity.images,
    data: state.entity.data,
    review: state.entity.review,
    bookingResponse: state.entity.bookingResponse,
    recommendations: state.entity.recommendations,
    guestCounter: state.search.guestCounter,
})

const mapDispatchToProps = dispatch => ({
    getImageRequest: (payload) => dispatch(getImageRequest(payload)),
    getDataRequest: (payload) => dispatch(getDataRequest(payload)),
    getReviewRequest: (payload) => dispatch(getReviewRequest(payload)),
    getRecommendRequest: (payload) => dispatch(getRecommendRequest(payload)),
    getBookingRequest: (payload) => dispatch(getBookingRequest(payload)),
    DatesData: payload => dispatch(DatesData(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(TempCard)

