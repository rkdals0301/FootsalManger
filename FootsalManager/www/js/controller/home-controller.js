angular.module('app.main.home.controller', [])

  .config(function($stateProvider){
    $stateProvider
     .state('main.home',{
       url : '/home',
       views: {
         'content': {
           templateUrl: 'templates/home.html',
           controller: 'HomeController'
        }
      }
    });
})

   .controller('HomeController', function($scope){

     $scope.$on('$ionicView.beforeEnter', function(){ //initialize
       console.log('home.js beforeEnter');
     });

     $scope.$on('$ionicView.beforeLeave', function(){
       console.log('home.js beforeLeave');
     });
});

