import {INCREMENT,DECREMENT} from './actionTypes'

const initState = {
    guestCounter:1,
    bedroomCounter:1
}
 
const reducer = (state=initState,{type,payload})=>{
    switch(type){
        case INCREMENT:
            console.log(payload)
        if(payload==='guest' && state.guestCounter<=19){
            return {
                ...state,
               guestCounter:state.guestCounter+1
            }
        }
        if(payload==='bedrooms' && state.bedroomCounter<=9){
            return {
                ...state,
                bedroomCounter:state.bedroomCounter+1
            }
        }    
        case DECREMENT:
            if(payload==='guest' && state.guestCounter>1){
                return {
                    ...state,
                   guestCounter:state.guestCounter-1
                }
            }
            if(payload==='bedrooms' && state.bedroomCounter>1){
                return {
                    ...state,
                    bedroomCounter:state.bedroomCounter-1
                }
            }
        default:
            return state
    }
}

export default reducer;