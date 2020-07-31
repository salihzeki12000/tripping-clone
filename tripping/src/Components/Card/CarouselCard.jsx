import React, { Component } from 'react';
import './CarouselCard.css';
import StarComponent from '../FilterComponents/StarRatingComponent';
import { Link } from 'react-router-dom';

export class CarouselCard extends Component {

    render() {
        let { accomodation_type, bedroom, city,
            country, guest, property_name,
            price, state, rating, image,
            property_id, area, locality,
            check_in, check_out } = this.props;


        return (
            <div className="col-md-6 col-sm-12 col-lg-4 mt-3">
                <div className="card shadow rounded border">
                    <div id={"carouselExampleCaptions" + property_id} className="carousel slide rounded position-relative" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="0" className="active"></li>
                            <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="1"></li>
                            <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="2"></li>
                            <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="3"></li>
                            <li data-target={"#" + "carouselExampleCaptions" + property_id} data-slide-to="4"></li>
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
                                <div className="carousel-item">
                                    <img src={image[4]} className="d-block w-100 h-100 img-fluid imgDim" alt="..." />
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
                        <a class="carousel-control-next" href={"#" + "carouselExampleCaptions" + property_id} role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <div className="position-absolute ml-2 rounded pl-1 pr-1 shadow-sm" style={{ marginTop: "180px", backgroundColor: "white" }}>
                        {
                            rating & rating <= 1 ? <small className="orange">{rating} Bad</small>
                                : rating > 1 && rating <= 2 ? <small className="orange">{rating} Poor</small>
                                    : rating > 2 && rating <= 3 ? <small className="orange">{rating} Good</small>
                                        : rating > 3 && rating <= 4 ? <small className="orange">{rating} Outstanding</small>
                                            : <small className="orange">{rating} Excellent</small>
                        }
                    </div>

                    <div className="card-body">
                        <small className="text-muted font-weight-bold"> {area} M {accomodation_type} . {guest} Guests . {bedroom} Bedroom</small><br></br>
                        <small className="text-muted font-weight-bold">{property_name}</small><br></br>
                        <small className="text-muted font-weight-lighter">{city} ,{state}, {country}</small>
                    </div>
                    <div className="card-footer">
                        <span className="float-left">
                            <h5 className="font-weight-bold">$ {price} </h5>
                            <small className="text-++d">virbo</small>
                            <small><StarComponent actual={Math.ceil(rating)} /></small>
                        </span>
                        <span className="float-right">
                            <Link to={`/detailscard/tripping/?id=${property_id}&check_in=${check_in}&check_out=${check_out}&country=${country}&state=${state}&locality=${locality}&area=${area}&accomodation=${accomodation_type}`} target='_blank' >
                                <button className="button">View Deal</button>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarouselCard;