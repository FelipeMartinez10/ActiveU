import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

Messages.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

export const newMessage = new ValidatedMethod({
  name: 'messages.new',
  validate: new SimpleSchema({
    event: { type: String },
    text: { type: String },
  }).validator(),
  run({ event, text }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Messages.insert({
      event,
      user: this.userId,
      time: new Date(),
      text
    });
  }
});

export const removeMessage = new ValidatedMethod({
  name: 'messages.remove',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Messages.remove({ '_id': id });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function msgsPublication() {
    return Messages.find({});
  });
}
