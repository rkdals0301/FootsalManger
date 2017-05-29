  angular.module('app.main.matching.controller', ['app.main.matching.create.controller','app.main.matching.detail.controller'
    ,'app.location.controller','app.main.matching.mymatching.controller'
    ,'app.matching.manager'
    ,'ion-floating-menu'])

  .config(function($stateProvider){
    $stateProvider
      .state('main.matching',{
        url : '/matching',
        views: {
          'content': {
            templateUrl: 'templates/matching.html',
            controller: 'MatchingController'
          }
        }
      });
  })

  .controller('MatchingController', function($scope, $rootScope, matchingManager, modalUtil, loadingUtil, $timeout){
    // 0 : city, 1 : gu
    $scope.locatonChk = 0;
    $scope.location = {city : '전체', gu : '전체'};
    $scope.matching = {};

    //Init()
    function Init(){
        $scope.getMatchingLocationList();
    };

    $scope.$on('$ionicView.beforeEnter', function(){
      console.log('matching.js beforeEnter');
      Init();
    });

    $scope.$on('$ionicView.beforeLeave', function(){
      console.log('matching.js beforeLeave');
      $scope.location = {city : '전체', gu : '전체'};
    });

    $scope.getMatchingLocationList = function (){
      loadingUtil.showLoading();
      matchingManager.getMatchingLocationList($scope.location).then(
        function(data) {
          $scope.matchingList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          loadingUtil.hideLoading();
          $scope.$broadcast('scroll.refreshComplete');
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getMatchingIdList = function (animation){
      loadingUtil.showLoading();
      matchingManager.getMatchingIdList($rootScope.localStorage.id).then(
        function(data) {
          $scope.matchingIdList = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.init(animation,'matching-mymatching.html', $scope).then(function(modal) {
              modal.show();
              $scope.modalB = modal;
            });
          }, 200, true );
          loadingUtil.hideLoading();
        },
        function(error) {
          console.log(error);
        }
      );
    };

    $scope.getMatching = function (animation, idx){
      loadingUtil.showLoading();
      matchingManager.getMatching(idx).then(
        function(data) {
          $scope.matching = data;
          $scope.updateImg = '?_ts=' + new Date().getTime();
          $timeout(function () {
            modalUtil.init(animation,'matching-detail.html', $scope).then(function(modal) {
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

    $scope.showDetail = function(animation, idx){
      $scope.getMatching(animation, idx);
    };

    $scope.showCreate = function(animation){
      modalUtil.init(animation,'matching-create.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.showCity = function(animation, chkClick){
      $scope.locatonChk = chkClick;
      modalUtil.init(animation,'location.html', $scope).then(function(modal) {
        modal.show();
        $scope.modalA = modal;
      });
    };

    $scope.$on('modal.removed', function() {
      $scope.getMatchingLocationList();
    });

    $scope.doRefresh = function() {
      $scope.getMatchingLocationList();
    };

    $scope.showMyMatching = function(animation) {
      $scope.getMatchingIdList(animation);
    };

  });

