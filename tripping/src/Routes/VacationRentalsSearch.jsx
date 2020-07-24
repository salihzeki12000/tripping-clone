import React, { Component } from 'react'
import  CardComponent from '../Components/Card/CardComponent'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import axios from 'axios'

export default class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
         this.state = {
             data:[]
         }

    }

    componentDidMount(){
        axios.get("sddds")
        .then(res => res.data)
        .then(res => this.setState({
            data:[...data, res.result]
        }))
}

    render() {
        let {data} = this.state
        return (
            <div className='container-fluid'>
                <FileNavBar />
                {
                    data?.map(elem => <CardComponent item={elem} />)
                }
                {/* <CardComponent /> */}
            </div>
        )
    }
}
