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
import { getImageRequest, getDataRequest, getReviewRequest, getRecommendRequest } from '../../Redux/EntityAPI/Action'
import querystring from 'query-string';
import SearchBar from '../SearchBar/SearchBar';

Modal.setAppElement('#root');
class DetailsCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            click: false,
            open: false,
            counter: false,
        }
    }

//     componentDidMount() {
// console.log('enter')
//         const values = querystring.parse(this.props.location.search)

//         console.log(values)

//         const { getImageRequest, getDataRequest, getReviewRequest } = this.props

//         getImageRequest(Number(values.id))
//         getDataRequest({id:Number(values.id), room_type: values.accomodation })
//         getReviewRequest(Number(values.id))
//         getRecommendRequest({id:Number(values.id), room_type: values.accomodation })

    
//     }

//    componentDidMount() {
//        console.log('enter')
//    }

    handleClick = () => {
        let { click, counter } = this.state
        this.setState({
            click: !click,
            counter: !counter
        })
    }

    // changing the styling of the calendar

    // modifiers={modifiers}
    // modifiersStyles={modifiersStyles}  ---> in Daypicker component

    // const modifiers = {
    //     thursdays: { daysOfWeek: [4] },
    //     birthday: new Date(2018, 9, 30),
    //   };
    //   const modifiersStyles = {
    //     birthday: {
    //       color: 'white',
    //       backgroundColor: '#ffc107',
    //     },
    //     thursdays: {
    //       color: '#ffc107',
    //       backgroundColor: '#fffdee',
    //     },
    //   };

render() {
        let { user, images, review, data, recommendations, guestCounter } = this.props;
        let { startDate, endDate, click, open, counter} = this.state
        console.log(images, data, review)
        // console.log(this.props.location.search)

        // let { accomodation_type, aminities, area, bedroom, city, country, descrption, guest, hotel_name, rating, locality, price, room_type, state } = data[0]  
        // let {air_conditioning, internet, kitchen, no_smoking, parking, pet_allwed, pool, smoking, tv} = aminities
  
        return (
            <div className="container-fluid">
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
                                <div className="text-center" style={{marginLeft:'100px'}}>
                                    <p className="float-left ml-5 mr-2 font-weight-bold" style={{marginLeft:'100px'}}>Places to stay</p>
                                    <p className="float-left mr-2 font-weight-bold">Monthly stays</p>
                                    <p className="float-left font-weight-bold">Experiences</p>
                                </div>
                                <SearchBar />
                            </Modal>
                        </div>

                        {/* Modal */}
                        <div className='col-3 offset-4 ml-5'>
                            {user.success && <>  <img src={user.image} width='50px' height='50px' style={{ borderRadius: '50%' }} /><p style={{ fontSize: '25px', color: 'orange' }}>{user.firstName + " " + user.lastName}</p></>}
                            {!user.success && <div className='d-flex flex-row'>
                                <Link to='/register'><button className='btn text-white ml-5 mt-2 px-3 mx-3  font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Register</button></Link>
                                <Link to='/signin'><button className='btn text-white px-3 mt-2 font-weight-bold' style={{ backgroundColor: "#FB8C00" }}>Sign in</button></Link>
                            </div>}
                        </div>
                    </div>
                </div>
                <hr className='hrFull' />
                <br />
                <div className='container'>
        <h1 className='text-dark'>{data[0].hotel_name} @{data[0].locality}</h1>
                    <div className='d-flex flex-row'>
                        <p><i class="fa fa-star text-warning" aria-hidden="true"></i></p>
                        <p className='mx-3 text-secondary'>{rating}(32)</p>
        <p className="mx-1">. {`${city}, ${state}, ${country}`}</p>
                    </div>
                    <div className="row my-3">
                        <div className="col-6 p-2">
                            <img className="img-fluid detCard" src={images[0]} />
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src={images[1]} /></div>
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src={images[2]} /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src={images[3]} /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src={images[4]} /></div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7'>
        <h2>{accomodation_type}, {room_type}</h2>
                            <p>{guest}+ . guests . {bedroom} bedrooms</p>
                            <hr className='hrFull' />

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
        <h5 className="font-weight-bold">Free cancellation until {Date.toString()}</h5>
                                    <p className='text-muted'>After that, cancel before 3:00 PM on Aug 3 and get a 50% refund, minus the service fee.</p>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h4 className='font-weight-bold'>Select checkout date</h4>
                                <small>Minimum stay: 2 nights</small>
                                <DayPicker numberOfMonths={2} />;
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="row ml-5" style={{ border: '1px solid gray', width: '330px' }}>
                                <div className="col-6">
                                    <i class="fas fa-dollar-sign text-warning mr-1"></i>{price} /night
                            </div>
                                <div className="col-6">
                                    <i class="fa fa-star text-warning ml-4 mr-1" aria-hidden="true"></i>4.66(29)
                            </div>
                                <div className='Date_div col-12 border mt-2'>
                                    <DateRangePicker
                                        className='CalendarDay__selected CalendarDay__selected_span'
                                        startDate={startDate}
                                        startDateId="your_unique_start_date_id"
                                        endDate={endDate}
                                        endDateId="your_unique_end_date_id"
                                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                        focusedInput={this.state.focusedInput}
                                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                                    />
                                </div>
                                <div>
                                    <button className="angleDown" onClick={this.handleClick}>
                                        <div className="row">
                                            <div className="col-6">
                                                <p className="font-weight-bold">Guests</p>
                                                <p>{guestCounter} guests</p>
                                            </div>
                                            <div className="col-6">
                                                {click ? <i class="fa fa-angle-up text-warning" aria-hidden="true"></i> : <i class="fa fa-angle-down text-warning" aria-hidden="true"></i>}
                                            </div>
                                        </div>
                                    </button>
                                    <div>
                                        {counter && <CounterComponent clickHandler={this.handleClick} />}
                                    </div>
                                    <div>
                                        <button className="btn btn-block reserve">Reserve</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='hrFull' />
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
    recommendations:state.entity.recommendations
})

const mapDispatchToProps = dispatch => ({
    getImageRequest: (payload) => dispatch(getImageRequest(payload)),
    getDataRequest: (payload) => dispatch(getDataRequest(payload)),
    getReviewRequest: (payload) => dispatch(getReviewRequest(payload)),
    getRecommendRequest: (payload) => dispatch(getRecommendRequest(payload))

})

export default connect(mapStateToProps, mapDispatchToProps)(DetailsCard)
