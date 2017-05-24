import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/events.js';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = "smtp://<MAIL_SERVER>:<Password>@smtp.mailgun.org:587";
});

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
