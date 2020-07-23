 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../Redux/searchBar/action.js';
import './SearchBar.css';

export class GuestManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }
    handleIncrement(payload) {
        const { increment } = this.props;
        increment(payload)
        this.forceUpdate()
    }

    handleDecrement(payload) {
        const { decrement } = this.props;
        decrement(payload)
        this.forceUpdate()
    }


    render() {
        const { guestCounter, bedroomCounter } = this.props;
        return (
            <div className="bg-white guestDiv">
                <div className='p-3'>
                    <p className=''>GUESTS AND BEDROOMS</p>
                    <div className="row p-1">
                        <p className='col-3 mr-5 p-1'>Guests</p>
                        <button onClick={() => this.handleDecrement("guest")} className='col-2 p-1'>-</button>
                        <p className='col-1 mr-1 text-center'>{guestCounter}</p>
                        <button onClick={() => this.handleIncrement('guest')} className='col-2 p-1'>+</button>
                    </div>
                    <div className="row p-1">
                        <p className='col-3 mr-5 p-1'>Bedrooms</p>
                        <button onClick={() => this.handleDecrement("bedrooms")} className='col-2 p-1'>-</button>
                        <p className='col-1 mr-1 text-center'>{bedroomCounter}</p>
                        <button onClick={() => this.handleIncrement('bedrooms')} className='col-2 p-1'>+</button>
                    </div>
                    <div className="row mt-2 text-center">
                        <input type='checkbox' className="col-1"/>
                        <p className="col-10">I'm travelling with children</p>
                        <small className="col-12 text-muted">Knowing you're traveling with children allows us to show more accurate prices</small>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter: state.search.bedroomCounter
})

const mapDispatchToProps = dispatch => {
    return {
        increment: (payload) => dispatch(increment(payload)),
        decrement: (payload) => dispatch(decrement(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GuestManager)