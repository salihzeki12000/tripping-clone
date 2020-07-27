import {
    IMAGEREQUEST,
    DATAREQUEST,
     REVIEWREQUEST
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

export const getImageRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
  
    axios.get("http://3f5a8e3ada55.ngrok.io/search/" + payload)
        .then(res => res.data)
        .then(res => dispatch(imageRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const getDataRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
  
    axios.get("http://3f5a8e3ada55.ngrok.io/entity/basic_detail/" + payload)
        .then(res => res.data)
        .then(res => dispatch(dataRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const getReviewRequest = (payload) => dispatch => {
    // console.log('getDataFromAPI')
  
    axios.get("http://3f5a8e3ada55.ngrok.io/entity/review/" + payload)
        .then(res => res.data)
        .then(res => dispatch(reviewRequest(res)))
        // .catch(err => dispatch(apiFailure(err)));
}

export const changeFreeCancellation = payload => ({
    type: FREECANCELLATION,
    payload
})



