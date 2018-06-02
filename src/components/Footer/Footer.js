import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Proyecto 2</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Programación Web</Breadcrumb.Item>
          <Breadcrumb.Item active>Omar Segura - Fabián Hernández</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

export default Footer;