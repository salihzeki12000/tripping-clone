import {
 IMAGEREQUEST, DATAREQUEST, REVIEWREQUEST
} from './ActionTypes'

const initState = {
   images:[],
   data:[],
   review:[]
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
                review:payload.result.sort((a,b) => b.rating - a.rating)
            }
        }
        default:
            return state
    }
}


export default reducer;