import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label, CardImgOverlay } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './loading';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

//import CommentForm from './commentForm';

const minLenth = (len) => (val) => (val) && (val.length >= len);
const maxLenth = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.comment, values.rating)

    }

    render() {
        return (
            <div>
                <Button outline color='secondary' onClick={this.toggleModal}><span className='fa fa-edit fa-lg'></span>Submit comment!</Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} initialState={{yourname: ''}}>
                            <Row className='form-group'>
                                <Label htmlFor='rating' md={3}>Rating</Label>
                                <Col md={9}>
                                    <Control.select model='.rating' name='rating' id='rating' className='form-control'>
                                        <option></option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            {/* <Row className='form-group'>
                                <Label htmlFor='author' md={3}>Your name</Label>
                                <Col md={9}>
                                    <Control.text 
                                    model='.author' name='author' id='author' className='form-control'
                                    validators={{
                                        minLenth: minLenth(3), maxLenth: maxLenth(15)
                                    }} />
                                    <Errors className='text-danger'
                                    show='touched' model='.author'
                                    messages={{
                                        minLenth: 'Name must be longer than 3 charaters',
                                        maxLenth: 'Name must be less than 15 characters'
                                    }}></Errors>
                                </Col>
                            </Row> */}
                            <Row className='form-group'>
                                <Label htmlFor='comment' md={3}>Comment</Label>
                                <Col md={9}>
                                    <Control.textarea model='.comment' name='comment' id='comment' className='form-control' rows='6'/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 9, offset: 3}}><Button type='submit' value='submit' color='primary'>Submit</Button></Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderComments({comments, addComment, dishId, errMess}) {
    if(errMess) return <p>{errMess}</p>
    const dishComments = comments.map((comment) => {
        const date = new Date(comment.updatedAt);
        return (
        <Fade in key={comment._id}><li >
            <p>{comment.comment}</p>
            <p>--{comment.author.firstname} {comment.author.lastname}, {date.toLocaleDateString()}</p>   
        </li>
        </Fade>
        )
    });
    
    if(comments.length <= 0) return (<div className='col-12 col-md-5 m-1'>
        <h4>Comments</h4>
        <p>No comments yet!</p>
        <CommentForm addComment={addComment} dishId={dishId}/>
    </div>);
     
        return (
            <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        <Stagger in>{dishComments}
                        </Stagger>
                        
                    </ul>
                    <CommentForm addComment={addComment} dishId={dishId}/>
            </div>
        )
    }

function RenderDish({dish, favorite, postFavorite, deleteFavorite}) {
        
        return (
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top width='100%' src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <Button outline onClick={() => favorite ? deleteFavorite(dish._id) : postFavorite(dish._id)}>
                        {favorite? 
                        <span className='fa fa-heart'></span>
                        :
                        <span className='fa fa-heart-o'></span>    
                    }
                    </Button>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }

const DishDetail = ({dish, comments, addComment, isLoading, errMess, commentsErrMess,
        favorite, postFavorite, deleteFavorite}) => {
    if(isLoading) {
        return (
        <div className='container'>
            <div className='row'>
                <Loading /> 
            </div>
        </div>);
    } else if(errMess) {
        return <p>{errMess}</p>
    } else if(dish !== null)
        return(
        <div className='container'>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={dish} favorite={favorite} postFavorite={postFavorite} deleteFavorite={deleteFavorite} />
                </div>
                <RenderComments comments={comments} addComment={addComment} dishId={dish._id} errMess={commentsErrMess}/>
            </div>
        </div>
        );
}



export default DishDetail;