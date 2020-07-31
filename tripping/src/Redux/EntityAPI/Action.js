import {
    IMAGEREQUEST,
    DATAREQUEST,
     REVIEWREQUEST,
     RECOMMENDATIONREQUEST,
     BOOKINGREQUEST
} from './ActionTypes'
import axios from 'axios'

export const imageRequest = (payload) => ({
    type: IMAGEREQUEST,
    payload
})

export const dataRequest = (payload) => ({
    type: DATAREQUEST,
    payload
})

export const reviewRequest = (payload) => ({
    type: REVIEWREQUEST,
    payload
})

export const recommendationRequest = (payload) => ({
    type: RECOMMENDATIONREQUEST,
    payload
})

export const bookingRequest = (payload) => ({
    type: BOOKINGREQUEST,
    payload
})

export const getImageRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
  console.log(payload)
    axios.get("https://d9e34f5ae330.ngrok.io/entity/images/" + payload)
        .then(res => res.data)
        .then(res => dispatch(imageRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const getDataRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
    console.log(payload)
    axios.get("https://d9e34f5ae330.ngrok.io/entity/basic_detail/" + payload)
        .then(res => res.data)
        .then(res => dispatch(dataRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const getReviewRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
    console.log(payload)
    axios.get("https://d9e34f5ae330.ngrok.io/entity/review/" + payload)
        .then(res => res.data)
        .then(res => dispatch(reviewRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const getRecommendRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
    console.log(payload)
    axios.get("https://d9e34f5ae330.ngrok.io/entity/recommendation/" + payload)
        .then(res => res.data)
        .then(res => dispatch(recommendationRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}


export const getBookingRequest = (property_id, check_in, check_out) => dispatch => {
    // console.log('getDataFromAPI')
    // console.log(payload)
    axios.get("https://d9e34f5ae330.ngrok.io/entity/check_dates", {
        params: {
           property_id: property_id,
           check_in: check_in,
           check_out: check_out
        }
    })
        .then(res => res.data)
        .then(res => dispatch(bookingRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}





