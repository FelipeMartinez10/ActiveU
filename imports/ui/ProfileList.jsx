/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Modal, Button, ControlLabel, FormGroup, FormControl} from 'react-bootstrap/lib/';
import { createEvent, deleteEvent, removePerson } from '../api/events.js';
import Chat from './Chat.jsx';
import { Meteor } from 'meteor/meteor';
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
      whenDate: new Date(),
      showModalOptions: false,
      showConfirmation: false,
      selectedEvent: {
        id:'',
        name:'',
        description:'',
        month: '',
        day:'',
        howMany:'',
        type:'',
        place:'',
        owner:""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.openEventOptions = this.openEventOptions.bind(this);
    this.closeEventOptions = this.closeEventOptions.bind(this);
    this.removeEvent= this.removeEvent.bind(this);
    this.confirmation = this.confirmation.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
  }

  confirmation()
  {
    this.closeEventOptions();
    this.setState({ showConfirmation: true });
  }
  closeConfirmation()
  {
    this.setState({ showConfirmation: false });
  }
  removeEvent()
  {
    let user = Meteor.user();
    if(this.state.selectedEvent.owner == user._id)
    {
      deleteEvent.call( {id:this.state.selectedEvent.id},
      (err, res) => {
        if(err)
        {
          console.log(err);
        }
      });
    }
    else
    {
      removePerson.call( {id:this.state.selectedEvent.id, person: user.username},
      (err, res) => {
        if(err)
        {
          console.log(err);
        }
      });
    }
    this.setState({ showConfirmation: false });
  }
  close() {
    this.setState({ showModal: false });
  }
  closeEventOptions() {
    this.setState({ showModalOptions: false });
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
  openEventOptions(event) {
    const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN','JUL', 'AGO',
      'SEP', 'OCT', 'NOV', 'DIC'];
    const month = monthNames[event.when.getMonth()];
    let newEvent = {
      id: event._id,
      name: event.name,
      description: event.description,
      month: month,
      day: event.when.getDate(),
      howMany: event.howMany,
      type: event.type,
      place: event.place,
      owner: event.owner
    };
    this.setState({ selectedEvent: newEvent,showModalOptions: true });
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
      <ListGroupItem key={index} onClick={this.openEventOptions.bind(this, event)}>
        <i className="glyphicon glyphicon-asterisk"></i> {event.name}
      </ListGroupItem>);
    });
    const renderOthersEvents = this.props.otherEvents.map((event, index)=>
    {
      return(
      <ListGroupItem key={index} onClick={this.openEventOptions.bind(this, event)}>
        <i className="glyphicon glyphicon-ok"></i> {event.name}
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
                  <i className="glyphicon glyphicon-plus"></i> ¡Crea un Evento!
                </ListGroupItem>
              </div>
              :
              <ListGroupItem onClick={this.open}>
                <i className="glyphicon glyphicon-plus"></i> ¡Crea un Evento!
              </ListGroupItem>}
          </ListGroup>
          :
          <ListGroup>
            {(othersNotEmpty)?
              renderOthersEvents
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
        <Modal show={this.state.showModalOptions} onHide={this.closeEventOptions}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Evento:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.state.selectedEvent.name}</h4>
            <div className='row'>
              <div className='col-md-4'>
                  <p><i className="glyphicon glyphicon-map-marker"></i> Lugar: {this.state.selectedEvent.place}</p>
              </div>
              <div className='col-md-4'>
                  <p><i className="glyphicon glyphicon-calendar"></i> Cuando: {this.state.selectedEvent.day} {this.state.selectedEvent.month}</p>
              </div>
              <div className='col-md-4'>
                  <p><i className="glyphicon glyphicon-sunglasses"></i> Tipo: {this.state.selectedEvent.type}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-1'></div>
              <div className='col-md-10'>
                <Chat event={this.state.selectedEvent.id}/>
              </div>
              <div className='col-md-1'></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeEventOptions}>Cerrar</Button>
              <Button className='pull-left' bsStyle='danger' onClick={this.confirmation}><i className="glyphicon glyphicon-remove"></i></Button>
          </Modal.Footer>
      </Modal>
      <Modal show={this.state.showConfirmation} onHide={this.closeConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Seguro que desea eliminar el evento <b>{this.state.selectedEvent.name}</b>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeConfirmation} bsStyle='danger'>No</Button>
          <Button className='pull-left' bsStyle='success' onClick={this.removeEvent}>Si</Button>
        </Modal.Footer>
    </Modal>

      </div>
    );
  }
}

export default ProfileList;
