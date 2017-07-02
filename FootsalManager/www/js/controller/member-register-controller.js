angular.module('app.main.register.controller', [])

  .config(function($stateProvider){
    $stateProvider
      .state('main.register',{
        url : '/register',
        views: {
          'content': {
            templateUrl: 'templates/member-register.html',
            controller: 'Member-RegisterController'
          }
        }
      });
  })

  .controller('Member-RegisterController', function($scope, memberManager, loadingUtil, $state, toastUtil){

    $scope.$on('$ionicView.beforeEnter', function(){ //initialize
      console.log('Member-Register.js beforeEnter');
      $scope.member = {id : '', password : ''};
      $scope.member_confirm = {password_confirm : ''};
      $scope.profile = {p_name : '', phone : ''};
      $scope.register = {member : null, profile : null};

    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('Member-Register.js beforeLeave');
      $scope.member = {id: '', password : ''};
      $scope.member_confirm = {password_confirm : ''};
      $scope.profile = {p_name : '', phone : ''};
      $scope.register = {member : null, profile : null};
    });

    $scope.AccountMember = function () {
      if($scope.member.id == ''){
        toastUtil.showShortBottomToast('아이디를 입력하세요.');
      } else if ($scope.member.password == ''){
        toastUtil.showShortBottomToast('비밀번호를 입력하세요.');
      } else if ($scope.member_confirm.password_confirm == ''){
        toastUtil.showShortBottomToast('비밀번호 확인을 입력하세요.');
      } else if($scope.member.password != $scope.member_confirm.password_confirm){
        toastUtil.showShortBottomToast('비밀번호를 다시 확인하세요.');
      } else if($scope.profile.p_name == ''){
        toastUtil.showShortBottomToast('이름을 입력하세요.');
      } else if($scope.profile.phone == ''){
        toastUtil.showShortBottomToast('핸드폰 번호를 입력하세요.');
      } else {
        $scope.getMember();
      }
    };

    $scope.getMember = function () {
      loadingUtil.showLoading();
      memberManager.getMember($scope.member.id).then(
        function (data) {
          $scope.existmember = data;
          if($scope.existmember == ''){
            $scope.register.member = $scope.member;
            $scope.register.profile = $scope.profile;
            $scope.setMember();
          } else {
            toastUtil.showShortBottomToast('존재하는 아이디 입니다.');
            loadingUtil.hideLoading();
          }
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.setMember = function () {
          memberManager.setMember($scope.register).then(
          function (data) {
            toastUtil.showShortBottomToast('회원가입 되었습니다.');
            loadingUtil.hideLoading();
            $state.go('main.login');
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
    $scope.$watch("member_confirm.password_confirm", function(newValue, oldValue){
      if (newValue.length > 12){
        $scope.member_confirm.password_confirm = oldValue;
      }
    });
    $scope.$watch("profile.p_name", function(newValue, oldValue){
      if (newValue.length > 5){
        $scope.profile.p_name = oldValue;
      }
    });
    $scope.$watch("profile.phone", function(newValue, oldValue){
      if (newValue.length > 11){
        $scope.profile.phone = oldValue;
      }
    });

  });

