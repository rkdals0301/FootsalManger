angular.module('app.main.matching.create.controller', ['app.team.member.manager'])

  .controller('Matching-CreateController', function($scope, $rootScope, matchingManager, toastUtil, loadingUtil, teamMemberManager){
    $scope.matching = {regid : $rootScope.localStorage.id, regt_name : '', reghopeTime : '', regcontent : '', regcity : '', reggu : '', regteamnum : ''};


    $scope.$on('modal.shown', function(){
      $scope.getTeamMemberTeamNameList();
    });

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


    $scope.getTeamMemberTeamNameList = function () {
      loadingUtil.showLoading();
      teamMemberManager.getTeamMemberTeamNameList($rootScope.localStorage.id).then(
        function(data) {
          $scope.myTeamNameList = data;
          $scope.matching.regt_name = $scope.myTeamNameList[0];
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };
  });
