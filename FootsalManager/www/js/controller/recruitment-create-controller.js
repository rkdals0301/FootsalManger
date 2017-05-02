angular.module('app.main.recruitment.create.controller', ['app.recruitment.manager'])

  .controller('Recruitment-createController', function($scope,  $ionicPopup, recruitmentManager){
    // $scope.$on('$ionicView.loaded', function() { //initialize
    //   console.log('Matching-createController.js loaded');
    // });

    // $scope.$on('$ionicView.beforeEnter', function(){ //initialize
    //   console.log('matching.js beforeEnter');
    // });
    $scope.$on('$ionicView.enter', function() { //initialize
      console.log('Matching-createController.js enter');
    });
    // $scope.$on('$ionicView.afterEnter', function(){ //initialize
    //   console.log('matching.js afterEnter');
    // });
    //
    // $scope.$on('$ionicView.beforeLeave', function(){
    //   console.log('matching.js beforeLeave');
    // });

    $scope.$on('$ionicView.leave', function(){
      console.log('Matching-createController.js leave');
    });

    // $scope.$on('$ionicView.afterLeave', function(){
    //   console.log('matching.js afterLeave');
    // });

    // $scope.$on('$ionicView.unloaded', function(){
    //   console.log('Matching-createController.js unloaded');
    // });

    $scope.recruitment = {};
    $scope.recruitment.regid = "dlrkdalsdl"; //$localstorage.get('id')
    $scope.recruitment.regcontent = "안녕";
    $scope.recruitment.regcity = "부산광역시";
    $scope.recruitment.reggu = "중구";

    $scope.setData = function () {
      recruitmentManager.setRecruitment($scope.recruitment).then(
        function (data) {
          $scope.modal.remove();
        },
        function (error) {
          console.log(error);
        });
    };
  });
