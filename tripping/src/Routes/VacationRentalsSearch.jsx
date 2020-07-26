import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import { connect } from 'react-redux'
import SearchLogo from '../Components/FilterComponents/SearchLogo'
import { getDataFromAPI} from '../Redux/SearchApi/Action'
import querystring from 'query-string'


class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let { getDataFromAPI } = this.props
        let { loc,free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)
        let x = Object.keys(values)
        if (x.length == 0) {
            getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        } else {
            for (var key in values) {
                if (key == "location") {
                    loc = values[key]
                } 
                 else if (key == "free_cancellation") {
                    free_cancellation = Number(values[key])
                }
                 else if (key == "rating") {
                    rating = Number(values[key])
                }
                else if(key=='guest'){
                    guest = Number(values[key])
                }
                else if(key=='bedroom'){
                    bedroom = Number(values[key])
                }
            }
            getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        }
        // history.push(`?free_cancellation=${free_cancellation}`)
    }


    //     componentWillReceiveProps() {
    //         let { history, match, getDataFromAPI } = this.props
    //         let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
    //         console.log( country,free_cancellation, 'calling receive props')


    //         const values = querystring.parse(this.props.location.search)
    // console.log(values)
    //         // let x = match.params.name
    //         getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)
    //     }

    // shouldComponentUpdate() {
    //     let { history, match, getDataFromAPI } = this.props
    //     let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
    //     console.log( country,free_cancellation)
    // }




    render() {
        // let { data } = this.state
        let { history, data, location } = this.props
        // const values = querystring.parse(this.props.location.search)
        // console.log(values)

        return (
            <>
                <SearchLogo />
                <div className='container-fluid border-top '>
                    {/* <SearchBar /> */}

                    <div className='col-6'>
                        <FileNavBar history={history} location={location} />
                        <div className='row'>
                            {
                                data ? data.map(elem => <CardComponent key={elem.id}
                                    bedrooms={elem.bedroom}
                                    guest={elem.guest}
                                    hotel_name={elem.hotel_name}
                                    country={elem.country}
                                    state={elem.state} img={elem.image}
                                    rating={elem.rating}
                                    price={elem.price}
                                    loaction={elem.locality} />
                                )
                                    : <div>Sorry Data not found</div>

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
