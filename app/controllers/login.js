import Ember from 'ember';
import Presence from 'qrlogin-fe/mixins/presence';
import Util from 'qrlogin-fe/utils/ajax';

export default Ember.Controller.extend(Presence, {
  needs: ['login-success'],

  username: 'qqqqq@sina.com.cn',
  password: 'Qwer1234!',
  loggingIn: false,
  errorMessage: '',

  loginButtonText: function() {
    return this.get('loggingIn') ? 'Sign In...' : 'Sign In';
  }.property('loggingIn'),

  loginDisabled: function() {
    return this.get('loggingIn') || this.blank('username') || this.blank('password');
  }.property('username', 'password', 'loggingIn'),

  showSpinner: function() {
    return this.get('loggingIn');
  }.property('loggingIn'),

  actions: {
    closeAlter: function() {
      this.set('errorMessage', '');
    },

    signIn: function() {
      this.set('loggingIn', true);

      var _this = this,
        data = {
          'email': encodeURI(this.get('username')),
          'password': encodeURI(this.get('password'))
        };

      Util.ajax('login', 'POST', {'data': data}).then(function(value){
        if (value.success) {
          _this.get('controllers.login-success').setProperties({
            userExternalID: value.external_id,
            userOAuthToken: value.oauth_token,
            email: _this.get('username')
          });
          _this.transitionToRoute('login-success');
        } else {
          _this.set('errorMessage', value.error_message);
        }
      }).catch(function(reason){
        _this.set('errorMessage', reason);
      }).finally(function(){
        _this.set('loggingIn', false);
      });
    }
  }
});
