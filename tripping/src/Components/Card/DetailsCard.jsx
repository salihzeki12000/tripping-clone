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
import MapComponent from '../MapComponent';

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
            bookingDate: []
        }
    }
    componentDidMount() {
        console.log('enter')
        const values = querystring.parse(this.props.location.search)

        console.log(values)

        console.log(values.check_in, values.check_out)
        let checkIn = values.check_in.split('-')
        let checkOut = values.check_out.split('-')
        // console.log(checkIn)

        let x = format(new Date(Number(checkIn[0]), Number(checkIn[1]) - 1, Number(checkIn[2])), 'isoDate')
        let y = format(new Date(Number(checkOut[0]), Number(checkOut[1]) - 1, Number(checkOut[2])), 'isoDate')
        console.log(x, y)

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


    // handlePayment = async () => {
    //     let { data } = this.props
    //     let order_res = await axios.post("http://ac26c3ee3bc6.ngrok.io/booking/order_id", {
    //         "amount": 9000,
    //         "currency": "INR",
    //         "receipt": 32 + "#" + "uday",
    //         "payment_capture": "1"

    //     })


    //     const options = {
    //         "key": "rzp_test_sG3R7ERqPCjPFP",      // Enter the Key ID generated from the Dashboard
    //         "amount": "9000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         "currency": "INR",
    //         "name": "Book Trip",
    //         "description": "Transaction",
    //         "image": "/logo.svg",
    //         "order_id": order_res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         handler: async function (response) {
    //             // alert(response.razorpay_payment_id);
    //             // alert(response.razorpay_order_id);
    //             // alert(response.razorpay_signature)
    //             console.log(response)
    //             let final_res = await axios.post("http://ac26c3ee3bc6.ngrok.io/booking/varification", {
    //                 ...response
    //             })

    //             if (final_res.data.result == 'success') {
    //                 alert(final_res.data.message)
    //                 this.props.history.push('/')
    //             } else {
    //                 alert(final_res.data.message)
    //             }

    //         },
    //         "prefill": {
    //             "name": "Uday",
    //             "email": "",
    //             "contact": ""
    //         },
    //         // "notes": {
    //         //     "address": ""
    //         // },
    //         "theme": {
    //             "color": "#F37254"
    //         }
    //     };



    //     const paymentObject = new window.Razorpay(options)
    //     paymentObject.open()

    // }

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

        }
        else {
            this.setState({
                dateFlag: true
            })
        }


        axios.get("https://22a9fddbc1bc.ngrok.io/entity/check_dates", {
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

    render() {



        let { user, review, data, recommendations, guestCounter, bookingResponse } = this.props;
        let { startDate, endDate, click, open, counter, dateFlag, bookingRes } = this.state
        console.log(data, review, recommendations)
        // console.log(data[0].hotel_name)
        console.log(bookingRes, bookingResponse)
        console.log(user.success, user.image, user)
        return (
            <div className='container-fluid'>
                {/* {this.state.date} */}
                <br />
                <div className='container'>
                    <div className='row my-3'>
                        <div className='col-2'>
                            <div>
                                <Link to='/'><img src='/logo1.png' alt='/' width='80px' height='30px' /></Link>
                            </div>
                        </div>

                        {/* Modal */}
                        <div className='col-4 offset-2 '>
                            <button className=' px-5 border shadow-sm inputDiv' onClick={() => this.setState({ open: !open })}>
                                <i class="fa fa-search text-warning px-2"></i>
                        Add a location
                    </button>
                            <Modal
                                isOpen={open}
                                style={{
                                    content: {
                                        position: 'absolute',
                                        height: '28rem',
                                        border: '1px solid #ccc',
                                        background: '#fff',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        padding: '20px'
                                    }
                                }}
                            >
                                <button onClick={() => this.setState({ open: false })} className="float-right"><i class="fas fa-times" style={{ color: 'orange' }}></i></button>
                                <div className="text-center" style={{ marginLeft: '100px' }}>
                                    <p className="float-left ml-5 mr-2 font-weight-bold" style={{ marginLeft: '100px' }}>Places to stay</p>
                                    <p className="float-left mr-2 font-weight-bold">Monthly stays</p>
                                    <p className="float-left font-weight-bold">Experiences</p>
                                </div>
                                <SearchBar />
                            </Modal>
                        </div>

                        {/* Modal */}
                        <div className='col-3 offset-3 ml-5'>
                            {/* {user.success && <>  <img src={user.image} width='50px' height='50px' style={{ borderRadius: '50%' }} /><p style={{ fontSize: '25px', color: 'orange' }}>{user.firstName + " " + user.lastName}</p></>}
                            {!user.success && <div className='d-flex flex-row'>
                                <Link to='/register'><button className='btn text-white ml-5 mt-2 px-3 mx-3  font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Register</button></Link>
                                <Link to='/signin'><button className='btn text-white px-3 mt-2 font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Sign in</button></Link>
                            </div>} */}
                        </div>
                    </div>
                </div>
                <hr className='hrFull' />
                <br />
                <div className='container'>
                    {data.length > 0 && <>
                        <h1 className='text-dark'>{data[0].property_name} @{data && data[0].locality}</h1>
                        <div className='d-flex flex-row'>
                            <p><i class="fa fa-star text-warning" aria-hidden="true"></i></p>
                            <p className='mx-3 text-secondary'>{data.length > 0 && data[0].rating}({review && review.length})</p>
                            <p className="mx-1">. {`${data[0].city}, ${data[0].state}, ${data[0].country}`}</p>
                        </div></>}
                    <div className="row my-3">
                        <div className="col-6 p-2">
                            <img className="img-fluid detCard" src={data.length > 0 && data[0].image[0]} />
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[1]} /></div>
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[2]} /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[3]} /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src={data.length > 0 && data[0].image[4]} /></div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-7'>
                            {data.length > 0 && <>
                                <h2>{data[0].accomodation_type}</h2>
                                <p>{data[0].guest}+ . guests . {data[0].bedroom} bedrooms</p>
                                <hr className='hrFull' />
                            </>}
                            {/* second part */}
                            <div className='row'>
                                <div className='col-1'>
                                    <button>
                                        <i class="fas fa-home" style={{ color: 'orange' }}></i>
                                    </button>
                                </div>
                                <div className='col-11'>
                                    <h5 className="font-weight-bold">Enitre locality</h5>
                                    <p className='text-muted'>You’ll have the serviced apartment to yourself.</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-1'>
                                    <button>
                                        <i class="fas fa-map-marker" style={{ color: 'orange' }}></i>
                                    </button>
                                </div>
                                <div className='col-11'>
                                    <h5 className="font-weight-bold">Great location</h5>
                                    <p className='text-muted'>94% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-1'>
                                    <button>
                                        <i class="far fa-calendar-alt" style={{ color: 'orange' }}></i>
                                    </button>
                                </div>
                                <div className='col-11'>
                                    <h5 className="font-weight-bold">Free cancellation policy</h5>
                                </div>
                            </div>
                            <hr />
                            <br />
                            <div className='my-3'>
                                <h4>{data.length > 0 && data[0].description}</h4>

                            </div>
                            <hr />
                            <br />
                            <div className='my-3'>
                                <h4 className='font-weight-bold ml-3'>{data.length > 0 && "Amenities"}</h4>
                                <div className='row'>
                                    <div className='col-4 offset-1 fontSizeAmenities'>
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
                                            <i className='px-3 fas fa-smoking-ban'></i>
                                            {data.length > 0 && data[0].aminities.no_smoking == 1 ? <span >No Smoking</span> : <span style={{ textDecoration: "line-through" }}>No Smoking</span>}
                                        </div>
                                        <div className='my-2'>
                                            <i className='px-3 far fa-snowflake'></i>
                                            {data.length > 0 && data[0].aminities.parking == 1 ? <span >Parking</span> : <span style={{ textDecoration: "line-through" }}>Parking</span>}
                                        </div>

                                    </div>
                                    <div className='col-4 offset-2 fontSizeAmenities'>
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
                            <hr />
                            <br />
                            <div className='mt-3'>
                                <h4 className='font-weight-bold'>Select checkout date</h4>
                                <small>Minimum stay: 2 nights</small>
                                <DayPicker numberOfMonths={2} />;
                            </div>

                        </div>
                        <div className="col-5 ">
                            <div className="row p-2 ml-3 border" >
                                <div className="col-6 d-flex flex-row">
                                    <i class="fas fa-rupee-sign text-warning mx-2 mt-1 "></i> <span><h5 className='font-weight-bold mx-2'>{data.length > 0 && data[0].price}</h5></span>  <span className='mx-2'> /night</span>
                                </div>
                                {/* <div className="col-6">
                                    <i class="fa fa-star text-warning  mr-1" aria-hidden="true"></i>
                                </div> */}
                                <div className='mt-4 ml-5 border dateGuest ml-5'>
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
                                                <span className="font-weight-bold">Guests</span>
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
                                        {bookingRes && bookingRes.error && <> <h5>{bookingRes.message }</h5> <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button></>}
                                        {!bookingRes && !dateFlag && <>  <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button></>}

                                    </div>
                                    <div className='ml-5'>
                                        {/* {data.length>0 && startDate && endDate && <Link to={`/payment/tripping/?id=${data[0].property_id}&property_name=${data[0].property_name}&check_in=${startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()}&check_out=${endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()}&country=${data[0].country}&state=${data[0].state}&locality=${data[0].locality}&area=${data[0].area}&accomodation=${data[0].accomodation_type}`}  ><button className="btn btn-block reserve" >Reserve</button></Link>} */}
                                        {/* {!dateFlag && <button className="btn btn-block  reserve " onClick={() => this.handleAvailabity()}>Check Availability</button>} */}
                                        {bookingRes && !bookingRes.error && <> <h5 className="text-success">{bookingRes.message}</h5>  <Link to={`/payment/tripping/?id=${data[0].property_id}&property_name=${data[0].property_name}&check_in=${startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()}&check_out=${endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()}&country=${data[0].country}&state=${data[0].state}&locality=${data[0].locality}&area=${data[0].area}&accomodation=${data[0].accomodation_type}`}  ><button className="btn btn-block reserve" >Reserve</button></Link></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='hrFull' />
                    <div className='my-5'>

                        <h4 className='font-weight-bold'> <i class="fa fa-star text-warning mx-2" aria-hidden="true"></i> {data.length > 0 && data[0].rating} ({review.length > 0 && review.length} reviews)</h4>
                        <div className='row'>

                            {review?.map((elem, i) => <div className='col-6 my-2'>
                                <div className='d-flex flex-row'>
                                    <img src="/revIcon.jpeg" className='w-10 h-5' style={{ borderRadius: "50%" }} />
                                    <div className='ml-3 mt-2 text-secondary'>
                                        <small style={{ fontSize: '20px' }}>{elem.first_name}</small>
                                        <br />
                                        <small>{elem.reviewed_at.substring(0, 16)}</small>

                                    </div>
                                </div>
                                <div>
                                    <h5 className='my-2'>{elem.review}</h5>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    {/* <hr className='hrFull' /> */}
                    {/* <div className='my-2'>

                            {data && <MapComponent data={data} /> }

                    </div> */}
                    <hr className='hrFull' />
                    <div className='my-5'>
                        <h4 className='font-weight-bold'>Recommendations</h4>
                        <div className='row'>
                            {recommendations?.filter((elem, i) => i < 6 && elem).map((item, i) => {
                                return (
                                    <div key={item.property_id} className="col-4 my-2">
                                        <div className="card" >
                                            <img src={item.image[0]} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h3 className="card-title">{item.property_name}</h3>
                                                <div className='d-flex flex-row card-text'>
                                                    <span className='font-weight-bold mx-2'>price: $</span>
                                                    <span>{item.price}</span>
                                                    <span className='font-weight-bold mx-2'>Rooms: </span> <span>{item.total_room}</span>
                                                    <span className='font-weight-bold mx-2'>City: </span> <spam>{item.city}</spam>
                                                </div>

                                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            // <div>hi</div>
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
    getBookingRequest: (payload) => dispatch(getBookingRequest(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(TempCard)

