import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default function StarComponent(props) {
    const {actual} = props;
    return (
        <div>
            <StarRatingComponent
                name="rate1"
                editing={false}
                renderStarIcon={() => <span><i class="fa fa-star"></i></span>}
                starCount={5}
                value={actual}
            />
        </div>
    )
}
