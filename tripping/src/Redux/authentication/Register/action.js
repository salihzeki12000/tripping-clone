import {SIGNUP_USER_FAILURE, SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, GET_USER} from './actionTypes'

import axios from 'axios'


export const signupUserRequest = payload =>({
    type:SIGNUP_USER_REQUEST,
    payload:payload
})

export const signupUserSuccess = payload =>({
    type:SIGNUP_USER_SUCCESS,
    payload
})

export const signupUserFailure = payload =>({
    type:SIGNUP_USER_FAILURE,
    payload
})

export const getUser = payload => ({
    type:GET_USER,
    payload
})

export const signupUserCheck = payload =>dispatch=>{
    dispatch(signupUserRequest(payload))
    console.log(payload, 'called signin')
    // var data = JSON.stringify(payload);

    // var config = {
    //     method: 'post',signupUserRequestsignupUserRequest
    //     url: 'http://a52b28395722.ngrok.io/auth/login_from_app',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    // };

    axios.post("https://ec285aed79cd.ngrok.io/auth/signup_from_app", payload)
        .then(res => res.data)
        .then(res => dispatch(signupUserSuccess(res)))
        .catch(err => dispatch(signupUserFailure(err)));
}
