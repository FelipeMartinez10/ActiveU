/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap/lib/';
import { LinkContainer } from 'react-router-bootstrap';
import '../style/App.css';
/* eslint-enable no-unused-vars */

class Navegacion extends Component {
  render() {
    const isLoggedin = (this.props.user !== null);
    return (
      <div>
        <Navbar className="navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/welcome">ActiveU</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {isLoggedin ?
              <Nav>
                <LinkContainer to="/home">
                  <NavItem eventKey={1}>Instrucciones</NavItem>
                </LinkContainer>
                <LinkContainer to="/leagues">
                  <NavItem eventKey={2}>Ligas</NavItem>
                </LinkContainer>
                <LinkContainer to="/leaderboard">
                  <NavItem eventKey={3}>Leaderboard</NavItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavItem eventKey={4}>Perfil</NavItem>
                </LinkContainer>
                <LinkContainer to="/">
                  <AccountsWrapper />
                </LinkContainer>
              </Nav>
    :
              <Nav>
                <LinkContainer to="/">
                  <AccountsWrapper />
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
