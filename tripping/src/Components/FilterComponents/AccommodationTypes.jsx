import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import { getDataFromAPI } from '../../Redux/SearchApi/Action.js'
import querystring from 'query-string';

Modal.setAppElement('#root');
class Accommodation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accomodation: '',
            open: false
        }
    }
    handleChange = (e) => {
        console.log(e.target.id)
        this.setState({
            accomodation:e.target.id
        })

    }

    handleAcc = () => {
// console.log(this.state.accomodation)
        this.setState({
            open: !this.state.open
        })
        let { history, getDataFromAPI, location } = this.props

        const values = querystring.parse(this.props.location.search)

        getDataFromAPI(values.location, values.check_in, values.check_out, values.free_cancellation, values.rating, values.bedroom, values.guest, values.sort, values.price, values.aminities, values.page, values.per_page, this.state.accomodation)
        var url = `/vacation-rentals/s/search?location=${values.location}&check_in=${values.check_in}&check_out=${values.check_out}&guest=${values.guest}&bedroom=${values.bedroom}&rating=${values.rating}&aminities=${values.aminities}&page=${values.page}&per_page=${values.per_page}&accomodation_type=${this.state.accomodation}&free_cancellation=${values.free_cancellation}&price=${values.price}`

        history.push(url)

    }

    render() {
        let accomodation = ['Apartment', 'Hotel', 'Castle', 'Private room', 'Resort', 'Boat', 'Other', 'House', 'Bed & BreakFast', 'Farmhouse', 'Pension', 'Hostel', 'Camping', 'Shared room']
        const { open } = this.state;
        return (
            <div>
                <span onClick={() => this.setState({ open: !open })}
                    className="m-2 p-2 pl-3 pr-3 rounded-pill filter font-weight-lighter">Accommodation types</span>
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
                                                <div className="col-2"><input type="checkbox" id={type} className='checkAmenities' onChange={(e) => this.handleChange(e)} /></div>
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


const mapDispatchToProps = dispatch => ({
    getDataFromAPI: (loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type) => dispatch(getDataFromAPI(loc, check_in, check_out, free_cancellation, rating, bedroom, guest, sort, price, aminities, page, per_page, accomodation_type)),
})


export default connect(null, mapDispatchToProps)(Accommodation)