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
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.receivedRequest', {
      url: "/receivedRequest",
      views: {
        'menuContent' :{
          templateUrl: "templates/receivedRequest.html"
        }
      }
    })

    .state('app.receivedRequests', {
      url: "/receivedRequests",
      views: {
        'menuContent' :{
          templateUrl: "templates/receivedRequests.html"
        }
      }
    })

    .state('app.sendRequest', {
      url: "/sendRequest",
      views: {
        'menuContent' :{
          templateUrl: "templates/sendRequest.html"
        }
      }
    })

    .state('app.sentRequest', {
      url: "/sentRequest",
      views: {
        'menuContent' :{
          templateUrl: "templates/sentRequest.html"
        }
      }
    })

    .state('app.sentRequests', {
      url: "/sentRequests",
      views: {
        'menuContent' :{
          templateUrl: "templates/sentRequests.html"
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sentRequests');
});
