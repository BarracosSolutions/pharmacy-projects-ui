import React, { Component } from 'react';
import { Row, Col,Table,Button } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Projects extends Component {

  constructor(props){
    super(props);
    let isAuthenticated;
    let user;
    if(this.props.location.state === undefined || this.props.location.state.isUserAut === null){
      isAuthenticated = false;
      user = {};
    }
    else{
      isAuthenticated = true;
      user = this.props.location.state.user;
    }

    this.state = {
      user: user,
      isUserAut: isAuthenticated,
      directorProjects: [],
      collaboratorProjects: []
    }

    this.getDirectorProjects = this.getDirectorProjects.bind(this);
  }

  componentDidMount(){
    if(this.state.isUserAut){
      this.getDirectorProjects();
    }
    else{
      this.props.history.push({pathname:'/unauthorized'});
    }
    
  }

  getDirectorProjects(){
    const APIurl = localhost + "DBHandler.php/Director_Projects/" + this.state.user.EmployeeId;
    fetch(APIurl).then(response => response.json())
                 .then(json => this.setState(prevState => ({directorProjects: [...prevState.directorProjects,json]})))
                 .catch(error => console.log(error));
  }

  render() {

    let projects = "";
    if(this.state.directorProjects.length > 0){
      projects = this.state.directorProjects.map(e => 
          <tr key={e.ProjectId}>
            <td>{e.ProjectNm}</td>
            <td>{e.Funds}</td>
            <td>{e.Regime}</td>
            <td>{e.ProjectStatusId}</td>
            <td><Button bsStyle="primary">Edit</Button></td>
          </tr>
      )
    }

    return (
      <div>
        <Row className="show-grid">
          <Col md={12}>
            <h2 class="title">Projects Management</h2>
            <Table align="center" className="custom-table" striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Project Name</th>
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
      </div>
    );
  }
}

export default Projects;