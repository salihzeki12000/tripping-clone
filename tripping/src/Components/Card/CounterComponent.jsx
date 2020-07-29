import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../Redux/SearchBar/action';
import Payment from '../Payment';

export class CounterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guests: 1,
            children: 0,
            infants: 0
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
        let { decrement } = this.props;
        decrement(payload)
        this.forceUpdate()
    }


    render() {
        const { guestCounter,children,bedroomCounter,clickHandler } = this.props;
        return (
            <div className="bg-white borderDivGuests p-3" style={{ width: '328px' }}>
                <div className=' '>
                    <div className="d-flex flex-row ml-4">
                        <div>
                            <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className='pl-2 pr-5'>Guests</p>
                        </div>

                        <span className='borderDec mx-2 text-center' onClick={() => this.handleDecrement('guest')}><i className='fas fa-minus math black'></i></span>
                        <span className=' text-center'>{guestCounter}</span>
                        <span className='borderInc mx-2 text-center ' onClick={() => this.handleIncrement('guest')}><i className='fas fa-plus math orange'></i></span>
                    </div>
                    <div className="d-flex flex-row ml-3 mt-2">
                        <div>
                            <i class="fa fa-child"></i>
                        </div>
                        <div>
                            <p className='pl-2 pr-4'>Bedrooms</p>
                        </div>
                        <span className='borderDec ml-4 mr-2 text-center' onClick={() => this.handleDecrement('bedrooms')}><i className='fas fa-minus math black'></i></span>
                        <span className=' text-center'>{bedroomCounter}</span>
                        <span className='borderInc mx-2 text-center' onClick={() => this.handleIncrement('bedrooms')}><i className='fas fa-plus math orange'></i></span>
                    </div>
                    <h6 className="ml-3 text-muted">5 guests maximum. Infants don’t count toward the number of guests</h6>
                    <button className="closeButton font-weight-bold" onClick={clickHandler}>Close</button>
                </div>

                {/* <div>
                    <Payment handlePayment = {this.props.handlePayment}/>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    guestCounter: state.search.guestCounter,
    bedroomCounter:state.search.bedroomCounter
})

const mapDispatchToProps = dispatch => {
    return {
        increment: (payload) => dispatch(increment(payload)),
        decrement: (payload) => dispatch(decrement(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);