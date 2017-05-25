/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import {Pagination, Button} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
import Detalles from './Detalles.jsx';
/* eslint-enable no-unused-vars */

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      currentPage: 1,
      eventsPerPage: 4,
      selectedEvent: {
        id:'',
        name:'',
        description:'',
        day:'',
        month:'',
        howMany:'',
        type:'',
        place:''
      },
      selected: false,
      filterHowMany: 0,
      filterType: '',
      filterDate: new Date(0)
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDetailButton = this.handleDetailButton.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event)
    });
  }

  handleDetailButton(evento)  {
    /*console.log(evento.when.getHours());*/
    const day = evento.when.getDate();
    const month = evento.when.getMonth();
    let newEvent = {
      id: evento._id,
      name: evento.name,
      description: evento.description,
      day: day,
      month: month,
      howMany: evento.howMany,
      type: evento.type,
      place: evento.place
    };
    this.setState({selectedEvent: newEvent, selected: true});
  }

  changeTypeFilter(type) {
    this.setState({
      filterType: type
    });
  }

  changeHowManyFilter(howMany) {
    this.setState({
      filterHowMany: howMany
    });
  }

  changeDateFilter(date) {
    if (date) {
      date.setDate(date.getDate() + 1);
      this.setState({
        filterDate: date
      });
    }
  }

  renderFiltros() {
    return (
      <div className="row filters">
        <div className="col-md-4">
          <h4 className="text-center">Tipo</h4>
          <input
            type="text"
            onChange={ e => this.changeTypeFilter(e.target.value) }
          />
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Mínimo de personas</h4>
          <input
            type="number"
            onChange={ e => this.changeHowManyFilter(e.target.value) }
          />
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Fecha</h4>
          <input
            type="date"
            onChange={ e => this.changeDateFilter(e.target.valueAsDate) }
          />
        </div>
      </div>
    );
  }

  render() {
    const eventSelected = this.state.selected;
    const events = this.props.events.filter( event => {
      return event.type.toLowerCase().includes(this.state.filterType.toLowerCase()) &&
        event.howMany >= this.state.filterHowMany &&
        event.when >= this.state.filterDate;
    });
    const { currentPage, eventsPerPage } = this.state;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN','JUL', 'AGO',
      'SEP', 'OCT', 'NOV', 'DIC'];
    let eventsEmpty = true;
    if(events.length > 0) {
      eventsEmpty = false;
    }
    const renderEvents = currentEvents.map((event, index) => {
      return (
      <div className='event-box row row-eq-height ' key={index}>
        <div className='col-md-2 time'>
          <div>
            <span className="day">{event.when.getDate()}</span>
            <span className="month">{monthNames[event.when.getMonth()]}</span>
          </div>
        </div>
        <div className='col-md-5'>
          <div className='row'>
            <h4>{event.name}</h4>
          </div>
          <div className='row'>
            <p><b>Lugar: </b>{event.place}</p>
          </div>
          <div className='row'>
            <p><b>Tipo: </b>{event.type}</p>
          </div>
        </div>
        <div className='col-md-5'>
          <p><i className="fa fa-user" aria-hidden="true"></i> {event.people.length}/{event.howMany} cupos</p>
          <Button bsStyle="primary" onClick={this.handleDetailButton.bind(this, event)}>Detalles</Button>
        </div>
      </div>);
    });

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className='container-fluid'>
        <div className="row">
          <div className='col-md-1'></div>
          <div className='col-md-4'>
            {(eventSelected)?
              <Detalles
                id={this.state.selectedEvent.id}
                name={this.state.selectedEvent.name}
                description={this.state.selectedEvent.description}
                day={this.state.selectedEvent.day}
                month={this.state.selectedEvent.month}
                howMany={this.state.selectedEvent.howMany}
                type={this.state.selectedEvent.type}
                place={this.state.selectedEvent.place}
              />
               :
               <div className='selectSomething'>
                 <h2 id='selectSomething'>¡Selecciona un evento de la lista para ver mas detalles!</h2>
                 <i className="fa fa-arrow-right fa-4x" aria-hidden="true"></i>
               </div>
            }
          </div>
          <div className='col-md-6'>
            <div className="box events container-fluid">
              <div className='row'>
                <h1>Eventos:</h1>
                { this.renderFiltros() }
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  {(eventsEmpty)? <h3>No hay eventos disponibles</h3> : renderEvents}
                </div>
              </div>
              <div className='row'>
                <Pagination
                 bsSize="medium"
                 items={pageNumbers.length}
                 activePage={this.state.currentPage}
                 onSelect={this.handleClick} />
              </div>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}

export default Event;
