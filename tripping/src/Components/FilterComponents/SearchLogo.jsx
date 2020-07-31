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
            region: this.props.location,
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
        console.log(this.props.location, region)
        return (
           
            <>
                <div className='row'>
                    <div className='p-2 pl-4'>
                        <Link to='/'><img src='/logo1.png' alt='/' width='70px' height='25px' /></Link>
                    </div>
                    <div className=' border-left p-2 pl-4 pr-4' onClick={() => this.handleLocation()} >
                        <div className='float-left '>
                            {/* Berlin */}
                            <i className="fa fa-search text-secondary px-3"></i>
                            <input type='text'
                                value={this.props.location}
                                className=''
                                style={{ border: "0px solid" }}
                                placeholder="Enter location"
                                onChange={(e) => this.setState({ region: e.targetvalue })} 
                                style={{fontWeight:"lighter" , border: '0px solid'}}
                            />
                        </div>
                    </div>


                    <div className=''>
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
                    <div className='col-1 border-right' onClick={() => this.handleGuests()}>
                        <div className="row">
                            <div className='col-10 text-center mt-2'>
                                <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                                <small className='font-weight-lighter ml-2'>{guestCounter} guests</small>
                            </div>
                            <div className=' mt-2'>
                                {guestsFlag ? <i class="fa fa-angle-up" aria-hidden="true"></i> : <i class="fa fa-angle-down" aria-hidden="true"></i>}

                            </div>
                        </div>
                    </div>
                    {/* <div className='col-1 border-bottom' onClick={() => this.handleSearch()}>
                        <div className="" style={{ backgroundColor: "orange", color: "white" }}>search</div>
                    </div> */}
                </div>
            </>

        )
    }
}
