/* eslint-disable no-unused-vars */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from '../imports/ui/App.jsx';
import Event from '../imports/ui/Event.jsx';
/* eslint-enable no-unused-vars */

Meteor.startup(() => {
  render(<Router history={browserHistory}>
    <Route path="/" component={App}>
      {/* <IndexRoute component={Welcome} />
      <Route path="leaderboard" component={Leaderboard} />
      <Route path="home" component={Home} /> */}
    </Route>
  </Router>, document.getElementById('render-target'));
});
