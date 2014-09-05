var pocketveto = angular.module('pocketveto', ['ionic', 'firebase', 'pocketveto.controllers', 'pocketveto.factories']);

pocketveto
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: "/login",
      controller: 'AuthCtrl',
      templateUrl: "templates/login.html"
    })

    .state('app', {
      url: "/",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.requests', {
      url: "/requests",
      views: {
        'menuContent' :{
          templateUrl: "templates/requests.html"
        }
      }
    })
    
    .state('app.request', {
      url: "/request",
      views: {
        'menuContent' :{
          templateUrl: "templates/request.html"
        }
      }
    })

    .state('app.send', {
      url: "/send",
      views: {
        'menuContent' :{
          templateUrl: "templates/send.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

