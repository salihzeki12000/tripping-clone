import React from 'react';
import StarComponent from './StarRatingComponent';
import Modal from 'react-modal';
import './RatingFilter.css'
import './FileNavBar.css'

Modal.setAppElement('#root');
class RatingFilter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            rating: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        if (e.target.checked) {
            this.setState({
                rating: [...this.state.rating, e.target.rating]
            })
        }
        else {
            this.setState({
                ratings: this.state.rating.filter(item => item !== e.target.rating)
            })
        }
    }

    render() {
        const { open } = this.state
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
                                    <input type="radio" className=" mr-3 mt-2  checkAmenities" onChange={this.handleChange} rating='5' />
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
                                    <input type="radio" className=" mr-3 mt-1  checkAmenities" onChange={this.handleChange} rating='4' />
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
                                    <input type="radio" className=" mr-3  mt-2 checkAmenities" onChange={this.handleChange} rating='3.5' />
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
                                    <input type="radio" className=" mr-3  mt-2 checkAmenities" onChange={this.handleChange} rating='3' />
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
                                    <input type="radio" className=" mr-3  mt-2 checkAmenities" onChange={this.handleChange} rating='3' />
                                </div>
                                <div>
                                    <p className="fontSizeAmenities mr-4">Any</p>
                                </div>
                               
                            </div>
                        </div>
                        <button className="close" onClick={() => { this.setState({ open: false }) }}>
                            Close
                </button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RatingFilter;
