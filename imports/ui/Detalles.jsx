/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import Chat from './Chat.jsx';
/* eslint-enable no-unused-vars */

export default class Detalles extends Component {
  render() {
    return (
      <div>
        <div className="card hovercard">
          <div className="cardheader"></div>
          <div className="avatar">
            <img alt="" src="img/avatar/hombre1.png"></img>
          </div>
          <div className='container-fluid'>
            <div className='row'>
              <h4>{this.props.name}</h4>
            </div>
            <div className='row'>
              <h5>Descripción:</h5>
            </div>
            <div className='row details-description'>
              <p>{this.props.description}</p>
            </div>
            {/* Depronto es redundante esta info.
              <div className='row'>
              <p>{this.props.type}</p>
              <p>{this.props.place}</p>
              <p>{this.props.day}</p>
              <p>{this.props.month}</p>
              <p>{this.props.howMany}</p>
            </div>*/}
            <div className='row details-button'>
              <Button bsStyle="success">¡Me interesa! <i className="fa fa-check-circle" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </div>
        <Chat />
      </div>
    );
  }
}
