angular.module('app.main.community.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.community',{
        url : '/community',
        views: {
          'content': {
            templateUrl: 'templates/community.html',
            controller: 'CommunityController'
          }
        }
      });
  })

  .controller('CommunityController', function($scope){
    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('community.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('community.js beforeLeave');
    });
  });

