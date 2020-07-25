import React from 'react';
import Modal from 'react-modal';

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
                <button onClick={() => this.setState({ open: true })} className="filter">Accommodation types</button>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '260px',
                            left: '100px',
                            right: '40px',
                            width: '25rem',
                            height: '30rem',
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
                    <input type="checkbox" />
                    <p>Instant Booking</p>
                    <hr></hr>
                    <h5>ACCOMMODATION TYPES</h5>
                    <div className="row">
                        {
                            accomodation.map(type => {
                                return (
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-2"><input type="checkbox" id={type} onChange={this.handleChange} /></div>
                                            <div className="col-10"><p>{type}</p></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="close" onClick={() => { this.setState({ open: false }) }}>
                        Close
                </button>
                </Modal>
            </div>
        )
    }
}

export default Accommodation;