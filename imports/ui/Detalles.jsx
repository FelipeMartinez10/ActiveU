import React, {Component} from "react";
import { Meteor } from "meteor/meteor";

export default class Detalles extends Component {
  render() {
    return (
      <div className="card hovercard">
        <div className="cardheader"></div>
        <div className="avatar">
          <img alt="" src="img/avatar/hombre1.png"></img>
        </div>
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
          <p>{this.props.type}</p>
          <p>{this.props.place}</p>
          <p>{this.props.day}</p>
          <p>{this.props.month}</p>
          <p>{this.props.howMany}</p>
        </div>
    </div>);
  }
}
