import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Projects extends Component {
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