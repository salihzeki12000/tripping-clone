import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION
} from './ActionTypes'

const initState = {
    country: 'France',
    state: "",
    city: "",
    free_cancellation: "",
    bedroom: "",
    quest: "",
    sort: "",
    price: "",
    aminities: "",
    data: []
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FREECANCELLATION:
            return {
                ...state,
                free_cancellation:payload
            }
        
        case APISUCCESS:
            return {
                ...state,
                data:payload
            }
        default:
            return state
    }
}


export default reducer;