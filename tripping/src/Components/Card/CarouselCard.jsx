import React, { Component } from 'react';
import './CarouselCard.css';

export class CardComponent extends Component {
    render() {
        let arr = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrhYAE0NiGAGVe3lvbQQ8uL9qwRj5i3jcU6g&usqp=CAU'
        ]
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" style={{width:'20rem'}}>
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>      
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSB4c0q25JcnrvhS7GKyMrssoc9JootgZLoPA&usqp=CAU" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT465Z5vP_r7x9I2nM3szL4Xww8oX372YEDfQ&usqp=CAU" class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrhYAE0NiGAGVe3lvbQQ8uL9qwRj5i3jcU6g&usqp=CAU" class="d-block w-100" alt="..." />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
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