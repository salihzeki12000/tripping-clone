import {GOOGLE_SIGNIN, EMAIL_VALID} from './actionTypes'

export const googleSignin = payload => ({
     type:GOOGLE_SIGNIN,
     payload 
})

export const emailValidation = payload => ({
     
     type:EMAIL_VALID,
     payload 
})

