angular.module('pocketveto.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('RequestsCtrl', function($scope, Request) {
  $scope.newRequest = {
    name: null,
    price: null,
    url: null,
    justification: null
  };

  $scope.requests = Request.all();

  $scope.createRequest = function(request) {
    Request.create(request).then(function(newReq) {
      // todo: go to newly created request page
      var id = newReq.name();
    });
  };
})

.controller('AuthCtrl', function($scope, Auth, User) {

  $scope.action = null;
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.user = null;

  $scope.setAction = function(type) {
    $scope.action = type;
  };

  Auth.onLogin(function(e, user) {
    console.log("Logged in successfully: ", user);
    $scope.user = User.get(user.id).$asObject();
  });

  Auth.onLogout(function(e, user) {
    console.log("Logged out successfully");
    $scope.user = null;
  });

  Auth.onLoginError(function(e, error) {
    console.log("Error logging in: ", error);
  });

  $scope.loginUser = function() {
    Auth.login($scope.loginData);
  };

  $scope.createUser = function() {
    Auth.createUser($scope.registerData).then(function(user) {
      console.log("User successfully created: ", user);
      var test = User.create(user);
      console.log(test);
      $scope.user = user;
    });
  };

  $scope.logoutUser = function() {
    Auth.logout();
  };  

  window.scope = $scope;
});

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
