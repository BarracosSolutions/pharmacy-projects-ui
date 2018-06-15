import React, { Component } from 'react';
import { Row, Col,Table,Button,Modal, Form, FormControl,FormGroup, ControlLabel } from 'react-bootstrap';
import { localhost } from '../../connections/connections';
import Charts from '../Charts/Charts';

class Projects extends Component {

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
      showModal: false,
      editProject: {},
      directorProjects: [],
      collaboratorProjects: []
    }

    this.getDirectorProjects = this.getDirectorProjects.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.showEditProject = this.showEditProject.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(this.state.isUserAut){
      this.getDirectorProjects();
    }
    else{
      this.props.history.push({pathname:'/unauthorized'});
    }
    
  }

  deleteProject(projectId){
    const APIurl = localhost + "DBHandler.php/Project/"+projectId;
    fetch(APIurl, {
      method: 'POST',
      body: ''
    }).then(response => console.log(response))
      .then( _ => this.setState({directorProjects: []}))
      .then( _ => this.getDirectorProjects())
      .catch(error => console.log(error));
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("entre al updateProject")
    const data = new FormData(event.target);
    console.log(data);
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
    }).then(response => console.log(response))
      .then( _ => this.setState({showModal: false,editProject: {}, directorProjects: []}))
      .then( _ => this.getDirectorProjects())
      .catch(error => console.log(error));
  }

  showEditProject(project){
    this.setState({showModal: true, editProject: project});
  }

  handleModalHide() {
    this.setState({ showModal: false, editProject: {}, directorProjects: []});
    this.getDirectorProjects();
  }

  

  getDirectorProjects(){
    const APIurl = localhost + "DBHandler.php/Director_Projects/" + this.state.user.EmployeeId;
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState(prevState => ({directorProjects: prevState.directorProjects.concat(json)})))
                 .catch(error => console.log(error));
  }

  render() {

    let projects = "";
    if(this.state.directorProjects.length > 0){
      projects = this.state.directorProjects.map(e => 
          <tr key={e.ProjectId}>
            <td>{e.ProjectNm}</td>
            <td>{e.DrugNm}</td>
            <td>{e.PatientNationalId} - {e.PatientLastNm},{e.PatientFirstNm}</td>
            <td>{e.Funds}</td>
            <td>{e.Regime}</td>
            <td>{e.StatusNm}</td>
            <td><Button bsStyle="primary" onClick={this.showEditProject.bind(this,e)}>Edit</Button><Button onClick={this.deleteProject.bind(this,e.ProjectId)} bsStyle="danger">Delete</Button></td>
          </tr>
      )
    }

    return (
      <div>
        <Row className="show-grid">
          <Col md={12}>
            <h2 className="title">Projects Management</h2>
            <Table align="center" className="custom-table" striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Drug Name</th>
                  <th>Patient Name</th>
                  <th>Funds</th>
                  <th>Regime</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Charts/>

        <Modal bsSize="large" {...this.props} show={this.state.showModal} onHide={this.handleModalHide} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Edit Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="editProjectForm" onSubmit={this.handleSubmit} horizontal>
              <FormGroup>
                <FormControl type="hidden" id="ProjectId" name="ProjectId" value={this.state.editProject.ProjectId}/>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Project Name
                </Col>
                <Col sm={8}>
                  <FormControl id="ProjectNm" name="ProjectNm" defaultValue={this.state.editProject.ProjectNm} type="text" placeholder="Project Name" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  <ControlLabel> Project Status: </ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl name="ProjectStatusId" componentClass="select">
                    <option value="1">Pending</option>
                    <option value="2">In Progress</option>
                    <option value="3">Finished</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  <ControlLabel >Project Manager</ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl name="DirectorId" componentClass="select" placeholder="select">
                    <option value={this.state.editProject.DirectorId}>{this.state.editProject.DirectorNationalId} - {this.state.editProject.EmployeeLastNm},{this.state.editProject.EmployeeFirstNm}</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  <ControlLabel >Drug</ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl name="DrugId" componentClass="select" placeholder="select">
                    <option value={this.state.editProject.DrugId}>{this.state.editProject.DrugNm}</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  <ControlLabel >Patient</ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl name="PatientId" componentClass="select" placeholder="select">
                    <option value={this.state.editProject.PatientId}>{this.state.editProject.PatientNationalId} - {this.state.editProject.PatientLastNm},{this.state.editProject.PatientFirstNm}</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Funds
                </Col>
                <Col sm={8}>
                  <FormControl id="Funds" name="Funds" defaultValue={this.state.editProject.Funds} type="text" placeholder="Funds" />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Regime Description</Col>
                <Col sm={8}>
                  <FormControl id="Regime" name="Regime" componentClass="textarea" defaultValue={this.state.editProject.Regime} placeholder="Regime Description" />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Final Report</Col>
                <Col sm={8}>
                  <FormControl id="Report" name="Report" componentClass="textarea" defaultValue={this.state.editProject.Report} placeholder="Final Report" />
                </Col>
              </FormGroup>
              <FormGroup>
                <FormControl type="hidden" id="isUpdate" name="isUpdate" value="true"/>
              </FormGroup>
              <FormGroup>
                <Col smOffset={1} sm={3}>
                  <Button bsStyle="primary" type="submit">Edit Project</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Projects;