import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label, 
    Button, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control, Errors} from 'react-redux-form';

const minLenth = (len) => (val) => (val) && (val.length >= len);
const maxLenth = (len) => (val) => !(val) || (val.length <= len);
const required = (val) => (!!val);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            phone : '',
            email : '',
            agree : false,
            contactType : 'Phone',
            message : '',
            touched: {
                firstname: false,
                lastname: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        //alert(JSON.stringify(values));
        console.log(JSON.stringify(values));
        console.log(JSON.parse(JSON.stringify(values)));
        this.props.addFeedback(values);
        this.props.resetFeedbackForm();
        //event.preventDefault();
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: {
                ...this.state.touched, [field]: true
            }
        });
    }

    render() {
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h4>Send us your feedback!</h4>
                    </div>
                    <div className='col-12 col-md-9'>


                        <Form model='feedback' onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='firstname' md={2}>First name:</Label>
                                <Col md={10}>
                                <Control.text model='.firstname' placeholder='firstname' className='form-control'
                                name='firstname' 
                                id='firstname'
                                validators={{
                                    required, minLenth: minLenth(3), maxLenth: maxLenth(15)
                                }}
                                 />
                                 <Errors model='.firstname' show='touched' className='text-danger'
                                 messages={{
                                     required: 'Required ',
                                     minLenth: 'Must longer than 3 characters',
                                     maxLenth: 'Must shorter than 15 characters'
                                 }}
                                 />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='lastname' md={2}>Last name:</Label>
                                <Col md={10}>
                                <Control.text model='.lastname' placeholder='lastname' className='form-control'
                                name='lastname' 
                                id='lastname' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='telnum' md={2}>Phone:</Label>
                                <Col md={10}>
                                <Control.text model='.telnum' placeholder='phone' className='form-control'
                                name='telnum' 
                                id='telnum' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='email' md={2}>Email:</Label>
                                <Col md={10}>
                                <Control.text model='.email' placeholder='email' className='form-control'
                                name='email' 
                                id='email' />
                                </Col>
                            </Row>
                            <Row className='form-group'>

                                <Col md={{size: 6, offset: 2}}>
                                <div className='form-check'>
                                <Label check> 
                                <Control.checkbox model='.checkbox' className='form-check-input'
                                name='agree' /> May we contact you? </Label>
                                </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                <Control.select model='.select' className='form-control'
                                name='contactType'  >
                                <option>Tel.</option>
                                <option>Email</option>
                                </Control.select>
                                </Col>                               
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='message' md={2}>Message:</Label>
                                <Col md={10}>
                                <Control.textarea model='.message' className='form-control'
                                rows='12'
                                name='message' 
                                id='message' />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 10, offset: 2}} >

                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>

                </div>
            </div>
        );
    }
    
}

export default Contact;