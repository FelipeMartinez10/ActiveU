import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import {Pagination} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';

class Event extends Component {
  constructor(props) {
   super(props);
   this.state = {
     events: this.props.events,
     currentPage: 1,
     eventsPerPage: 4
   };
   this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
   this.setState({
     currentPage: Number(event)
   });
  }

  render() {
    const { events, currentPage, eventsPerPage } = this.state;
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const monthNames = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN","JUL", "AGO",
    "SEP", "OCT", "NOV", "DIC"];
    const renderEvents = currentEvents.map((event, index) =>
    {
      return(
      <div className='event-box row' key={index}>
        <div className='col-md-2 time'>
          <div>
    				<span className="day">{event.when.getDate()}</span>
    				<span className="month">{monthNames[event.when.getMonth()]}</span>
    			</div>
        </div>
        <div className='col-md-10'>
          <p>{event.name}</p>
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
            <div className="card hovercard">
              <div className="cardheader"></div>
              <div className="avatar">
                <img alt="" src="img/avatar/hombre1.png"></img>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="box events container-fluid">
              <div className='row'>
                <h1>Eventos:</h1>
              </div>
            	<div className='row'>
                <div className='col-md-12'>
                  {renderEvents}
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
Event.propTypes = {
  events: PropTypes.array,
};
export default createContainer(() => {
  Meteor.subscribe('events');
  return {
    events: Events.find({}).fetch(),
  };
}, Event);
