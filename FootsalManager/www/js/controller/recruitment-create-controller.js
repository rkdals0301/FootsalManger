angular.module('app.main.recruitment.create.controller', [])

  .controller('Recruitment-CreateController', function($scope, recruitmentManager, $rootScope, toastUtil, loadingUtil){

    $scope.recruitment = {regid : $rootScope.localStorage.id, regcontent : '', regcity : '', reggu : ''};

    $scope.SubmitRecruitment = function () {
      if ($scope.recruitment.regcontent == ''){
        toastUtil.showShortBottomToast('내용를 입력하세요.');
      } else if ($scope.recruitment.regcity == ''){
        toastUtil.showShortBottomToast('원하는 도,시를 입력하세요.');
      } else if($scope.recruitment.reggu == ''){
        toastUtil.showShortBottomToast('원하는 구를 입력하세요.');
      } else {
        $scope.setRecruitment();
      }
    };

    $scope.setRecruitment = function () {
      loadingUtil.showLoading();
      recruitmentManager.setRecruitment($scope.recruitment).then(
        function (data) {
          toastUtil.showShortBottomToast('용병이 등록 되었습니다.');
          loadingUtil.hideLoading();
          $scope.modalA.remove();
        },
        function (error) {
          console.log(error);
        });
    };
  });
