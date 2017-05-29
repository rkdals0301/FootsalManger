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

  .run(function($ionicPlatform, $ionicPopup,$state,$ionicHistory) {
    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function(event) {
      // if (true) { // your check here
      if($state.current.name=="main.home") {
        $ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      } else {
        $ionicHistory.goBack();
      }
    }, 100);
  })

  .controller('TeamController', function($scope){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('team.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('team.js beforeLeave');
    });
  });
