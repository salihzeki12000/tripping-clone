import {createStore} from 'redux'
// import authReducer from './reducer'
import reducer from './authentication/authReducer'

const store = createStore(reducer)
export default store
