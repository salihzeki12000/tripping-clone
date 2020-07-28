import React from 'react';
import {connect} from 'react-redux'
import Modal from 'react-modal';
import { getDataFromAPI } from '../../Redux/SearchApi/Action.js'
import querystring from 'query-string';

Modal.setAppElement('#root');
class Accommodation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accommodation: [],
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        if (e.target.checked) {
            this.setState({
                accommodation: [...this.state.accommodation, e.target.id]
            })
        }
        else {
            this.setState({
                accommodation: this.state.accommodation.filter(item => item !== e.target.id)
            })
        }
    }

    render() {
        let accomodation = ['Apartment','Hotel','Castle','Private room','Resort','Boat','Other','House','Bed & BreakFast','Farmhouse','Pension','Hostel','Camping','Shared room' ]
        const {open} = this.state;
        return (
            <div>
              <span onClick={() => this.setState({ open: !open })} className="px-3">Accommodation types</span>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '100px',
                            left: '100px',
                            right: '40px',
                            width: '28rem',
                            height: '33rem',
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

<div className='fontSizeAmenities'>


                    <div className='d-flex flex-row'>
                    <input type="checkbox" className='checkAmenities mr-2 mt-2' />
                    <div><p>Instant booking</p></div>
                    </div>
                  
                    <hr></hr>
                    <small className='text-secondary mt-4'>ACCOMMODATION TYPES</small>
                    <div className="row mt-3">
                        {
                            accomodation.map(type => {
                                return (
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-2"><input type="checkbox" id={type} className='checkAmenities' onChange={this.handleChange} /></div>
                                            <div className="col-10"><p>{type}</p></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </div>
                    <div className='float-right'>

                        <button className='btn btn-secondary mx-2 mt-2' onClick={() => this.setState({ open: !open })}>close</button>
                        <button className='btn btn-warning  mr-2 mt-2' onClick={() => this.handleAcc()} >Apply</button>
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
    // changeFreeCancellation: (payload) => dispatch(changeFreeCancellation(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Accommodation)