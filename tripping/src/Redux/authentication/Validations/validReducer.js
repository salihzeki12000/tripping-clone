import {GOGOGLE_SIGNIN, EMAIL_VALID, PASS_VALID} from './actionTypes'


var emailValidator = require("email-validator");
var passwordValidator = require('password-validator')

var schema = new passwordValidator()

schema.is().min(8)
schema.has().digits()
schema.has().uppercase()
schema.has().lowercase()
schema.has().symbols() 
schema.has().not().spaces() 
 

const initState = {
  authFlag:false,
  checkEmailFlag:false,
  checkPassFlag:false
}

const reducer = (state=initState, {type,payload}) => {
    switch(type) {
        // case GOGGLE_SIGNIN :{

        // }

        case EMAIL_VALID :{
          console.log(payload)
         var checkEmail =  emailValidator.validate(payload)
            return {
              ...state,
              checkEmailFlag:checkEmail
            }
        }

        case PASS_VALID :{
          console.log(payload)
         var checkPass =  schema.validate(payload)
            return {
              ...state,
              checkPassFlag:checkPass
            }
        }
        default:
            return state
    }
}

export default reducer