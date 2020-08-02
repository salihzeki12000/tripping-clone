import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS, GET_USERDATA} from './actionTypes'

import axios from 'axios'

export const signinUserRequest = payload =>({
    type:SIGNIN_USER_REQUEST,
    payload:payload
})

export const signinUserSuccess = payload =>({
    type:SIGNIN_USER_SUCCESS,
    payload
})

export const signinUserFailure = payload =>({
    type:SIGNIN_USER_FAILURE,
    payload
})

export const getUser = payload => ({
    type:GET_USERDATA,
    payload
})

export const userDataRequest = payload => {
        
     axios.get("https://ec285aed79cd.ngrok.io/auth/get_user_info?auth_token=", {
         params:{
             token:payload
         }
     } )
     .then(res => dispatch(getUser(res.data)))

}

export const signinUserCheck = payload =>dispatch=>{
    dispatch(signinUserRequest(payload))
    console.log(payload, 'called signin')
 

    axios.post("https://ec285aed79cd.ngrok.io/auth/login_from_app", payload)
        .then(res => res.data)
        .then(res => dispatch(signinUserSuccess(res)))
        .catch(err => dispatch(signinUserFailure(err)));

}