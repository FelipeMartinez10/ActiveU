/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
import Navbar from './Navbar.jsx';
import Event from './Event.jsx';
import '../style/App.css';
/* eslint-enable no-unused-vars */

class App extends Component {


  render() {
    return (
      <div className="container-fluid">
        <div className='row'>
          <Navbar/>
        </div>
        <div className="row">
          {React.cloneElement(this.props.children, { events: this.props.events})}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  events: PropTypes.array,
};
export default createContainer(() => {
  Meteor.subscribe('events');
  return {
    events: Events.find({}).fetch()
  };
}, App);
