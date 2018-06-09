import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { localhost } from '../../connections/connections';

class Projects extends Component {

  constructor(props){
    super(props);
    this.state = {
      directorProjects: [],
      collaboratorProjects: []
    }

    this.getDirectorProjects = this.getDirectorProjects.bind(this);
  }

  componentDidMount(){
    this.getDirectorProjects();
  }

  getDirectorProjects(){
    const APIurl = localhost + "DBHandler.php/Director_Projects/1";
    fetch(APIurl).then(response => response.json())
                 .then(json => {console.log(json); this.setState({directorProjects: json})})
                 .catch(error => console.log(error));
  }


  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col md={6}>
            <h2>Director Projects</h2>
          </Col>
          <Col md={6}>
            <h2>Collaborator Projects</h2>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Projects;