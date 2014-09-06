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

    .state('app.receivedRequests', {
      url: "/requests/received",
      controller: 'RequestsCtrl',
      views: {
        'menuContent' :{
          templateUrl: "templates/requests/received.html"
        }
      }
    })

    .state('app.sendRequest', {
      url: "/requests/new",
      controller: 'RequestsCtrl',
      views: {
        'menuContent' :{
          templateUrl: "templates/requests/new.html"
        }
      }
    })

    .state('app.sentRequests', {
      url: "/requests/sent",
      controller: 'RequestsCtrl',
      views: {
        'menuContent' :{
          templateUrl: "templates/requests/sent.html"
        }
      }
    })

    .state('app.receivedRequest', {
      url: "/requests/:requestId",
      controller: 'RequestsCtrl',
      views: {
        'menuContent' :{
          templateUrl: "templates/requests/show.html"
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/requests/sent');
});

