import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import CarouselCard from '../Components/Card/CarouselCard'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'
import { connect } from 'react-redux'
import Amenities from '../Components/FilterComponents/Amenities'
import SearchBar from '../Components/SearchBar/SearchBar'
import { getDataFromAPI, changeFreeCancellation } from '../Redux/SearchApi/Action'


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
        console.log(match.params.name, country)
        getDataFromAPI(country, match.params.name, city, free_cancellation, 2, guest, sort, price, aminities)

    }
    render() {
        let { history, data } = this.props
        return (
            <div className='container-fluid'>

                <div className='col-6'>
                    <SearchBar />
                    <FileNavBar history={history} />
                    <div className='row m-1'>
                        {
                            data?.map(elem => <CarouselCard className="col-4 m-2" bedroom={elem.bedroom} city={elem.city} country={elem.country} guest={elem.guest} hotel_name={elem.hotel_name} price={elem.price} state={elem.state} rating={elem.rating} image={elem.image} accomodation={elem.accomodation_type} />)
                        }
                    </div>

                </div>

            </div>
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
