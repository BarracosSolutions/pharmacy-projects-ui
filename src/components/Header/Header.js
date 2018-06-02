import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#brand">Pharmacy Projects</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavItem eventKey={1} href="#">
                    Projects
                </NavItem>
                <NavDropdown eventKey={3} title="Admin Action" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Add Drug</MenuItem>
                    <MenuItem eventKey={3.2}>Add Patient</MenuItem>
                    <MenuItem eventKey={3.3}>Add Employee</MenuItem>
                </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
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