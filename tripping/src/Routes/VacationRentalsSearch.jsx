import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'
import {connect} from 'react-redux'
import Amenities from '../Components/FilterComponents/Amenities'
import SearchBar  from '../Components/SearchBar/SearchBar'
import { getDataFromAPI, changeFreeCancellation } from '../Redux/SearchApi/Action'


 class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    componentDidMount() {
        let {history, match, getDataFromAPI} = this.props
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
            getDataFromAPI(match.params.name)
     
    }



    // let {history, push} = this.props
    

    // async componentDidMount() {
        
    //     this.setState({ data: res.data.result })
    // }
    render() {
        let { data } = this.state
        let {history} = this.props
        
        return (
            <div className='container-fluid'>
                

                <SearchBar />
                <FileNavBar history = {history} />
                {
                    data?.map(elem => <CardComponent key={elem.id} bedrooms={elem.bedroom} guest={elem.guest} hotel_name={elem.hotel_name} country={elem.country} state={elem.state} img={elem.image} rating={elem.rating} price={elem.price} loaction={elem.locality} />)
                }
                {/* <Amenities /> */}
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
    data:state.data.data
})
const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (payload) => dispatch(getDataFromAPI(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(VacationRentalsSearch)
