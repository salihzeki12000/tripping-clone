import React from 'react';
import { connect } from 'react-redux';
import './SearchBar.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react-dates-overrides.css';
import GuestManager from './GuestManager.jsx'


class SearchBar extends React.Component {
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
        let { guestCounter, bedroomCounter } = this.props;
        console.log(region)
        console.log(guestCounter, bedroomCounter)
        return (

            <div className="container-fluid-md container-lg">
                <div className='mt-5 mx-5 fontSizeText'>

                    <div className="d-flex flex-row" >
                        <div className="row">
                            <div className='borderDiv col-md-4 col-12 rounded-left border' onClick={() => this.handleLocation()} >
                                <input type='text'
                                    value={region}
                                    className="text-left ml-2 p-2 inputfontSize"
                                    placeholder="Enter Country and Region"
                                    style={{ border: '0px solid' }}
                                    onChange={(e) => this.setState({ region: e.targetvalue })} />
                            </div>
                            <div className='Date_div col-md-5 col-12 border' style={{width:"200px"}}>
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
                            <div className='borderDiv col-md-2 col-12 border' onClick={() => this.handleGuests()}>
                                <div className='float-left ml-2 mt-2 '>
                                    <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                                    <span className='ml-2'>{guestCounter} guests</span>
                                </div>
                                <div className='float-right mt-2' >
                                    {guestsFlag ? <i class="fa fa-angle-up" aria-hidden="true"></i> : <i class="fa fa-angle-down" aria-hidden="true"></i>}

                                </div>
                            </div>
                            <div className='searchDiv col-md-1 col-12 rounded-right'
                                onClick={() => this.handleSearch()}
                                // style={{ backgroundColor: "#FB8C00" }}
                            >
                                <i class="fa fa-search text-white p-3" style={{fontSize:"30px"}}></i>
                            </div>
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
                    <div className='col-3 offset-2'>

                    </div>

                    {guestsFlag && <div className='col-3  mt-1'>
                        <GuestManager />
                    </div>
                    }

                </div>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter: state.search.bedroomCounter
})


export default connect(mapStateToProps, null)(SearchBar)





