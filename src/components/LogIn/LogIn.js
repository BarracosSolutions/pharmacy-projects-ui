import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isUserAut: false,
      errorMessage: '',
      isPostSuccessful: false,
      show: false
    }

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const APIurl = localhost + "DBHandler.php/Employee_Session/";
    
    var employee = {};
    
    data.forEach(function(value, key){
      employee[key] = value;
    });


    var json = JSON.stringify(employee);
    fetch(APIurl, {
      method: 'POST',
      body: json
    }).then(response => response.json())
      .then(post => this.isUserAuthenticated(post))
      .then(isAuth => isAuth ? this.props.history.push({pathname:'/', state:{user:this.state.user, isUserAut: this.state.isUserAut}}) : "" )
      .then( _ => this.clearForm())
      .catch(error => this.setState({isError: true,errorMessage: error.message, show:true}));
  }

  isUserAuthenticated(data){
    if(data === false){
        this.setState({isUserAut: false, show:true, errorMessage: "Username or password are wrong"});
        return false;
    }
    else{
        this.setState({isUserAut:true, user: data});
        return true;
    }
  }
  
  clearForm(){
    document.getElementById("logInForm").reset();
  }

  render() {
    var alertMessage = '';
    if(!this.state.isUserAut){
      alertMessage = (<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <h4>Bad credentials</h4>
                        <p>{this.state.errorMessage}</p>
                      </Alert>);
    }
    else if(this.state.isPostSuccessful){
      alertMessage = (
        <Alert bsStyle="success" onDismiss={this.handleDismiss}>
          <h4>The drug was successfully saved</h4>
        </Alert>
      );
    }
    
    if(!this.state.show){
      alertMessage = '';
    }
    return (
      <div>
        {alertMessage}
        <h2>Log In</h2>
        <Form id="logInForm" onSubmit={this.handleSubmit} horizontal>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                User Name:
                </Col>
                <Col sm={8}>
                <FormControl id="UserNm" name="UserNm" type="text" placeholder="UserNm" />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                Password:
                </Col>
                <Col sm={8}>
                <FormControl id="Password" name="Password" type="password" />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col smOffset={1} sm={3}>
                <Button bsStyle="primary" type="submit">Log In</Button>
                </Col>
            </FormGroup>
        </Form>
      </div>
    );
  }
}

export default LogIn;