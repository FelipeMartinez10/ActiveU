/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap/lib/';
import { LinkContainer } from 'react-router-bootstrap';
/* eslint-enable no-unused-vars */

class Navegacion extends Component {

  render() {
    const isLoggedin = (this.props.user !== null);
    let email = '';
    if(this.props.user !== undefined && this.props.user !== null)
    {
      email = this.props.user.emails[0].address;
    }
    return (
      <div>
        <Navbar className="navbar-inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/landing">ActiveU</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
            {isLoggedin ?
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/eventos">
                    <NavItem eventKey={1}>Eventos</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/perfil">
                    <NavItem eventKey={2}>Perfil</NavItem>
                  </LinkContainer>
                </Nav>
                <Nav pullRight>
                  <NavDropdown eventKey={4} title={email} id="basic-nav-dropdown">
                   <MenuItem eventKey={4.1} onClick={()=>{Meteor.logout(); this.context.router.push('/landing');}}>Cerrar Sesión</MenuItem>
                 </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              :
            <Nav></Nav>}
        </Navbar>
      </div>
    );
  }
}
Navegacion.contextTypes = {
  router: React.PropTypes.object
}

export default Navegacion;
