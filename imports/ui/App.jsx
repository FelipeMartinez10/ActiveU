/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Events } from '../api/events.js';
import Navbar from './Navbar.jsx';
import Event from './Event.jsx';
import Landing from './Landing.jsx';
import '../style/App.css';
/* eslint-enable no-unused-vars */

class App extends Component {

  render() {
    let verified = false;
    if(this.props.currentUser)
    {
      verified = this.props.currentUser.emails[0].verified;
    }
    return (
      <div className="container-fluid">
        <div className='row'>
          <Navbar user={this.props.currentUser}/>
        </div>
        {(this.props.currentUser && verified)?
          <div className="row">
            {React.cloneElement(this.props.children, { events: this.props.events, user:this.props.currentUser})}
          </div>
        :
        <div className="row">
          <Landing/>
        </div>}
      </div>
    );
  }
}

App.propTypes = {
  events: PropTypes.array,
  currentUser: PropTypes.object,
};
export default createContainer(() => {
  Meteor.subscribe('events');
  return {
    currentUser: Meteor.user(),
    events: Events.find({}).fetch()
  };
}, App);
