angular.module('app.main.profile-show.controller', [])

  .controller('ProfileShowController', function($scope, $rootScope, profileManager, modalUtil, popupUtil, loadingUtil){

    $scope.ShowImageDetail = function(animation) {
      $scope.updateImg = '?_ts=' + new Date().getTime();
      $scope.imageUrl = $scope.profile.p_picture + $scope.updateImg;
      modalUtil.init(animation,'img-detail.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };





  });

