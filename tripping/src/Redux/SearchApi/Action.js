import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION
} from './ActionTypes'

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

export const getDataFromAPI = (country = "", state = "", city = "", free_cancellation = "", rating="", bedroom = "", guest = "", sort = "", price = "", aminities = "") => dispatch => {
    dispatch(apiRequest(payload))
    console.log(payload, 'called api')

    axios.get("http://3b5fec4d507f.ngrok.io/search/s?country=&state=&city=&free_cancellation=&rating=&bedroom=&guest=&sort=&price=&aminities=", {
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



