// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.main.controller','ngCordova','app.localstorage.manager'])
  .constant('ApiEndpoint', function () {
  var url = "http://dlrkdalsdl.cafe24.com";
  // var url = "/api";

  return {url : url};
  }())

  .run(function($ionicPlatform, $cordovaPushV5, $rootScope, $localstorage) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      var options = {
        android: {
          senderID: "494885548415", //SENDER ID
          forceShow: "true"
        },
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
          alert: "true",
          badge: "true",
          sound: "true"
        },
        windows: {}
      };

      // initialize
      $cordovaPushV5.initialize(options).then(function() {
        // start listening for new notifications
        $cordovaPushV5.onNotification();
        // start listening for errors
        $cordovaPushV5.onError();

        // register to get registrationId
        $cordovaPushV5.register().then(function(registrationId) {
          $rootScope.localStorage.token = registrationId;
          console.log($rootScope.localStorage.token);
          // save `registrationId` somewhere;
        })
      });

      // triggered every time notification received
      $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
        if (data.additionalData.foreground === false) {
          // do something if the app is in foreground while receiving to push - handle in app push handling
          console.log("background");
        } else {
          // handle push messages while app is in background or not started
          console.log("foreground");
        }
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });

      // triggered every time error occurs
      $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
        console.log("errorPush");
        // e.message
      });

      $rootScope.localStorage = {};
      $rootScope.localStorage.id = $localstorage.get('id');
      console.log($rootScope.localStorage.id);


    });
  })
  .controller('AppController', function($scope, $state){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('app.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('app.js beforeLeave');
    });

    $state.go('main.home');




  });
