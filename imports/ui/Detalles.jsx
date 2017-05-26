/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Modal } from 'react-bootstrap';
import Chat from './Chat.jsx';
import { addPerson } from '../api/events.js';
/* eslint-enable no-unused-vars */

export default class Detalles extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      userInEvent: this.props.people.includes(Meteor.user().username),
      show:false
    }
    this.handleButton= this.handleButton.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close()
  {
    this.setState({ show: false });
  }
  open()
  {
    this.setState({ show: true });
  }
  handleButton() {
    addPerson.call( {id:this.props.id, person: Meteor.user().username}, (err, res) => {
      if(err) {
        console.log(err);
      }
      else
      {
        this.open();
      }
    });
    this.setState({
      userInEvent: this.props.people.includes(Meteor.user().username)
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
            {
              this.state.userInEvent ? (
                <Button
                  bsStyle="default"
                  disabled
                >
                  Interesado
                </Button>
              ) : (
                <Button
                  bsStyle="success"
                  onClick={this.handleButton}
                >
                  ¡Me interesa!
                  <i className="fa fa-check-circle" aria-hidden="true" />
                </Button>
              )
            }
            </div>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Has sido agregado al evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se agregó el evento a tu sección de perfil, ahí encontraras un chat.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='success' onClick={this.close}>Entendido</Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }
}
