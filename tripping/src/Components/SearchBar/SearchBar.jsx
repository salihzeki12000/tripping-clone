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
            guests: ''
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
                            <input type="" className="input" />
                            <button className="searchButton"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRog427SkOhZnmexmI25hTPaR70YsPJ3V0I2g&usqp=CAU' className="search" /></button>
                            <GuestManager className="ml-5" />
                        </span>
                        <img src="" alt=""></img>
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