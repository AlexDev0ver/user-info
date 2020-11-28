import { combineReducers } from 'redux';
import ACTION from '../action-enum';

function user(state = null, action) {
    switch(action.type) {
        case ACTION.SET_USER:
            return action.payload
        case ACTION.LOGOUT:
            return null
        default:
            return null
    }
}

function loggedIn(state = false, action) {
    switch(action.type) {
        case ACTION.LOGIN:
            return true
        case ACTION.LOGOUT:
            return false
        case ACTION.SET_USER:
            return true
        default:
            return false
    }
}

export default combineReducers({
    user, loggedIn
})
