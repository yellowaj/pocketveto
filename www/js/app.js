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
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    });

    // .state('app.single', {
    //   url: "/playlists/:playlistId",
    //   views: {
    //     'menuContent' :{
    //       templateUrl: "templates/playlist.html",
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

