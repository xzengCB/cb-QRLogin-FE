import Ember from 'ember';

export default Ember.Object.create({
  host: 'http://10.63.88.129:3000',
  namespace: '',
  classesPath: '',

  ajax: function(url, type, options) {
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var hash = adapter.ajaxOptions(url, type, options);

      // json, textStatus, jqXHR
      hash.success = function(json) {
        json = adapter.ajaxSuccess(json);
        if (json instanceof Error) {
          Ember.run(null, reject, json);
        } else {
          Ember.run(null, resolve, json);
        }
      };

      // jqXHR, textStatus, errorThrown
      hash.error = function(jqXHR) {
        Ember.run(null, reject, adapter.ajaxError(jqXHR));
      };

      Ember.$.ajax(hash);
    });
  },

  ajaxOptions: function(url, type, options) {
    var hash = options || {},
      adapter = this;

    hash.url = adapter.buildUrl(url);
    hash.type = type.toUpperCase();
    hash.dataType = 'json';

    if (hash.data && hash.type !== 'GET') {
      hash.contentType = 'application/json; charset=utf-8';
      hash.data = JSON.stringify(hash.data);
    }

    // hash.beforeSend = function(xhr) {
    // };

    return hash;
  },

  ajaxSuccess: function(jsonPayload) {
    return jsonPayload;
  },

  ajaxError: function(jqXHR) {
    if (jqXHR && typeof jqXHR === 'object') {
      jqXHR.then = null;
    }
    return jqXHR;
  },

  buildUrl: function(url) {

    return this.get('host') + '/' + url;
  }
});
