import Ember from 'ember';
import PresenceMixin from '../../../mixins/presence';
import { module, test } from 'qunit';

module('PresenceMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PresenceObject = Ember.Object.extend(PresenceMixin);
  var subject = PresenceObject.create();
  assert.ok(subject);
});
