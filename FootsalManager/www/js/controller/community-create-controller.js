angular.module('app.main.community.create.controller', [])

  .controller('Community-CreateController', function($scope, $rootScope, communityManager, toastUtil, loadingUtil){
    $scope.community = {c_category : '1', content : '', regid : $rootScope.localStorage.id, file : '구현중'};

    $scope.SubmitCommunity = function () {
      if ($scope.community.content == ''){
        toastUtil.showShortBottomToast('내용를 입력하세요.');
      } else {
        $scope.setCommunity();
      }
    };

    $scope.setCommunity = function () {
      loadingUtil.showLoading();
      communityManager.setCommunity($scope.community).then(
        function (data) {
          toastUtil.showShortBottomToast('게시글이 등록 되었습니다.');
          loadingUtil.hideLoading();
          $scope.modalA.remove();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.$watch("community.content", function(newValue, oldValue){
      if (newValue.length > 45){
        $scope.community.content = oldValue;
      }
    });

    $scope.$watch("community.file", function(newValue, oldValue){
      if (newValue.length > 45){
        $scope.community.file = oldValue;
      }
    });

  });
