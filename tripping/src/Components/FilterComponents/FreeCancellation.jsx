import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import './FreeCancellation.css';
import './FileNavBar.css';
import './RatingFilter.css'
import { getDataFromAPI } from '../../Redux/SearchApi/Action.js'
import querystring from 'query-string'

Modal.setAppElement('#root');
class FreeCancellation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            checked: false
        }
    }


    handleFreeCancellation = () => {
        this.setState({
            open: !this.state.open
        })
        // console.log('handle free')
        let { history, getDataFromAPI, location } = this.props
        // console.log(location, 'path')
        // let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        // const values = querystring.parse(this.props.location.search)
        // console.log(values)
        // // let x = Object.keys(values)



        // if (values['free_cancellation']) {
        //     console.log('if')
        //     if (this.state.checked) {
        //         free_cancellation = 1
        //     } else {
        //         free_cancellation = ''
        //     }
        // }
        // else {
        //     console.log('else')
        //     if (this.state.checked) {
        //         free_cancellation = 1
        //     } else {
        //         free_cancellation = ''
        //     }
        //     var url = location.search + `&free_cancellation=${free_cancellation}`
        //     history.push(url)
        // }


        // for (var key in values) {
        //     if (key == "location") {
        //         loc = values[key]
        //     }
        //     else if (key == 'guest') {
        //         guest = Number(values[key])
        //     }
        //     else if (key == 'bedroom') {
        //         bedroom = Number(values[key])
        //     }
        //     else if (key == "rating") {
        //         rating = Number(values[key])
        //     } else if (key == "aminities") {
        //         aminities = values[key]
        //     }
        // }
        // getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)

var free_cancellation = ''
        if (this.state.checked) {
            free_cancellation = 1
        } else {
            free_cancellation = ''
        }

        console.log(free_cancellation)

        const values = querystring.parse(this.props.location.search)

        getDataFromAPI(values.location, values.check_in, values.check_out, free_cancellation, values.rating, values.bedroom, values.guest, values.sort, values.price, values.aminities, values.page, values.per_page, values.accomodation_type)


        var url = `/vacation-rentals/s/search?location=${values.location}&check_in=${values.check_in}&check_out=${values.check_out}&guest=${values.guest}&bedroom=${values.bedroom}&rating=${values.rating}&aminities=${values.aminities}&page=${values.page}&per_page=${values.per_page}&accomodation_type=${values.accomodation_type}&free_cancellation=${free_cancellation}&price=${values.price}`
        
        history.push(url)


    }


    render() {

        const { open, checked } = this.state


        // free_cancellation ? history.push(`?freecancellation=${free_cancellation}&rating=${rating}`) : ""

        return (
            <div>
                <span onClick={() => this.setState({ open: !open })} 
                className="m-2 p-2 pl-3 pr-3 rounded-pill filter font-weight-lighter">Free Cancellation</span>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '400px',
                            right: '40px',
                            width: '15rem',
                            height: '12rem',
                            bottom: '40px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }}
                >
                    <div className="row">
                        <div className="col-2"><input onChange={() => this.setState({ checked: !checked })} type="checkbox" /></div>
                        <div className="col-10">
                            <p>Free Cancellation</p>
                            <small className="text-muted">Only shows offers which have free cancellation policy</small>
                        </div>
                    </div>
                    <div className='float-right'>

                        <button className='btn btn-secondary mx-2 mt-2' onClick={() => this.setState({ open: !open })}>close</button>
                        <button className='btn btn-warning  mr-2 mt-2' onClick={() => this.handleFreeCancellation()} >Apply</button>
                    </div>
                </Modal>
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
    aminities: state.data.aminities
})
const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
    changeFreeCancellation: (payload) => dispatch(changeFreeCancellation(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FreeCancellation)