import {SIGNUP_USER_FAILURE, SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, GET_USER} from './actionTypes'
 
const initState = {
    isSignup:'abc',
    messageSignup:"",
    user:{success:false}
}

const signupReducer = (state = initState, {type,payload})=>{
   console.log(payload,'reducer top')
    switch(type){
        case SIGNUP_USER_REQUEST:
            return {
                ...state
            }
        case SIGNUP_USER_SUCCESS:
            console.log(payload, 'reducer')
            return{
                ...state,
                isSignup:payload.error,
                messageSignup: payload.message
            }
        case SIGNUP_USER_FAILURE:
            return{
                ...state,
                isLogin:payload.error,
                messageSignup: payload.message
            }

        case GET_USER:
            
        console.log(payload)
        return {
            ...state,
            user:payload
        }
        default:
            return state 
    }
}

export default signupReducer