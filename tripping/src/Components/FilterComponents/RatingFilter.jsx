import React from 'react';
import StarComponent from './StarRatingComponent';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './RatingFilter.css';
import './FileNavBar.css';
import querystring from 'query-string';
import { getDataFromAPI } from '../../Redux/SearchApi/Action';

Modal.setAppElement('#root');
class RatingFilter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            rating: ''
        }
    }

    handleChange = (e, rating) => {
        
        if (e.target.checked) {
            this.setState({
                rating: rating
            })
        }
    }

    handleRating = () => {
        this.setState({
            open: !this.state.open
        })
        console.log(this.state.rating)
        console.log('handle Apply')
        let { history, getDataFromAPI, location } = this.props
        console.log(location, 'path')
        let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities, check_in, check_out } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)

getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, this.state.rating, values.bedroom, values.guest, values.sort, values.price, values.aminities, values.page, values.per_page, values.accomodation_type)
var url = `/vacation-rentals/s/search?location=${values.location}&check_in=${values.check_in}&check_out=${values.check_out}&guest=${values.guest}&bedroom=${values.bedroom}&rating=${this.state.rating}&aminities=${values.aminities}&page=${values.page}&per_page=${values.per_page}&accomodation_type=${values.accomodation_type}&free_cancellation=${values.free_cancellation}&price=${values.price}`
        
history.push(url)
    }

    render() {
        const { open } = this.state
        // const { rating } = this.props
        return (
            <div>
                <span onClick={() => this.setState({ open: !open })} 
                className="m-2 p-2 pl-3 pr-3 rounded-pill filter font-weight-lighter">Rating</span>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '100px',
                            right: '40px',
                            width: '29rem',
                            height: '25rem',
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
                    <div className="" >
                        <div className="">
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3 mt-2  checkAmenities" onChange={(e) => this.handleChange(e, 4.5)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-2">OutStanding: 4.5+</p>
                                </div>
                                <div className='ml-3'>
                                    <StarComponent actual='4.5' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3 mt-1  checkAmenities" onChange={(e) => this.handleChange(e, 4)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-2">Very Good: 4+</p>
                                </div>
                                <div className='ml-5'>
                                    <StarComponent actual='4' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e) => this.handleChange(e, 3.5)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-2">Very Good: 3.5+</p>
                                </div>
                                <div className='ml-4'>
                                    <StarComponent actual='3.5' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e) => this.handleChange(e, 3)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-5">Good: 3+</p>
                                </div>
                                <div className='ml-5'>
                                    <StarComponent actual='3' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e) => this.handleChange(e, 2)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Decent: 2+</p>
                                </div>
                                <div className='ml-5'>
                                    <StarComponent actual='2' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e) => this.handleChange(e, 1)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Average: 1+</p>
                                </div>
                                <div className='ml-5'>
                                    <StarComponent actual='1' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating5' className=" mr-3  mt-2 checkAmenities" onChange={(e) => this.handleChange(e, '')} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Any</p>
                                </div>

                            </div>
                        </div>
                        <div className='float-right'>

                            <button className='btn btn-secondary mx-2 mt-2' onClick={() => this.setState({ open: !open })}>close</button>
                            <button className='btn btn-warning  mr-2 mt-2' onClick={() => this.handleRating()} >Apply</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type) => dispatch(getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type)),
})

export default connect(null, mapDispatchToProps)(RatingFilter)
