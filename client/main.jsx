/* eslint-disable no-unused-vars */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from '../imports/ui/App.jsx';
import Event from '../imports/ui/Event.jsx';
import Perfil from '../imports/ui/Perfil.jsx';
import Landing from '../imports/ui/Landing.jsx';
/* eslint-enable no-unused-vars */

Meteor.startup(() => {
  render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="eventos" component={Event} />
      <Route path="perfil" component={Perfil} />
      <Route path="landing" component={Landing} />
    </Route>
  </Router>, document.getElementById('render-target'));
});
