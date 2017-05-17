import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
import Event from './Event.jsx'; // eslint-disable-line no-unused-vars

class App extends Component {

  renderEvents() {
    return this.props.events.map( (event) => (
      <Event event={event} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>ActiveU</h1>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  events: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Events.find({}).fetch(),
  };
}, App);
