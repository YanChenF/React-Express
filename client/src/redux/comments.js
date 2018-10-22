import * as ActionTypes from './ActionTypes';

export function Comments(state = {
    errMess: null,
    comments: []
    }, action) {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.ADD_COMMENT:
            var newComment = action.payload;
            return {...state, comments: state.comments.concat(newComment)};
        default: return state;
    }
}