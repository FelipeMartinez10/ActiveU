import React from 'react'; // eslint-disable-line no-unused-vars
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx'; // eslint-disable-line no-unused-vars

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
