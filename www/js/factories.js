angular.module('pocketveto.factories', [])

.factory('Auth', function($firebaseSimpleLogin, $rootScope) {
  var simpleLogin = $firebaseSimpleLogin(new Firebase("https://pocketveto.firebaseio.com/"));

  return {
    getCurrentUser: function() {
      return simpleLogin.$getCurrentUser();
    },

    createUser: function(user, callback) {
      return simpleLogin.$createUser(user.email, user.password);
    },

    login: function(user) {
      simpleLogin.$login('password', {
        email: user.email,
        password: user.password
      });
    },

    logout: function() {
      simpleLogin.$logout();
    },

    onLogin: function(callback) {
      $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
        callback(e, user);
      });
    },

    onLogout: function(callback) {
      $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
        callback(e, user);
      });
    },

    onLoginError: function(callback) {
      $rootScope.$on("$firebaseSimpleLogin:error", function(e, error) {
        callback(e, error);
      });
    }
  }
})

.factory('User', function($firebase) {

  return {
    create: function(user) {
      var ref = $firebase(new Firebase("https://pocketveto.firebaseio.com/users"));
      return ref.$child(user.id).$set({
        email: user.email
      });
    },

    get: function(id) {
      var path = ["https://pocketveto.firebaseio.com/users", id].join('/');
      return $firebase(new Firebase(path))
    }
  }
});