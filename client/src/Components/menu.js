import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loading';
import { baseUrl } from '../shared/baseUrl';

function Menu (props) {
    const menu = props.dishes.dishes.map((dish) => {
        return (<div className='col-12 col-md-5 m-1' key={dish._id}>
        <Link to={`/menu/${dish._id}`}>
            <Card>
                <CardImg top width='100%' src={baseUrl + dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
            
        </div>);
    });
    if(props.dishes.isLoading) {
        return (
        <div className='container'>
            <div className='row'>
                <Loading /> 
            </div>
        </div>);
    } else if(props.dishes.errMess) {
        return <p>{props.dishes.errMess}</p>
    } else if(props.dishes !== null)
    return (
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                {menu}
            </div>
        </div>
    );


}

    


export default Menu;