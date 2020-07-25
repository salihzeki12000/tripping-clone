import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import './FreeCancellation.css';
import './FileNavBar.css';
import './RatingFilter.css'
import { getDataFromAPI, changeFreeCancellation } from '../../Redux/SearchApi/Action.js'

Modal.setAppElement('#root');
class FreeCancellation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            checked: false
        }
    }

    handleClick = () => {
        let { country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities, getDataFromAPI, changeFreeCancellation, history } = this.props
        let { checked } = this.state
        console.log(history)

        if(checked == true) {
            checked = 1
            
        }else {
            checked = ''
        }

        changeFreeCancellation(checked)
        getDataFromAPI(country, state, city, checked, rating, bedroom, guest, sort, price, aminities)
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { open, checked } = this.state
        return (
            <div>
                <button onClick={() => this.setState({ open: true })} className="filter">Free Cancellation</button>
                <Modal
                    isOpen={open}
                    style={{
                        content: {
                            position: 'absolute',
                            top: '260px',
                            left: '60px',
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
                    {/* <button onClick={()=> this.handleApply()}>Apply</button> */}
                    <button onClick={() => this.handleClick()} style={{ float: 'right' }} className="close">Apply</button>
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
    getDataFromAPI: (country , state , city, free_cancellation , rating, bedroom , guest , sort, price, aminities) => dispatch(getDataFromAPI(country , state , city, free_cancellation , rating, bedroom , guest , sort, price, aminities)),
    changeFreeCancellation: (payload) => dispatch(changeFreeCancellation(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FreeCancellation)