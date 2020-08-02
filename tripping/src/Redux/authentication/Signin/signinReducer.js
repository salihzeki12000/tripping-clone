
import {SIGNIN_USER_FAILURE,SIGNIN_USER_REQUEST,SIGNIN_USER_SUCCESS , GET_USERDATA} from './actionTypes'


// import axios from 'axios'
// const token = () => {
//    var x = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6Ikd1bmFqYW4iLCJsYXN0X25hbWUiOiJNYWhhamFuIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDctMjQgMTk6MDg6NTguODk0MzYxIiwiZXhwaXJlX2F0IjoiMjAyMC0wNy0yNSAxOTowODo1OC44OTQzODkifQ.naubi-GtpCtP0cpB8l4fX6xTldV_xEmMxGl_dbmWHno"
//     axios.get("http://159c2e4f2101.ngrok.io/auth/get_user_info?auth_token=",+ x )
//             .then(res => res.data)
//             .then(res => console.log(res))
// } 

function getData(key){
    try{
      let data = localStorage.getItem(key)  
      data  = JSON.parse(data)
      return data
    }
    catch{
      return undefined
    }
}


function saveData(key,data){
   localStorage.setItem(key,JSON.stringify(data))
}

 
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
           
            // token(payload.token)
            saveData('token', payload.token)
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