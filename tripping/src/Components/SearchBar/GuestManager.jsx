 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../Redux/SearchBar/action';
import '../SearchBar/SearchBar.css';

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
        console.log(guestCounter, bedroomCounter)
        return (
            <div className="bg-white borderDivGuests">
                     <p className='pt-2 font-weight-bold text-secondary'>Guests and Bedrooms</p>
                <div className=' '>
               
                    <div className="d-flex flex-row ml-4">
                        <div>
                        <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                        </div>
                        <div>
                        <p className='pl-2 pr-5'>Guests</p>
                        </div>
                   
                        <span onClick={() => this.handleDecrement("guest")} className='borderDec mx-2'>-</span>
                        <span className=' text-center'>{guestCounter}</span>
                        <span onClick={() => this.handleIncrement('guest')} className='borderInc mx-2 '>+</span>
                    </div>
                    <div className="d-flex flex-row ml-4 mt-2">
                        <div>
                        <i class="fa fa-bed text-secondary" aria-hidden="true"></i>
                        </div>
                        <div>
                        <p className='pl-2 pr-3'>Bedrooms</p>
                        </div>
                   
                        <span onClick={() => this.handleDecrement("bedrooms")} className='borderDec mx-2'>-</span>
                        <span className=' text-center'>{bedroomCounter}</span>
                        <span onClick={() => this.handleIncrement('bedrooms')} className='borderInc mx-2 '>+</span>
                    </div>
                    <div className="d-flex flex-row mt-2 text-center">
                        <input type='checkbox' className="mt-2 ml-3 px-2 mr-3"/>
                        <h6 className="mt-1">I'm travelling with children</h6>
                       
                    </div>
                    <h6 className="text-left ml-5 text-muted">Knowing you're traveling with children allows us to show more accurate prices</h6>
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