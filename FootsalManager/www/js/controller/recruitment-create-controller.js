angular.module('app.main.recruitment.create.controller', [])

  .controller('Recruitment-CreateController', function($scope, recruitmentManager, $rootScope, toastUtil, loadingUtil, modalUtil){

    $scope.recruitment = {regid : $rootScope.localStorage.id, regcontent : '', regcity : '', reggu : ''};
    $scope.location = {city : '전체', gu : '전체'};
    $scope.locatonChk = 0;

    $scope.SubmitRecruitment = function () {
      if ($scope.recruitment.regcontent == ''){
        toastUtil.showShortBottomToast('내용를 입력하세요.');
      }  else {
        $scope.setRecruitment();
      }
    };

    $scope.setRecruitment = function () {
      $scope.recruitment.regcity = $scope.location.city;
      $scope.recruitment.reggu = $scope.location.gu;
      loadingUtil.showLoading();
      recruitmentManager.setRecruitment($scope.recruitment).then(
        function (data) {
          toastUtil.showShortBottomToast('용병이 등록 되었습니다.');
          loadingUtil.hideLoading();
          $scope.modalB.remove();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.init(animation,'location.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.$watch("recruitment.regcontent", function(newValue, oldValue){
      if (newValue.length > 45){
        $scope.recruitment.regcontent = oldValue;
      }
    });

  });
