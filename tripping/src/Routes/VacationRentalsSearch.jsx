import React, { Component } from 'react'
import CarouselCard from '../Components/Card/CarouselCard'
import FileNavBar from '../Components/FilterComponents/FileNavBar'
import { connect } from 'react-redux'
import SearchLogo from '../Components/FilterComponents/SearchLogo'
import { getDataFromAPI } from '../Redux/SearchApi/Action'
import querystring from 'query-string';
import MapComponent from '../Components/MapComponent';


class VacationRentalsSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loc: '',
            check_in: '',
            check_out: '',
            page: 1,
            per_page: 6
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
            page: values.page,
            per_page: values.per_page
        })

        // let checkIn = values.check_in
        // console.log(checkIn)
        //  check_in = "2020-07-28"
        //  check_out = "2020-07-31"
        page = this.state.page
        per_page = this.state.per_page

        let x = Object.keys(values)
        if (x.length == 0) {
            getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page)
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
                else if (key == 'guest') {
                    guest = Number(values[key])
                }
                else if (key == 'bedroom') {
                    bedroom = Number(values[key])
                } else if (key == 'price') {
                    price = Number(values[key])
                }
                else if (key == "aminities") {
                    aminities = values[key]
                } else if (key == 'check_in') {
                    check_in = values[key]
                } else if (key == 'check_out') {
                    check_out = values[key]
                } else if (key == 'page') {
                    page = values[key]
                }
            }
            getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page)
        }

        // history.push(`?free_cancellation=${free_cancellation}`)
    }


    handleClick = (id) => {
        this.setState({
            page: id
        })
        let { getDataFromAPI } = this.props
        let { loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, per_page } = this.props

        getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, this.state.page, per_page)
    }


    render() {
        let { history, data, location, total } = this.props
        // if (data.length != 0) {
        //     console.log(data)
        // }
console.log(total)
        let { page } = this.state
        let items = []
        if (data.length != 0) {
            for (let i = 0; i < total; i++) {
                items.push(i + 1)
            }
        }


        return (
            <>


                <SearchLogo location={this.state.loc} />
                <div className='container-fluid border-top row'>
                    {/* <SearchBar /> */}

                    <div className='col-6'>
                        <FileNavBar history={history} location={location} />
                        <h2 className='text-center m-4'>{data.length == 0 && "Please wait Data is Loading..."}</h2>
                        <div className='row mt-5'>
                            {
                                data && data ? data.map(elem => <CarouselCard key={elem.id}
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
                                    : <div>Sorry Data not found</div>

                                //    data ? data.map(elem => <CarouselCard />) : <div>Sorry Data not found</div>
                            }
                        </div>

                        {/* <Amenities /> */}
                        {/* <div>
                        <ol className="pagination">
                            {
                                items && items.map(item =>
                                    <li key={item} className={page === item ? "page-item active" : "page-item"}><button className="page-link" onClick={() => this.handleClick(item)}>{item}</button></li>
                                )
                            }
                        </ol>
                    </div> */}
                    </div>
                   
                    <div className="pt-4 mt-4">
                        {
                            data && <MapComponent data={data} />
                        }
                    </div>
                </div>

            </>
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
    getDataFromAPI: (loc, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page) => dispatch(getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page)),
})


export default connect(mapStateToProps, mapDispatchToProps)(VacationRentalsSearch)
