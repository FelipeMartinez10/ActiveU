import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars

export default class Event extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className="row">
          <div className='col-md-1'></div>
          <div className='col-md-4'>
            <div className="card hovercard">
              <div className="cardheader"></div>
              <div className="avatar">
                <img alt="" src="img/avatar/hombre1.png"></img>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className="box">
            	<h1>Hola</h1>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}
