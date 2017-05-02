angular.module('app.register.controller', ['app.member.manager','app.popup.util','app.loading.util']) //tabSlideBox 'ngMaterial'

  .config(function($stateProvider){
    $stateProvider
      .state('main.register',{
        url : '/register',
        views: {
          'content': {
            templateUrl: 'templates/member-register.html',
            controller: 'RegisterController'
          }
        }
      });
  })

  .controller('RegisterController', function($scope, memberManager, loadingUtil, $state){
    // $scope.$on('$ionicView.loaded', function() { //initialize
    //   console.log('Register.js loaded');
    // });

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('Login.js beforeEnter');
      console.log($scope.member.id);
    });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('Register.js enter');


    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('Register.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('Register.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('Register.js leave');
      $scope.member = {id: null, password : null};
      $scope.member_confirm = {password_confirm : null};
    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('Register.js afterLeave');
    // });

    // $scope.$on('$ionicView.unloaded', function(){
    //   console.log('Register.js unloaded');
    // });
    $scope.member = {id: null, password : null};
    $scope.member_confirm = {password_confirm : null};

    $scope.InsertMemberData = function () {
        loadingUtil.showLoading();
          memberManager.setMember($scope.member).then(
          function (data) {
            loadingUtil.hideLoading();
            $state.go('main.login');

          },
          function (error) {
            loadingUtil.hideLoading();
            console.log(error);
          });
    };

  });

