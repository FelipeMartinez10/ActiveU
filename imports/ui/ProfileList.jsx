/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap/lib/';
/* eslint-enable no-unused-vars */

class ProfileList extends Component {

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            Trigger an alert
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default ProfileList;
