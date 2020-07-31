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
        let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        const values = querystring.parse(this.props.location.search)
        console.log(values)
        // let x = Object.keys(values)

        if (values['rating']) {
            console.log('if')
            rating = this.state.rating
        }
        else {
            console.log('else')
            rating = this.state.rating
            var url = location.search + `&rating=${this.state.rating}`
            // history.push(`&rating=${this.state.rating}`)
            history.push(url)
        }

        for (var key in values) {
            for (var key in values) {
                if (key == "location") {
                    loc = values[key]
                }
                else if (key == "free_cancellation") {
                    free_cancellation = Number(values[key])
                }
                else if (key == 'guest') {
                    guest = Number(values[key])
                }
                else if (key == 'bedroom') {
                    bedroom = Number(values[key])
                } else if (key == 'price') {
                    price = Number(values[key])
                }
                else if (key == "free_cancellation") {
                    if (typeof (values[key]) != "number") {
                        free_cancellation = ''
                    } else {
                        free_cancellation = Number(values[key])
                    }
                } else if (key == "aminities") {
                    aminities = values[key]
                }
                else if(key == 'check_in') {
                    check_in = values[key]
                }else if(key == 'check_out') {
                    check_out = values[key]
                }
            }

        }
  console.log(rating, "after assigning")
        getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
    }

    render() {
        const { open } = this.state
        const { rating } = this.props
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

const mapStateToProps = state => ({
    loc: state.data.loc,
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
    getDataFromAPI: (loc, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch(getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingFilter)
