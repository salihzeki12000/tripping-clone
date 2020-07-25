import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class Amenities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amenites: [],
            open: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        if (e.target.checked) {
            this.setState({
                amenites: [...this.state.amenites, e.target.id]
            })
        }
        else {
            this.setState({
                amenites: this.state.amenites.filter(item => item !== e.target.id)
            })
        }
    }

    render() {
        let amenites = ['Pet allowed', 'Kitchen', 'TV', 'DishWasher', 'Microwave', 'Jacuzzi', 'No pets', 'Wheelchair access',
            'Pool', 'Air conditioning', 'Balcony/Patio', 'Grill', 'No smoking', 'Sauna', 'Fishing', 'Fenced', 'Internet',
            'Washer', 'Parking', 'Yard', 'Fireplace', 'Smoking allowed', 'Crib', 'Detached'
        ]
        console.log(this.state.amenites)
        const {open} = this.state;
        return (
            <div>
                <button onClick={() => this.setState({ open: true })} className="filter">Amenities</button>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '260px',
                            left: '100px',
                            right: '40px',
                            width: '50rem',
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
                    <div className="row">
                        <div className="col-6">
                            <table>
                                <tr>
                                    <td><p className="text-muted">Bedrooms</p></td>
                                    <td><button>-</button></td>
                                    <td> <p>{}</p></td>
                                    <td><button>+</button></td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-6">
                            <table>
                                <tr>
                                    <td><p className="text-muted">Bathrooms</p></td>
                                    <td><button>-</button></td>
                                    <td> <p>{}</p></td>
                                    <td><button>+</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        {
                            amenites.map(amenite => {
                                return (
                                    <div className="col-4">
                                        <div className="row">
                                            <div className="col-2"><input type="checkbox" id={amenite} onChange={this.handleChange} /></div>
                                            <div className="col-10"><p>{amenite}</p></div>
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

export default Amenities;