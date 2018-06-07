import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
      drugs: [],
      isError: false,
      errorMessage: '',
      isPostSuccessful: false,
      show: true
    }

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDrugs = this.getDrugs.bind(this);
    this.getPatients = this.getEmployees(this);
  }

  getPatients(){
    const APIurl = localhost + "DBHandler.php/Drug/";
  }

  getEmployees(){

  }

  getDrugs(){
    const APIurl = localhost + "DBHandler.php/Drug/";
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState({drugs: json}))
                 .catch(error => console.log(error));
  }

  componentDidMount(){
    this.getDrugs()
    console.log(this.state.drugs);
  }

  

  handleDismiss() {
    this.setState({ show: false });
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const APIurl = localhost + "DBHandler.php/Project/";
    
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
    document.getElementById("projectForm").reset();
  }
  render() {
    let selectDrugs = "";
    
    if(this.state.drugs.length > 0){
      selectDrugs = this.state.drugs.map((e) => <option key={e.DrugId} value={e.DrugId}> {e.DrugNm} </option>);
    }

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
          <h4>A Project was successfully saved</h4>
        </Alert>
      );
    }
    
    if(!this.state.show){
      alertMessage = '';
    }
    return (
      <div>
        {alertMessage}
        <h2>Add New Project</h2>
        <Form id="projectForm" onSubmit={this.handleSubmit} horizontal>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              <ControlLabel >Select a Drug</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="select">
                {selectDrugs}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Funds
            </Col>
            <Col sm={8}>
              <FormControl id="Funds" name="Founds" type="text" placeholder="Funds" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Regime Description</Col>
            <Col sm={8}>
              <FormControl id="Regime" name="Regime" componentClass="textarea" placeholder="Regime Description" />
            </Col>
          </FormGroup>
          <FormGroup>
            <FormControl type="hidden" id="isUpdate" name="isUpdate" value="false"/>
          </FormGroup>
          <FormGroup>
            <FormControl type="hidden" id="ProjectStatusId" name="ProjectStatusId" value="1"/>
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

export default Project;