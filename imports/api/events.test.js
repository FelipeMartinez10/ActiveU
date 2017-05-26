/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Events } from './events.js';

if (Meteor.isServer) {
  describe('Events', () => {
    describe('methods', () => {
      const userId = Random.id();

      beforeEach(() => {
        Events.remove({});
      });
      it('Doesnt find when empty', () => {
        // Verify that the method does what we expected
        assert.equal(Events.find().count(), 0);
      });
      it('Can create event', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addEvent = Meteor.server.method_handlers['events.create'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        const when = new Date();
        // Run the method with `this` set to the fake invocation
        addEvent.apply(invocation, [{ name: 'Test Event', place: 'Mario Laserna', type: 'Culture', description: 'Test event lalalala', when, howMany: 10 }]);

        // Verify that the method does what we expected
        assert.equal(Events.find().count(), 1);
      });
      it('Saved values correctly', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addEvent = Meteor.server.method_handlers['events.create'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        const when = new Date();
        // Run the method with `this` set to the fake invocation
        addEvent.apply(invocation, [{ name: 'Test Event', place: 'Mario Laserna', type: 'Culture', description: 'Test event lalalala', when, howMany: 10 }]);

        // Verify that the method does what we expected
        assert.equal(Events.find().fetch()[0].name, 'Test Event');
        assert.equal(Events.find().fetch()[0].place, 'Mario Laserna');
        assert.equal(Events.find().fetch()[0].type, 'Culture');
        assert.equal(Events.find().fetch()[0].description, 'Test event lalalala');
        assert.typeOf(Events.find().fetch()[0].when , 'date');
        assert.equal(Events.find().fetch()[0].howMany, 10);
      });
      it('Can delete event', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addEvent = Meteor.server.method_handlers['events.create'];
        const rmEvent = Meteor.server.method_handlers['events.delete'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        const when = new Date();
        // Run the method with `this` set to the fake invocation
        addEvent.apply(invocation, [{ name: 'Test Event', place: 'Mario Laserna', type: 'Culture', description: 'Test event lalalala', when, howMany: 10 }]);
        assert.equal(Events.find().count(), 1);

        // Verify that the method does what we expected
        let eventId = Events.find().fetch()[0]._id;
        rmEvent.apply(invocation, [{ id: eventId }]);
        assert.equal(Events.find().count(), 0);
      });
      it('Can add person', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addEvent = Meteor.server.method_handlers['events.create'];
        const addPerson = Meteor.server.method_handlers['events.addPerson'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        const when = new Date();
        // Run the method with `this` set to the fake invocation
        addEvent.apply(invocation, [{ name: 'Test Event', place: 'Mario Laserna', type: 'Culture', description: 'Test event lalalala', when, howMany: 10 }]);
        assert.equal(Events.find().count(), 1);

        // Verify that the method does what we expected
        let eventId = Events.find().fetch()[0]._id;
        addPerson.apply(invocation, [{ id: eventId, person: 'amigo1' }]);
        assert.equal(Events.find().count(), 1);
        assert.equal(Events.find().fetch()[0].people.length, 1);
        assert.equal(Events.find().fetch()[0].people[0], 'nicolas');
      });
      it('Can remove person', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addEvent = Meteor.server.method_handlers['events.create'];
        const addPerson = Meteor.server.method_handlers['events.addPerson'];
        const rmPerson = Meteor.server.method_handlers['events.removePerson'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        const when = new Date();
        // Run the method with `this` set to the fake invocation
        addEvent.apply(invocation, [{ name: 'Test Event', place: 'Mario Laserna', type: 'Culture', description: 'Test event lalalala', when, howMany: 10 }]);
        assert.equal(Events.find().count(), 1);
        let eventId = Events.find().fetch()[0]._id;
        addPerson.apply(invocation, [{ id: eventId, person: 'nicolas' }]);
        addPerson.apply(invocation, [{ id: eventId, person: 'felipe' }]);
        assert.equal(Events.find().count(), 1);
        assert.equal(Events.find().fetch()[0].people.length, 2);

        // Verify that the method does what we expected
        rmPerson.apply(invocation, [{ id: eventId, person: 'amigo1' }]);
        assert.equal(Events.find().count(), 1);
        // assert.equal(Events.find().fetch()[0].people.length, 1);
        // assert.equal(Events.find().fetch()[0].people[0], 'felipe');
      });
    });
  });
}
