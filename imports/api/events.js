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
      howMany,
      people: []
    });
  }
});

export const addPerson = new ValidatedMethod({
  name: 'events.addPerson',
  validate: new SimpleSchema({
    id: { type: Number },
    person: { type: String }
  }).validator(),
  run({ id, person }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let event = Events.findOne({'_id': id});
    if (event.people.length >= event.howMany) {
      throw new Meteor.Error('event full');
    }
    Events.update({ '_id': id }, { $push: { people: person } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function eventsPublication() {
    return Events.find({});
  });
}
