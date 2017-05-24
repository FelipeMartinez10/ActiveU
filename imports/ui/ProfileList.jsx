/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap/lib/';
/* eslint-enable no-unused-vars */

class ProfileList extends Component {
  constructor(props)
  {
    super(props)
    this.renderOwnEvents = this.renderOwnEvents.bind(this);
    this.renderOthersEvents = this.renderOthersEvents.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }
  createEvent()
  {
    window.alert("holaaaa");
  }
  renderOwnEvents()
  {
    console.log("holaaa");
    return(
    <ListGroupItem onClick={this.createEvent}>
      <i className="glyphicon glyphicon-plus"></i> Crea un Evento ya!
    </ListGroupItem>);
  }
  renderOthersEvents()
  {
    console.log("holaaa");
  }
  render() {
    const own = (this.props.currentList=="own");
    const ownNotEmpty = (this.props.ownEvents.length > 0);
    const othersNotEmpty = (this.props.otherEvents.length > 0);
    return (
      <div>
        {(own)
          ?
          <ListGroup>
            {(ownNotEmpty)?
              this.renderOwnEvents
              :
              <ListGroupItem onClick={this.createEvent}>
                <i className="glyphicon glyphicon-plus"></i> Crea un Evento ya!
              </ListGroupItem>}
          </ListGroup>
          :
          <ListGroup>
            {(othersNotEmpty)?
              this.renderOthersEvents
              :
              <ListGroupItem>
                No te has interesado en ningún evento.
              </ListGroupItem>}
          </ListGroup>}

      </div>
    );
  }
}

export default ProfileList;
