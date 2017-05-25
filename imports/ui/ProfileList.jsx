/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Modal, Button, ControlLabel, FormGroup, FormControl} from 'react-bootstrap/lib/';
import { createEvent } from '../api/events.js'
/* eslint-enable no-unused-vars */

class ProfileList extends Component {
  constructor(props)
  {
    super(props)
    this.state=
    {
      showModal:false,
      types: ["Deportes","Vida Nocturna", "Cultural", "Alimentación", "Académico", "Otros"],
      name:"",
      place:"",
      type:"",
      description:"",
      when: "",
      howMany: "",
      whenDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
    this.renderOthersEvents = this.renderOthersEvents.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  renderOthersEvents()
  {
    console.log("holaaa");
  }
  close() {
    this.setState({ showModal: false });
  }
  save()
  {
    createEvent.call( {name:this.state.name, place: this.state.place, type: this.state.type,
    description: this.state.description, when: this.state.whenDate, howMany: this.state.howMany},
    (err, res) => {
      if(err)
      {
        console.log(err);
      }
    });
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  handleChange(event)
  {
    if(event.target.name == "name")
    {
      this.setState({name: event.target.value});
    }
    if(event.target.name == "place")
    {
      this.setState({place: event.target.value});
    }
    if(event.target.name == "type")
    {
      this.setState({type: event.target.value});
    }
    if(event.target.name == "description")
    {
      this.setState({description: event.target.value});
    }
    if(event.target.name == "when")
    {
      this.setState({when: event.target.value});
      const date = event.target.valueAsDate;
      date.setDate(date.getDate() + 1);
      this.setState({whenDate: date});
    }
    if(event.target.name == "howMany")
    {
      this.setState({howMany: event.target.valueAsNumber});
    }
  }
  render() {
    const renderOwnEvents = this.props.ownEvents.map((event, index)=>
    {
      return(
      <ListGroupItem key={index}>
        <i className="glyphicon glyphicon-asterisk"></i> {event.name}
      </ListGroupItem>);
    });
    const renderOptions = this.state.types.map((type,index) =>
    {
      return(<option value={type} key={index}>{type}</option>);
    });
    const own = (this.props.currentList=="own");
    const ownNotEmpty = (this.props.ownEvents.length > 0);
    const othersNotEmpty = (this.props.otherEvents.length > 0);
    return (
      <div>
        {(own)
          ?
          <ListGroup>
            {(ownNotEmpty)?
              <div>
                {renderOwnEvents}
                <ListGroupItem onClick={this.open}>
                  <i className="glyphicon glyphicon-plus"></i> Crea un Evento ya!
                </ListGroupItem>
              </div>
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
                  <input className="form-control" placeholder="Nombre del Evento" type='text' name="name"
                    value={this.state.name} onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-map-marker"></i>
                  </span>
                  <input className="form-control" placeholder="Lugar" type='text' name="place"
                    value={this.state.place} onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-sunglasses"></i>
                  </span>
                  <FormControl name='type' componentClass="select" placeholder="select" value={this.state.type} onChange={this.handleChange}>
                    {renderOptions}
                  </FormControl>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-user"></i>
                  </span>
                  <input className="form-control" placeholder="Cupos disponibles" type='number' name="howMany"
                    value={this.state.howMany} onChange={this.handleChange}></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-calendar"></i>
                  </span>
                  <input className="form-control" placeholder="Fecha del Evento" type='date' name="when"
                    value={this.state.when} onChange={this.handleChange}></input>
                </div>
              </div>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Descripción:</ControlLabel>
                <FormControl componentClass="textarea" name='description' placeholder="Ingresa aquí la descripción." value={this.state.description}
                onChange={this.handleChange}/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.save}>Guardar</Button>
              <Button onClick={this.close}>Cerrar</Button>
            </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default ProfileList;
