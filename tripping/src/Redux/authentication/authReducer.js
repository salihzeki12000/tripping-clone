import {GOGOGLE_SIGNIN, EMAIL_VALID} from './actionTypes'




var validator = require("email-validator");
 

const initState = {
  authFlag:false,
  checkEmailFlag:false,
}

const reducer = (state=initState, {type,payload}) => {
    switch(type) {
        // case GOGGLE_SIGNIN :{

        // }

        case EMAIL_VALID :{
          console.log(payload)
         var checkEmail =  validator.validate(payload)
            return {
              ...state,
              checkEmailFlag:checkEmail
            }
        }

        default:
            return state
    }
}

export default reducer