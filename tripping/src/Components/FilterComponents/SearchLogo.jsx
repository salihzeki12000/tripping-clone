import React, { Component } from 'react'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom'


export default class SearchLogo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            region: 'New York',
            guests: '',
            locationFlag: false,
            guestsFlag: false
        }
    }

    handleLocation = () => {
        // console.log(this.state.locationFlag)
        this.setState({
            locationFlag: !this.state.locationFlag
        })
    }

    handleGuests = () => {
        // console.log(this.state.locationFlag)
        this.setState({
            guestsFlag: !this.state.guestsFlag
        })
    }
    render() {
        let { locationFlag, guestsFlag, region, guests, startDate, endDate } = this.state
        let { guestCounter, bedroomCounter } = this.props;
        return (
            <div className=''>
                <div className='d-flex flex-row'>
                    <div className=''>
                        <div class="navbar-brand">
                            <Link to='/'><img src='/logo.svg' alt='/' width='100px' height='100px' /></Link>
                        </div>
                    </div>
                    <div className='mt-5' onClick={() => this.handleLocation()} >
                        <div className='float-left '>
                            {/* Berlin */}
                            <input type='text' value={region} className='px-3 py-1 my-1' placeholder="Enter Country and Region" onChange={(e) => this.setState({ region: e.targetvalue })} />
                        </div>
                    </div>


                    <div className='mt-5'>
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
                    <div className='mt-5' onClick={() => this.handleGuests()}>
                        <div className=' ml-3 mt-2 '>
                            <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                            <span className=''>{guestCounter} guests</span>
                        </div>
                        <div className=' mt-2 '>
                            {guestsFlag ? <i class="fa fa-angle-up" aria-hidden="true"></i> : <i class="fa fa-angle-down" aria-hidden="true"></i>}

                        </div>
                    </div>
                    <div className='mt-3 ml-2 py-3' onClick={() => this.handleSearch()}>
                        {/* <i class="fa fa-search text-white p-3" aria-hidden="true"></i> */}
                        <div className="mt-5 ml-1 px-5 " style={{backgroundColor:"orange", color:"white"}}>search</div>
                    </div>
                </div>
            </div >
        )
    }
}
