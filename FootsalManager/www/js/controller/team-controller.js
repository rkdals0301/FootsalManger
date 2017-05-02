angular.module('app.main.team.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.team',{
        url : '/team',
        views: {
          'content': {
            templateUrl: 'templates/team.html',
            controller: 'teamController'
          }
        }
      });
  })

  .controller('teamController', function($scope){
    $scope.$on('$ionicView.loaded', function() { //initialize
      console.log('teamController.js loaded');
    });
    //
    // $scope.$on('$ionicView.beforeEnter', function(){ //initialize
    //   console.log('reservation.js beforeEnter');
    // });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('teamController.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('reservation.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('reservation.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('teamController.js leave');
    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('reservation.js afterLeave');
    // });
    //
    $scope.$on('$ionicView.unloaded', function(){
      console.log('teamController.js unloaded');
    });
  });
