import {GOOGLE_SIGNIN, EMAIL_VALID, PASS_VALID} from './actionTypes'

export const googleSignin = payload => ({
     type:GOOGLE_SIGNIN,
     payload 
})

export const emailValidation = payload => ({
     
     type:EMAIL_VALID,
     payload 
})

export const passValidation = payload => ({
     type: PASS_VALID,
     payload
})

