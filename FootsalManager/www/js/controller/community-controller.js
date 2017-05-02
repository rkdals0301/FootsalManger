angular.module('app.main.community.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.community',{
        url : '/community',
        views: {
          'content': {
            templateUrl: 'templates/community.html',
            controller: 'communityController'
          }
        }
      });
  })

  .controller('communityController', function($scope){
    // Load the modal from the given template URL
  });

