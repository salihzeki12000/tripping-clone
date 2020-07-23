import React, { Component } from 'react';
import './CardComponent.css';

export class CardComponent extends Component {
    render() {
        return (
            <div class="card" style={{width:'20rem'}}>
                <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" class="card-img-top" alt="..." />
                <div class="card-body">
                    <p className="text-muted float">Apartment . 2 Guests . 1 Bedroom</p>
                    <small className="text-muted float">Kingscliff, Tweed Shire council Austarlia</small>
                    <button className="button mt-2">DETAILS</button> 
                    <span><small className="text-muted clear mt-1">from </small><p className="float fontWeight">&nbsp; $&nbsp; </p><p className="fontWeight float"> 224 </p></span>
                    <small className="clear text-muted">virbo</small>
                    <p className="orange clear">5.0*****</p>
                </div>
            </div>
        )
    }
}

export default CardComponent;
