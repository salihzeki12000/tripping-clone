import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS} from './actionTypes'

import axios from 'axios'

export const signinUserRequest = payload =>({
    type:SIGNIN_USER_REQUEST,
    payload:payload
})

export const signininUserSuccess = payload =>({
    type:SIGNIN_USER_SUCCESS,
    payload
})

export const signinUserFailure = payload =>({
    type:SIGNIN_USER_FAILURE,
    payload
})

export const signinUserCheck = payload =>dispatch=>{
    dispatch(signinUserRequest(payload))
    console.log(payload)
    var data = JSON.stringify(payload);

    var config = {
        method: 'post',
        url: 'http://trippingb.gunjan.tech/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(res => res.data)
        .then(res => dispatch(signinUserSuccess(res)))
        .catch(err => dispatch(signinUserFailure(err)));
}