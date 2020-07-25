import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import validationsReducer from './authentication/Validations/validReducer';
import signinReducer from './authentication/Signin/signinReducer';
import searchReducer from './SearchBar/searchReducer';
import signupReducer from './authentication/Register/signupReducer'
import apiReducer from './SearchApi/APIReducer'

const rootReducer = combineReducers({
     validation: validationsReducer,
     signin: signinReducer,
     search: searchReducer,
     signup: signupReducer,
     data: apiReducer
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    createComposer(applyMiddleware(thunk))
    )

export default store;
