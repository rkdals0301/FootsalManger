angular.module('app.main.matching.create.controller', [])

  .controller('Matching-CreateController', function($scope, $rootScope, matchingManager, toastUtil, loadingUtil){
    $scope.matching = {regid : $rootScope.localStorage.id, reghopeTime : '', regcontent : '', regcity : '', reggu : '', regteamnum : ''};

    $scope.SubmitMatching = function () {
      if($scope.matching.reghopeTime == ''){
        toastUtil.showShortBottomToast('원하는 시간을 입력하세요.');
      } else if ($scope.matching.regcontent == ''){
        toastUtil.showShortBottomToast('내용를 입력하세요.');
      } else if ($scope.matching.regcity == ''){
        toastUtil.showShortBottomToast('원하는 도,시를 입력하세요.');
      } else if($scope.matching.reggu == ''){
        toastUtil.showShortBottomToast('원하는 구를 입력하세요.');
      } else if($scope.matching.regteamnum == ''){
        toastUtil.showShortBottomToast('팀원 수를 입력하세요.');
      } else {
        $scope.setMatching();
      }
    };

    $scope.setMatching = function () {
      loadingUtil.showLoading();
      matchingManager.setMatching($scope.matching).then(
        function (data) {
          toastUtil.showShortBottomToast('매칭이 등록 되었습니다.');
          loadingUtil.hideLoading();
          $scope.modalA.remove();
        },
        function (error) {
          console.log(error);
        });
    };
  });
