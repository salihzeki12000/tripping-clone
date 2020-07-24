import React, { Component } from 'react';
import './CardComponent.css';

export class CardComponent extends Component {
    render() {
        console.log(this.props)
        const { bedrooms, guest, hotel_name, country, state, img, rating } = this.props;
        return (
            <div className="card" style={{ width: '20rem' }}>
                <img src={img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <p className="text-muted float">Apartment . {guest} Guests . {bedrooms} Bedroom</p>
                    <small className="text-muted float">{hotel_name}, {state} {country}</small>
                    <button className="button mt-2">DETAILS</button>
                    <span><small className="text-muted clear mt-1">from </small><p className="float fontWeight">&nbsp; $&nbsp; </p><p className="fontWeight float"> 224 </p></span>
                    <small className="clear text-muted">virbo</small><td onClick={() => window.open("someLink", "_blank")}>text</td>
                    <p className="orange clear">{rating}*****</p>
                </div>
            </div>
        )
    }
}

export default CardComponent;