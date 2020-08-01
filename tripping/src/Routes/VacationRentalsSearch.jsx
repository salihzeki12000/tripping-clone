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
            page: 1,
            per_page: 6,
            NoOFPages:[]
        }
    }

    componentDidMount() {
        let { getDataFromAPI } = this.props
        let { loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)

        this.setState({
            loc: values.location,
            check_in: values.check_in,
            check_out: values.check_out,
            // page: values.page,
            // per_page: values.per_page
        })

        // let checkIn = values.check_in
        // console.log(checkIn)
        //  check_in = "2020-07-28"
        //  check_out = "2020-07-31"
        // page = this.state.page
        // per_page = this.state.per_page
console.log(values.page, values.accomodation_type,  'search')
        let x = Object.keys(values)
        // if (x.length == 0) {
        //     getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page)
        // } else {
        //     for (var key in values) {
        //         if (key == "location") {
        //             loc = values[key]
        //         }
        //         else if (key == "free_cancellation") {
        //             if (typeof (values[key]) != "number") {
        //                 free_cancellation = ''
        //             } else {
        //                 free_cancellation = Number(values[key])
        //             }
        //         }
        //         else if (key == "rating") {
        //             rating = values[key]
        //         }
        //         else if (key == 'guest') {
        //             guest = values[key]
        //         }
        //         else if (key == 'bedroom') {
        //             bedroom = values[key]
        //         } else if (key == 'price') {
        //             price = values[key]
        //         }
        //         else if (key == "aminities") {
        //             aminities = values[key]
        //         } else if (key == 'check_in') {
        //             check_in = values[key]
        //         } else if (key == 'check_out') {
        //             check_out = values[key]
        //         } else if (key == 'page') {
        //             page = values[key]
        //         }
        //     }
            getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, values.rating, Number(values.bedroom), values.guest, values.sort, values.price, values.aminities, values.page, values.per_page, values.accomodation_type)
        // }

      
    }


    handleClick = (id) => {
        this.setState({
            page: id
        })
        console.log(id,'id')
        let { getDataFromAPI,history } = this.props
        // let { loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, per_page } = this.props

       const values = querystring.parse(this.props.location.search)
        console.log(values)

        console.log(values.accomodation_type, 'pageCLick')

        // getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, values.rating, Number(values.bedroom), values.guest, values.sort, values.price, values.aminities, 1, values.per_page, values.accomodation_type)
        getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, values.rating, Number(values.bedroom), values.guest, values.sort, values.price, values.aminities, id, values.per_page, values.accomodation_type)
        var url = `/vacation-rentals/s/search?location=${values.location}&check_in=${values.check_in}&check_out=${values.check_out}&guest=${values.guest}&bedroom=${values.bedroom}&rating=${values.rating}&aminities=${values.aminities}&page=${id}&per_page=${values.per_page}&accomodation_type=${values.accomodation_type}&free_cancellation=${values.free_cancellation}&price=${values.price}`

        history.push(url)
    }


    render() {
        let { history, data, location, total } = this.props
        // if (data.length != 0) {
        //     console.log(data)
        // }
        console.log(this.state.page)
console.log(total)
        let { page } = this.state
        let items = []
        if(data) {
        if (data.length != 0) {
            for (let i = 0; i < total; i++) {
                items.push(i + 1)
            }
        }
    }


        return (
            <div className="container-fluid">
                <SearchLogo location={this.state.loc} />
                <div className='border-top row'>
                    <div className='col-lg-7 col-12 mt-2'>
                        <FileNavBar history={history} location={location} className="col-12" />
                        <hr className="col-12"></hr>
                        <div className='row'>

                            <small className="col-12"></small>
                            <small className='text-center col-12'>{!data && "Please wait Data is Loading..."}</small>
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

                        {/* <Amenities /> */}
                        <div className='text-center my-2'>
                        <ol className="pagination">
                            {
                                items && items.map(item =>
                                    <li key={item} className={this.state.page === item ? "page-item active" : "page-item"}><button className="page-link" onClick={() => this.handleClick(item)}>{item}</button></li>
                                )
                            }
                        </ol>
                    </div>
                    </div>
                   
                    <div className="col-lg-5 col-12" >
                {data && <MapComponent data={data} /> }
                    </div>
                </div>

            </div>
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
    data: state.data.data,
    total: state.data.total,
    page: state.data.page,
    per_page: state.data.per_page
})
const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type) => dispatch(getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type)),
})


export default connect(mapStateToProps, mapDispatchToProps)(VacationRentalsSearch)
