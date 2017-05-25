/* eslint-disable no-undef */
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from './messages.js';

if (Meteor.isServer) {
  describe('Messages', () => {
    describe('methods', () => {
      const userId = Random.id();

      beforeEach(() => {
        Messages.remove({});
      });
      it('Doesnt find when empty', () => {
        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 0);
      });
      it('Can create message', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addMessage = Meteor.server.method_handlers['messages.new'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        addMessage.apply(invocation, [{ event: '1', text: 'hola mensaje' }]);

        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 1);
      });
      it('Saved values correctly', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addMessage = Meteor.server.method_handlers['messages.new'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        addMessage.apply(invocation, [{ event: '1', text: 'hola mensaje' }]);

        // Verify that the method does what we expected
        assert.equal(Messages.find().count(), 1);
        assert.equal(Messages.find().fetch()[0].event, '1');
        assert.equal(Messages.find().fetch()[0].text, 'hola mensaje');
        assert.typeOf(Messages.find().fetch()[0].time, 'date');
      });
      it('Can delete message', () => {
        // Find the internal implementation of the insert guess method so we can
        // test it in isolation
        const addMessage = Meteor.server.method_handlers['messages.new'];
        const rmMessage = Meteor.server.method_handlers['messages.remove'];
        // console.log(Meteor.server);
        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        addMessage.apply(invocation, [{ event: '1', text: 'hola mensaje' }]);
        assert.equal(Messages.find().count(), 1);

        // Verify that the method does what we expected
        let msgId = Messages.find().fetch()[0]._id;
        rmMessage.apply(invocation, [{ id: msgId }]);
        assert.equal(Messages.find().count(), 0);
      });
    });
  });
}
