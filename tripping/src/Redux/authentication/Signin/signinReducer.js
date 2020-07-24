
import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS , GET_USERDATA} from './actionTypes'
import { userData } from './action'

// import axios from 'axios'
 
const initState = {
    isLogin:'abc',
    messageLogin:"",
    username:'',
    token:'x', 
    userData:{}
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
            // axios.get("http://94e1f8c3880d.ngrok.io/auth/get_user_info?auth_token=",+ this.props.token )
        
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

            case GET_USERDATA:
                return{
                    ...state,
                    userData: payload
                }

        
        default:
            return state 
    }
}

export default signinReducer