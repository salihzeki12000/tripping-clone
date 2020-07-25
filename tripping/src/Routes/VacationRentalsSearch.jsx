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

    // let {history, push} = this.props
    

    // async componentDidMount() {
        
    //     this.setState({ data: res.data.result })
    // }
    render() {
        let { data } = this.state
        let {history} = this.props
        console.log(history)
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
