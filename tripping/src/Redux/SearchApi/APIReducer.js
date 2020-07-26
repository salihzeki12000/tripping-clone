import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION
} from './ActionTypes'

const initState = {
    country: "France",
    state: "",
    city: "",
    free_cancellation: "",
    bedroom: "",
    quest: "",
    rating:4.5,
    sort: "",
    price: "",
    aminities: "",
    data: [],
    url:"http://localhost:3000/vacation-rentals/s/search"
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FREECANCELLATION:
            console.log(payload)
            return {
                ...state,
                free_cancellation:payload
            }
        
        case APISUCCESS:
            console.log(payload)
            return {
                ...state,
                data:payload.result
            }
        default:
            return state
    }
}


export default reducer;