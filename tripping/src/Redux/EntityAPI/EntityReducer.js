import {
 IMAGEREQUEST, DATAREQUEST, REVIEWREQUEST, RECOMMENDATIONREQUEST, BOOKINGREQUEST
} from './ActionTypes'

const initState = {
   images:[],
   data:[],
   review:[],
   recommendations:[],
   bookingResponse:[]
}

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case IMAGEREQUEST : {
            return {
                ...state,
                images:payload.result
            }
        }
        
        case DATAREQUEST: {
            console.log(payload)
            return {
                ...state,
                data:payload.result
            }
        }
        case REVIEWREQUEST: {
            console.log(payload)
            return {
                ...state,
                // review:payload.result.sort((a,b) => b.rating - a.rating)
                review:payload.result
            }
        }
        case RECOMMENDATIONREQUEST: {
            console.log(payload)
            return {
                ...state,
                // review:payload.result.sort((a,b) => b.rating - a.rating)
                recommendations:payload.result
            }
        }
        case BOOKINGREQUEST: {
            console.log(payload)
            return {
                ...state,
                bookingResponse:payload
            }
        }
        default:
            return state
    }
}


export default reducer;