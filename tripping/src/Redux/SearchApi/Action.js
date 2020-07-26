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

export const getDataFromAPI = (country , state , city, free_cancellation , rating, bedroom , guest , sort, price, aminities) => dispatch => {
    dispatch(apiRequest(country , state , city, free_cancellation , rating, bedroom , guest , sort, price, aminities))
    // console.log(payload, 'called api')
    console.log(country, state, 'action')
    // axios.get("http://3b5fec4d507f.ngrok.io/search/s?country="+country+"&state=&city=Berck&free_cancellation=&rating=&bedroom=&guest=&sort=&price=&aminities=", {
        axios.get("http://875ba58a3ea2.ngrok.io/search/s", {
        params: {
            country: country,
            state: state,
            city: city,
            free_cancellation: free_cancellation,
            rating:rating,
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



