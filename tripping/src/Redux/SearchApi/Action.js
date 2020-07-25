import {APIREQUEST, APISUCCESS, APIFAILURE} from './ActionTypes'

export const apiRequest = (payload) => ({
    type:APIREQUEST,
    payload
})

export const apiSuccess = (payload) => ({
    type:APISUCCESS,
    payload
})

export const apiFailure = (payload) => ({
    type:APIFAILURE,
    payload
})

export const getDataFromAPI = payload =>dispatch=>{
    dispatch(apiRequest(payload))
    console.log(payload, 'called api')
    // var data = JSON.stringify(payload);

    // var config = {
    //     method: 'post',signupUserRequestsignupUserRequest
    //     url: 'http://a52b28395722.ngrok.io/auth/login_from_app',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data : data
    // };

    axios.post("", payload)
        .then(res => res.data)
        .then(res => dispatch(apiSuccess(res)))
        .catch(err => dispatch(apiFailure(err)));
}


