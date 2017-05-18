import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import {Pagination} from 'react-bootstrap';
export default class Event extends Component {
  constructor() {
   super();
   this.state = {
     events: ['a','b','c','d','e','f','g','h','i','j','k'],
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
    const renderEvents = currentEvents.map((event, index) => {
      return <li key={index}>{event}</li>;
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
            <div className="box events">
            	<h1>Eventos:</h1>
              <ul>
                {renderEvents}
              </ul>
              <Pagination
               bsSize="medium"
               items={pageNumbers.length}
               activePage={this.state.currentPage}
               onSelect={this.handleClick} />
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}
