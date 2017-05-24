/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import {Pagination, Button} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
/* eslint-enable no-unused-vars */

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingEvent: false,
      showingMyEvents: true
    };
  }

  toggleCreatingEvent() {
    this.setState({
      creatingEvent: !this.state.creatingEvent
    });
  }

  toggleMyEvents() {
    this.setState({
      creatingEvent: !this.state.showingMyEvents
    });
  }

  renderInfo() {
  }

  renderEvents() {
  }

  renderEventCreation() {
  }

  render() {
    return (
      <div className='row'>
        <div className="box events container-fluid">
          <div className="col-md-3">
            <img src="img/avatar/hombre1.png" alt="Profile picture" />
          </div>
          <div className="info col-md-6">
            <h1>{Meteor.user().username}</h1>
            <h2>Semestre</h2>
            <h2>Carrera</h2>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  ownEvents: PropTypes.array,
  otherEvents: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe('events');
  return {
    currentUser: Meteor.user(),
    ownEvents: Events.find({ user: Meteor.userId() }).fetch(),
    otherEvents: Events.find({ persons: { $all: [Meteor.user().username] } }).fetch()
  };
}, Profile);
