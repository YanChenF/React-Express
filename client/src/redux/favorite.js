import * as ActionTypes from './ActionTypes';

export function Favorite(state = {
    errMess: null,
    favorites: null,
    isLoading: false
    }, action) {
    switch(action.type) {
        case ActionTypes.ADD_FAVORITE:
            return {...state, errMess: null, isLoading: false, favorites: action.payload};
        case ActionTypes.FAVORITES_LOADING:
            return {...state, errMess: null, isLoading: true, favorites: null};
        case ActionTypes.FAVORITES_ERR:
            return {...state, errMess: action.payload, isLoading: false, favorites: null};
        default: return state;
    }
}