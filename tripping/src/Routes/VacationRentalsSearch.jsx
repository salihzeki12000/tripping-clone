import React, { Component } from 'react'
import CarouselCard from '../Components/Card/CarouselCard'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import { connect } from 'react-redux'
import SearchLogo from '../Components/FilterComponents/SearchLogo'
import { getDataFromAPI} from '../Redux/SearchApi/Action'
import querystring from 'query-string'


class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loc:''
        }
    }

    componentDidMount() {
        let { getDataFromAPI } = this.props
        let { loc, check_in, check_out,free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)

        this.setState({
            loc: values.location
        })

        // let checkIn = values.check_in
        // console.log(checkIn)
        //  check_in = "2020-07-28"
        //  check_out = "2020-07-31"

        let x = Object.keys(values)
        if (x.length == 0) {
            getDataFromAPI(loc, check_in, check_out , free_cancellation, rating, bedroom, guest, sort, price, aminities)
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
                else if(key=='guest'){
                    guest = Number(values[key])
                }
                else if(key=='bedroom'){
                    bedroom = Number(values[key])
                }else if(key=='price'){
                    price = Number(values[key])
                }
                else if (key == "aminities") {
                    aminities = values[key]
                }else if(key == 'check_in') {
                    check_in = values[key]
                }else if(key == 'check_out') {
                    check_out = values[key]
                }
            }
            getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        }

        // history.push(`?free_cancellation=${free_cancellation}`)
    }


    render() {
        // let { data } = this.state
        let { history, data, location } = this.props
        // const values = querystring.parse(this.props.location.search)
        // console.log(values)
          // console.log(this.state.loc)
        return (
            <>

        
                <SearchLogo location={this.state.loc}  />
                <div className='container-fluid border-top '>
                    {/* <SearchBar /> */}

                    <div className='col-6'>
                        <FileNavBar history={history} location={location} />
                        <h2 className='text-center m-4'>{data.length ==0 && "Please wait Data is Loading..."}</h2>
                        <div className='row mt-5'>
                            {
                                data && data ? data.map(elem =>  <CarouselCard key={elem.id}
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
                                     room_type={elem.room_type} />
                                )
                                    :  <div>Sorry Data not found</div>

                                //    data ? data.map(elem => <CarouselCard />) : <div>Sorry Data not found</div>
                            }
                        </div>

                        {/* <Amenities /> */}
                    </div>

                </div>
            </>
        )
    }
}


const mapStateToProps = state => ({
    loc: state.data.loc,
    check_in:state.data.check_in,
    check_out:state.data.check_out,
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
