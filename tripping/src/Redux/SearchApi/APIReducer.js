import {
    APIREQUEST,
    APISUCCESS,
    APIFAILURE,
    FREECANCELLATION
} from './ActionTypes'

const initState = {
    loc:'Germany',
    check_in:'',
    check_out:'',
    free_cancellation: "",
    bedroom: "",
    quest: "",
    rating:"",
    sort: "",
    price: "",
    aminities: "",
    data: [],
    url:"http://localhost:3000/vacation-rentals/s/search",
    total:null,
    page:1,
    per_page:6
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
                data:payload.result,
                total:payload.total_pages
            }
        default:
            return state
    }
}


export default reducer;