import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Events = new Mongo.Collection('events');

Events.deny({
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

export const createEvent = new ValidatedMethod({
  name: 'events.create',
  validate: new SimpleSchema({
    name: { type: String },
    place: { type: String },
    type: { type: String },
    description: { type: String },
    when: { type: Date },
    howMany: { type: Number }
  }).validator(),
  run({ name, place, type, description, when, howMany }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Events.insert({
      owner: this.userId,
      name,
      place,
      type,
      description,
      when,
      howMany
    });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function eventsPublication() {
    return Events.find({});
  });
}
