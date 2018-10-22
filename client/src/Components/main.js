import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Menu from './menu';
import Header from './header';
import Footer from './footer';
import DishDetail from './dishdetail';
import About from './about';
import Home from './home';
import Contact from './contactus';
import Favorites from './favorites';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchLeaders, fetchPromos, loginUser, logoutUser,
        fetchFavorites, postFavorite, deleteFavorite
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFavorites();
    }

    render() {
        const Homepage = (props) => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promo={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishById = ({match}) => {
            return (
                this.props.auth.isAuthenticated ? 
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.id)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === match.params.id)}
                commentsErrMess={this.props.comments.errMess}
                addComment={this.props.postComment}
                favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.id)}
                postFavorite={this.props.postFavorite}
                deleteFavorite={this.props.deleteFavorite}/>
                :
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.id)[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === match.params.id)}
                commentsErrMess={this.props.comments.errMess}
                addComment={this.props.postComment}
                favorite={false}
                postFavorite={this.props.postFavorite}
                deleteFavorite={this.props.deleteFavorite}/>
            );
        }

        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                    this.props.auth.isAuthenticated ? 
                    <Component {...props}/>
                    : 
                    <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }}/> 
                )}/>
            )

        return (<div>
            <Header loginUser={this.props.loginUser} auth={this.props.auth} logoutUser={this.props.logoutUser}/>
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames='page' timeout={300} >
                    <Switch location={this.props.location}>
                        <Route path="/home" component={Homepage}/>
                        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                        <Route path='/contact' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                        addFeedback={this.props.postFeedback}/>} />
                        <Route path='/menu/:id' component={DishById} />
                        <Route path='/about' component={() => <About leaders={this.props.leaders} />} />
                        <PrivateRoute exact path='/favorites' component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite}/>} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            
            <Footer />
        </div>);
        
    };
}

function mapStateToProps({dishes, promotions, leaders, comments, auth, favorites}) {
    return {dishes, promotions, leaders, comments, auth, favorites};
}

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
        postFeedback: (values) => dispatch(postFeedback(values)),
        fetchDishes: () => { dispatch(fetchDishes())},
        resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
        fetchComments: () => { dispatch(fetchComments())},
        fetchPromos: () => { dispatch(fetchPromos())},
        fetchLeaders: () => { dispatch(fetchLeaders())},
        loginUser: (creds) => {dispatch(loginUser(creds))},
        logoutUser: () => {dispatch(logoutUser())},
        postFavorite: (dishId) => { dispatch(postFavorite(dishId))},
        deleteFavorite: (dishId) => { dispatch(deleteFavorite(dishId))},
        fetchFavorites: () => { dispatch(fetchFavorites())}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));