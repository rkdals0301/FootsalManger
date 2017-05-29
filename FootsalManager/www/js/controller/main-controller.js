angular.module('app.main.controller', ['app.main.home.controller','app.main.matching.controller', 'app.main.reservation.controller'
  ,'app.main.team.controller', 'app.main.community.controller','app.main.recruitment.controller','app.main.login.controller','app.main.register.controller'
  ,'app.main.profile.controller','app.main.tip.controller',
  'app.popup.util','app.loading.util', 'app.toast.util','app.modal.util',
  'app.profile.manager', 'app.member.manager'])

  .config(function($stateProvider){
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl : 'templates/main.html',
        controller: "MainController"
      });
  })

  .controller('MainController', function($scope, $rootScope, $localstorage, popupUtil, $state, $ionicSideMenuDelegate, profileManager, loadingUtil, memberManager, toastUtil, modalUtil){

    // $scope.chkgetProfile = false; // 프로필 이미지 가져오기 한번실행위해,

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('main.js beforeEnter');
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('main.js beforeLeave');
    });

    $scope.setStorage = function (){
      $rootScope.localStorage.id = $localstorage.get('id');
    };

    $scope.getProfile = function (){
      loadingUtil.showLoading();
      profileManager.getProfile($rootScope.localStorage.id).then(
        function(data) {
          $scope.profile = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();

            // $scope.chkgetProfile = true;
          // }
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.$watch(function () {
        return $ionicSideMenuDelegate.isOpenLeft();
      },
      function (isOpen) {
        if (isOpen){
          if($rootScope.localStorage.id != 'null'){
            // if($scope.chkgetProfile == false){
               $scope.getProfile();
            // } else {
            //    $scope.updateImg = '?_ts=' + new Date().getTime();
            // }
          }
          console.log("open");
        } else{
          console.log("close");
        }
      });

    $scope.showLogoutPopup = function () {
      popupUtil.showLogoutPopup($scope);
    };

    $scope.logout = function() {
      $scope.UpdateTokenMember();
    };

    $scope.UpdateTokenMember = function () {
      $scope.member = {id : $rootScope.localStorage.id, token : null};
      loadingUtil.showLoading();
      memberManager.UpdateTokenMember($scope.member).then(
        function (data) {
          // $scope.chkgetProfile = false;
          $localstorage.set("id", null);
          $scope.setStorage();
          $ionicSideMenuDelegate.toggleLeft(false);
          toastUtil.showShortBottomToast('로그아웃 되었습니다.');
          loadingUtil.hideLoading();
          $state.go('main.home');
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.ShowImageDetail = function(animation) {
        $scope.updateImg = '?_ts=' + new Date().getTime();
        $scope.imageUrl = $scope.profile.p_picture + $scope.updateImg;
        modalUtil.init(animation,'img-detail.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

  });




