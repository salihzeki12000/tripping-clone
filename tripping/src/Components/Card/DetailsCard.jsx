import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Modal from 'react-modal';
import CounterComponent from './CounterComponent';

Modal.setAppElement('#root');
class DetailsCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            click: false,
            open: false,
            counter: false
        }
    }

    handleClick = ()=>{
        let {click,counter} = this.state
        this.setState({
            click:!click,
            counter:!counter
        })
    }
    render() {
        let {user} = this.props;
        let { startDate, endDate, click,open,counter} = this.state
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
                        <button className='col-3 offset-2  border ml-5 shadow-sm inputDiv' contenteditable="true">
                            <i class="fa fa-search text-warning px-2"></i>
                        Add a location
                    </button>
                        {/* Modal */}
                        <div className='col-3 offset-2 ml-5'>
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
                    <h1 className='text-dark'>Apartment in Bengaluru</h1>
                    <div className='d-flex flex-row'>
                        <p><i class="fa fa-star text-warning" aria-hidden="true"></i></p>
                        <p className='mx-3 text-secondary'>4.77(52)</p>
                        <p className="mx-1">.</p>
                    </div>
                    <div className="row my-3">
                        <div className="col-6 p-2">
                            <img className="img-fluid detCard" src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXA7cZfSiDCpTVCQOniurqXnoMW5WY44RBmQ&usqp=CAU" /></div>
                                <div className="col-6 pt-2"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhFXUSMNjdiI_PESAiX1ou5IhOw0DwGufm6g&usqp=CAU" /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQN26rpwgMGFDRR8pa5VnxwYmsp4zxOzOmUOQ&usqp=CAU" /></div>
                                <div className="col-6 pt-2 mt-3"> <img className="img-fluid childCard" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSv35EAXq1avsPX49Q75KW2kLlOrVvAwb3mmQ&usqp=CAU" /></div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7'>
                            <h2>Entire Apartment hosted by Masai</h2>
                            <p>16+ guests . 2 bedroom . 2  bed . 4 bathrooms</p>
                            <hr className='hrFull' />

                            {/* second part */}
                            <div className='row'>
                                <div className='col-1'>
                                    <button>
                                        <i class="fas fa-home" style={{ color: 'orange' }}></i>
                                    </button>
                                </div>
                                <div className='col-11'>
                                    <h5 className="font-weight-bold">Enitre home</h5>
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
                                    <h5 className="font-weight-bold">Free cancellation until Jul 27</h5>
                                    <p className='text-muted'>After that, cancel before 3:00 PM on Aug 3 and get a 50% refund, minus the service fee.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="row ml-5" style={{ border: '1px solid gray', width: '330px' }}>
                                <div className="col-6">
                                    <i class="fas fa-dollar-sign text-warning mr-1"></i>200 /night
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
                                                <p>{1} guests</p>
                                            </div>
                                            <div className="col-6">
                                                {click ? <i class="fa fa-angle-up text-warning" aria-hidden="true"></i> : <i class="fa fa-angle-down text-warning" aria-hidden="true"></i>}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.signup.user
})

export default connect(mapStateToProps)(DetailsCard)
