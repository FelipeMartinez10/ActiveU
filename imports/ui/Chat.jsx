/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import '../style/Chat.css';
/* eslint-enable no-unused-vars */

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  toggleHidden() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render() {
    return this.state.hidden ? (
      <div className="panel panel-primary">
        <div className="panel-heading" id="accordion">
          <span className="fa fa-comments"></span> Chat
          <span
            className="pull-right fa fa-caret-down"
            onClick={ () => { this.toggleHidden(); } }
          />
        </div>
      </div>
    ) : (
      <div className="panel panel-primary">
        <div className="panel-heading" id="accordion">
          <span className="fa fa-comments"></span> Chat
          <span
            className="pull-right fa fa-caret-up"
            onClick={ () => { this.toggleHidden(); } }
          />
        </div>
        <div className="panel-body">
          <p>mensajes mensajes</p>
        </div>
        <div class="panel-footer">
          <div class="input-group">
            <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
            <span class="input-group-btn">
              <button class="btn btn-warning btn-sm">
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
