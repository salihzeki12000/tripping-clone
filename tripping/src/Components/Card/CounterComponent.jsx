
import React, { Component } from 'react';

export class CounterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guests: 1,
            children: 0,
            infants: 0,
            show:false
        }
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }
    handleIncrement(payload) {
        let { guests, children, infants } = this.state;
        if (payload == "guests") {
            if (guests < 5) {
                this.setState({
                    guests: guests + 1
                })
            }
        }
        else if (payload == "child") {
            if (children < 5) {
                this.setState({
                    children: children + 1
                })
            }
        }
        else if (payload == "infants") {
            if (infants < 5) {
                this.setState({
                    infants: infants + 1
                })
            }
        }
    }

    handleDecrement(payload) {
        let { guests, children, infants } = this.state;
        if (payload == "guests") {
            if (guests >1) {
                this.setState({
                    guests: guests - 1
                })
            }
        }
        else if (payload == "child") {
            if (children > 0) {
                this.setState({
                    children: children - 1
                })
            }
        }
        else if (payload == "infants") {
            if (infants >0) {
                this.setState({
                    infants: infants - 1
                })
            }
        }
    }


    render() {
        const { guests, children, infants } = this.state;
        return (
            <div className="bg-white borderDivGuests border border-secondary p-3" style={{ width: '328px' }}>
                <div className=' '>
                    <div className="d-flex flex-row ml-4">
                        <div>
                            <i class="fa fa-male text-secondary" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p className='pl-2 pr-5'>Guests</p>
                        </div>

                        <span className='borderDec mx-2 text-center' onClick={() => this.handleDecrement('guests')}><i className='fas fa-minus'></i></span>
                        <span className=' text-center'>{guests}</span>
                        <span className='borderInc mx-2 text-center ' onClick={() => this.handleIncrement('guests')}><i className='fas fa-plus'></i></span>
                    </div>
                    <div className="d-flex flex-row ml-3 mt-2">
                        <div>
                            <i class="fa fa-child"></i>
                        </div>
                        <div>
                            <p className='pl-2 pr-4'>Children</p>
                        </div>
                        <span className='borderDec ml-4 mr-2 text-center' onClick={() => this.handleDecrement('child')}><i className='fas fa-minus'></i></span>
                        <span className=' text-center'>{children}</span>
                        <span className='borderInc mx-2 text-center' onClick={() => this.handleIncrement('child')}><i className='fas fa-plus'></i></span>
                    </div>
                    <div className="d-flex flex-row ml-3 mt-2">
                        <div>
                            <i class='fas fa-baby-carriage'></i>
                        </div>
                        <div>
                            <p className='pl-2 pr-5'>Infants</p>
                        </div>

                        <span className='borderDec mx-2 text-center' onClick={() => this.handleDecrement('infants')}><i className='fas fa-minus'></i></span>
                        <span className=' text-center'>{infants}</span>
                        <span className='borderInc mx-2 text-center'><i className='fas fa-plus' onClick={() => this.handleIncrement('infants')}></i></span>
                    </div>
                    <h6 className="ml-3 text-muted">5 guests maximum. Infants don’t count toward the number of guests</h6>
                    <button className="closeButton font-weight-bold">Close</button>
                </div>
            </div>
        )
    }
}

export default CounterComponent;