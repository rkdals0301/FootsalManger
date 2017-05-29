angular.module('app.main.community.detail.controller', [])

  .controller('Community-DetailController', function($scope, communityManager, $timeout, popupUtil, loadingUtil, communityReplyManager, $rootScope, toastUtil,  $ionicScrollDelegate) {

    $scope.communityReply = {c_no : $scope.community.c_no, replycontent : '', reid : $rootScope.localStorage.id};

    $scope.deleteCommunity = function () {
      loadingUtil.showLoading();
      communityManager.deleteCommunity($scope.community.c_no).then(
        function (data) {
          $scope.modalA.remove();
          loadingUtil.hideLoading();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.getCommunity = function (){
      communityManager.getCommunity($scope.community.c_no).then(
        function(data) {
          $scope.community = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $scope.getCommunityReplyList();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getCommunityReplyList = function () {
      communityReplyManager.getCommunityReplyList($scope.community.c_no).then(
        function(data) {
          $scope.communityReplyList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $scope.getCommunityreplyCount();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getCommunityreplyCount = function () {
      communityManager.getCommunityreplyCount($scope.community.c_no).then(
        function(data) {
          $scope.community.reply_cnt = data;
          $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
          }, 300);
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };


    $scope.showDeletePopup = function () {
      popupUtil.showDeletePopup($scope, "community");
    };

    $scope.setCommunityReply = function () {
      loadingUtil.showLoading();
      communityReplyManager.setCommunityReply($scope.communityReply).then(
        function (data) {
          $scope.communityReply.replycontent = '';
          toastUtil.showShortBottomToast('댓글이 등록 되었습니다.');
          $scope.getCommunityReplyList();
        },
        function (error) {
          console.log(error);
        });
    };

    $scope.SubmitReply = function () {
      if($scope.communityReply.replycontent == '') {
        toastUtil.showShortBottomToast('댓글 내용을 입력하세요.');
      } else {
        $scope.setCommunityReply();
      }
    }
  });
