angular.module('app.main.tip.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.tip',{
        url : '/tip',
        views: {
          'content': {
            templateUrl: 'templates/tip.html',
            controller: 'TipController'
          }
        }
      });
  })

  .controller('TipController', function($scope){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('tip.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('tip.js beforeLeave');
    });
  });
