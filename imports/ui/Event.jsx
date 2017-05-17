import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

export default class Event extends Component {
  render() {
    return (
      <li>{ this.props.event.description }</li>
    );
  }
}

Event.propTypes = {
  task: PropTypes.object.isRequired,
};
