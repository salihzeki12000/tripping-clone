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

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            region: '',
            guests: '',
            locationFlag: false,
            guestsFlag: false,
            startDay:null,
            startMonth:null, 
            startYear:null,
            endDay:null,
            endMonth:null, 
            endYear:null
        }
    }

    handleClear = ()=>{
        this.setState({region:''})
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

    handleSearch = () => {
        let { getDataFromAPI, guestCounter, bedroomCounter } = this.props
        let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        let { region } = this.state
        // if (x.length == 0) {
        //     getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        // }
        // else {
        //     for (var key in values) {
        //         if (key == "location") {
        //             loc = values[key]
        //         }
        //         else if (key == "free_cancellation") {
        //             free_cancellation = Number(values[key])
        //         }
        //         else if (key == "rating") {
        //             rating = Number(values[key])
        //         }
        //     }
        // bedroom = bedroomCounter
        // guest = guestCounter
        // loc = region
        // getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
    }

    render() {

        let { locationFlag, guestsFlag, region, guests, startDate, endDate, startDay, startMonth } = this.state
        let { guestCounter, bedroomCounter } = this.props;
        console.log(region)
        console.log(guestCounter, bedroomCounter)
        // console.log(startDate._d.getDay,startDate._d.getMonth, startDate._d.getfullYear , endDate)
        console.log(startDay, startMonth)
        if(startDate && endDate) {
            console.log(startDate._d.getDate(),startDate._d.getMonth(), startDate._d.getFullYear() , endDate._d.getDate(),endDate._d.getMonth(), endDate._d.getFullYear() ,)
        }
        return (

            <div className="container-fluid-md container-lg">
                {/* <div className='mt-5 mx-5 fontSizeText'>

                    <div className="d-flex flex-row" >
                        <div className="row">
                            <div className='borderDiv col-md-4 col-12 rounded-left border' onClick={() => this.handleLocation()} >
                                <input type='text'
                                    value={region}
                                    className="text-left ml-2 p-2 inputfontSize"
                                    placeholder="Enter Country and Region"
                                    style={{ border: '0px solid' }}
                                    onChange={this.handleChange} />
                            </div>
                            <div className='Date_div col-md-5 col-12 border' style={{ width: "200px" }}>
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
                            <Link to={`/vacation-rentals/s/search?location=${region}&guest=${guestCounter}&bedroom=${bedroomCounter}`}>
                                <div className='searchDiv col-md-1 col-12  px-4 rounded-right text-center' >
                                    <i class="fa fa-search text-white mt-3" onClick={() => this.handleSearch()} style={{ fontSize: "20px" }}></i>
                                </div>
                            </Link>

                        </div>
                    </div> */}

                {/* </div> */}
                <div className="ml-5">
                    <div className="divContainer ml-5 mt-5">
                        <div className="border ml-5 regionDiv" onClick={() => this.handleLocation()}>
                            <input
                                placeholder="Enter a location"
                                className="input mt-2 p-1"
                                value={region}
                                onChange={this.handleChange}
                            />
                            <i class="fas fa-times cross" onClick={this.handleClear}></i>
                        </div>
                        <div className="border">
                            <DateRangePicker
                                startDate={startDate}
                                startDateId="your_unique_start_date_id"
                                endDate={endDate}
                                endDateId="your_unique_end_date_id"
                                onDatesChange={({ startDate, endDate }) => this.setState({startDate,endDate})}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })}
                            />
                        </div>
                        <div className="border guests text-center" onClick={this.handleGuests}>
                            <i class="fas fa-male mt-2 ml-2 mr-1 float-left mt-3"></i>
                            <p className="guests mt-2"> {guestCounter} guests</p>
                        </div>
                        { startDate && endDate &&
                        <Link to={`/vacation-rentals/s/search?location=${region}&check_in=${startDate._d.getFullYear() +"-" +  (1 + Number(startDate._d.getMonth()))+"-" + startDate._d.getDate()  }&check_out=${endDate._d.getFullYear() +"-" +  (1 + Number(endDate._d.getMonth()))+"-" + endDate._d.getDate()  }&guest=${guestCounter}&bedroom=${bedroomCounter}`}>
                            <div className="border">
                                <button className="btn btn-block search" onClick={() => this.handleSearch()}><i className="fas fa-search text-white"></i></button>
                            </div>
                        </Link>
    }
                    </div>
                    <div className="absolute">
                        {guestsFlag && <GuestManager />}
                    </div>
                    {/* <div className='row mx-4 '>
                        {
                            locationFlag && <div className='col-3'>
                                <div className='borderDivDown mt-1 text-secondary bg-white'>
                                    <p className='text-left ml-3 pt-3'>Recent Searches</p>
                                </div>
                            </div>
                        }
                    </div> */}
                </div>
            </div>

        )
    }

}


const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter: state.search.bedroomCounter,
    loc: state.data.loc,
    free_cancellation: state.data.free_cancellation,
    rating: state.data.rating,
    bedroom: state.data.bedroom,
    guest: state.data.guest,
    sort: state.data.sort,
    price: state.data.price,
    aminities: state.data.aminities,
    data: state.data.data
})

const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (loc, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
