/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Modal, Button, ControlLabel, FormGroup, FormControl} from 'react-bootstrap/lib/';
/* eslint-enable no-unused-vars */

class ProfileList extends Component {
  constructor(props)
  {
    super(props)
    this.state=
    {
      showModal:false
    }
    this.renderOwnEvents = this.renderOwnEvents.bind(this);
    this.renderOthersEvents = this.renderOthersEvents.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  renderOwnEvents()
  {
    console.log("holaaa");
    return(
    <ListGroupItem onClick={this.open}>
      <i className="glyphicon glyphicon-plus"></i> Crea un Evento ya!
    </ListGroupItem>);
  }
  renderOthersEvents()
  {
    console.log("holaaa");
  }
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  render() {
    const own = (this.props.currentList=="own");
    const ownNotEmpty = (this.props.ownEvents.length > 0);
    const othersNotEmpty = (this.props.otherEvents.length > 0);
    return (
      <div>
        {(own)
          ?
          <ListGroup>
            {(ownNotEmpty)?
              this.renderOwnEvents
              :
              <ListGroupItem onClick={this.open}>
                <i className="glyphicon glyphicon-plus"></i> Crea un Evento ya!
              </ListGroupItem>}
          </ListGroup>
          :
          <ListGroup>
            {(othersNotEmpty)?
              this.renderOthersEvents
              :
              <ListGroupItem>
                No te has interesado en ningún evento.
              </ListGroupItem>}
          </ListGroup>}
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Crear Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Ingresa los datos del evento</h4>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-star"></i>
                  </span>
                  <input className="form-control" placeholder="Nombre del Evento" type='text' name="nombre"
                    value={this.state.value}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-map-marker"></i>
                  </span>
                  <input className="form-control" placeholder="Lugar" type='text' name="lugar"
                    value={this.state.value}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-sunglasses"></i>
                  </span>
                  <input className="form-control" placeholder="Categoria del evento" type='text' name="tipo"
                    value={this.state.value}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user"></i>
                  </span>
                  <input className="form-control" placeholder="Cupos disponibles" type='number' name="cupos"
                    value={this.state.value}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-calendar"></i>
                  </span>
                  <input className="form-control" placeholder="Fecha del Evento" type='date' name="fecha"
                    value={this.state.value}></input>
                </div>
              </div>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Descripción:</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Ingresa aquí la descripción." />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default ProfileList;
