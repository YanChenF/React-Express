import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const minLenth = (len) => (val) => (val) && (val.length >= len);
const maxLenth = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
        const output = JSON.stringify(values);
        console.log(output);
        alert(output);

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
                            <Row className='form-group'>
                                <Label htmlFor='yourname' md={3}>Your name</Label>
                                <Col md={9}>
                                    <Control.text 
                                    model='.yourname' name='yourname' id='yourname' className='form-control'
                                    validators={{
                                        minLenth: minLenth(3), maxLenth: maxLenth(15)
                                    }} />
                                    <Errors className='text-danger'
                                    show='touched' model='.yourname'
                                    messages={{
                                        minLenth: 'Name must be longer than 3 charaters',
                                        maxLenth: 'Name must be less than 15 characters'
                                    }}></Errors>
                                </Col>
                            </Row>
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

export default CommentForm;

// Rating, yourname comment