angular.module('app.main.login.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.login',{
        url : '/login',
        views: {
          'content': {
            templateUrl: 'templates/member-login.html',
            controller: 'Member-LoginController'
          }
        }
      });
  })

    .controller('Member-LoginController', function($scope, memberManager, loadingUtil, $rootScope, $state, toastUtil, $localstorage){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('Member-Login.js beforeEnter');
      $scope.member = {id: '', password : '', token : $rootScope.localStorage.token};
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('Member-Login.js beforeLeave');
      $scope.member = {id: '', password : '', token : ''};
    });

    $scope.LoginMember = function () {
        if($scope.member.id == ''){
          toastUtil.showShortBottomToast('아이디를 입력해주세요.');
        } else if ($scope.member.password == ''){
          toastUtil.showShortBottomToast('비밀번호를 입력해주세요.');
        } else {
          $scope.checkLoginMember();
        }
      };

    $scope.checkLoginMember = function () {
      loadingUtil.showLoading();
      memberManager.checkLoginMember($scope.member).then(
        function (data) {
          $scope.getMember = data;
          if($scope.getMember == 1){ // 로그인 가능
            $scope.UpdateTokenMember();
          } else if($scope.getMember == 2){ // 존재하지 않는 아이디
            toastUtil.showShortBottomToast('존재하지 않는 아이디 입니다.');
            loadingUtil.hideLoading();
          } else if($scope.getMember == 0){ // 비밀번호 틀림
            toastUtil.showShortBottomToast('비밀번호가 틀렸습니다.');
            loadingUtil.hideLoading();
          }
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.UpdateTokenMember = function () {
      memberManager.UpdateTokenMember($scope.member).then(
        function (data) {
          $localstorage.set("id", $scope.member.id);
          $scope.setStorage();
          toastUtil.showShortBottomToast('로그인 되었습니다.');
          loadingUtil.hideLoading();
          $state.go('main.home');
        },
        function (error) {
          console.log(error);
        });
    };

      $scope.$watch("member.id", function(newValue, oldValue){
        if (newValue.length > 12){
          $scope.member.id = oldValue;
        }
      });

      $scope.$watch("member.passwrod", function(newValue, oldValue){
        if (newValue.length > 12){
          $scope.member.passwrod = oldValue;
        }
      });

  });

