import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import './react-dates-overrides.css';
import GuestManager from './GuestManager';
import { getDataFromAPI } from '../../Redux/SearchApi/Action'
import Autocomplete from 'react-google-autocomplete';
import {DatesData} from '../../Redux/SearchBar/action'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            region: null,
            guests: '',
            locationFlag: false,
            guestsFlag: false,
            startDay: null,
            startMonth: null,
            startYear: null,
            endDay: null,
            endMonth: null,
            endYear: null,
            dateFlag:true,
        
        }
    }

    handleClear = () => {
        this.setState({ region: '' })
    }
    handleChange = (event) => {
        this.setState({ region: event.target.value });
    }

    handleLocation = () => {
        this.setState({
            locationFlag: !this.state.locationFlag
        })
    }

    handleGuests = () => {
        this.setState({
            guestsFlag: !this.state.guestsFlag
        })
    }

   

    render() {

        let { locationFlag, guestsFlag, region, guests, startDate, endDate, startDay, startMonth, dateFlag } = this.state
        let { guestCounter, bedroomCounter } = this.props;
      
         
     if(region) {
            
            var location = region.split(',')
            location = location[0]
         }
        // console.log( location , 'render-loc')
        return (

            <div className="container-fluid-md container-lg">
                <div className='mt-5 mx-5 fontSizeText'>

                    <div className="d-flex flex-row" >
                        <div className="row">
                            <div className='borderDiv col-md-4 col-12 rounded-left border' onClick={() => this.handleLocation()} >
                            
                                <Autocomplete
                                    className="input mt-2 p-1 py-2"
                                    style={{ width: '100%', border: 'none', fontSize: "20px" }}
                                    value={region}
                                    onChange={(e) => this.setState({ region: e.target.value })}
                                    onPlaceSelected={(place) => {
                                        //console.log(place);
                                        this.setState({ region: place.formatted_address})
                                    }}
                                    types={['(regions)']}
                                    // componentRestrictions={{ country: "us" }}
                                />
                            </div>
                            <div className='Date_div col-md-5 col-12 border' style={{ width: "200px" }}>
                                <DateRangePicker
                                    className='CalendarDay__selected CalendarDay__selected_span'
                                    startDate={startDate}
                                    startDateId="your_unique_start_date_id"
                                    endDate={endDate}
                                    endDateId="your_unique_end_date_id"
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate, dateFlag:false })}
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                                />
                            </div>
                            <div className='borderDiv col-md-2 col-12 border' onClick={() => this.handleGuests()}>
                                <div className='float-left ml-2 mt-2 '>
                                    <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                                    <span className='mx-4'>{guestCounter} guests</span>
                                </div>
                                <div className='float-right mt-2' >
                                    {guestsFlag ? <i class="fa fa-angle-up" aria-hidden="true"></i> : <i class="fa fa-angle-down" aria-hidden="true"></i>}

                                </div>
                            </div>
                            <div className='searchDiv col-md-1 col-12  px-4 rounded-right text-center' >
                                {dateFlag && <Link to={`/vacation-rentals/s/search?location=${location}&check_in=${''}&check_out=${''}&guest=${guestCounter}&bedroom=${bedroomCounter}&rating=${''}&aminities=${''}&page=${''}&per_page=${''}&accomodation_type=${''}&free_cancellation=${''}&price=${''}`}>

                                    <i class="fa fa-search text-white mt-3 "  style={{ fontSize: "20px" }}></i>
                                </Link>}

                                {startDate && endDate && <Link to={`/vacation-rentals/s/search?location=${location}&check_in=${startDate._d.getFullYear() + "-" + (1 + Number(startDate._d.getMonth())) + "-" + startDate._d.getDate()}&check_out=${endDate._d.getFullYear() + "-" + (1 + Number(endDate._d.getMonth())) + "-" + endDate._d.getDate()}&guest=${guestCounter}&bedroom=${bedroomCounter}&rating=${''}&aminities=${''}&page=${''}&per_page=${''}&accomodation_type=${''}&free_cancellation=${''}&price=${''}`}>
                                    <i class="fa fa-search text-white mt-3 " onClick={() => this.handleSearch()} style={{ fontSize: "20px" }}></i>

                                </Link>
                                }
                            </div>


                        </div>
                    </div>

                </div>
              
                <div className="absolute">
                    {guestsFlag && <GuestManager />}
                </div>
            
            </div>

        )
    }

}


const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter: state.search.bedroomCounter,
 
})

const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (loc, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
    DatesData: payload => dispatch(DatesData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
