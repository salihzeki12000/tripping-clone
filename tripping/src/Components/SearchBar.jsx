import React, { Component } from 'react';
import './SearchBar.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react_dates_overrides.css';
import GuestManager from './GuestManager.jsx'

export class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null
        }
    }

    render() {
        return (
            <div className='background'>
                <div className='div'>
                    <h1 className='text'>Search Top Vacation Rental Sites</h1>
                    <p className='text'>Compare and save on vacation homes and short-term rentals in 190 countries</p>
                    <div>
                        <input type="text" className="input buttonIn location" placeholder="Enter City or Region" />
                        <img src="https://icons8.com/icon/95867/multiply" alt='' className="btn svg"></img>
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
                        <span>
                            <input type="text" className="input" />
                            <GuestManager className="ml-5" />
                        </span>
                        <img src="" alt=""></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar
