
import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS} from './actionTypes'

import axios from 'axios'
 
const initState = {
    isLogin:'abc',
    messageLogin:"",
    username:''
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
            axios.get("http://eba6e9ff2887.ngrok.io/auth/get_user_info?auth_token="+ payload)
            .then(res => console.log(res))
            return{
                ...state,
                isLogin:payload.error,
                messageLogin: payload.message
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