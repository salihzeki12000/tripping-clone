import React from 'react';
import StarComponent from './StarRatingComponent';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './RatingFilter.css';
import './FileNavBar.css';
import querystring from 'query-string';
import { getDataFromAPI} from '../../Redux/SearchApi/Action';

Modal.setAppElement('#root');
class RatingFilter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            rating: ''
        }
    }

    handleChange = (e,rating) => {
        if (e.target.checked) {
            this.setState({
                rating: rating
            })
        }
    }

    handleApply = () => {
        this.setState({
            open: !this.state.open
        })
        let { history,getDataFromAPI } = this.props
        let { loc, free_cancellation, rating, bedroom, guest, sort, price, aminities } = this.props
        const values = querystring.parse(this.props.location.search)
        let x = Object.keys(values)
        if (values['rating']) {
            rating = this.state.rating
        }
        else {
            rating = this.state.rating
            history.push(`&rating=${this.state.rating}`)
        }
        getDataFromAPI(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities)
    }

    render() {
        const { open } = this.state
        const { rating } = this.props
        return (
            <div>
                <span onClick={() => this.setState({ open: !open })} className="px-3">Rating</span>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '100px',
                            right: '40px',
                            width: '29rem',
                            height: '19rem',
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
                                    <input type="radio" name='rating' className=" mr-3 mt-2  checkAmenities" onChange={(e)=>this.handleChange(e,4.5)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-2">OutStanding: 4.5+</p>
                                </div>
                                <div className='ml-3'>
                                    <StarComponent actual='5' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating' className=" mr-3 mt-1  checkAmenities" onChange={(e)=>this.handleChange(e,4)} />
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
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e)=>this.handleChange(e,3.5)} />
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
                                    <input type="radio" name='rating' className=" mr-3  mt-2 checkAmenities" onChange={(e)=>this.handleChange(e,2.5)} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Decent: 3+</p>
                                </div>
                                <div className='ml-5'>
                                    <StarComponent actual='2' />
                                </div>
                            </div>
                            <div className='d-flex flex-row ml-3 '>
                                <div>
                                    <input type="radio" name='rating5' className=" mr-3  mt-2 checkAmenities" onChange={(e)=>this.handleChange(e,'')} />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Any</p>
                                </div>

                            </div>
                        </div>
                        <button className="close" onClick={() => { this.setState({ open: false }) }}>
                            Close
                </button>
                        <button className="close" onClick={this.handleApply}>
                            Apply
                </button>
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
