/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap/lib/';
import { LinkContainer } from 'react-router-bootstrap';
/* eslint-enable no-unused-vars */

class Navegacion extends Component {
  render() {
    const isLoggedin = (this.props.user !== null);
    return (
      <div>
        <Navbar className="navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/landing">ActiveU</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {isLoggedin ?
              <Nav>
                <LinkContainer to="/eventos">
                  <NavItem eventKey={1}>Eventos</NavItem>
                </LinkContainer>
                <LinkContainer to="/perfil">
                  <NavItem eventKey={2}>Perfil</NavItem>
                </LinkContainer>
              </Nav>
    :
              <Nav>
                <LinkContainer to="/">
                  <NavItem eventKey={3}>Log in</NavItem>
                </LinkContainer>
              </Nav>}
            <Nav pullRight>
              {/* Ir al perfil si está conectado */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navegacion;
