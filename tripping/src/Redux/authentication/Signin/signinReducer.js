
import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS} from './actionTypes'
 
const initState = {
    isLogin:'abc',
    messageLogin:""
}

const signinReducer = (state = initState, {type,payload})=>{

    switch(type){
        case SIGNIN_USER_REQUEST:
            return {
                ...state
            }
        case SIGNIN_USER_SUCCESS:
            return{
                ...state,
                isLogin:payload.error,
                messageLogin: payload.msg
            }
        case SIGNIN_USER_FAILURE:
            return{
                ...state,
                isLogin:payload.error,
                messageLogin: payload.msg
            }
        default:
            return state 
    }
}

export default signinReducer