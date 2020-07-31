import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION,
} from './ActionTypes'
import axios from 'axios'

export const apiRequest = (payload) => ({
    type: APIREQUEST,
    payload
})

export const apiSuccess = (payload) => ({
    type: APISUCCESS,
    payload
})

export const apiFailure = (payload) => ({
    type: APIFAILURE,
    payload
})

export const getDataFromAPI = (loc,check_in,check_out,free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch => {
    console.log('getDataFromAPI')
    dispatch(apiRequest(loc, free_cancellation, rating, bedroom, guest, sort, price, aminities))
    console.log(loc,bedroom, guest, 'action')
    axios.get("https://22a9fddbc1bc.ngrok.io/search/s", {
        params: {
            location:loc,
            check_in:check_in,
            check_out:check_out,
            free_cancellation: free_cancellation,
            rating: rating,
            bedroom: bedroom,
            guest: guest,
            sort: sort,
            price: price,
            aminities: aminities,

        }
    })
        .then(res => res.data)
        .then(res => dispatch(apiSuccess(res)))
        .catch(err => dispatch(apiFailure(err)));
}

export const changeFreeCancellation = payload => ({
    type: FREECANCELLATION,
    payload
})



