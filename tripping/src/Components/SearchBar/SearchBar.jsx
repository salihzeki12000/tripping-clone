import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react-dates-overrides.css';
import GuestManager from './GuestManager.jsx'


export class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            region: '',
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
        let { guestCounter } = this.props

        return (
            <div className='background'>
                <div className='div container text-center '>
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 className='text-white display-4 font-weight-bold mt-5' >Search Top Vacation Rental Sites</h1>
                    <p className='font-weight-bold text-white mt-2'>Compare and save on vacation homes and short-term rentals in 190 countries</p>
                    <div className='mt-5 mx-5 fontSizeText text-secondary'>

                        <div className="d-flex flex-row" >
                            <div className='borderDiv 'onClick={() => this.handleLocation()} >
                                <div className='float-left ml-3 mt-2'>
                                    Berlin
                               </div>
                                {/* <div className='mr-2 float-right mt-2' >
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </div> */}
                            </div>
                            <div className='borderDiv'>
                                <DateRangePicker
                                    className='CalendarDay__selected CalendarDay__selected_span'
                                    startDate={this.state.startDate}
                                    startDateId="your_unique_start_date_id"
                                    endDate={this.state.endDate}
                                    endDateId="your_unique_end_date_id"
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                                />
                            </div>
                            <div className='borderDiv' onClick={() => this.handleGuests()}>
                                <div className='float-left ml-3 mt-2'>
                                    <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                                    <span className='ml-2'>{guestCounter} guests</span>
                                </div>
                                <div className='float-right mr-3 mt-2'>
                                    {guestsFlag ? <i class="fa fa-angle-up" aria-hidden="true"></i> : <i class="fa fa-angle-down" aria-hidden="true"></i>}

                                </div>
                            </div>
                            <div className='searchDiv'>
                                <i class="fa fa-search text-white p-3" aria-hidden="true"></i>
                            </div>
                        </div>

                    </div>

                    <div className='row mx-4 '>
                        {locationFlag && <div className='col-3'>
                            <div className='borderDivDown mt-1 text-secondary'>
                                <p className='text-left ml-3 pt-3'>Recent Searches</p>
                            </div>
                        </div>
                        }
                        <div className='col-4 offset-3'>

                        </div>

                        {guestsFlag && <div className='col-3  mt-1'>
                            <GuestManager />
                        </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter: state.search.bedroomCounter
})
export default connect(mapStateToProps, null)(SearchBar);