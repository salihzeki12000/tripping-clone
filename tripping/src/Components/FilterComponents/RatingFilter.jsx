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
             rating:[]
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
        const {open} = this.state
        return (
            <div>
                <button onClick={() => this.setState({ open: true })} className="filter">Rating</button>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '260px',
                            left: '100px',
                            right: '40px',
                            width: '23rem',
                            height: '20rem',
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
                    <div className="row" style={{ width: '23rem' }}>
                        <div className="col-6">
                            <input type="checkbox" className="float p-1 mt-2" onChange={this.handleChange} rating='5'/>
                            <p className="float p-1">OutStanding:4.5+</p>
                        </div>
                        <div className="col-6 mt-1">
                            <StarComponent actual='5' />
                        </div>
                        <div className="col-6">
                            <input type="checkbox" className="float p-1 mt-2" onChange={this.handleChange} rating='4'/>
                            <p className="float p-1">Very Good:4+</p>
                        </div>
                        <div className="col-6 mt-1">
                            <StarComponent actual='4' />
                        </div>
                        <div className="col-6">
                            <input type="checkbox" className="float p-1 mt-2" onChange={this.handleChange} rating='3'/>
                            <p className="float p-1">Good:3.5+</p>
                        </div>
                        <div className="col-6 mt-1">
                            <StarComponent actual='3' />
                        </div>
                        <div className="col-6">
                            <input type="checkbox" className="float p-1 mt-2" onChange={this.handleChange} rating='3'/>
                            <p className="float p-1">Descent:3+</p>
                        </div>
                        <div className="col-6 mt-1">
                            <StarComponent actual='2' />
                        </div>
                        <div className="col-6">
                            <input type="checkbox" className="float p-1 mt-2" onChange={this.handleChange} rating='all'/>
                            <p className="float p-1">Any</p>
                        </div>
                        <div className="col-6 mt-1">
                        </div>
                        <button className="close" onClick={() =>{this.setState({open:false})}}>
                            Close
                </button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RatingFilter;
