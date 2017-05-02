angular.module('app.main.profile.controller', []) //tabSlideBox 'ngMaterial'

  .config(function($stateProvider){
    $stateProvider
      .state('main.profile',{
        url : '/profile',
        views: {
          'content': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        }
      });
  })

  .controller('ProfileController', function($scope){
    // $scope.$on('$ionicView.loaded', function() { //initialize
    //   console.log('home.js loaded');
    // });

    // $scope.$on('$ionicView.beforeEnter', function(){ //initialize
    //   console.log('home.js beforeEnter');
    // });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('Profile.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('home.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('home.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('Profile.js leave');
    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('home.js afterLeave');
    // });

    // $scope.$on('$ionicView.unloaded', function(){
    //   console.log('home.js unloaded');
    // });

  });

