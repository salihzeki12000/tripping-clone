import React, { Component } from 'react'
import CardComponent from '../Components/Card/CardComponent'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'

export default class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

    }

    async componentDidMount() {
        let res = await axios.get("http://94e1f8c3880d.ngrok.io/search/s")
        this.setState({ data: res.data.result })
    }
    render() {
        let { data } = this.state
        return (
            <div className='container-fluid'>
                <FileNavBar />
                {
                    data?.map(elem => <CardComponent key={elem.id} bedrooms={elem.bedroom} guest={elem.guest} hotel_name={elem.hotel_name} country={elem.country} state={elem.state} img={elem.image} rating={elem.rating} price={elem.price} loaction={elem.locality} />)
                }
            </div>
        )
    }
}
