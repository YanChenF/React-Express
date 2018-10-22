import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => {
    return ({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    });
}

export const postComment = (dishId, comment, rating) => (dispatch => {
    const newComment = { dishId, comment, rating };
    newComment.date = new Date().toISOString();
    const bearer = 'Bearer ' + localStorage.getItem('token');

    fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-type": "application/json",
            "Authorization": bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(data => dispatch(addComment(data)))
    .catch(error => {console.log('post comments', error.message); 
    alert('Your comment could not be posted\nError: '+error.message);});
});

// fetch dishes data
export const fetchDishes = () => (dispatch => {
    dispatch(dishesLoading(true));

    fetch(baseUrl + 'dishes')
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(data => dispatch(addDishes(data)))
    .catch(error => dispatch(dishesFailed(error.message)));
});

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


//fectch comments data
export const fetchComments = () => (dispatch => {
    fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(data => dispatch(addComments(data)))
    .catch(error => dispatch(commentsFailed(error.message)));
});

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// fetch promotions data

export const fetchPromos = () => (dispatch => {
    dispatch(promosLoading(true));

    fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(data => dispatch(addPromos(data)))
    .catch(error => dispatch(promosFailed(error.message)));
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

//fetch leaders data

export const fetchLeaders = () => (dispatch => {
    dispatch(leadersLoading(true));

    fetch(baseUrl + 'leaders')
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(data => dispatch(addLeaders(data)))
    .catch(error => dispatch(leadersFailed(error.message)));
});

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

//add feedback

// export const addFeedback = (feedback) => ({
//     action: ActionTypes.ADD_FEEDBACK,
//     payload: feedback
// });

export const postFeedback = (values) => (dispatch => {
    var newFeedback = JSON.parse(JSON.stringify(values));
    newFeedback.date = new Date().toISOString();
    fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) return response;
        var error = new Error('Error: ' + response.status + response.statusText);
        error.response = response;
        throw error;
    }, error => {
        throw error;
    })
    .then(response => response.json())
    .then(data => {
        const message = 'Thank you for your feedback ' + JSON.stringify(data);
        alert(message);})
    .catch(error => {console.log('post feedback', error.message); 
    alert('Your feedback could not be posted\nError: '+error.message);});
});

export const requestLogin = (creds) => ({
    type: ActionTypes.REQUEST_LOGIN,
    creds
});

export const loginSuccess = () => ({
    type: ActionTypes.LOGIN_SUCCESS
});

export const loginFailure = (errMess) => ({
    type: ActionTypes.LOGIN_ERR,
    errMess
});

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));
    fetch(baseUrl + 'users/login', {
        method: "POST",
        body: JSON.stringify(creds),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if(response.ok) return response;
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    }, err => {
        throw err;
    })
    .then(response => response.json())
    .then(response => {
        if(response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(fetchFavorites());
            dispatch(loginSuccess());
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(err => dispatch(loginFailure(err.message)));
}

export const requestLogout = () => ({
    type: ActionTypes.REQUEST_LOGOUT
});

export const receiveLogout = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
})

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed('401 Not Authorized'));
    dispatch(receiveLogout());
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errMess) => ({
    type: ActionTypes.FAVORITES_ERR,
    payload: errMess
});

export const addFavorites = (fav) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: fav
});

// export const fetchFavorites = () => (dispatch) => {
//     dispatch(favoritesLoading(true));
//     const bearer = 'Bearer ' + localStorage.getItem('token');
//     return fetch(baseUrl + 'favorites', {
//         headers: {
//             'Authentication': bearer
//         },
//         credentials: "same-origin"
//     })
//     .then(response => {
//         if(response.ok) return response;
//         else {
//             var err = new Error('Error ' + response.status + ': ' + response.statusText);
//             err.response = response;
//             throw err;
//         }
//     }, err => {
//         throw err;
//     })
//     .then(response => response.json())
//     .then(favorites => dispatch(addFavorites(favorites)))
//     .catch(err => dispatch(favoritesFailed(err.message)));
// };

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => {console.log(favorites); dispatch(addFavorites(favorites))})
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const postFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'favorites', {
        body: JSON.stringify({_id: dishId}),
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': bearer           
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) return response;
        else {
            var err = new Error('Error ' + response.status + response.statusCode);
            err.response = response;
            throw err;
        }
    }, err => {throw err;})
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(err => dispatch(favoritesFailed(err.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Authorization': bearer               
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) return response;
        else {
            var err = new Error('Error ' + response.status + response.statusCode);
            err.response = response;
            throw err;
        }
    }, err => {throw err;})
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(err => dispatch(favoritesFailed(err.message)));
}