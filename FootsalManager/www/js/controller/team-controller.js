angular.module('app.main.team.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.team',{
        url : '/team',
        views: {
          'content': {
            templateUrl: 'templates/team.html',
            controller: 'TeamController'
          }
        }
      });
  })

  .controller('TeamController', function($scope){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('team.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('team.js beforeLeave');
    });
  });
