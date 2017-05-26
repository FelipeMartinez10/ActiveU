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

export const deleteEvent = new ValidatedMethod({
  name: 'events.delete',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),
  run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let event = Events.findOne({'_id': id});
    if (this.userId !== event.owner) {
      throw new Meteor.Error('not-authorized');
    }
    return Events.remove({ '_id': id });
  }
});

export const addPerson = new ValidatedMethod({
  name: 'events.addPerson',
  validate: new SimpleSchema({
    id: { type: String },
    person: { type: String }
  }).validator(),
  run({ id, person }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let event = Events.findOne({'_id': id});
    if (event.people.includes(person)) {
      throw new Meteor.Error('no duplicate users');
    }
    if (event.people.length >= event.howMany) {
      throw new Meteor.Error('event full');
    }
    if(event.owner == this.userId)
    {
      throw new Meteor.Error('owner can\'t subscribe to own event');
    }
    Events.update({ '_id': id }, {$push: { people: person }});
  }
});

export const removePerson = new ValidatedMethod({
  name: 'events.removePerson',
  validate: new SimpleSchema({
    id: { type: String },
    person: { type: String }
  }).validator(),
  run({ id, person }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let event = Events.findOne({'_id': id});
    if (!event.people.includes(person)) {
      throw new Meteor.Error('no such user in event');
    }
    if (event.people.length <= 0) {
      throw new Meteor.Error('event empty');
    }
    if(event.owner == this.userId)
    {
      throw new Meteor.Error('owner can\'t be removed from own event');
    }
    Events.update({ '_id': id }, { $pull: { people: person } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('events', function eventsPublication() {
    return Events.find({});
  });
}
