import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Employee extends Component {
  constructor(props){
    super(props);
    let isAuthenticated;
    let user;
    if(this.props.location.state === undefined || this.props.location.state.isUserAut === null){
      isAuthenticated = true;
      user = {};
    }
    else{
      isAuthenticated = true;
      user = this.props.location.state.user;
    }

    this.state = {
      user: user,
      isUserAut: isAuthenticated,
      isError: false,
      errorMessage: '',
      isPostSuccessful: false,
      show: true
    }

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(!this.state.isUserAut){
      this.props.history.push({pathname:'/unauthorized'});
    }
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const APIurl = localhost + "DBHandler.php/Employee/";
    
    var employee = {};
    
    data.forEach(function(value, key){
      employee[key] = value;
    });

    var json = JSON.stringify(employee);
    console.log(json);
    fetch(APIurl, {
      method: 'POST',
      body: json
    }).then(response => this.clearForm())
      .then( _ => this.setState({isPostSuccessful: true, show:true}))
      .catch(error => this.setState({isError: true,errorMessage: error.message, show:true}));
  }
  
  clearForm(){
    document.getElementById("employeeForm").reset();
  }
  render() {
    var alertMessage = '';
    if(this.state.isError){
      alertMessage = (<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <h4>There is an error!</h4>
                        <p>{this.state.errorMessage}</p>
                      </Alert>);
    }
    else if(this.state.isPostSuccessful){
      alertMessage = (
        <Alert bsStyle="success" onDismiss={this.handleDismiss}>
          <h4>The employee was successfully saved</h4>
        </Alert>
      );
    }
    
    if(!this.state.show){
      alertMessage = '';
    }
    return (
      <div>
        {alertMessage}
        <h2>Add New Employee</h2>
        <Form id="employeeForm" onSubmit={this.handleSubmit} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              National ID
            </Col>
            <Col sm={8}>
              <FormControl id="NationalId" name="NationalId" type="text" placeholder="National ID" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              First Name
            </Col>
            <Col sm={8}>
              <FormControl id="EmployeeFirstNm" name="EmployeeFirstNm" type="text" placeholder="First Name" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={8}>
              <FormControl id="EmployeeLastNm" name="EmployeeLastNm" type="text" placeholder="Last Name" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={8}>
              <FormControl id="UserNm" name="UserNm" type="email" placeholder="Email" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={8}>
              <FormControl id="Password" name="Password" type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup>
            <FormControl type="hidden" id="isUpdate" name="isUpdate" value="false"/>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={3}>
              <Button bsStyle="primary" type="submit">Add Employee</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Employee;