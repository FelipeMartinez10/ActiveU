import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/events.js';
import '../imports/api/messages.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
