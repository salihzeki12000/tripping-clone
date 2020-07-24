import React, { Component } from 'react';
import './CardComponent.css';

export class CardComponent extends Component {
    render() {
        const { bedrooms, guest, hotel_name, country, state, img, rating,price } = this.props;
        return (
            <div className='col-3'>
            <div className="card" style={{ width: '20rem' }}>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="text-muted float">Apartment . {guest} Guests . {bedrooms} Bedroom</p>
        <small className="text-muted float">{hotel_name}, {state} {country}</small>
                    <button className="button mt-2">DETAILS</button>
                    <span><small className="text-muted clear mt-1">from </small><p className="float fontWeight">&nbsp; $&nbsp; </p><p className="fontWeight float"> {price} </p></span>
                    <small className="clear text-muted">virbo</small>
                    <p className="orange clear">{rating}*****</p>
                </div>
            </div>
            </div>
        )
    }
}

export default CardComponent;