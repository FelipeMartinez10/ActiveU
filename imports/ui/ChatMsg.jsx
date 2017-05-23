/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import '../style/Chat.css';
/* eslint-enable no-unused-vars */

export default class ChatMsg extends Component {
  constructor(props) {
    super(props);
  }

  removeComment() {
  }

  render() {
    return (
      <li className="left clearfix">
        <span className="chat-img pull-left">
          <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className="primary-font">Jack Sparrow</strong>
            <small className="pull-right text-muted">
              <span className="glyphicon glyphicon-time" />
              12 mins ago
            </small>
          </div>
          <p></p>
        </div>
      </li>
    );
  }
}
