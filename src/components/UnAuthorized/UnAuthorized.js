import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class UnAuthorized extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
            <h1>Acess Denied</h1>
            <p>
                You are not authorized to access this page.
            </p>
        </Jumbotron>
      </div>
    );
  }
}

export default UnAuthorized;