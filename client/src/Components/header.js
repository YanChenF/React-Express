import React, { Component } from 'react';
import { Nav, Navbar , NavbarBrand, NavbarToggler, NavItem, Collapse, Jumbotron,
        Button, Modal, ModalHeader, ModalBody,
        Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({isOpen: !this.state.isOpen});
    }

    toggleModal() {
        this.setState({modal: !this.state.modal})
    }

    handleLogin(event) {
        this.toggleModal();
        const creds = {username: this.username.value, password: this.password.value};
        this.props.loginUser(creds);
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark color="primary" expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink to="/home" className="nav-link"><span className="fa fa-home fa-lg"> Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/menu" className="nav-link"><span className="fa fa-list fa-lg"> Menu</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/about" className="nav-link"><span className="fa fa-info fa-lg"> About </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/contact" className="nav-link"><span className="fa fa-address-card fa-lg"> Contact</span>
                                    </NavLink>
                                </NavItem>
                                {this.props.auth.isAuthenticated ? 
                                <NavItem>
                                    <NavLink to="/favorites" className="nav-link"><span className="fa fa-heart fa-lg"> My Favorites</span>
                                    </NavLink>
                                </NavItem> : null                                      
                            }
                            </Nav>
                            <Nav navbar className='ml-auto'>
                                <NavItem>
                                    {!this.props.auth.isAuthenticated ? 
                                     <Button outline onClick={this.toggleModal} className="nav-link"><span className='fa fa-sign-in fa-lg'></span>Log in!</Button>
                                    : 
                                    <Button outline onClick={this.handleLogout} className="nav-link"><span className='fa fa-sign-out fa-lg'></span>Log out!</Button>
                                }
                                </NavItem>
                            </Nav>
                        
                        </Collapse>
                        
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restaurant</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!
                                    
                                </p>

                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor='username' md={2}>Username</Label>
                                <Input type='text' id='username' name='username'
                                innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password' md={2}>Password</Label>
                                <Input type='password' id='password' name='password'
                                innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='checkbox' id='remember' name='remember'
                                    innerRef={(input) => this.remember = input} />Remember?
                                </Label> 
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            
        );
    }
}