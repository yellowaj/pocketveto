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

.factory('User', function($firebase, $q) {

  function User(options) {
    this.id = options.id;
    this.email = options.email;
    this.signedIn = options.signedIn || false;
  }

  User.create = function(authUser) {
    var path = ["https://pocketveto.firebaseio.com/users", authUser.id].join('/');
    var deferred = $q.defer();

    $firebase(new Firebase(path)).$set({
      id: authUser.id,
      email: authUser.email
    }).then(function(data) {
      User.get(authUser.id).$loaded().then(function(data) { 
        deferred.resolve(new User(data));
      });
    }, function(errors) {
      deferred.reject(errors);
    });
    return deferred.promise;
  };

  User.get = function(id) {
    var path = ["https://pocketveto.firebaseio.com/users", id].join('/');
    return $firebase(new Firebase(path)).$asObject();
  };

  User.prototype.login = function() {
    this.signedIn = true;
  };

  User.prototype.logout = function() {
    this.signedIn = false;
  };

  return User;
})

.factory('Request', function($firebase) {
  var ref = $firebase(new Firebase("https://pocketveto.firebaseio.com/requests"));

  return {
    create: function(request) {
      request.status = 'pending';
      request.approved = false;
      return ref.$push(request);
    },

    all: function() {
      return ref.$asArray();
    },

    get: function(id) {
      var path = ["https://pocketveto.firebaseio.com/requests", id].join('/');
      return $firebase(new Firebase(path)).$asObject();
    }
  }
});
