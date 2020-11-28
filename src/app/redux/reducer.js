import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const appReducer = combineReducers({
    currentUser: userReducer
})

export default appReducer;
