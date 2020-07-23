import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import validationsReducer from './authentication/Validations/validReducer'
import signinReducer from './authentication/Signin/signinReducer';


const rootReducer = combineReducers({
     validation: validationsReducer,
     signin: signinReducer
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    createComposer(applyMiddleware(thunk))
    )

export default store
