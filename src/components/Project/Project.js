import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
      drugs: [],
      patients: [],
      employees: [],
      isError: false,
      errorMessage: '',
      isPostSuccessful: false,
      show: true
    }

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDrugs = this.getDrugs.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.getPatients = this.getPatients.bind(this);
  }

  getPatients(){
    const APIurl = localhost + "DBHandler.php/Employee/";
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState({employees: json}))
                 .catch(error => console.log(error));
  }

  getEmployees(){
    const APIurl = localhost + "DBHandler.php/Patient/";
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState({patients: json}))
                 .catch(error => console.log(error));
  }

  getDrugs(){
    const APIurl = localhost + "DBHandler.php/Drug/";
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState({drugs: json}))
                 .catch(error => console.log(error));
  }

  componentDidMount(){
    this.getDrugs()
    this.getEmployees()
    this.getPatients()
  }

  

  handleDismiss() {
    this.setState({ show: false });
  }

  handleSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const APIurl = localhost + "DBHandler.php/Project/";
    
    var project = {};
    
    console.log(data);

    data.forEach(function(value, key){
      project[key] = value;
    });

    var json = JSON.stringify(project);
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
    let selectEmployees = "";
    let selectPatients = "";

    if(this.state.drugs.length > 0){
      selectDrugs = this.state.drugs.map((e) => <option key={e.DrugId} value={e.DrugId}> {e.DrugNm} </option>);
    }

    if(this.state.employees.length > 0){
      selectEmployees = this.state.employees.map((e) => <option key={e.EmployeeId} value={e.EmployeeId}> {e.NationalId} - {e.EmployeeFirstNm} {e.EmployeeLastNm}</option>);
    }

    if(this.state.patients.length > 0){
      selectPatients = this.state.patients.map((e) => <option key={e.PatientId} value={e.PatientId}> {e.NationalId} - {e.PatientFirstNm} {e.PatientLastNm}</option>);
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
              <ControlLabel >Select a Project Manager</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl name="DirectorId" componentClass="select" placeholder="select">
                {selectEmployees}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              <ControlLabel >Select a Drug</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl name="DrugId" componentClass="select" placeholder="select">
                {selectDrugs}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              <ControlLabel >Select a Patient</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl name="PatientId" componentClass="select" placeholder="select">
                {selectPatients}
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Funds
            </Col>
            <Col sm={8}>
              <FormControl id="Funds" name="Funds" type="text" placeholder="Funds" />
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
              <Button bsStyle="primary" type="submit">Create Project</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Project;