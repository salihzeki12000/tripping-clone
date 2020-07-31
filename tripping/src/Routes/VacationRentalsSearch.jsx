import React, { Component } from 'react'
import CarouselCard from '../Components/Card/CarouselCard'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import { connect } from 'react-redux'
import SearchLogo from '../Components/FilterComponents/SearchLogo'
import { getDataFromAPI } from '../Redux/SearchApi/Action'
import querystring from 'query-string';
import MapComponent from '../Components/MapComponent';
import { uuid } from 'uuidv4';

class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loc: '',
            check_in: '',
            check_out: '',
        }
    }

    componentDidMount() {
        let { getDataFromAPI } = this.props
        let { loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)

        this.setState({
            loc: values.location,
            check_in: values.check_in,
            check_out: values.check_out
        })

        // let checkIn = values.check_in
        // console.log(checkIn)
        //  check_in = "2020-07-28"
        //  check_out = "2020-07-31"

        let x = Object.keys(values)
        if (x.length == 0) {
            getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        } else {
            for (var key in values) {
                if (key == "location") {
                    loc = values[key]
                }
                else if (key == "free_cancellation") {
                    if (typeof (values[key]) != "number") {
                        free_cancellation = ''
                    } else {
                        free_cancellation = Number(values[key])
                    }
                }
                else if (key == "rating") {
                    rating = Number(values[key])
                }
                else if (key == 'guest') {
                    guest = Number(values[key])
                }
                else if (key == 'bedroom') {
                    bedroom = Number(values[key])
                } else if (key == 'price') {
                    price = Number(values[key])
                }
                else if (key == "aminities") {
                    aminities = values[key]
                } else if (key == 'check_in') {
                    check_in = values[key]
                } else if (key == 'check_out') {
                    check_out = values[key]
                }
            }
            getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        }

        // history.push(`?free_cancellation=${free_cancellation}`)
    }


    render() {
        let { history, data, location } = this.props
        if (data.length != 0) {
            console.log(data)
        }
        return (
            <>
                <SearchLogo location={this.state.loc} />
                <div className='container-fluid border-top row'>
                    <div className='col-lg-7 col-12 mt-2'>
                        <FileNavBar history={history} location={location} className="col-12" />
                        <hr className="col-12"></hr>
                        <div className='row'>

                            <small className="col-12"></small>
                            <small className='text-center col-12'>{data.length == 0 && "Please wait Data is Loading..."}</small>
                            {
                                data && data ? data.map(elem => <CarouselCard key={uuid()}
                                    city={elem.city}
                                    bedroom={elem.bedroom}
                                    accomodation_type={elem.accomodation_type}
                                    guest={elem.guest}
                                    property_name={elem.property_name}
                                    country={elem.country}
                                    state={elem.state} image={elem.image}
                                    rating={elem.rating}
                                    price={elem.price}
                                    locality={elem.locality}
                                    property_id={elem.property_id}
                                    area={elem.area}
                                    room_type={elem.room_type}
                                    check_in={this.state.check_in}
                                    check_out={this.state.check_out} />
                                )
                                    : <div><small>Sorry Data not found</small></div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-5 col-12" >
                        <MapComponent data={data} />
                    </div>
                </div>

            </>
        )
    }
}


const mapStateToProps = state => ({
    loc: state.data.loc,
    check_in: state.data.check_in,
    check_out: state.data.check_out,
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


export default connect(mapStateToProps, mapDispatchToProps)(VacationRentalsSearch)
