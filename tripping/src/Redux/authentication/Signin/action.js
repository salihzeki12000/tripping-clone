import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS} from './actionTypes'

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

export const signinUserCheck = payload =>dispatch=>{
    dispatch(signinUserRequest(payload))
    console.log(payload, 'called signin')
    // var data = JSON.stringify(payload);

    // var config = {
    //     method: 'post',
    //     url: 'http://a52b28395722.ngrok.io/auth/login_from_app',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    // };

    axios.post("http://94e1f8c3880d.ngrok.io/auth/login_from_app", payload)
        .then(res => res.data)
        .then(res => dispatch(signinUserSuccess(res)))
        .catch(err => dispatch(signinUserFailure(err)));

}