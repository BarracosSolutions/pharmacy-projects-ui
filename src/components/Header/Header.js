import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="/">Pharmacy Projects</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavItem eventKey={1} href="/">
                    Projects
                </NavItem>
                <NavDropdown eventKey={3} title="Admin Action" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href="/drug">Add Drug</MenuItem>
                    <MenuItem eventKey={3.2} href="/patient">Add Patient</MenuItem>
                    <MenuItem eventKey={3.3} href="/employee">Add Employee</MenuItem>
                    <MenuItem eventKey={3.4} href="/project">Add Project</MenuItem> 
                </NavDropdown>
                <NavDropdown eventKey={4} title="Charts Section" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1} href="/projects-status-chart">Projects Status</MenuItem>
                </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login">
                        Log Out
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;