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

  getDateString() {
    const d = this.props.message.time;
    let da = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
    let m = d.getMonth() < 10 ? ('0' + d.getMonth()) : d.getMonth();
    let y = d.getFullYear();
    let h = d.getHours() < 10 ? ('0' + d.getHours()) : d.getHours();
    let min = d.getMinutes() < 10 ? ('0' + d.getMinutes()) : d.getMinutes();
    return da + '/' + m + '/' + y + ' ' + h + ':' + min;
  }

  render() {
    return (
      <li className="left clearfix">
        <span className="chat-img pull-left">
          <img src={'http://placehold.it/50/55C1E7/fff&text=' + this.props.message.user.toString().charAt(0)} alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className="primary-font">{this.props.message.user}</strong>
            <small className="pull-right text-muted">
              <span className="glyphicon glyphicon-time" />
              {this.getDateString()}
            </small>
          </div>
          <p>{this.props.message.text}</p>
        </div>
      </li>
    );
  }
}
