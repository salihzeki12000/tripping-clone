
import { SIGNIN_USER_FAILURE, SIGNIN_USER_REQUEST, SIGNIN_USER_SUCCESS, GET_USERDATA } from './actionTypes'




function getData(key) {
    try {
        let data = localStorage.getItem(key)
        data = JSON.parse(data)
        return data
    }
    catch{
        return undefined
    }
}


function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}


const initState = {
    isLogin: 'abc',
    messageLogin: "",
    username: '',
    token: 'x',
    userData: ""
}

const signinReducer = (state = initState, { type, payload }) => {
    console.log(payload, 'reducer top')
    switch (type) {
        case SIGNIN_USER_REQUEST:
            return {
                ...state
            }
        case SIGNIN_USER_SUCCESS:
            console.log(payload, 'reducer')
            // axios.get("http://94e1f8c3880d.ngrok.io/auth/get_user_info?auth_token=",+ this.props.token )

            // token(payload.token)
            saveData('token', payload.token)
            return {
                ...state,
                isLogin: payload.error,
                messageLogin: payload.message,
                token: payload.token
            }
        case SIGNIN_USER_FAILURE:
            return {
                ...state,
                isLogin: payload.error,
                messageLogin: payload.message
            }

        case GET_USERDATA:
            console.log(payload)
            saveData('user', payload.data)
            return {
                ...state,
                isLogin:payload.error,
                userData: payload.data
            }
        default:
            return state
    }
}

export default signinReducer