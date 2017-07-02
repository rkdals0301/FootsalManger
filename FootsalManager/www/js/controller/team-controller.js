angular.module('app.main.team.controller', ['app.main.team.create.controller','app.main.team.search.controller',
  'app.main.team.myteam.controller'
  ,'app.team.manager'])

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
      })

  })


  .controller('TeamController', function($scope){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('team.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('team.js beforeLeave');
    });

  });
