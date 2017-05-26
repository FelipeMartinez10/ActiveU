/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import Chat from './Chat.jsx';
import { addPerson } from '../api/events.js';
/* eslint-enable no-unused-vars */

export default class Detalles extends Component {
  constructor(props) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    addPerson.call( {id:this.props.id, person: Meteor.user().username}, (err, res) => {
      if(err) {
        console.log(err);
      }
    });
  }

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
            <div className='row details-button'>
              <Button bsStyle="success" onClick={this.handleButton}>¡Me interesa! <i className="fa fa-check-circle" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </div>
        {/*<Chat
          event={this.props.id}
        />*/}
      </div>
    );
  }
}
