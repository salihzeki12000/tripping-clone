import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'
import Amenities from '../Components/FilterComponents/Amenities'
import SearchBar  from '../Components/SearchBar/SearchBar'

export default class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    async componentDidMount() {
        let res = await axios.get("http://f94f36504f6f.ngrok.io/search/s")
        this.setState({ data: res.data.result })
    }
    render() {
        let { data } = this.state
        console.log(data)
        return (
            <div className='container-fluid'>
                

                <SearchBar />
                <FileNavBar />
                {
                    data?.map(elem => <CardComponent key={elem.id} bedrooms={elem.bedroom} guest={elem.guest} hotel_name={elem.hotel_name} country={elem.country} state={elem.state} img={elem.image} rating={elem.rating} price={elem.price} loaction={elem.locality} />)
                }
                {/* <Amenities /> */}
            </div>
        )
    }
}
