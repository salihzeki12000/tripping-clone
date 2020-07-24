
import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS} from './actionTypes'

import axios from 'axios'
 
const initState = {
    isLogin:'abc',
    messageLogin:"",
    username:'',
    token:'x'
}

const signinReducer = (state = initState, {type,payload})=>{
   console.log(payload,'reducer top')
    switch(type){
        case SIGNIN_USER_REQUEST:
            return {
                ...state
            }
        case SIGNIN_USER_SUCCESS:
            console.log(payload, 'reducer')
           
            return{
                ...state,
                isLogin:payload.error,
                messageLogin: payload.message,
                token:payload.token
            }
        case SIGNIN_USER_FAILURE:
            return{
                ...state,
                isLogin:payload.error,
                messageLogin: payload.message
            }
        default:
            return state 
    }
}

export default signinReducer