import React from 'react';
import { Loading } from './loading';
import { Breadcrumb, BreadcrumbItem, Media, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

const RenderMenuItem = ({dish, deleteFavorite}) => (
    <Media tag='li'>
        <Media left>
            <Media object src={baseUrl + dish.image} alt={dish.name}/>
        </Media>
        <Media body>
            <Media heading>{dish.name}</Media>
            <p>{dish.description}</p>
            <Button outline onClick={() => deleteFavorite(dish._id)}>
                <span className='fa fa-times'></span>
            </Button>
        </Media>
    </Media>
)

const Favorites = (props) => {

    if(props.favorites.isLoading) {
        return <div className='container'>
            <div className='row'>
                <Loading /> 
            </div>
        </div>
    } else if(props.favorites.errMess) {
        return  (<div className="container">
            <div className="row">
                <h4>{props.favorites.errMess}</h4>
            </div>
        </div>)
    } else if(props.favorites.favorites) {
        const favorites = props.favorites.favorites.dishes.map(dish => {
            return (
                <div className='col-12 mt-5' key={dish._id}>
                    <RenderMenuItem dish={dish} deleteFavorite={props.deleteFavorite}/>
                </div>
            );
        })
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className='col-12'>
                    <h4>My Favorites</h4>
                    <hr />
                </div>
                <div className='row'>
                    <Media list>
                        {favorites}
                    </Media>
                </div>
            </div>
        )
    } else {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>You have no favorites</h4>
                </div>
            </div>
        );
    }
}

export default Favorites;