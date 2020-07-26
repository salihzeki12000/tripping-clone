import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION
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

export const getDataFromAPI = (country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities) => dispatch => {
    dispatch(apiRequest(country, state, city, free_cancellation, rating, bedroom, guest, sort, price, aminities))
    // console.log(payload, 'called api')
    console.log(country, state, 'action')
    axios.get("http://ccce2112eab9.ngrok.io/search/s", {
        params: {
            country: country,
            state: state,
            city: city,
            free_cancellation: free_cancellation,
            rating: rating,
            bedroom: bedroom,
            guest: guest,
            sort: sort,
            price: price,
            aminities: aminities
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



