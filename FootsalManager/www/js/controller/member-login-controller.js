angular.module('app.login.controller', ['app.member.manager','app.popup.util','app.loading.util','app.login.manager']) //tabSlideBox 'ngMaterial'

  .config(function($stateProvider){
    $stateProvider
      .state('main.login',{
        url : '/login',
        views: {
          'content': {
            templateUrl: 'templates/member-login.html',
            controller: 'LoginController'
          }
        }
      });
  })

    .controller('LoginController', function($scope, memberManager, loadingUtil, $localstorage, $state){
    // $scope.$on('$ionicView.loaded', function() { //initialize
    //   console.log('Login.js loaded');
    // });

    // $scope.$on('$ionicView.beforeEnter', function(){ //initialize
    //   console.log('Login.js beforeEnter');
    // });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('Login.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('Login.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('Login.js beforeLeave');
    // });
    $scope.$on('$ionicView.leave', function(){
      console.log('Login.js leave');
      $scope.member = {id: null, password : null};

    });
    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('Login.js afterLeave');
    // });

    // $scope.$on('$ionicView.unloaded', function(){
    //   console.log('Login.js unloaded');
    // });
    $scope.member = {id: null, password : null};

    $scope.SelectMemberData = function () {
      loadingUtil.showLoading();
      memberManager.getMember($scope.member.id).then(
        function (data) {
          $scope.getMember = data;
          if($scope.getMember.id != null){
            if($scope.getMember.password == $scope.member.password){
              console.log("로그인되었습니다.");
              $localstorage.set("id", $scope.getMember.id);
              console.log($localstorage.get("id"));
              $state.go('main.home');
            } else {
              console.log("비밀번호를 틀리셨습니다.");
            }
          } else {
            console.log("없는아이디");
          }
          loadingUtil.hideLoading();
        },
        function (error) {
          console.log(error);
        });
    };
  });

