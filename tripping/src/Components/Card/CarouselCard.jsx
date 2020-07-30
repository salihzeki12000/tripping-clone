import React, { Component } from 'react';
import './CarouselCard.css';
import StarComponent from '../FilterComponents/StarRatingComponent';
import { Link } from 'react-router-dom';

export class CarouselCard extends Component {

    render() {
        let { accomodation_type, bedroom, city, country, guest, property_name, price, state, rating, image, property_id, area, locality } = this.props;



        return (

            <div>

                <div id={"carouselExampleCaptions" + property_id} className="carousel slide ml-5 mr-5" data-ride="carousel" style={{ width: '20rem' }}>
                    <ol className="carousel-indicators">
                        <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="0" className="active"></li>
                        <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="1"></li>
                        <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={image[0]} className="d-block w-100 h-100 img-fluid imgDim" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={image[1]} className="d-block w-100 h-100 img-fluid imgDim" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={image[2]} className="d-block w-100 h-100 img-fluid imgDim" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={image[3]} className="d-block w-100 h-100 img-fluid imgDim" alt="..." />
                            </div>


                            {/* <div class="carousel-item active">
                         <img src="https:encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSB4c0q25JcnrvhS7GKyMrssoc9JootgZLoPA&usqp=CAU" class="d-block w-100" alt="..." />
                     </div>
                     <div class="carousel-item">
                         <img src="https:encrypted-tbn0.gstati5.com/images?q=tbn%3AANd9GcT465Z5vP_r7x9I2nM3szL4Xww8oX372YEDfQ&usqp=CAU" class="d-block w-100" alt="..." />
                     </div>
                     <div class="carousel-item">
                         <img src="https:encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrhYAE0NiGAGVe3lvbQQ8uL9qwRj5i3jcU6g&usqp=CAU" class="d-block w-100" alt="..." />
                     </div> */}
                        </div>
                    </div>
                    <a class="carousel-control-prev" href={"#" + "carouselExampleCaptions" + property_id} role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href={"#" + "carouselExampleCaptions" + property_id} role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>

                    <div class="card-body">
                        <p className="text-muted float"> {area} FT<sup>2</sup> {accomodation_type} . {guest} Guests . {bedroom} Bedroom</p>
                        <small className="text-muted float">{property_name}, {city} {state} {country}</small>
                        <Link to={`/detailscard/tripping/?id=${property_id}&country=${country}&state=${state}&locality=${locality}&area=${area}&accomodation=${accomodation_type}`} target='_blank' ><button className="button mt-2">DETAILS</button></Link>
                        <span><small className="text-muted clear mt-1">from </small><p className="float fontWeight">&nbsp; $&nbsp; </p><p className="fontWeight float"> {price} </p></span>
                        <small className="clear text-++d">virbo</small>
                        <p className="orange clear">

                            {/* <StarComponent actual={rating} /> */}
                         Rating: {<StarComponent actual={Math.ceil(rating)} />}
                        </p>
                    </div>
                </div>
                </div>
        )
    }
}

export default CarouselCard;