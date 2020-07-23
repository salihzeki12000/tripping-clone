 
import {createStore} from 'redux';
import searchReducer from './searchBar/searchReducer';

const store = createStore(searchReducer);

export default store;