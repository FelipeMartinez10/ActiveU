/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
/* eslint-enable no-unused-vars */

export default class Verify extends Component {
  constructor(props) {
    super(props);

    this.verify = this.verify.bind(this);
  }
  verify()
  {

    let self = this;
    Accounts.verifyEmail(this.props.params.token, function()
    {
      self.props.router.push('/eventos');
    });
  }
  render() {
    console.log(this.props);
    return (
      <div className='container-fluid landing'>
        <div className='row landing-welcome'>
          <h1>Bienvenido a ActiveU</h1>
          <p>¡Ya casi estás listo! Solo presiona el siguiente botón para completar la verificación.</p>
          <div className='verify-button'>
            <Button bsStyle="primary"  onClick={this.verify}>Completar Verificación</Button>
          </div>
        </div>
      </div>
    );
  }
}
