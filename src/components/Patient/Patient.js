import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Patient extends Component {
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
    const APIurl = localhost + "DBHandler.php/Patient/";
    
    var patient = {};
    
    data.forEach(function(value, key){
      patient[key] = value;
    });

    var json = JSON.stringify(patient);
    console.log(json);
    fetch(APIurl, {
      method: 'POST',
      body: json
    }).then(response => this.clearForm())
      .then( _ => this.setState({isPostSuccessful: true, show:true}))
      .catch(error => this.setState({isError: true,errorMessage: error.message, show:true}));
  }
  
  clearForm(){
    document.getElementById("patientForm").reset();
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
          <h4>The patient was successfully saved</h4>
        </Alert>
      );
    }
    
    if(!this.state.show){
      alertMessage = '';
    }

    return (
      <div>
        {alertMessage}
        <h2>Add New Patient</h2>
        <Form id="patientForm" onSubmit={this.handleSubmit} horizontal>
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
              <FormControl id="PatientFirstNm" name="PatientFirstNm" type="text" placeholder="Patient First Name" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Last Name
            </Col>
            <Col sm={8}>
              <FormControl id="PatientLastNm" name="PatientLastNm" type="text" placeholder="Patient Last Name" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Medication Description</Col>
            <Col sm={8}>
              <FormControl id="MedicationDescription" name="MedicationDescription" componentClass="textarea" placeholder="Medication Description" />
            </Col>
          </FormGroup>
          <FormGroup>
            <FormControl type="hidden" id="isUpdate" name="isUpdate" value="false"/>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={3}>
              <Button bsStyle="primary" type="submit">Add Patient</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Patient;