import React, { Component } from 'react';
import './Components.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react_dates_overrides.css'

export class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: '',
            endDate: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Search Top Vacation Rental Sites</h1>
                <p>Compare and save on vacation homes and short-term rentals in 190 countries</p>
                <div>
                    <input type="text" className="input" placeholder="Enter City or Region" />
                        <DateRangePicker
                            className='CalendarDay__selected CalendarDay__selected_span '
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={this.state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({ focusedInput })}
                        />
                    <input type="text" className="input" />
                </div>
            </div>
        )
    }
}

export default SearchBar
