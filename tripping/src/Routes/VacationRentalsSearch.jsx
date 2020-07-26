import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import CarouselCard from '../Components/Card/CarouselCard'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'
import { connect } from 'react-redux'
import Amenities from '../Components/FilterComponents/Amenities'
import SearchLogo from '../Components/FilterComponents/SearchLogo'
import { getDataFromAPI, changeFreeCancellation } from '../Redux/SearchApi/Action'
import querystring from 'query-string'


class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    componentDidMount() {
        let { history, match, getDataFromAPI } = this.props
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        console.log( country,free_cancellation, 'calling')


        const values = querystring.parse(this.props.location.search)
console.log(values)
let x = Object.keys(values)

  
        // let x = match.params.name
        if(x.length == 0) {

            getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)
        }else {

            console.log('enter in else')
            for(var key in values) {
                if(key == "country") {
                    country= values[key]
                }else if(key == "state") {
                    state= values[key]
                }else if(key == "free_cancellation") {
                    free_cancellation= Number(values[key])
                }
                
                getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)
            }
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
        let { history, data , location} = this.props
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
    country: state.data.country,
    state: state.data.state,
    city: state.data.city,
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
    getDataFromAPI: (country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
})


export default connect(mapStateToProps, mapDispatchToProps)(VacationRentalsSearch)
