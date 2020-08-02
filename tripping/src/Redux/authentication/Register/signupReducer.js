import {SIGNUP_USER_FAILURE, SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, GET_USER} from './actionTypes'
 
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
            saveData('token', payload.token)
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