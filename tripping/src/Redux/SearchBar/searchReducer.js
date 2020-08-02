import {INCREMENT,DECREMENT, SEARCHDATA, DATES, NOOFDAYS} from './actionTypes'
import { setGlobalDateMasks } from 'fecha'

const initState = {
    guestCounter:1,
    bedroomCounter:1,
    searchData:{
        region:'',
        startDate:'',
        endDate:''
    },
    dates: {
        check_in:'',
        check_out:''
    },
    days:1
}
 
const reducer = (state=initState,{type,payload})=>{
    switch(type){
        case INCREMENT: {
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
        }   
        case DECREMENT: {
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
        }

        // case SEARCHDATA: {
        //     return {
        //         ...state,
        //         searchData:{...searchData, payload}
        //     }
        // }

        case DATES: {
            return {
                ...state,
                dates: {...state.dates, check_in:payload.check_in, check_out:payload.check_out}
            }
        }

        case NOOFDAYS:{
            console.log(payload)
            return {
                ...state,
                days:payload
            }
        }

        default:
            return state
    }
}


export default reducer;