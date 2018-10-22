import * as ActionTypes from './ActionTypes';

export function Auth(state = {
    errMess: null,
    isAuthenticated: localStorage.getItem('token') ? true: false,
    user: localStorage.getItem('token')? JSON.parse(localStorage.getItem('creds')) : null,
    isLoading: false
    }, action) {
    switch(action.type) {
        case ActionTypes.REQUEST_LOGIN:
            return {...state, errMess: null, isLoading: true, isAuthenticated: false, user: action.creds};
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, errMess: null, isLoading: false, isAuthenticated: true};
        case ActionTypes.LOGIN_ERR:
            return {...state, err: action.errMess, isLoading: false, user: null};
        case ActionTypes.REQUEST_LOGOUT:
            return {...state, isLoading: true, user: null};
        case ActionTypes.LOGOUT_SUCCESS: 
            return {...state, isLoading: false, isAuthenticated: false};
        default: return state;
    }
}