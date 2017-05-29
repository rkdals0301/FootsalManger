angular.module('app.main.community.controller', ['app.main.community.detail.controller','app.main.community.create.controller'
  ,'app.community.manager','app.community.reply.manager'])

  .config(function($stateProvider){
    $stateProvider
      .state('main.community',{
        url : '/community',
        views: {
          'content': {
            templateUrl: 'templates/community.html',
            controller: 'CommunityController'
          }
        }
      });
  })

  .controller('CommunityController', function($scope, communityManager, loadingUtil, $timeout, modalUtil, communityReplyManager){

    $scope.community = {};
    $scope.check_c_category = 0;

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('community.js beforeEnter');
      $scope.getCommunityList(0);
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('community.js beforeLeave');
    });

    $scope.getCommunityList = function (c_category){
      $scope.check_c_category = c_category;
      loadingUtil.showLoading();
      communityManager.getCommunityList(c_category).then(
        function(data) {
          $scope.communityList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getCommunity = function (animation, c_no){
      loadingUtil.showLoading();
      communityManager.getCommunity(c_no).then(
        function(data) {
          $scope.community = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $scope.getCommunityReplyList(animation, c_no);
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getCommunityReplyList = function (animation, c_no) {
      communityReplyManager.getCommunityReplyList(c_no).then(
        function(data) {
          $scope.communityReplyList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.init(animation,'community-detail.html', $scope).then(function(modal) {
              modal.show();
              $scope.modalA = modal;
            });
          }, 200, true );
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.showCreate = function(animation){
      modalUtil.init(animation,'community-create.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.doRefresh = function() {
      $scope.getCommunityList($scope.check_c_category);
    };

    $scope.$on('modal.removed', function() {
      $scope.getCommunityList($scope.check_c_category);
    });

    $scope.showDetail = function(animation, c_no){
      $scope.getCommunity(animation, c_no);
    };

  });

