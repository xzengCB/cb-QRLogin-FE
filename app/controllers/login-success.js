import Ember from 'ember';
import Presence from 'qrlogin-fe/mixins/presence';
import Util from 'qrlogin-fe/utils/ajax';

export default Ember.Controller.extend(Presence, {
  userExternalID: '',
  userOAuthToken: '',
  email: '',

  isLogin: function() {
    return !this.blank('userExternalID') && !this.blank('userOAuthToken');
  }.property('userExternalID', 'userOAuthToken'),

  actions: {
    gotoSignin: function() {
      this.transitionToRoute('login');
    },

    scan: function() {
      if (typeof(cordova) !== 'undefined') {
        var _this = this;

        cordova.exec(function(resultArray) {
          // alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);
          var data = {'gid': resultArray[0], 'user_external_id': _this.get('userExternalID')};
          Util.ajax('sse/message', 'POST', {'data': data}).then(function(){
            alert('QR Sign In Success!');
          }).catch(function(reason){
            alert("Failed: " + reason);
          });
        }, function(error) {
          alert("Failed: " + error);
        }, "ScanditSDK", "scan", [
          "oab9MGbb4kSvroZSnGdw3XtNUUhwCHCq8Dhmq9RjfY0",
          {"beep": true, "1DScanning": true, "2DScanning": true}
        ]);
      }
    }
  }
});
